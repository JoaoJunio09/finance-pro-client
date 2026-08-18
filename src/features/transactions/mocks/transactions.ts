import type { Transaction } from "../types/transaction";

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', description: 'Salário Mensal Tech Corp', amount: 11500.00, date: '2026-06-01', type: 'income', status: 'paid', categoryId: 'salario', walletId: 'w3', isRecurrent: true, notes: 'Depósito referente ao pagamento mensal principal.' },
  { id: 'tx-2', description: 'Aluguel do Apartamento', amount: 3200.00, date: '2026-06-05', type: 'expense', status: 'paid', categoryId: 'moradia', walletId: 'w1', isRecurrent: true, notes: 'Transferência programada via PIX.' },
  { id: 'tx-3', description: 'Supermercado St. Marche', amount: 684.50, date: '2026-06-08', type: 'expense', status: 'paid', categoryId: 'alimentacao', walletId: 'w2' },
  { id: 'tx-4', description: 'Projeto Freelance UX Design', amount: 2800.00, date: '2026-06-10', type: 'income', status: 'paid', categoryId: 'salario', walletId: 'w4', notes: 'Segunda parcela do projeto da landing page.' },
  { id: 'tx-5', description: 'Fatura Cartão Nubank', amount: 2450.80, date: '2026-06-15', type: 'expense', status: 'pending', categoryId: 'compras', walletId: 'w1', isRecurrent: true },
];