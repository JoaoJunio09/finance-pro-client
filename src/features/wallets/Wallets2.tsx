import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Zap, 
  Building2, 
  Landmark, 
  Flame, 
  Hexagon, 
  Home, 
  CircleDot, 
  Wallet, 
  PiggyBank, 
  CreditCard, 
  Pencil, 
  Trash2, 
  X,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

type TransactionType = 'income' | 'expense';

interface Transaction {
  desc: string;
  amount: number;
  date: string;
  type: TransactionType;
}

interface WalletData {
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

interface BankConfig {
  id: string;
  name: string;
  gradient: string;
  icon: React.ElementType;
  shadow: string;
  color: string;
  defaultDigits: string;
  isRealBank: boolean;
}

// ==========================================
// CONFIGURAÇÕES DE BANCOS E TIPOS (GRADIENTES REAIS PRESERVADOS)
// ==========================================

const BANK_CONFIGS: Record<string, BankConfig> = {
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

// ==========================================
// DADOS INICIAIS (MOCK)
// ==========================================

const INITIAL_WALLETS: WalletData[] = [
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
// UTILS
// ==========================================

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatInputValue = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  if (!numericValue) return '';
  const amount = parseFloat(numericValue) / 100;
  return amount.toFixed(2);
};

const getDisplayDigits = (digits: string, isRealBank: boolean) => {
  if (!isRealBank || !digits) return '•••• •••• •••• ••••';
  return `•••• •••• •••• ${digits}`;
};

// ==========================================
// COMPONENTES ATÔMICOS REUTILIZÁVEIS
// ==========================================

const PhysicalCard = ({ 
  wallet, 
  onEdit, 
  onDelete, 
  onClick, 
  isSelected = false 
}: { 
  wallet: Partial<WalletData>; 
  onEdit?: (w: Partial<WalletData>) => void; 
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}) => {
  const config = BANK_CONFIGS[wallet.bank || 'manual'] || BANK_CONFIGS['manual'];
  const Icon = config.icon;
  const isPreview = !onEdit && !onClick;

  return (
    <div 
      onClick={() => onClick && wallet.id && onClick(wallet.id)}
      className={`
        relative overflow-hidden w-full rounded-[20px] aspect-[1.586] transition-all duration-200 ease-out group select-none
        ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
        ${isSelected ? 'ring-2 ring-offset-2 ring-offset-[#09090B] ring-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : ''}
      `}
      style={{ 
        background: wallet.gradient || config.gradient,
        boxShadow: onClick ? `0 8px 32px ${config.shadow}` : 'none',
        border: wallet.bank === 'c6' ? '1px solid rgba(255,255,255,0.15)' : 'none'
      }}
    >
      {/* Camada 1: Geometria (Decoração) */}
      <div className="absolute top-[-30%] right-[-30%] w-[150%] aspect-square rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-40%] left-[-20%] w-[80%] aspect-square rounded-full border border-white/5 pointer-events-none" />

      {/* Camada 2: Chip */}
      <div className="absolute top-[22%] left-[8%] w-[36px] h-[28px] rounded-[5px] flex items-center justify-center overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #E8CC8E, #C9A84C)' }}>
        <div className="w-full h-[1px] bg-black/20 absolute" />
        <div className="w-[1px] h-full bg-black/20 absolute" />
      </div>

      {/* Camada 3: Logo/Ícone */}
      <div className="absolute top-[14px] right-[16px] text-white/90">
        <Icon size={isPreview ? 24 : 28} strokeWidth={1.5} />
      </div>

      {/* Camada 4: Número do cartão */}
      <div className="absolute bottom-[38%] left-[8%] font-['Outfit'] font-medium tracking-[0.18em] text-white/80"
           style={{ fontSize: isPreview ? '12px' : '14px' }}>
        {getDisplayDigits(wallet.digits || '', config.isRealBank)}
      </div>

      {/* Camada 5: Nome */}
      <div className="absolute bottom-[16%] left-[8%] font-['Inter'] font-semibold text-white truncate max-w-[50%]"
           style={{ fontSize: isPreview ? '11px' : '13px' }}>
        {wallet.name || 'Nova Carteira'}
      </div>

      {/* Camada 6: Saldo */}
      <div className="absolute bottom-[14%] right-[8%] text-right">
        <div className="font-['Inter'] uppercase text-white/60 tracking-wider mb-0.5" style={{ fontSize: isPreview ? '8px' : '10px' }}>
          Saldo
        </div>
        <div className="font-['Outfit'] font-bold tabular-nums text-white" style={{ fontSize: isPreview ? '14px' : '16px' }}>
          {formatCurrency(wallet.balance || 0)}
        </div>
      </div>

      {/* Camada 7: Ações (Hover) */}
      {onEdit && onDelete && wallet.id && (
        <div className="absolute top-[12px] left-[12px] flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(wallet); }}
            className="w-[28px] h-[28px] rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <Pencil size={12} className="text-white" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(wallet.id!); }}
            className="w-[28px] h-[28px] rounded-lg bg-[#F8717140] hover:bg-[#F8717166] flex items-center justify-center transition-colors"
          >
            <Trash2 size={12} className="text-[#F87171]" />
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL DE CARTEIRAS
// ==========================================

export default function Wallets2() {
  // Injetar fontes Outfit e Inter no head do documento
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, []);

  // Estados locais funcionais
  const [wallets, setWallets] = useState<WalletData[]>(INITIAL_WALLETS);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  
  const [showModal, setShowModal] = useState(false);
  const [editingWallet, setEditingWallet] = useState<WalletData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Estados locais do Formulário
  const [formName, setFormName] = useState('');
  const [formBank, setFormBank] = useState('nubank');
  const [formBalance, setFormBalance] = useState('');
  const [formDigits, setFormDigits] = useState('');

  // ----------------------------------------
  // LÓGICA E MEMOIZAÇÕES ANALÍTICAS
  // ----------------------------------------

  const totalBalance = useMemo(() => wallets.reduce((acc, w) => acc + w.balance, 0), [wallets]);
  const totalIncome = useMemo(() => wallets.reduce((acc, w) => acc + w.income, 0), [wallets]);
  const totalExpense = useMemo(() => wallets.reduce((acc, w) => acc + w.expense, 0), [wallets]);
  
  const activeWalletsCount = wallets.length;
  
  const highestWallet = useMemo(() => {
    if (wallets.length === 0) return null;
    return wallets.reduce((prev, current) => (prev.balance > current.balance) ? prev : current);
  }, [wallets]);

  const lowestWallet = useMemo(() => {
    if (wallets.length === 0) return null;
    return wallets.reduce((prev, current) => (prev.balance < current.balance) ? prev : current);
  }, [wallets]);

  // Estrutura matemática do Donut SVG
  const chartData = useMemo(() => {
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
      const config = BANK_CONFIGS[w.bank] || BANK_CONFIGS.manual;

      return {
        ...w,
        percentage: percentage * 100,
        dasharray,
        dashoffset,
        chartColor: config.color
      };
    }).sort((a, b) => b.balance - a.balance);
  }, [wallets]);

  // ----------------------------------------
  // HANDLERS
  // ----------------------------------------

  const handleCardClick = (id: string) => {
    setSelectedWalletId(prev => prev === id ? null : id);
  };

  const openAddModal = () => {
    setEditingWallet(null);
    setFormName('');
    setFormBank('nubank');
    setFormBalance('');
    setFormDigits('');
    setShowModal(true);
  };

  const openEditModal = (wallet: Partial<WalletData>) => {
    setEditingWallet(wallet as WalletData);
    setFormName(wallet.name || '');
    setFormBank(wallet.bank || 'nubank');
    setFormBalance((wallet.balance || 0).toFixed(2));
    setFormDigits(wallet.digits || '');
    setShowModal(true);
  };

  const confirmDelete = (id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
    if (selectedWalletId === id) setSelectedWalletId(null);
    setShowDeleteConfirm(null);
  };

  const saveWallet = () => {
    if (!formName.trim()) return;

    const config = BANK_CONFIGS[formBank];
    const newBalance = parseFloat(formBalance || '0');

    const walletToSave: WalletData = {
      id: editingWallet ? editingWallet.id : Math.random().toString(36).substr(2, 9),
      name: formName,
      bank: formBank,
      balance: newBalance,
      digits: formDigits,
      color: config.color,
      gradient: config.gradient,
      income: editingWallet ? editingWallet.income : 0,
      expense: editingWallet ? editingWallet.expense : 0,
      transactions: editingWallet ? editingWallet.transactions : []
    };

    if (editingWallet) {
      setWallets(prev => prev.map(w => w.id === editingWallet.id ? walletToSave : w));
    } else {
      setWallets(prev => [...prev, walletToSave]);
    }

    setShowModal(false);
  };

  const selectedWalletData = useMemo(() => 
    wallets.find(w => w.id === selectedWalletId), 
  [wallets, selectedWalletId]);

  const formPreviewWallet: Partial<WalletData> = {
    name: formName,
    bank: formBank,
    balance: parseFloat(formBalance || '0'),
    digits: formDigits,
    gradient: BANK_CONFIGS[formBank]?.gradient
  };

  return (
    <div className="min-h-screen bg-[#09090B] font-['Inter'] text-white pb-20 relative">
      
      {/* 1. GRADIENTE RADIAL DE FUNDO GERAL DA PÁGINA */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, rgba(9, 9, 11, 0) 60%)'
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-[28px] relative z-10">
        
        {/* BLOCO 1 - HEADER DA PÁGINA */}
        <div className="flex flex-row justify-between items-start">
          <div>
            <h1 className="font-['Outfit'] text-[24px] font-bold text-white tracking-tight">Carteiras</h1>
            <p className="font-['Inter'] text-[14px] text-zinc-500 mt-1">Gerencie suas contas, carteiras e cartões</p>
          </div>
          <button 
            onClick={openAddModal}
            className="h-[38px] px-[18px] rounded-[10px] flex items-center gap-2 text-white font-['Inter'] text-[13px] font-semibold transition-all active:scale-[0.98] outline-none"
            style={{ 
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.30)'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #6D28D9, #5B21B6)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #6D28D9)'}
          >
            <Plus size={15} color="#FFFFFF" />
            Nova Carteira
          </button>
        </div>

        {/* BLOCO 2 - PATRIMÔNIO TOTAL (BANNER DESTAQUE ESTILO OVERVIEW) */}
        <div className="relative overflow-hidden rounded-[24px] p-[28px] md:p-[32px] border border-white/[0.06] flex flex-col md:flex-row justify-between gap-6 shadow-2xl group transition-all duration-300"
             style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}>
          
          {/* Círculos Geométricos Decorativos */}
          <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full border border-white/[0.03] pointer-events-none" />
          <div className="absolute top-[20px] right-[40px] w-[120px] h-[120px] rounded-full border border-white/[0.02] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[40%]" 
               style={{ background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.35), transparent)' }} />

          {/* Ícone Decorativo em Opacity do Avora */}
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
            <Wallet size={64} className="text-[#8B5CF6]" />
          </div>

          {/* Lado Esquerdo: Valor */}
          <div className="relative z-10 flex flex-col justify-center">
            <h2 className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Patrimônio Total</h2>
            <div className="font-['Outfit'] text-[36px] md:text-[52px] font-bold tabular-nums mt-[8px] tracking-tight"
                 style={{ 
                   background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent'
                 }}>
              {formatCurrency(totalBalance)}
            </div>
            
            {/* Feedback contextual sutil */}
            <div className="inline-flex items-center gap-[6px] rounded-lg px-[12px] py-[4px] mt-[12px] w-fit"
                 style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.15)' }}>
              <TrendingUp size={13} className="text-emerald-400" />
              <span className="font-['Inter'] text-[12px] text-emerald-400 font-medium">Cresceu R$ 1.240 em relação ao mês passado</span>
            </div>
          </div>

          {/* Lado Direito: Métricas Rápidas */}
          <div className="relative z-10 flex flex-col gap-[10px] items-start md:items-end justify-center shrink-0">
            <div className="flex items-center gap-[8px] md:justify-end">
              <div className="w-[8px] h-[8px] rounded-full bg-[#8B5CF6]" />
              <span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Carteiras Ativas</span>
              <span className="font-['Outfit'] text-[14px] font-semibold tabular-nums text-white ml-2">{activeWalletsCount}</span>
            </div>
            {highestWallet && (
              <div className="flex items-center gap-[8px] md:justify-end">
                <div className="w-[8px] h-[8px] rounded-full bg-emerald-400" />
                <span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Maior Saldo</span>
                <span className="font-['Outfit'] text-[14px] font-semibold text-white ml-2">{highestWallet.name}</span>
              </div>
            )}
            {lowestWallet && lowestWallet.id !== highestWallet?.id && (
              <div className="flex items-center gap-[8px] md:justify-end">
                <div className="w-[8px] h-[8px] rounded-full bg-rose-400" />
                <span className="font-['Inter'] text-[12px] text-zinc-500 font-medium">Menor Saldo</span>
                <span className="font-['Outfit'] text-[14px] font-semibold text-white ml-2">{lowestWallet.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* BLOCO 3 - GRID DE CARTÕES FÍSICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {wallets.map(wallet => (
            <PhysicalCard 
              key={wallet.id} 
              wallet={wallet} 
              onEdit={openEditModal} 
              onDelete={(id) => setShowDeleteConfirm(id)}
              onClick={handleCardClick}
              isSelected={selectedWalletId === wallet.id}
            />
          ))}

          {/* Placeholder para Adicionar Nova Carteira */}
          <div 
            onClick={openAddModal}
            className="rounded-[20px] aspect-[1.586] border-2 border-dashed border-white/[0.06] bg-transparent hover:bg-[rgba(139,146,246,0.05)] hover:border-[#8B5CF6]/50 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
          >
            <div className="w-[44px] h-[44px] rounded-xl flex items-center justify-center mb-[12px] transition-all duration-300"
                 style={{ background: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.20)' }}>
              <Plus size={20} className="text-[#C4B5FD] group-hover:scale-110 transition-transform" />
            </div>
            <div className="font-['Outfit'] text-[14px] font-semibold text-[#C4B5FD]">Nova Carteira</div>
            <div className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">Adicionar conta ou cartão</div>
          </div>
        </div>

        {/* BLOCO 4 - DETALHE DA CARTEIRA SELECIONADA */}
        {selectedWalletData && (
          <div className="rounded-[24px] border border-white/[0.06] p-[24px] shadow-2xl relative transition-all duration-300"
               style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}>
            <button 
              onClick={() => setSelectedWalletId(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
              
              {/* Coluna 1: Miniatura e Info Básica */}
              <div className="flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/[0.04] pb-6 lg:pb-0 pr-0 lg:pr-6">
                <div className="w-[200px] shrink-0">
                  <PhysicalCard wallet={selectedWalletData} />
                </div>
                <div className="font-['Outfit'] text-[16px] font-semibold text-white mt-[16px] mb-[4px]">
                  {selectedWalletData.name}
                </div>
                <div className="font-['Inter'] text-[13px] text-zinc-500 flex items-center gap-2">
                  {BANK_CONFIGS[selectedWalletData.bank]?.name}
                  <span className="px-2 py-0.5 rounded-[8px] text-[10px] uppercase font-semibold"
                        style={{ background: 'rgba(139,92,246,0.05)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.20)' }}>
                    Ativa
                  </span>
                </div>
              </div>

              {/* Coluna 2: Métricas do Mês */}
              <div className="flex flex-col gap-[12px] border-b lg:border-b-0 lg:border-r border-white/[0.04] pb-6 lg:pb-0 pr-0 lg:pr-6 justify-center">
                <div className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 mb-2 font-semibold">Resumo do mês</div>
                
                <div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
                  <div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Saldo Atual</div>
                  <div className="font-['Outfit'] text-[20px] font-bold tabular-nums text-white">
                    {formatCurrency(selectedWalletData.balance)}
                  </div>
                </div>
                
                <div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
                  <div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Entradas</div>
                  <div className="font-['Outfit'] text-[16px] font-semibold text-emerald-400 tabular-nums">
                    +{formatCurrency(selectedWalletData.income)}
                  </div>
                </div>

                <div className="p-3 rounded-xl flex items-center justify-between border border-white/[0.04]" style={{ background: 'rgba(17,17,19,0.5)' }}>
                  <div className="font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500">Saídas</div>
                  <div className="font-['Outfit'] text-[16px] font-semibold text-rose-400 tabular-nums">
                    -{formatCurrency(selectedWalletData.expense)}
                  </div>
                </div>
              </div>

              {/* Coluna 3: Últimas Transações */}
              <div className="flex flex-col">
                <div className="font-['Inter'] text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-semibold">Últimas movimentações</div>
                <div className="flex flex-col">
                  {selectedWalletData.transactions.length > 0 ? (
                    selectedWalletData.transactions.slice(0, 4).map((tx, idx) => (
                      <div key={idx} className="flex flex-row justify-between items-center py-2.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors duration-150">
                        <div className="flex flex-col gap-0.5">
                          <div className="font-['Inter'] text-[13px] text-white font-medium">{tx.desc}</div>
                          <div className="font-['Inter'] text-[11px] text-zinc-500 capitalize">{tx.date}</div>
                        </div>
                        <div className={`font-['Outfit'] text-[13px] font-semibold tabular-nums ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-500 text-[13px] font-['Inter'] py-4 italic">Sem movimentações recentes.</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* BLOCO 5 - DISTRIBUIÇÃO PATRIMONIAL */}
        {chartData.length > 0 && (
          <div className="rounded-[24px] border border-white/[0.05] p-[24px] flex flex-col md:flex-row gap-[32px] items-center shadow-2xl"
               style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}>
            
            {/* Gráfico Donut (SVG Puro) */}
            <div className="relative w-[160px] h-[160px] flex-shrink-0 border border-white/[0.04] rounded-full flex items-center justify-center p-3"
                 style={{ background: 'rgba(17,17,19,0.5)' }}>
              <svg width="144" height="144" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                {chartData.map((w, idx) => (
                  <circle
                    key={w.id}
                    cx="80"
                    cy="80"
                    r="64"
                    fill="none"
                    stroke={w.chartColor}
                    strokeWidth="12"
                    strokeDasharray={w.dasharray}
                    strokeDashoffset={w.dashoffset}
                    style={{ transition: 'stroke-dasharray 1s ease, stroke-dashoffset 1s ease' }}
                  />
                ))}
              </svg>
              {/* Texto Centralizado */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-['Inter'] text-[10px] uppercase text-zinc-500 font-semibold tracking-widest mb-0.5">Total</span>
                <span className="font-['Outfit'] text-[16px] font-bold tabular-nums"
                      style={{ 
                        background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                  {formatCurrency(totalBalance)}
                </span>
              </div>
            </div>

            {/* Legenda com Barras de Progresso Harmonizadas */}
            <div className="flex-1 w-full flex flex-col">
              {chartData.map(w => (
                <div key={w.id} className="flex flex-row items-center gap-[12px] py-[10px] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
                  <div className="w-[10px] h-[10px] rounded-full flex-shrink-0" style={{ backgroundColor: w.chartColor }} />
                  <div className="font-['Inter'] text-[13px] text-white font-medium flex-1 truncate">{w.name}</div>
                  
                  {/* Trilho de Progresso */}
                  <div className="hidden sm:block w-[120px] h-[6px] rounded-full bg-white/[0.04] overflow-hidden flex-shrink-0">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" 
                         style={{ width: `${w.percentage}%`, backgroundColor: w.chartColor }} />
                  </div>
                  
                  <div className="font-['Outfit'] text-[12px] font-semibold text-[#8B5CF6] tabular-nums min-w-[40px] text-right flex-shrink-0">
                    {w.percentage.toFixed(1)}%
                  </div>
                  <div className="font-['Outfit'] text-[13px] font-semibold tabular-nums min-w-[90px] text-right flex-shrink-0" style={{ color: w.chartColor }}>
                    {formatCurrency(w.balance)}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* ==========================================
          MODAIS E DIÁLOGOS DE INTERAÇÃO
          ========================================== */}

      {/* MODAL ADICIONAR / EDITAR CARTEIRA */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-overlay" onClick={() => setShowModal(false)} />
          
          <div className="relative z-[61] w-full max-w-[480px] bg-[#111113] border border-white/[0.06] rounded-[24px] p-[28px] animate-slide-up shadow-2xl"
               style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.10)' }}>
            
            {/* Header Modal */}
            <div className="flex items-center justify-between mb-[20px]">
              <div className="flex items-center gap-3">
                {editingWallet ? (
                  <div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                    <Pencil size={18} className="text-[#8B5CF6]" />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}>
                    <Wallet size={18} color="#FFF" />
                  </div>
                )}
                <div className="font-['Outfit'] text-[17px] font-semibold text-[#E8EAFF]">
                  {editingWallet ? 'Editar Carteira' : 'Nova Carteira'}
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-white/[0.05] text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Live Preview em Tempo Real */}
            <div className="w-[240px] mx-auto mb-[24px]">
               <PhysicalCard wallet={formPreviewWallet} />
            </div>

            {/* Formulário */}
            <div className="flex flex-col gap-[14px]">
              
              <div>
                <label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Nome</label>
                <input 
                  type="text"
                  placeholder="Ex: Conta Principal, Reserva, Moto..."
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full h-[44px] rounded-[12px] bg-[#09090B] border border-white/[0.08] px-4 font-['Inter'] text-[13px] text-white placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all"
                />
              </div>

              <div>
                <label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Banco ou Tipo</label>
                <div className="relative">
                  {/* Ícone customizado sobre o select native */}
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none">
                    {React.createElement(BANK_CONFIGS[formBank]?.icon || Wallet, { size: 16, color: BANK_CONFIGS[formBank]?.color || '#8B5CF6' })}
                  </div>
                  <select 
                    value={formBank}
                    onChange={(e) => setFormBank(e.target.value)}
                    className="w-full h-[44px] rounded-[12px] bg-[#09090B] border border-white/[0.08] pl-11 pr-10 font-['Inter'] text-[13px] text-white appearance-none focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all cursor-pointer"
                  >
                    <optgroup label="Bancos" className="bg-[#111113]">
                      {Object.values(BANK_CONFIGS).filter(b => b.isRealBank).map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Tipos" className="bg-[#111113]">
                      {Object.values(BANK_CONFIGS).filter(b => !b.isRealBank).map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={14} className="text-zinc-500" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Saldo Atual</label>
                  <div className="relative h-[52px] rounded-[12px] bg-[#09090B] border border-white/[0.08] focus-within:border-[#8B5CF6] focus-within:ring-[3px] focus-within:ring-[#8B5CF6]/20 transition-all overflow-hidden flex items-center">
                    <span className="font-['Inter'] text-[14px] text-zinc-500 absolute left-[14px] pointer-events-none font-semibold">R$</span>
                    <input 
                      type="text"
                      placeholder="0,00"
                      value={formBalance}
                      onChange={(e) => setFormBalance(formatInputValue(e.target.value))}
                      className="w-full h-full bg-transparent pl-[46px] pr-4 font-['Outfit'] text-[20px] font-semibold text-white tabular-nums placeholder-[#71717A] outline-none"
                    />
                  </div>
                </div>

                {BANK_CONFIGS[formBank]?.isRealBank && (
                  <div className="w-[120px]">
                    <label className="font-['Inter'] text-[12px] font-semibold text-zinc-500 uppercase tracking-widest block mb-2 truncate">
                      4 Dígitos <span className="text-zinc-500 font-normal lowercase tracking-normal bg-[#111113] rounded px-1.5 ml-1 text-[10px] border border-white/[0.04]">(opc)</span>
                    </label>
                    <input 
                      type="text"
                      maxLength={4}
                      placeholder="0000"
                      value={formDigits}
                      onChange={(e) => setFormDigits(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-[52px] rounded-[12px] bg-[#09090B] border border-white/[0.08] px-4 font-['Outfit'] text-[20px] font-medium text-white tabular-nums placeholder-zinc-500 focus:outline-none focus:border-[#8B5CF6] focus:ring-[3px] focus:ring-[#8B5CF6]/20 transition-all text-center"
                    />
                  </div>
                )}
              </div>

            </div>

            <div className="w-full h-[1px] my-[20px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

            {/* Footer Modal */}
            <div className="flex gap-[10px]">
              <button 
                onClick={() => setShowModal(false)}
                className="h-[42px] px-[20px] rounded-[10px] bg-transparent border border-white/[0.08] hover:bg-white/[0.04] font-['Inter'] text-[13px] font-medium text-zinc-400 hover:text-white transition-all outline-none"
              >
                Cancelar
              </button>
              <button 
                onClick={saveWallet}
                disabled={!formName.trim()}
                className="flex-1 h-[42px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed outline-none"
                style={{ 
                  background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
                  boxShadow: '0 4px 14px rgba(124,58,237,0.20)'
                }}
              >
                Salvar Carteira
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRMAÇÃO DE EXCLUSÃO */}
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
      )}

    </div>
  );
}