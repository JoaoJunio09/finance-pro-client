import { Plus } from "lucide-react";
import type { WalletResponse } from "../../../../models/wallet/WalletResponse";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";
import { BANK_BRANDS } from "./BankBrands";
import styles from './Wallets.module.css';

interface WalletCardProps {
	wallet: WalletResponse;
}

function WalletCard({ wallet }: WalletCardProps) {
	const LogoComponent = BANK_BRANDS[wallet.bank.name];
	return (
		<>
			<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12] pointer-events-none rounded-[24px]" />

			<div className="flex justify-between items-start relative z-10">
				<div className="flex flex-col items-start">
					<span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{wallet.bank.name}</span>
					<h5 className="text-sm font-semibold text-white mt-1">{wallet.name}</h5>
				</div>
				<div className="opacity-90"><LogoComponent.logo /></div>
			</div>

			<div className="flex justify-between items-end relative z-10">
				<div className="w-7 h-5 rounded bg-gradient-to-r from-amber-400/30 to-yellow-500/10 border border-amber-300/20 relative overflow-hidden flex items-center justify-center shadow-inner">
					<div className="absolute w-[1px] h-full bg-amber-300/20 left-1/3" />
					<div className="absolute w-[1px] h-full bg-amber-300/20 left-2/3" />
					<div className="absolute h-[1px] w-full bg-amber-300/20 top-1/2" />
				</div>
				<div className="flex flex-col items-end">
					<span className="font-mono text-[10px] text-white/50 tracking-widest mb-1">•••• {wallet.cardDigits}</span>
					<span className="font-display text-xl font-bold text-white tabular-nums">{formatCurrencyLabel(wallet.balance)}</span>
				</div>
			</div>
		</>
	);
}

interface WalletsProps {
	wallets: WalletResponse[];
	maxVisibleDesktop?: number;
	onSelectWallet: (id: string) => void;
	onAddWallet?: () => void;
}

function Wallets({
	wallets,
	maxVisibleDesktop = 4,
	onSelectWallet,
	onAddWallet
}: WalletsProps) {
	const visibleWallets = wallets.slice(0, maxVisibleDesktop);
	const remainingWalletsCount = wallets.length - maxVisibleDesktop;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h3 className="text-[11px] uppercase tracking-widest text-muted font-bold">Suas Carteiras</h3>
					{remainingWalletsCount > 0 && (
						<span className={`font-display text-[10px] font-bold px-1.5 py-0.5 rounded-md ${styles.remainingBadge}`}>
							+{remainingWalletsCount}
						</span>
					)}
				</div>
				<Plus onClick={onAddWallet} className={`w-4 h-4 cursor-pointer hover:scale-110 transition-transform ${styles.addIcon}`} />
			</div>

			{/* Versão DESKTOP: cards empilhados com leve escala/deslocamento */}
			<div className="relative h-[290px] w-full select-none hidden lg:block">
				{visibleWallets.map((wallet, index) => (
					<div
						key={wallet.id}
						onClick={() => onSelectWallet(wallet.id)}
						className={`absolute left-0 right-0 h-[160px] rounded-[24px] p-6 flex flex-col justify-between cursor-pointer overflow-hidden ${styles.walletCardDesktop} ${styles.walletCardBorder}`}
						style={{
							background: wallet.bank && wallet.bank.gradient ? wallet.bank.gradient : '#09090B',
							boxShadow: wallet.bank && wallet.bank.shadow ? `0 8px 32px ${wallet.bank.shadow}` : 'none',
							border: (wallet.bank && wallet.bank.name === 'C6 Bank') || !wallet.bank ? '1px solid rgba(255,255,255,0.15)' : 'none',
							top: `${index * 42}px`,
							zIndex: 10 + index,
							'--wallet-scale': 1 - (visibleWallets.length - 1 - index) * 0.025,
						} as React.CSSProperties}
					>
						<div className="absolute top-0 left-[-50%] w-[120%] h-[30%] bg-white/[0.03] rotate-[35deg] transform translate-y-[-50%] pointer-events-none" />
						<WalletCard wallet={wallet} />
					</div>
				))}
			</div>

			{/* Versão MOBILE: cards empilhados verticalmente, sem sobreposição */}
			<div className="flex flex-col gap-4 w-full lg:hidden">
				{visibleWallets.map((wallet) => (
					<div
						key={wallet.id}
						onClick={() => onSelectWallet(wallet.id)}
						className={`w-full h-[160px] rounded-[24px] p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden ${styles.walletCardBorder}`}
						style={{
							background: wallet.bank && wallet.bank.gradient ? wallet.bank.gradient : '#09090B',
							boxShadow: wallet.bank && wallet.bank.shadow ? `0 8px 32px ${wallet.bank.shadow}` : 'none',
							border: (wallet.bank && wallet.bank.name === 'C6 Bank') || !wallet.bank ? '1px solid rgba(255,255,255,0.15)' : 'none'
						}}
					>
						<WalletCard wallet={wallet} />
					</div>
				))}
			</div>
		</div>
	);
}

export default Wallets;
