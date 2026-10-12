import type { InvoiceResponse, InvoiceStatus } from '../models/invoice/InvoiceResponse';

export type InvoiceVisualStatus = InvoiceStatus | 'DUE_SOON';
type InvoiceDates = Pick<InvoiceResponse, 'status' | 'closingDate' | 'expirationDate'>;

export function localDateKey(date = new Date()): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function sortInvoices(invoices: InvoiceResponse[] = []): InvoiceResponse[] {
  return [...invoices].sort((a, b) =>
    (b.closingDate ?? '').localeCompare(a.closingDate ?? '') || a.id.localeCompare(b.id)
  );
}

export function getCurrentInvoice(invoices: InvoiceResponse[] = [], today = new Date()) {
  const sorted = sortInvoices(invoices);
  const month = localDateKey(today).slice(0, 7);
  return sorted.find(invoice => invoice.closingDate?.startsWith(month))
    ?? [...sorted].reverse().find(invoice => invoice.status !== 'PAID')
    ?? sorted[0];
}

// A new purchase must not be attached to a paid, expired or already closed cycle.
export function getPurchaseInvoices(invoices: InvoiceResponse[] = [], today = new Date()) {
  const date = localDateKey(today);
  return sortInvoices(invoices)
    .filter(invoice => invoice.status === 'PAYING'
      && Boolean(invoice.closingDate && invoice.closingDate >= date)
      && Boolean(invoice.expirationDate && invoice.expirationDate >= date))
    .reverse();
}

// 
export function getInvoiceVisualStatus(invoice: InvoiceDates, today = new Date()): InvoiceVisualStatus {
  if (invoice.status === 'PAID') return 'PAID';
  const currentDate = localDateKey(today);
  if (invoice.status === 'EXPIRED'
    || (invoice.expirationDate && invoice.expirationDate < currentDate)) return 'EXPIRED';
  if (!invoice.expirationDate) return 'PAYING';

  const [year, month, day] = invoice.expirationDate.split('-').map(Number);
  const daysLeft = Math.round(
    (Date.UTC(year, month - 1, day) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
    / 86_400_000
  );
  return daysLeft <= 5 ? 'DUE_SOON' : 'PAYING';
}

// formata para mês e ano, ex: 10/26
export function formatInvoiceMonth(date: string | null | undefined): string {
  if (!date) return 'Ciclo não informado';
  const [year, month] = date.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}

// formata data da fatura, ex: 11/10/2026
export function formatInvoiceDate(date: string | null | undefined): string {
  if (!date) return 'Não informado';
  return date.split('-').reverse().join('/');
}
