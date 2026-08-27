import type { RecurrenceResponse } from '../../models/recurrence/RecurrenceResponse';
import { RecurrenceForm } from './components/RecForm/RecForm';
import { RecurrencePreviewCard } from './components/RecPreviewCard/RecPreviewCard';
import useRecurrenceModal from './hooks/useRecurrenceModal';
import styles from './RecurrenceModal.module.css';

interface RecurrenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'CREDIT' | 'DEBIT';
  recurrence: RecurrenceResponse | null;
}

export function RecurrenceModal({
  isOpen,
  onClose,
  initialType = 'DEBIT',
  recurrence
}: RecurrenceModalProps) {  
	const {
		form,
		handleOnChange,
		changeType,
		changeExecutionType,
		changeCustomSelectCategory,
		changeCustomSelectWallet,
		categories,
		wallets,
    saveOrUpdate,
    isSaving
	} = useRecurrenceModal(recurrence, initialType, onClose);

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
          isEditing={!!recurrence}
          form={form}
          onClose={onClose}
          onSubmit={saveOrUpdate}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}