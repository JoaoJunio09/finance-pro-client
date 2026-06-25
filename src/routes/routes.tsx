import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { AuthProvider } from "../context/AuthContext";
import SignInPage from "../pages/SignInPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<SignInPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;