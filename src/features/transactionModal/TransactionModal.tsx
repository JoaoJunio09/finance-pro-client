import { useEffect, useState } from 'react';
import TransactionForm from './components/TxForm/TxForm';
import TransactionPreviewCard from './components/TxPreviewCard/TxPreviewCard';
import { TX_CATEGORIES, TX_WALLETS } from './mocks/transactionsMocks';

import styles from './TransactionModal.module.css';
import type { TransactionType } from '../../types/TransactionType';

type TxType = 'income' | 'expense';
type TxStatus = 'completed' | 'pending';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: TransactionType;
}

function getFormattedAmount(raw: string): string {
  if (!raw) return 'R$ 0,00';
  const num = Number(raw) / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
}

export function TransactionModal({ isOpen, onClose, initialType = 'DEBIT' }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(initialType);
  const [amountStr, setAmountStr] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(initialType === 'CREDIT' ? 'c6' : 'c1');
  const [walletId, setWalletId] = useState('w1');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState<TxStatus>('completed');

  useEffect(() => {
    if (!isOpen) return;

    setType(initialType);
    setCategoryId(initialType === 'CREDIT' ? 'c6' : 'c1');
    setAmountStr('');
    setDescription('');
    setStatus('completed');

    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - localOffset).toISOString();

    setDate(localISOTime.split('T')[0]);
    setTime(localISOTime.split('T')[1].substring(0, 5));
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategoryId(newType === 'CREDIT' ? 'c6' : 'c1');
  };

  const numericAmount = amountStr ? Number(amountStr) / 100 : 0;
  const isIncome = type === 'CREDIT';
  const selectedCategory = TX_CATEGORIES.find((c) => c.id === categoryId) ?? TX_CATEGORIES[0];
  const selectedWallet = TX_WALLETS.find((w) => w.id === walletId) ?? TX_WALLETS[0];

  const previewDate = new Date(`${date}T12:00:00`);
  const previewDateLabel = previewDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleSubmit = () => {
    // TODO: integração real de criação de transação
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`} onClick={onClose} />

      <div className={`relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden border ${styles.modal}`}>
        <TransactionForm
          type={type}
          onTypeChange={handleTypeChange}
          amountStr={amountStr}
          onAmountChange={setAmountStr}
          formattedAmount={getFormattedAmount(amountStr)}
          description={description}
          onDescriptionChange={setDescription}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          walletId={walletId}
          onWalletChange={setWalletId}
          date={date}
          onDateChange={setDate}
          time={time}
          onTimeChange={setTime}
          status={status}
          onStatusChange={setStatus}
          categories={TX_CATEGORIES}
          wallets={TX_WALLETS}
          onClose={onClose}
        />

        <TransactionPreviewCard
          isIncome={isIncome}
          description={description}
          category={selectedCategory}
          wallet={selectedWallet}
          amountFormatted={getFormattedAmount(amountStr)}
          numericAmount={numericAmount}
          previewDateLabel={previewDateLabel}
          time={time}
          status={status}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default TransactionModal;