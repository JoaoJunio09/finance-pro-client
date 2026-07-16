import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

function greeting(hour: number): string {
	if (hour >= 3 && hour <= 12) {
		return 'Bom dia!';
	}
	else if (hour >= 12 && hour <= 18) {
		return 'Boa tarde!';
	}
	else { 
		return 'Boa noite!'
	}
}

interface ApresentationProps {
	income: number,
	expense: number,
}

function Apresentation({
	income,
	expense
}: ApresentationProps) {
	return (
		<header className="animate-slide-up space-y-3 lg:space-y-4">
			<h2 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-light tracking-wide">
				{greeting(new Date().getHours())}
			</h2>

			<p className="text-zinc-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-snug max-w-[70ch]">
				Você recebeu <span className="text-emerald-500 font-semibold">{formatCurrencyLabel(income)} </span> neste mês. <br className="hidden md:block" />
				Até agora foram gastos <span className="text-rose-500 font-semibold">{formatCurrencyLabel(expense)}</span>.
			</p>
		</header>
	)
}

export default Apresentation;