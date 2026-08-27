import { AlertTriangle, Check, ChevronRight, Repeat, UserCheck, Zap } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { RecurrenceResponse } from '../../../../models/recurrence/RecurrenceResponse';
import BankBrandMark from '../../../transactionModal/components/TxWalletBrandMark/TxWalletBrandMark';
import { formatCurrency, formatDate, getDaysDifference, parseLocalDate, translateFrequency } from '../../utils/recurrenceUtils';
import styles from './RecurrenceCard.module.css';

interface RecurrenceCardProps {
  item: RecurrenceResponse;
  onSelect: (r: RecurrenceResponse) => void;
  onConfirm?: (r: RecurrenceResponse) => void;
}

export const RecurrenceCard = ({
  item,
  onSelect,
  onConfirm
}: RecurrenceCardProps) => {
  const isIncome = item.type === 'CREDIT';
  const days = getDaysDifference(item.nextExecutionDate);
  const isOverdue = days !== null && days < 0;
  const isToday = days === 0;
  const isAuto = item.executionType === 'AUTOMATIC';
  const isPaused = item.status === 'PAUSED';

  const isConfirmableInCurrentPeriod = (() => {
    const next = parseLocalDate(item.nextExecutionDate);
    const now = new Date();

    if (item.frequencyType === 'YEARLY') {
      return next.getFullYear() === now.getFullYear();
    }

    // MONTHLY e BIWEEKLY — mesmo mês/ano
    return (
      next.getFullYear() === now.getFullYear() &&
      next.getMonth() === now.getMonth()
    );
  })();

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group ${isPaused ? styles.bgPaused : styles.surface} interactive-card p-4 sm:p-4.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isOverdue ? 'border-amber-500/30 dark:border-amber-500/20' : styles.borderDefault
      }`}
    >
      {/* Borda Lateral Colorida de Identidade Visual */}
      <div
        className="absolute top-0 left-0 w-1.5 h-full transition-all duration-200 group-hover:w-2"
        style={{ backgroundColor: item.category.color }}
      />

      {/* Conteúdo Principal Esquerda */}
      <div className="flex items-start sm:items-center gap-3.5 pl-1 min-w-0">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-sm transition-transform group-hover:scale-105"
          style={{ backgroundColor: item.category.color }}
        >
          <DynamicIcon name={item.category.icon as IconName} size={20} />
        </div>

        <div className="min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`font-heading font-semibold text-sm sm:text-base ${styles.textMain} truncate`}>
              {item.description}
            </h4>

            {/* Badges do Item */}
            <span className={`font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${
              isAuto ? styles.badgeAccent : `${styles.elevated} ${styles.textMuted} border ${styles.borderLight}`
            }`}>
              {isAuto ? <Zap size={10} /> : <UserCheck size={10} />}
              <span>{isAuto ? 'Automática' : 'Manual'}</span>
            </span>

            {isOverdue && (
              <span className={`font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${styles.badgeWarning}`}>
                <AlertTriangle size={10} />
                <span>Pendente ({Math.abs(days!)}d atrás)</span>
              </span>
            )}
          </div>

          <div className={`font-body flex items-center gap-2 text-xs font-normal ${styles.textMuted} flex-wrap`}>
            <span>{item.category.name}</span>
            <span>•</span>
            {item.wallet.bank ? (
              <BankBrandMark bank={item.wallet.bank} size='sm' />
            ) : (
              <BankBrandMark wallet={item.wallet} size='sm' />
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Repeat size={11} className={styles.textMuted} />
              {translateFrequency(item.frequencyType)}
            </span>
            <span>•</span>
            <span className={isOverdue ? 'text-amber-600 dark:text-amber-400 font-medium' : isToday ? `${styles.textExpense} font-semibold` : ''}>
              {isToday ? 'Vence Hoje' : isOverdue ? `Venceu em ${formatDate(item.nextExecutionDate)}` : `Próxima: ${formatDate(item.nextExecutionDate)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Valores & Ação Directa */}
      <div className={`flex items-center justify-between md:justify-end gap-4 shrink-0 pl-1 pt-2 md:pt-0 border-t md:border-t-0 ${styles.borderLight}`}>
        <div className="text-left md:text-right">
          <span className={`font-body text-[10px] font-medium ${styles.textMuted} uppercase tracking-wider block md:hidden`}>Valor</span>
          <div className={`font-metric font-bold text-lg sm:text-xl ${isIncome ? styles.textIncome : styles.textMain}`}>
            {isIncome ? '+ ' : '- '}{formatCurrency(item.amount)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isAuto && onConfirm && item.executionType === 'MANUALLY' && item.status === 'ACTIVE' && isConfirmableInCurrentPeriod && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onConfirm(item);
              }}
              className="font-body px-3 py-1.5 rounded-xl bg-[#5B21B6] text-white text-xs font-medium hover:bg-[#4C1D95] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Registrar liquidação"
            >
              <Check size={14} />
              <span>Confirmar</span>
            </button>
          )}

          <div className={`p-1.5 rounded-lg ${styles.textMuted} group-hover:text-main group-hover:bg-elevated transition-all`}>
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};