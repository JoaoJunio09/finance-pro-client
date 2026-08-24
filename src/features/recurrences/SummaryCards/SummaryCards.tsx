import { CalendarDays, CheckCircle2, PauseCircle, Repeat } from 'lucide-react';
import { useMemo } from 'react';
import styles from './SummaryCards.module.css';
import type { Recurrence } from '../types/recurrence';
import { formatCurrency, getDaysUntil } from '../utils/recurrenceUtils';

interface SummaryCardsProps {
  recurrences: Recurrence[];
}

export const SummaryCards = ({ recurrences }: SummaryCardsProps) => {
  const summary = useMemo(() => {
    let activeCount = 0;
    let pausedCount = 0;
    let recurringCommitments = 0;
    let upcomingCount = 0;

    recurrences.forEach((r) => {
      if (r.status === 'active') activeCount++;
      if (r.status === 'paused') pausedCount++;
      if (r.status === 'active' && r.type === 'expense') recurringCommitments += r.amount;
      if (r.status === 'active' && r.nextDate) {
        const days = getDaysUntil(r.nextDate);
        if (days !== null && days >= 0 && days <= 7) upcomingCount++;
      }
    });
    
    return { activeCount, pausedCount, recurringCommitments, upcomingCount };
  }, [recurrences]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-30 pt-6">
      
      {/* Ativas */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Ativas</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.iconActive}`}>
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textMain}`}>{summary.activeCount}</div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>Regras em funcionamento</p>
      </div>

      {/* Compromissos Recorrentes */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Compromissos</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.iconCommitment}`}>
            <Repeat size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textCommitment}`}>
          {formatCurrency(summary.recurringCommitments)}
        </div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>Valor estimado (saídas ativas)</p>
      </div>

      {/* Próximos 7 dias */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Próximos 7 dias</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.iconUpcoming}`}>
            <CalendarDays size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textMain}`}>{summary.upcomingCount}</div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>Ocorrências iminentes</p>
      </div>

      {/* Pausadas */}
      <div className={`p-5 rounded-2xl shadow-sm transition-all border ${styles.card}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${styles.textMuted}`}>Pausadas</span>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.iconPaused}`}>
            <PauseCircle size={18} />
          </div>
        </div>
        <div className={`text-2xl font-bold ${styles.textPaused}`}>{summary.pausedCount}</div>
        <p className={`text-xs mt-1 ${styles.textMuted}`}>Aguardando reativação</p>
      </div>

    </div>
  );
};