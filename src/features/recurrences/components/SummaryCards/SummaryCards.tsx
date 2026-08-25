import { Repeat, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/recurrenceUtils';
import styles from './SummaryCards.module.css';

interface SummaryCardsProps {
  count: number;
  income: number;
  expense: number;
}

export const SummaryCards = ({ count, income, expense }: SummaryCardsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className={`${styles.surface} p-5 rounded-3xl flex items-center justify-between shadow-sm`}>
      <div>
        <span className={`font-body text-xs font-medium ${styles.textMuted} uppercase tracking-wider block mb-1`}>
          Recorrências Ativas
        </span>
        <div className={`font-metric text-2xl font-bold ${styles.textMain} flex items-baseline gap-1.5`}>
          {count}
          <span className={`font-body text-sm font-normal ${styles.textMuted} normal-case tracking-normal`}>
            contratos
          </span>
        </div>
      </div>
      <div className={`w-12 h-12 rounded-full ${styles.badgeAccent} flex items-center justify-center`}>
        <Repeat size={24} />
      </div>
    </div>

    <div className={`${styles.surface} p-5 rounded-3xl flex items-center justify-between shadow-sm`}>
      <div>
        <span className={`font-body text-xs font-medium ${styles.textMuted} uppercase tracking-wider block mb-1`}>
          Entradas Estimadas / Mês
        </span>
        <div className={`font-metric text-2xl font-bold ${styles.textIncome}`}>{formatCurrency(income)}</div>
      </div>
      <div className={`w-12 h-12 rounded-full ${styles.badgeIncome} flex items-center justify-center`}>
        <ArrowUpRight size={24} />
      </div>
    </div>

    <div className={`${styles.surface} p-5 rounded-3xl flex items-center justify-between shadow-sm`}>
      <div>
        <span className={`font-body text-xs font-medium ${styles.textMuted} uppercase tracking-wider block mb-1`}>
          Saídas Estimadas / Mês
        </span>
        <div className={`font-metric text-2xl font-bold ${styles.textExpense}`}>{formatCurrency(expense)}</div>
      </div>
      <div className={`w-12 h-12 rounded-full ${styles.badgeExpense} flex items-center justify-center`}>
        <ArrowDownRight size={24} />
      </div>
    </div>
  </div>
);