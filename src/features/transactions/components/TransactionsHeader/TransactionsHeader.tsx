import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  List,
} from "lucide-react";
import type { ReactNode } from "react";
import FinancePageHeader from "../../../../components/shared/FinancePage/FinancePageHeader";
import FinancePageAction from "../../../../components/shared/FinancePage/FinancePageAction";
import FinancePageTabs from "../../../../components/shared/FinancePage/FinancePageTabs";
import FinancialLifeBackButton from "../../../../components/shared/FinancePage/FinancialLifeBackButton";
import type { ActiveTab } from "../../types/transaction";
import styles from "./TransactionsHeader.module.css";

interface TransactionsHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  onOpenAddModal: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewNavigation?: ReactNode;
}

const filters = [
  { id: "all" as const, label: "Todas", icon: List },
  { id: "income" as const, label: "Receitas", icon: ArrowDownLeft },
  { id: "expense" as const, label: "Despesas", icon: ArrowUpRight },
  { id: "pending" as const, label: "Pendentes", icon: Clock },
];

export function TransactionsHeader({
  currentMonth,
  setCurrentMonth,
  onOpenAddModal,
  activeTab,
  setActiveTab,
  viewNavigation,
}: TransactionsHeaderProps) {
  const changeMonth = (offset: number) =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1)
    );
  return (
    <FinancePageHeader
      title="Transações"
      description="Escolha como acompanhar suas receitas e despesas."
      back={<FinancialLifeBackButton />}
      action={
        <FinancePageAction
          label="Adicionar registro"
          onClick={onOpenAddModal}
        />
      }
      controls={
        <div className={styles.period} aria-label="Período das transações">
          <span className={styles.month}>
            {currentMonth.toLocaleDateString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Mês anterior"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Próximo mês"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      }
    >
      <div className={styles.navigation}>
        {viewNavigation}
        <FinancePageTabs
          options={filters}
          value={activeTab}
          onChange={setActiveTab}
          label="Filtrar movimentações"
        />
      </div>
    </FinancePageHeader>
  );
}