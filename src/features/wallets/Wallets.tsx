import { Wallet as WalletIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteConfirmModal } from './components/DeleteConfirmModal/DeleteConfirmModal';
import { FinancialSummary } from './components/FinancialSummay/FinancialSummary';
import { WalletCard } from './components/WalletCard/WalletCard';
import { WalletsHeader } from './components/WalletsHeader/WalletsHeader';
import { MOCK_WALLETS } from './mocks/wallets';
import type { Wallet, WalletFilter } from './types/wallet';

import styles from './Wallets.module.css';
import useWallets from './hooks/useWallets';
import WalletFormModal from './components/WalletFormModal/WalletFormModal';

export default function WalletsPage() {
  // Estado Principal
  const [wallets2, setWallets] = useState<Wallet[]>(MOCK_WALLETS);
  const [currentFilter, setCurrentFilter] = useState<WalletFilter>('all');
  
  // Estados dos Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const [deleteWalletCandidate, setDeleteWalletCandidate] = useState<Wallet | null>(null);

  const {
    wallets,
    banks,
    form,
    handleOnChange,
    selectColor
  } = useWallets();

  console.log(form)

  // Lógica de Filtro
  const filteredWallets = useMemo(() => {
    switch(currentFilter) {
      case 'accounts': return wallets.filter(w => w.type === 'CHECKING' || w.type === 'SAVING');
      case 'credit_cards': return wallets.filter(w => w.type === 'CREDIT_CARD');
      case 'reserves': return wallets.filter(w => w.type === 'RESERVE');
      case 'investments': return wallets.filter(w => w.type === 'INVESTMENTS');
      case 'physical': return wallets.filter(w => w.type === 'PHYSICAL');
      default: return wallets;
    }
  }, [wallets2, currentFilter]);

  // Handlers (Prontos para integrar com API/Backend)
  const handleSaveWallet = (savedWallet: Wallet) => {
    if (editingWallet) {
      // Atualiza carteira existente (PUT no backend futuro)
      setWallets(prev => prev.map(w => w.id === savedWallet.id ? savedWallet : w));
    } else {
      // Adiciona nova carteira (POST no backend futuro)
      setWallets(prev => [...prev, { ...savedWallet, id: `w_${Date.now()}` }]);
    }
  };

  const handleDeleteWallet = () => {
    if (deleteWalletCandidate) {
      // Deleta carteira (DELETE no backend futuro)
      setWallets(prev => prev.filter(w => w.id !== deleteWalletCandidate.id));
    }
  };

  // Funções de abertura de modais
  const openEdit = (wallet: Wallet) => {
    setEditingWallet(wallet);
    setIsFormModalOpen(true);
  };

  const openDelete = (wallet: Wallet) => {
    setDeleteWalletCandidate(wallet);
  };

  const openAdd = () => {
    setEditingWallet(null);
    setIsFormModalOpen(true);
  };

  return (
    <div className={`min-h-screen relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)] ${styles.fadeInUp}`}>
      
      {/* Header com Filtros e Botão Adicionar */}
      <WalletsHeader 
        currentFilter={currentFilter} 
        setFilter={setCurrentFilter}
        onAddWallet={openAdd}
      />

      {/* Conteúdo Principal */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        
        <FinancialSummary wallets={wallets} />

        {/* Grid de Carteiras ou Estado Vazio */}
        {filteredWallets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredWallets.map(wallet => (
              <WalletCard 
                key={wallet.id} 
                wallet={wallet} 
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl shadow-sm">
            <WalletIcon size={40} className="mb-4 opacity-50" />
            <span className="text-base font-semibold text-[var(--text-main)] mb-1">
              Nenhuma carteira encontrada
            </span>
            <span className="text-sm">
              Tente alterar o filtro ou adicione uma nova carteira.
            </span>
          </div>
        )}
      </main>

      <WalletFormModal
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        onSave={() => {}}
        form={form}
        handleOnChange={handleOnChange}
        selectColor={selectColor}
      />
      
      <DeleteConfirmModal
        isOpen={!!deleteWalletCandidate}
        wallet={deleteWalletCandidate}
        onClose={() => setDeleteWalletCandidate(null)}
        onConfirm={handleDeleteWallet}
      />
    </div>
  );
}