import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react";
import FinanceSummary from "../../../../components/shared/FinanceSummary/FinanceSummary";
import { formatCurrency } from "../../utils/transactionUtils";
import type { SummaryCard } from "../../types/SummaryCard";

export function SummaryCards({ summary }: { summary: SummaryCard }) {
  return (
    <FinanceSummary
      label="Resumo das transações"
      primary={{
        label: "Saldo Líquido",
        value: formatCurrency(summary.netIncome),
        caption: "Balanço mensal atual",
        tone: summary.netIncome >= 0 ? "default" : "expense",
      }}
      items={[
        {
          label: "Total de Receitas",
          value: formatCurrency(summary.income),
          icon: ArrowUpRight,
          caption: "Entradas confirmadas no mês",
          tone: "income",
        },
        {
          label: "Total de Despesas",
          value: formatCurrency(summary.expense),
          icon: ArrowDownRight,
          caption: "Saídas acumuladas no mês",
          tone: "expense",
        },
        {
          label: "Pendências",
          value: formatCurrency(summary.pendingTotal),
          icon: Clock,
          caption: `${summary.pendingCount} ${
            summary.pendingCount === 1
              ? "transação pendente"
              : "transações pendentes"
          }`,
          tone: "warning",
        },
      ]}
    />
  );
}
