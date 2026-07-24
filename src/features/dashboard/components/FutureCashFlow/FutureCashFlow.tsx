import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { RecurrenceSummary } from "../../../../models/recurrence/RecurrenceSummary";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../../utils/FormatDate";
import styles from './FutureCashFlow.module.css';

interface FutureCashFlowProps {
	recurrences: RecurrenceSummary[]
}

function FutureCashFlow({ recurrences }: FutureCashFlowProps) {
	return (
		<div className="flex flex-col gap-4 mt-6">
			<div className="flex items-center justify-between">
				<h3 className="text-[11px] uppercase tracking-widest text-muted font-bold">Fluxo de Caixa Futuro</h3>
				<button
					className={`
						text-[10px] font-bold uppercase tracking-widest
						${styles.sectionLink}
					`}
				>
					Calendário
				</button>
			</div>

			<div className="flex flex-col gap-1 relative">
				<div className={`
						absolute top-4 bottom-4 left-[23px] w-[2px] border-l-2 border-dashed
						${styles.timelineLine}
					`}
				/>

				{recurrences.map((recurrence) => {
					const isIncome = recurrence.type === 'CREDIT';

					return (
						<div
							key={recurrence.id}
							className={`
								relative flex items-center gap-4 p-3 rounded-2xl group cursor-pointer border border-transparent z-10
								${styles.futureRow}
							`}
						>
							<div
								className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 border group-hover:scale-105
									${styles.futureIcon}
									${isIncome
										? styles.futureIconIncome
										: styles.futureIconExpense}
								`}
							>
								<DynamicIcon name={recurrence.category.icon as IconName} className="w-4 h-4 opacity-70 group-hover:opacity-100" />
							</div>

							<div className="flex-1 min-w-0 flex flex-col justify-center">
								<h4 className="text-sm font-semibold text-main truncate">{recurrence.description}</h4>
								<span className="text-[11px] text-muted mt-0.5 truncate">{formatRelativeDateTime(recurrence.nextExecutionDate)}</span>
							</div>

							<div className="flex flex-col items-end justify-center shrink-0 pl-2">
								<span className={`
									font-display text-sm lg:text-base font-medium tabular-nums
									${isIncome
										? styles.futureAmountIncome
										: styles.futureAmountExpense}
								`}>
									{isIncome ? '+' : '−'}{formatCurrencyLabel(recurrence.amount)}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default FutureCashFlow;