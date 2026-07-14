import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";
import DashboardPage from "../pages/DashboardPage";
import SignInPage from "../pages/SignInPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import RecurrencesPage from "../pages/RecurrencesPage";
import ScrollToTop from "./ScrollToTop";
import WalletsPage from "../pages/WalletsPage";
import Settings from "../pages/ConfigurationPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AccountProvider>
					<ScrollToTop />
					<Routes>
						<Route path="/" element={<SignInPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/activities" element={<ActivitiesPage />} />
						<Route path="/wallets" element={<WalletsPage />} />
						<Route path="/recurrences" element={<RecurrencesPage />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</AccountProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;