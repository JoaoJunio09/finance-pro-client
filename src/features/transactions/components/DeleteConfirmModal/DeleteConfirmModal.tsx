import { Trash2 } from 'lucide-react';
import React from 'react';
import type { Transaction } from '../../types/transaction';
import styles from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transaction: Transaction | null;
}

// Helper local para formatar o valor (pode ser movido para utils/formatters.ts no futuro)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  transaction
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay Escurecido */}
      <div className={`fixed inset-0 animate-fade-in ${styles.overlay}`} onClick={onClose} />

      {/* Container Principal */}
      <div className={`relative w-full max-w-md p-6 rounded-3xl shadow-2xl z-10 animate-scale-in text-center ${styles.modalContainer}`}>
        
        {/* Ícone Lixeira */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${styles.iconWrapper}`}>
          <Trash2 size={24} />
        </div>

        {/* Textos */}
        <h3 className={`text-lg font-bold mb-1 ${styles.title}`}>
          Excluir transação?
        </h3>

        <p className={`text-xs leading-relaxed mb-6 ${styles.description}`}>
          Tem certeza de que deseja remover <strong className={styles.highlight}>"{transaction.description}"</strong> no valor de <strong className={styles.highlight}>{formatCurrency(transaction.amount)}</strong>? Esta ação não poderá ser desfeita.
        </p>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors ${styles.cancelButton}`}
          >
            Cancelar
          </button>
          
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-opacity shadow-sm ${styles.deleteButton}`}
          >
            Excluir
          </button>
        </div>

      </div>
    </div>
  );
};