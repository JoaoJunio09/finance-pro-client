import { useState } from "react";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Dashboard from "../features/dashboard/components/Dashboard";
import MobileNav from "../components/layout/mobileNav/MobileNav";

function DashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex bg-[#09090B] text-zinc-100 selection:bg-[#7C3AED]/30 font-sans">
			<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.08)_0%,_rgba(9,9,11,0)_60%)]"></div>
      </div>

			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} active="dashboard" />

			<Dashboard />

			<MobileNav setIsOpen={setIsSidebarOpen} active="dashboard" />
		</div>
	)
}

export default DashboardPage;