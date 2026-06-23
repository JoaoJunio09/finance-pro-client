import { useThemeContext } from "../../../context/ThemeContext";
import CurrentBalance from "./CurrentBalance";
import DashboardBrand from "./DashboardBrand";
import FinancialMetrics from "./FinancialMetrics";
import FinancialInsights from "./FinancialInsights";
import FinancialOverview from "./FinancialOverview";

function Dashboard() {
	const { currentTheme } = useThemeContext();

	return (
		<main className="flex-1 overflow-y-auto">
			<div className="p-4 md:p-8 max-w-[1500px] w-[92%] mx-auto flex flex-col gap-8">		
				{/* SEÇÃO HERO FINANCIAL (Primeira Dobra) */}
				<DashboardBrand />

				<div className="flex flex-wrap items-center">
					{/* Seletor de Período Premium, Minimalista e Integrado */}
					<select
						// value={selectedPeriod}
						// onChange={(e) => setSelectedPeriod(e.target.value)}
						className="px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer focus:outline-none hover:opacity-90"
						style={{
							backgroundColor: currentTheme.hover,
							borderColor: currentTheme.border,
							color: currentTheme.textPrimary,
						}}
					>
						<option value="Junho 2026">Junho 2026</option>
						<option value="Maio 2026">Maio 2026</option>
						<option value="Abril 2026">Abril 2026</option>
					</select>
				</div>

				{/* GRID DE CARDS PRINCIPAIS */}
				<FinancialMetrics />

				{/* SALDO ATUAL CONSOLIDADO */}
				<CurrentBalance />
				
				{/* GRID DE INFORMAÇÕES SECUNDÁRIAS */}
				<FinancialInsights />

				{/* TERCEIRA DOBRA: EVOLUÇÃO FINANCEIRA & ATIVIDADES RECENTES */}
				<FinancialOverview />
			</div>
		</main>
	)
}

export default Dashboard;