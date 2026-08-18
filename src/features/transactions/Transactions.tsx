import { FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteConfirmModal } from './components/DeleteConfirmModal/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState/EmptyState';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { SummaryCards } from './components/SummaryCard/SummaryCard';
import { TransactionDetailsDrawer } from './components/TransactionDetailsDrawer/TransactionDetailsDrawer';
import { TransactionItemRow } from './components/TransactionItemRow/TransactionItemRow';
import { TransactionModal } from './components/TransactionModal/TransactionModal';
import { TransactionsHeader } from './components/TransactionsHeader/TransactionsHeader';
import { TransactionsToolbar } from './components/TransactionsToolbar/TransactionsToolbar';
import type { ActiveTab, SortOption, Transaction } from './types/transaction';

import styles from './Transactions.module.css';
import useTransactions from './hooks/useTransactions';
import type { TransactionResponse } from '../../models/transaction/TransactionResponse';

export default function TransactionsPage() {  
  // Estados de Dados e Filtros
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5, 1));
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [walletFilter, setWalletFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Estados de UI (Modais e Drawers)
  const [selectedTx, setSelectedTx] = useState<TransactionResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deletingTx, setDeletingTx] = useState<Transaction | null>(null);

  const {
    transactions,
    summaryCard,
    search,
    setSearch
  } = useTransactions();

  // Lógica de Filtro e Ordenação
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (search.trim() !== '') {
        const query = search.toLowerCase();
        const matchesDesc = tx.description.toLowerCase().includes(query);
        if (!matchesDesc) return false;
      }

      if (activeTab === 'income' && tx.type !== 'CREDIT') return false;
      if (activeTab === 'expense' && tx.type !== 'DEBIT') return false;
      if (activeTab === 'pending' && tx.status !== 'PENDING') return false;

      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
      if (sortBy === 'oldest') return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, activeTab, typeFilter, statusFilter, search]);

  // Handlers
  // const handleResetFilters = () => {
  //   setSearchQuery('');
  //   setTypeFilter('all');
  //   setStatusFilter('all');
  //   setWalletFilter('all');
  //   setCategoryFilter('all');
  //   setSortBy('recent');
  //   setActiveTab('all');
  // };

  // const handleSaveTransaction = (data: Omit<Transaction, 'id'>) => {
  //   if (editingTx) {
  //     setTransactions(prev => prev.map(t => t.id === editingTx.id ? { ...data, id: editingTx.id } : t));
  //   } else {
  //     setTransactions(prev => [{ ...data, id: `tx-${Date.now()}` }, ...prev]);
  //   }
  // };

  // const handleDeleteConfirm = () => {
  //   if (!deletingTx) return;
  //   setTransactions(prev => prev.filter(t => t.id !== deletingTx.id));
  //   if (selectedTx?.id === deletingTx.id) setSelectedTx(null);
  // };

  return (
    <div className={`h-full w-full transition-colors duration-300 ${styles.pageContainer}`}>
      <div className={`w-full relative shadow-md overflow-hidden ${styles.headerBackground}`}>
        <div className={`absolute inset-0 opacity-20 pointer-events-none ${styles.patternOverlay}`}></div>
        <TransactionsHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          onOpenAddModal={() => { setEditingTx(null); setIsModalOpen(true); }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up">
        <SummaryCards summary={summaryCard} />

        <TransactionsToolbar
          searchQuery={search}
          setSearchQuery={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          walletFilter={walletFilter}
          setWalletFilter={setWalletFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onResetFilters={() => {}}
          onOpenFilters={() => setIsFilterDrawerOpen(true)}
        />

        <div className={`rounded-3xl p-4 sm:p-6 shadow-sm ${styles.listContainer}`}>          
          <div className={`flex items-center justify-between mb-4 pb-3 ${styles.listHeader}`}>
            <h2 className={`text-base font-bold flex items-center gap-2 ${styles.listTitle}`}>
              <FileText size={18} className={styles.accentIcon} />
              <span>Listagem de Transações</span>
            </h2>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles.countBadge}`}>
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>

          {filteredTransactions.length === 0 ? (
            <EmptyState onAdd={() => { setEditingTx(null); setIsModalOpen(true); }} />
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTransactions.map((tx) => (
                <TransactionItemRow
                  key={tx.id}
                  transaction={tx}
                  onSelect={(tx) => setSelectedTx(tx)}
                  onConfirm={() => {}}
                />
              ))}
            </div>
          )}

          {/* Controles de Paginação
          {filteredTransactions.length > itemsPerPage && (
            <div className={`flex items-center justify-between mt-6 pt-4 ${styles.paginationContainer}`}>
              <span className={`text-xs ${styles.pageInfo}`}>
                Página {currentPage} de {totalPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`p-2 rounded-xl transition-colors ${styles.pageButton}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`p-2 rounded-xl transition-colors ${styles.pageButton}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )} */}
        </div>
      </main>

      <FiltersDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        walletFilter={walletFilter}
        categoryFilter={categoryFilter}
        sortBy={sortBy}
        onApplyFilters={(filters) => {
          setTypeFilter(filters.type);
          setStatusFilter(filters.status);
          setWalletFilter(filters.wallet);
          setCategoryFilter(filters.category);
          setSortBy(filters.sort);
        }}
        onClearFilters={() => {}}
      />

      <TransactionDetailsDrawer
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
        onEdit={(tx) => { {}; setIsModalOpen(true); }}
        onDelete={(tx) => {}}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTx(null); }}
        onSave={() => {}}
        initialData={editingTx}
      />

      <DeleteConfirmModal
        isOpen={!!deletingTx}
        onClose={() => setDeletingTx(null)}
        onConfirm={() => {}}
        transaction={deletingTx}
      />
    </div>
  );
}