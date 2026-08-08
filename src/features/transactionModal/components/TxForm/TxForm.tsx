import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import CustomSelect from '../../../../components/shared/CustomSelect/CustomSelect';
import type { TransactionType } from '../../../../types/TransactionType';
import type { TxCategory } from '../../types/TxCategory';
import type { TxWallet } from '../../types/TxWallet';
import TxWalletBrandMark from '../TxWalletBrandMark/TxWalletBrandMark';

import styles from './TxForm.module.css';

type TxStatus = 'completed' | 'pending';

interface TransactionFormProps {
  type: TransactionType;
  onTypeChange: (type: TransactionType) => void;
  amountStr: string;
  onAmountChange: (raw: string) => void;
  formattedAmount: string;
  description: string;
  onDescriptionChange: (value: string) => void;
  categoryId: string;
  onCategoryChange: (id: string) => void;
  walletId: string;
  onWalletChange: (id: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  time: string;
  onTimeChange: (value: string) => void;
  status: TxStatus;
  onStatusChange: (status: TxStatus) => void;
  categories: TxCategory[];
  wallets: TxWallet[];
  onClose: () => void;
}

export function TransactionForm({
  type,
  onTypeChange,
  amountStr,
  onAmountChange,
  formattedAmount,
  description,
  onDescriptionChange,
  categoryId,
  onCategoryChange,
  walletId,
  onWalletChange,
  date,
  onDateChange,
  time,
  onTimeChange,
  status,
  onStatusChange,
  categories,
  wallets,
  onClose,
}: TransactionFormProps) {
  const isIncome = type === 'CREDIT';
  const numericAmount = amountStr ? Number(amountStr) / 100 : 0;

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(e.target.value.replace(/\D/g, ''));
  };

  const renderCategory = (cat: TxCategory) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${styles.categoryIconWrap}`} style={{ color: cat.color }}>
        <cat.icon size={16} />
      </div>
      <span className={`text-sm font-medium ${styles.categoryName}`}>{cat.name}</span>
    </div>
  );

  const renderWallet = (wallet: TxWallet) => <TxWalletBrandMark wallet={wallet} size="md" />;

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-hide">
      <div className={`flex items-center justify-between pb-4 border-b ${styles.header}`}>
        <h2 className={`text-xl font-bold tracking-tight ${styles.title}`}>Nova transação</h2>
        <button onClick={onClose} className={`p-2 rounded-full transition-colors focus:outline-none ${styles.closeBtn}`} type="button">
          <X size={20} />
        </button>
      </div>

      <div className={`flex p-1 rounded-xl border ${styles.typeToggleWrap}`}>
        <button
          type="button"
          onClick={() => onTypeChange('CREDIT')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
            type === 'CREDIT' ? styles.typeBtnIncomeActive : styles.typeBtnInactive
          }`}
        >
          Receita
        </button>
        <button
          type="button"
          onClick={() => onTypeChange('DEBIT')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
            type === 'DEBIT' ? styles.typeBtnExpenseActive : styles.typeBtnInactive
          }`}
        >
          Despesa
        </button>
      </div>

      <div className="flex flex-col gap-1.5 items-center justify-center py-4">
        <span className={`text-xs font-semibold uppercase tracking-wider ${styles.amountLabel}`}>Valor da transação</span>
        <input
          type="text"
          inputMode="numeric"
          value={formattedAmount}
          onChange={handleAmountInput}
          className={`w-full text-center text-4xl sm:text-5xl font-black tracking-tighter bg-transparent focus:outline-none transition-colors ${styles.amountInput} ${
            numericAmount > 0 ? (isIncome ? styles.amountIncome : styles.amountNeutral) : styles.amountPlaceholder
          }`}
          placeholder="R$ 0,00"
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-2">
          <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Ex: Supermercado, Salário..."
            className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Categoria</label>
            <CustomSelect options={categories} value={categoryId} onChange={onCategoryChange} placeholder="Selecione..." renderOption={renderCategory} renderSelected={renderCategory} />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Carteira / Banco</label>
            <CustomSelect options={wallets} value={walletId} onChange={onWalletChange} placeholder="Selecione..." renderOption={renderWallet} renderSelected={renderWallet} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Hora</label>
              <input
                type="time"
                value={time}
                onChange={(e) => onTimeChange(e.target.value)}
                className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Status</label>
            <div className={`flex p-1 rounded-xl border h-[50px] ${styles.statusToggleWrap}`}>
              <button
                type="button"
                onClick={() => onStatusChange('completed')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
                  status === 'completed' ? styles.statusBtnCompletedActive : styles.statusBtnInactive
                }`}
              >
                {status === 'completed' && <CheckCircle2 size={16} />}
                {isIncome ? 'Recebido' : 'Pago'}
              </button>
              <button
                type="button"
                onClick={() => onStatusChange('pending')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
                  status === 'pending' ? styles.statusBtnPendingActive : styles.statusBtnInactive
                }`}
              >
                {status === 'pending' && <AlertCircle size={16} />}
                Pendente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;