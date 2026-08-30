import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategorySpending } from '../../../../../models/account/AnalyticsResponse';
import { formatCurrencyLabel } from '../../../../../utils/FormatCurrency';
import styles from './CategoriesSubpage.module.css';

interface CategoriesSubpageProps {
  categories: CategorySpending[];
}

const FALLBACK_COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];

export function CategoriesSubpage({ categories }: CategoriesSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className={`p-6 rounded-3xl flex flex-col items-center justify-center min-h-[300px] border ${styles.card}`}>
          <h3 className={`text-base font-bold self-start mb-2 ${styles.cardTitle}`}>Composição Percentual</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={categories} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="amount">
                  {categories.map((entry, index) => (
                    <Cell key={entry.id} fill={entry.color || FALLBACK_COLORS[index % FALLBACK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrencyLabel(value)} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`lg:col-span-2 p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}>
          <h3 className={`text-base font-bold ${styles.cardTitle}`}>Detalhamento por Categoria</h3>
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <div key={cat.id} className={`p-4 rounded-2xl border flex items-center justify-between ${styles.categoryRow}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                  >
                    <DynamicIcon name={cat.icon as IconName} size={18} />
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${styles.categoryName}`}>{cat.name}</h4>
                    {/* <span className={`text-xs ${styles.categoryMeta}`}>{cat.transactionCount} transações registradas</span> */}
                    <span className={`text-xs ${styles.categoryMeta}`}>12 transações registradas</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold block ${styles.categoryAmount}`}>{formatCurrencyLabel(cat.amount)}</span>
                  <span className={`text-xs font-medium ${styles.categoryMeta}`}>{cat.percentage.toFixed(1)}% do total</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CategoriesSubpage;