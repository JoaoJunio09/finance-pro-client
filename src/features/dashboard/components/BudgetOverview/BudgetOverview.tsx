import { Info } from 'lucide-react';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import ProgressBar from './ProgressBar/ProgressBar';

import styles from './BudgetOverview.module.css';

interface BudgetOverviewProps {
  income: number;
  expense: number;
  showBalance: boolean;
  onAnalyzeFlow: () => void;
}

export function BudgetOverview({ income, expense, showBalance, onAnalyzeFlow }: BudgetOverviewProps) {
  const committedPercentage = income > 0 ? (expense / income) * 100 : 0;

  return (
    <div className={`interactive-card rounded-[2rem] p-6 sm:p-8 flex flex-col gap-5 shadow-sm border ${styles.card}`}>
      <div className="flex justify-between items-center">
        <h3 className={`text-base font-semibold ${styles.title}`}>Gasto vs Orçamento</h3>
        <button onClick={onAnalyzeFlow} className={`text-xs font-medium transition-colors ${styles.actionLink}`} type="button">
          Analisar fluxo
        </button>
      </div>

      <div className="flex flex-col gap-5 mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className={`text-sm font-medium ${styles.rowLabel}`}>Entradas</span>
            <span className={`text-base sm:text-lg font-bold ${styles.incomeValue}`}>
              {showBalance ? formatCurrencyLabel(income) : '••••'}
            </span>
          </div>
          <ProgressBar percentage={100} colorVar="--income" />
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex justify-between items-end">
            <span className={`text-sm font-medium ${styles.rowLabel}`}>Saídass Consolidadas</span>
            <span className={`text-base sm:text-lg font-bold ${styles.expenseValue}`}>
              {showBalance ? formatCurrencyLabel(expense) : '••••'}
            </span>
          </div>
          <ProgressBar percentage={committedPercentage} colorVar="--expense" />
        </div>
      </div>

      <div className={`mt-auto pt-5 border-t flex items-start gap-3 ${styles.footerBorder}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${styles.footerIcon}`}>
          <Info size={16} />
        </div>
        <p className={`text-xs font-medium leading-relaxed ${styles.footerText}`}>
          Você comprometeu <span className={styles.footerTextStrong}>{committedPercentage.toFixed(0)}%</span> da sua
          receita neste período. Sua meta é manter abaixo de 70%.
        </p>
      </div>
    </div>
  );
}

export default BudgetOverview;