import { Wallet as WalletIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { WalletResponse } from '../../models/wallet/WalletResponse';
import { DeleteConfirmModal } from './components/DeleteConfirmModal/DeleteConfirmModal';
import { FinancialSummary } from './components/FinancialSummay/FinancialSummary';
import { WalletCard } from './components/WalletCard/WalletCard';
import WalletFormModal from './components/WalletFormModal/WalletFormModal';
import { WalletsHeader } from './components/WalletsHeader/WalletsHeader';
import useWallets from './hooks/useWallets';
import type { WalletFilter } from './types/wallet';

import styles from './Wallets.module.css';

export default function WalletsPage() {
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [walletDeleted, setWalletDeleted] = useState<WalletResponse | null>(null);
  const [currentFilter, setCurrentFilter] = useState<WalletFilter>('all');
  
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const onClose = () => {
    setWallet(null);
    setWalletDeleted(null);
    setIsFormModalOpen(false);
  }

  const handleDeleteWallet = () => {
    if (!walletDeleted) return;
    deleteWallet(walletDeleted);
  }

  const openEdit = (wallet: WalletResponse) => {
    setWallet(wallet);
    setIsFormModalOpen(true);
  };

  const openDelete = (wallet: WalletResponse) => {
    setWalletDeleted(wallet);
  };

  const openAdd = () => {
    setWallet(null);
    setWalletDeleted(null);
    setIsFormModalOpen(true);
  };
  
  const {
    wallets,
    banks,
    form,
    handleOnChange,
    onBankChange,
    selectColor,
    saveOrUpdate,
    deleteWallet
  } = useWallets(wallet, onClose);

  const filteredWallets = useMemo(() => {
    switch(currentFilter) {
      case 'accounts': return wallets.filter(w => w.type === 'CHECKING' || w.type === 'SAVING');
      case 'credit_cards': return wallets.filter(w => w.type === 'CREDIT_CARD');
      case 'reserves': return wallets.filter(w => w.type === 'RESERVE');
      case 'investments': return wallets.filter(w => w.type === 'INVESTMENTS');
      case 'physical': return wallets.filter(w => w.type === 'PHYSICAL');
      default: return wallets;
    }
  }, [wallets, currentFilter]);

  return (
    <div className={`min-h-screen relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)] ${styles.fadeInUp}`}>
      <WalletsHeader 
        currentFilter={currentFilter} 
        setFilter={setCurrentFilter}
        onAddWallet={openAdd}
      />

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">        
        <FinancialSummary wallets={wallets} />

        {filteredWallets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredWallets.map(wallet => (
              <WalletCard 
                key={wallet.id} 
                wallet={wallet} 
                onEdit={openEdit}
                onDelete={openDelete}
                isPreview={isFormModalOpen}
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
        onClose={onClose}
        onSave={saveOrUpdate}
        onEdit={openEdit}
        onDelete={openDelete}
        form={form}
        handleOnChange={handleOnChange}
        selectColor={selectColor}
        banks={banks}
        onBankChange={onBankChange}
      />
      
      <DeleteConfirmModal
        isOpen={!!walletDeleted}
        wallet={walletDeleted}
        onClose={() => setWalletDeleted(null)}
        onConfirm={handleDeleteWallet}
      />
    </div>
  );
}