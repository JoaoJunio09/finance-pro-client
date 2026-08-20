import { Activity, Calendar, CheckCircle2, Eye, Wallet } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import SpinnerLoading from '../../../../components/ui/SpinnerLoading/SpinnerLoading';
import { formatCurrencyToAPI } from '../../../../utils/FormatCurrency';
import type { TxFormData } from '../../types/TxFormData';
import TxWalletBrandMark from '../TxWalletBrandMark/TxWalletBrandMark';

import styles from './TxPreviewCard.module.css';

interface TransactionPreviewCardProps {
  isEditing: boolean;
  form: TxFormData | undefined;
  onClose: () => void;
  onSubmit: () => void;
  isSaving: boolean;
}

export function TransactionPreviewCard({
  isEditing,
  form,
  onClose,
  onSubmit,
  isSaving
}: TransactionPreviewCardProps) {
  
  const isIncome = form?.type === 'CREDIT';
  
  const numericAmount = form?.amount
    ? Number(form.amount) / 100
    : 0;

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericAmount);

  const previewDate = new Date(`${form?.date}T12:00:00`);
  const previewDateLabel = previewDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  const isFormValid = numericAmount > 0 && form && form.description && form.date && form.time && form.category && form.wallet;
  return (
    <div className={`w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l p-6 sm:p-8 flex flex-col ${styles.panel}`}>
      <h3 className={`text-sm font-bold mb-6 flex items-center gap-2 ${styles.panelTitle}`}>
        <Eye size={18} className={styles.panelTitleIcon} /> Pré-visualização
      </h3>

      <div className={`interactive-card rounded-[1.5rem] p-5 flex flex-col gap-5 shadow-lg relative overflow-hidden group mt-auto mb-auto lg:mt-0 lg:mb-0 border ${styles.card}`}>
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isIncome ? styles.topBarIncome : styles.topBarExpense}`}></div>

        <div className="flex justify-between items-start pt-1">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${isIncome ? styles.iconWrapIncome : styles.iconWrapDefault}`}>
              <DynamicIcon name={form?.category?.icon as IconName} size={22} />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-bold leading-tight ${styles.txDescription}`}>{form?.description || 'Nova transação'}</span>
              <span className={`text-xs font-medium mt-0.5 flex items-center gap-1.5 ${styles.txCategory}`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: form?.category?.color }}></span>
                {form?.category?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start mt-2">
          <span className={`text-2xl font-black tracking-tight tabular-nums ${isIncome ? styles.amountIncome : styles.amountNeutral}`}>
            {numericAmount > 0 ? `${isIncome ? '+' : '−'} ${formattedAmount}` : 'R$ 0,00'}
          </span>
        </div>

        <div className={`pt-4 border-t flex flex-col gap-3 ${styles.detailsBorder}`}>
          <div className="flex justify-between items-center text-xs font-medium">
            <span className={`flex items-center gap-1.5 ${styles.detailLabel}`}>
              <Calendar size={14} /> Data
            </span>
            <span className={styles.detailValue}>
              {previewDateLabel} • {form?.time}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs font-medium">
            <span className={`flex items-center gap-1.5 ${styles.detailLabel}`}>
              <Wallet size={14} /> Carteira
            </span>
            <TxWalletBrandMark wallet={form?.wallet} size="sm" />
          </div>

          <div className="flex justify-between items-center text-xs font-medium mt-1">
            <span className={`flex items-center gap-1.5 ${styles.detailLabel}`}>
              <Activity size={14} /> Status
            </span>
            {form?.status === 'COMPLETED' ? (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${isIncome ? styles.statusCompletedIncome : styles.statusCompletedDefault}`}>
                <CheckCircle2 size={12} /> {isIncome ? 'Recebido' : 'Pago'}
              </span>
            ) : (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${styles.statusPending}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${styles.statusPendingDot}`}></span> Pendente
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center gap-3">
        <button onClick={onClose} className={`flex-1 py-3.5 rounded-xl text-sm font-semibold border transition-all focus:outline-none ${styles.cancelBtn}`} type="button">
          Cancelar
        </button>
        <button
          type="button"
          disabled={!isFormValid || isSaving}
          onClick={onSubmit}
          className={`flex flex-[2] items-center justify-center py-3.5 rounded-xl text-sm font-bold shadow-md transition-all focus:outline-none
            ${styles.submitBtn}
            ${!isFormValid || isSaving ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-[0.98]'}
          `}
        >
          {isSaving ? (
            <SpinnerLoading />
          ) : (
            <span>{isEditing ? 'Confirmar alterações' : 'Adicionar transação'}</span>
          )}
      </button>
      </div>
    </div>
  );
}

export default TransactionPreviewCard;