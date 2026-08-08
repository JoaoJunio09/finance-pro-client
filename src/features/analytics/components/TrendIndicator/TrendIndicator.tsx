import { Activity, TrendingDown, TrendingUp } from 'lucide-react';

import styles from './TrendIndicator.module.css';

export type Trend = 'up' | 'down' | 'neutral';

interface TrendIndicatorProps {
  trend: Trend;
  value: number;
  showLabel?: boolean;
}

function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1).replace('.', ',')}%`;
}

export function TrendIndicator({ trend, value, showLabel = true }: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  let Icon = Activity;
  if (trend === 'up') Icon = TrendingUp;
  if (trend === 'down') Icon = TrendingDown;

  const toneClass = isPositive ? styles.tonePositive : isNegative ? styles.toneNegative : styles.toneNeutral;

  return (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
      <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-colors ${styles.iconWrap} ${toneClass}`}>
        <Icon size={12} strokeWidth={2.5} />
      </span>
      <span className={`truncate ${styles.text} ${toneClass}`}>{formatPercent(value)}</span>
      {showLabel && (
        <span className={`font-normal tracking-tight ml-1 hidden sm:inline truncate ${styles.label}`}>
          vs. período anterior
        </span>
      )}
    </div>
  );
}

export default TrendIndicator;