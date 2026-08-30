import { Repeat } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import type { FinancialActivity } from '../../types/FinancialActivity';

import styles from './ActivityListItem.module.css';

// Dica: Futuramente você pode mover esta função para um arquivo como utils/formatters.ts
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
};

interface ActivityListItemProps {
  activity: FinancialActivity;
}

function ActivityListItem({ activity }: ActivityListItemProps) {
  const isIncome = activity.type === 'CREDIT';
  const isPending = activity.status === 'PENDING';
  const isProjected = activity.status === undefined; // recorrência ainda não efetivada nesse mês

  const statusLabel = isProjected ? 'Prevista' : isPending ? 'Pendente' : 'Efetivado';
  const statusStyle = isProjected || isPending ? styles.statusPending : styles.statusCompleted;

  return (
    <div className={`p-4 rounded-2xl border flex items-center justify-between group ${styles.activityCard}`}>
      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border relative ${isIncome ? styles.iconIncome : styles.iconDefault}`}>
          <DynamicIcon name={activity.icon as IconName} size={18} />
          {activity.isRecurrent && (
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 shadow-sm ${styles.bgAccent} ${styles.borderDefault}`}>
              <Repeat size={8} className={styles.textWhite} />
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <span className={`text-sm font-semibold truncate ${styles.activityTitle}`}>
            {activity.title}
          </span>
          <span className={`text-xs flex items-center gap-1.5 truncate mt-0.5 ${styles.textMuted}`}>
            <span>{activity.category.name}</span>
            <span className={`w-1 h-1 rounded-full shrink-0 ${styles.bgBorderHover}`} />
            <span className="truncate">{activity.wallet.name}</span>
          </span>
        </div>
      </div>
      <div className="text-right flex flex-col shrink-0 ml-4">
        <span className={`text-sm font-bold tabular-nums ${isIncome ? styles.textIncome : styles.textMain} ${(isPending || isProjected) ? 'opacity-60' : 'opacity-100'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(activity.amount)}
        </span>
        <span className={`text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded-md inline-block w-fit ml-auto border ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
}

export default ActivityListItem;