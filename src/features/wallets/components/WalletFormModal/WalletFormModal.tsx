import { Eye, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AVAILABLE_BANKS } from '../../mocks/wallets';
import type { Wallet } from '../../types/wallet';
import { WalletCard } from '../WalletCard/WalletCard';

import styles from './WalletFormModal.module.css';
import type { WalletFormData } from '../../types/WalletFormData';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import type { WalletType } from '../../../../types/WalletType';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (wallet: Wallet) => void;
  initialData?: Wallet | null;
}

// Catálogo de cores expandido
const AVAILABLE_COLORS = [
  { id: 'purple', value: '#7C3AED' },
  { id: 'indigo', value: '#4F46E5' },
  { id: 'blue', value: '#2563EB' },
  { id: 'cyan', value: '#0891B2' },
  { id: 'teal', value: '#0D9488' },
  { id: 'emerald', value: '#10B981' },
  { id: 'green', value: '#059669' },
  { id: 'lime', value: '#65A30D' },
  { id: 'yellow', value: '#FACC15' },
  { id: 'amber', value: '#D97706' },
  { id: 'orange', value: '#EA580C' },
  { id: 'red', value: '#DC2626' },
  { id: 'rose', value: '#E11D48' },
  { id: 'pink', value: '#DB2777' },
  { id: 'neutral', value: '#3F3F46' },
];

interface WalletFormModalProps {
  isOpen: boolean
  onClose: () => void;
  onSave: () => void;
  form: WalletFormData,
  selectColor: (color: string) => void;
}

function WalletFormModal({
  isOpen,
  onClose,
  onSave,
  form,
  selectColor
}: WalletFormModalProps) {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // const { name, value } = e.target;
    // setFormData(prev => ({ 
    //   ...prev, 
    //   [name]: name === 'balance' ? Number(value) || 0 : value 
    // }));
  };

  const previewWallet: WalletResponse = {
    id: 'preview',
    name: form.name || 'Nova Carteira',
    description: form.description,
    bank: form.bank || undefined,
    type: (form.type as WalletType) || 'checking',
    balance: Number(form.balance) || 0,
    cardDigits: '',
    color: form.color as any || 'purple'
  };

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
                {false ? 'Editar carteira' : 'Nova carteira'}
              </h2>
              <button onClick={onClose} className={`p-2 rounded-full transition-colors focus:outline-none ${styles.closeBtn}`} type="button">
                <X size={20} />
              </button>
            </div>

            <form className="flex flex-col gap-5 pb-2">
              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Nome da Carteira</label>
                <input 
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Ex: Reserva de Emergência"
                  className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none ${styles.textInput}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Instituição/Banco</label>
                  <select 
                    name="bank" value={form.bank?.name} onChange={handleChange}
                    className={`w-full rounded-xl px-4 py-3.5 text-sm transition-all shadow-sm border focus:outline-none appearance-none ${styles.textInput}`}
                  >
                    {AVAILABLE_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Tipo</label>
                  <select 
                    name="type" value={form.type} onChange={handleChange}
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
                  type="number" name="balance" value={form.balance} onChange={handleChange}
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
                      onClick={() => selectColor(color.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === color.id ? 'border-[var(--text-main)] scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      style={{
                        background: color.value
                      }}
                      title={color.id}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={`text-xs font-semibold ml-1 ${styles.fieldLabel}`}>Descrição (Opcional)</label>
                <input 
                  type="text" name="description" value={form.description} onChange={handleChange}
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
                  // onSave(previewWallet);
                  onClose();
                }}
                disabled={!form.name}
                className={`flex flex-[2] items-center justify-center py-3.5 rounded-xl text-sm font-bold shadow-md transition-all focus:outline-none
                  ${styles.submitBtn}
                  ${!form.name ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-[0.98]'}
                `}
              >
                {false ? 'Salvar carteira' : 'Adicionar carteira'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body // Anexa o modal diretamente no body da página
  );
};

export default WalletFormModal;