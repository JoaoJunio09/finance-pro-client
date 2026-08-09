import type { TransactionType } from '../../types/TransactionType';
import TransactionForm from './components/TxForm/TxForm';
import TransactionPreviewCard from './components/TxPreviewCard/TxPreviewCard';
import useTransactionModal from './hooks/useTransactionModal';

import styles from './TransactionModal.module.css';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: TransactionType;
}

export function TransactionModal({ isOpen, onClose, initialType }: TransactionModalProps) {
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
    isSaving
  } = useTransactionModal(null, initialType, onClose);

  if (!isOpen) return null;  

  const handleSubmit = () => {
    saveOrUpdate();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`} onClick={onClose} />

      <div className={`relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden border ${styles.modal}`}>
        <TransactionForm
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