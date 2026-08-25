import React, { useState } from 'react';
import { RecurrenceForm } from './components/RecForm/RecForm';
import { RecurrencePreviewCard } from './components/RecPreviewCard/RecPreviewCard';
import styles from './RecurrenceModal.module.css';

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
  
  // --- LÓGICA DE ESTADO (Antigo Hook) ---
  const [form, setForm] = useState({
    type: initialType,
    amount: '',
    description: '',
    frequency: 'MONTHLY',
    recurrenceType: 'AUTOMATIC',
    startDate: '',
    endDate: '',
    wallet: MOCK_WALLETS[0],
    
    monthlyDay: new Date().getDate(),
    biweeklyDay1: 1,
    biweeklyDay2: 15,
    yearlyDay: new Date().getDate(),
    yearlyMonth: new Date().getMonth() + 1,
    
    alreadyPaid: false,
    alreadyPaid2: false
  });
  
  const [isSaving, setIsSaving] = useState(false);

  // Manipuladores de eventos
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setForm(prev => ({ ...prev, [target.name]: value }));
  };

  const saveOrUpdate = () => {
    setIsSaving(true);
    // Simula tempo de rede
    setTimeout(() => { 
      setIsSaving(false); 
      onClose(); 
    }, 1000);
  };

  const changeType = (type: 'CREDIT' | 'DEBIT') => setForm(prev => ({ ...prev, type }));
  const changeRecurrenceType = (recurrenceType: string) => setForm(prev => ({ ...prev, recurrenceType }));
  const changeCustomSelectWallet = (wallet: WalletResponse) => setForm(prev => ({ ...prev, wallet }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in-up">
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.backdrop}`} onClick={onClose} />
			
      <div className={`relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden ${styles.modalContainer}`}>
        <RecurrenceForm
          isEditing={isEditing}
          handleOnChange={handleOnChange}
          onTypeChange={changeType}
          onRecurrenceTypeChange={changeRecurrenceType}
          form={form}
          onWalletChange={changeCustomSelectWallet}
          type={form.type}
          amountStr={form.amount}
          wallet={form.wallet}
          wallets={MOCK_WALLETS}
          onClose={onClose}
        />

        <RecurrencePreviewCard
          isEditing={isEditing}
          form={form}
          onClose={onClose}
          onSubmit={saveOrUpdate}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}