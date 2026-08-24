import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './RecurrencesFilterDrawer.module.css';
import type { RecurrenceFrequency, RecurrenceStatus, RecurrenceType } from '../../types/recurrence';

export interface RecurrenceFilters {
  type: RecurrenceType | 'ALL';
  status: RecurrenceStatus | 'ALL';
  frequency: RecurrenceFrequency | 'ALL';
}

interface RecurrencesFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: RecurrenceFilters;
  onApplyFilters: (filters: RecurrenceFilters) => void;
  onClearFilters: () => void;
}

export function RecurrencesFiltersDrawer({
  isOpen,
  onClose,
  currentFilters,
  onApplyFilters,
  onClearFilters
}: RecurrencesFiltersDrawerProps) {
  
  // Estado local para gerenciar as seleções antes de aplicar
  const [localFilters, setLocalFilters] = useState<RecurrenceFilters>(currentFilters);

  // Sincroniza o estado local quando o drawer é aberto
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    onClearFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay clicável para fechar */}
      <div 
        className={`absolute inset-0 transition-opacity ${styles.overlay}`}
        onClick={onClose}
      />

      {/* Container do Drawer */}
      <div className={`relative w-full max-w-sm h-full flex flex-col transform transition-transform duration-300 ease-in-out ${styles.drawer}`}>
        
        {/* Cabeçalho */}
        <div className={`flex items-center justify-between p-6 ${styles.header}`}>
          <h2 className={`text-lg font-bold ${styles.title}`}>Filtros</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${styles.label}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo (Formulário) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${styles.label}`}>Tipo de Lançamento</label>
            <div className={`rounded-xl px-3 py-2 ${styles.selectWrapper}`}>
              <select 
                value={localFilters.type}
                onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value as any })}
                className={`w-full text-sm outline-none ${styles.select}`}
              >
                <option value="ALL">Todos os tipos</option>
                <option value="CREDIT">Receitas (+)</option>
                <option value="DEBIT">Despesas (-)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${styles.label}`}>Status</label>
            <div className={`rounded-xl px-3 py-2 ${styles.selectWrapper}`}>
              <select 
                value={localFilters.status}
                onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value as any })}
                className={`w-full text-sm outline-none ${styles.select}`}
              >
                <option value="ALL">Todos os status</option>
                <option value="ACTIVE">Ativo</option>
                <option value="PAUSED">Pausado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-semibold ${styles.label}`}>Frequência</label>
            <div className={`rounded-xl px-3 py-2 ${styles.selectWrapper}`}>
              <select 
                value={localFilters.frequency}
                onChange={(e) => setLocalFilters({ ...localFilters, frequency: e.target.value as any })}
                className={`w-full text-sm outline-none ${styles.select}`}
              >
                <option value="ALL">Todas as frequências</option>
                <option value="MONTHLY">Mensal</option>
                <option value="WEEKLY">Semanal</option>
                <option value="YEARLY">Anual</option>
              </select>
            </div>
          </div>

        </div>

        {/* Rodapé (Ações) */}
        <div className={`p-6 flex items-center gap-3 ${styles.footer}`}>
          <button 
            onClick={handleClear}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold ${styles.btnSecondary}`}
          >
            Limpar
          </button>
          <button 
            onClick={handleApply}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold ${styles.btnPrimary}`}
          >
            Aplicar
          </button>
        </div>

      </div>
    </div>
  );
}