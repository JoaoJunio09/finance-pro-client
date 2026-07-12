import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Pencil, 
  Trash2,
  AlertCircle,
  Clock,
  CalendarClock,
  CheckCircle2,
  Pause,
  Play,
  Search,
  SlidersHorizontal,
  X,
  Check,
  LayoutGrid,
  Activity,
  Settings
} from 'lucide-react';

// ==========================================
// ESTILOS E ANIMAÇÕES GLOBAIS DA PÁGINA
// ==========================================

const GlobalStyles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes overlayFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(8px); } }
      @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes bottomSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      
      .animate-slide-up { animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      .animate-overlay { animation: overlayFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-drawer { animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-bottom-sheet { animation: bottomSheetUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}} />
  </>
);

// ==========================================
// COMPONENTES DE LAYOUT (SIDEBAR & NAV)
// ==========================================

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => (
  <>
    <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
    <aside className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isOpen ? 'w-[280px] md:w-[256px] translate-x-0 bg-[#09090B]/95 md:bg-[#09090B]/50 border-r border-white/[0.05] backdrop-blur-md shadow-2xl md:shadow-none' : 'w-[280px] md:w-[64px] -translate-x-full bg-[#09090B]/95 border-r border-transparent md:translate-x-0 md:bg-transparent md:backdrop-blur-none'}`}>
      <div className="flex items-center justify-center md:justify-start h-28 px-4 flex-shrink-0">
        <div onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111113] to-[#151518] flex items-center justify-center border border-white/[0.05] shadow-lg cursor-pointer hover:border-[#8B5CF6]/50 transition-colors relative group">
          <div className="w-4 h-4 rounded-full bg-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-shadow"></div>
        </div>
      </div>
      <div className={`flex-1 flex flex-col w-[280px] md:w-[256px] transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <nav className="flex-1 w-full flex flex-col gap-3 px-6 pt-4">
          <button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group"><LayoutGrid className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-['Inter'] font-medium">Dashboard</span></button>
          <button className="h-12 w-full rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center px-4 transition-all"><RefreshCw className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-['Inter'] font-medium">Recorrências</span></button>
          <button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group"><Settings className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-['Inter'] font-medium">Configurações</span></button>
        </nav>
      </div>
    </aside>
  </>
);

const MobileNav = ({ setIsOpen }: { setIsOpen: (v: boolean) => void }) => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.05] flex justify-around items-center py-5 px-6 z-40 safe-area-bottom">
    <button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2"><Menu className="w-6 h-6" /></button>
    <button className="text-zinc-500 hover:text-zinc-200 transition-colors p-2"><LayoutGrid className="w-6 h-6" /></button>
    <button className="text-[#8B5CF6] p-2"><RefreshCw className="w-6 h-6" /></button>
  </nav>
);

// ==========================================
// INTERFACES & TYPES
// ==========================================

export interface Recurrence {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  frequency: 'MONTHLY' | 'BIWEEKLY' | 'YEARLY';
  execution: 'AUTOMATIC' | 'MANUAL';
  dayOne: number;
  dayTwo?: number;
  monthOfYear?: number;
  category: string;
  wallet: string;
  isActive?: boolean;
}

// ==========================================
// MOCK DATA
// ==========================================

const MOCK_RECURRENCES: Recurrence[] = [
  { id: '1', name: 'Salário', type: 'INCOME', amount: 5200, frequency: 'MONTHLY', execution: 'AUTOMATIC', dayOne: 5, category: 'Salário', wallet: 'Conta Principal', isActive: true },
  { id: '2', name: 'Freelance Fixo', type: 'INCOME', amount: 1500, frequency: 'BIWEEKLY', execution: 'MANUAL', dayOne: 1, dayTwo: 15, category: 'Freelance', wallet: 'Conta Principal', isActive: true },
  { id: '3', name: 'Aluguel', type: 'EXPENSE', amount: 1200, frequency: 'MONTHLY', execution: 'AUTOMATIC', dayOne: 10, category: 'Moradia', wallet: 'Conta Principal', isActive: true },
  { id: '4', name: 'Netflix', type: 'EXPENSE', amount: 55.90, frequency: 'MONTHLY', execution: 'AUTOMATIC', dayOne: 15, category: 'Assinaturas', wallet: 'Conta Principal', isActive: true },
  { id: '5', name: 'Academia', type: 'EXPENSE', amount: 120, frequency: 'MONTHLY', execution: 'MANUAL', dayOne: 1, category: 'Saúde', wallet: 'Conta Principal', isActive: false },
  { id: '6', name: 'IPVA', type: 'EXPENSE', amount: 890, frequency: 'YEARLY', execution: 'MANUAL', dayOne: 15, monthOfYear: 3, category: 'Transporte', wallet: 'Moto', isActive: true },
  { id: '7', name: 'Assinatura Anual Prime', type: 'EXPENSE', amount: 179.90, frequency: 'YEARLY', execution: 'AUTOMATIC', dayOne: 12, monthOfYear: 7, category: 'Assinaturas', wallet: 'Conta Principal', isActive: true },
];

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Simulando o dia atual para os painéis funcionarem
const TODAY = 12;

