import { useThemeContext } from "../../../context/ThemeContext";

function DashboardBrand() {
	const { theme, currentTheme, THEME_SHEETS } = useThemeContext();

	return (
		<section
			className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b transition-colors duration-300"
			style={{ borderColor: currentTheme.border }}
		>
			<div>
				<p className="text-xs font-bold uppercase tracking-widest" style={{ color: THEME_SHEETS.colors.brand.primary }}>Painel de Controle</p>
				<h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1" style={{ color: currentTheme.textPrimary }}>Olá, João 👋</h1>
				<p className="mt-2 text-sm md:text-base" style={{ color: currentTheme.textSecondary }}>
					Sua situação financeira está <span className="font-semibold text-emerald-500">altamente saudável</span>. 
					Você economizou <span className="underline decoration-[#4F7CFF] font-bold" style={{ color: currentTheme.textPrimary }}>14% mais</span> do que no mês passado.
				</p>
			</div>

			{/* Ação Principal - Responsiva (100% no mobile, automática no desktop) - Stripe & Linear style */}
			<div className="w-full md:w-auto">
				<button 
					// onClick={() => setShowNewTransactionModal(true)}
					className="w-full md:w-auto h-11 px-5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-150 flex items-center justify-center gap-2 border shadow-sm"
					style={{ 
						backgroundColor: theme === 'dark' ? '#252936' : '#FFFFFF',
						borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
						color: theme === 'dark' ? '#FFFFFF' : '#0F172A',
					}}
					onMouseOver={(e) => {
						e.currentTarget.style.backgroundColor = theme === 'dark' ? '#2E3345' : '#F1F5F9';
					}}
					onMouseOut={(e) => {
						e.currentTarget.style.backgroundColor = theme === 'dark' ? '#252936' : '#FFFFFF';
					}}
				>
					<svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
					<span>Nova Transação</span>
				</button>
			</div>
		</section>
	)
}

export default DashboardBrand;