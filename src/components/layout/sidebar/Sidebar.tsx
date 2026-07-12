import { Activity, LayoutGrid, RepeatIcon, Settings, Wallet, X } from "lucide-react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  {
    name: 'Painel de Controle',
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
    name: 'Contas e Carteiras',
    active: 'wallets',
    path: '/wallets',
    icon: Wallet,
  },
  {
    name: 'Recorrências',
    active: 'recurrences',
    path: '/recurrences',
    icon: RepeatIcon,
  },
  {
    name: 'Configurações',
    active: 'configuration',
    path: '/configurations',
    icon: Settings,
  },
]

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  active?: string
}

function Sidebar({ isOpen, setIsOpen, active = 'dashboard' }: SidebarProps) {
  return (
    <div>
      {/* Mobile Overlay Escuro */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
          ${isOpen
            ? 'w-[280px] md:w-[256px] translate-x-0 bg-[#09090B]/95 md:bg-[#09090B]/50 border-r border-white/[0.04] backdrop-blur-md shadow-2xl md:shadow-none'
            : 'w-[280px] md:w-[90px] -translate-x-full bg-[#09090B]/95 border-r border-transparent md:translate-x-0 md:bg-transparent md:backdrop-blur-none'
          }
        `}
      >
        {/* Área da Logo (Sempre fixa a pl-4 do canto esquerdo para não mover ao abrir/fechar) */}
        <div className="flex items-center h-28 pl-6 pr-6 flex-shrink-0">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111113] to-[#18181B] flex items-center justify-center border border-white/[0.08] shadow-lg cursor-pointer hover:border-[#7C3AED]/50 transition-colors duration-500 relative group"
          >
            <div className="w-4 h-4 rounded-full bg-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.6)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-shadow duration-500"></div>
          </div>
          
          {/* Botão de Fechar Exclusivo do Mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden ml-auto text-zinc-500 hover:text-zinc-300 p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Container de Conteúdo (Navegação + Perfil) */}
        <div 
          className={`flex-1 flex flex-col w-[280px] md:w-[256px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
          }`}
        >
          <nav className="flex-1 w-full flex flex-col gap-3 px-6 pt-4">
            {MENU_ITEMS.map((menu) => (
              <Link key={menu.name} to={menu.path}
                className={`
                  cursor-pointer h-12 w-full rounded-2xl ] flex items-center px-4 transition-all hover:bg-[#7C3AED]/15 group
                  ${active === menu.active ? 'bg-[#7C3AED]/10 text-[#8B5CF6]' : 'text-zinc-400 hover:text-zinc-100'}
                `}
              >
                <menu.icon className="w-5 h-5 flex-shrink-0" />
                <span className="ml-4 font-medium whitespace-nowrap">{menu.name}</span>
              </Link>
            ))}
          </nav>

          {/* Perfil */}
          <div className="p-6 mb-4 md:mb-8">
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#111113]/50 border border-white/[0.02] hover:border-white/[0.08] transition-all cursor-pointer">
              <div className="w-10 h-10 flex-shrink-0 rounded-full border border-white/10 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-zinc-200 truncate">Admin Avora</span>
                <span className="text-xs text-zinc-500 truncate">admin@avora.com</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar;