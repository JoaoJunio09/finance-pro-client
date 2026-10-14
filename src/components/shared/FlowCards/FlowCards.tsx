import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { FlowOption } from "./types";
import styles from "./FlowCards.module.css";

export default function FlowCards({
  options,
}: {
  options: readonly FlowOption[];
}) {
  return (
    <div className={styles.grid} data-count={options.length}>
      {options.map(
        ({ title, description, path, icon: Icon, tone, comingSoon }, index) => (
          <Link
            key={path}
            to={path}
            className={`${styles.card} ${styles[tone]}`}
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <div className={styles.top}>
              <span className={styles.icon}>
                <Icon size={24} aria-hidden="true" />
              </span>
              {comingSoon ? (
                <span className={styles.soon}>Em breve</span>
              ) : (
                <ArrowUpRight
                  className={styles.arrow}
                  size={20}
                  aria-hidden="true"
                />
              )}
            </div>
            <strong>{title}</strong>
            <p>{description}</p>
          </Link>
        )
      )}
    </div>
  );
}
