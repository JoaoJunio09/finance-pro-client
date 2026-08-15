import React, { useState, useEffect } from 'react';
import { X, Eye } from 'lucide-react';
import { AVAILABLE_BANKS } from '../../mocks/wallets';
import styles from './WalletFormModal.module.css';
import type { Wallet, WalletType } from '../../types/wallet';
import { WalletCard } from '../WalletCard/WalletCard';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (wallet: Wallet) => void;
  initialData?: Wallet | null;
}

// Catálogo de cores expandido
const AVAILABLE_COLORS = [
  { id: 'purple', class: 'bg-[#7C3AED]' },
  { id: 'indigo', class: 'bg-[#4F46E5]' },
  { id: 'blue', class: 'bg-[#2563EB]' },
  { id: 'cyan', class: 'bg-[#0891B2]' },
  { id: 'teal', class: 'bg-[#0D9488]' },
  { id: 'emerald', class: 'bg-[#10B981]' },
  { id: 'green', class: 'bg-[#059669]' },
  { id: 'lime', class: 'bg-[#65A30D]' },
  { id: 'yellow', class: 'bg-[#FACC15]' },
  { id: 'amber', class: 'bg-[#D97706]' },
  { id: 'orange', class: 'bg-[#EA580C]' },
  { id: 'red', class: 'bg-[#DC2626]' },
  { id: 'rose', class: 'bg-[#E11D48]' },
  { id: 'pink', class: 'bg-[#DB2777]' },
  { id: 'neutral', class: 'bg-[#3F3F46]' },
];

export const WalletFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [formData, setFormData] = useState<Partial<Wallet>>({
    name: '',
    bank: 'Nubank',
    type: 'checking',
    balance: 0,
    description: '',
    colorScheme: 'purple'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) setFormData(initialData);
      else setFormData({ name: '', bank: 'Nubank', type: 'checking', balance: 0, description: '', colorScheme: 'purple' });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'balance' ? Number(value) || 0 : value 
    }));
  };

  const previewWallet: Wallet = {
    id: 'preview',
    name: formData.name || 'Nova Carteira',
    bank: formData.bank || 'Banco',
    type: (formData.type as WalletType) || 'checking',
    balance: formData.balance || 0,
    colorScheme: formData.colorScheme as any || 'purple'
  };

  const isEditing = !!initialData;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div className={`absolute inset-0 ${styles.modalBackdrop}`} onClick={onClose} />
      
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[1.5rem] shadow-2xl w-full max-w-[880px] max-h-[90dvh] lg:h-[600px] overflow-hidden flex flex-col lg:flex-row relative z-10 animate-scale-in">
        {/* Contêiner restrito a max-h-[90vh] e com bordas arredondadas para manter o aspecto de modal no mobile */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-[1.5rem] shadow-2xl w-full max-w-[880px] max-h-[95vh] lg:h-[600px] overflow-hidden flex flex-col lg:flex-row relative z-10 animate-scale-in">
          
          {/* Lado Esquerdo: Formulário (Ocupa o espaço restante e rola) */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-hide">
            <div className={`flex items-center justify-between pb-4 border-b shrink-0 ${styles.header}`}>
              <h2 className={`text-xl font-bold tracking-tight ${styles.title}`}>
                {isEditing ? 'Editar carteira' : 'Nova carteira'}
              </h2>
              <button onClick={onClose} className={`p-2 rounded-full transition-colors focus:outline-none ${styles.closeBtn}`} type="button">
                <X size={20} />
              </button>
            </div>

            <form className="flex flex-col gap-5 pb-2">
              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Nome da Carteira</label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Ex: Reserva de Emergência"
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Instituição/Banco</label>
                  <select 
                    name="bank" value={formData.bank} onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none appearance-none ${styles.textInput}`}
                  >
                    {AVAILABLE_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Tipo</label>
                  <select 
                    name="type" value={formData.type} onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none appearance-none ${styles.textInput}`}
                  >
                    <option value="checking">Conta Corrente</option>
                    <option value="savings">Conta Poupança</option>
                    <option value="credit_card">Cartão de Crédito</option>
                    <option value="reserve">Reserva de Emergência</option>
                    <option value="investment">Investimentos</option>
                    <option value="physical">Dinheiro Físico</option>
                    <option value="other">Outra</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Saldo Inicial (R$)</label>
                <input 
                  type="number" name="balance" value={formData.balance} onChange={handleChange}
                  step="0.01"
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Cor / Tema</label>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {AVAILABLE_COLORS.map((color) => (
                    <button
                      key={color.id} type="button"
                      onClick={() => setFormData(p => ({ ...p, colorScheme: color.id as any }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color.class} ${formData.colorScheme === color.id ? 'border-[var(--text-main)] scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      title={color.id}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Descrição (Opcional)</label>
                <input 
                  type="text" name="description" value={formData.description} onChange={handleChange}
                  placeholder="Ex: Conta para gastos diários"
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
                />
              </div>
            </form>
          </div>

          {/* Lado Direito: Preview & Actions (shrink-0 garante que o painel não achate) */}
          <div className={`w-full lg:w-[380px] shrink-0 border-t lg:border-t-0 lg:border-l p-6 sm:p-8 flex flex-col ${styles.panel}`}>
            
            <h3 className={`text-sm font-bold mb-6 flex items-center gap-2 ${styles.panelTitle}`}>
              <Eye size={18} className={styles.panelTitleIcon} /> Pré-visualização
            </h3>

            <div className="mt-auto mb-auto lg:mt-0 lg:mb-0 w-full flex justify-center">
              <div className="w-full">
                <WalletCard wallet={previewWallet} isPreview={true} />
              </div>
            </div>

            <div className="mt-8 lg:mt-auto pt-6 flex items-center gap-3">
              <button 
                onClick={onClose} 
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold border transition-all focus:outline-none ${styles.cancelBtn}`} 
                type="button"
              >
                Cancelar
              </button>
              
              <button 
                onClick={() => {
                  onSave(previewWallet);
                  onClose();
                }}
                disabled={!formData.name}
                className={`flex flex-[2] items-center justify-center py-3.5 rounded-xl text-sm font-bold shadow-md transition-all focus:outline-none
                  ${styles.submitBtn}
                  ${!formData.name ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-[0.98]'}
                `}
              >
                {isEditing ? 'Salvar carteira' : 'Adicionar carteira'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body // Anexa o modal diretamente no body da página
  );
};