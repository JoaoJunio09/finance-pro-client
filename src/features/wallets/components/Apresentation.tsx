import { Plus } from "lucide-react";

interface ApresentationProps {
	openAddModal: () => void;
}

function Apresentation({ openAddModal }: ApresentationProps) {
	return (
		 <div className="animate-slide-up flex flex-row justify-between items-start">
			<div>
				<h1 className="font-['Outfit'] text-[24px] font-bold text-white tracking-tight">Carteiras/Cartões</h1>
				<p className="font-['Inter'] text-[14px] text-zinc-500 mt-1">Gerencie suas contas, carteiras e cartões</p>
			</div>
			<button
				onClick={openAddModal}
				className="h-[38px] px-[18px] rounded-[10px] flex items-center gap-2 text-white font-['Inter'] text-[13px] font-semibold transition-all active:scale-[0.98] outline-none"
				style={{ 
					background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
					boxShadow: '0 4px 14px rgba(124, 58, 237, 0.30)'
				}}
				onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #6D28D9, #5B21B6)'}
				onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #6D28D9)'}
			>
				<Plus size={15} color="#FFFFFF" />
				Nova Carteira
			</button>
		</div>
	)
}

export default Apresentation;