import type { AnalyticsResponse } from "../../../../models/account/AnalyticsResponse";
import { formatCurrencyLabel } from "../../../../utils/FormatCurrency";
import styles from "./AnalysisSummary.module.css";

export default function AnalysisSummary({
  analytics,
  isLoading,
}: {
  analytics?: AnalyticsResponse;
  isLoading: boolean;
}) {
  const metrics = [
    { label: "Receitas do mês", value: analytics?.income, tone: "income" },
    { label: "Despesas do mês", value: analytics?.expense, tone: "expense" },
    {
      label: "Disponível para gastar",
      value: analytics?.availableToSpend,
      tone: "available",
    },
  ];

  return (
    <dl
      className={styles.summary}
      aria-label="Resumo para análise"
      aria-busy={isLoading}
    >
      {metrics.map(({ label, value, tone }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd className={styles[tone]}>
            {isLoading ? (
              <span className={styles.skeleton} aria-label="Carregando valor" />
            ) : value === undefined ? (
              "—"
            ) : (
              formatCurrencyLabel(value)
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
