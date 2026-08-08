import { BarChart3, Home, Menu, Wallet, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MainViewMobile } from '../../../../types/mainView';

import styles from './MobileBottomNav.module.css';

interface NavTab {
  id: MainViewMobile;
  label: string;
  icon: React.ElementType;
  path: string;
}

const TABS: NavTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'analytics', label: 'Análises', icon: BarChart3, path: '/analises' },
];

const TABS_RIGHT: NavTab[] = [
  { id: 'wallets', label: 'Carteiras', icon: Wallet, path: '/carteiras' },
  { id: 'more', label: 'Mais', icon: Menu, path: '/opcoes' },
];

interface MobileBottomNavProps {
  isOpenQuickActions: boolean;
  onToggleQuickActions: () => void;
  mainView: MainViewMobile;
}

function MobileBottomNav({
  isOpenQuickActions,
  onToggleQuickActions,
  mainView
}: MobileBottomNavProps) {
  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-[65] transition-colors duration-300 ${
        isOpenQuickActions ? styles.navTransparent : styles.navSolid
      }`}
    >
      <div className="flex items-center justify-between h-[68px] px-2 relative pb-safe">

        <div className="flex w-full justify-between items-center z-[70]">
          {TABS.map((tab) => {
            const isActive = mainView === tab.id;
            return (
              <Link to={tab.path}
                key={tab.id}
                className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${
                  isOpenQuickActions ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                } ${isActive ? styles.tabActive : styles.tabDefault}`}
                type="button"
              >
                <tab.icon size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}

          <div className="relative -top-6 flex items-center justify-center w-16">
            <button
              onClick={onToggleQuickActions}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 ${
                isOpenQuickActions ? styles.centerBtnOpen : styles.centerBtnClosed
              }`}
              type="button"
              aria-label={isOpenQuickActions ? 'Fechar ações rápidas' : 'Abrir ações rápidas'}
            >
              <X size={28} className={`transition-transform duration-300 ${isOpenQuickActions ? 'rotate-0' : 'rotate-45'}`} />
            </button>
          </div>

          {TABS_RIGHT.map((tab) => {
            const isActive = mainView === tab.id;
            return (
              <Link to={tab.path}
                key={tab.id}
                className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${
                  isOpenQuickActions ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                } ${isActive ? styles.tabActive : styles.tabDefault}`}
                type="button"
              >
                <tab.icon size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileBottomNav;