import { CalendarDays, Clock, Flame, Target } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { AllTransactionResponse } from "../../../models/transaction/AllTransactionResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../utils/FormatDate";
import TransactionAction from "./TransactionActions";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

interface RecentTransactionsProps {
	allTransaction: AllTransactionResponse | null;
	handleSaveOrUpdate: (transaction: TransactionResponse | null) => void;
	handleOnDelete: (id: string) => void;
}

function RecentTransactions({
	allTransaction,
	handleSaveOrUpdate,
	handleOnDelete
}: RecentTransactionsProps) {
	const biggestExpense = allTransaction?.transactionBiggestExpense;
	const biggestIncome = allTransaction?.transactionBiggestIncome;

	const transactions = allTransaction?.transactions.filter(tx =>
		tx.id !== biggestExpense?.id &&
		tx.id !== biggestIncome?.id
	) ?? [];

	return (
		<section className="w-full flex flex-col min-w-0 animate-slide-up delay-300">
			<h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-6">
				Transações do Mês
			</h3>

			{allTransaction && (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

					{biggestExpense && (
						<div className="rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-transparent p-5">
							<div className="flex items-center gap-2 text-rose-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
								<Flame className="w-4 h-4" />
								Maior despesa
							</div>

							<div className="flex items-center gap-4">
								<div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
									<DynamicIcon
										name={biggestExpense.category.icon as IconName}
										className="w-6 h-6 text-rose-400"
									/>
								</div>

								<div className="flex-1">
									<h4 className="text-white font-semibold">
										{biggestExpense.description}
									</h4>

									<p className="text-zinc-400 text-sm">
										{biggestExpense.category.name}
									</p>
								</div>
							</div>

							<div className="mt-6 text-3xl font-bold text-rose-400">
								-{formatCurrencyLabel(biggestExpense.amount)}
							</div>

							<div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center gap-2 text-xs text-zinc-500 flex-wrap">
								<div className="flex items-center gap-2">
									<Clock className="w-3.5 h-3.5" />
									<span>{formatRelativeDateTime(biggestExpense.registeredAt)}</span>
									<span className="w-1 h-1 rounded-full bg-zinc-700"></span>
									<span>Conta Corrente</span>
								</div>

								<TransactionAction
									transaction={biggestExpense}
									onEdit={handleSaveOrUpdate}
									onRemove={handleOnDelete}
								/>
							</div>
						</div>
					)}

					{biggestIncome && (
						<div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-5">
							<div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
								<Target className="w-4 h-4" />
								Maior receita
							</div>

							<div className="flex items-center gap-4">
								<div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
									<DynamicIcon
										name={biggestIncome.category.icon as IconName}
										className="w-6 h-6 text-emerald-400"
									/>
								</div>

								<div className="flex-1">
									<h4 className="text-white font-semibold">
										{biggestIncome.description}
									</h4>

									<p className="text-zinc-400 text-sm">
										{biggestIncome.category.name}
									</p>
								</div>
							</div>

							<div className="mt-6 text-3xl font-bold text-emerald-400">
								+{formatCurrencyLabel(biggestIncome.amount)}
							</div>
							<div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center gap-2 text-xs text-zinc-500 flex-wrap">
								<div className="flex items-center gap-2">
									<Clock className="w-3.5 h-3.5" />
									<span>{formatRelativeDateTime(biggestIncome.registeredAt)}</span>
									<span className="w-1 h-1 rounded-full bg-zinc-700"></span>
									<span>Conta Corrente</span>
								</div>

								<TransactionAction
									transaction={biggestIncome}
									onEdit={handleSaveOrUpdate}
									onRemove={handleOnDelete}
								/>
							</div>
						</div>
					)}
				</div>
			)}
			
			{allTransaction !== null && allTransaction.transactions.length > 0 ? (
				<div className="flex flex-col gap-3">
					{transactions.map((tx) => {
						// const isFuture = tx.status === 'future';
						const isFuture = false;
						const isInc = tx.type === 'CREDIT';					

						return (
							<div
								key={tx.id}
								className="grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 p-4 sm:p-5 bg-[#0e0e11]/50 border border-white/[0.04] hover:bg-[#111113] hover:border-white/[0.08] transition-all rounded-[20px] group overflow-hidden"
							>
								<div className="flex items-center gap-4 min-w-0 pl-1">
									<div
										className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors flex-shrink-0
											${
												isFuture
													? 'bg-amber-500/5 border-amber-500/10 text-amber-500/70 group-hover:text-amber-400 group-hover:bg-amber-500/10'
													: 'bg-white/[0.02] border-white/[0.04] text-zinc-500 group-hover:text-zinc-300'
											}`}
									>
										<DynamicIcon name={tx.category.icon as IconName} className="w-5 h-5" />
									</div>

									<div className="flex flex-col gap-1 min-w-0">
										<div className="flex items-center gap-2 min-w-0">
											<h4 className={`text-sm sm:text-base font-medium truncate ${isFuture ? 'text-amber-100/90' : 'text-zinc-200'}`}>
												{tx.description}
											</h4>
										</div>

										<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px] sm:text-xs text-zinc-500 truncate">
											<span className={`${isFuture ? 'text-amber-500/80' : 'text-[#8B5CF6]'} font-medium truncate`}>
												{tx.category.name}
											</span>
											<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 hidden sm:block"></span>
											<span className="truncate">{formatRelativeDateTime(tx.registeredAt)}</span>
											<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 hidden sm:block"></span>
											<span className="hidden sm:block">Conta corrente</span>
										</div>
									</div>
								</div>

								<div className="flex flex-col items-end justify-center gap-2">
									<span className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap ${isFuture ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
										{isInc ? '+' : '-'}{formatCurrencyLabel(tx.amount)}
									</span>

									{isFuture ? (
										<span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 font-bold whitespace-nowrap">
											<Clock className="w-3 h-3" /> Previsto
										</span>
									) : (
										<span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold whitespace-nowrap ${isInc ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
											{isInc ? 'Receita' : 'Despesa'}
										</span>
									)}
								</div>

								<TransactionAction
									transaction={tx}
									onEdit={handleSaveOrUpdate}
									onRemove={handleOnDelete}
								/>
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