import { useState } from "react";
import { BudgetOverview } from "./components/BudgetOverview/BudgetOverview";
import CoreMetrics from "./components/CoreMetrics/CoreMetrics";
import Greeting from "./components/Greeting/Greeting";
import RecentTransactions from "./components/RecentTransactions/RecentTransactions";
import TopCategories from "./components/TopCategories/TopCategories";
import Wallets from "./components/Wallets/Wallets";
import { WatchList } from "./components/WatchList/WatchList";
import useDashboard from "./hooks/useDashboard";

function Dashboard() {
  const [showBalance, setShowBalance] = useState(true);
  const { dashboard, name } = useDashboard();

  return (
    <div className="flex flex-col gap-6 sm:gap-8 animate-fade-in-up">
      <Greeting
        userName={name ?? ''}
        showBalance={showBalance}
        onToggleBalance={() => setShowBalance(!showBalance)}
      />

      <CoreMetrics
        totalBalance={dashboard?.currentBalance ?? 0}
        income={dashboard?.income ?? 0}
        expense={dashboard?.expenses ?? 0}
        availableToSpend={dashboard?.availableToSpend ?? 0}
        showBalance={showBalance}
      />

      <Wallets
        wallets={dashboard?.wallets ?? []}
        showBalance={showBalance}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetOverview
          income={dashboard?.income ?? 0}
          expense={dashboard?.expenses ?? 0}
          showBalance={showBalance}
          onAnalyzeFlow={() => {}}
        />

        <TopCategories
          categories={dashboard?.expensesByCategory ?? []}
          showBalance={showBalance}
          onViewAll={() => {}}
          onCategoryClick={(categoryId) => {}}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTransactions
          transactions={dashboard?.transactions ?? []}
          showBalance={showBalance}
          onViewAll={() => {}}
          onTransactionClick={(transactionId) => {}}
        />

        <WatchList
          showBalance={showBalance}
          onItemClick={(itemId) => {}}
        />
      </section>
    </div>
  );
};

export default Dashboard;