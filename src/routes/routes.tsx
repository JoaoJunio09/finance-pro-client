import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import ActivitiesPage from "../pages/ActivitiesPage";
import Settings from "../pages/ConfigurationPage";
import DashboardPage from "../pages/DashboardPage";
import RecurrencesPage from "../pages/RecurrencesPage";
import SignInPage from "../pages/SignInPage";
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
							<Route path="/activities" element={<ActivitiesPage />} />
							<Route path="/wallets" element={<WalletsPage />} />
							<Route path="/recurrences" element={<RecurrencesPage />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</ThemeProvider>
				</AccountProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;