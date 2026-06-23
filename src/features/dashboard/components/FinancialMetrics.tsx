import { useThemeContext } from "../../../context/ThemeContext";

function FinancialMetrics() {
	const { currentTheme, THEME_SHEETS } = useThemeContext();

	return (
		<section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
			
			{/* CARD 1: ENTROU */}
			<div className="p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div className="flex items-center justify-between mb-4">
					<span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>Entrou</span>
					<span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: THEME_SHEETS.colors.successBg, color: THEME_SHEETS.colors.success }}>
						↑
					</span>
				</div>
				<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTheme.textPrimary }}>
					R$ 4.500,00
				</h3>
				<p className="text-xs text-emerald-500 font-bold mt-2">▲ +12% <span className="font-normal" style={{ color: currentTheme.textSecondary }}>vs. mês anterior</span></p>
			</div>

			{/* CARD 2: SAIU */}
			<div className="p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div className="flex items-center justify-between mb-4">
					<span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>Saiu</span>
					<span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold" style={{ backgroundColor: THEME_SHEETS.colors.errorBg, color: THEME_SHEETS.colors.error }}>
						↓
					</span>
				</div>
				<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTheme.textPrimary }}>
					R$ 1.350,00
				</h3>
				<p className="text-xs text-red-500 font-bold mt-2">▼ -8% <span className="font-normal" style={{ color: currentTheme.textSecondary }}>vs. mês anterior</span></p>
			</div>

			{/* CARD 3: SOBROU */}
			<div className="p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div className="flex items-center justify-between mb-4">
					<span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>Sobrou</span>
					<span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(79, 124, 255, 0.08)', color: THEME_SHEETS.colors.brand.primary }}>
						🏦
					</span>
				</div>
				<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight"
						style={{ color: 1 >= 0 ? currentTheme.textPrimary : THEME_SHEETS.colors.error }}>
					R$ 3.150,00
				</h3>
				<p className="text-xs font-bold mt-2" style={{ color: currentTheme.textSecondary }}>
					Taxa de Economia: <span style={{ color: THEME_SHEETS.colors.brand.primary }}>28%</span>
				</p>
			</div>

			{/* CARD 4: MAIOR GASTO */}
			<div className="p-5 md:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.01]"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div className="flex items-center justify-between mb-4">
					<span className="text-xs font-bold uppercase tracking-wider" style={{ color: currentTheme.textSecondary }}>Maior Gasto</span>
					<span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: 'rgba(255, 107, 107, 0.08)', color: '#FF6B6B' }}>
						📉
					</span>
				</div>
				<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTheme.textPrimary }}>
					Alimentação
				</h3>
				<p className="text-xs font-bold mt-2" style={{ color: currentTheme.textSecondary }}>
					Consome <span className="text-red-400">40%</span> das despesas
				</p>
			</div>

		</section>
	)
}

export default FinancialMetrics;