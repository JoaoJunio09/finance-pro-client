import { Activity, LayoutGrid, Menu, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const MOBILE_ITEMS_BOTTOM = [
  {
    name: 'Atividades',
    active: 'activities',
    path: '/activities',
    icon: Activity,
  },
	{
    name: 'Painel de Controle',
    active: 'dashboard',
    path: '/dashboard',
    icon: LayoutGrid,
  },
	{
    name: 'Contas e Carteiras',
    active: 'wallets',
    path: '/wallets',
    icon: Wallet,
  },
]

interface MobileNavProps {
	setIsOpen: (val: boolean) => void,
	active: string
}

function MobileNav({ setIsOpen, active }: MobileNavProps) {
	return (
		<nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.04] flex justify-around items-center mt-10 py-3 px-6 z-40 safe-area-bottom pb-3">
			<button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2">
				<Menu className="w-6 h-6" />
			</button>
			{MOBILE_ITEMS_BOTTOM.map((menu) => (
				<Link key={menu.name} to={menu.path} className={`
					text-[#8B5CF6] p-2
					${active === menu.active ? 'text-[#8B5CF6]' : 'text-zinc-500 hover:text-zinc-100'}	
				`}>
					{<menu.icon className="w-6 h-6" />}
				</Link>
			))}
			<button className="w-8 h-8 rounded-full border border-white/10 overflow-hidden ml-2">
				<img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale" />
			</button>
		</nav>
	)
}

export default MobileNav;