import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import DashboardPage from "../pages/DashboardPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;