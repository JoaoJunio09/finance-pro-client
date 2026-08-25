import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Hand, Calendar, Wallet, Eye, CircleDollarSign } from 'lucide-react';

// ==========================================
// 1. TIPAGENS E MOCKS
// ==========================================

interface BankResponse {
  name: string;
  color: string;
}

interface WalletResponse {
  id: string;
  name: string;
  bank?: BankResponse;
}

const MOCK_WALLETS: WalletResponse[] = [
  { id: '1', name: 'Nubank', bank: { name: 'Nubank', color: '#8A05BE' } },
  { id: '2', name: 'Itaú', bank: { name: 'Itau', color: '#EC7000' } },
  { id: '3', name: 'Carteira Física' }
];

// ==========================================
// 2. HOOK DE ESTADO
// ==========================================

function useRecurrenceModal(initialType: 'CREDIT' | 'DEBIT', onClose: () => void) {
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
    
    // Checkboxes de pagamento já efetuado
    alreadyPaid: false, // Usado para mensal, anual e o 1º dia do quinzenal
    alreadyPaid2: false // Usado exclusivamente para o 2º dia do quinzenal
  });
  const [isSaving, setIsSaving] = useState(false);

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

  return {
    wallets: MOCK_WALLETS,
    form,
    handleOnChange,
    isSaving,
    saveOrUpdate,
    changeType: (type: 'CREDIT' | 'DEBIT') => setForm(prev => ({ ...prev, type })),
    changeRecurrenceType: (recurrenceType: string) => setForm(prev => ({ ...prev, recurrenceType })),
    changeCustomSelectWallet: (wallet: WalletResponse) => setForm(prev => ({ ...prev, wallet })),
  };
}

// ==========================================
// 3. COMPONENTES MENORES (BrandMark e Select)
// ==========================================

