import { ArrowDownRight, ArrowUpRight, Clock, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useMemo } from 'react';
import type { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/transactionUtils';

import styles from './SummaryCards.module.css';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export const SummaryCards = ({ transactions }: SummaryCardsProps) => {
  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let pendingCount = 0;
    let pendingTotal = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
      }

      if (tx.status === 'pending') {
        pendingCount += 1;
        pendingTotal += tx.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, netBalance, pendingCount, pendingTotal };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Card Receitas */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Total de Receitas</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.bgIncomeMuted} ${styles.textIncome}`}>
            <ArrowUpRight size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textIncome}`}>
          {formatCurrency(summary.totalIncome)}
        </div>
        <p className={`text-xs mt-1 flex items-center gap-1 ${styles.textMuted}`}>
          <TrendingUp size={12} className={styles.textIncome} /> Entradas confirmadas no mês
        </p>
      </div>

      {/* Card Despesas */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Total de Despesas</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.bgExpenseMuted} ${styles.textExpense}`}>
            <ArrowDownRight size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textExpense}`}>
          {formatCurrency(summary.totalExpense)}
        </div>
        <p className={`text-xs mt-1 flex items-center gap-1 ${styles.textMuted}`}>
          <TrendingDown size={12} className={styles.textExpense} /> Saídas acumuladas no mês
        </p>
      </div>

      {/* Card Saldo Líquido */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Saldo Líquido</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.bgAccentMuted} ${styles.textAccent}`}>
            <Wallet size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${summary.netBalance >= 0 ? styles.textMain : styles.textExpense}`}>
          {formatCurrency(summary.netBalance)}
        </div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>
          Balanço mensal atual
        </p>
      </div>

      {/* Card Pendências */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Pendências</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.bgWarningMuted} ${styles.textWarning}`}>
            <Clock size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textWarning}`}>
          {formatCurrency(summary.pendingTotal)}
        </div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>
          {summary.pendingCount} {summary.pendingCount === 1 ? 'transação pendente' : 'transações pendentes'}
        </p>
      </div>

    </div>
  );
};