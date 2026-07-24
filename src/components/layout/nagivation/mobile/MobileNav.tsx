import { Activity, LayoutGrid, PieChart, Plus, Settings } from "lucide-react";

import { Link } from "react-router-dom";
import styles from './MobileNav.module.css';

const MOBILE_ITEMS_BOTTOM = [
  {
    name: 'Painel',
    active: 'dashboard',
    path: '/dashboard',
    icon: LayoutGrid,
  },
	{
    name: 'Atividades',
    active: 'activities',
    path: '/activities',
    icon: Activity,
  },
	{
    name: 'Análise',
    active: 'analytics',
    path: '/analytics',
    icon: PieChart,
  },
  {
    name: 'Ajustes',
    active: 'settings',
    path: '/settings',
    icon: Settings,
  },
]

interface MobileNavProps {
	isFabOpen: boolean;
	onToggleFab: () => void;
	active: string;
}

function MobileNav({
  isFabOpen,
  onToggleFab,
  active
}: MobileNavProps) {
	return (
		<nav className={`lg:hidden fixed bottom-0 left-0 right-0 h-22 bg-glass border-t border-glass flex items-center justify-around px-6 pb-4 transition-transform duration-500 ${isFabOpen ? 'z-[120]' : 'z-40'}`}>
      {MOBILE_ITEMS_BOTTOM.slice(0, 2).map((item) => {
        const Icon = item.icon;
        return (
          <Link
            to={item.path}
            className={`
              flex flex-col items-center gap-1.5 transition-transform active:scale-95 hover:text-main
              ${active === item.active ? styles.navItemActive : styles.navItemInactive}
            `}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
          </Link>
        )
      })}
      
      <button 
        onClick={onToggleFab}
        className={`relative flex flex-col items-center justify-center -mt-8 transition-transform duration-500 active:scale-95 z-[110] ${isFabOpen ? 'rotate-[135deg]' : 'rotate-0'}`}
      >
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors duration-500
          ${styles.fabButton}
          ${isFabOpen ? styles.fabButtonOpen : styles.fabButtonClosed}
        `}>
          <Plus className="w-6 h-6" />
        </div>
      </button>

      {MOBILE_ITEMS_BOTTOM.slice(2, 4).map((item) => {
        const Icon = item.icon;
        return (
          <Link
            to={item.path}
            className={`
              flex flex-col items-center gap-1.5 transition-transform active:scale-95 hover:text-main
              ${active === item.active ? styles.navItemActive : styles.navItemInactive}
            `}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
          </Link>
        )
      })}
    </nav>
	)
}

export default MobileNav;