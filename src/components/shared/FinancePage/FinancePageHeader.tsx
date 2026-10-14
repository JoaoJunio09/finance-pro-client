import type { ReactNode } from "react";
import styles from "./FinancePage.module.css";

interface FinancePageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
  controls?: ReactNode;
  back?: ReactNode;
  children?: ReactNode;
}

export default function FinancePageHeader({
  title,
  description,
  action,
  controls,
  back,
  children,
}: FinancePageHeaderProps) {
  return (
    <header className={styles.headerContainer}>
      {back && <div className={styles.back}>{back}</div>}
      <div className={styles.headerInner} data-navigation={Boolean(children)}>
        <div className={styles.titleRow}>
          <div className={styles.titleCopy}>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {action}
        </div>
        {controls && <div className={styles.controls}>{controls}</div>}
        {children && <div className={styles.headerNavigation}>{children}</div>}
      </div>
    </header>
  );
}
