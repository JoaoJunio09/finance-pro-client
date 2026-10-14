import {
  Banknote,
  CreditCard,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WalletFilter } from "../../types/wallet";
import FinancePageHeader from "../../../../components/shared/FinancePage/FinancePageHeader";
import FinancePageAction from "../../../../components/shared/FinancePage/FinancePageAction";
import FinancePageTabs from "../../../../components/shared/FinancePage/FinancePageTabs";
import FinancialLifeBackButton from "../../../../components/shared/FinancePage/FinancialLifeBackButton";

interface WalletsHeaderProps {
  currentFilter: WalletFilter;
  setFilter: (filter: WalletFilter) => void;
  onAddWallet: () => void;
}

const filters: { id: WalletFilter; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "Todas", icon: Wallet },
  { id: "accounts", label: "Contas e poupança", icon: Landmark },
  { id: "credit_cards", label: "Cartões de crédito", icon: CreditCard },
  { id: "reserves", label: "Reservas", icon: ShieldCheck },
  { id: "investments", label: "Investimentos", icon: TrendingUp },
  { id: "physical", label: "Dinheiro físico", icon: Banknote },
];

function WalletsHeader({
  currentFilter,
  setFilter,
  onAddWallet,
}: WalletsHeaderProps) {
  return (
    <FinancePageHeader
      title="Carteiras"
      description="Contas, cartões e reservas em um só lugar."
      back={<FinancialLifeBackButton />}
      action={
        <FinancePageAction label="Adicionar carteira" onClick={onAddWallet} />
      }
    >
      <FinancePageTabs
        options={filters}
        value={currentFilter}
        onChange={setFilter}
        label="Filtrar carteiras"
      />
    </FinancePageHeader>
  );
}

export default WalletsHeader;
