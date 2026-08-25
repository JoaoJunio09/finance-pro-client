import React from 'react';
import { Eye, Calendar, Wallet, RefreshCcw } from 'lucide-react';
import styles from './RecurrencePreviewCard.module.css';
import BankBrandMark from '../../../transactionModal/components/TxWalletBrandMark/TxWalletBrandMark';
// Lembre-se de importar o TxWalletBrandMark do caminho correto
// import { TxWalletBrandMark } from '../caminho-do-seu-componente';

export function RecurrencePreviewCard({ isEditing, form, onClose, onSubmit, isSaving }: any) {
  const isIncome = form.type === 'CREDIT';
  const numericAmount = form.amount ? Number(form.amount) : 0;
  
  const isFormValid = numericAmount > 0 && form.description && form.startDate && form.wallet;

  const frequencyLabels: Record<string, string> = {
    MONTHLY: 'Mensal',
    BIWEEKLY: 'Quinzenal',
    WEEKLY: 'Semanal',
    YEARLY: 'Anual'
  };

  return (
    <div className={`w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l p-6 sm:p-8 flex flex-col ${styles.sidebar}`}>
      <h3 className={`text-sm font-bold mb-6 flex items-center gap-2 ${styles.textMain}`}>
         <Eye size={18} className={styles.accentIcon} /> Pré-visualização da recorrência
      </h3>

      <div className={`rounded-[1.5rem] p-5 flex flex-col gap-5 shadow-lg relative overflow-hidden group mt-auto mb-auto lg:mt-0 lg:mb-0 ${styles.previewCard}`}>
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isIncome ? styles.bgIncome : styles.bgExpense}`}></div>

        <div className="flex flex-col mt-2">
          <span className={`text-base font-bold leading-tight ${styles.textMain}`}>
            {form.description || 'Nova recorrência'}
          </span>
          <span className={`text-xs font-medium mt-0.5 ${styles.textMuted}`}>
            Repetição {frequencyLabels[form.frequency]}
          </span>
        </div>

        <div className="flex flex-col items-start mt-2">
          <span className={`text-2xl font-black tracking-tight tabular-nums ${isIncome ? styles.textIncome : styles.textMain}`}>
            {numericAmount > 0 ? `${isIncome ? '+' : '−'} R$ ${numericAmount.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
          </span>
        </div>

        <div className={`pt-4 border-t flex flex-col gap-3 ${styles.divider}`}>
          <div className="flex justify-between items-center text-xs font-medium">
            <span className={`flex items-center gap-1.5 ${styles.textMuted}`}><Calendar size={14} /> Início</span>
            <span className={styles.textMain}>
              {form.startDate ? new Date(form.startDate + 'T12:00:00').toLocaleDateString('pt-BR') : '-'}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-xs font-medium">
            <span className={`flex items-center gap-1.5 ${styles.textMuted}`}><Wallet size={14} /> Carteira</span>
            <BankBrandMark wallet={form.wallet} bank={form.wallet?.bank} size="sm" />
          </div>
          
          <div className="flex justify-between items-center text-xs font-medium mt-1">
            <span className={`flex items-center gap-1.5 ${styles.textMuted}`}><RefreshCcw size={14} /> Tipo</span>
            {form.recurrenceType === 'AUTOMATIC' ? (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${styles.badgeAuto} ${isIncome ? styles.textIncome : styles.textMain}`}>
                Automático
              </span>
            ) : (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${styles.badgeManual}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${styles.warningDot}`}></span> Manual
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center gap-3">
        <button 
          onClick={onClose} 
          className={`flex-1 py-3.5 rounded-xl text-sm font-semibold border transition-all ${styles.btnCancel}`}
        >
          Cancelar
        </button>
        <button 
          disabled={!isFormValid || isSaving} 
          onClick={onSubmit}
          className={`flex flex-[2] items-center justify-center py-3.5 rounded-xl text-sm font-bold shadow-md transition-all ${styles.btnSubmit}
            ${!isFormValid || isSaving ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90 active:scale-[0.98]'}`}
        >
          {isSaving ? 'Salvando...' : <span>{isEditing ? 'Confirmar' : 'Adicionar'}</span>}
        </button>
      </div>
    </div>
  );
}