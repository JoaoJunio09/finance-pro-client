import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import BalanceCard from './BalanceCard/BalanceCard';
import MetricCard from './MetricCard/MetricCard';

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
    <section className="flex flex-col gap-4 sm:gap-6">
      <BalanceCard totalBalance={totalBalance} showBalance={showBalance} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard title="Receitas no período" amount={income} icon={ArrowUpRight} variant="income" showBalance={showBalance} />
        <MetricCard title="Despesas no período" amount={expense} icon={ArrowDownRight} variant="expense" showBalance={showBalance} />
        <MetricCard title="Disponível para Gastar" amount={availableToSpend} icon={CheckCircle2} variant="accent" showBalance={showBalance} />
      </div>
    </section>
  );
}

export default CoreMetrics;