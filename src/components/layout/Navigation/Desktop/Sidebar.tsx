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

// Organização refinada por categorias
const MENU_GROUPS = [
  {
    title: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
      { id: 'analytics', label: 'Análises', icon: BarChart3, path: '/analises' },
    ] as NavItem[]
  },
  {
    title: 'Financeiro',
    items: [
      { id: 'wallets', label: 'Carteiras', icon: Wallet, path: '/carteiras' },
      { id: 'transactions', label: 'Transações', icon: CreditCard, path: '/transacoes' },
      { id: 'recurrences', label: 'Recorrências', icon: Repeat, path: '/recorrencias' },
      { id: 'activities', label: 'Atividades', icon: Activity, path: '/atividades' },
    ] as NavItem[]
  }
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
      {/* Overlay - Animação e estrutura originais mantidas rigorosamente */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-50 transition-opacity duration-300 ${styles.overlay} ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar - Animação e estrutura originais mantidas rigorosamente */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[300px] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col border-r ${styles.aside} ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-[var(--bg-surface)] border-[var(--border-color)]`}
      >
        {/* Header Premium */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[var(--accent)] to-purple-500 shadow-md shadow-purple-500/20">
              <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[20px] font-extrabold tracking-tight text-[var(--text-main)]">
              FinancePro
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--bg-elevated)] active:scale-95 transition-all text-[var(--text-muted)] hover:text-[var(--text-main)]"
            aria-label="Fechar menu"
            type="button"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Navegação Principal */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-8 scrollbar-hide">
          {MENU_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1 px-3">
                {group.title}
              </span>
              
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = mainView === item.id;
                  
                  return (
                    <Link
                      to={item.path}
                      key={item.id}
                      onClick={handleSelect}
                      className={`group flex items-center justify-between px-3 py-3 rounded-2xl transition-all duration-200 border border-transparent ${
                        isActive 
                          ? 'bg-[var(--accent)]/10 border-[var(--accent)]/20 shadow-sm' 
                          : 'hover:bg-[var(--bg-elevated)] hover:border-[var(--border-light)] hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isActive 
                            ? 'bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/20' 
                            : 'bg-[var(--bg-surface)] text-[var(--text-muted)] group-hover:text-[var(--accent)] border border-[var(--border-light)]'
                        }`}>
                          <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={`text-[15px] ${
                          isActive 
                            ? 'font-bold text-[var(--accent)]' 
                            : 'font-medium text-[var(--text-main)] group-hover:text-[var(--text-main)]'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Indicador de página ativa */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mr-1" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Área Inferior (Perfil/Configurações) */}
        <div className="p-4 border-t border-[var(--border-light)] bg-[var(--bg-surface)]">
          <Link
            to="/perfil"
            onClick={handleSelect}
            className={`group flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-200 border border-transparent ${
              mainView === 'profile'
                ? 'bg-[var(--accent)]/10 border-[var(--accent)]/20 shadow-sm'
                : 'hover:bg-[var(--bg-elevated)] hover:border-[var(--border-light)] hover:shadow-sm'
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[var(--accent)] to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <User size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className={`text-[15px] truncate ${
                mainView === 'profile' ? 'font-bold text-[var(--accent)]' : 'font-bold text-[var(--text-main)]'
              }`}>
                Meu Perfil
              </span>
              <span className="text-[12px] font-medium text-[var(--text-muted)] truncate">
                Preferências e conta
              </span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;