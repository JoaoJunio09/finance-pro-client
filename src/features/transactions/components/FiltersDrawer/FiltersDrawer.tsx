import { ArrowUpDown, Check, CheckCircle2, Filter, SlidersHorizontal, Tag, Wallet, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CategoryResponse } from '../../../../models/category/CategoryResponse';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import type { SortOption, TransactionStatusFilter, TransactionTypeFilter } from '../../utils/Filter';
import styles from './FiltersDrawer.module.css';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wallets: WalletResponse[];
  categories: CategoryResponse[];
  typeFilter: TransactionTypeFilter;
  statusFilter: TransactionStatusFilter;
  walletFilter: string;
  categoryFilter: string;
  sortBy: SortOption;
  onApplyFilters: (filters: { type: TransactionTypeFilter; status: TransactionStatusFilter; wallet: string; category: string; sort: SortOption }) => void;
  onClearFilters: () => void;
}

export const FiltersDrawer = ({
  isOpen,
  onClose,
  wallets,
  categories,
  typeFilter, 
  statusFilter, 
  walletFilter, 
  categoryFilter, 
  sortBy,
  onApplyFilters, 
  onClearFilters
}: FiltersDrawerProps) => {
  const [localType, setLocalType] = useState<TransactionTypeFilter>(typeFilter);
  const [localStatus, setLocalStatus] = useState(statusFilter);
  const [localWallet, setLocalWallet] = useState(walletFilter);
  const [localCategory, setLocalCategory] = useState(categoryFilter);
  const [localSort, setLocalSort] = useState<SortOption>(sortBy);

  // Estados para gerenciar a animação de entrada/saída
  const [isVisible, setIsVisible] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setLocalType(typeFilter);
      setLocalStatus(statusFilter);
      setLocalWallet(walletFilter);
      setLocalCategory(categoryFilter);
      setLocalSort(sortBy);
      
      setRenderDrawer(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setRenderDrawer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, typeFilter, statusFilter, walletFilter, categoryFilter, sortBy]);

  if (!renderDrawer) return null;

  const handleApply = () => {
    onApplyFilters({
      type: localType,
      status: localStatus,
      wallet: localWallet,
      category: localCategory,
      sort: localSort
    });
    onClose();
  };

  const handleClear = () => {
    onClearFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles.overlay} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`relative w-full h-full sm:max-w-[450px] shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:border-l ${styles.drawerPanel} ${
        isVisible 
          ? 'translate-y-0 translate-x-0' 
          : 'translate-y-full translate-x-0 sm:translate-y-0 sm:translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 pb-2 shrink-0 relative">
          <h3 className={`text-lg font-bold flex items-center gap-2 ${styles.textMain}`}>
            <Filter size={20} className={styles.textAccent} />
            <span>Filtros Avançados</span>
          </h3>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-xl relative z-10 ${styles.closeBtn}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          {/* Filtro: Tipo */}
          <div>
            <label className={`text-xs font-bold flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <ArrowUpDown size={14} /> Tipo de Transação
            </label>
            <select
              value={localType}
              onChange={(e) => setLocalType(e.target.value as TransactionTypeFilter)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.selectField}`}
            >
              <option value="all">Todos os Tipos</option>
              <option value="income">Receita (Entradas)</option>
              <option value="expense">Despesa (Saídas)</option>
            </select>
          </div>

          {/* Filtro: Status */}
          <div>
            <label className={`text-xs font-bold flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <CheckCircle2 size={14} /> Status
            </label>
            <select
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value as TransactionStatusFilter)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.selectField}`}
            >
              <option value="all">Todos os Status</option>
              <option value="paid">Paga / Efetivada</option>
              <option value="pending">Pendente</option>
            </select>
          </div>

          {/* Filtro: Carteira */}
          <div>
            <label className={`text-xs font-bold flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <Wallet size={14} /> Carteira / Instituição
            </label>
            <select
              value={localWallet}
              onChange={(e) => setLocalWallet(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.selectField}`}
            >
              <option value="all">Todas as Carteiras</option>
              {wallets.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.bank?.name})</option>
              ))}
            </select>
          </div>

          {/* Filtro: Categoria */}
          <div>
            <label className={`text-xs font-bold flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <Tag size={14} /> Categoria
            </label>
            <select
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.selectField}`}
            >
              <option value="all">Todas as Categorias</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Ordenação */}
          <div className="pt-2 border-t border-[var(--border-color)]">
            <label className={`text-xs font-bold flex items-center gap-2 mb-2.5 mt-2 ${styles.textMuted}`}>
              <SlidersHorizontal size={14} /> Ordenar Por
            </label>
            <select
              value={localSort}
              onChange={(e) => setLocalSort(e.target.value as SortOption)}
              className={`w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.selectField}`}
            >
              <option value="recent">Mais recentes</option>
              <option value="oldest">Mais antigas</option>
              <option value="highest">Maior valor</option>
              <option value="lowest">Menor valor</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className={`p-6 border-t flex flex-col sm:flex-row items-center gap-3 shrink-0 ${styles.footer}`}>
          <button 
            onClick={handleClear}
            className={`w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border text-sm font-bold ${styles.btnSecondary}`}
          >
            Limpar
          </button>
          <button 
            onClick={handleApply}
            className={`w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 ${styles.btnPrimary}`}
          >
            <Check size={18} />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};