
interface FooterActionsProps {
	onClose: () => void,
	isIncome: boolean,
	onSave: () => void,
	isLoading: boolean
}

function FooterActions({
	onClose,
	isIncome,
	onSave,
	isLoading
}: FooterActionsProps) {
	return (
		<div className="p-6 border-t border-white/[0.04] bg-[#09090B] rounded-b-[24px] flex flex-col sm:flex-row items-center justify-end gap-3 flex-shrink-0">
			<button 
				onClick={onClose}
				className="cursor-pointer w-full sm:w-auto px-4 py-4 sm:py-3.5 rounded-xl bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-colors"
			>
				Cancelar
			</button>
			<button
				onClick={onSave}
				className={`cursor-pointer w-full sm:w-auto px-8 py-4 sm:py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg active:scale-[0.98] ${
					isIncome 
						? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400 shadow-emerald-500/20' 
						: 'bg-rose-500 text-rose-950 hover:bg-rose-400 shadow-rose-500/20'
				}`}
			>
				{isLoading ? (
					'Carregando'
				): (
					`Salvar ${isIncome ? 'Receita' : 'Despesa'}`
				)}
			</button>
		</div>
	)
}

export default FooterActions;