import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './RecurrencesToolbar.module.css';
import type { SortOption } from '../../types/recurrence';

interface RecurrencesToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export const RecurrencesToolbar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }: RecurrencesToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
      
      {/* Campo de Busca */}
      <div className="relative w-full sm:w-96 group">
        <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 ${styles.searchIcon}`}>
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Buscar por descrição..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-0 ${styles.searchInput} ${styles.searchPlaceholder}`}
        />
      </div>

      {/* Select de Ordenação */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${styles.sortSelect} ${styles.sortIcon}`}>
          <SlidersHorizontal size={18} />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:ring-0 transition-colors ${styles.sortSelect}`}
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236B7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', 
            backgroundPosition: 'right 0.75rem center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: '1.25em 1.25em', 
            paddingRight: '2.5rem' 
          }}
        >
          <option value="nextDate">Próximo Vencimento</option>
          <option value="highest">Maior Valor</option>
          <option value="lowest">Menor Valor</option>
          <option value="recent">Adicionadas Recentemente</option>
          <option value="oldest">Mais Antigas</option>
        </select>
      </div>
      
    </div>
  );
};