import { ALargeSmall, CalendarDays, Clock } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../utils/FormatDate";

interface RecentTransactionsProps {
	transactions: TransactionResponse[];
}

function RecentTransactions({
	transactions
}: RecentTransactionsProps) {
	return (
		<section className="w-full flex flex-col min-w-0 animate-slide-up delay-300">
			<h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-6">
				Transações do Mês
			</h3>
			
			{transactions.length > 0 ? (
				<div className="flex flex-col gap-3">
					{transactions.map((tx) => {
						const Icon = tx.category ? tx.category.icon : ALargeSmall;
						// const isFuture = tx.status === 'future';
						const isFuture = false;
						const isInc = tx.type === 'CREDIT';
						
						return (
							<div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0e0e11]/50 border border-white/[0.04] hover:bg-[#111113] hover:border-white/[0.08] transition-all rounded-[20px] group gap-4">
								
								{/* Left: Metadata */}
								<div className="flex items-center gap-4">
									<div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors flex-shrink-0
										${isFuture ? 'bg-amber-500/5 border-amber-500/10 text-amber-500/70 group-hover:text-amber-400 group-hover:bg-amber-500/10' : 
										'bg-white/[0.02] border-white/[0.04] text-zinc-500 group-hover:text-zinc-300'}`}
									>
										<DynamicIcon name={tx.category.icon as IconName} className="w-5 h-5" />
									</div>
									<div className="flex flex-col gap-1 min-w-0">
										<h4 className={`text-sm sm:text-base font-medium truncate ${isFuture ? 'text-amber-100/90' : 'text-zinc-200'}`}>
											{tx.description}
										</h4>
										<div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 truncate">
											<span className={`${isFuture ? 'text-amber-500/80' : 'text-[#8B5CF6]'} font-medium`}>
												{tx.category ? (
													`${tx.category.name}`
												) : (
													'Não possui categoria'
												)}
											</span>
											<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0"></span>
											<span>{formatRelativeDateTime(tx.registeredAt)}</span>
											<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 hidden sm:block"></span>
											<span className="hidden sm:block">Conta Corrente</span>
										</div>
									</div>
								</div>
								
								{/* Right: Values & Badges */}
								<div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 pl-16 sm:pl-0">
									<span className={`text-base sm:text-lg font-bold tracking-tight ${isFuture ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
										{isInc ? '+' : '-'}{formatCurrency(tx.amount)}
									</span>
									<div className="flex items-center gap-2">
										{isFuture ? (
											<span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
												<Clock className="w-3 h-3" /> Previsto
											</span>
										) : (
											<span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${isInc ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
												{isInc ? 'Receita' : 'Despesa'}
											</span>
										)}
									</div>
								</div>

							</div>
						);
					})}
				</div>
			) : (
				<div className="py-20 flex flex-col items-center justify-center bg-[#0e0e11]/50 border border-white/[0.04] rounded-[24px]">
					<div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-600 mb-4">
						<CalendarDays className="w-5 h-5" />
					</div>
					<p className="text-zinc-500 font-light text-sm">Nenhuma movimentação registrada para este mês.</p>
				</div>
			)}
		</section>
	)
}

export default RecentTransactions;