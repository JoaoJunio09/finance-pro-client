import styles from './StatSummaryCard.module.css';

export type StatTone = 'income' | 'expense' | 'neutral';

interface StatSummaryCardProps {
  label: string;
  value: string;
  caption?: string;
  tone?: StatTone;
  interactive?: boolean;
}

const toneValueClassMap: Record<StatTone, string> = {
  income: styles.valueIncome,
  expense: styles.valueExpense,
  neutral: styles.valueNeutral,
};

export function StatSummaryCard({ label, value, caption, tone = 'neutral', interactive = false }: StatSummaryCardProps) {
  return (
    <div className={`p-5 rounded-2xl border flex flex-col gap-1 ${styles.card} ${interactive ? `shadow-sm ${styles.cardInteractive}` : ''}`}>
      <span className={`text-xs font-medium ${styles.label}`}>{label}</span>
      <span className={`text-2xl font-bold ${toneValueClassMap[tone]}`}>{value}</span>
      {caption && <span className={`text-xs mt-1 ${styles.caption}`}>{caption}</span>}
    </div>
  );
}

export default StatSummaryCard;