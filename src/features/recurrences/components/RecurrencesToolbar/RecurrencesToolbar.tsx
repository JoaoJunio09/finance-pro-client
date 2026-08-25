import { Search, X, Filter } from 'lucide-react';
import type { FiltersState } from '../../types/recurrence';
import styles from './RecurrencesToolbar.module.css';

interface RecurrencesToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FiltersState;
  onOpenFilters: () => void;
}

export const RecurrencesToolbar = ({
  searchQuery,
  setSearchQuery,
  filters,
  onOpenFilters
}: RecurrencesToolbarProps) => {
  const hasActiveFilters =
    filters.type !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.frequency !== 'ALL';

  return (
    <div className={`${styles.surface} rounded-2xl p-4 shadow-sm border ${styles.borderDefault}`}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${styles.textMuted}`}
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por nome ou categoria..."
            className={`font-body w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-normal focus:outline-none transition-all border ${styles.elevated} ${styles.borderLight} ${styles.textMain} ${styles.focusAccent} ${styles.placeholderMuted}`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${styles.textMuted} ${styles.hoverTextMain} transition-colors cursor-pointer`}
              title="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          onClick={onOpenFilters}
          className={`relative flex items-center justify-center w-[42px] h-[42px] rounded-xl transition-all shrink-0 shadow-sm border ${styles.elevated} ${styles.borderLight} ${styles.textMain} ${styles.hoverAccent} cursor-pointer`}
          aria-label="Filtros"
          title="Filtros"
        >
          <Filter size={18} />
          {hasActiveFilters && (
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-elevated bg-[var(--accent)]" />
          )}
        </button>
      </div>
    </div>
  );
};