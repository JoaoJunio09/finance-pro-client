import { useEffect, useRef, useState } from "react";
import {
  BellRing,
  ChevronRight,
  CircleUserRound,
  LayoutGrid,
  LogOut,
  Settings2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { OPEN_MORE_MENU_EVENT } from "../../Navigation/Mobile/mobileNavigationEvents";

import styles from "./MobileNav.module.css";

export function MobileNav() {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !accountMenuRef.current?.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAccountMenuOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isAccountMenuOpen]);

  const handleLogout = () => {
    setIsAccountMenuOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex lg:hidden items-center justify-between w-full">
      <div className={styles.accountArea} ref={accountMenuRef}>
        <button
          className={`${styles.accountButton} ${
            isAccountMenuOpen ? styles.accountButtonActive : ""
          }`}
          onClick={() => setIsAccountMenuOpen((open) => !open)}
          type="button"
          aria-label="Abrir opções da conta"
          aria-haspopup="menu"
          aria-expanded={isAccountMenuOpen}
        >
          <CircleUserRound size={21} strokeWidth={1.9} />
        </button>

        {isAccountMenuOpen && (
          <div
            className={styles.accountMenu}
            role="menu"
            aria-label="Opções da conta"
          >
            <p className={styles.menuHeading}>Conta</p>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsAccountMenuOpen(false);
                window.dispatchEvent(new Event(OPEN_MORE_MENU_EVENT));
              }}
              className={styles.menuItem}
            >
              <span className={styles.menuIcon}>
                <LayoutGrid size={17} />
              </span>
              <span>Mais opções</span>
              <ChevronRight className={styles.menuArrow} size={15} />
            </button>
            <Link
              to="/configuracoes"
              role="menuitem"
              onClick={() => setIsAccountMenuOpen(false)}
              className={styles.menuItem}
            >
              <span className={styles.menuIcon}>
                <Settings2 size={17} />
              </span>
              <span>Configurações</span>
              <ChevronRight className={styles.menuArrow} size={15} />
            </Link>
            <button
              onClick={handleLogout}
              role="menuitem"
              className={`${styles.menuItem} ${styles.logoutItem}`}
              type="button"
            >
              <span className={styles.menuIcon}>
                <LogOut size={17} />
              </span>
              <span>Sair da conta</span>
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => setHasNotifications(false)}
        className={styles.notificationButton}
        type="button"
        aria-label="Notificações"
      >
        <BellRing size={20} strokeWidth={1.9} />
        {hasNotifications && (
          <span className={styles.notificationDot} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default MobileNav;
