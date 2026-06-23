import { Link } from "react-router-dom";
import type { CurrentThemeProps } from "../../../props/CurrentThemeProps";
import type { MenuItemsType } from "./Header";

type NavProps = {
  currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
	isSidebarOpen: boolean,
	setIsSidebarOpen: (param: boolean) => void,
	activeMenu: string,
	setActiveMenu: (param: string) => void,
  menuItems: MenuItemsType
}

const Nav = ({
  currentTheme,
	THEME_SHEETS,
	setIsSidebarOpen,
	activeMenu,
	setActiveMenu,
  menuItems
}: NavProps) => {
  return (
    <nav className="flex flex-col gap-1.5">
      {menuItems.map((item) => {
        const isActive = activeMenu === item.name;
        return (
          <Link
            to={item.path}
            key={item.name}
            onClick={() => {
              setActiveMenu(item.name);
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 group text-sm font-semibold relative cursor-pointer"
            style={{ 
              backgroundColor: isActive ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
              color: isActive ? THEME_SHEETS.colors.brand.primary : currentTheme.textSecondary
            }}
          >
            {isActive && (
              <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-md" style={{ backgroundColor: THEME_SHEETS.colors.brand.primary }} />
            )}
            <span className="text-base group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  )
}

type DrawerControlsProps = {
  currentTheme: CurrentThemeProps,
	THEME_SHEETS: any
}

const DrawerControls = ({
  currentTheme,
	THEME_SHEETS
}: DrawerControlsProps) => {
  return (
     <div className="pt-6 border-t flex flex-col gap-4 cursor-pointer" style={{ borderColor: currentTheme.border }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
            alt="Avatar" 
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-bold text-sm" style={{ color: currentTheme.textPrimary }}>João Silva</h4>
            <p className="text-[11px]" style={{ color: currentTheme.textSecondary }}>Plano PRO • Ativo</p>
          </div>
        </div>

        {/* Botão Sair dentro do Drawer Mobile */}
        <button
          // onClick={handleLogout}
          className="p-2 rounded-xl text-xs font-bold transition-all hover:bg-red-500/10 flex items-center gap-1.5 cursor-pointer"
          style={{ color: THEME_SHEETS.colors.error }}
          title="Encerrar Sessão"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}

type TitleDrawerProps = {
  currentTheme: CurrentThemeProps,
	setIsSidebarOpen: (param: boolean) => void,
}

const TitleDrawer = ({
  currentTheme,
	setIsSidebarOpen,
}: TitleDrawerProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-extrabold text-sm uppercase tracking-widest text-slate-400">Navegação</span>
      <button 
        onClick={() => setIsSidebarOpen(false)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center justify-center w-8 h-8 cursor-pointer"
        style={{ backgroundColor: currentTheme.hover }}
      >
        ✕
      </button>
    </div>
  )
}

type SidebarDrawerMobileProps = {
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
	isSidebarOpen: boolean,
	setIsSidebarOpen: (param: boolean) => void,
	activeMenu: string,
	setActiveMenu: (param: string) => void,
  menuItems: MenuItemsType
}

function SidebarDrawerMobile({
	currentTheme,
	THEME_SHEETS,
	isSidebarOpen,
	setIsSidebarOpen,
	activeMenu,
	setActiveMenu,
  menuItems
}: SidebarDrawerMobileProps) {
	return (
		<div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Fundo escurecido translúcido (Backdrop / Overlay) */}
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute inset-0 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
          style={{ 
            backgroundColor: currentTheme.overlay,
            zIndex: 49
          }}
        />
        
        {/* Painel lateral esquerdo deslizante */}
        <aside 
          className="absolute top-0 bottom-0 left-0 w-72 flex flex-col justify-between p-6 shadow-2xl transition-transform duration-300 ease-in-out"
          style={{ 
            backgroundColor: currentTheme.card, 
            borderRight: `1px solid ${currentTheme.border}`,
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            zIndex: 50
          }}
        >
          
          <div className="flex flex-col gap-8">
            <TitleDrawer
              currentTheme={currentTheme}
              setIsSidebarOpen={setIsSidebarOpen}
            />

            <Nav
              currentTheme={currentTheme}
              THEME_SHEETS={THEME_SHEETS}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              menuItems={menuItems}
            />
          </div>

          {/* Seção do Usuário com Botão Sair - Exclusivo Drawer Mobile */}
          <DrawerControls
            currentTheme={currentTheme}
            THEME_SHEETS={THEME_SHEETS}
          />
        </aside>
      </div>
	)
}

export default SidebarDrawerMobile;