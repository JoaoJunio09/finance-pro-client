import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import styles from "./FinanceSummary.module.css";

export interface FinanceSummaryMetric {
  label: string;
  value: string;
  icon?: LucideIcon;
  caption?: string;
  tone?: "default" | "income" | "expense" | "warning";
}

export default function FinanceSummary({
  label,
  primary,
  items,
}: {
  label: string;
  primary: FinanceSummaryMetric;
  items: FinanceSummaryMetric[];
}) {
  return (
    <section className={styles.summary} aria-label={label}>
      <div className={styles.total}>
        <span>{primary.label}</span>
        <strong className={styles[primary.tone ?? "default"]}>
          {primary.value}
        </strong>
        {primary.caption && <small>{primary.caption}</small>}
      </div>
      <div
        className={styles.breakdown}
        style={{ "--summary-columns": items.length } as CSSProperties}
      >
        {items.map(
          ({
            label: metricLabel,
            value,
            icon: Icon,
            caption,
            tone = "default",
          }) => (
            <div className={styles.summaryItem} key={metricLabel}>
              {Icon && <Icon size={16} aria-hidden="true" />}
              <div>
                <span>{metricLabel}</span>
                <strong className={styles[tone]}>{value}</strong>
                {caption && <small>{caption}</small>}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
