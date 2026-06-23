import { useThemeContext } from "../../../context/ThemeContext";

function FinancialOverview() {
	const { theme, currentTheme, THEME_SHEETS } = useThemeContext();

	return (
		<section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">		
			{/* LADO ESQUERDO: GRÁFICO DE EVOLUÇÃO */}
			<div className="lg:col-span-7 p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-300"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Evolução Financeira</h3>
							<p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Fluxo de caixa comparado - últimos 6 meses</p>
						</div>
						<div className="flex items-center gap-4 text-xs font-bold" style={{ color: currentTheme.textSecondary }}>
							<div className="flex items-center gap-1.5">
								<span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEME_SHEETS.colors.brand.primary }} />
								<span>Receitas</span>
							</div>
							<div className="flex items-center gap-1.5">
								<span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEME_SHEETS.colors.brand.accentPurp }} />
								<span>Despesas</span>
							</div>
						</div>
					</div>

					<div className="w-full h-64 relative mt-4">
						<svg viewBox="0 0 600 220" className="w-full h-full">
							<line x1="0" y1="20" x2="600" y2="20" stroke={theme === 'dark' ? '#1E2230' : '#E2E8F0'} strokeWidth="1" strokeDasharray="4 4" />
							<line x1="0" y1="80" x2="600" y2="80" stroke={theme === 'dark' ? '#1E2230' : '#E2E8F0'} strokeWidth="1" strokeDasharray="4 4" />
							<line x1="0" y1="140" x2="600" y2="140" stroke={theme === 'dark' ? '#1E2230' : '#E2E8F0'} strokeWidth="1" strokeDasharray="4 4" />
							<line x1="0" y1="200" x2="600" y2="200" stroke={theme === 'dark' ? '#1E2230' : '#E2E8F0'} strokeWidth="1" />

							<path 
								d="M 50,170 Q 150,160 250,180 T 450,140 T 550,150" 
								fill="none" 
								stroke={THEME_SHEETS.colors.brand.accentPurp} 
								strokeWidth="3.5" 
								strokeLinecap="round" 
							/>
							<path 
								d="M 50,170 Q 150,160 250,180 T 450,140 T 550,150 L 550,200 L 50,200 Z" 
								fill="url(#purpleGradient)" 
								opacity="0.12" 
							/>

							<path 
								d="M 50,110 Q 150,90 250,70 T 450,50 T 550,45" 
								fill="none" 
								stroke={THEME_SHEETS.colors.brand.primary} 
								strokeWidth="4" 
								strokeLinecap="round" 
							/>
							<path 
								d="M 50,110 Q 150,90 250,70 T 450,50 T 550,45 L 550,200 L 50,200 Z" 
								fill="url(#blueGradient)" 
								opacity="0.18" 
							/>

							<circle cx="550" cy="45" r="5" fill={THEME_SHEETS.colors.brand.primary} />
							<circle cx="550" cy="150" r="5" fill={THEME_SHEETS.colors.brand.accentPurp} />

							<text x="50" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Jan</text>
							<text x="150" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Fev</text>
							<text x="250" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Mar</text>
							<text x="350" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Abr</text>
							<text x="450" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Mai</text>
							<text x="550" y="218" fill={currentTheme.textSecondary} fontSize="11" textAnchor="middle" fontWeight="bold">Jun</text>

							<defs>
								<linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor={THEME_SHEETS.colors.brand.primary} />
									<stop offset="100%" stopColor="transparent" />
								</linearGradient>
								<linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor={THEME_SHEETS.colors.brand.accentPurp} />
									<stop offset="100%" stopColor="transparent" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>

				<div className="pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: currentTheme.border, color: currentTheme.textSecondary }}>
					<span>📊 Tendência atual: <strong>Superávit Operacional Saudável</strong>.</span>
					<span className="font-bold cursor-pointer hover:underline" style={{ color: THEME_SHEETS.colors.brand.primary }}>Configurar metas →</span>
				</div>
			</div>

			{/* LADO DIREITO: ATIVIDADES RECENTES */}
			<div className="lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between transition-colors duration-300"
						style={{ backgroundColor: currentTheme.card, borderColor: currentTheme.border, boxShadow: `0 4px 12px ${currentTheme.shadow}` }}>
				<div>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h3 className="text-xl font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Atividades Recentes</h3>
							<p className="text-xs mt-1" style={{ color: currentTheme.textSecondary }}>Últimas movimentações em sua conta</p>
						</div>
						<button className="text-xs font-bold hover:underline" style={{ color: THEME_SHEETS.colors.brand.primary }}>Ver todas</button>
					</div>

					<div className="flex flex-col gap-4 max-h-[290px] overflow-y-auto pr-1">
						<div className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-transparent hover:scale-[1.01]"
									style={{ backgroundColor: currentTheme.hover }}>
							<div className="flex items-center gap-4">
								<span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105"
											style={{ backgroundColor: 'red' }}>
									IC
								</span>
								<div>
									<h4 className="text-sm font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Alimentação</h4>
									<span className="text-xs" style={{ color: currentTheme.textSecondary }}>22/06 • Compra no Mercado</span>
								</div>
							</div>
							<span className="text-sm font-black tracking-tight"
										style={{ color: true ? THEME_SHEETS.colors.success : currentTheme.textPrimary }}>
								{true ? '+' : '-'} R$ 400,00
							</span>
						</div>
						<div className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-transparent hover:scale-[1.01]"
									style={{ backgroundColor: currentTheme.hover }}>
							<div className="flex items-center gap-4">
								<span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105"
											style={{ backgroundColor: 'red' }}>
									IC
								</span>
								<div>
									<h4 className="text-sm font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Alimentação</h4>
									<span className="text-xs" style={{ color: currentTheme.textSecondary }}>22/06 • Compra no Mercado</span>
								</div>
							</div>
							<span className="text-sm font-black tracking-tight"
										style={{ color: true ? THEME_SHEETS.colors.success : currentTheme.textPrimary }}>
								{true ? '+' : '-'} R$ 400,00
							</span>
						</div>
						<div className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-transparent hover:scale-[1.01]"
									style={{ backgroundColor: currentTheme.hover }}>
							<div className="flex items-center gap-4">
								<span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105"
											style={{ backgroundColor: 'red' }}>
									IC
								</span>
								<div>
									<h4 className="text-sm font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Alimentação</h4>
									<span className="text-xs" style={{ color: currentTheme.textSecondary }}>22/06 • Compra no Mercado</span>
								</div>
							</div>
							<span className="text-sm font-black tracking-tight"
										style={{ color: true ? THEME_SHEETS.colors.success : currentTheme.textPrimary }}>
								{true ? '+' : '-'} R$ 400,00
							</span>
						</div>
						<div className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-transparent hover:scale-[1.01]"
									style={{ backgroundColor: currentTheme.hover }}>
							<div className="flex items-center gap-4">
								<span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105"
											style={{ backgroundColor: 'red' }}>
									IC
								</span>
								<div>
									<h4 className="text-sm font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>Alimentação</h4>
									<span className="text-xs" style={{ color: currentTheme.textSecondary }}>22/06 • Compra no Mercado</span>
								</div>
							</div>
							<span className="text-sm font-black tracking-tight"
										style={{ color: true ? THEME_SHEETS.colors.success : currentTheme.textPrimary }}>
								{true ? '+' : '-'} R$ 400,00
							</span>
						</div>
					</div>
				</div>

				<div className="pt-4 border-t text-center mt-6" style={{ borderColor: currentTheme.border }}>
					<p className="text-xs" style={{ color: currentTheme.textSecondary }}>Mostrando as 5 movimentações mais recentes</p>
				</div>
			</div>
		</section>
	)
}

export default FinancialOverview;