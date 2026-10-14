import { Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import type { WalletResponse } from "../../../../models/wallet/WalletResponse";
import FinanceSummary from "../../../../components/shared/FinanceSummary/FinanceSummary";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export function FinancialSummary({ wallets }: { wallets: WalletResponse[] }) {
  const total = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const accounts = wallets
    .filter((wallet) => wallet.type === "CHECKING" || wallet.type === "SAVING")
    .reduce((sum, wallet) => sum + wallet.balance, 0);
  const investments = wallets
    .filter((wallet) => wallet.type === "INVESTMENTS")
    .reduce((sum, wallet) => sum + wallet.balance, 0);
  const reserves = wallets
    .filter((wallet) => wallet.type === "RESERVE")
    .reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <FinanceSummary
      label="Resumo das carteiras"
      primary={{ label: "Saldo total", value: formatCurrency(total) }}
      items={[
        { label: "Contas", value: formatCurrency(accounts), icon: Landmark },
        {
          label: "Investimentos",
          value: formatCurrency(investments),
          icon: TrendingUp,
        },
        {
          label: "Reservas",
          value: formatCurrency(reserves),
          icon: ShieldCheck,
        },
      ]}
    />
  );
}
