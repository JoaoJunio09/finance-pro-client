import { Wallet as WalletIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { WalletResponse } from "../../models/wallet/WalletResponse";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal/DeleteConfirmModal";
import { FinancialSummary } from "./components/FinancialSummary/FinancialSummary";
import { WalletCard } from "./components/WalletCard/WalletCard";
import WalletFormModal from "./components/WalletFormModal/WalletFormModal";
import WalletsHeader from "./components/WalletsHeader/WalletsHeader";
import { WalletDetails } from "./components/WalletDetails/WalletDetails";
import useWallets from "./hooks/useWallets";
import type { WalletFilter } from "./types/wallet";

import styles from "./Wallets.module.css";

export default function WalletsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnAction = searchParams.get("retorno");
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<WalletResponse | null>(null);
  const [detailView, setDetailView] = useState<"details" | "history">("details");
  const [walletDeleted, setWalletDeleted] = useState<WalletResponse | null>(null);
  const [currentFilter, setCurrentFilter] = useState<WalletFilter>("all");

  const [isFormModalOpen, setIsFormModalOpen] = useState(
    searchParams.get("nova") === "1"
  );

  const onClose = () => {
    setWallet(null);
    setWalletDeleted(null);
    setIsFormModalOpen(false);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("nova");
    nextParams.delete("retorno");
    setSearchParams(nextParams, { replace: true });
  };

  const handleDeleteWallet = () => {
    if (!walletDeleted) return;
    deleteWallet(walletDeleted);
  };

  const openEdit = (wallet: WalletResponse) => {
    setWallet(wallet);
    setIsFormModalOpen(true);
  };

  const openDelete = (wallet: WalletResponse) => {
    setWalletDeleted(wallet);
  };

  const openAdd = () => {
    setWallet(null);
    setWalletDeleted(null);
    setIsFormModalOpen(true);
  };

  const openDetails = (selected: WalletResponse) => {
    setDetailView("details");
    setSelectedWallet(selected);
  };

  const openHistory = (selected: WalletResponse) => {
    setDetailView("history");
    setSelectedWallet(selected);
  };

  const {
    wallets,
    banks,
    form,
    handleOnChange,
    onBankChange,
    selectColor,
    saveOrUpdate,
    deleteWallet,
    isSaving,
  } = useWallets(wallet, onClose, () => {
    if (returnAction === "receita" || returnAction === "despesa") {
      navigate(`/vida-financeira/transacoes?nova=${returnAction}`);
    }
  });

  const filteredWallets = useMemo(() => {
    switch (currentFilter) {
      case "accounts":
        return wallets.filter((w) => w.type === "CHECKING" || w.type === "SAVING");
      case "credit_cards":
        return wallets.filter((w) => w.type === "CREDIT_CARD");
      case "reserves":
        return wallets.filter((w) => w.type === "RESERVE");
      case "investments":
        return wallets.filter((w) => w.type === "INVESTMENTS");
      case "physical":
        return wallets.filter((w) => w.type === "PHYSICAL");
      default:
        return wallets;
    }
  }, [wallets, currentFilter]);

  return (
    <div
      className={`min-h-screen relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)] ${styles.fadeInUp}`}
    >
      {selectedWallet ? (
        <WalletDetails
          key={selectedWallet.id}
          wallet={selectedWallet}
          wallets={wallets}
          initialView={detailView}
          onBack={() => setSelectedWallet(null)}
        />
      ) : (
        <>
          <WalletsHeader
            currentFilter={currentFilter}
            setFilter={setCurrentFilter}
            onAddWallet={openAdd}
          />

          <main className={styles.content}>
            <FinancialSummary wallets={wallets} />

            {filteredWallets.length > 0 ? (
              <div className={styles.walletGrid}>
                {filteredWallets.map((wallet) => (
                  <WalletCard
                    key={wallet.id}
                    wallet={wallet}
                    onEdit={openEdit}
                    onDelete={openDelete}
                    onSelect={openDetails}
                    onHistory={openHistory}
                    isPreview={isFormModalOpen}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <WalletIcon size={32} aria-hidden="true" />
                <span>Nenhuma carteira encontrada</span>
                <small>Tente alterar o filtro ou adicione uma nova carteira.</small>
              </div>
            )}
          </main>

          <WalletFormModal
            isOpen={isFormModalOpen}
            onClose={onClose}
            onSave={saveOrUpdate}
            onEdit={openEdit}
            onDelete={openDelete}
            form={form}
            handleOnChange={handleOnChange}
            selectColor={selectColor}
            banks={banks}
            onBankChange={onBankChange}
            isSaving={isSaving}
          />

          <DeleteConfirmModal
            isOpen={!!walletDeleted}
            wallet={walletDeleted}
            onClose={() => setWalletDeleted(null)}
            onConfirm={handleDeleteWallet}
          />
        </>
      )}
    </div>
  );
}