// ==========================================
// UTILS
// ==========================================

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const getFrequencyLabel = (frequency: Recurrence['frequency']) => {
  switch (frequency) {
    case 'MONTHLY': return 'Mensal';
    case 'BIWEEKLY': return 'Quinzenal';
    case 'YEARLY': return 'Anual';
    default: return '';
  }
};

const getOccurrenceText = (recurrence: Recurrence) => {
  switch (recurrence.frequency) {
    case 'MONTHLY':
      return `Todo dia ${recurrence.dayOne}`;
    case 'BIWEEKLY':
      return `Dias ${recurrence.dayOne} e ${recurrence.dayTwo}`;
    case 'YEARLY':
      return `${recurrence.dayOne} de ${recurrence.monthOfYear ? MONTHS_PT[recurrence.monthOfYear - 1] : ''}`;
    default:
      return '';
  }
};

// ==========================================
// PÁGINA PRINCIPAL DE RECORRÊNCIAS
// ==========================================

export default function Recurrences() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [localRecurrences, setLocalRecurrences] = useState<Recurrence[]>(MOCK_RECURRENCES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados Avançados de Filtro e Ordenação
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');
  const [filterFrequency, setFilterFrequency] = useState<'ALL' | 'MONTHLY' | 'BIWEEKLY' | 'YEARLY'>('ALL');
  const [filterExecution, setFilterExecution] = useState<'ALL' | 'AUTOMATIC' | 'MANUAL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'ACTIVE' | 'PAUSED'>('ALL');
  const [sortBy, setSortBy] = useState<'DATE' | 'VALUE' | 'NAME'>('DATE');
  
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Controle de Recorrências já Confirmadas para Hoje/Atrasadas no ciclo atual
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);

  // Handlers simulados para as ações da página
  const onAddIncome = () => console.log('Add Income');
  const onAddExpense = () => console.log('Add Expense');
  const onAddRecurrence = () => console.log('Add Recurrence');
  const onEditRecurrence = (rec: Recurrence) => console.log('Edit Recurrence', rec);
  const onDeleteRecurrence = (id: string) => console.log('Delete Recurrence', id);

  // Toggle Pause (Local Mock)
  const togglePause = (id: string) => {
    setLocalRecurrences(prev => prev.map(r => r.id === id ? { ...r, isActive: r.isActive === false ? true : false } : r));
  };

  // Confirmar pagamento da recorrência manualmente (Ciclo atual)
  const handleConfirmRecurrence = (id: string) => {
    setConfirmedIds(prev => [...prev, id]);
  };

  // Cálculos Gerais do Banner Baseado em Ativas
  const { totalIncome, totalExpense, netImpact, activeCount, pausedCount, incomeCount, expenseCount } = useMemo(() => {
    let income = 0;
    let expense = 0;
    let iCount = 0;
    let eCount = 0;
    let aCount = 0;
    let pCount = 0;

    localRecurrences.forEach(rec => {
      const isActive = rec.isActive !== false;
      if (isActive) {
        aCount++;
        if (rec.type === 'INCOME') { income += rec.amount; iCount++; }
        else if (rec.type === 'EXPENSE') { expense += rec.amount; eCount++; }
      } else {
        pCount++;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      netImpact: income - expense,
      activeCount: aCount,
      pausedCount: pCount,
      incomeCount: iCount,
      expenseCount: eCount
    };
  }, [localRecurrences]);

  // Filtros Avançados e Ordenação da Lista Principal
  const filteredRecurrences = useMemo(() => {
    const result = localRecurrences.filter(rec => {
      const matchSearch = rec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rec.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rec.wallet.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'ALL' || rec.type === filterType;
      const matchFreq = filterFrequency === 'ALL' || rec.frequency === filterFrequency;
      const matchExec = filterExecution === 'ALL' || rec.execution === filterExecution;
      
      const isActive = rec.isActive !== false;
      const matchStatus = filterStatus === 'ALL' || (filterStatus === 'ACTIVE' && isActive) || (filterStatus === 'PAUSED' && !isActive);
      
      return matchSearch && matchType && matchFreq && matchExec && matchStatus;
    });

    // Ordenação Avançada
    return result.sort((a, b) => {
      if (sortBy === 'NAME') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'VALUE') {
        return b.amount - a.amount;
      }
      // Ordenação Padrão por data mais próxima do mês (dia de vencimento)
      return a.dayOne - b.dayOne;
    });
  }, [localRecurrences, searchQuery, filterType, filterFrequency, filterExecution, filterStatus, sortBy]);

  // Painéis Laterais (Em Atraso, Hoje, Próximos 7 dias) - Filtra itens confirmados
  const { overdue, today, next7Days } = useMemo(() => {
    const active = localRecurrences.filter(r => r.isActive !== false && !confirmedIds.includes(r.id));
    
    return {
      overdue: active.filter(r => r.frequency === 'MONTHLY' && r.dayOne < TODAY),
      today: active.filter(r => r.frequency === 'MONTHLY' && r.dayOne <= TODAY),
      next7Days: active.filter(r => r.frequency === 'MONTHLY' && r.dayOne > TODAY && r.dayOne <= TODAY + 7)
    };
  }, [localRecurrences, confirmedIds]);

  const activeFiltersCount = 
    (filterType !== 'ALL' ? 1 : 0) + 
    (filterFrequency !== 'ALL' ? 1 : 0) + 
    (filterExecution !== 'ALL' ? 1 : 0) + 
    (filterStatus !== 'ALL' ? 1 : 0) + 
    (sortBy !== 'DATE' ? 1 : 0);

  return (
    <div className="min-h-screen flex bg-[#09090B] font-['Inter'] text-white pb-20 relative">
      <GlobalStyles />
      
      {/* Gradiente Radial de Fundo Global */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, rgba(9, 9, 11, 0) 60%)'
          }}
        />
      </div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 w-full min-w-0 flex flex-col relative z-10 animate-slide-up">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col w-full">
          
          {/* BLOCO A — HEADER DA PÁGINA */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-[16px] mb-[24px]">
            <div>
              <h1 className="font-['Outfit'] text-[24px] font-bold text-[#FFFFFF] tracking-tight">Recorrências</h1>
              <p className="font-['Inter'] text-[14px] text-zinc-500 mt-[2px]">Receitas e despesas automáticas do seu mês</p>
            </div>

            <div className="flex flex-row gap-[8px] flex-wrap w-full sm:w-auto overflow-x-auto hide-scrollbar">
              <button 
                onClick={onAddIncome}
                className="flex items-center gap-[6px] h-[38px] px-[16px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#34D399] transition-all duration-150 outline-none hover:-translate-y-[1px]"
                style={{ backgroundColor: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.15)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.15)'; e.currentTarget.style.borderColor = 'rgba(52,211,153,0.30)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.08)'; e.currentTarget.style.borderColor = 'rgba(52,211,153,0.15)'; }}
              >
                <TrendingUp size={14} />
                Receita
              </button>
              
              <button 
                onClick={onAddExpense}
                className="flex items-center gap-[6px] h-[38px] px-[16px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#F87171] transition-all duration-150 outline-none hover:-translate-y-[1px]"
                style={{ backgroundColor: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.15)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.30)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.08)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.15)'; }}
              >
                <TrendingDown size={14} />
                Despesa
              </button>
              
              <button 
                onClick={onAddRecurrence}
                className="flex items-center gap-[6px] h-[38px] px-[18px] rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#FFFFFF] transition-all duration-150 outline-none hover:-translate-y-[1px] active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', boxShadow: '0 4px 14px rgba(124,58,237,0.30)' }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #6D28D9, #5B21B6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED, #6D28D9)'; }}
              >
                <RefreshCw size={14} color="#FFFFFF" />
                Recorrência
              </button>
            </div>
          </div>

          {/* BANNER PRINCIPAL DE IMPACTO */}
          <div className="w-full relative overflow-hidden rounded-[24px] p-[24px] sm:p-[28px] mb-[24px] shadow-2xl border border-white/[0.06]"
              style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}>
            
            {/* Decoração Sutil */}
            <div className="absolute top-[-60px] right-[-40px] w-[200px] h-[200px] rounded-full border border-white/[0.02] pointer-events-none opacity-40" />
            <div className="absolute top-[10px] right-[60px] w-[140px] h-[140px] rounded-full border border-white/[0.01] pointer-events-none opacity-40" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[30%]" 
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
              
              {/* COLUNA 1: Impacto Geral */}
              <div className="lg:col-span-2 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/[0.06] pb-6 sm:pb-0 pr-0 sm:pr-[20px] lg:pr-[32px]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">
                  Impacto Mensal Recorrente
                </span>
                <div className="font-['Outfit'] text-[36px] sm:text-[40px] font-bold tabular-nums mt-[8px]"
                    style={netImpact >= 0 ? {
                        background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      } : { color: '#F87171' }}>
                  {netImpact > 0 ? '+' : ''}{formatCurrency(netImpact)}
                </div>
                
                <div className="flex items-center gap-[6px] mt-[8px]">
                  {netImpact >= 0 ? (
                    <>
                      <TrendingUp size={13} className="text-[#8B5CF6]" />
                      <span className="font-['Inter'] text-[12px] text-zinc-400">Receitas recorrentes cobrem suas despesas fixas</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={13} className="text-[#F87171]" />
                      <span className="font-['Inter'] text-[12px] text-[#F87171]">Despesas fixas superam receitas</span>
                    </>
                  )}
                </div>
              </div>

              {/* COLUNA 2: Receitas */}
              <div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Receitas Recorrentes</span>
                <span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#34D399] mt-[8px]">{formatCurrency(totalIncome)}</span>
                <span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{incomeCount} ativas</span>
              </div>

              {/* COLUNA 3: Despesas */}
              <div className="flex flex-col justify-center border-b sm:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Despesas Recorrentes</span>
                <span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#F87171] mt-[8px]">{formatCurrency(totalExpense)}</span>
                <span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{expenseCount} ativas</span>
              </div>

              {/* COLUNA 4: Total Cadastradas */}
              <div className="flex flex-col justify-center pt-6 sm:pt-0 pl-0 sm:pl-[20px] lg:pl-[24px]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500">Total Cadastradas</span>
                <span className="font-['Outfit'] text-[22px] font-bold tabular-nums text-[#FFFFFF] mt-[8px]">{activeCount + pausedCount}</span>
                {pausedCount > 0 ? (
                  <span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">{pausedCount} pausadas</span>
                ) : (
                  <span className="font-['Inter'] text-[12px] text-zinc-500 mt-[4px]">Todas ativas</span>
                )}
              </div>

            </div>
          </div>

          {/* LAYOUT GERAL (2 COLUNAS) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">
            
            {/* COLUNA ESQUERDA: Filtros + Lista Principal */}
            <div className="flex flex-col order-2 lg:order-1 min-w-0">
              
              {/* Filtros e Busca */}
              <div className="flex flex-row items-center gap-[10px] mb-[16px]">
                <div className="flex-1 relative">
                  <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 text-zinc-500 w-[15px] h-[15px]" />
                  <input 
                    type="text" 
                    placeholder="Buscar por nome, categoria ou carteira..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full h-[40px] rounded-[12px] pl-[36px] pr-[16px] font-['Inter'] text-[13px] text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518]"
                    style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
                  />
                </div>
                
                <button 
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="relative flex items-center justify-center h-[40px] px-[16px] rounded-[12px] gap-[8px] font-['Inter'] text-[13px] font-medium transition-all outline-none animate-pulse-subtle"
                  style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#A1A1AA'; }}
                >
                  <SlidersHorizontal size={15} />
                  <span className="hidden sm:block">Filtros Avançados</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-[6px] -right-[6px] w-[18px] h-[18px] rounded-full bg-[#8B5CF6] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              {/* LISTA COMPLETA */}
              <div className="w-full rounded-[24px] overflow-hidden" 
                  style={{ background: 'linear-gradient(to bottom right, #111113, #151518)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
                
                <div className="grid grid-cols-1 gap-0">
                  {filteredRecurrences.length > 0 ? (
                    filteredRecurrences.map((rec) => {
                      const isIncome = rec.type === 'INCOME';
                      const isPaused = rec.isActive === false;
                      const Icon = isIncome ? TrendingUp : TrendingDown;
                      const iconColor = isPaused ? '#71717A' : isIncome ? '#34D399' : '#F87171';
                      const iconBg = isPaused ? 'rgba(255,255,255,0.04)' : isIncome ? 'rgba(52,211,153,0.10)' : 'rgba(248,113,113,0.10)';

                      return (
                        <div 
                          key={rec.id} 
                          className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px] ${isPaused ? 'opacity-50' : ''}`}
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {/* Top/Left Mobile/Desktop: Icon + Info */}
                          <div className="flex items-center gap-[14px] flex-1 min-w-0">
                            <div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors" style={{ backgroundColor: iconBg }}>
                              <Icon size={18} color={iconColor} />
                            </div>

                            <div className="flex-1 min-w-0 flex flex-col">
                              <div className="flex flex-row justify-between items-center gap-[8px]">
                                <span className="font-['Inter'] text-[14px] font-semibold text-[#FFFFFF] truncate">
                                  {rec.name}
                                </span>
                                {/* Valor Mobile */}
                                <span className="sm:hidden font-['Outfit'] text-[15px] font-bold tabular-nums flex-shrink-0" style={{ color: iconColor }}>
                                  {isIncome ? '+' : '−'}{formatCurrency(rec.amount)}
                                </span>
                              </div>

                              <div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
                                <span className="font-['Inter'] text-[10px] font-semibold rounded-md px-[8px] py-[2px]" 
                                      style={{ backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
                                  {getFrequencyLabel(rec.frequency)}
                                </span>
                                <span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
                                <span className="font-['Inter'] text-[11px] text-zinc-500">{getOccurrenceText(rec)}</span>
                                <span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
                                <span className="font-['Inter'] text-[11px] text-zinc-500">{rec.category}</span>
                                <span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
                                <span className="font-['Inter'] text-[11px] text-zinc-500 truncate">{rec.wallet}</span>
                                <span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
                                <span className="font-['Inter'] text-[10px] text-zinc-600 uppercase tracking-widest">{rec.execution === 'AUTOMATIC' ? 'Automática' : 'Manual'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
                          <div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
                            {/* Valor Desktop */}
                            <span className="hidden sm:block font-['Outfit'] text-[15px] font-bold tabular-nums pr-[4px]" style={{ color: iconColor }}>
                              {isIncome ? '+' : '−'}{formatCurrency(rec.amount)}
                            </span>
                            
                            <div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
                            
                            {/* AÇÕES SEMPRE VISÍVEIS */}
                            <div className="flex flex-row gap-[4px] flex-shrink-0">
                              <button 
                                onClick={(e) => { e.stopPropagation(); togglePause(rec.id); }}
                                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none hover:bg-white/[0.06]"
                                title={isPaused ? "Retomar" : "Pausar"}
                              >
                                {isPaused ? <Play size={13} color="#34D399" /> : <Pause size={13} color="#71717A" />}
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); onEditRecurrence(rec); }}
                                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none hover:bg-white/[0.06] group/btn"
                                title="Editar"
                              >
                                <Pencil size={13} className="text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); onDeleteRecurrence(rec.id); }}
                                className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none bg-[#F871710F] hover:bg-[#F871711F]"
                                title="Remover"
                              >
                                <Trash2 size={13} color="#F87171" />
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-1 py-[56px] px-[24px] flex flex-col items-center justify-center text-center">
                      <div className="w-[48px] h-[48px] rounded-2xl flex items-center justify-center mb-[14px]" style={{ backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                        <RefreshCw size={22} color="#8B5CF6" />
                      </div>
                      <h3 className="font-['Outfit'] text-[15px] font-semibold text-[#FFFFFF]">Nenhuma recorrência encontrada</h3>
                      <p className="font-['Inter'] text-[13px] text-zinc-500 mt-[4px] max-w-[280px]">
                        Nenhuma recorrência corresponde aos filtros ativos.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Painéis de Contexto (Atraso, Hoje, 7 Dias) */}
            <div className="flex flex-col gap-[16px] order-1 lg:order-2 lg:sticky lg:top-8 w-full">
              
              {/* Card: Em Atraso (Com confirmação em tempo real) */}
              {overdue.length > 0 && (
                <div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <AlertCircle size={15} color="#F87171" />
                    <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#F87171]">Em Atraso</span>
                    <span className="ml-auto bg-[#F8717126] text-[#F87171] font-['Inter'] text-[11px] font-bold px-[8px] py-[2px] rounded-full">
                      {overdue.length}
                    </span>
                  </div>
                  <p className="font-['Inter'] text-[10px] text-zinc-500 mb-[12px]">Aguardando confirmação manual</p>
                  
                  <div className="flex flex-col gap-[8px]">
                    {overdue.map(rec => (
                      <div key={rec.id} className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
                        <div className="flex flex-col min-w-0 pr-[8px]">
                          <span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">{rec.name}</span>
                          <span className="font-['Inter'] text-[10px] text-[#F87171]">Atrasada há {TODAY - rec.dayOne} dias</span>
                        </div>
                        <div className="flex items-center gap-[10px] flex-shrink-0">
                          <span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white">
                            {rec.type === 'INCOME' ? '+' : '−'}{formatCurrency(rec.amount)}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleConfirmRecurrence(rec.id); }}
                            className="w-[28px] h-[28px] rounded-lg flex items-center justify-center transition-all hover:-translate-y-[1px] hover:scale-105 active:scale-95" 
                            title="Confirmar recebimento/pagamento" 
                            style={{ backgroundColor: 'rgba(52,211,153,0.10)' }} 
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.20)'} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.10)'}
                          >
                            <CheckCircle2 size={14} color="#34D399" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card: Pendentes Hoje (Com confirmação em tempo real) */}
              {today.length > 0 && (
                <div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
                  <div className="flex items-center gap-[8px] mb-[12px]">
                    <Clock size={15} color="#FBBF24" />
                    <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#FBBF24]">Pendentes Hoje</span>
                    <span className="ml-auto bg-[#FBBF2426] text-[#FBBF24] font-['Inter'] text-[11px] font-bold px-[8px] py-[2px] rounded-full">
                      {today.length}
                    </span>
                  </div>
                  <p className="font-['Inter'] text-[10px] text-zinc-500 mb-[12px]">Vencimento no dia de hoje</p>
                  
                  <div className="flex flex-col gap-[8px]">
                    {today.map(rec => (
                      <div key={rec.id} className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
                        <div className="flex flex-col min-w-0 pr-[8px]">
                          <span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">{rec.name}</span>
                          <span className="font-['Inter'] text-[10px] text-[#FBBF24]">Vence hoje</span>
                        </div>
                        <div className="flex items-center gap-[10px] flex-shrink-0">
                          <span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white">
                            {rec.type === 'INCOME' ? '+' : '−'}{formatCurrency(rec.amount)}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleConfirmRecurrence(rec.id); }}
                            className="w-[28px] h-[28px] rounded-lg flex items-center justify-center transition-all hover:-translate-y-[1px] hover:scale-105 active:scale-95" 
                            title="Confirmar recebimento/pagamento" 
                            style={{ backgroundColor: 'rgba(52,211,153,0.10)' }} 
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.20)'} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.10)'}
                          >
                            <CheckCircle2 size={14} color="#34D399" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card: Próximos 7 dias */}
              <div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)' }}>
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <CalendarClock size={15} color="#8B5CF6" />
                  <span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#8B5CF6]">Próximos 7 dias</span>
                </div>
                
                {next7Days.length > 0 ? (
                  <div className="flex flex-col gap-[8px]">
                    {next7Days.map(rec => (
                      <div key={rec.id} className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
                        <div className="flex flex-col min-w-0 pr-[8px]">
                          <span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">{rec.name}</span>
                          <span className="font-['Inter'] text-[10px] text-[#C4B5FD]">Em {rec.dayOne - TODAY} dia{rec.dayOne - TODAY > 1 ? 's' : ''} — {rec.dayOne} jul</span>
                        </div>
                        <span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white flex-shrink-0">
                          {rec.type === 'INCOME' ? '+' : '−'}{formatCurrency(rec.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-[20px]">
                    <p className="font-['Inter'] text-[12px] text-zinc-500">Nenhuma recorrência nos próximos 7 dias.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* DRAWER DE FILTROS ESTILIZADO (ATUALIZADO) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          
          <div className="relative w-full max-w-[340px] flex flex-col animate-drawer shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/[0.08]"
               style={{ background: 'linear-gradient(to bottom, #111113, #0D0D0F)' }}>
            
            {/* Header Drawer */}
            <div className="p-[20px] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <SlidersHorizontal size={18} color="#8B5CF6" />
                <h3 className="font-['Outfit'] text-[16px] font-semibold text-[#FFFFFF]">Filtros</h3>
                {activeFiltersCount > 0 && (
                  <span className="bg-[#8B5CF626] text-[#C4B5FD] font-['Inter'] text-[10px] font-bold px-[8px] py-[2px] rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 rounded-lg hover:bg-white/[0.06] text-zinc-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Body Drawer */}
            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pb-24">
              
              {/* Grupo: Tipo (Receita, Despesa ou Todos) */}
              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Tipo</span>
                <div className="flex flex-col gap-[8px]">
                  {(['ALL', 'INCOME', 'EXPENSE'] as const).map(t => {
                    const label = t === 'ALL' ? 'Todos os tipos' : t === 'INCOME' ? 'Receitas' : 'Despesas';
                    const active = filterType === t;
                    return (
                      <button 
                        key={t} onClick={() => setFilterType(t)}
                        className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
                        style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                      >
                        {label}
                        {active && <Check size={14} color="#C4B5FD" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Grupo: Frequência (Mensal, Quinzenal, Anual ou Todos) */}
              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Frequência</span>
                <div className="flex flex-col gap-[8px]">
                  {(['ALL', 'MONTHLY', 'BIWEEKLY', 'YEARLY'] as const).map(f => {
                    const label = f === 'ALL' ? 'Todas as frequências' : f === 'MONTHLY' ? 'Mensal' : f === 'BIWEEKLY' ? 'Quinzenal' : 'Anual';
                    const active = filterFrequency === f;
                    return (
                      <button 
                        key={f} onClick={() => setFilterFrequency(f)}
                        className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
                        style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                      >
                        {label}
                        {active && <Check size={14} color="#C4B5FD" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Grupo: Execução (Automática, Manual ou Todos) */}
              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Execução</span>
                <div className="flex flex-col gap-[8px]">
                  {(['ALL', 'AUTOMATIC', 'MANUAL'] as const).map(e => {
                    const label = e === 'ALL' ? 'Todos os formatos' : e === 'AUTOMATIC' ? 'Automática' : 'Manual';
                    const active = filterExecution === e;
                    return (
                      <button 
                        key={e} onClick={() => setFilterExecution(e)}
                        className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
                        style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                      >
                        {label}
                        {active && <Check size={14} color="#C4B5FD" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Grupo: Status */}
              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Status</span>
                <div className="flex flex-col gap-[8px]">
                  {(['ALL', 'ACTIVE', 'PAUSED'] as const).map(s => {
                    const label = s === 'ALL' ? 'Todos os status' : s === 'ACTIVE' ? 'Ativas' : 'Pausadas';
                    const active = filterStatus === s;
                    return (
                      <button 
                        key={s} onClick={() => setFilterStatus(s)}
                        className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
                        style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                      >
                        {label}
                        {active && <Check size={14} color="#C4B5FD" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Grupo: Ordenar por */}
              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Ordenar por</span>
                <div className="flex flex-col gap-[8px]">
                  {(['DATE', 'VALUE', 'NAME'] as const).map(sort => {
                    const label = sort === 'DATE' ? 'Vencimento (Mais próxima)' : sort === 'VALUE' ? 'Maior valor' : 'Nome alfabético';
                    const active = sortBy === sort;
                    return (
                      <button 
                        key={sort} onClick={() => setSortBy(sort)}
                        className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
                        style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
                      >
                        {label}
                        {active && <Check size={14} color="#C4B5FD" />}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Footer Drawer */}
            <div className="p-[20px] border-t border-white/[0.06] sticky bottom-0 flex flex-row items-center gap-[12px] bg-[#0D0D0F]/90 backdrop-blur-md">
              <button 
                onClick={() => { setFilterType('ALL'); setFilterFrequency('ALL'); setFilterExecution('ALL'); setFilterStatus('ALL'); setSortBy('DATE'); }}
                className="font-['Inter'] text-[13px] font-medium text-zinc-500 hover:text-white transition-colors py-[12px] px-[8px] outline-none"
              >
                Limpar
              </button>
              <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="flex-1 rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#FFFFFF] py-[12px] transition-all active:scale-[0.98] outline-none"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
              >
                Aplicar Filtros
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}