import {
  Activity,
  BarChart3,
  CreditCard,
  Home,
  Repeat,
  ShieldCheck,
  User,
  Wallet,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MainViewDesktop } from '../../../../types/mainView';

import styles from './Sidebar.module.css';

interface NavItem {
  id: MainViewDesktop;
  label: string;
  icon: React.ElementType;
  path: string;
}

const PRIMARY_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'analytics', label: 'Análises', icon: BarChart3, path: '/analises' },
  { id: 'activities', label: 'Atividades', icon: Activity, path: '/atividades' },
  { id: 'wallets', label: 'Carteiras', icon: Wallet, path: '/carteiras' },
  { id: 'transactions', label: 'Transações', icon: CreditCard, path: '/transacoes' },
  { id: 'recurrences', label: 'Recorrências', icon: Repeat, path: '/recorrencias' },
];

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
  mainView: MainViewDesktop;
}

export function Sidebar({
	isOpen,
	onClose,
  mainView
}: SidebarProps) {

  const handleSelect = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-50 transition-opacity duration-300 ${styles.overlay} ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col border-r ${styles.aside} ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${styles.header}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${styles.logoBadge}`}>
              <ShieldCheck size={18} className="text-white" />
            </div>
            <span className={`font-bold tracking-tight ${styles.logoText}`}>FinancePro</span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${styles.closeBtn}`}
            aria-label="Fechar menu"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 scrollbar-hide">
          <span className={`text-xs font-semibold uppercase tracking-wider mb-2 px-3 ${styles.sectionLabel}`}>Principal</span>

          {PRIMARY_ITEMS.map((item) => {
            const isActive = mainView === item.id;
            return (
              <Link to={item.path}
                key={item.id}
                onClick={() => handleSelect()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors w-full text-left font-medium ${
                  isActive ? styles.navItemActive : styles.navItemDefault
                }`}
                type="button"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}

          <div className={`my-2 border-t ${styles.divider}`} />

          <span className={`text-xs font-semibold uppercase tracking-wider mb-2 px-3 ${styles.sectionLabel}`}>Configurações</span>

          <button
            onClick={() => handleSelect()}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors w-full text-left font-medium ${
              mainView === 'profile' ? styles.navItemActive : styles.navItemDefault
            }`}
            type="button"
          >
            <User size={18} />
            Meu Perfil
          </button>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;