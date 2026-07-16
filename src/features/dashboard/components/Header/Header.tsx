import { Bell, Search } from "lucide-react";

import styles from './Header.module.css';

function Header() {
	return (
		<header className="relative z-10 flex items-center justify-between mb-12">
			<div className="flex items-center gap-4 group cursor-pointer">
				<div className="relative">
					<div className={styles.avatar}>
						<img src="https://i.pravatar.cc/150?img=11" alt="Perfil" className="w-full h-full rounded-full object-cover" />
					</div>
					<div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ${styles.online}`} />
				</div>
				<div className="flex flex-col">
					<span className={`text-[11px] uppercase tracking-widest font-semibold ${styles.name}`}>Boa noite,</span>
					<h1 className="text-base font-display font-semibold text-main tracking-wide">João</h1>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button className={`w-10 h-10 rounded-full bg-glass border-glass flex items-center justify-center shadow-sm ${styles.search}`}>
					<Search className="w-4 h-4" />
				</button>
				<button className={`w-10 h-10 rounded-full bg-glass border-glass flex items-center justify-center shadow-sm relative ${styles.notification}`}>
					<Bell className="w-4 h-4" />
					<span className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${styles.hasNotification}`} />
				</button>
			</div>
		</header>
	)
}

export default Header;