import { ChevronRight, ReceiptText } from 'lucide-react';
import { useState } from 'react';
import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatInvoiceDate, formatInvoiceMonth, getInvoiceVisualStatus, sortInvoices } from '../../../../utils/invoices';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import styles from './Invoice.module.css';

interface Props {
  invoices: InvoiceResponse[];
  onSelect: (invoiceId: string) => void;
  onPay: (invoiceId: string) => void;
}

type Filter = 'ALL' | 'OPEN' | 'PAID' | 'EXPIRED';

export function InvoiceHistory({ invoices, onSelect, onPay }: Props) {
  const [filter, setFilter] = useState<Filter>('ALL');
  const [year, setYear] = useState('');
  const sorted = sortInvoices(invoices);
  const years = [...new Set(sorted.map(invoice => invoice.closingDate?.slice(0, 4)).filter(Boolean))];
  const filtered = sorted.filter(invoice => {
    const status = getInvoiceVisualStatus(invoice);
    return (!year || invoice.closingDate?.startsWith(year))
      && (filter === 'ALL' || (filter === 'OPEN' ? status !== 'PAID' : status === filter));
  });
  const filters: { value: Filter; label: string }[] = [
    { value: 'ALL', label: 'Todas' },
    { value: 'OPEN', label: 'Em aberto' },
    { value: 'PAID', label: 'Pagas' },
    { value: 'EXPIRED', label: 'Vencidas' },
  ];

  return (
    <section className={styles.screen} aria-label="Histórico de faturas">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Mês a mês</span>
          <h2>Histórico de faturas</h2>
          <p>Consulte cada ciclo, os valores pagos e as parcelas que compõem a fatura.</p>
        </div>
        <span className={styles.muted}>{invoices.length} fatura(s)</span>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Filtrar faturas por situação">
          {filters.map(item => (
            <button key={item.value} type="button" className={styles.filter}
              aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className={styles.selectLabel}>
          Ano do fechamento
          <select className={styles.select} value={year} onChange={event => setYear(event.target.value)}>
            <option value="">Todos os anos</option>
            {years.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      <div className={styles.list}>
        {filtered.map(invoice => {
          const isExpired = getInvoiceVisualStatus(invoice) === 'EXPIRED';

          return (
            <article key={invoice.id} className={styles.historyItem}>
              <button
                type="button"
                className={styles.historyDetails}
                onClick={() => onSelect(invoice.id)}
                aria-label={`Ver fatura de ${formatInvoiceMonth(invoice.closingDate)}`}
              >
                <div>
                  <strong>{formatInvoiceMonth(invoice.closingDate)}</strong>
                  <small>Limite do ciclo: {invoice.limit == null ? 'Não informado' : formatCurrencyLabel(invoice.limit)}</small>
                </div>
                <div>
                  <small>Fechamento: {formatInvoiceDate(invoice.closingDate)}</small>
                  <small>Vencimento: {formatInvoiceDate(invoice.expirationDate)}</small>
                </div>
              </button>
              <InvoiceStatusBadge invoice={invoice} />
              {isExpired ? (
                <button type="button" className={`${styles.primary} ${styles.historyPay}`} onClick={() => onPay(invoice.id)}>
                  Pagar fatura
                </button>
              ) : (
                <button type="button" className={styles.historyOpen} onClick={() => onSelect(invoice.id)}>
                  Ver detalhes <ChevronRight size={18} aria-hidden="true" />
                </button>
              )}
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <ReceiptText size={28} aria-hidden="true" />
          <p>{invoices.length ? 'Nenhuma fatura corresponde aos filtros selecionados.' : 'Este cartão ainda não possui faturas cadastradas.'}</p>
        </div>
      )}
    </section>
  );
}
