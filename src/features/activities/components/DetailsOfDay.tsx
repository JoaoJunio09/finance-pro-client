import { Activity, InfoIcon, Minus, Plus, X } from "lucide-react";
import type { CalendarDay } from "../types/CalendarDay";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { formatDateLabel } from "../../../utils/FormatDate";

interface DetailsOfDayProps {
	selectedDateInfo: CalendarDay;
	setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
	MONTHS: string[]
}

function DetailsOfDay({
	selectedDateInfo,
	setSelectedDate,
	MONTHS
}: DetailsOfDayProps) {
	if (!selectedDateInfo.date) return;
	return (
		 <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch">
				<div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-overlay" onClick={() => setSelectedDate(null)} />
				
				<div className="
					relative w-full md:max-w-[440px] bg-[#09090B] border-t md:border-t-0 md:border-l border-white/[0.06] 
					h-[85vh] md:h-full flex flex-col z-10 shadow-2xl rounded-t-3xl md:rounded-none
					animate-bottom-sheet md:animate-drawer
				">
					
					<div className="w-12 h-1.5 bg-white/[0.1] rounded-full mx-auto mt-4 md:hidden flex-shrink-0"></div>

					<div className="px-6 pt-4 pb-4 md:pt-8 md:pb-6 border-b border-white/[0.04] flex items-center justify-between flex-shrink-0">
						<div>
							<h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
								{formatDateLabel(selectedDateInfo.date, MONTHS)}
							</h3>
							<p className="text-xs text-zinc-500 font-medium mt-1">Detalhes do Dia</p>
						</div>
						<button onClick={() => setSelectedDate(null)} className="cursor-pointer p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 transition-colors">
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8">
						
						{/* Realizadas */}
						{selectedDateInfo.transactions?.length > 0 ? (
							<div className="space-y-4">
								<h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 flex items-center gap-2">
									<div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full"></div> Realizadas
								</h4>
								{selectedDateInfo.transactions.map(tx => {
									// const Icon = tx.icon;
									const isInc = tx.type === 'CREDIT';
									return (
										<div key={tx.id} className="p-4 bg-[#111113] border border-white/[0.04] rounded-2xl flex items-center justify-between gap-4">
											<div className="flex items-center gap-3">
												<div className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
													<InfoIcon className="w-4 h-4" />
												</div>
												<div>
													<h4 className="text-sm font-medium text-zinc-200">{tx.description}</h4>
													<span className="text-xs text-zinc-500">{tx.category ? tx.category.name : null}</span>
												</div>
											</div>
											<span className={`text-base font-bold tracking-tight ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
												{isInc ? '+' : '-'}{formatCurrency(tx.amount)}
											</span>
										</div>
									);
								})}
							</div>
						) : null}

						{/* Futuras */}
						{/* {selectedDateInfo.transactions?.filter(tx => tx.status === 'future').length > 0 ? (
							<div className="space-y-4">
								<h4 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4 flex items-center gap-2">
									<div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Recorrências Futuras
								</h4>
								{selectedDateInfo.transactions.filter(tx => tx.status === 'future').map(tx => {
									const Icon = tx.icon;
									return (
										<div key={tx.id} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-4">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
													<Icon className="w-4 h-4" />
												</div>
												<div>
													<h4 className="text-sm font-medium text-amber-100/90">{tx.description}</h4>
													<span className="text-xs text-amber-500/70">Previsto • {tx.category}</span>
												</div>
											</div>
											<span className={`text-base font-bold tracking-tight text-amber-400`}>
												{tx.type === 'in' ? '+' : '-'}{formatCurrency(tx.amount)}
											</span>
										</div>
									);
								})}
							</div>
						) : null} */}

						{selectedDateInfo.transactions?.length === 0 ? (
							<div className="py-12 text-center flex flex-col items-center justify-center">
								<div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-600 mb-4">
									<Activity className="w-5 h-5" />
								</div>
								<p className="text-sm text-zinc-500 font-light">Nenhum evento agendado para este dia.</p>
							</div>
						) : null}

					</div>

					{/* Sticky Footer: Ações sempre visíveis */}
					<div className="p-4 sm:p-6 border-t border-white/[0.04] bg-[#09090B] flex gap-3 flex-shrink-0 z-20 sticky bottom-0">
						<button 
							className="cursor-pointer flex-1 py-4 sm:py-3.5 rounded-xl bg-[#111113] hover:bg-emerald-500/10 border border-white/[0.04] hover:border-emerald-500/30 text-emerald-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
						>
							<Plus className="w-4 h-4" /> Receita
						</button>
						<button 
							className="cursor-pointer flex-1 py-4 sm:py-3.5 rounded-xl bg-[#111113] hover:bg-rose-500/10 border border-white/[0.04] hover:border-rose-500/30 text-rose-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
						>
							<Minus className="w-4 h-4" /> Despesa
						</button>
					</div>

				</div>
			</div>
	)
}

export default DetailsOfDay