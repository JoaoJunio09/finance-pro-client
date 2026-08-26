import React, { useState } from 'react';
import { RecurrenceForm } from './components/RecForm/RecForm';
import { RecurrencePreviewCard } from './components/RecPreviewCard/RecPreviewCard';
import styles from './RecurrenceModal.module.css';
import useRecurrenceModal from './hooks/useRecurrenceModal';

export interface BankResponse {
  name: string;
  color: string;
}

export interface WalletResponse {
  id: string;
  name: string;
  bank?: BankResponse;
}

const MOCK_WALLETS: WalletResponse[] = [
  { id: '1', name: 'Nubank', bank: { name: 'Nubank', color: '#8A05BE' } },
  { id: '2', name: 'Itaú', bank: { name: 'Itau', color: '#EC7000' } },
  { id: '3', name: 'Carteira Física' }
];

interface RecurrenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'CREDIT' | 'DEBIT';
  isEditing?: boolean;
}

export function RecurrenceModal({
  isOpen,
  onClose,
  initialType = 'DEBIT',
  isEditing = false
}: RecurrenceModalProps) {  
  const [isSaving, setIsSaving] = useState(false);

	const {
		form,
		handleOnChange,
		changeType,
		changeExecutionType,
		changeCustomSelectCategory,
		changeCustomSelectWallet,
		categories,
		wallets
	} = useRecurrenceModal(null, initialType, () => {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in-up">
       <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`} onClick={onClose} />

      <div className={`relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden border ${styles.modal}`}>
        <RecurrenceForm
					isEditing={false}
					form={form}
					amountStr={form.amount}
					handleOnChange={handleOnChange}
					onTypeChange={changeType}
          onExecutionType={changeExecutionType}
					type={form.type}
					onCategoryChange={changeCustomSelectCategory}
					onWalletChange={changeCustomSelectWallet}
					categories={categories}
					category={form.category}
					wallets={wallets}
					wallet={form.wallet}
					onClose={onClose}
        />

        <RecurrencePreviewCard
          isEditing={isEditing}
          form={form}
          onClose={onClose}
          onSubmit={() => {}}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}