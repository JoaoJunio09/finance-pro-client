import DesktopNav from './Desktop/DesktopNav';
import MobileNav from './Mobile/MobileNav';

import styles from './Header.module.css';

interface HeaderProps {
  handleOpenSidebar: () => void;
}

export function Header(_props: HeaderProps) {
  return (
    <header className={`sticky top-0 z-40 py-2 sm:py-3 lg:py-0 flex items-center justify-center shadow-sm min-h-[60px] transition-all border-b ${styles.header}`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}

export default Header;
