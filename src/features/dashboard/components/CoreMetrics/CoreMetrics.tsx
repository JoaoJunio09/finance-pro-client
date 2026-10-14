import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import BalanceCard from "./BalanceCard/BalanceCard";
import MetricCard from "./MetricCard/MetricCard";
import styles from "./CoreMetrics.module.css";

interface CoreMetricsProps {
  totalBalance: number;
  income: number;
  expense: number;
  availableToSpend: number;
  showBalance: boolean;
}

export function CoreMetrics({
  totalBalance,
  income,
  expense,
  availableToSpend,
  showBalance,
}: CoreMetricsProps) {
  return (
    <section className={styles.overview} aria-label="Resumo financeiro">
      <div className={styles.balance}>
        <BalanceCard totalBalance={totalBalance} showBalance={showBalance} />
      </div>

      <div className={styles.metrics}>
        <MetricCard
          title="Entrou"
          amount={income}
          icon={ArrowUpRight}
          variant="income"
          showBalance={showBalance}
        />
        <MetricCard
          title="Saiu"
          amount={expense}
          icon={ArrowDownRight}
          variant="expense"
          showBalance={showBalance}
        />
        <MetricCard
          title="Disponível para gastar"
          amount={availableToSpend}
          icon={CheckCircle2}
          variant="accent"
          showBalance={showBalance}
        />
      </div>
    </section>
  );
}

export default CoreMetrics;
