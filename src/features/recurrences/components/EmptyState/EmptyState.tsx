import { AlertCircle } from 'lucide-react';
import styles from './EmptyState.module.css';

export const EmptyRecurrencesState = () => {
  return (
    <div className={`${styles.surface} rounded-3xl p-12 text-center flex flex-col items-center`}>
      <div className={`w-16 h-16 rounded-full ${styles.badgeAccent} flex items-center justify-center mb-4`}>
        <AlertCircle size={28} />
      </div>
      <h3 className={`font-heading font-semibold text-lg ${styles.textMain} mb-1`}>Nenhuma recorrência encontrada</h3>
      <p className={`font-body text-sm ${styles.textMuted}`}>Ajuste os filtros ou crie uma nova recorrência.</p>
    </div>
  );
};