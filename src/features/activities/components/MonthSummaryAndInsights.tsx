import { PieChart, Sparkles } from "lucide-react";
import type { AllTransactionResponse } from "../../../models/transaction/AllTransactionResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

interface MonthSummaryAndInsightsProps {
	allTransaction: AllTransactionResponse | null
}

function MonthSummaryAndInsights({ allTransaction }: MonthSummaryAndInsightsProps) {
	return (
		<>
		{allTransaction !== null ? (
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 animate-slide-up delay-200">			
				{/* Insights Conversacionais (Left - 7 cols) */}
				<div className="lg:col-span-7 flex flex-col">
					<h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
						<Sparkles className="w-5 h-5 text-[#8B5CF6]" /> Insights Inteligentes
					</h3>
					<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-6">
						
						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
							<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
								Você gastou <span className="font-semibold text-emerald-400">18% menos</span> do que no mês passado. Continue nesse ritmo!
							</p>
						</div>
						
						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
							<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
								Seu maior gasto do mês até agora foi com <span className="font-medium text-white">Moradia</span>, totalizando R$ 1.200,00.
							</p>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
							<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
								Ainda existem <span className="font-medium text-amber-400">7 recorrências recorrências</span> programadas. Sua próxima cobrança acontece em 3 dias.
							</p>
						</div>

					</div>
				</div>

				{/* Resumo do Mês*/}
				<div className="lg:col-span-5 flex flex-col">
						<h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
						<PieChart className="w-5 h-5 text-zinc-500" /> Resumo do Mês
					</h3>
					<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-between">
						<div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Gasto</span>
								<span className="text-sm font-medium text-rose-400">{formatCurrencyLabel(allTransaction.transactionBiggestExpense.amount)}</span>
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Receita</span>
								<span className="text-sm font-medium text-emerald-400">{formatCurrencyLabel(allTransaction.transactionBiggestIncome.amount)}</span>
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Despesa</span>
								<span className="text-sm font-medium text-zinc-300">{allTransaction.transactionBiggestExpense.category.name}</span>
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Receita</span>
								<span className="text-sm font-medium text-zinc-300">{allTransaction.transactionBiggestIncome.category.name}</span>
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Previsão Fim do Mês</span>
								<span className="text-sm font-bold text-[#8B5CF6]">R$ 19.622,00</span>
							</div>
						</div>
					</div>
				</div>

			</section>
		) : (
			null
		)}
		</>
	)
}

export default MonthSummaryAndInsights;