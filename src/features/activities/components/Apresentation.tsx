import { ChevronLeft, ChevronRight } from "lucide-react";

interface ApresentationProps {
	activeMonth: number;
	activeYear: number;
	goToPreviousMonth: () => void;
	goToNextMonth: () => void;
	isCurrentMonthView: boolean;
	MONTHS: string[];
}

function Apresentation({
	activeMonth,
	activeYear,
	goToPreviousMonth,
	goToNextMonth,
	isCurrentMonthView,
	MONTHS
}: ApresentationProps) {
	return (
		<section className="animate-slide-up flex flex-col items-center text-center w-full mb-10 mt-2">
			<h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
				Atividades <span className="font-semibold text-[#8B5CF6]">Recentes</span>
			</h1>
			<p className="text-zinc-500 font-light text-sm md:text-base max-w-[65ch] leading-relaxed mb-8">
				Acompanhe todas as movimentações do mês em um único lugar. Visualize receitas, despesas e recorrências de forma simples, organizada e intuitiva.
			</p>

			{/* Paginação do Calendário */}
			<div className="flex flex-col items-center gap-2">
				<div className="flex items-center gap-4 sm:gap-6 bg-[#111113]/50 border border-white/[0.04] p-1.5 rounded-full backdrop-blur-sm">
					<button 
						onClick={goToPreviousMonth}
						className="cursor-pointer w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<h2 className="text-lg md:text-xl font-semibold tracking-tight text-white min-w-[140px] text-center">
						{MONTHS[activeMonth]} de {activeYear}
					</h2>
					<button 
						onClick={goToNextMonth}
						className="cursor-pointer w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
				<span className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-2">
					{isCurrentMonthView ? 'Movimentações do mês atual' : 'Mês arquivado'}
				</span>
			</div>
		</section>
	)
}

export default Apresentation;