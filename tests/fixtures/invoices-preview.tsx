// Browser-only contract fixture. No requests or payments reach the real backend.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { MemoryRouter } from 'react-router-dom';
import { AccountProvider } from '../../src/context/AccountContext';
import { AuthProvider } from '../../src/context/AuthContext';
import Wallets from '../../src/features/wallets/Wallets';
import TransactionModal from '../../src/features/transactionModal/TransactionModal';
import api from '../../src/services/api';
import '../../src/global.css';

const now = new Date();
const date = (offset: number, day: number) => {
  const value = new Date(now.getFullYear(), now.getMonth() + offset, day);
  return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, '0'), String(value.getDate()).padStart(2, '0')].join('-');
};
const invoices = [
  { id: 'invoice-current', limit: 8000, status: 'PAYING', closingDate: date(1, 0), expirationDate: date(1, 7), daysUntilExpiration: 7 },
  { id: 'invoice-old', limit: 7500, status: 'PAID', closingDate: date(0, 0), expirationDate: date(0, 7), daysUntilExpiration: 7 },
  { id: 'invoice-overdue', limit: 7500, status: 'EXPIRED', closingDate: date(-1, 0), expirationDate: date(-1, 7), daysUntilExpiration: 7 },
];
const bank = { id: 'bank-nubank', name: 'Nubank', icon: 'nubank', color: '#820AD1', gradient: 'linear-gradient(135deg, #820AD1, #5B078F)', shadow: 'none' };
const wallets = [
  { id: 'card-main', name: 'Nubank crédito', description: 'Cartão de uso pessoal', type: 'CREDIT_CARD', balance: 0, color: '#820AD1', cardDigits: '4582', bank, invoices },
  { id: 'checking', name: 'Conta principal', description: '', type: 'CHECKING', balance: 4000, color: '#4F46E5', cardDigits: '1223', bank, invoices: [] },
  { id: 'empty-card', name: 'Cartão sem faturas', description: '', type: 'CREDIT_CARD', balance: 0, color: '#4F46E5', cardDigits: '1111', bank, invoices: [] },
];
const details = new Map(invoices.map(invoice => {
  const [year, month] = invoice.closingDate.split('-').map(Number);
  const paid = invoice.status === 'PAID';
  return [invoice.id, {
    invoiceId: invoice.id,
    closingDate: invoice.closingDate,
    expirationDate: invoice.expirationDate,
    status: invoice.status,
    totalAmount: 430,
    paidAmount: paid ? 430 : 200,
    pendingAmount: paid ? 0 : 230,
    installments: [
      { id: invoice.id + '-1', installmentPlanId: 'phone', description: 'Celular', value: 200, paid, month, year },
      { id: invoice.id + '-2', installmentPlanId: 'course', description: 'Curso de programação', value: 200, paid: true, month, year },
      { id: invoice.id + '-3', installmentPlanId: 'headphones', description: 'Fones de ouvido', value: 30, paid, month, year },
    ],
  }];
}));
const [currentYear, currentMonth] = invoices[0].closingDate.split('-').map(Number);
const createInstallments = (id: string, value: number, count: number, paidCount: number, startOffset: number) =>
  Array.from({ length: count }, (_, index) => {
    const installmentDate = new Date(currentYear, currentMonth - 1 + startOffset + index, 1);
    return {
      id: `${id}-${index + 1}`,
      value,
      isPaid: index < paidCount,
      month: installmentDate.getMonth() + 1,
      year: installmentDate.getFullYear(),
    };
  });
