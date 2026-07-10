import { X } from "lucide-react";
import type { WalletDetailsResponse } from "../../../models/wallet/WalletDetails";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../utils/FormatDate";
import WalletCard from "./WalletCard";

interface WalletDetailsProps {
	selectedWallet: WalletDetailsResponse | null;
	setSelectedWallet: (wallet: WalletResponse | null) => void;
}

function WalletDetails({
	selectedWallet,
	setSelectedWallet
}: WalletDetailsProps) {
	return (
		<div
			className="animate-slide-up rounded-[24px] border border-white/[0.06] p-[24px] shadow-2xl relative transition-all duration-300"
			style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
		>
			<button
				onClick={() => setSelectedWallet(null)}
				className="cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
			>
				<X size={20} />
			</button>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
				
				<div className="flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/[0.04] pb-6 lg:pb-0 pr-0 lg:pr-6">
					<div className="w-[200px] shrink-0">
						<WalletCard wallet={selectedWallet?.wallet} />
					</div>
					<div className="font-['Outfit'] text-[16px] font-semibold text-white mt-[16px] mb-[4px]">
						{selectedWallet?.wallet.name}
					</div>
					<div className="font-['Inter'] text-[13px] text-zinc-500 flex items-center gap-2">
						{selectedWallet?.wallet.bank.name}
						<span className="px-2 py-0.5 rounded-[8px] text-[10px] uppercase font-semibold"
									style={{ background: 'rgba(139,92,246,0.05)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.20)' }}>
							Ativa
						</span>
					</div>
				</div>

			
				<div className="flex flex-col gap-[12px] border-b lg:border-b-0 lg:border-r border-white/[0.04] pb-6 lg:pb-0 pr-0 lg:pr-6 justify-center">
					<div className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Resumo do mês</div>
					
					<div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
						<div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Saldo Atual</div>
						<div className="font-['Outfit'] text-[20px] font-bold tabular-nums text-white">
							{formatCurrencyLabel(selectedWallet?.wallet.balance ?? 0)}
						</div>
					</div>
					
					<div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
						<div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Entradas</div>
						<div className="font-['Outfit'] text-[16px] font-semibold text-emerald-400 tabular-nums">
							+{formatCurrencyLabel(selectedWallet?.income ?? 0)}
						</div>
					</div>

					<div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
						<div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Saídas</div>
						<div className="font-['Outfit'] text-[16px] font-semibold text-rose-400 tabular-nums">
							-{formatCurrencyLabel(selectedWallet?.expenses ?? 0)}
						</div>
					</div>
				</div>


				<div className="flex flex-col">
					<div className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Últimas movimentações</div>
					<div className="flex flex-col">
						{selectedWallet && selectedWallet?.transactions.length > 0 ? (
							selectedWallet.transactions.slice(0, 4).map((tx, idx) => (
								<div key={idx} className="flex flex-row justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors duration-150">
									<div className="flex flex-col gap-0.5">
										<div className="font-['Inter'] text-[13px] text-white font-medium">{tx.description}</div>
										<div className="font-['Inter'] text-[11px] text-zinc-500 capitalize">{formatRelativeDateTime(tx.registeredAt)}</div>
									</div>
									<div className={`font-['Outfit'] text-[13px] font-semibold tabular-nums ${tx.type === 'CREDIT' ? 'text-emerald-400' : 'text-rose-400'}`}>
										{tx.type === 'CREDIT' ? '+' : ''}{formatCurrencyLabel(tx.amount)}
									</div>
								</div>
							))
						) : (
							<div className="text-zinc-500 text-[13px] font-['Inter'] py-4 italic">Sem movimentações recentes.</div>
						)}
					</div>
				</div>

			</div>
		</div>
	)
}

export default WalletDetails;