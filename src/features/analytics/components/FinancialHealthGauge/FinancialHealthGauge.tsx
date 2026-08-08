import { TrendingUp } from 'lucide-react';

import styles from './FinancialHealthGauge.module.css';

export type HealthStatus = 'Excelente' | 'Muito Boa' | 'Boa' | 'Regular' | 'Crítica';

interface FinancialHealthGaugeProps {
  score: number;
  status: HealthStatus;
  trendMonth: number;
}

// Faixas de score → tom semântico. Isolado aqui porque só o gauge precisa
// traduzir score em cor; o resto da feature não deveria conhecer os limiares.
function getHealthTone(score: number): 'income' | 'accent' | 'warning' | 'expense' {
  if (score >= 80) return 'income';
  if (score >= 60) return 'accent';
  if (score >= 40) return 'warning';
  return 'expense';
}

const toneVarMap: Record<ReturnType<typeof getHealthTone>, string> = {
  income: 'var(--income)',
  accent: 'var(--accent)',
  warning: 'var(--warning)',
  expense: 'var(--expense)',
};

export function FinancialHealthGauge({ score, status, trendMonth }: FinancialHealthGaugeProps) {
  const radius = 54;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const tone = getHealthTone(score);
  const color = toneVarMap[tone];

  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      <div className="relative w-48 h-28 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 120 70">
          <defs>
            <linearGradient id="scoreArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <path d="M 10,65 A 50,50 0 0,1 110,65" fill="none" className={styles.trackArc} strokeWidth="10" strokeLinecap="round" />
          <path
            d="M 10,65 A 50,50 0 0,1 110,65"
            fill="none"
            stroke="url(#scoreArcGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={styles.progressArc}
          />
        </svg>

        <div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-0.5">
            <span className="text-4xl font-extrabold tracking-tight" style={{ color }}>{score}</span>
            <span className={`text-xs font-bold ${styles.scoreMax}`}>/100</span>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border mt-1 shadow-sm ${styles.statusBadge}`}>
            {status}
          </span>
        </div>
      </div>

      <div className={`flex items-center gap-1.5 text-xs font-medium mt-2 px-3 py-1 rounded-full border ${styles.trendBadge}`}>
        <TrendingUp size={13} />
        <span>+{trendMonth}% este mês</span>
      </div>
    </div>
  );
}

export default FinancialHealthGauge;