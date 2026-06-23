import { useState } from "react";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Dashboard from "../features/dashboard/components/Dashboard";

function DashboardPage() {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	return (
		<div className="bg-[#0D0D0D] text-[#EDEDED] font-sans text-sm min-h-screen flex flex-col lg:flex-row antialiased overflow-hidden">
			<Sidebar
				isExpanded={isSidebarExpanded} 
        setIsExpanded={setIsSidebarExpanded}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
			/>
			<Dashboard
				isSidebarExpanded={isSidebarExpanded}
			/>
		</div>
	)
}

export default DashboardPage;