import type { ElementType } from 'react';
import { formatCurrencyLabel } from '../../../../../utils/FormatCurrency';
import styles from './MetricCard.module.css';

type MetricVariant = 'income' | 'expense' | 'accent';

interface MetricCardProps {
  title: string;
  amount: number;
  icon: ElementType;
  variant: MetricVariant;
  showBalance: boolean;
}

const variantClassMap: Record<MetricVariant, { card: string; icon: string; value: string }> = {
  income: { card: styles.cardDefault, icon: styles.iconIncome, value: styles.valueDefault },
  expense: { card: styles.cardDefault, icon: styles.iconExpense, value: styles.valueDefault },
  accent: { card: styles.cardAccent, icon: styles.iconAccent, value: styles.valueAccent },
};

export function MetricCard({ title, amount, icon: Icon, variant, showBalance }: MetricCardProps) {
  const classes = variantClassMap[variant];

  return (
    <div className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm border interactive-card ${classes.card}`}>
      <div className="flex justify-between items-start">
        <span className={`text-xs sm:text-sm font-medium ${variant === 'accent' ? styles.titleAccent : styles.titleDefault}`}>
          {title}
        </span>
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${classes.icon}`}>
          <Icon size={18} />
        </div>
      </div>
      <span className={`text-xl sm:text-2xl font-bold tracking-tight tabular-nums truncate ${classes.value}`}>
        {showBalance ? formatCurrencyLabel(amount) : 'R$ •••••'}
      </span>
    </div>
  );
}

export default MetricCard;