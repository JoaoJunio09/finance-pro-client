import { ChevronRight } from 'lucide-react';
import type { ElementType } from 'react';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import ProgressBar from '../BudgetOverview/ProgressBar/ProgressBar';

import styles from './TopCategories.module.css';

export interface TopCategoryItem {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: ElementType;
}

interface TopCategoriesProps {
  categories: TopCategoryItem[];
  showBalance: boolean;
  onViewAll: () => void;
  onCategoryClick: (categoryId: string) => void;
}

export function TopCategories({ categories, showBalance, onViewAll, onCategoryClick }: TopCategoriesProps) {
  return (
    <div className={`interactive-card rounded-[2rem] p-6 sm:p-8 flex flex-col gap-5 shadow-sm border ${styles.card}`}>
      <div className="flex justify-between items-center">
        <h3 className={`text-base font-semibold ${styles.title}`}>Onde você mais gastou</h3>
        <button onClick={onViewAll} className={`text-xs font-medium flex items-center gap-1 transition-all ${styles.actionLink}`} type="button">
          Ver todas <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-5 mt-1">
        {categories.slice(0, 3).map((cat) => (
          <div key={cat.id} className={`flex flex-col gap-2 group cursor-pointer ${styles.row}`} onClick={() => onCategoryClick(cat.id)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${styles.iconWrap}`}>
                  <cat.icon size={16} />
                </div>
                <span className={`text-sm font-medium transition-colors ${styles.categoryName}`}>{cat.name}</span>
              </div>
              <span className={`text-sm font-bold ${styles.amount}`}>
                {showBalance ? formatCurrencyLabel(cat.amount) : '••••'}
              </span>
            </div>
            <div className="pl-12">
              <ProgressBar percentage={cat.percentage} colorVar="--accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;