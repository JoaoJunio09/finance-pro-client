import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Home, Plus, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { MainViewMobile } from "../../../../types/mainView";
import { OPEN_MORE_MENU_EVENT } from "./mobileNavigationEvents";
import MobileMoreMenu from "./MobileMoreMenu";
import styles from "./MobileBottomNav.module.css";
import {
  PRIMARY_DESTINATIONS,
  isFinancialLifePath,
} from "../../../../features/financialLife/navigation";

const MOBILE_DESTINATIONS = [
  { title: "Dashboard", path: "/dashboard", icon: Home },
  { ...PRIMARY_DESTINATIONS[0], title: "Vida Financeira" },
  PRIMARY_DESTINATIONS[1],
  PRIMARY_DESTINATIONS[2],
];

interface MobileBottomNavProps {
  isOpenQuickActions: boolean;
  onToggleQuickActions: () => void;
  mainView?: MainViewMobile;
}

export default function MobileBottomNav({
  isOpenQuickActions,
  onToggleQuickActions,
}: MobileBottomNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const open = () => setMoreOpen(true);
    window.addEventListener(OPEN_MORE_MENU_EVENT, open);
    return () => window.removeEventListener(OPEN_MORE_MENU_EVENT, open);
  }, []);

  return (
    <>
      <nav
        className={`lg:hidden fixed bottom-0 inset-x-0 z-[65] ${
          isOpenQuickActions ? styles.navTransparent : styles.navSolid
        }`}
        aria-label="Navegação principal"
      >
        <div className={`${styles.destinations} pb-safe`}>
          {MOBILE_DESTINATIONS.map(({ title, path, icon: Icon }, index) => {
            const active =
              path === "/vida-financeira"
                ? isFinancialLifePath(pathname)
                : pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`${styles.destination} ${
                  active ? styles.tabActive : styles.tabDefault
                }`}
                style={{ gridColumn: index < 2 ? index + 1 : index + 2 }}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={21} aria-hidden="true" />
                <span>{title}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={onToggleQuickActions}
            className={`${styles.quickButton} ${
              isOpenQuickActions ? styles.centerBtnOpen : styles.centerBtnClosed
            }`}
            aria-label={
              isOpenQuickActions
                ? "Fechar ações rápidas"
                : "Mais: abrir ações rápidas"
            }
            aria-expanded={isOpenQuickActions}
          >
            {isOpenQuickActions ? (
              <X size={25} aria-hidden="true" />
            ) : (
              <Plus size={25} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {moreOpen && <MobileMoreMenu onClose={() => setMoreOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
