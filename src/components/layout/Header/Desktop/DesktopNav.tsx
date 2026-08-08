import { Bell, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';

import styles from './DesktopNav.module.css';

interface DesktopNavProps {
  setIsOpenSidebar: () => void;
}

export function DesktopNav({
  setIsOpenSidebar
}: DesktopNavProps) {
  const [searchValue, setSearchValue] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="hidden lg:flex items-center justify-between w-full">
      <button
        onClick={() => setIsOpenSidebar()}
        className={`p-2 -ml-2 rounded-lg transition-colors focus:outline-none focus:ring-2 ${styles.menuBtn}`}
        aria-label="Abrir menu"
        type="button"
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.searchIcon}`} />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={`w-56 lg:w-72 rounded-xl pl-9 pr-4 py-1.5 text-sm transition-all shadow-sm border ${styles.searchInput}`}
          />
        </div>

        <button
          onClick={() => setHasNotifications(false)}
          className={`relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl border transition-all shadow-sm ${styles.iconBtn}`}
          type="button"
          aria-label="Notificações"
        >
          <Bell size={15} className={styles.iconMuted} />
          {hasNotifications && <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ring-2 ${styles.notificationDot}`}></span>}
        </button>

        <button className={`relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl text-white shadow-sm border overflow-hidden transition-opacity ${styles.avatarBtn}`} type="button" aria-label="Perfil">
          <User size={15} />
        </button>
      </div>
    </div>
  );
}

export default DesktopNav;