import { Calendar, Clock, UserCheck, Zap } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { RecurrenceResponse } from '../../../../models/recurrence/RecurrenceResponse';
import { formatCurrency, getDaysDifference } from '../../utils/recurrenceUtils';
import styles from './UpcomingHighlights.module.css';
import BankBrandMark from '../../../transactionModal/components/TxWalletBrandMark/TxWalletBrandMark';

interface UpcomingHighlightsProps {
  items: RecurrenceResponse[];
  onSelect: (r: RecurrenceResponse) => void;
}

export const UpcomingHighlights = ({
  items,
  onSelect
}: UpcomingHighlightsProps) => {
  if (items.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Clock size={18} className={styles.textAccent} />
          <h3 className={`font-heading font-semibold text-lg ${styles.textMain}`}>Destaques da Semana</h3>
          <span className={`font-body text-xs ${styles.textMuted} font-medium ml-1 ${styles.elevated} px-2 py-0.5 rounded-md border ${styles.borderLight}`}>
            {items.length} próximos
          </span>
        </div>
      </div>

      {/* Container: Flex com Overflow no Mobile -> Grid Responsiva no Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {items.map(item => {
          const days = getDaysDifference(item.nextExecutionDate);
          const isIncome = item.type === 'CREDIT';
          const isToday = days === 0;
          const isTomorrow = days === 1;
          const isAuto = item.executionType === 'AUTOMATIC';

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className={`${styles.surface} interactive-card shrink-0 sm:shrink w-[270px] sm:w-auto p-4.5 rounded-2xl flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden border ${styles.borderDefault} shadow-sm group`}
            >
              {/* Borda Lateral Colorida */}
              <div
                className="absolute top-0 left-0 w-1.5 h-full transition-all duration-200 group-hover:w-2"
                style={{ backgroundColor: item.category.color }}
              />

              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start gap-3 pl-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="p-2.5 rounded-xl text-white shadow-sm shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: item.category.color }}
                  >
                    <DynamicIcon name={item.category.icon as IconName} size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-heading font-semibold text-sm ${styles.textMain} truncate leading-snug`}>
                      {item.description}
                    </h4>
                    <p className={`font-body font-normal text-xs ${styles.textMuted} truncate mt-0.5`}>
                      {item.category.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações Auxiliares & Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pl-1">
                <span className={`font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                  isAuto ? `${styles.badgeAccent} border-transparent` : `${styles.elevated} ${styles.textMuted} ${styles.borderLight}`
                }`}>
                  {isAuto ? <Zap size={10} /> : <UserCheck size={10} />}
                  <span>{isAuto ? 'Automática' : 'Manual'}</span>
                </span>

                {item.wallet.bank ? (
                  <BankBrandMark bank={item.wallet.bank} size='sm' />
                ) : (
                  <BankBrandMark wallet={item.wallet} size='sm' />
                )}
              </div>

              {/* Rodapé com Valor e Vencimento */}
              <div className={`flex items-end justify-between pt-2 border-t ${styles.borderLight} pl-1`}>
                <div>
                  <span className={`font-body text-[11px] font-medium ${styles.textMuted} block mb-0.5`}>
                    {isIncome ? 'Receita' : 'Valor'}
                  </span>
                  <span className={`font-metric font-bold tracking-tight text-lg ${isIncome ? styles.textIncome : styles.textMain}`}>
                    {isIncome ? '+ ' : ''}{formatCurrency(item.amount)}
                  </span>
                </div>

                <div className={`font-body px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 ${
                  isToday ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:border-red-500/20' :
                  isTomorrow ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20' :
                  `${styles.elevated} ${styles.textMuted} ${styles.borderLight}`
                }`}>
                  <Calendar size={12} className="opacity-70" />
                  <span>{isToday ? 'Hoje' : isTomorrow ? 'Amanhã' : `Em ${days}d`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};