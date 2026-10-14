import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./FinancePage.module.css";

interface FinancePageTab<T extends string> {
  id: T;
  label: string;
  icon?: LucideIcon;
}

interface FinancePageTabsProps<T extends string> {
  options: FinancePageTab<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export default function FinancePageTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: FinancePageTabsProps<T>) {
  const indicatorId = useId();
  const reducedMotion = useReducedMotion();
  return (
    <nav className={styles.tabsScroll} aria-label={label}>
      <div className={styles.tabs}>
        {options.map(({ id, label: optionLabel, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`${styles.filterTab} ${
              value === id ? styles.filterTabActive : ""
            }`}
            aria-pressed={value === id}
            onClick={() => onChange(id)}
          >
            {value === id && (
              <motion.span
                layoutId={indicatorId}
                className={styles.activeTabIndicator}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
                aria-hidden="true"
              />
            )}
            {Icon && <Icon size={16} aria-hidden="true" />}
            <span>{optionLabel}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
