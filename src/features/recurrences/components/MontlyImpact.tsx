import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

interface MonthlyImpactProps {
	totalRegistered: number;
	totalIncomeAmount: number;
  totalExpenseAmount: number;
  monthlyImpact: number;
}

function MonthlyImpact({
	totalRegistered,
	totalIncomeAmount,
	totalExpenseAmount,
	monthlyImpact
}: MonthlyImpactProps) {
	return (
		<div
			className="w-full relative overflow-hidden rounded-[24px] p-[24px] sm:p-[28px] mb-[24px] shadow-2xl border border-white/[0.06] animate-slide-up delay-100"
			style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
		>
			
			{/* Decoração Sutil */}
			<div className="absolute top-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/[0.02] pointer-events-none opacity-40" />
			<div className="absolute top-[10px] right-[60px] w-[140px] h-[140px] rounded-full border border-white/[0.01] pointer-events-none opacity-40" />
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[30%]" 
				style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }}
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
				
				{/* COLUNA 1: Impacto Geral */}
				<div className="lg:col-span-2 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/[0.06] pb-6 sm:pb-0 pr-0 sm:pr-[20px] lg:pr-[32px]">
					<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">
						Impacto Mensal Recorrente
					</span>
					<div
						className="font-['Outfit'] text-[36px] sm:text-[40px] font-bold tabular-nums mt-[8px]"
						style={
							monthlyImpact >= 0 ? {
								background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent'
							} : {
								color: '#F87171'
							}
						}
					>
						{monthlyImpact > 0 ? '+' : ''}{formatCurrencyLabel(monthlyImpact)}
					</div>
					
					<div className="flex items-center gap-[6px] mt-[8px]">
						{monthlyImpact >= 0 ? (
							<>
								<TrendingUp size={13} className="text-[#8B5CF6]" />
								<span className="font-['Inter'] text-[12px] text-zinc-400">Receitas recorrentes cobrem suas despesas fixas</span>
							</>
						) : (
							<>
								<TrendingDown size={13} className="text-[#F87171]" />
								<span className="font-['Inter'] text-[12px] text-[#F87171]">Despesas fixas superam receitas</span>
							</>
						)}
					</div>
				</div>

				{/* COLUNA 2: Receitas */}
				<div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
					<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Receitas Recorrentes</span>
					<span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#34D399] mt-[8px]">{formatCurrencyLabel(totalIncomeAmount)}</span>
					<span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{0} ativas</span>
				</div>

				{/* COLUNA 3: Despesas */}
				<div className="flex flex-col justify-center border-b sm:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
					<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Despesas Recorrentes</span>
					<span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#F87171] mt-[8px]">{formatCurrencyLabel(totalExpenseAmount)}</span>
					<span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{0} ativas</span>
				</div>

				{/* COLUNA 4: Total Cadastradas */}
				<div className="flex flex-col justify-center pt-6 sm:pt-0 pl-0 sm:pl-[20px] lg:pl-[24px]">
					<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Total Cadastradas</span>
					<span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#FFFFFF] mt-[8px]">{totalRegistered}</span>
					{totalRegistered > 0 ? (
						<span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{0} pausadas</span>
					) : (
						<span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">Todas ativas</span>
					)}
				</div>

			</div>
		</div>
	)
}

export default MonthlyImpact;