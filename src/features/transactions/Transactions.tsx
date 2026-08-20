import { FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteConfirmModal } from './components/DeleteConfirmModal/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState/EmptyState';
import { FiltersDrawer } from './components/FiltersDrawer/FiltersDrawer';
import { SummaryCards } from './components/SummaryCard/SummaryCard';
import { TransactionDetailsDrawer } from './components/TransactionDetailsDrawer/TransactionDetailsDrawer';
import { TransactionItemRow } from './components/TransactionItemRow/TransactionItemRow';
import { TransactionsHeader } from './components/TransactionsHeader/TransactionsHeader';
import { TransactionsToolbar } from './components/TransactionsToolbar/TransactionsToolbar';
import type { ActiveTab } from './types/transaction';

import type { TransactionResponse } from '../../models/transaction/TransactionResponse';
import type { TransactionType } from '../../types/TransactionType';
import TransactionModal from '../transactionModal/TransactionModal';
import styles from './Transactions.module.css';
import useTransactions from './hooks/useTransactions';

export default function TransactionsPage() {  
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [txType, setTxType] = useState<TransactionType>('CREDIT');
 
  const [selectedTx, setSelectedTx] = useState<TransactionResponse | null>(null);
  const [deletingTx, setDeletingTx] = useState<TransactionResponse | null>(null);

  const onClose = () => {
    setDeletingTx(null);
    setSelectedTx(null);
    setIsModalOpen(false);
  }

  const handleResetFilters = () => {
    setSearch('');
    setTxStatusFilter('all');
    setTxStatusFilter('all');
    setWalletFilter('all');
    setCategoryFilter('all');
    setSort('recent');
    setActiveTab('all');
  };

  const handleEditTransaction = (transaction: TransactionResponse) => {
    setSelectedTx(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (transaction: TransactionResponse) => {
    deleteTransaction(transaction);
  };

  const openDeleteConfirm = (transaction: TransactionResponse) => {
    setDeletingTx(transaction);
  };

  const {
    transactions,
    wallets,
    categories,
    summaryCard,
    currentMonth,
    setCurrentMonth,
    search,
    setSearch,
    txStatusFilter,
		setTxStatusFilter,
		txTypeFilter,
		setTxTypeFilter,
		walletFilter,
		setWalletFilter,
		categoryFilter,
		setCategoryFilter,
    sort,
    setSort,
    deleteTransaction
  } = useTransactions(onClose);

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

      // Filtro de tipo
      if (txTypeFilter === 'income' && tx.type !== 'CREDIT') {
        return false;
      }

      if (txTypeFilter === 'expense' && tx.type !== 'DEBIT') {
        return false;
      }

      // Filtro de status
      if (txStatusFilter === 'paid' && tx.status !== 'COMPLETED') {
        return false;
      }

      if (txStatusFilter === 'pending' && tx.status !== 'PENDING') {
        return false;
      }

      // Filtro de carteira
      if (walletFilter !== 'all' && tx.wallet.id !== walletFilter) {
        return false;
      }

      // Filtro de categoria
      if (categoryFilter !== 'all' && tx.category.id !== categoryFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sort === 'recent') return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
      if (sort === 'oldest') return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
      if (sort === 'highest') return b.amount - a.amount;
      if (sort === 'lowest') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, activeTab, txStatusFilter, txTypeFilter, walletFilter, categoryFilter, sort, search]);

  return (
    <div className={`h-full w-full transition-colors duration-300 ${styles.pageContainer}`}>
      <div className={`w-full relative shadow-md overflow-hidden ${styles.headerBackground}`}>
        <div className={`absolute inset-0 opacity-20 pointer-events-none ${styles.patternOverlay}`}></div>
        <TransactionsHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          onOpenAddModal={() => {}}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up">
        <SummaryCards summary={summaryCard} />

        <TransactionsToolbar
          searchQuery={search}
          setSearchQuery={setSearch}
          typeFilter={txTypeFilter}
          setTypeFilter={setTxTypeFilter}
          statusFilter={txStatusFilter}
          setStatusFilter={setTxStatusFilter}
          walletFilter={walletFilter}
          setWalletFilter={setWalletFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sort}
          setSortBy={setSort}
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
            <EmptyState onAdd={() => {}} />
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
        wallets={wallets}
        categories={categories}
        typeFilter={txTypeFilter}
        statusFilter={txStatusFilter}
        walletFilter={walletFilter}
        categoryFilter={categoryFilter}
        sortBy={sort}
        onApplyFilters={(filters) => {
          setTxTypeFilter(filters.type);
          setTxStatusFilter(filters.status);
          setWalletFilter(filters.wallet);
          setCategoryFilter(filters.category);
          setSort(filters.sort);
        }}
        onClearFilters={handleResetFilters}
      />

      <TransactionDetailsDrawer
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
        onEdit={handleEditTransaction}
        onDelete={openDeleteConfirm}
      />

      <DeleteConfirmModal
        isOpen={!!deletingTx}
        onClose={() => setDeletingTx(null)}
        onConfirm={handleDeleteTransaction}
        transaction={deletingTx}
      />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={onClose}
        initialType={txType}
        transaction={selectedTx}
      />
    </div>
  );
}