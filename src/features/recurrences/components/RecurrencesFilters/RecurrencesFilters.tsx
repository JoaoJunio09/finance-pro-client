import React, { useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import styles from './RecurrencesFilters.module.css';
import type { FiltersState } from '../../types/recurrence';

export interface RecurrencesFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  onFilterChange: (key: keyof FiltersState, value: string) => void;
  onClearFilters: () => void;
}

const FILTER_CONFIG = {
  type: {
    label: 'Tipo de Transação',
    options: [
      { label: 'Todos', value: 'ALL' },
      { label: 'Receitas', value: 'INCOME' },
      { label: 'Despesas', value: 'EXPENSE' },
    ],
  },
  status: {
    label: 'Status da Assinatura',
    options: [
      { label: 'Todos', value: 'ALL' },
      { label: 'Ativos', value: 'ACTIVE' },
      { label: 'Pausados', value: 'PAUSED' },
      { label: 'Finalizados', value: 'ENDED' },
    ],
  },
  frequency: {
    label: 'Frequência',
    options: [
      { label: 'Todas', value: 'ALL' },
      { label: 'Mensal', value: 'MONTHLY' },
      { label: 'Anual', value: 'YEARLY' },
      { label: 'Semanal', value: 'WEEKLY' },
      { label: 'Diário', value: 'DAILY' },
    ],
  },
};

export const RecurrencesFilters: React.FC<RecurrencesFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  // Trava o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const hasActiveFilters = 
    filters.type !== 'ALL' || 
    filters.status !== 'ALL' || 
    filters.frequency !== 'ALL';

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros avançados"
      >
        <header className={`flex items-center justify-between p-6 ${styles.header}`}>
          <h2 className={`font-body text-xl font-semibold m-0 ${styles.title}`}>
            Filtros
          </h2>
          <button
            onClick={onClose}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${styles.closeButton}`}
            aria-label="Fechar filtros"
          >
            <X size={20} />
          </button>
        </header>

        <div className={`p-6 flex flex-col gap-8 ${styles.content}`}>
          {(Object.keys(FILTER_CONFIG) as Array<keyof FiltersState>).map((filterKey) => (
            <section key={filterKey} className="flex flex-col gap-3">
              <h3 className={`font-body text-sm font-medium uppercase tracking-wider ${styles.sectionTitle}`}>
                {FILTER_CONFIG[filterKey].label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {FILTER_CONFIG[filterKey].options.map((option) => {
                  const isSelected = filters[filterKey] === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange(filterKey, option.value)}
                      className={`font-body px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isSelected ? styles.pillSelected : styles.pillUnselected
                      }`}
                      aria-pressed={isSelected}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <footer className={`p-6 mt-auto ${styles.footer}`}>
          <button
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className={`w-full flex items-center justify-center gap-2 font-body px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${styles.clearAllButton}`}
          >
            <Trash2 size={16} />
            Limpar Filtros
          </button>
        </footer>
      </aside>
    </>
  );
};