import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";
import DashboardPage from "../pages/DashboardPage";
import SignInPage from "../pages/SignInPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AccountProvider>
					<Routes>
						<Route path="/" element={<SignInPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
					</Routes>
				</AccountProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;