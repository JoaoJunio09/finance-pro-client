import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { AuthProvider } from "../context/AuthContext";
import SignIn from "../features/dashboard/auth/components/SignIn";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;