import { Calendar, ChevronRight, CreditCard, RefreshCw } from 'lucide-react';
import { CATEGORIES, WALLETS } from '../../mocks/recurrenceMocks';
import type { Recurrence } from '../../types/recurrence';
import { formatCurrency, formatDate, getDaysUntil } from '../../utils/recurrenceUtils';

import styles from './RecurrenceCard.module.css';

interface RecurrenceCardProps {
  recurrence: Recurrence;
  onClick: (id: string) => void;
}

export const RecurrenceCard = ({ recurrence, onClick }: RecurrenceCardProps) => {
  const category = CATEGORIES[recurrence.categoryId] || CATEGORIES.outros;
  const wallet = WALLETS[recurrence.walletId];
  const CategoryIcon = category.icon;
  
  const daysUntil = getDaysUntil(recurrence.nextDate);
  const isImminent = daysUntil !== null && daysUntil >= 0 && daysUntil <= 5;

  const getStatusBadge = () => {
    switch (recurrence.status) {
      case 'active':
        return <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full ${styles.badgeActive}`}>Ativa</span>;
      case 'paused':
        return <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full ${styles.badgePaused}`}>Pausada</span>;
      case 'finished':
        return <span className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-full ${styles.badgeFinished}`}>Finalizada</span>;
    }
  };

  const getFrequencyText = () => {
    const freqs: Record<string, string> = {
      daily: 'Diário', weekly: 'Semanal', biweekly: 'Quinzenal', monthly: 'Mensal', yearly: 'Anual'
    };
    return freqs[recurrence.frequency] || recurrence.frequency;
  };

  return (
    <div 
      onClick={() => onClick(recurrence.id)}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group shadow-sm hover:shadow-md ${styles.card}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        
        {/* Ícone da Categoria */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
          style={{ backgroundColor: category.bgColor, color: category.color }}
        >
          <CategoryIcon size={24} />
        </div>

        {/* Detalhes Principais */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm sm:text-base font-bold truncate ${styles.textMain}`}>
              {recurrence.description}
            </h4>
            {getStatusBadge()}
            {isImminent && recurrence.status === 'active' && (
              <span className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full animate-pulse">
                <Calendar size={12} /> Em {daysUntil} dias
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium flex-wrap">
            <div className={`flex items-center gap-1.5 ${styles.textMuted}`}>
              <RefreshCw size={14} />
              {getFrequencyText()}
            </div>
            <div className={`w-1 h-1 rounded-full ${styles.textMuted}`} />
            <div className={`flex items-center gap-1.5 ${styles.textMuted}`}>
              <CreditCard size={14} />
              {wallet?.name || 'Carteira não encontrada'}
            </div>
          </div>
        </div>

        {/* Valores e Próxima Data */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none gap-1">
          <div className={`text-base sm:text-lg font-black tracking-tight ${recurrence.type === 'income' ? styles.textIncome : styles.textExpense}`}>
            {recurrence.type === 'income' ? '+' : '-'}{formatCurrency(recurrence.amount)}
          </div>
          <div className={`text-[11px] sm:text-xs font-semibold ${styles.textMuted}`}>
            {recurrence.status === 'active' ? (
              <span>Próx: <strong className={styles.textMain}>{formatDate(recurrence.nextDate)}</strong></span>
            ) : (
              <span>Última: {formatDate(recurrence.history[0]?.date || recurrence.startDate)}</span>
            )}
          </div>
        </div>

        {/* Seta de Ação */}
        <div className={`hidden sm:flex items-center justify-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300 ${styles.textMuted}`}>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};