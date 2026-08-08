import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';

import styles from './MobileNav.module.css';

export function MobileNav() {
  const [searchValue, setSearchValue] = useState('');
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="flex lg:hidden items-center justify-between w-full gap-3">
      <button className={`relative flex shrink-0 items-center justify-center w-9 h-9 rounded-xl text-white shadow-sm border overflow-hidden transition-opacity ${styles.avatarBtn}`} type="button" aria-label="Perfil">
        <User size={15} />
      </button>

      <div className="relative flex-1">
        <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.searchIcon}`} />
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-sm transition-all shadow-sm border ${styles.searchInput}`}
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
    </div>
  );
}

export default MobileNav;