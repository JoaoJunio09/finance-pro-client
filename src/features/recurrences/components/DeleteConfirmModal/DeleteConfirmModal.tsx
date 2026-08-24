import { AlertTriangle } from 'lucide-react';
import type { Recurrence } from '../../types/recurrence';

import styles from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (recurrence: Recurrence) => void;
  recurrence: Recurrence | null;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, recurrence }: DeleteConfirmModalProps) {
  if (!isOpen || !recurrence) return null;

  const handleConfirm = () => {
    onConfirm(recurrence);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className={`absolute inset-0 ${styles.overlay}`} onClick={onClose}></div>

      {/* Modal Container */}
      <div className={`relative w-full max-w-sm rounded-3xl overflow-hidden flex flex-col ${styles.modal}`}>
        
        {/* Corpo do Modal */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${styles.iconWrapper}`}>
            <AlertTriangle size={28} />
          </div>
          
          <h2 className={`text-lg font-bold mb-2 ${styles.title}`}>
            Excluir recorrência?
          </h2>
          
          <p className={`text-sm ${styles.description}`}>
            Tem certeza que deseja excluir a recorrência <span className={styles.highlight}>"{recurrence.title}"</span>? 
            Esta ação removerá o agendamento futuro e não pode ser desfeita.
          </p>
        </div>

        {/* Rodapé com as Ações */}
        <div className={`px-6 py-4 flex items-center gap-3 ${styles.footer}`}>
          <button 
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold ${styles.btnCancel}`}
          >
            Cancelar
          </button>
          <button 
            onClick={handleConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold ${styles.btnDelete}`}
          >
            Sim, excluir
          </button>
        </div>

      </div>
    </div>
  );
}