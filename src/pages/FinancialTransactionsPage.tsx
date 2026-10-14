import { Navigate, useParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell/AppShell";
import FinancePageHeader from "../components/shared/FinancePage/FinancePageHeader";
import FinancialLifeBackButton from "../components/shared/FinancePage/FinancialLifeBackButton";
import Transactions from "../features/transactions/Transactions";
import Activities from "../features/activities/Activities";
import CashflowSubpage from "../features/analytics/components/SubPages/CashflowSubpage/CashflowSubpage";
import useAnalytics from "../features/analytics/hooks/useAnalytics";
import styles from "../components/shared/FinancePage/FinancePage.module.css";
import TransactionViewNavigation from "../features/transactions/components/TransactionViewNavigation/TransactionViewNavigation";
import { TRANSACTION_VIEWS } from "../features/transactions/transactionViews";

function TransactionViews() {
  const { mode = "lista" } = useParams();
  const { analytics, isLoading, isError, refetch } = useAnalytics(
    mode === "grafico"
  );
  if (!TRANSACTION_VIEWS.some((item) => item.id === mode))
    return <Navigate to="/vida-financeira/transacoes" replace />;

  const viewNavigation = <TransactionViewNavigation selected={mode} />;
  if (mode === "lista") return <Transactions viewNavigation={viewNavigation} />;

  return (
    <div className={styles.page}>
      <FinancePageHeader
        title="Transações"
        description="Escolha como acompanhar suas receitas e despesas."
        back={<FinancialLifeBackButton />}
      >
        {viewNavigation}
      </FinancePageHeader>
      <main className={styles.content}>
        {mode === "grafico" &&
          (isLoading ? (
            <p role="status">Carregando gráfico…</p>
          ) : isError ? (
            <button type="button" onClick={() => void refetch()}>
              Tentar carregar novamente
            </button>
          ) : (
            <CashflowSubpage analytics={analytics} />
          ))}
        {mode === "calendario" && <Activities embedded />}
      </main>
    </div>
  );
}

export default function FinancialTransactionsPage() {
  return (
    <AppShell>
      <TransactionViews />
    </AppShell>
  );
}
