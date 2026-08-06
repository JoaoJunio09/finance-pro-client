import { Bell } from 'lucide-react';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';

import styles from './WatchList.module.css';

export type WatchListVariant = 'due-today' | 'warning';

export interface WatchListItem {
  id: string;
  variant: WatchListVariant;
  tagLabel: string;
  title: string;
  amount?: number;
  message?: string;
}

interface WatchListProps {
  items: WatchListItem[];
  showBalance: boolean;
  onItemClick: (itemId: string) => void;
}

export function WatchList({ items, showBalance, onItemClick }: WatchListProps) {
  return (
    <div className={`interactive-card rounded-[2rem] p-6 sm:p-8 flex flex-col gap-5 shadow-sm border ${styles.card}`}>
      <h3 className={`text-base font-semibold flex items-center gap-2 ${styles.title}`}>
        <Bell size={18} className={styles.titleIcon} /> Fique de Olho
      </h3>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const isDueToday = item.variant === 'due-today';
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex flex-col gap-1.5 shadow-sm transition-colors cursor-pointer ${styles.item} ${
                isDueToday ? styles.itemDueToday : styles.itemWarning
              }`}
              onClick={() => onItemClick(item.id)}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isDueToday ? styles.tagDueToday : styles.tagWarning}`}>
                  {item.tagLabel}
                </span>
              </div>
              <span className={`text-sm font-medium ${styles.itemTitle}`}>{item.title}</span>
              {item.amount !== undefined && (
                <span className={`text-xs font-normal ${styles.itemMeta}`}>
                  Valor: <span className={styles.itemMetaStrong}>{showBalance ? formatCurrencyLabel(item.amount) : '••••'}</span>
                </span>
              )}
              {item.message && (
                <span className={`text-xs font-normal leading-relaxed ${styles.itemMeta}`}>{item.message}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;