const installmentPlans = [
  {
    id: 'car', description: 'Prestação do carro', value: 42000, times: 24, fees: 8,
    startDate: date(-7, 10), endDate: date(16, 10), status: 'PAYING', invoice: invoices[0],
    installments: createInstallments('car', 1890, 24, 8, -8),
  },
  {
    id: 'course', description: 'Curso de programação', value: 1200, times: 6, fees: 0,
    startDate: date(-3, 5), endDate: date(2, 5), status: 'PAYING', invoice: invoices[0],
    installments: createInstallments('course', 200, 6, 4, -4),
  },
  {
    id: 'headphones', description: 'Fones de ouvido', value: 899.4, times: 3, fees: 0,
    startDate: date(-5, 15), endDate: date(-3, 15), status: 'PAID', invoice: invoices[1],
    installments: createInstallments('headphones', 299.8, 3, 3, -5),
  },
  {
    id: 'phone', description: 'Celular', value: 2990, times: 12, fees: 20,
    startDate: date(-8, 10), endDate: date(3, 10), status: 'EXPIRED', invoice: invoices[0],
    installments: createInstallments('phone', 299, 12, 8, -9),
  },
];
let failReads = false;
let failPayments = false;
api.defaults.adapter = async config => {
  const url = config.url ?? '';
  const invoiceId = url.split('/')[4];
  let data: unknown;
  if (config.method === 'get' && url.includes('/api/invoices/')) {
    if (failReads) throw new AxiosError('Falha de consulta simulada');
    data = details.get(invoiceId);
  } else if (config.method === 'patch' && url.includes('/api/invoices/')) {
    if (failPayments) throw new AxiosError('Falha de pagamento simulada');
    const current = details.get(invoiceId)!;
    const targetId = url.includes('/installments/') ? url.split('/').at(-1) : undefined;
    const pending = current.installments.filter(item => !item.paid && (!targetId || item.id === targetId));
    const amount = pending.reduce((total, item) => total + item.value, 0);
    pending.forEach(item => { item.paid = true; });
    current.paidAmount += amount;
    current.pendingAmount -= amount;
    wallets[1].balance -= amount;
    if (!targetId) {
      current.status = 'PAID';
      invoices.find(item => item.id === invoiceId)!.status = 'PAID';
      const next = { ...invoices[0], id: 'invoice-next', status: 'PAYING', closingDate: date(2, 0), expirationDate: date(2, 7) };
      if (!invoices.some(item => item.id === next.id)) invoices.push(next);
      details.set(next.id, { ...current, invoiceId: next.id, status: next.status, closingDate: next.closingDate, expirationDate: next.expirationDate, totalAmount: 0, paidAmount: 0, pendingAmount: 0, installments: [] });
    }
    data = current;
  } else if (url === '/api/wallets/v1') {
    data = wallets;
  } else if (url.startsWith('/api/wallets/v1/')) {
    data = wallets.find(wallet => wallet.id === url.split('/').at(-1));
  } else if (url.includes('/banks/')) {
    data = [bank];
  } else if (url.includes('/categories/')) {
    data = [{ id: 'shopping', name: 'Compras', type: 'DEBIT', icon: 'shopping-bag', color: '#820AD1' }];
  } else if (url.startsWith('/api/installmentPlans/v1/wallet/') && config.method === 'get') {
    data = installmentPlans;
  } else if (url === '/api/installmentPlans/v1' && config.method === 'post') {
    data = JSON.parse(config.data);
  } else {
    throw new Error('Request outside test contract: ' + url);
  }
  return { data: structuredClone(data), status: 200, statusText: 'OK', headers: {}, config };
};
sessionStorage.setItem('auth', JSON.stringify({ username: 'fixture', accessToken: 'test-only', roles: ['PRO'] }));
sessionStorage.setItem('account', JSON.stringify({ id: 'fixture-account' }));
const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Preview() {
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [dark, setDark] = useState(true);
  return (
    <>
      <aside className="flex flex-wrap gap-4 border-b border-[var(--border-color)] p-4 text-sm">
        <strong>Ambiente isolado · dados de teste</strong>
        <button onClick={() => { document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark'); setDark(!dark); }}>Alternar tema</button>
        <button onClick={() => setTransactionOpen(true)}>Testar nova compra</button>
        <button onClick={() => { failReads = !failReads; void client.invalidateQueries({ queryKey: ['invoice'] }); }}>Alternar erro de consulta</button>
        <button onClick={() => { failPayments = !failPayments; }}>Alternar erro de pagamento</button>
      </aside>
      <Wallets />
      {transactionOpen && <TransactionModal isOpen onClose={() => setTransactionOpen(false)} initialType="DEBIT" transaction={null} />}
      <Toaster />
    </>
  );
}
document.documentElement.setAttribute('data-theme', 'dark');
createRoot(document.getElementById('root')!).render(
  <MemoryRouter>
    <QueryClientProvider client={client}>
      <AuthProvider><AccountProvider><Preview /></AccountProvider></AuthProvider>
    </QueryClientProvider>
  </MemoryRouter>
);
