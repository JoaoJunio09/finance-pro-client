import useDialogFocus from "../../../../hooks/useDialogFocus";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { BackButton } from "../../../ui/BackButton/BackButton";
import { MORE_OPTION_GROUPS } from "../moreOptions";
import styles from "./MobileMoreMenu.module.css";

const PRIMARY_CARDS = [
  {
    label: "Carteiras",
    detail: "Contas e saldos",
    path: "/carteiras",
    icon: Wallet,
  },
  {
    label: "Transações",
    detail: "Entradas e saídas",
    path: "/vida-financeira/transacoes",
    icon: CreditCard,
  },
  {
    label: "Recorrências",
    detail: "Gestão de fixas",
    path: "/vida-financeira/recorrencias",
    icon: RefreshCw,
  },
  {
    label: "Atividades",
    detail: "Histórico geral",
    path: "/vida-financeira/transacoes/calendario",
    icon: Activity,
  },
];

export default function MobileMoreMenu({ onClose }: { onClose: () => void }) {
  const { fullName, username } = useAuthContext();
  const reducedMotion = useReducedMotion();
  const dialogRef = useDialogFocus(true, onClose);
  const { pathname } = useLocation();

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-more-title"
      className={`fixed inset-0 z-[9999] flex flex-col lg:hidden ${styles.drawer}`}
      initial={{
        x: reducedMotion ? 0 : "100%",
        opacity: reducedMotion ? 0 : 1,
      }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }}
      transition={{
        duration: reducedMotion ? 0.12 : 0.28,
        ease: [0.22, 0.8, 0.25, 1],
      }}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 pt-safe ${styles.header}`}
      >
        <BackButton label="Fechar opções" onClick={onClose} />
        <h2 id="mobile-more-title" className={styles.headerTitle}>
          Mais opções
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-safe">
        <div className={`mb-7 flex items-center gap-4 ${styles.profileCard}`}>
          <span className={styles.profileAvatar}>
            <CircleUserRound size={27} aria-hidden="true" />
          </span>
          <div>
            <strong className={styles.profileName}>
              {fullName || username || "Sua conta"}
            </strong>
            <span className={styles.profileCaption}>
              Atalhos e preferências
            </span>
          </div>
        </div>
        <section className={styles.menuSection}>
          <h3 className={styles.sectionHeading}>Financeiro</h3>
          <div className={styles.primaryGrid}>
            {PRIMARY_CARDS.map(({ label, detail, path, icon: Icon }) => {
              const active = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`${styles.primaryCard} ${
                    active ? styles.primaryCardActive : ""
                  }`}
                >
                  <span
                    className={`${styles.primaryIcon} ${
                      active ? styles.primaryIconActive : ""
                    }`}
                  >
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <span className={styles.primaryText}>
                    <span>{label}</span>
                    <span>{detail}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
        {[
          { title: "Análises", items: MORE_OPTION_GROUPS[1].items.slice(0, 2) },
          { title: "Conta", items: MORE_OPTION_GROUPS[2].items },
        ].map((group) => (
          <section className={`${styles.menuSection} mt-7`} key={group.title}>
            <h3 className={styles.sectionHeading}>{group.title}</h3>
            <div className={styles.linkGroup}>
              {group.items.map(({ label, path, icon: Icon }, index) => (
                <Link
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={`${styles.linkRow} ${
                    index < group.items.length - 1 ? styles.linkRowBorder : ""
                  }`}
                >
                  <span className={styles.linkContent}>
                    <span className={styles.linkIcon}>
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className={styles.linkLabel}>{label}</span>
                  </span>
                  <ChevronRight
                    size={17}
                    className={styles.linkArrow}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>,
    document.body
  );
}
