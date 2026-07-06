import { Wallet } from "lucide-react";
import type { AllTransactionResponse } from "../../../models/transaction/AllTransactionResponse";
import { formatCurrency } from "../../../utils/FormatCurrency";

interface OverviewProps {
	allTransaction: AllTransactionResponse | null
}

function Overview({ allTransaction }: OverviewProps) {
	return (
		<>
		{allTransaction !== null ? (
			<section className="w-full mb-12 animate-slide-up delay-100">
				{/* <h3 className="text-lg font-medium text-white mb-5 tracking-tight">Visão Geral Financeira</h3> */}
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
					
					{/* Patrimônio (Hero) */}
					<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#111113] to-[#151518] border border-white/[0.06] rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
						<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Wallet className="w-16 h-16 text-[#8B5CF6]" /></div>
						<span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-2">Patrimônio Atual</span>
						<span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
							{formatCurrency(allTransaction.currentBalance)}
						</span>
						{/* <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
							<TrendingUp className="w-3 h-3" /> +14% vs último mês
						</div> */}
					</div>

					{/* Disponível */}
					<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-[#111113]/80 border border-[#8B5CF6]/20 rounded-[24px] p-6 relative">
						<span className="text-[11px] uppercase tracking-widest text-[#8B5CF6] font-bold block mb-2">Disponível para gastar</span>
						<span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
							{formatCurrency(allTransaction.availableToSpend)}
						</span>
						<span className="block mt-4 text-xs font-medium text-zinc-500">
							Livre de {formatCurrency(allTransaction.commitment)} em compromissos
						</span>
					</div>

					{/* Grid 2x2 para o resto */}
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Entrou</span>
						<span className="text-xl font-medium text-emerald-400 tracking-tight">+{formatCurrency(allTransaction.income)}</span>
					</div>
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Saiu</span>
						<span className="text-xl font-medium text-rose-400 tracking-tight">-R$ {formatCurrency(allTransaction.expenses)}</span>
					</div>
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Sobrou Líquido</span>
						<span className={`text-xl font-bold tracking-tight ${allTransaction.netIncome >= 0 ? 'text-[#8B5CF6]' : 'text-rose-500'}`}>
							{formatCurrency(allTransaction.netIncome)}
						</span>
					</div>
					<div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 flex flex-col justify-center">
						<span className="text-[10px] uppercase tracking-widest text-amber-500/70 font-semibold mb-1">Comprometido</span>
						<span className="text-xl font-medium text-amber-400 tracking-tight">{formatCurrency(allTransaction.commitment)}</span>
					</div>

				</div>
			</section>
		) : (
			<div>
				nada no mês selecionado
			</div>
		)}
		</>
	)
}

export default Overview;