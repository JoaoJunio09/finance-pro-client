import { ActivityIcon, Home, LayoutGrid, PieChart, RotateCw, Settings, Wallet } from "lucide-react";

import styles from './DesktopNav.module.css';
import { Link } from "react-router-dom";

interface DesktopNavProps {
	activeTab: number;
	setActiveTab: (id: number) => void;
	isDesktopMenuOpen: boolean;
	setIsDesktopMenuOpen: (val: boolean) => void;
}

const RADIAL_ITEMS = [
	{ id: 0, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard', active: 'dashboard' },
	{ id: 1, name: 'Atividades', icon: ActivityIcon, path: '/activities', active: 'activities' },
	{ id: 2, name: 'Análises', icon: PieChart, path: '/analytics', active: 'analytics' },
	{ id: 3, name: 'Carteiras', icon: Wallet, path: '/wallets', active: 'wallets' },
	{ id: 4, name: 'Recorrências', icon: RotateCw, path: '/recurrences', active: 'recurrences' },
	{ id: 5, name: 'Configurações', icon: Settings, path: '/settings', active: 'settings' },
];

// Arco único de 90° a 180°: de "reto para cima" até "reto para a esquerda".
// Todos os itens no mesmo raio = órbita real (não zigue-zague de anéis).
const START_ANGLE = 90;
const END_ANGLE = 180;
const ANGLE_STEP = (END_ANGLE - START_ANGLE) / (RADIAL_ITEMS.length - 1);
const ORBIT_RADIUS = { x: 300, y: 260 };

function DesktopNav({ activeTab, setActiveTab, isDesktopMenuOpen, setIsDesktopMenuOpen }: DesktopNavProps) {
	return (
		<div className="hidden lg:flex fixed bottom-10 right-10 z-[100] items-center justify-center w-16 h-16">
			<div className="absolute inset-0 pointer-events-none">
				{RADIAL_ITEMS.map((item, index) => {
					const angleDeg = START_ANGLE + ANGLE_STEP * index;
					const angleRad = (angleDeg * Math.PI) / 180;
					const x = Math.cos(angleRad) * ORBIT_RADIUS.x;
					const y = -Math.sin(angleRad) * ORBIT_RADIUS.y;
					const isActive = activeTab === item.id;

					return (
						<Link
							key={item.id}
							to={item.path}
							onClick={() => {
								setActiveTab(item.id);
								setIsDesktopMenuOpen(false);
							}}
							className={`cursor-pointer group absolute top-1/2 left-1/2 w-13 h-13 flex items-center justify-center rounded-full backdrop-blur-xl border shadow-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
								isActive ? styles.radialItemActive : `bg-glass ${styles.radialItemInactive}`
							} ${isDesktopMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
							style={{
								transform: `translate(calc(-50% + ${isDesktopMenuOpen ? x : 0}px), calc(-50% + ${isDesktopMenuOpen ? y : 0}px))`,
								transitionDelay: `${isDesktopMenuOpen ? index * 40 : (RADIAL_ITEMS.length - 1 - index) * 30}ms`,
							}}
						>
							{isActive && <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${styles.activeDot}`} />}
							<item.icon className={`w-5 h-5 transition-colors ${isActive ? styles.radialIconActive : styles.radialIconInactive}`} />

							<span className={`absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${styles.tooltip}`}>
								{item.name}
							</span>
						</Link>
					);
				})}
			</div>

			<button
				onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)}
				className={`cursor-pointer relative w-16 h-16 rounded-full bg-glass flex items-center justify-center z-10 transition-transform active:scale-95 ${styles.orbButton} ${styles.orbGlow}`}
			>
				<div className={`absolute inset-0 rounded-full blur-sm pointer-events-none ${styles.orbShine}`} />
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-main drop-shadow-md">
					<rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
					<path d="M8 12h4M8 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
					<circle cx="15" cy="15" r="2.5" className={styles.orbDot} />
				</svg>
			</button>
		</div>
	);
}

export default DesktopNav;