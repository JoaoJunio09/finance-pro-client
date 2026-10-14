import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import FinanceSummary from "../../../../components/shared/FinanceSummary/FinanceSummary";
import { formatCurrency } from "../../utils/recurrenceUtils";

interface SummaryCardsProps {
  count: number;
  income: number;
  expense: number;
}

export function SummaryCards({ count, income, expense }: SummaryCardsProps) {
  return (
    <FinanceSummary
      label="Resumo das recorrências"
      primary={{ label: "Recorrências Ativas", value: `${count} contratos` }}
      items={[
        {
          label: "Entradas Estimadas / Mês",
          value: formatCurrency(income),
          icon: ArrowUpRight,
          tone: "income",
        },
        {
          label: "Saídas Estimadas / Mês",
          value: formatCurrency(expense),
          icon: ArrowDownRight,
          tone: "expense",
        },
      ]}
    />
  );
}
