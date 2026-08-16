import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import CustomSelect from '../../../../components/shared/CustomSelect/CustomSelect';
import type { CategoryResponse } from '../../../../models/category/CategoryResponse';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import type { TransactionStatus } from '../../../../types/TransactionStatus';
import type { TransactionType } from '../../../../types/TransactionType';
import type { TxFormData } from '../../types/TxFormData';
import TxWalletBrandMark from '../TxWalletBrandMark/TxWalletBrandMark';

import { formatCurrencyInput } from '../../../../utils/FormatCurrency';
import styles from './TxForm.module.css';

interface TransactionFormProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onTypeChange: (type: TransactionType) => void;
  onStatusChange: (status: TransactionStatus) => void;
  form: TxFormData | undefined;
  onCategoryChange: (category: CategoryResponse) => void;
  onWalletChange: (wallet: WalletResponse) => void;
  type: TransactionType | undefined;
  amountStr: string | undefined;
  category: CategoryResponse | undefined;
  wallet: WalletResponse | undefined;
  categories: CategoryResponse[];
  wallets: WalletResponse[];
  onClose: () => void;
}

export function TransactionForm({
  handleOnChange,
  onTypeChange,
  onStatusChange,
  form,
  onCategoryChange,
  onWalletChange,
  type,
  amountStr,
  category,
  wallet,
  categories,
  wallets,
  onClose,
}: TransactionFormProps) {
  const isIncome = type === 'CREDIT';
  const numericAmount = amountStr ? Number(amountStr) / 100 : 0;
  
  const renderCategory = (cat: CategoryResponse) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${styles.categoryIconWrap}`} style={{ color: cat.color }}>
        <DynamicIcon name={cat.icon as IconName} size={16} />
      </div>
      <span className={`text-sm font-medium ${styles.categoryName}`}>{cat.name}</span>
    </div>
  );

  const renderWallet = (wallet: WalletResponse) => <TxWalletBrandMark bank={wallet.bank} size="md" />;

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
          id='amount'
          name='amount'
          type="text"
          inputMode="numeric"
          value={formatCurrencyInput(form?.amount ?? '')}
          onChange={handleOnChange}
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
            id='description'
            name='description'
            type="text"
            value={form?.description}
            onChange={handleOnChange}
            placeholder="Ex: Supermercado, Salário..."
            className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Categoria</label>
            <CustomSelect
              options={categories}
              value={category}
              onChange={onCategoryChange}
              placeholder="Selecione..."
              renderOption={renderCategory}
              renderSelected={renderCategory}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Carteira / Banco</label>
            <CustomSelect
              options={wallets}
              value={wallet}
              onChange={onWalletChange}
              placeholder="Selecione..."
              renderOption={renderWallet}
              renderSelected={renderWallet}
              isViewName={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Data</label>
              <input
                id='date'
                name='date'
                type="date"
                value={form?.date}
                onChange={handleOnChange}
                className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Hora</label>
              <input
                id='time'
                name='time'
                type="time"
                value={form?.time}
                onChange={handleOnChange}
                className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Status</label>
            <div className={`flex p-1 rounded-xl border h-[50px] ${styles.statusToggleWrap}`}>
              <button
                type="button"
                onClick={() => onStatusChange('COMPLETED')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
                  form?.status === 'COMPLETED' ? styles.statusBtnCompletedActive : styles.statusBtnInactive
                }`}
              >
                {form?.status === 'COMPLETED' && <CheckCircle2 size={16} />}
                {isIncome ? 'Recebido' : 'Pago'}
              </button>
              <button
                type="button"
                onClick={() => onStatusChange('PENDING')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg transition-colors focus:outline-none border ${
                  form?.status === 'PENDING' ? styles.statusBtnPendingActive : styles.statusBtnInactive
                }`}
              >
                {form?.status === 'PENDING' && <AlertCircle size={16} />}
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