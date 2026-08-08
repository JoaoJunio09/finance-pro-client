import type { ElementType } from 'react';
import TrendIndicator, { type Trend } from '../TrendIndicator/TrendIndicator';

import styles from './AnalyticsMetric.module.css';

export type MetricTone = 'income' | 'expense' | 'neutral';

interface AnalyticsMetricProps {
  title: string;
  amount: number;
  trend: Trend;
  trendValue: number;
  icon: ElementType;
  tone: MetricTone;
  animationDelay?: string;
  subtitle?: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const toneClassMap: Record<MetricTone, string> = {
  income: styles.iconIncome,
  expense: styles.iconExpense,
  neutral: styles.iconNeutral,
};

export function AnalyticsMetric({
  title,
  amount,
  trend,
  trendValue,
  icon: Icon,
  tone,
  animationDelay,
  subtitle,
}: AnalyticsMetricProps) {
  return (
    <div
      className={`interactive-card rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden group animate-fade-in-up shadow-sm border ${styles.card}`}
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span className={`text-xs sm:text-sm font-medium truncate ${styles.title}`}>{title}</span>
          <span className={`text-base sm:text-2xl lg:text-3xl font-bold tracking-tight tabular-nums mt-0.5 sm:mt-1 truncate ${styles.amount}`}>
            {formatCurrency(amount)}
          </span>
          {subtitle && <span className={`text-[10px] sm:text-xs font-normal truncate ${styles.subtitle}`}>{subtitle}</span>}
        </div>
        <div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center border transition-colors duration-300 ${toneClassMap[tone]}`}>
          <Icon size={18} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
        </div>
      </div>

      <div className={`mt-1 sm:mt-2 pt-2 sm:pt-3 border-t ${styles.footerBorder}`}>
        <TrendIndicator trend={trend} value={trendValue} showLabel={false} />
      </div>
    </div>
  );
}

export default AnalyticsMetric;