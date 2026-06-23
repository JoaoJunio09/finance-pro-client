import { useThemeContext } from "../../../context/ThemeContext";

function FinancialInsights() {
	const { currentTheme, THEME_SHEETS } = useThemeContext();

	return (
		<section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
					
			{/* LADO ESQUERDO: PARA ONDE FOI MEU DINHEIRO */}
			<div className="lg:col-span-7 p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-300"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Para onde foi meu dinheiro?</h3>
							<p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Sua distribuição estruturada de despesas</p>
						</div>
						<span className="text-xs font-bold px-3 py-1 rounded-full border" style={{ backgroundColor: currentTheme.hover, borderColor: currentTheme.border, color: currentTheme.textSecondary }}>Este Mês</span>
					</div>

					<div className="flex flex-col gap-5">
						{Object.keys(THEME_SHEETS.colors.categories).filter(c => c !== 'income').map(catKey => {
							const catObj = THEME_SHEETS.colors.categories[catKey];
							// const rawVal = totals.categoriesSum[catKey] || 0;
							// const percent = totals.totalExpenses > 0 ? Math.round((rawVal / totals.totalExpenses) * 100) : 0;

							return (
								<div key={catKey}>
									<div className="flex justify-between items-center text-sm font-semibold mb-2">
										<div className="flex items-center gap-3">
											<span className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: catObj.bg }}>
												{catObj.icon}
											</span>
											<span className="font-bold" style={{ color: currentTheme.textPrimary }}>{catObj.label}</span>
										</div>
										<div className="text-right">
											<span className="block font-bold" style={{ color: currentTheme.textPrimary }}>R$ 500,00</span>
											<span className="text-xs" style={{ color: catObj.color }}>30% do total</span>
										</div>
									</div>
									<div className="w-full h-2 rounded-full overflow-hidden relative" style={{ backgroundColor: currentTheme.hover }}>
										<div 
											className="h-full rounded-full transition-all duration-500 ease-out"
											style={{ 
												backgroundColor: catObj.color, 
												width: `30%`,
												boxShadow: `0 0 10px ${catObj.color}20`
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="mt-8 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: currentTheme.border, color: currentTheme.textSecondary }}>
					<span>💡 Gastos com <strong>Lazer</strong> caíram 15% esta semana.</span>
					<span className="font-bold hover:underline cursor-pointer" style={{ color: THEME_SHEETS.colors.brand.primary }}>Ver Relatório Completo →</span>
				</div>
			</div>

			{/* LADO DIREITO: INSIGHTS INTELIGENTES */}
			<div className="lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-300"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold tracking-tight flex items-center gap-2" style={{ color: currentTheme.textPrimary }}>
								💡 Insights Inteligentes
							</h3>
							<p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Seu assistente financeiro pessoal</p>
						</div>
						<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
					</div>

					<div className="flex flex-col gap-4">
						
						<div className="p-4 rounded-xl border flex gap-3 hover:opacity-95 transition-opacity"
									style={{ borderLeft: `4px solid ${THEME_SHEETS.colors.warning}`, borderColor: currentTheme.border, backgroundColor: currentTheme.hover }}>
							<span className="text-lg">⚠️</span>
							<div>
								<h4 className="text-sm font-extrabold" style={{ color: currentTheme.textPrimary }}>Atenção com Alimentação</h4>
								<p className="text-xs mt-1 leading-relaxed" style={{ color: currentTheme.textSecondary }}>
									Você gastou <span className="font-bold" style={{ color: currentTheme.textPrimary }}>R$ 430 a mais</span> em alimentação que a média histórica.
								</p>
							</div>
						</div>

						<div className="p-4 rounded-xl border flex gap-3 hover:opacity-95 transition-opacity"
									style={{ borderLeft: `4px solid ${THEME_SHEETS.colors.success}`, borderColor: currentTheme.border, backgroundColor: currentTheme.hover }}>
							<span className="text-lg">📈</span>
							<div>
								<h4 className="text-sm font-extrabold" style={{ color: currentTheme.textPrimary }}>Parabéns pela Meta!</h4>
								<p className="text-xs mt-1 leading-relaxed" style={{ color: currentTheme.textSecondary }}>
									Sua taxa de economia aumentou <span className="text-emerald-500 font-bold">15%</span>. Você está mais perto da meta de viagem.
								</p>
							</div>
						</div>

						<div className="p-4 rounded-xl border flex gap-3 hover:opacity-95 transition-opacity"
									style={{ borderLeft: `4px solid ${THEME_SHEETS.colors.brand.primary}`, borderColor: currentTheme.border, backgroundColor: currentTheme.hover }}>
							<span className="text-lg">🏆</span>
							<div>
								<h4 className="text-sm font-extrabold" style={{ color: currentTheme.textPrimary }}>Excelente Performance</h4>
								<p className="text-xs mt-1 leading-relaxed" style={{ color: currentTheme.textSecondary }}>
									Este é seu melhor mês financeiro do ano até o momento.
								</p>
							</div>
						</div>

					</div>
				</div>

				<div className="pt-4 mt-6 border-t text-center" style={{ borderColor: currentTheme.border }}>
					<button className="text-xs font-bold hover:opacity-80 transition-opacity" style={{ color: THEME_SHEETS.colors.brand.primary }}>
						Falar com assistente IA →
					</button>
				</div>
			</div>

		</section>
	)
}

export default FinancialInsights;