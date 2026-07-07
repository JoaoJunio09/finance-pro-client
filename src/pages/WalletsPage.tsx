
import { useState } from "react";
import MobileNav from "../components/layout/mobileNav/MobileNav";
import Wallets from "../features/wallets/Wallets";
import Sidebar from "../components/layout/sidebar/Sidebar";

function WalletsPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen flex bg-[#09090B] text-zinc-100 selection:bg-[#7C3AED]/30 font-sans">
			<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.08)_0%,_rgba(9,9,11,0)_60%)]"></div>
      </div>

			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} active="wallets" />

			<Wallets />

			<MobileNav setIsOpen={setIsSidebarOpen} active="wallets" />
		</div>
	)
}

export default WalletsPage;