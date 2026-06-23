import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import DashboardPage from "../pages/DashboardPage";
import { AuthProvider } from "../context/AuthContext";
import SignIn from "../features/dashboard/auth/components/SignIn";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ThemeProvider>
					<Routes>
						<Route path="/" element={<SignIn />} />
						<Route path="/dashboard" element={<DashboardPage />} />
					</Routes>
				</ThemeProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;