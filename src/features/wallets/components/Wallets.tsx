import {
  AlertTriangle,
  Building2,
  CircleDot,
  Flame,
  Hexagon,
  Home,
  Landmark,
  Pencil,
  PiggyBank,
  TrendingUp,
  Wallet,
  Zap
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import type { WalletResponse } from '../../../models/wallet/WalletResponse';
import useWallets from '../hooks/useWallets';
import Apresentation from './Apresentation';
import AssetDistributionChart from './AssetDistributionChart';
import ListWallets from './ListWallets';
import TotalAssets from './TotalAssets';
import WalletDetails from './WalletDetails';
import WalletModal from './WalletModal';
import Confirm from '../../../components/ui/Confirm/Confirm';

function Wallets() {
  const [openModalSaveOrUpdate, setOpenModalSaveOrUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
	const [selectedWallet, setSelectedWallet] = useState<WalletResponse | null>(null);
  const [walletIdDelete, setWalletIdDelete] = useState('0');
	
  function handleSaveOrUpdate(wallet: WalletResponse | null) {
    setWallet(wallet);
    setOpenModalSaveOrUpdate(true);  
  }

  function handleOnDelete(id: string) {
    setWalletIdDelete(id);
    setOpenModalDelete(true);
  }

  function handleCloseModal() {
    reset();
    setOpenModalSaveOrUpdate(false);
    setOpenModalDelete(false);
    setSelectedWallet(null);
    setWalletIdDelete('0');
  }

  const {
    wallets,
    banks,
    previewWallet,
    totalAssets,
    bigWalletIncome,
    smallWalletIncome,
    form,
    reset,
    setWallet,
    handleOnChange,
    saveOrUpdate,
    deleteWallet,
    isLoading
  } = useWallets(handleCloseModal);

	const chartData = useMemo(() => {
		if (!wallets) return;
    const validWallets = wallets.filter(w => w.balance > 0);
    const totalPositive = validWallets.reduce((acc, w) => acc + w.balance, 0);
    
    let currentOffset = 0;
    const radius = 64;
    const circumference = 2 * Math.PI * radius;

    return validWallets.map(w => {
      const percentage = totalPositive > 0 ? (w.balance / totalPositive) : 0;
      const strokeLength = percentage * circumference * 0.96; 
      const gapLength = circumference - strokeLength;
      
      const dasharray = `${strokeLength} ${gapLength}`;
      const dashoffset = -currentOffset;
      
      currentOffset += percentage * circumference;
      const color = w.bank ? w.bank.color : '#ccc';

      return {
        ...w,
        percentage: percentage * 100,
        dasharray,
        dashoffset,
        chartColor: color
      };
    }).sort((a, b) => b.balance - a.balance);
  }, [wallets]);

  return (
		<main className="flex-1 w-full min-w-0 flex flex-col overflow-y-auto relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-[28px] w-full">
        
        {/* BLOCO 1 - HEADER DA PÁGINA */}
        <Apresentation
          onNewWallet={handleSaveOrUpdate}
				/>

        {/* BLOCO 2 - PATRIMÔNIO TOTAL (BANNER DESTAQUE ESTILO OVERVIEW) */}
        <TotalAssets
					total={totalAssets ?? 0}
          wallets={wallets.length}
          bigIncome={bigWalletIncome}
          smallIncome={smallWalletIncome}
				/>

        {/* BLOCO 3 - GRID DE CARTÕES FÍSICOS */}
				<ListWallets
					wallets={wallets ?? []}
					setSelectedWallet={setSelectedWallet}
          onEdit={handleSaveOrUpdate}
          onDelete={handleOnDelete}
				/>

        {/* BLOCO 4 - DETALHE DA CARTEIRA SELECIONADA */}
        {selectedWallet && (
          <WalletDetails
						selectedWallet={selectedWallet}
						setSelectedWallet={setSelectedWallet}
					/>
        )}

        {/* BLOCO 5 - DISTRIBUIÇÃO PATRIMONIAL */}
        {chartData && chartData.length > 0 && (
          <AssetDistributionChart
            chartData={chartData}
            totalAssets={totalAssets ?? 0}
          />
        )}

        {openModalSaveOrUpdate && (
          <WalletModal
            form={form}
            handleOnChange={handleOnChange}
            banks={banks}
            isEditing={form.id !== null}
            onClose={handleCloseModal}
            previewWallet={previewWallet}
            saveOrUpdate={saveOrUpdate}
            isLoading={isLoading}
          />
        )}
				
				
				{openModalDelete && (
					<Confirm
            type='warning'
            title='Remover carteira?'
            message='Esta ação não pode ser desfeita. O saldo e histórico desta carteira serão removidos do sistema.'
            buttonText='Remover'
            onCancel={() => setOpenModalDelete(false)}
            onConfirm={() => deleteWallet(walletIdDelete)}
          />
				)}
      </div>
    </main>
  );
}

export default Wallets;