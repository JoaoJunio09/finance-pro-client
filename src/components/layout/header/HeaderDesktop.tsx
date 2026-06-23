import { Link } from "react-router-dom";
import type { CurrentThemeProps } from "../../../props/CurrentThemeProps";
import type { MenuItemsType } from "./Header";

type HeaderBrandProps = {
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
	setIsSidebarOpen: (param: boolean) => void
}

const HeaderBrand = ({
	currentTheme,
	THEME_SHEETS,
	setIsSidebarOpen
}: HeaderBrandProps) => {
	return (
		<div className="flex items-center gap-4 w-40">
			<button 
				onClick={() => setIsSidebarOpen(true)}
				className="lg:hidden p-2 px-3 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-lg cursor-pointer"
				style={{ backgroundColor: currentTheme.hover }}
			>
				☰
			</button>
			
			<div className="flex items-center gap-2 select-none">
				<div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm tracking-widest text-white" 
							style={{ backgroundColor: THEME_SHEETS.colors.brand.primary }}>
					F⚡
				</div>
				<span className="font-extrabold text-base tracking-tight" style={{ color: currentTheme.textPrimary }}>FinancePro</span>
			</div>
		</div>
	)
}

type NavProps = {
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
	activeMenu: string,
	setActiveMenu: (param: string) => void,
	menuItems: MenuItemsType
}

const Nav = ({
	currentTheme,
	THEME_SHEETS,
	activeMenu,
	setActiveMenu,
	menuItems
}: NavProps) => {
	return (
		<nav className="hidden lg:flex items-center gap-1">
			{menuItems.map((item) => {
				const isActive = activeMenu === item.name;
				return (
					<Link
						to={item.path}
						key={item.name}
						onClick={() => setActiveMenu(item.name)}
						className="px-4 py-2 rounded-lg text-xs font-bold tracking-tight transition-all duration-200 relative hover:opacity-85 cursor-pointer"
						style={{ 
							color: isActive ? THEME_SHEETS.colors.brand.primary : currentTheme.textSecondary,
							backgroundColor: isActive ? currentTheme.hover : 'transparent'
						}}
					>
						{item.name}
						{isActive && (
							<span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full" style={{ backgroundColor: THEME_SHEETS.colors.brand.primary }} />
						)}
					</Link>
				);
			})}
		</nav>
	)
}

type HeaderControlsProps = {
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any
}

const HeaderControls = ({
	currentTheme,
	THEME_SHEETS
}: HeaderControlsProps) => {
	return (
		<div className="flex items-center gap-3">
			{/* Botão Logout - Apenas Desktop */}
			<button
				className="hidden lg:flex ml-1 p-2 rounded-xl text-xs font-bold transition-all hover:opacity-85 items-center gap-1.5 border border-transparent hover:border-red-500/10 active:scale-95 cursor-pointer"
				style={{ backgroundColor: currentTheme.hover, color: THEME_SHEETS.colors.error }}
				title="Encerrar Sessão"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
				</svg>
				<span>Sair</span>
			</button>

			{/* Avatar do Usuário - Apenas Desktop */}
			<div className="hidden lg:flex items-center gap-2 border-l pl-3 cursor-pointer cursor-pointer" style={{ borderColor: currentTheme.border }}>
				<img 
					src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
					alt="Avatar do Usuário" 
					className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-400/20"
				/>
				<span className="hidden sm:inline text-xs font-bold" style={{ color: currentTheme.textSecondary }}>João S.</span>
			</div>
		</div>
	)
}

type HeaderDesktopProps = {
	currentTheme: CurrentThemeProps,
	THEME_SHEETS: any,
	setIsSidebarOpen: (param: boolean) => void,
	activeMenu: string,
	setActiveMenu: (param: string) => void,
	menuItems: MenuItemsType
}

function HeaderDesktop({
	currentTheme,
	THEME_SHEETS,
	setIsSidebarOpen,
	activeMenu,
	setActiveMenu,
	menuItems
}: HeaderDesktopProps) {
	return (
		<header
			className="sticky top-0 z-30 h-16 border-b flex items-center justify-between px-6 backdrop-blur-md transition-all duration-300 lg:px-23"
			style={{ backgroundColor: `${currentTheme.card}CC`, borderColor: currentTheme.border }}
		>
			
			{/* LADO ESQUERDO: Botão Hambúrguer (Mobile) & Logo (Desktop) */}
			<HeaderBrand
				currentTheme={currentTheme}
				THEME_SHEETS={THEME_SHEETS}
				setIsSidebarOpen={setIsSidebarOpen}
			/>

			{/* CENTRO: Menu de Navegação Horizontal (Apenas Desktop >= 1024px) */}
			<Nav
				currentTheme={currentTheme}
				THEME_SHEETS={THEME_SHEETS}
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
				menuItems={menuItems}
			/>

			{/* LADO DIREITO: Notificações, Tema, Avatar & Logout */}
			<HeaderControls
				currentTheme={currentTheme}
				THEME_SHEETS={THEME_SHEETS}
			/>
		</header>
	)
}

export default HeaderDesktop;