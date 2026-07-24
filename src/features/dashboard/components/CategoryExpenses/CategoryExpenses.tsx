import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { ExpensesByCategory } from "../../../../models/account/DashboardOverview";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";

import styles from './CategoryExpenses.module.css';

type ExpensesByCategoryVariant = 'success' | 'info' | 'warning' | 'danger' | 'primary';

interface CategoryExpensesProps {
	expensesByCategory: ExpensesByCategory[];
	onViewReport?: () => void;
}

function CategoryExpenses({ expensesByCategory, onViewReport }: CategoryExpensesProps) {
	return (
		<div className="flex flex-col gap-5 mt-2">
			<div className="flex items-center justify-between">
				<h3 className="text-[11px] uppercase tracking-widest text-muted font-bold">Despesas por Categoria</h3>
				<button onClick={onViewReport} className={`text-[10px] font-bold uppercase tracking-widest ${styles.sectionLink}`}>
					Ver Relatório
				</button>
			</div>

			<div className="flex flex-col gap-4">
				{expensesByCategory.map((cat) => {
					let variantGlow = styles[`glow${capitalize(getVariantColors(cat))}`];
					let variantIcon = styles[`icon${capitalize(getVariantColors(cat))}`];
					let variantBar = styles[`bar${capitalize(getVariantColors(cat))}`];

					return (
						<div key={cat.category.id} className={`relative p-4 rounded-[24px] bg-glass border-glass overflow-hidden group cursor-pointer ${styles.categoryCard}`}>
							<div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${styles.categoryGlow} ${variantGlow}`} />

							<div className="relative z-10 flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${styles.categoryIcon} ${variantIcon}`}>
											<DynamicIcon name={cat.category.icon as IconName} className="w-5 h-5" />
										</div>
										<div className="flex flex-col justify-center">
											<h5 className="text-sm font-semibold text-main mb-0.5">{cat.category.name}</h5>
											<span className="text-[10px] uppercase tracking-widest text-muted font-medium">{cat.percentage}% do total</span>
										</div>
									</div>
									<span className="font-display text-base font-medium text-main tabular-nums">{formatCurrencyLabel(cat.amount)}</span>
								</div>

								<div className={`w-full h-1.5 rounded-full overflow-hidden ${styles.progressTrack}`}>
									<div
										className={`h-full rounded-full ${styles.progressBar} ${variantBar}`}
										style={{ width: `${cat.percentage}%` }}
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getVariantColors(expensesByCategory: ExpensesByCategory): ExpensesByCategoryVariant {
	const percentage = expensesByCategory.percentage
	if (percentage >= 10 && percentage <= 20) {
		return 'primary';
	} else if (percentage <= 50) {
		return 'info';
	} else if (percentage <= 70) {
		return 'warning';
	} else if (percentage > 70)  {
		return 'danger';
	}
	return 'success';
}


export default CategoryExpenses;