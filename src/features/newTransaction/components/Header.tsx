import {
	ArrowDownRight,
	ArrowUpRight,
	X
} from "lucide-react";

interface HeaderProps {
	isIncome: boolean;
	colorBase: "emerald" | "rose";
	onClose: () => void;
}

function Header({
	isIncome,
	colorBase,
	onClose
}: HeaderProps) {
	const IconHeader = isIncome ? ArrowUpRight : ArrowDownRight;

	return (
		<div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.04] flex-shrink-0">
			<div className="flex items-center gap-4">
				<div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${colorBase}-500/10 border border-${colorBase}-500/20 text-${colorBase}-400 shadow-[inset_0_0_12px_rgba(var(--${colorBase}-500-rgb),0.1)]`}>
					<IconHeader className="w-6 h-6" />
				</div>
				<div>
					<h2 className="text-xl font-semibold text-white tracking-tight">
						Nova {isIncome ? 'Receita' : 'Despesa'}
					</h2>
					<p className="text-sm font-light text-zinc-500 mt-0.5">
						Registre uma {isIncome ? 'entrada' : 'saída'} de dinheiro
					</p>
				</div>
			</div>
			<button 
				onClick={onClose}
				className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-all"
			>
				<X className="cursor-pointer w-5 h-5" />
			</button>
		</div>
	)
}

export default Header;