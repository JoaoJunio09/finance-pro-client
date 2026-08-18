import { Filter, Search, X } from 'lucide-react';
import type { SortOption } from '../../types/transaction';
import styles from './TransactionsToolbar.module.css';

interface TransactionsToolbarProps {
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  typeFilter: string;
  setTypeFilter: (t: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  walletFilter: string;
  setWalletFilter: (w: string) => void;
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  onResetFilters: () => void;
  onOpenFilters: () => void;
}

export const TransactionsToolbar = ({
  searchQuery, 
  setSearchQuery,
  typeFilter, 
  statusFilter, 
  walletFilter, 
  categoryFilter, 
  sortBy, 
  onOpenFilters
}: TransactionsToolbarProps) => {
  
  // Verifica se há algum filtro ativo para exibir o pontinho indicador no botão
  const hasActiveFilters = 
    typeFilter !== 'all' || 
    statusFilter !== 'all' || 
    walletFilter !== 'all' || 
    categoryFilter !== 'all' || 
    sortBy !== 'recent';

  return (
    <div className={`rounded-2xl p-4 mb-6 shadow-sm border ${styles.container}`}>
      <div className="flex items-center gap-3">
        
        {/* Barra de Pesquisa */}
        <div className="relative flex-1">
          <Search 
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${styles.iconMuted}`} 
            size={18} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar transações..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all border ${styles.inputField}`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${styles.clearButton}`}
              title="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Botão de Filtros */}
        <button
          onClick={onOpenFilters}
          className={`relative flex items-center justify-center w-[42px] h-[42px] rounded-xl transition-all shrink-0 shadow-sm border ${styles.filterButton}`}
          aria-label="Filtros"
          title="Filtros"
        >
          <Filter size={18} />
          {hasActiveFilters && (
            <span className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 ${styles.filterBadge}`} />
          )}
        </button>

      </div>
    </div>
  );
};