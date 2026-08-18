import React from 'react';
import { DollarSign, Plus } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onAdd: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAdd }) => (
  <div className={`rounded-3xl p-12 text-center flex flex-col items-center justify-center my-6 ${styles.container}`}>
    
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 ${styles.iconWrapper}`}>
      <DollarSign size={32} />
    </div>
    
    <h3 className={`text-lg font-bold mb-1 ${styles.title}`}>
      Nenhuma transação encontrada
    </h3>
    
    <p className={`text-sm max-w-sm mb-6 ${styles.description}`}>
      Não encontramos registros com os filtros selecionados ou você ainda não possui transações cadastradas neste período.
    </p>
    
    <button
      onClick={onAdd}
      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${styles.addButton}`}
    >
      <Plus size={18} />
      <span>Criar primeira transação</span>
    </button>
    
  </div>
);