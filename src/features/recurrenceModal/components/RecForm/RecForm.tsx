import { Hand, RefreshCcw, X } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import CustomSelect from '../../../../components/shared/CustomSelect/CustomSelect';
import type { CategoryResponse } from '../../../../models/category/CategoryResponse';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import type { ExecutionType } from '../../../../types/ExecutionType';
import type { RecurrenceType } from '../../../../types/RecurrenceType';
import BankBrandMark from '../../../transactionModal/components/TxWalletBrandMark/TxWalletBrandMark';
import type { RecFormData } from '../../types/RecFormData';
import styles from './RecForm.module.css';

interface RecurrenceFormProps {
  isEditing: boolean;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onTypeChange: (type: RecurrenceType) => void;
  onExecutionType: (executionType: ExecutionType) => void;
  form: RecFormData | undefined;
  onCategoryChange: (category: CategoryResponse) => void;
  onWalletChange: (wallet: WalletResponse) => void;
  type: RecurrenceType | undefined;
  amountStr: string | undefined;
  category: CategoryResponse | undefined;
  wallet: WalletResponse | undefined;
  categories: CategoryResponse[];
  wallets: WalletResponse[];
  onClose: () => void;
}

export function RecurrenceForm({
  isEditing,
  form,
  handleOnChange,
  onTypeChange,
  onExecutionType,
  onCategoryChange,
  onWalletChange,
  type,
  amountStr,
  category,
  wallet,
  categories,
  wallets,
  onClose,
}: RecurrenceFormProps) {
  
  const isIncome = type === 'CREDIT';
  const numericAmount = amountStr ? Number(amountStr) : 0;

  const renderCategory = (cat: CategoryResponse) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${styles.categoryIconWrap}`} style={{ color: cat.color }}>
        <DynamicIcon name={cat.icon as IconName} size={16} />
      </div>
      <span className={`text-sm font-medium ${styles.categoryName}`}>{cat.name}</span>
    </div>
  );

  const renderWallet = (w: any) => <BankBrandMark bank={w.bank} wallet={w} size="md" />;

  // Lógica de verificação de datas passadas
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  
  const isPastMonthly = form?.frequencyType === 'MONTHLY' && Number(form.dayOne) < currentDay;
  const isPastBiweeklyDay1 = form?.frequencyType === 'BIWEEKLY' && Number(form?.dayOne) < currentDay;
  const isPastBiweeklyDay2 = form?.frequencyType === 'BIWEEKLY' && Number(form?.dayTwo) < currentDay;
  const isPastYearly = form?.frequencyType === 'YEARLY' && (
    Number(form?.monthOfTheYear) < currentMonth || 
    (Number(form?.monthOfTheYear) === currentMonth && Number(form?.dayOne) < currentDay)
  );

  const statusText = isIncome ? 'recebido' : 'pago';

  // Lógica para a cor do input de valor
  let amountInputStyle = styles.amountInputEmpty;
  if (numericAmount > 0) {
    amountInputStyle = isIncome ? styles.amountInputIncome : styles.amountInputExpense;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-hide">
      
      {/* HEADER */}
      <div className={`flex items-center justify-between pb-4 border-b ${styles.header}`}>
        <h2 className={`text-xl font-bold tracking-tight ${styles.textMain}`}>
          {isEditing ? 'Editar Recorrência' : 'Nova Recorrência'}
        </h2>
        <button onClick={onClose} className={`p-2 rounded-full transition-colors focus:outline-none ${styles.btnClose}`}>
          <X size={20} />
        </button>
      </div>

      {/* TOGGLE: RECEITA / DESPESA */}
      <div className={`flex p-1 rounded-xl border ${styles.toggleContainer}`}>
        <button 
          onClick={() => onTypeChange('CREDIT')} 
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors border ${type === 'CREDIT' ? styles.activeIncome : styles.toggleBtn}`}
        >
          Receita
        </button>
        <button 
          onClick={() => onTypeChange('DEBIT')} 
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors border ${type === 'DEBIT' ? styles.activeExpense : styles.toggleBtn}`}
        >
          Despesa
        </button>
      </div>

      {/* INPUT: VALOR */}
      <div className="flex flex-col gap-1.5 items-center justify-center py-4">
        <span className={`text-xs font-semibold uppercase tracking-wider ${styles.textMuted}`}>Valor da recorrência</span>
        <input 
          name="amount" id='amount' value={form?.amount} onChange={handleOnChange} placeholder="R$ 0,00"
          className={`w-full text-center text-4xl sm:text-5xl font-black tracking-tighter bg-transparent focus:outline-none transition-colors ${amountInputStyle}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        
        {/* DESCRIÇÃO */}
        <div className="flex flex-col gap-2">
          <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Descrição</label>
          <input 
            name="description" type="text" value={form?.description} onChange={handleOnChange} placeholder="Ex: Assinatura de Software, Aluguel..."
            className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`}
          />
        </div>

        {/* FREQUÊNCIA E CARTEIRA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Categorias</label>
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
            <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Carteira / Banco</label>
            <CustomSelect
              options={wallets}
              value={wallet}
              onChange={onWalletChange}
              placeholder="Selecione..."
              renderOption={renderWallet}
              renderSelected={renderWallet}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Frequência</label>
          <select 
            name="frequency" value={form?.frequencyType} onChange={handleOnChange}
            className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`}
          >
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensal</option>
            <option value="BIWEEKLY">Quinzenal</option>
            <option value="YEARLY">Anual</option>
          </select>
        </div>

        {/* CAMPOS DINÂMICOS - MENSAL */}
        {form?.frequencyType === 'MONTHLY' && (
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Dia do Vencimento</label>
            <input 
              name="dayOne" id='dayOne' min="1" max="31" value={form.dayOne} onChange={handleOnChange}
              className={`w-full sm:w-1/2 rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} 
            />
          </div>
        )}

        {/* CAMPOS DINÂMICOS - QUINZENAL */}
        {form?.frequencyType === 'BIWEEKLY' && (
          <div className="grid grid-cols-2 gap-3 sm:w-1/2">
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>1º Dia</label>
              <input name="dayOne" id='dayOne' min="1" max="31" value={form.dayOne} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>2º Dia</label>
              <input name="dayTwo" id='dayTwo' min="1" max="31" value={form.dayTwo} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} />
            </div>
          </div>
        )}

        {/* CAMPOS DINÂMICOS - ANUAL */}
        {form?.frequencyType === 'YEARLY' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Mês de Cobrança</label>
              <select name="yearlyMonth" value={form.monthOfTheYear} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`}>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Dia</label>
              <input name="yearlyDay" type="number" min="1" max="31" value={form.dayOne} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} />
            </div>
          </div>
        )}

        {/* CHECKBOX - MENSAL*/}
        {(form?.frequencyType === 'MONTHLY' && isPastMonthly) && (
          <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-sm animate-fade-in-up mt-1 ${styles.checkboxContainer}`}>
            <input 
              type="checkbox" name="dayOneAlreadyOccurred" id="dayOneAlreadyOccurred" checked={form.dayOneAlreadyOccurred} onChange={handleOnChange}
              className={`w-5 h-5 rounded cursor-pointer ${styles.checkboxInput}`}
            />
            <label htmlFor="dayOneAlreadyOccurred" className={`text-sm font-medium cursor-pointer select-none ${styles.textMain}`}>
              Marcar como já {statusText} neste período
            </label>
          </div>
        )}

        {/* CHECKBOX - ANUAL*/}
        {(form?.frequencyType === 'YEARLY' && isPastYearly) && (
          <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-sm animate-fade-in-up mt-1 ${styles.checkboxContainer}`}>
            <input 
              type="checkbox" name="monthOfTheYearAlreadyOccurred" id="monthOfTheYearAlreadyOccurred" checked={form.monthOfTheYearAlreadyOccurred} onChange={handleOnChange}
              className={`w-5 h-5 rounded cursor-pointer ${styles.checkboxInput}`}
            />
            <label htmlFor="monthOfTheYearAlreadyOccurred" className={`text-sm font-medium cursor-pointer select-none ${styles.textMain}`}>
              Marcar como já {statusText} neste período
            </label>
          </div>
        )}

        {/* CHECKBOXES - QUINZENAL */}
        {form?.frequencyType === 'BIWEEKLY' && (isPastBiweeklyDay1 || isPastBiweeklyDay2) && (
          <div className="flex flex-col gap-2 mt-1">
            {isPastBiweeklyDay1 && (
              <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-sm animate-fade-in-up ${styles.checkboxContainer}`}>
                <input type="checkbox" name="dayOneAlreadyOccurred" id="dayOneAlreadyOccurred" checked={form.dayOneAlreadyOccurred} onChange={handleOnChange} className={`w-5 h-5 rounded cursor-pointer ${styles.checkboxInput}`} />
                <label htmlFor="dayOneAlreadyOccurred" className={`text-sm font-medium cursor-pointer select-none ${styles.textMain}`}>
                  Marcar como já {statusText} ref. ao 1º Dia ({form.dayOneAlreadyOccurred})
                </label>
              </div>
            )}
            
            {isPastBiweeklyDay2 && (
              <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-sm animate-fade-in-up ${styles.checkboxContainer}`}>
                <input type="checkbox" name="dayTwoAlreadyOccurred" id="dayTwoAlreadyOccurred" checked={form.dayTwoAlreadyOccurred} onChange={handleOnChange} className={`w-5 h-5 rounded cursor-pointer ${styles.checkboxInput}`} />
                <label htmlFor="dayTwoAlreadyOccurred" className={`text-sm font-medium cursor-pointer select-none ${styles.textMain}`}>
                  Marcar como já {statusText} ref. ao 2º Dia ({form.dayTwoAlreadyOccurred})
                </label>
              </div>
            )}
          </div>
        )}

        {/* INÍCIO, FIM E TIPO DE LANÇAMENTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Início (Opc.)</label>
              <input name="startDate" type="date" value={form?.startDate} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Fim (Opc.)</label>
              <input name="endDate" type="date" value={form?.endDate} onChange={handleOnChange} className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm ${styles.inputBase}`} />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-semibold ml-1 ${styles.textMuted}`}>Tipo de Lançamento</label>
            <div className={`flex p-1 rounded-xl border h-[50px] ${styles.toggleContainer}`}>
              <button
                onClick={() => onExecutionType('AUTOMATIC')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg border ${form?.executionType === 'AUTOMATIC' ? styles.activeAuto : styles.toggleBtn}`}
              >
                {form?.executionType === 'AUTOMATIC' && <RefreshCcw size={16} />} Automático
              </button>
              <button
                onClick={() => onExecutionType('MANUALLY')}
                className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg border ${form?.executionType === 'MANUALLY' ? styles.activeManual : styles.toggleBtn}`}
              >
                {form?.executionType === 'MANUALLY' && <Hand size={16} />} Manual
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}