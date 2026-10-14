import { BellRing } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  PRIMARY_DESTINATIONS,
  isFinancialLifePath,
} from "../../../../features/financialLife/navigation";
import styles from "./DesktopNav.module.css";

export default function DesktopNav() {
  const { pathname } = useLocation();
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className={`${styles.desktopRow} hidden lg:grid`}>
      <Link
        to="/dashboard"
        className={styles.brandLink}
        aria-label="Capto, início"
      >
        <span className={styles.brandMark} aria-hidden="true">
          c
        </span>
        <span className={styles.brandName}>
          capto<span>.</span>
        </span>
      </Link>
      <nav className={styles.navigation} aria-label="Navegação principal">
        {PRIMARY_DESTINATIONS.map(
          ({ title, path, icon: Icon, comingSoon, tone }) => {
            const active =
              path === "/vida-financeira"
                ? isFinancialLifePath(pathname)
                : pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                className={`${styles.navLink} ${
                  active ? styles.navLinkActive : ""
                }`}
                aria-current={active ? "page" : undefined}
                data-tone={tone}
              >
                <span className={styles.navIcon}>
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className={styles.navCopy}>
                  <span>{title}</span>
                  {comingSoon && (
                    <small className={styles.comingSoon}>Em breve</small>
                  )}
                </span>
              </Link>
            );
          }
        )}
      </nav>
      <div className={styles.utilities}>
        <Link
          to="/opcoes"
          className={styles.moreLink}
          aria-current={pathname === "/opcoes" ? "page" : undefined}
        >
          Mais opções
        </Link>
        <button
          className={styles.notificationButton}
          type="button"
          onClick={() => setHasNotifications(false)}
          aria-label="Notificações"
        >
          <BellRing size={19} aria-hidden="true" />
          {hasNotifications && (
            <span className={styles.notificationDot} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
