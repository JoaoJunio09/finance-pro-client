import React from 'react';
import { AlertCircle } from 'lucide-react';

import styles from './DeleteConfirmModal.module.css';
import type { Wallet } from '../../types/wallet';

interface Props {
  isOpen: boolean;
  wallet: Wallet | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<Props> = ({ isOpen, wallet, onClose, onConfirm }) => {
  if (!isOpen || !wallet) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className={`w-full max-w-sm p-6 relative z-10 text-center flex flex-col items-center rounded-3xl shadow-2xl border animate-scale-in ${styles.modalContent}`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${styles.iconWrapper}`}>
          <AlertCircle size={28} />
        </div>
        
        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Excluir carteira?</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Essa ação removerá a carteira <strong className="text-[var(--text-main)]">{wallet.name}</strong> e suas informações associadas.
        </p>
        
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-elevated)] text-[var(--text-main)] font-semibold hover:bg-[var(--border-color)] transition-colors">
            Cancelar
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-[var(--expense)] text-white font-semibold hover:bg-[#B91C1C] transition-colors shadow-sm">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};