import { ArrowLeftRight, LayoutDashboard, Menu, RefreshCw, Target, User, Wallet, X } from "lucide-react";

export interface MenuItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ size: number; className?: string }>;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transacoes', label: 'Transações', icon: ArrowLeftRight },
  { id: 'carteiras', label: 'Carteiras', icon: Wallet },
  { id: 'recorrencias', label: 'Recorrências', icon: RefreshCw },
  { id: 'metas', label: 'Metas', icon: Target },
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
}

function Sidebar({
  isExpanded,
  setIsExpanded,
  isDrawerOpen,
  setIsDrawerOpen,
  activeItem = 'dashboard',
  onNavigate
}: SidebarProps) {

  const handleToggleDesktop = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (id: string) => {
    if (onNavigate) onNavigate(id);
    setIsDrawerOpen(false); // Fecha o menu lateral móvel ao clicar
  };

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────────────
          TOPBAR MOBILE (< 1024px)
          ────────────────────────────────────────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111111] border-b border-[#2A2A2A] px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1 hover:bg-[#1E1E1E] rounded-xl transition-colors text-[#A1A1AA] hover:text-[#EDEDED]"
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-2 select-none">
            <span className="w-6 h-6 rounded-md bg-[#6366F1] flex items-center justify-center font-semibold text-white text-xs font-sans">
              F
            </span>
            <span className="text-[#EDEDED] font-semibold text-sm font-sans tracking-tight">
              FinancePro
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
          <User size={18} />
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────────────
          DRAWER MOBILE (< 1024px) — CORREÇÃO 3 (Inverter Posições no Header do Drawer)
          ────────────────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed inset-0 z-50 pointer-events-none transition-all duration-250">
        {/* Overlay escuro de fundo */}
        <div 
          className={`absolute inset-0 bg-black/75 pointer-events-auto transition-opacity duration-250 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Corpo do Drawer lateral */}
        <div 
          className={`absolute top-0 left-0 bottom-0 w-[280px] bg-[#111111] border-r border-[#2A2A2A] rounded-r-3xl flex flex-col justify-between py-6 pointer-events-auto transition-transform duration-250 ease-in-out ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Header do Drawer — CORREÇÃO 3 (Nome e Logo na Esquerda, Botão de Fechar na Direita) */}
            <div className="flex flex-row justify-between items-center px-4 pt-[20px] pb-4 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-md bg-[#6366F1] flex items-center justify-center font-semibold text-white text-xs font-sans">
                  F
                </span>
                <span className="text-[#EDEDED] font-semibold text-base font-sans tracking-tight">
                  FinancePro
                </span>
              </div>
              
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 hover:bg-[#1E1E1E] rounded-xl transition-colors text-[#71717A] hover:text-[#EDEDED]"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Itens do Menu Drawer */}
            <div className="mt-6 px-2">
              <span className="px-4 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] block mb-2 font-sans">
                MENU
              </span>
              <nav className="flex flex-col space-y-1">
                {MENU_ITEMS.map((item) => {
                  const isActive = activeItem === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left font-medium transition-all duration-150 font-sans ${
                        isActive 
                          ? 'bg-[#6366F1]/10 text-[#6366F1]' 
                          : 'text-[#A1A1AA] hover:bg-[#1E1E1E] hover:text-[#EDEDED]'
                      }`}
                    >
                      <Icon size={20} className={isActive ? 'text-[#6366F1]' : 'text-[#71717A]'} />
                      <span className="text-[15px]">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Rodapé Drawer Mobile */}
          <div className="px-4 pt-4 border-t border-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] shrink-0">
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-semibold text-[#EDEDED] font-sans truncate">João Silva</div>
                <div className="text-[12px] text-[#71717A] font-sans truncate">joao@financepro.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          SIDEBAR DESKTOP (Largura animada) — CORREÇÃO 2 (Estratégia Overflow-Hidden e Sem Unmounting)
          ────────────────────────────────────────────────────────────────────────── */}
      <aside 
        className="hidden lg:flex fixed top-0 left-0 bottom-0 bg-[#111111] border-r border-[#2A2A2A] flex-col justify-between py-6 z-40 select-none overflow-hidden"
        style={{
          width: isExpanded ? '240px' : '68px',
          transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Superior: Logo / Gatilho de toggle */}
        <div className="px-3">
          <div 
            onClick={handleToggleDesktop}
            className="flex items-center rounded-xl p-2.5 cursor-pointer hover:bg-[#1E1E1E] transition-colors duration-150"
          >
            <div className="w-6 h-6 rounded-md bg-[#6366F1] flex items-center justify-center font-bold text-white text-xs shrink-0">
              F
            </div>
            
            <span
              className={`
                text-[#EDEDED] font-semibold text-base font-sans tracking-tight
                overflow-hidden whitespace-nowrap block
                transition-all duration-300
                ${isExpanded ? 'opacity-100 max-w-[200px] ml-3' : 'opacity-0 max-w-0 ml-0'}
              `}
            >
              FinancePro
            </span>
          </div>
        </div>

        {/* Links de navegação Desktop — Sem conditional rendering para evitar piscar de ícones */}
        <nav className="flex flex-col space-y-1.5 px-2">
          {MENU_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                title={!isExpanded ? item.label : undefined}
                className={`w-full flex items-center py-2.5 rounded-xl text-left font-medium transition-colors duration-150 font-sans relative ${
                  isExpanded ? 'px-3' : 'justify-center px-0'
                } ${
                  isActive 
                    ? 'bg-[#6366F1]/10 text-[#6366F1]' 
                    : 'text-[#71717A] hover:bg-[#1E1E1E] hover:text-[#EDEDED]'
                }`}
              >
                {/* Borda indicadora esquerda - Somente no estado expandido */}
                {isActive && isExpanded && (
                  <div className="absolute left-0 top-2.5 bottom-2.5 w-0.5 bg-[#6366F1] rounded-r-md" />
                )}

                <Icon size={20} className={isActive ? 'text-[#6366F1]' : 'text-[#71717A]'} />
                
                <span 
                  className="text-[14px] font-sans overflow-hidden whitespace-nowrap block"
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    maxWidth: isExpanded ? '200px' : '0px',
                    marginLeft: isExpanded ? '12px' : '0px',
                    transition: 'opacity 200ms, max-width 250ms cubic-bezier(0.4, 0, 0.2, 1), margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Rodapé Desktop (Perfil) — Sem conditional rendering */}
        <div className="px-2">
          <div 
            className={`flex items-center rounded-xl p-2 transition-colors duration-150 ${
              isExpanded ? 'hover:bg-[#1E1E1E]' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] shrink-0">
              <User size={16} />
            </div>

            <div 
              className="overflow-hidden transition-[opacity,max-width,margin] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap"
              style={{
                opacity: isExpanded ? 1 : 0,
                maxWidth: isExpanded ? '200px' : '0px',
                marginLeft: isExpanded ? '12px' : '0px'
              }}
            >
              <div className="text-[14px] font-medium text-[#EDEDED] font-sans truncate">João Silva</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;