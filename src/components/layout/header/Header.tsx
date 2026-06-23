import { useState } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import HeaderDesktop from "./HeaderDesktop";
import SidebarDrawerMobile from "./SidebarDrawerMobile";

export type MenuItemsType = {
	name: string;
	icon: string;
	path: string;
}[];

const menuItems: MenuItemsType = [
	{ name: 'Painel de Controle', icon: '📊', path: '/dashboard' },
	{ name: 'Carteiras', icon: '💳', path: '/dashboard' },
	{ name: 'Lançamentos', icon: '📝', path: '/dashboard' },
	{ name: 'Recorrências', icon: '🔄', path: '/dashboard' },
	{ name: 'Metas', icon: '🎯', path: '/dashboard' },
	{ name: 'Configurações', icon: '⚙️', path: '/dashboard' },
];

function Header() {
	const [activeMenu, setActiveMenu] = useState('Painel de Controle');
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const { currentTheme, THEME_SHEETS } = useThemeContext();

	return (
		<>
			<HeaderDesktop
				currentTheme={currentTheme}
				THEME_SHEETS={THEME_SHEETS}
				setIsSidebarOpen={setIsSidebarOpen}
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
				menuItems={menuItems}
			/>

			<SidebarDrawerMobile
				currentTheme={currentTheme}
				THEME_SHEETS={THEME_SHEETS}
				activeMenu={activeMenu}
				setActiveMenu={setActiveMenu}
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
				menuItems={menuItems}
			/>
		</>
	)
}

export default Header;