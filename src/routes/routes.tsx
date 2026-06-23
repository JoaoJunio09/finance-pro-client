import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App2";
import { ThemeProvider } from "../context/ThemeContext";
import DashboardPage from "../pages/DashboardPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;