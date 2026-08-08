import { ArrowLeft, BarChart3, Calendar, Download } from 'lucide-react';


import styles from './ContextualAnalyticsHeader.module.css';
import AnalyticsTabs, { SUBPAGES, type AnalyticsSubpage } from '../AnalyticsTabs/AnalyticsTabs';

interface ContextualAnalyticsHeaderProps {
  currentSubpage: AnalyticsSubpage;
  onSelectSubpage: (sub: AnalyticsSubpage) => void;
  onGoToReports: () => void;
  periodLabel: string;
}

export function ContextualAnalyticsHeader({
  currentSubpage,
  onSelectSubpage,
  onGoToReports,
  periodLabel,
}: ContextualAnalyticsHeaderProps) {
  const currentOption = SUBPAGES.find((s) => s.id === currentSubpage);
  const isOverview = currentSubpage === 'overview';

  return (
    <div className={styles.wrapper}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 mb-1 h-6">
              {!isOverview ? (
                <button
                  onClick={() => onSelectSubpage('overview')}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group h-full ${styles.backLink}`}
                  type="button"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                  Voltar para Analytics
                </button>
              ) : (
                <div className="flex items-center gap-2 h-full">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${styles.overviewBadge}`}>
                    <BarChart3 size={14} />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wider flex items-center h-full ${styles.overviewLabel}`}>
                    Análises
                  </span>
                </div>
              )}
            </div>

            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${styles.title}`}>
              {isOverview ? 'Analytics' : currentOption?.label}
            </h1>

            <p className={`text-sm hidden sm:block ${styles.subtitle}`}>{currentOption?.description}</p>
          </div>

          <div className={`flex items-center gap-4 self-start sm:self-center w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 ${styles.actionsBorder}`}>
            <div className="hidden sm:flex flex-col items-end">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.periodLabel}`}>Período Analisado</span>
              <span className={`text-sm font-semibold flex items-center gap-1.5 mt-0.5 ${styles.periodValue}`}>
                <Calendar size={14} className={styles.periodIcon} /> {periodLabel}
              </span>
            </div>
            <div className={`h-8 w-px hidden sm:block mx-1 ${styles.divider}`}></div>
            <button
              onClick={onGoToReports}
              className={`flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border shadow-sm transition-all cursor-pointer w-full sm:w-auto group ${styles.exportBtn}`}
              type="button"
            >
              <Download size={15} className={`transition-colors ${styles.exportIcon}`} />
              <span>Gerar relatório</span>
            </button>
          </div>
        </div>

        <AnalyticsTabs currentSubpage={currentSubpage} onSelect={onSelectSubpage} />
      </div>
    </div>
  );
}

export default ContextualAnalyticsHeader;