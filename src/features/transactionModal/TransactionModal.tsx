import type { TransactionResponse } from "../../models/transaction/TransactionResponse";
import type { TransactionType } from "../../types/TransactionType";
import TransactionForm from "./components/TxForm/TxForm";
import TransactionPreviewCard from "./components/TxPreviewCard/TxPreviewCard";
import useTransactionModal from "./hooks/useTransactionModal";
import WalletPrerequisite from "./components/WalletPrerequisite";
import useDialogFocus from "../../hooks/useDialogFocus";

import styles from "./TransactionModal.module.css";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: TransactionType;
  transaction: TransactionResponse | null;
}

export function TransactionModal({
  isOpen,
  onClose,
  initialType,
  transaction,
}: TransactionModalProps) {
  const {
    categories,
    wallets,
    form,
    handleOnChange,
    changeType,
    changeStatus,
    changeCustomSelectCategory,
    changeCustomSelectWallet,
    saveOrUpdate,
    isSaving,
    walletsLoading,
    walletsError,
    refetchWallets,
  } = useTransactionModal(transaction, initialType, onClose);

  const dialogRef = useDialogFocus(
    isOpen &&
      (Boolean(transaction) ||
        (!walletsLoading && !walletsError && wallets.length > 0)),
    onClose
  );

  if (!isOpen) return null;

  if (
    !transaction &&
    (walletsLoading || walletsError || wallets.length === 0)
  ) {
    return (
      <WalletPrerequisite
        isLoading={walletsLoading}
        isError={walletsError}
        onRetry={() => void refetchWallets()}
        onClose={onClose}
        type={initialType}
      />
    );
  }

  const handleSubmit = () => {
    saveOrUpdate();
  };

  const isEditing = !!transaction;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={
        isEditing ? "Editar registro" : "Adicionar receita ou despesa"
      }
    >
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden border ${styles.modal}`}
      >
        <TransactionForm
          isEditing={isEditing}
          handleOnChange={handleOnChange}
          onTypeChange={changeType}
          onStatusChange={changeStatus}
          form={form}
          onCategoryChange={changeCustomSelectCategory}
          onWalletChange={changeCustomSelectWallet}
          type={form?.type}
          amountStr={form?.amount}
          category={form?.category}
          wallet={form?.wallet}
          categories={categories}
          wallets={wallets}
          onClose={onClose}
        />

        <TransactionPreviewCard
          isEditing={isEditing}
          form={form}
          onClose={onClose}
          onSubmit={handleSubmit}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}

export default TransactionModal;
