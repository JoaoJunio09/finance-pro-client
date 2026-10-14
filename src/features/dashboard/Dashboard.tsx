import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useState } from "react";
import type { FinancialSummaryResponse } from "../../models/account/FinancialSummaryResponse";
import styles from "./Dashboard.module.css";
import CoreMetrics from "./components/CoreMetrics/CoreMetrics";
import DashboardActions from "./components/DashboardActions/DashboardActions";
import DashboardActivity from "./components/DashboardActivity/DashboardActivity";
import Greeting from "./components/Greeting/Greeting";
import useDashboard from "./hooks/useDashboard";

function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const {
    dashboard,
    name,
    isLoading,
    isError,
    refetch,
    activity,
    activityLoading,
    activityError,
    refetchActivity,
  } = useDashboard();

  return (
    <main className={styles.dashboard}>
      <Greeting
        userName={name ?? ""}
        showBalance={showBalance}
        onToggleBalance={() => setShowBalance((visible) => !visible)}
      />

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error refetch={refetch} />
      ) : (
        <CoreMetrics
          totalBalance={dashboard?.currentBalance ?? 0}
          income={dashboard?.income ?? 0}
          expense={dashboard?.expenses ?? 0}
          availableToSpend={dashboard?.availableToSpend ?? 0}
          showBalance={showBalance}
        />
      )}

      <div className={styles.activity}>
        <DashboardActivity
          activity={activity}
          isLoading={activityLoading}
          isError={activityError}
          showBalance={showBalance}
          onRetry={() => void refetchActivity()}
        />
      </div>
      <div className={styles.actions}>
        <DashboardActions />
      </div>
    </main>
  );
}

export default Dashboard;

const Loading = () => {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label="Carregando resumo financeiro"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

const Error = ({ refetch }: { refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<NoInfer<FinancialSummaryResponse>, Error>> }) => {
  return (
     <div
      className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5"
      role="alert"
    >
      <p>Não foi possível atualizar o resumo.</p>
      <button
        type="button"
        className="mt-3 font-semibold text-[var(--accent)]"
        onClick={() => void refetch()}
      >
        Tentar novamente
      </button>
    </div>
  )
}