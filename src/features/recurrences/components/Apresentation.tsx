import { RefreshCw } from "lucide-react";

function Apresentation() {
	return (
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-[16px] mb-[24px]">
			<div>
				<h1 className="font-['Outfit'] text-[24px] font-bold text-[#FFFFFF] tracking-tight">Recorrências</h1>
				<p className="font-['Inter'] text-[14px] text-zinc-500 mt-[2px]">Receitas e despesas automáticas do seu mês</p>
			</div>

			<div className="flex flex-row gap-[8px] flex-wrap w-full sm:w-auto overflow-x-auto hide-scrollbar">					
				<button 
					className="flex items-center gap-[6px] h-[38px] px-[18px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#FFFFFF] transition-all duration-150 outline-none hover:-translate-y-[1px] active:scale-[0.98]"
					style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', boxShadow: '0 4px 14px rgba(124,58,237,0.30)' }}
					onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #6D28D9, #5B21B6)'; }}
					onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #6D28D9)'; }}
				>
					<RefreshCw size={14} color="#FFFFFF" />
					Recorrência
				</button>
			</div>
		</div>
	)
}

export default Apresentation;