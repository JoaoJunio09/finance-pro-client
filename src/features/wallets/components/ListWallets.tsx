import { Plus } from "lucide-react";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import WalletCard from "./WalletCard";

interface ListWalletsProps {
	wallets: WalletResponse[];
	setSelectedWallet: (wallet: WalletResponse) => void;
	onEdit: (wallet: WalletResponse) => void;
	onDelete: (id: string) => void;
}

function ListWallets({
	wallets,
	setSelectedWallet,
	onEdit,
	onDelete
}: ListWalletsProps) {
	return (
		<div className="animate-slide-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
			{wallets.map(wallet => (
				<WalletCard
					key={wallet.id} 
					wallet={wallet}
					onClick={setSelectedWallet}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}

			{/* Placeholder para Adicionar Nova Carteira */}
			<div
				className="rounded-[20px] aspect-[1.586] border-2 border-dashed border-white/[0.06] bg-transparent hover:bg-[rgba(139,146,246,0.05)] hover:border-[#8B5CF6]/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
			>
				<div
					className="w-[44px] h-[44px] rounded-xl flex items-center justify-center mb-[12px] transition-all duration-300"
					style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.20)' }}
				>
					<Plus size={20} className="text-[#C4B5FD] group-hover:scale-110 transition-transform" />
				</div>
				<div className="font-['Outfit'] text-[14px] font-semibold text-[#C4B5FD]">Nova Carteira</div>
				<div className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">Adicionar conta ou cartão</div>
			</div>
		</div>
	)
}

export default ListWallets;