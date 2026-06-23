import { useThemeContext } from "../../../context/ThemeContext";

function CurrentBalance() {
	const { currentTheme } = useThemeContext();

	return (
		<section>
			<div
				className="p-6 md:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
				style={{ 
					backgroundColor: currentTheme.card, 
					borderColor: currentTheme.border, 
					boxShadow: `0 10px 30px ${currentTheme.shadow}` 
				}}
			>
				
				{/* Detalhes do Saldo e Projeção */}
				<div className="flex-1 space-y-2 text-left">
					<div className="flex items-center gap-2">
						<span className="w-2.5 h-2.5 rounded-full bg-[#4F7CFF] animate-pulse" />
						<span className="text-xs font-black uppercase tracking-widest" style={{ color: currentTheme.textSecondary }}>Saldo Atual Consolidado</span>
					</div>
					<h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: currentTheme.textPrimary }}>
						R$ 8.470,50
					</h2>
					<p className="text-xs" style={{ color: currentTheme.textSecondary }}>
						Patrimônio líquido permanente unificado entre todas as suas carteiras ativas. <span className="text-[#4F7CFF] font-semibold">Valor em tempo real</span>.
					</p>
				</div>

				{/* Minimalist Wallet Breakdown (Exibição Premium Estilo Linear/Stripe) */}
				<div className="grid grid-cols-3 gap-4 md:gap-6 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-8 border-slate-800/60 w-full md:w-auto">
					<div className="text-left">
						<span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Conta Corrente</span>
						<span className="text-xs font-mono font-bold" style={{ color: currentTheme.textPrimary }}>
							R$ 5.000,00
						</span>
					</div>
					<div className="text-left">
						<span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Emergência</span>
						<span className="text-xs font-mono font-bold text-emerald-500">
							R$ 3.000,00
						</span>
					</div>
					<div className="text-left">
						<span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Investimentos</span>
						<span className="text-xs font-mono font-bold text-[#9B5DE5]">
							R$ 470,00
						</span>
					</div>
				</div>

			</div>
		</section>

	)
}

export default CurrentBalance;