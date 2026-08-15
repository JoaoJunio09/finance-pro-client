import { 
  Building2, Landmark, TrendingUp, Banknote, 
  CreditCard, PiggyBank, ShieldCheck, Wallet2
} from 'lucide-react';
import type { Wallet, WalletType } from '../types/wallet';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
};

export const AVAILABLE_BANKS = [
  'Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 
  'Caixa Econômica', 'XP Investimentos', 'Inter', 'BTG Pactual', 'C6 Bank', 'Físico', 'Outro'
];

export const getBankIcon = (bank: string, size = 20) => {
  const b = bank.toLowerCase();
  if (b.includes('nubank')) return <Building2 size={size} />;
  if (b.includes('itaú') || b.includes('bradesco')) return <Landmark size={size} />;
  if (b.includes('xp') || b.includes('btg')) return <TrendingUp size={size} />;
  if (b.includes('físico')) return <Banknote size={size} />;
  return <Building2 size={size} />;
};

export const getTypeLabel = (type: WalletType) => {
  switch (type) {
    case 'checking': return 'Conta Corrente';
    case 'savings': return 'Conta Poupança';
    case 'credit_card': return 'Cartão de Crédito';
    case 'reserve': return 'Reserva de Emergência';
    case 'investment': return 'Investimentos';
    case 'physical': return 'Dinheiro Físico';
    default: return 'Outro';
  }
};

export const getTypeIcon = (type: WalletType, size = 16) => {
  switch (type) {
    case 'checking': return <CreditCard size={size} />;
    case 'savings': return <PiggyBank size={size} />;
    case 'credit_card': return <CreditCard size={size} />;
    case 'reserve': return <ShieldCheck size={size} />;
    case 'investment': return <TrendingUp size={size} />;
    case 'physical': return <Banknote size={size} />;
    default: return <Wallet2 size={size} />;
  }
};

export const getColorClasses = (scheme: Wallet['colorScheme']) => {
  switch (scheme) {
    case 'purple': return 'bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white border-[#8B5CF6]/30';
    case 'blue': return 'bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white border-[#3B82F6]/30';
    case 'green': return 'bg-gradient-to-br from-[#059669] to-[#064E3B] text-white border-[#10B981]/30';
    case 'orange': return 'bg-gradient-to-br from-[#EA580C] to-[#7C2D12] text-white border-[#F97316]/30';
    case 'neutral': return 'bg-gradient-to-br from-[#3F3F46] to-[#18181B] text-white border-[#52525B]/30';
    default: return 'bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-base)] text-[var(--text-main)] border-[var(--border-light)]';
  }
};