import { ArrowDownRight, ArrowUpRight, Edit3, History, X } from "lucide-react";
import type { TransactionSummary } from "../../../../models/transaction/TransactionSummary";
import type { WalletDetailsResponse } from "../../../../models/wallet/WalletDetails";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../../utils/FormatDate";

import styles from './WalletDetailModal.module.css';
import { BANK_BRANDS } from "../Wallets/BankBrands";

interface WalletDetailModalProps {
	walletDetails: WalletDetailsResponse | null;
	transactions: TransactionSummary[] | [];
	onClose: () => void;
	onEdit?: () => void;
	onViewFullHistory?: () => void;
}

function WalletDetailModal({
	walletDetails,
	transactions,
	onClose,
	onEdit,
	onViewFullHistory,
}: WalletDetailModalProps) {
	if (!walletDetails) return;
	if (!transactions) return;

	const LogoComponent = BANK_BRANDS[walletDetails.wallet.bank.name];

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center">
			{/* Fundo Blur Animado */}
			<div 
				className={`absolute inset-0 backdrop-blur-xl transition-opacity duration-200 animate-wallet-expand ${styles.overlayScrim}`}
				onClick={onClose}
			/>
			
			{/* Cartão Expandido (Ocupa ~80% da tela) */}
			<div 
				className={`relative w-[90%] max-w-md h-[70%] max-h-[700px] rounded-[40px] p-8 flex flex-col justify-between shadow-2xl border border-white/10 animate-wallet-expand overflow-hidden ${styles.card}`}
				style={{
        boxShadow: walletDetails.wallet.bank && walletDetails.wallet.bank.shadow ? `0 5px 10px ${walletDetails.wallet.bank.shadow}` : 'none',
        border: (walletDetails.wallet.bank && walletDetails.wallet.bank.name === 'C6 Bank') || !walletDetails.wallet.bank ? '1px solid rgba(255,255,255,0.15)' : 'none'
      }}
			>
				{/* Fundo Glow Espalhado correspondente à cor da carteira */}
				<div className={`absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl rounded-full pointer-events-none`} 
					style={{
						background: walletDetails.wallet.bank.gradient
					}}
				/>

				{/* Cabeçalho do Cartão Expandido */}
				<div className="relative z-10 flex justify-between items-start">
					<div>
						<LogoComponent.logo />
						<h3 className="text-xl font-semibold text-main mt-1">{walletDetails.wallet.name}</h3>
					</div>
					<button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200 outline-none">
						<X className="w-4 h-4" />
					</button>
				</div>

				{/* Saldo Centralizado Imersivo */}
				<div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8">
					<span className="text-[10px] uppercase tracking-widest text-muted font-semibold mb-2">Saldo Atual</span>
					<span className="font-display text-5xl font-light text-main tracking-tighter tabular-nums text-center">
						{formatCurrencyLabel(walletDetails.wallet.balance)}
					</span>
				</div>

				{/* Últimas Transações Limpas (Minimalistas) */}
				<div className="relative z-10 flex flex-col gap-4 mb-8">
					{walletDetails.transactions.length > 0 && (
						<span className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2">Últimas Movimentações</span>
					)}
					{walletDetails.transactions.length > 0 && walletDetails.transactions.map((transaction) => {
						const isInc = transaction.type === 'CREDIT';
						const Icon = transaction.type === 'CREDIT' ? ArrowUpRight : ArrowDownRight;
						return (
							<div key={transaction.id} className="flex items-center justify-between group">
								<div className="flex items-center gap-3">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isInc ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
										<Icon className="w-3.5 h-3.5" />
									</div>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-main">{transaction.description}</span>
										<span className="text-[10px] text-muted">{formatRelativeDateTime(transaction.registeredAt)}</span>
									</div>
								</div>
								<span className={`font-display text-sm font-bold tabular-nums ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
									{isInc ? '+' : '-'}{formatCurrencyLabel(transaction.amount)}
								</span>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
}

export default WalletDetailModal;