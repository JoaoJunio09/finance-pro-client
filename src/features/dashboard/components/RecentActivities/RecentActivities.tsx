import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { TransactionResponse } from "../../../../models/transaction/TransactionResponse";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../../utils/FormatDate";
import styles from './RecentActivities.module.css';

interface RecentActivitiesProps {
	transactions: TransactionResponse[]
}

function RecentActivities({ transactions }: RecentActivitiesProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h3 className="text-[11px] uppercase tracking-widest text-muted font-bold">Fluxo Recente</h3>
				<button className={`text-[10px] font-bold uppercase tracking-widest ${styles.sectionLink}`}>
					Histórico
				</button>
			</div>

			<div className="flex flex-col gap-1">
				{transactions.map((transaction) => {
					const isIncome = transaction.type === 'CREDIT';

					return (
						<div key={transaction.id} className={`relative flex items-center gap-4 p-3 rounded-2xl group cursor-pointer border border-transparent ${styles.activityRow}`}>
							<div
								className={`
									w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 group-hover:scale-105
									${styles.activityIcon}
									${isIncome
										? styles.activityIconIncome
										: styles.activityIconExpense}
								`}
							>
								<DynamicIcon name={transaction.category.icon as IconName} className="w-5 h-5" />
							</div>

							<div className="flex-1 min-w-0 flex flex-col justify-center">
								<h4 className="text-sm font-semibold text-main truncate">{transaction.description}</h4>
								<span className="text-[11px] text-muted mt-0.5 truncate">{transaction.category.name} • {formatRelativeDateTime(transaction.registeredAt)}</span>
							</div>

							<div className="flex flex-col items-end justify-center shrink-0 pl-2">
								<span className={`
										font-display text-sm lg:text-base font-medium tabular-nums
										${isIncome
											? styles.activityAmountIncome
											: 'text-main'}
									`}
								>
									{isIncome ? '+' : '−'}{formatCurrencyLabel(transaction.amount)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default RecentActivities;