import {
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

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  desc: string;
  amount: number;
  date: string;
  type: TransactionType;
}

export interface WalletData {
  id: string;
  name: string;
  bank: string;
  balance: number;
  income: number;
  expense: number;
  digits: string;
  color: string;
  gradient: string;
  transactions: Transaction[];
}

export interface BankConfig {
  id: string;
  name: string;
  gradient: string;
  icon: React.ElementType;
  shadow: string;
  color: string;
  defaultDigits: string;
  isRealBank: boolean;
}

export const BANK_CONFIGS: Record<string, BankConfig> = {
  nubank: { id: 'nubank', name: 'Nubank', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', icon: Zap, shadow: 'rgba(139,92,246,0.35)', color: '#8B5CF6', defaultDigits: '4521', isRealBank: true },
  itau: { id: 'itau', name: 'Itaú', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #92400E 100%)', icon: Building2, shadow: 'rgba(245,158,11,0.30)', color: '#F59E0B', defaultDigits: '7832', isRealBank: true },
  bradesco: { id: 'bradesco', name: 'Bradesco', gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', icon: Landmark, shadow: 'rgba(239,68,68,0.30)', color: '#EF4444', defaultDigits: '3391', isRealBank: true },
  inter: { id: 'inter', name: 'Banco Inter', gradient: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', icon: Flame, shadow: 'rgba(249,115,22,0.30)', color: '#F97316', defaultDigits: '6614', isRealBank: true },
  c6: { id: 'c6', name: 'C6 Bank', gradient: 'linear-gradient(135deg, #1C1C2E 0%, #2D2D44 50%, #1C1C2E 100%)', icon: Hexagon, shadow: 'rgba(0,0,0,0.50)', color: '#2D2D44', defaultDigits: '9087', isRealBank: true },
  caixa: { id: 'caixa', name: 'Caixa Econômica', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #1E3A8A 100%)', icon: Home, shadow: 'rgba(29,78,216,0.35)', color: '#1D4ED8', defaultDigits: '2258', isRealBank: true },
  santander: { id: 'santander', name: 'Santander', gradient: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', icon: CircleDot, shadow: 'rgba(220,38,38,0.30)', color: '#DC2626', defaultDigits: '5503', isRealBank: true },
  manual: { id: 'manual', name: 'Carteira Manual', gradient: 'linear-gradient(135deg, #18181B 0%, #27272A 100%)', icon: Wallet, shadow: 'rgba(0,0,0,0.40)', color: '#71717A', defaultDigits: '', isRealBank: false },
  investimento: { id: 'investimento', name: 'Conta Investimento', gradient: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)', icon: TrendingUp, shadow: 'rgba(5,150,105,0.30)', color: '#059669', defaultDigits: '8847', isRealBank: true },
  poupanca: { id: 'poupanca', name: 'Conta Poupança', gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)', icon: PiggyBank, shadow: 'rgba(37,99,235,0.30)', color: '#3B82F6', defaultDigits: '1193', isRealBank: true },
};

export const INITIAL_WALLETS: WalletData[] = [
  {
    id: '1', name: 'Conta Principal', bank: 'nubank',
    balance: 8340.00, income: 5200, expense: 1240,
    digits: '4521', color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    transactions: [
      { desc: 'Salário', amount: 5200, date: 'hoje', type: 'income' },
      { desc: 'Netflix', amount: -55.90, date: 'ontem', type: 'expense' },
      { desc: 'Uber', amount: -28.50, date: '22 jun', type: 'expense' },
      { desc: 'Freelance', amount: 1500, date: '20 jun', type: 'income' },
    ]
  },
  {
    id: '2', name: 'Reserva de Emergência', bank: 'poupanca',
    balance: 3000.00, income: 500, expense: 0,
    digits: '1193', color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)',
    transactions: [
      { desc: 'Transferência', amount: 500, date: 'ontem', type: 'income' },
      { desc: 'Rendimento', amount: 18.50, date: '15 jun', type: 'income' },
      { desc: 'Rendimento', amount: 17.20, date: '15 mai', type: 'income' },
      { desc: 'Depósito', amount: 300, date: '01 mai', type: 'income' },
    ]
  },
  {
    id: '3', name: 'Moto', bank: 'itau',
    balance: 1500.00, income: 0, expense: 340,
    digits: '7832', color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 60%, #92400E 100%)',
    transactions: [
      { desc: 'Combustível', amount: -180, date: '21 jun', type: 'expense' },
      { desc: 'Manutenção', amount: -160, date: '10 jun', type: 'expense' },
      { desc: 'Depósito', amount: 400, date: '01 jun', type: 'income' },
      { desc: 'Combustível', amount: -120, date: '18 mai', type: 'expense' },
    ]
  },
  {
    id: '4', name: 'Investimentos', bank: 'investimento',
    balance: 0, income: 0, expense: 0,
    digits: '8847', color: '#059669',
    gradient: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #059669 100%)',
    transactions: []
  },
];

// ==========================================
// COMPONENTE PRINCIPAL DE CARTEIRAS
// ==========================================

function Wallets() {
  // Estrutura matemática do Donut SVG

  const [openModal, setOpenModal] = useState(false);
  
	const [selectedWallet, setSelectedWallet] = useState<WalletResponse | null>(null);
	const {
    wallets,
    banks,
    previewWallet,
    totalAssets,
    bigWalletIncome,
    smallWalletIncome,
    form,
    handleOnChange,
    saveOrUpdate
  } = useWallets();

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
          openAddModal={() => setOpenModal(true)}
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

        {openModal && (
          <WalletModal
            form={form}
            handleOnChange={handleOnChange}
            banks={banks}
            isEditing={false}
            onClose={() => setOpenModal(false)}
            previewWallet={previewWallet}
            saveOrUpdate={saveOrUpdate}
          />
        )}

				{/* MODAL ADICIONAR / EDITAR CARTEIRA */}
				
				{/* CONFIRMAÇÃO DE EXCLUSÃO
				{showDeleteConfirm && (
					<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
						<div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-overlay" onClick={() => setShowDeleteConfirm(null)} />
						
						<div className="relative z-[61] w-full max-w-[380px] bg-[#111113] border border-white/[0.06] rounded-[20px] p-[28px] animate-slide-up">
							
							<div className="w-[44px] h-[44px] rounded-xl bg-[#F8717110] border border-rose-500/20 flex items-center justify-center mb-[16px]">
								<AlertTriangle size={24} className="text-[#F87171]" />
							</div>

							<h3 className="font-['Outfit'] text-[17px] font-semibold text-white">Remover carteira?</h3>
							<p className="font-['Inter'] text-[13px] text-zinc-500 mt-[8px] leading-[1.6]">
								Esta ação não pode ser desfeita. O saldo e histórico desta carteira serão removidos do sistema.
							</p>

							<div className="flex gap-[10px] mt-[24px]">
								<button 
									onClick={() => setShowDeleteConfirm(null)}
									className="flex-1 h-[42px] rounded-[10px] bg-transparent border border-white/[0.08] hover:bg-white/[0.04] font-['Inter'] text-[13px] font-medium text-zinc-400 hover:text-white transition-all outline-none"
								>
									Cancelar
								</button>
								<button 
									onClick={() => confirmDelete(showDeleteConfirm)}
									className="flex-1 h-[42px] rounded-[10px] bg-[#F8717110] border border-rose-500/20 hover:bg-rose-500/20 hover:border-rose-500 font-['Inter'] text-[13px] font-semibold text-[#F87171] transition-all outline-none"
								>
									Remover
								</button>
							</div>

						</div>
					</div>
				)} */}
      </div>
    </main>
  );
}

export default Wallets;