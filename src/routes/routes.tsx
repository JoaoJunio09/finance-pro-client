import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import ActivitiesPage from "../pages/ActivitiesPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import Settings from "../pages/ConfigurationPage";
import DashboardPage from "../pages/DashboardPage";
import RecurrencesPage from "../pages/RecurrencesPage";
import SignInPage from "../pages/SignInPage";
import TransactionsPage from "../pages/TransactionsPage";
import WalletsPage from "../pages/WalletsPage";
import ScrollToTop from "./ScrollToTop";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AccountProvider>
					<ThemeProvider>
						<ScrollToTop />
						<Routes>
							<Route path="/" element={<SignInPage />} />
							<Route path="/dashboard" element={<DashboardPage />} />
							<Route path="/atividades" element={<ActivitiesPage />} />
							<Route path="/analises" element={<AnalyticsPage />} />
							<Route path="/carteiras" element={<WalletsPage />} />
							<Route path="/transacoes" element={<TransactionsPage />} />
							<Route path="/recorrencias" element={<RecurrencesPage />} />
							<Route path="/configuracoes" element={<Settings />} />
						</Routes>
					</ThemeProvider>
				</AccountProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;