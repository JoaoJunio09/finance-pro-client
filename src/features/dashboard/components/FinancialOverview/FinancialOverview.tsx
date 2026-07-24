import { Activity, Fingerprint, Target, TrendingDown, TrendingUp } from "lucide-react";

import { formatCurrencyLabel, getDecimalPart, getIntegerPart } from "../../../../utils/FormatCurrency";
import styles from './FinancialOverview.module.css';

const InteractiveIllustration = () => {
	return (
		<div className="hidden lg:flex relative w-48 h-48 items-center justify-center pointer-events-none mr-8">
			<div className="absolute inset-0 bg-[#8B5CF6]/10 blur-2xl rounded-full" />
			<svg viewBox="0 0 100 100" className="w-full h-full text-[#8B5CF6]/30 absolute animate-pulse">
				<path d="M 10 70 Q 30 50 50 60 T 90 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
			</svg>
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
			<div className="absolute top-4 right-10 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
				<Activity size={14} className="text-emerald-500" />
			</div>
			<div className="absolute bottom-6 left-6 w-10 h-10 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
				<Target size={16} className="text-[#8B5CF6]" />
			</div>
		</div>
	)
}

interface FinancialOverviewProps {
	currentBalance: number;
	income: number;
	expenses: number
}

function FinancialOverview({
	currentBalance,
	income,
	expenses
}: FinancialOverviewProps) {
	return (
		<div className="relative z-10 w-full rounded-[32px] flex flex-col lg:flex-row items-center lg:items-start justify-between overflow-hidden">
			<div className={`flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 w-full ${styles.boxOverview}`}>
				<div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold mb-2">
					<Fingerprint className={styles.iconOverview} /> Patrimônio Líquido
				</div>
				
				<h2 className={`text-5xl lg:text-7xl mb-1 tabular-nums ${styles.currentBalanceOverview}`}>
					R$ {getIntegerPart(currentBalance)}<span className="text-3xl lg:text-5xl">,{getDecimalPart(currentBalance)}</span>
				</h2>

				<p className={styles.descriptionMonthOverview}>Resumo financeiro deste mês</p>

				<div className="flex flex-row items-center justify-center lg:justify-start gap-10 lg:gap-16 w-full">
					<div className={`flex flex-col items-center lg:items-start cursor-default ${styles.boxIncomeOverview}`}>
						<div className="flex items-center gap-2 mb-1.5">
							<TrendingUp className={`${styles.overviewIcon} ${styles.iconIncomeOverview}`} />
							<span className="text-[11px] uppercase tracking-widest font-bold">Entradas</span>
						</div>
						<span className={`text-2xl lg:text-3xl ${styles.amount} ${styles.income}`}>{formatCurrencyLabel(income)}</span>
					</div>
					
					<div className={`flex flex-col items-center lg:items-start cursor-default ${styles.boxExpensesverview}`}>
						<div className="flex items-center gap-2 mb-1.5">
							<TrendingDown className={`${styles.overviewIcon} ${styles.iconExpensesOverview}`} />
							<span className="text-[11px] uppercase tracking-widest font-bold">Saídas</span>
						</div>
						<span className={`text-2xl lg:text-3xl ${styles.amount} ${styles.expenses}`}>{formatCurrencyLabel(expenses)}</span>
					</div>
				</div>
			</div>

			<InteractiveIllustration />
		</div>
	)
}

export default FinancialOverview;