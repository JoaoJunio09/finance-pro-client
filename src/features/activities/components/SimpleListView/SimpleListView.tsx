import { ListFilter } from 'lucide-react';
import { ActivityListItem } from '../ActivityListItem/ActivityListItem';

import type { FinancialActivity } from '../../types/FinancialActivity';
import styles from './SimpleListView.module.css';

interface SimpleListViewProps {
  title: string;
  desc: string;
  activities: FinancialActivity[];
}

export function SimpleListView({ title, desc, activities }: SimpleListViewProps) {
  return (
    <div className={`rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border min-h-[500px] ${styles.viewCard}`}>
      <div>
        <h3 className={`text-base sm:text-lg font-bold ${styles.textMain}`}>{title}</h3>
        <p className={`text-xs sm:text-sm font-medium mt-1 ${styles.textMuted}`}>{desc}</p>
      </div>
      
      <div className="flex flex-col gap-3">
        {activities.length > 0 ? (
          activities.map(act => <ActivityListItem key={act.id} activity={act} />)
        ) : (
          <div className={`flex flex-col items-center justify-center py-20 ${styles.textMuted}`}>
            <ListFilter size={32} className="mb-3 opacity-50" />
            <span className="text-sm font-medium">Nenhum registro encontrado.</span>
          </div>
        )}
      </div>
    </div>
  );
}