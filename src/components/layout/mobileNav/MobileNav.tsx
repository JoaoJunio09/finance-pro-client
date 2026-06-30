import { Activity, LayoutGrid, Menu } from "lucide-react";

function MobileNav({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
	return (
		<nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.04] flex justify-around items-center py-3 px-6 z-40 safe-area-bottom pb-3">
			<button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2">
				<Menu className="w-6 h-6" />
			</button>
			<button className="text-[#8B5CF6] p-2">
				<LayoutGrid className="w-6 h-6" />
			</button>
			<button className="text-zinc-500 hover:text-zinc-200 transition-colors p-2">
				<Activity className="w-6 h-6" />
			</button>
			<button className="w-8 h-8 rounded-full border border-white/10 overflow-hidden ml-2">
				<img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale" />
			</button>
		</nav>
	)
}

export default MobileNav;