function TxWalletBrandMark({ bank, wallet, size = 'md' }: { bank?: BankResponse, wallet?: WalletResponse, size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'text-[11px]' : 'text-base';
  const itauSizeClass = size === 'sm' ? 'text-[10px]' : 'text-lg';

  if (!bank) {
    if (size === 'sm') return <span className="text-[var(--text-main)]">{wallet?.name}</span>;
    return (
      <div className="flex items-center gap-1">
        <CircleDollarSign size={18} color='green' />
        <span className="font-medium text-sm text-[var(--text-main)]">{wallet?.name}</span>
      </div>
    );
  }

  if (bank.name === 'Itau') {
    return (
      <span className={`font-bold tracking-tighter px-1 rounded-sm ${itauSizeClass} text-[#002B5E] bg-[#EC7000]`}>
        Itaú
      </span>
    );
  }
  return <span className={`font-bold tracking-tight ${sizeClass}`} style={{ color: bank.color }}>{bank.name}</span>;
}

function CustomSelect({ options, value, onChange, placeholder, renderSelected, renderOption }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div 
        onClick={() => setOpen(!open)}
        className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] cursor-pointer hover:border-[var(--border-hover)]"
      >
        {value ? renderSelected(value) : <span className="text-[var(--text-muted)]">{placeholder}</span>}
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 rounded-xl shadow-lg border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
          {options.map((opt: any, i: number) => (
            <div key={i} onClick={() => { onChange(opt); setOpen(false); }} className="px-4 py-3 hover:bg-[var(--bg-elevated)] cursor-pointer">
              {renderOption ? renderOption(opt) : opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. FORMULÁRIO DE RECORRÊNCIA
// ==========================================

function RecurrenceForm({ isEditing, handleOnChange, onTypeChange, onRecurrenceTypeChange, form, onWalletChange, type, amountStr, wallet, wallets, onClose }: any) {
  const isIncome = type === 'CREDIT';
  const numericAmount = amountStr ? Number(amountStr) : 0;
  const renderWallet = (w: WalletResponse) => <TxWalletBrandMark bank={w.bank} wallet={w} size="md" />;

  // Lógica de verificação de datas passadas
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1; // 1-12
  
  const isPastMonthly = form.frequency === 'MONTHLY' && Number(form.monthlyDay) < currentDay;
  const isPastBiweeklyDay1 = form.frequency === 'BIWEEKLY' && Number(form.biweeklyDay1) < currentDay;
  const isPastBiweeklyDay2 = form.frequency === 'BIWEEKLY' && Number(form.biweeklyDay2) < currentDay;
  const isPastYearly = form.frequency === 'YEARLY' && (
    Number(form.yearlyMonth) < currentMonth || 
    (Number(form.yearlyMonth) === currentMonth && Number(form.yearlyDay) < currentDay)
  );

  const statusText = isIncome ? 'recebido' : 'pago';

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-hide">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)]">
        <h2 className="text-xl font-bold tracking-tight text-[var(--text-main)]">
          {isEditing ? 'Editar Recorrência' : 'Nova Recorrência'}
        </h2>
        <button onClick={onClose} className="p-2 rounded-full transition-colors focus:outline-none text-[var(--text-muted)] hover:bg-[var(--bg-elevated)]">
          <X size={20} />
        </button>
      </div>

      <div className="flex p-1 rounded-xl border border-[var(--border-light)] bg-[var(--bg-elevated)]">
        <button onClick={() => onTypeChange('CREDIT')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors border ${type === 'CREDIT' ? 'bg-[var(--bg-surface)] text-[var(--income)] shadow-[var(--shadow-card)] border-[var(--border-color)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Receita</button>
        <button onClick={() => onTypeChange('DEBIT')} className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors border ${type === 'DEBIT' ? 'bg-[var(--bg-surface)] text-[var(--expense)] shadow-[var(--shadow-card)] border-[var(--border-color)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Despesa</button>
      </div>

      <div className="flex flex-col gap-1.5 items-center justify-center py-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Valor da recorrência</span>
        <input name='amount' type="number" value={form.amount} onChange={handleOnChange} placeholder="R$ 0,00"
          className={`w-full text-center text-4xl sm:text-5xl font-black tracking-tighter bg-transparent focus:outline-none transition-colors ${numericAmount > 0 ? (isIncome ? 'text-[var(--income)]' : 'text-[var(--text-main)]') : 'text-[var(--text-muted)]'}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Descrição</label>
          <input name='description' type="text" value={form.description} onChange={handleOnChange} placeholder="Ex: Assinatura de Software, Aluguel..."
            className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] placeholder-[var(--text-muted)] hover:border-[var(--border-hover)] focus:border-[var(--accent)] focus:shadow-[0_0_0_1px_var(--accent)] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Frequência</label>
            <select name="frequency" value={form.frequency} onChange={handleOnChange}
              className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--border-hover)] focus:outline-none">
              <option value="WEEKLY">Semanal</option>
              <option value="MONTHLY">Mensal</option>
              <option value="BIWEEKLY">Quinzenal</option>
              <option value="YEARLY">Anual</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Carteira / Banco</label>
            <CustomSelect options={wallets} value={wallet} onChange={onWalletChange} placeholder="Selecione..." renderOption={renderWallet} renderSelected={renderWallet} />
          </div>
        </div>

        {/* ======================================= */}
        {/* CAMPOS DINÂMICOS BASEADOS NA FREQUÊNCIA */}
        {/* ======================================= */}
        
        {form.frequency === 'MONTHLY' && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Dia do Vencimento</label>
            <input name="monthlyDay" type="number" min="1" max="31" value={form.monthlyDay} onChange={handleOnChange}
              className="w-full sm:w-1/2 rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
          </div>
        )}

        {form.frequency === 'BIWEEKLY' && (
          <div className="grid grid-cols-2 gap-3 sm:w-1/2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">1º Dia</label>
              <input name="biweeklyDay1" type="number" min="1" max="31" value={form.biweeklyDay1} onChange={handleOnChange}
                className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">2º Dia</label>
              <input name="biweeklyDay2" type="number" min="1" max="31" value={form.biweeklyDay2} onChange={handleOnChange}
                className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
            </div>
          </div>
        )}

        {form.frequency === 'YEARLY' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Mês de Cobrança</label>
              <select name="yearlyMonth" value={form.yearlyMonth} onChange={handleOnChange}
                className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--border-hover)] focus:outline-none">
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
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Dia</label>
              <input name="yearlyDay" type="number" min="1" max="31" value={form.yearlyDay} onChange={handleOnChange}
                className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
            </div>
          </div>
        )}

        {/* Checkboxes condicionais para MENSAL e ANUAL */}
        {((form.frequency === 'MONTHLY' && isPastMonthly) || (form.frequency === 'YEARLY' && isPastYearly)) && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-elevated)] shadow-sm animate-fade-in-up mt-1">
            <input 
              type="checkbox" 
              name="alreadyPaid" 
              id="alreadyPaid"
              checked={form.alreadyPaid} 
              onChange={handleOnChange}
              className="w-5 h-5 rounded border-[var(--border-color)] accent-[var(--accent)] cursor-pointer"
            />
            <label htmlFor="alreadyPaid" className="text-sm font-medium text-[var(--text-main)] cursor-pointer select-none">
              Marcar como já {statusText} neste período
            </label>
          </div>
        )}

        {/* Checkboxes condicionais e independentes para QUINZENAL */}
        {form.frequency === 'BIWEEKLY' && (isPastBiweeklyDay1 || isPastBiweeklyDay2) && (
          <div className="flex flex-col gap-2 mt-1">
            {isPastBiweeklyDay1 && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-elevated)] shadow-sm animate-fade-in-up">
                <input 
                  type="checkbox" 
                  name="alreadyPaid" 
                  id="alreadyPaid1"
                  checked={form.alreadyPaid} 
                  onChange={handleOnChange}
                  className="w-5 h-5 rounded border-[var(--border-color)] accent-[var(--accent)] cursor-pointer"
                />
                <label htmlFor="alreadyPaid1" className="text-sm font-medium text-[var(--text-main)] cursor-pointer select-none">
                  Marcar como já {statusText} ref. ao 1º Dia ({form.biweeklyDay1})
                </label>
              </div>
            )}
            
            {isPastBiweeklyDay2 && (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--border-light)] bg-[var(--bg-elevated)] shadow-sm animate-fade-in-up">
                <input 
                  type="checkbox" 
                  name="alreadyPaid2" 
                  id="alreadyPaid2"
                  checked={form.alreadyPaid2} 
                  onChange={handleOnChange}
                  className="w-5 h-5 rounded border-[var(--border-color)] accent-[var(--accent)] cursor-pointer"
                />
                <label htmlFor="alreadyPaid2" className="text-sm font-medium text-[var(--text-main)] cursor-pointer select-none">
                  Marcar como já {statusText} ref. ao 2º Dia ({form.biweeklyDay2})
                </label>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Início</label>
              <input name='startDate' type="date" value={form.startDate} onChange={handleOnChange} className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Fim (Opc.)</label>
              <input name='endDate' type="date" value={form.endDate} onChange={handleOnChange} className="w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold ml-1 text-[var(--text-muted)]">Tipo de Lançamento</label>
            <div className="flex p-1 rounded-xl border border-[var(--border-light)] bg-[var(--bg-elevated)] h-[50px]">
              <button onClick={() => onRecurrenceTypeChange('AUTOMATIC')} className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg border ${form.recurrenceType === 'AUTOMATIC' ? 'bg-[var(--bg-surface)] text-[var(--text-main)] shadow-[var(--shadow-card)] border-[var(--border-color)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                {form.recurrenceType === 'AUTOMATIC' && <RefreshCcw size={16} />} Automático
              </button>
              <button onClick={() => onRecurrenceTypeChange('MANUAL')} className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-lg border ${form.recurrenceType === 'MANUAL' ? 'bg-[var(--bg-surface)] text-[var(--warning)] shadow-[var(--shadow-card)] border-[var(--border-color)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>
                {form.recurrenceType === 'MANUAL' && <Hand size={16} />} Manual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. PREVIEW DA RECORRÊNCIA
// ==========================================

function RecurrencePreviewCard({ isEditing, form, onClose, onSubmit, isSaving }: any) {
  const isIncome = form.type === 'CREDIT';
  const numericAmount = form.amount ? Number(form.amount) : 0;
  
  // Atualizando a validação baseada nos novos campos
  const isFormValid = numericAmount > 0 && form.description && form.startDate && form.wallet;

  const frequencyLabels: Record<string, string> = {
    MONTHLY: 'Mensal',
    BIWEEKLY: 'Quinzenal',
    WEEKLY: 'Semanal',
    YEARLY: 'Anual'
  };

  return (
    <div className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-[var(--border-color)] p-6 sm:p-8 flex flex-col" style={{ background: 'linear-gradient(to bottom right, var(--bg-elevated), var(--bg-surface))' }}>
      <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-[var(--text-main)]">
         <Eye size={18} className="text-[var(--accent)]" /> Pré-visualização da recorrência
      </h3>

      <div className="interactive-card rounded-[1.5rem] p-5 flex flex-col gap-5 shadow-lg relative overflow-hidden group mt-auto mb-auto lg:mt-0 lg:mb-0 border border-[var(--border-color)] bg-[var(--bg-surface)] hover:shadow-[var(--shadow-hover)] hover:border-[var(--border-hover)] transition-all">
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isIncome ? 'bg-[var(--income)]' : 'bg-[var(--expense)]'}`}></div>

        <div className="flex flex-col mt-2">
          <span className="text-base font-bold leading-tight text-[var(--text-main)]">{form.description || 'Nova recorrência'}</span>
          <span className="text-xs font-medium mt-0.5 text-[var(--text-muted)]">Repetição {frequencyLabels[form.frequency]}</span>
        </div>

        <div className="flex flex-col items-start mt-2">
          <span className={`text-2xl font-black tracking-tight tabular-nums ${isIncome ? 'text-[var(--income)]' : 'text-[var(--text-main)]'}`}>
            {numericAmount > 0 ? `${isIncome ? '+' : '−'} R$ ${numericAmount.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
          </span>
        </div>

        <div className="pt-4 border-t border-[var(--border-light)] flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><Calendar size={14} /> Início</span>
            <span className="text-[var(--text-main)]">
              {form.startDate ? new Date(form.startDate + 'T12:00:00').toLocaleDateString('pt-BR') : '-'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><Wallet size={14} /> Carteira</span>
            <TxWalletBrandMark wallet={form.wallet} bank={form.wallet?.bank} size="sm" />
          </div>
          <div className="flex justify-between items-center text-xs font-medium mt-1">
            <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><RefreshCcw size={14} /> Tipo</span>
            {form.recurrenceType === 'AUTOMATIC' ? (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--border-light)] bg-[var(--bg-elevated)] ${isIncome ? 'text-[var(--income)]' : 'text-[var(--text-main)]'}`}>
                Automático
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-[color-mix(in_srgb,var(--warning)_20%,transparent)] bg-[var(--warning-muted)] text-[var(--warning)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] animate-pulse"></span> Manual
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center gap-3">
        <button onClick={onClose} className="flex-1 py-3.5 rounded-xl text-sm font-semibold border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--bg-elevated)] transition-all">Cancelar</button>
        <button disabled={!isFormValid || isSaving} onClick={onSubmit}
          className={`flex flex-[2] items-center justify-center py-3.5 rounded-xl text-sm font-bold shadow-md transition-all text-white bg-gradient-to-tr from-[var(--accent)] to-[#9333EA]
            ${!isFormValid || isSaving ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90 active:scale-[0.98]'}`}>
          {isSaving ? 'Salvando...' : <span>{isEditing ? 'Confirmar' : 'Adicionar'}</span>}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. APLICAÇÃO (App)
// ==========================================

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isOpen, setIsOpen] = useState(false);

  // Aplica o tema na tag HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { wallets, form, handleOnChange, changeType, changeRecurrenceType, changeCustomSelectWallet, saveOrUpdate, isSaving } = useRecurrenceModal('DEBIT', () => setIsOpen(false));

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-6" style={{ background: 'var(--bg-base)' }}>
      
      {/* Botões de Ação na página principal */}
      <div className="flex gap-4">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-6 py-3 rounded-xl font-bold bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-main)] shadow-sm hover:border-[var(--border-hover)] transition-all cursor-pointer"
        >
          Alternar para Tema {theme === 'dark' ? 'Claro' : 'Escuro'}
        </button>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Nova Recorrência
        </button>
      </div>

      {/* MODAL DE RECORRÊNCIA */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in-up">
          {/* Overlay Escuro */}
          <div className="absolute inset-0 backdrop-blur-sm transition-opacity" style={{ background: 'rgba(0, 0, 0, 0.6)' }} onClick={() => setIsOpen(false)} />

          {/* Container do Modal */}
          <div className="relative w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in max-h-[95vh] flex flex-col lg:flex-row overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)]">
            
            <RecurrenceForm
              isEditing={false}
              handleOnChange={handleOnChange}
              onTypeChange={changeType}
              onRecurrenceTypeChange={changeRecurrenceType}
              form={form}
              onWalletChange={changeCustomSelectWallet}
              type={form.type}
              amountStr={form.amount}
              wallet={form.wallet}
              wallets={wallets}
              onClose={() => setIsOpen(false)}
            />

            <RecurrencePreviewCard
              isEditing={false}
              form={form}
              onClose={() => setIsOpen(false)}
              onSubmit={saveOrUpdate}
              isSaving={isSaving}
            />

          </div>
        </div>
      )}
    </div>
  );
}