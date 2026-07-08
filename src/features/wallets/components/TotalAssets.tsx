import { Wallet } from "lucide-react";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

interface TotalAssetsProps {
	total: number
}

function TotalAssets({
	total,
}: TotalAssetsProps) {
	return(
		<div
			className="animate-slide-up relative overflow-hidden rounded-[24px] p-[28px] md:p-[32px] border border-white/[0.06] flex flex-col md:flex-row justify-between gap-6 shadow-2xl group transition-all duration-300"
			style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
		>
			
			{/* Círculos Geométricos Decorativos */}
			<div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full border border-white/[0.03] pointer-events-none" />
			<div className="absolute top-[20px] right-[40px] w-[120px] h-[120px] rounded-full border border-white/[0.02] pointer-events-none" />
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[40%]" 
				style={{ background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.35), transparent)' }} 
			/>

			{/* Ícone Decorativo em Opacity do Avora */}
			<div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
				<Wallet size={64} className="text-[#8B5CF6]" />
			</div>

			{/* Lado Esquerdo: Valor */}
			<div className="relative z-10 flex flex-col justify-center">
				<h2 className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Patrimônio Total</h2>
				<div
					className="font-['Outfit'] text-[36px] md:text-[52px] font-bold tabular-nums mt-[8px] tracking-tight"
					style={{ 
						background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent'
					}}
				>
					{formatCurrencyLabel(total)}
				</div>
				
				{/* Feedback contextual sutil */}
				{/* <div
					className="inline-flex items-center gap-[6px] rounded-lg px-[12px] py-[4px] mt-[12px] w-fit"
					style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.15)' }}
				>
					<TrendingUp size={13} className="text-emerald-400" />
					<span className="font-['Inter'] text-[12px] text-emerald-400 font-medium">Cresceu R$ 1.240 em relação ao mês passado</span>
				</div> */}
			</div>

			{/* Lado Direito: Métricas Rápidas */}
			<div className="relative z-10 flex flex-col gap-[10px] items-start md:items-end justify-center shrink-0">
				<div className="flex items-center gap-[8px] md:justify-end">
					<div className="w-[8px] h-[8px] rounded-full bg-[#8B5CF6]" />
					<span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Carteiras Ativas</span>
					<span className="font-['Outfit'] text-[14px] font-semibold tabular-nums text-white ml-2">5</span>
				</div>
				{true && (
					<div className="flex items-center gap-[8px] md:justify-end">
						<div className="w-[8px] h-[8px] rounded-full bg-emerald-400" />
						<span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Maior Saldo</span>
						<span className="font-['Outfit'] text-[14px] font-semibold text-white ml-2">Nubank</span>
					</div>
				)}
				{true && (
					<div className="flex items-center gap-[8px] md:justify-end">
						<div className="w-[8px] h-[8px] rounded-full bg-rose-400" />
						<span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Menor Saldo</span>
						<span className="font-['Outfit'] text-[14px] font-semibold text-white ml-2">Caixa Econômica</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default TotalAssets;