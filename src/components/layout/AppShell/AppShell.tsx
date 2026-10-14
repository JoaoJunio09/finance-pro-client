import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import MobileBottomNav from "../Navigation/Mobile/MobileBottomNav";
import QuickActions from "../QuickActions/QuickActions";
import { useAuthContext } from "../../../context/AuthContext";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import type { TransactionType } from "../../../types/TransactionType";
import Breadcrumbs from "../../shared/Breadcrumbs/Breadcrumbs";

const TransactionModal = lazy(
  () => import("../../../features/transactionModal/TransactionModal")
);

export default function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isChoiceScreen = pathname === "/vida-financeira";
  
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("CREDIT");

  const { username, isAuthenticated } = useAuthContext();
  const { account, setAccountByUser } = useAccountContext();

  const accountService = useAccountService();

  const accountQuery = useQuery({
    queryKey: ["account", username],
    queryFn: () => accountService.getByUsername(username ?? ""),
    enabled: Boolean(username) && !account,
  });

  useEffect(() => {
    if (accountQuery.data && !account) setAccountByUser(accountQuery.data);
  }, [accountQuery.data, account, setAccountByUser]);

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)]">
      {!isChoiceScreen && <Header handleOpenSidebar={() => undefined} />}
      {!isChoiceScreen && account && <Breadcrumbs />}
      <div className="min-w-0 pb-24 lg:pb-10">
        {account ? (
          children
        ) : (
          <div
            className="mx-auto max-w-xl px-5 py-20 text-center"
            role={accountQuery.isError ? "alert" : "status"}
          >
            <p>
              {accountQuery.isError
                ? "Não foi possível carregar sua conta."
                : "Carregando sua vida financeira…"}
            </p>
            {accountQuery.isError && (
              <button
                className="mt-4 rounded-xl bg-[var(--accent)] px-5 py-3 text-white"
                type="button"
                onClick={() => void accountQuery.refetch()}
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}
      </div>
      {!isChoiceScreen && (
        <MobileBottomNav
          isOpenQuickActions={quickActionsOpen}
          onToggleQuickActions={() => setQuickActionsOpen((open) => !open)}
          mainView={undefined}
        />
      )}
      {!isChoiceScreen && (
        <QuickActions
          isOpen={quickActionsOpen}
          onToggle={() => setQuickActionsOpen((open) => !open)}
          handleOpenTxModal={() => setTransactionOpen(true)}
          selectTxType={setTransactionType}
        />
      )}
      {transactionOpen && (
        <Suspense
          fallback={
            <div
              className="fixed inset-0 z-[100] grid place-items-center bg-[var(--bg-base)]/80"
              role="status"
            >
              Carregando formulário…
            </div>
          }
        >
          <TransactionModal
            isOpen
            onClose={() => setTransactionOpen(false)}
            initialType={transactionType}
            transaction={null}
          />
        </Suspense>
      )}
    </div>
  );
}