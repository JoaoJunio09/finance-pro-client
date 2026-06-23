import Header from "../components/layout/header/Header";
import { useThemeContext } from "../context/ThemeContext";
import Dashboard from "../features/dashboard/components/Dashboard";

function DashboardPage() {
	const { currentTheme } = useThemeContext();

	return (
		<div className="min-h-screen flex flex-col font-sans transition-colors duration-300" style={{ backgroundColor: currentTheme.bg, color: currentTheme.textPrimary }}>
			<Header />
			<Dashboard />
		</div>
	)
}

export default DashboardPage;