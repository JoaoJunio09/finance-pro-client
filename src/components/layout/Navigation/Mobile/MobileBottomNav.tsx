import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Activity, BarChart3, Home, Menu, X, 
  CreditCard, RefreshCw, Wallet, FileText, Settings, User,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { MainViewMobile } from '../../../../types/mainView';

import styles from './MobileBottomNav.module.css';

interface NavTab {
  id: MainViewMobile | 'more';
  label: string;
  icon: React.ElementType;
  path: string;
}

const TABS: NavTab[] = [ 
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'analytics', label: 'Análises', icon: BarChart3, path: '/analises' },
];

const TABS_RIGHT: NavTab[] = [
  { id: 'activities', label: 'Atividades', icon: Activity, path: '/atividades' },
  { id: 'more', label: 'Mais', icon: Menu, path: '/opcoes' },
];

// --- DADOS REESTRUTURADOS PARA A NOVA UI ---
const PRIMARY_CARDS = [
  { id: 'wallets', label: 'Carteiras', icon: Wallet, path: '/carteiras', desc: 'Contas e saldos' },
  { id: 'transactions', label: 'Transações', icon: CreditCard, path: '/transacoes', desc: 'Entradas e saídas' },
  { id: 'recurrences', label: 'Recorrências', icon: RefreshCw, path: '/recorrencias', desc: 'Gestão de fixas' },
  { id: 'activities', label: 'Atividades', icon: Activity, path: '/atividades', desc: 'Histórico geral' },
];

const SECONDARY_LIST = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analises' },
  { id: 'reports', label: 'Relatórios', icon: FileText, path: '/relatorios' },
];

const ACCOUNT_LIST = [
  { id: 'profile', label: 'Perfil', icon: User, path: '/perfil' },
  { id: 'settings', label: 'Configurações', icon: Settings, path: '/configuracoes' },
];

// --- COMPONENTE DO DRAWER FULLSCREEN (ESTILO APP NATIVO) ---
function MobileMoreMenu({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // CORREÇÃO AQUI: 
      // Utilizando um setTimeout bem curto (10ms a 50ms) para quebrar o batching do React.
      // O DOM agora tem tempo de renderizar o estado inicial (fora da tela) ANTES
      // de mudar a classe para disparar a animação (translate-x-0).
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 20); 
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 400); // Tempo da animação de saída inalterado
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] lg:hidden overflow-hidden">
      {/* Container Principal Fullscreen */}
      <div
        className={`absolute inset-0 w-full h-full bg-[var(--bg-surface)] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header App-like */}
        <div 
          className={`flex items-center px-4 py-3 border-b border-[var(--border-light)] bg-[var(--bg-surface)] z-10 pt-safe transition-all duration-500 delay-75 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full hover:bg-[var(--bg-elevated)] active:bg-[var(--bg-elevated)] active:scale-95 transition-all text-[var(--text-main)]"
            aria-label="Voltar"
          >
            <ChevronLeft size={30} strokeWidth={2.5} />
          </button>
          <h2 className="ml-1 text-[19px] font-bold text-[var(--text-main)] tracking-tight">Mais</h2>
        </div>

        {/* Corpo Scrollável */}
        <div className="flex-1 overflow-y-auto pb-safe">
          <div className="px-5 py-6 flex flex-col gap-9">
            
            {/* Área de Perfil */}
            <div 
              className={`flex items-center gap-4 transition-all duration-700 delay-100 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--accent)] to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <User size={32} strokeWidth={2} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[22px] font-extrabold text-[var(--text-main)] leading-tight tracking-tight">Olá, Usuário</span>
                <span className="text-[14px] font-medium text-[var(--text-muted)] mt-0.5">Sua vida financeira</span>
              </div>
            </div>

            {/* Grid Principal: Financeiro */}
            <div 
              className={`transition-all duration-700 delay-150 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4 px-1">
                Financeiro
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {PRIMARY_CARDS.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={onClose}
                      className={`flex flex-col gap-3 p-4 rounded-[20px] transition-all duration-200 active:scale-[0.96] border ${
                        isActive 
                          ? 'bg-[var(--accent)]/10 border-[var(--accent)]/20' 
                          : 'bg-[var(--bg-elevated)] border-[var(--border-light)] shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm ${
                        isActive ? 'bg-[var(--accent)] text-white' : 'bg-[var(--bg-surface)] text-[var(--accent)]'
                      }`}>
                        <item.icon size={22} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col mt-1">
                        <span className={`text-[16px] font-bold ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-main)]'}`}>
                          {item.label}
                        </span>
                        <span className="text-[12px] font-medium text-[var(--text-muted)] mt-0.5 leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Lista Secundária: Análises */}
            <div 
              className={`transition-all duration-700 delay-200 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-1">
                Análises
              </h3>
              <div className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border-light)] shadow-sm overflow-hidden flex flex-col">
                {SECONDARY_LIST.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between p-4 transition-colors active:bg-[var(--bg-surface)] ${
                      idx !== SECONDARY_LIST.length - 1 ? 'border-b border-[var(--border-light)]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)]">
                        <item.icon size={18} strokeWidth={2.5} />
                      </div>
                      <span className="text-[17px] font-semibold text-[var(--text-main)]">{item.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-[var(--border-color)]" strokeWidth={2.5} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Lista Terciária: Conta */}
            <div 
              className={`transition-all duration-700 delay-300 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <h3 className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-1">
                Conta
              </h3>
              <div className="bg-[var(--bg-elevated)] rounded-[20px] border border-[var(--border-light)] shadow-sm overflow-hidden flex flex-col">
                {ACCOUNT_LIST.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between p-4 transition-colors active:bg-[var(--bg-surface)] ${
                      idx !== ACCOUNT_LIST.length - 1 ? 'border-b border-[var(--border-light)]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-muted)]">
                        <item.icon size={18} strokeWidth={2.5} />
                      </div>
                      <span className="text-[17px] font-semibold text-[var(--text-main)]">{item.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-[var(--border-color)]" strokeWidth={2.5} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// --- COMPONENTE PRINCIPAL (MOBILE BOTTOM NAV) ---
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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <>
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
              const isMoreTab = tab.id === 'more';
              const isActive = mainView === tab.id || (isMoreTab && isMoreMenuOpen);

              if (isMoreTab) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${
                      isOpenQuickActions ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                    } ${isActive ? styles.tabActive : styles.tabDefault}`}
                    type="button"
                  >
                    <tab.icon size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                );
              }

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

      <MobileMoreMenu 
        isOpen={isMoreMenuOpen} 
        onClose={() => setIsMoreMenuOpen(false)} 
      />
    </>
  );
}

export default MobileBottomNav;