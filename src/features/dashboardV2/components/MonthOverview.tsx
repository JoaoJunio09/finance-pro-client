import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { BiggestExpense } from "../../../models/account/BiggestExpense";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

interface MonthOverviewProps {
	income: number;
	expense: number;
	netIncome: number;
	biggestExpense: BiggestExpense | null;
}

function MonthOverview({
	income,
	expense,
	netIncome,
	biggestExpense
}: MonthOverviewProps) {
	return (
		<div className="animate-slide-up delay-400 w-full min-w-0">
			<h3 className="text-zinc-600 text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] font-semibold mb-6 lg:mb-8">
				Resumo do Mês
			</h3>
			
			<div className="flex flex-col gap-5 lg:gap-6 w-full">
				
				<div className="flex flex-wrap sm:flex-nowrap items-end justify-between border-b border-white/[0.04] pb-4 lg:pb-5 group hover:border-white/[0.1] transition-colors gap-2">
					<span className="text-zinc-400 font-light text-base lg:text-xl">Entrou</span>
					<div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
						<ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-500" />
						<span className="text-xl lg:text-3xl font-medium tracking-tight text-white">{formatCurrencyLabel(income)}</span>
					</div>
				</div>
				
				<div className="flex flex-wrap sm:flex-nowrap items-end justify-between border-b border-white/[0.04] pb-4 lg:pb-5 group hover:border-white/[0.1] transition-colors gap-2">
					<span className="text-zinc-400 font-light text-base lg:text-xl">Saiu</span>
					<div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
						<ArrowDownRight className="w-4 h-4 lg:w-5 lg:h-5 text-rose-500" />
						<span className="text-xl lg:text-3xl font-medium tracking-tight text-white">{formatCurrencyLabel(expense)}</span>
					</div>
				</div>

				<div className="flex flex-wrap sm:flex-nowrap items-end justify-between border-b border-white/[0.04] pb-4 lg:pb-5 group hover:border-white/[0.1] transition-colors gap-2">
					<span className="text-zinc-400 font-light text-base lg:text-xl">Sobrou</span>
					<span className="text-xl lg:text-3xl font-medium tracking-tight text-[#8B5CF6]">{formatCurrencyLabel(netIncome)}</span>
				</div>

				<div className="flex flex-wrap sm:flex-nowrap items-end justify-between border-b border-white/[0.04] pb-4 lg:pb-5 group hover:border-white/[0.1] transition-colors gap-2">
					<span className="text-zinc-400 font-light text-base lg:text-xl">Maior gasto</span>
					<div className="text-right flex flex-col items-end flex-shrink-0">
						<span className="text-lg lg:text-2xl font-medium tracking-tight text-white">
							{biggestExpense ? (
								formatCurrencyLabel(biggestExpense.value)
							) : (
								'R$ 0'
							)}
						</span>
						<span className="text-[10px] lg:text-sm text-zinc-500 font-medium uppercase tracking-wider mt-0.5 lg:mt-1 truncate max-w-[120px]">
							{biggestExpense?.category ? (
								biggestExpense.category.name
							) : (
								''
							)}
						</span>
					</div>
				</div>
				
			</div>
		</div>
	)
}

export default MonthOverview;