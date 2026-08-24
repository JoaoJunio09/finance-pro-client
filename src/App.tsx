import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Repeat,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Calendar,
  MonitorPlay,
  Home,
  Briefcase,
  Dumbbell,
  Shield,
  Wifi,
  X,
  Edit2,
  Trash2,
  Pause,
  Play,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Tag,
  ChevronRight,
  Sun,
  Moon,
  Check,
  ArrowUpDown,
  Hash,
  Zap,
  UserCheck,
  AlertTriangle,
  ZapOff
} from 'lucide-react';

// ==========================================
// 1. STYLES & THEME (Embedded CSS with Typography Hierarchy)
// ==========================================
const ThemeStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    :root, [data-theme="light"] {
      --bg-base: #F8F9FA;
      --bg-surface: #FFFFFF;
      --bg-elevated: #F3F4F6;
      --text-main: #18181B;
      --text-muted: #71717A;
      --border-color: rgba(0, 0, 0, 0.06);
      --border-light: rgba(0, 0, 0, 0.03);
      --border-hover: rgba(0, 0, 0, 0.12);
      --accent: #5B21B6;
      --accent-muted: rgba(91, 33, 182, 0.06);
      --income: #059669;
      --income-muted: rgba(5, 150, 105, 0.06);
      --expense: #DC2626;
      --expense-muted: rgba(220, 38, 38, 0.06);
      --warning: #D97706;
      --warning-muted: rgba(217, 119, 6, 0.08);
      --shadow-card: 0 1px 4px rgba(0, 0, 0, 0.04);
      --shadow-hover: 0 6px 16px rgba(0, 0, 0, 0.08);

      --font-display: 'Manrope', sans-serif;
      --font-heading: 'Plus Jakarta Sans', sans-serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-metric: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    [data-theme="dark"], .dark {
      --bg-base: #09090B;
      --bg-surface: #121214;
      --bg-elevated: #18181B;
      --text-main: #FAFAFA;
      --text-muted: #A1A1AA;
      --border-color: rgba(255, 255, 255, 0.08);
      --border-light: rgba(255, 255, 255, 0.04);
      --border-hover: rgba(255, 255, 255, 0.12);
      --accent: #7C3AED;
      --accent-muted: rgba(124, 58, 237, 0.12);
      --income: #10B981;
      --income-muted: rgba(16, 185, 129, 0.12);
      --expense: #EF4444;
      --expense-muted: rgba(239, 68, 68, 0.12);
      --warning: #F59E0B;
      --warning-muted: rgba(245, 158, 11, 0.12);
      --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.2);
      --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.4);
    }

    .font-display { font-family: var(--font-display); }
    .font-heading { font-family: var(--font-heading); }
    .font-body { font-family: var(--font-body); }
    .font-metric { font-family: var(--font-metric); }
    .font-mono { font-family: var(--font-mono); }

    .page-container {
      background-color: var(--bg-base);
      color: var(--text-main);
      min-height: 100vh;
      font-family: var(--font-body);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .header-bg {
      background: linear-gradient(to bottom right, #4C1D95, #312E81);
      position: relative;
    }

    .pattern-overlay {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==');
      mix-blend-mode: overlay;
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.3;
    }

    .surface {
      background-color: var(--bg-surface);
      border: 1px solid var(--border-color);
    }

    .elevated {
      background-color: var(--bg-elevated);
    }

    .text-main { color: var(--text-main); }
    .text-muted { color: var(--text-muted); }
    .text-accent { color: var(--accent); }
    .text-income { color: var(--income); }
    .text-expense { color: var(--expense); }
    .text-warning { color: var(--warning); }

    .border-default { border-color: var(--border-color); }
    .border-light { border-color: var(--border-light); }

    .badge-income { background-color: var(--income-muted); color: var(--income); }
    .badge-expense { background-color: var(--expense-muted); color: var(--expense); }
    .badge-warning { background-color: var(--warning-muted); color: var(--warning); }
    .badge-accent { background-color: var(--accent-muted); color: var(--accent); }

    .interactive-card {
      transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
    }
    .interactive-card:hover {
      box-shadow: var(--shadow-hover);
      border-color: var(--border-hover);
      transform: translateY(-2px);
    }

    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .drawer-overlay {
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.4s cubic-bezier(0.2, 0, 0, 1) forwards;
    }
    ` }} />
);

// ==========================================
// 2. TYPES & INTERFACES
// ==========================================
type RecurrenceType = 'INCOME' | 'EXPENSE';
type RecurrenceStatus = 'ACTIVE' | 'PAUSED' | 'ENDED';
type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
type ExecutionType = 'AUTOMATIC' | 'MANUAL';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface Wallet {
  id: string;
  name: string;
  color: string;
}

interface Recurrence {
  id: string;
  code: string;
  description: string;
  type: RecurrenceType;
  status: RecurrenceStatus;
  executionType: ExecutionType;
  amount: number;
  frequency: RecurrenceFrequency;
  category: Category;
  wallet: Wallet;
  startDate: string;
  nextDate: string | null;
  lastDate: string | null;
  occurrences: number;
  totalAmountProcessed: number;
}

interface FiltersState {
  type: string;
  status: string;
  frequency: string;
}

// ==========================================
// 3. MOCK DATA WITH TODAY / OVERDUE / UPCOMING DATES
// ==========================================
const mockCategories: Record<string, Category> = {
  salary: { id: 'c1', name: 'Salário', icon: Briefcase, color: '#10B981' },
  housing: { id: 'c2', name: 'Moradia', icon: Home, color: '#6366F1' },
  streaming: { id: 'c3', name: 'Assinaturas', icon: MonitorPlay, color: '#EC4899' },
  health: { id: 'c4', name: 'Saúde & Fitness', icon: Dumbbell, color: '#F59E0B' },
  insurance: { id: 'c5', name: 'Seguros', icon: Shield, color: '#3B82F6' },
  internet: { id: 'c6', name: 'Internet & TV', icon: Wifi, color: '#8B5CF6' }
};

const mockWallets: Record<string, Wallet> = {
  nubank: { id: 'w1', name: 'Nubank', color: '#8A05BE' },
  itau: { id: 'w2', name: 'Itaú', color: '#EC7000' },
  inter: { id: 'w3', name: 'Banco Inter', color: '#FF7A00' }
};

const getTodayIso = () => {
  const d = new Date();
  return d.toISOString();
};

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const getPastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const mockRecurrences: Recurrence[] = [
  // --- RECORRÊNCIAS PARA HOJE ---
  {
    id: 'rec-today-1',
    code: 'REC-2001',
    description: 'SmartFit - Plano Black',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 119.90,
    frequency: 'MONTHLY',
    category: mockCategories.health,
    wallet: mockWallets.nubank,
    startDate: '2023-01-24T00:00:00Z',
    nextDate: getTodayIso(),
    lastDate: getPastDate(30),
    occurrences: 14,
    totalAmountProcessed: 1678.60
  },
  {
    id: 'rec-today-2',
    code: 'REC-2002',
    description: 'Adobe Creative Cloud',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 224.00,
    frequency: 'MONTHLY',
    category: mockCategories.streaming,
    wallet: mockWallets.itau,
    startDate: '2022-08-24T00:00:00Z',
    nextDate: getTodayIso(),
    lastDate: getPastDate(31),
    occurrences: 24,
    totalAmountProcessed: 5376.00
  },

  // --- RECORRÊNCIAS PENDENTES ---
  {
    id: 'rec-pending-1',
    code: 'REC-2003',
    description: 'Claro Internet Fibra 500M',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 129.90,
    frequency: 'MONTHLY',
    category: mockCategories.internet,
    wallet: mockWallets.itau,
    startDate: '2023-03-20T00:00:00Z',
    nextDate: getPastDate(4),
    lastDate: getPastDate(34),
    occurrences: 16,
    totalAmountProcessed: 2078.40
  },
  {
    id: 'rec-pending-2',
    code: 'REC-2004',
    description: 'Seguro Residencial Porto',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 180.00,
    frequency: 'MONTHLY',
    category: mockCategories.insurance,
    wallet: mockWallets.inter,
    startDate: '2023-05-18T00:00:00Z',
    nextDate: getPastDate(6),
    lastDate: getPastDate(36),
    occurrences: 15,
    totalAmountProcessed: 2700.00
  },

  // --- PRÓXIMAS RECORRÊNCIAS ---
  {
    id: 'rec-upcoming-1',
    code: 'REC-1092',
    description: 'Salário Mensal TechCorp',
    type: 'INCOME',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 9500.00,
    frequency: 'MONTHLY',
    category: mockCategories.salary,
    wallet: mockWallets.itau,
    startDate: '2023-01-05T00:00:00Z',
    nextDate: getFutureDate(3),
    lastDate: getPastDate(27),
    occurrences: 18,
    totalAmountProcessed: 171000.00
  },
  {
    id: 'rec-upcoming-2',
    code: 'REC-1093',
    description: 'Aluguel Apartamento Jardins',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 2800.00,
    frequency: 'MONTHLY',
    category: mockCategories.housing,
    wallet: mockWallets.nubank,
    startDate: '2023-02-10T00:00:00Z',
    nextDate: getFutureDate(7),
    lastDate: getPastDate(23),
    occurrences: 17,
    totalAmountProcessed: 47600.00
  },
  {
    id: 'rec-upcoming-3',
    code: 'REC-1094',
    description: 'Netflix Family Plan',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 55.90,
    frequency: 'MONTHLY',
    category: mockCategories.streaming,
    wallet: mockWallets.nubank,
    startDate: '2022-05-15T00:00:00Z',
    nextDate: getFutureDate(12),
    lastDate: getPastDate(18),
    occurrences: 26,
    totalAmountProcessed: 1453.40
  },
  {
    id: 'rec-upcoming-4',
    code: 'REC-1095',
    description: 'Consultoria UI/UX Semanal',
    type: 'INCOME',
    status: 'PAUSED',
    executionType: 'MANUAL',
    amount: 1500.00,
    frequency: 'WEEKLY',
    category: mockCategories.salary,
    wallet: mockWallets.inter,
    startDate: '2023-08-01T00:00:00Z',
    nextDate: null,
    lastDate: getPastDate(45),
    occurrences: 10,
    totalAmountProcessed: 15000.00
  }
];

// ==========================================
// 4. UTILS
// ==========================================
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/D';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString));
};

const getDaysDifference = (dateString: string | null) => {
  if (!dateString) return null;
  const target = new Date(dateString);
  const today = new Date();
  
  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

const translateFrequency = (freq: RecurrenceFrequency) => {
  const map = { DAILY: 'Diário', WEEKLY: 'Semanal', MONTHLY: 'Mensal', YEARLY: 'Anual' };
  return map[freq];
};

const translateStatus = (status: RecurrenceStatus) => {
  const map = { ACTIVE: 'Ativa', PAUSED: 'Pausada', ENDED: 'Encerrada' };
  return map[status];
};

// ==========================================
// 5. SUB-COMPONENTS
// ==========================================

// --- SUB-HEADER ---
const RecurrencesHeader = ({ 
  onNew, 
  theme, 
  onThemeChange 
}: { 
  onNew: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (t: 'light' | 'dark') => void;
}) => (
  <div className="header-bg w-full relative z-20 pt-8 pb-12 shadow-md">
    <div className="pattern-overlay"></div>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
      <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
        <span className="font-body text-xs font-medium text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 shadow-sm">
          <Repeat size={14} className="text-white" />
          Visão de Compromissos
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight mt-1">
          Recorrências
        </h1>
        <p className="font-body text-sm font-normal text-white/80 max-w-md leading-relaxed mt-1">
          Gerencie suas assinaturas, parcelamentos e compromissos fixos em um só lugar.
        </p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1 h-11 shrink-0">
          <button
            onClick={() => onThemeChange('light')}
            className={`flex items-center justify-center px-3 rounded-lg transition-colors ${
              theme === 'light' ? 'bg-white text-[#4C1D95] shadow-sm' : 'text-white hover:bg-white/10'
            }`}
            title="Light Mode"
          >
            <Sun size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`flex items-center justify-center px-3 rounded-lg transition-colors ${
              theme === 'dark' ? 'bg-[#121214] text-white shadow-sm' : 'text-white hover:bg-white/10'
            }`}
            title="Dark Mode"
          >
            <Moon size={16} strokeWidth={2.5} />
          </button>
        </div>

        <button 
          onClick={onNew}
          className="font-body flex flex-1 sm:flex-none px-5 py-2.5 h-11 rounded-xl bg-white text-[#4C1D95] text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-95 items-center gap-2 justify-center cursor-pointer"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="whitespace-nowrap">Nova Recorrência</span>
        </button>
      </div>
    </div>
  </div>
);

// --- ENHANCED UPCOMING HIGHLIGHTS CARDS ---
const UpcomingHighlights = ({ items, onSelect }: { items: Recurrence[], onSelect: (r: Recurrence) => void }) => {
  if (items.length === 0) return null;
  
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-accent" />
          <h3 className="font-heading font-semibold text-lg text-main">Destaques da Semana</h3>
          <span className="font-body text-xs text-muted font-medium ml-1 bg-elevated px-2 py-0.5 rounded-md border border-light">
            {items.length} próximos
          </span>
        </div>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {items.map(item => {
          const Icon = item.category.icon;
          const days = getDaysDifference(item.nextDate);
          const isIncome = item.type === 'INCOME';
          const isToday = days === 0;
          const isTomorrow = days === 1;
          const isAuto = item.executionType === 'AUTOMATIC';
          
          return (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="surface interactive-card min-w-[270px] max-w-[300px] p-4.5 rounded-2xl flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden border border-default shadow-sm group"
            >
              {/* Borda Lateral Colorida mantida e destacada */}
              <div 
                className="absolute top-0 left-0 w-1.5 h-full transition-all duration-200 group-hover:w-2" 
                style={{ backgroundColor: item.category.color }} 
              />
              
              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start gap-3 pl-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="p-2.5 rounded-xl text-white shadow-sm shrink-0 transition-transform group-hover:scale-105" 
                    style={{ backgroundColor: item.category.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-main truncate leading-snug">
                      {item.description}
                    </h4>
                    <p className="font-body font-normal text-xs text-muted truncate mt-0.5">
                      {item.category.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações Auxiliares & Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pl-1">
                <span className={`font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                  isAuto ? 'badge-accent border-transparent' : 'elevated text-muted border-light'
                }`}>
                  {isAuto ? <Zap size={10} /> : <UserCheck size={10} />}
                  <span>{isAuto ? 'Automática' : 'Manual'}</span>
                </span>

                <span className="font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium elevated text-muted border border-light">
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: item.wallet.color }} />
                  <span>{item.wallet.name}</span>
                </span>
              </div>
              
              {/* Rodapé com Valor e Vencimento */}
              <div className="flex items-end justify-between pt-2 border-t border-light pl-1">
                <div>
                  <span className="font-body text-[11px] font-medium text-muted block mb-0.5">
                    {isIncome ? 'Receita' : 'Valor'}
                  </span>
                  <span className={`font-metric font-bold tracking-tight text-lg ${isIncome ? 'text-income' : 'text-main'}`}>
                    {isIncome ? '+ ' : ''}{formatCurrency(item.amount)}
                  </span>
                </div>

                <div className={`font-body px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1 ${
                  isToday ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-500/10 dark:border-red-500/20' :
                  isTomorrow ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20' :
                  'elevated text-muted border-light'
                }`}>
                  <Calendar size={12} className="opacity-70" />
                  <span>{isToday ? 'Hoje' : isTomorrow ? 'Amanhã' : `Em ${days}d`}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- TOOLBAR ---
interface RecurrencesToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FiltersState;
  onOpenFilters: () => void;
}

const RecurrencesToolbar = ({
  searchQuery,
  setSearchQuery,
  filters,
  onOpenFilters
}: RecurrencesToolbarProps) => {
  const hasActiveFilters = 
    filters.type !== 'ALL' || 
    filters.status !== 'ALL' || 
    filters.frequency !== 'ALL';

  return (
    <div className="surface rounded-2xl p-4 shadow-sm border border-default">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" 
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por nome ou categoria..."
            className="font-body w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-normal focus:outline-none transition-all border elevated border-light text-main focus:border-accent placeholder:text-muted"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-main transition-colors cursor-pointer"
              title="Limpar pesquisa"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          onClick={onOpenFilters}
          className="relative flex items-center justify-center w-[42px] h-[42px] rounded-xl transition-all shrink-0 shadow-sm border elevated border-light text-main hover:border-accent hover:text-accent cursor-pointer"
          aria-label="Filtros"
          title="Filtros"
        >
          <Filter size={18} />
          {hasActiveFilters && (
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-elevated bg-[var(--accent)]" />
          )}
        </button>
      </div>
    </div>
  );
};

// --- SINGLE RECURRENCE CARD COMPONENT ---
const RecurrenceCard = ({ 
  item, 
  onSelect, 
  onConfirm 
}: { 
  item: Recurrence; 
  onSelect: (r: Recurrence) => void; 
  onConfirm?: (e: React.MouseEvent, r: Recurrence) => void; 
}) => {
  const Icon = item.category.icon;
  const isIncome = item.type === 'INCOME';
  const days = getDaysDifference(item.nextDate);
  const isOverdue = days !== null && days < 0;
  const isToday = days === 0;
  const isAuto = item.executionType === 'AUTOMATIC';

  return (
    <div
      onClick={() => onSelect(item)}
      className={`group surface interactive-card p-4 sm:p-4.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isOverdue ? 'border-amber-500/30 dark:border-amber-500/20' : 'border-default'
      }`}
    >
      {/* Borda Lateral Colorida de Identidade Visual */}
      <div 
        className="absolute top-0 left-0 w-1.5 h-full transition-all duration-200 group-hover:w-2"
        style={{ backgroundColor: item.category.color }} 
      />

      {/* Conteúdo Principal Esquerda */}
      <div className="flex items-start sm:items-center gap-3.5 pl-1 min-w-0">
        <div 
          className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-sm transition-transform group-hover:scale-105"
          style={{ backgroundColor: item.category.color }}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-heading font-semibold text-sm sm:text-base text-main truncate">
              {item.description}
            </h4>

            {/* Badges do Item */}
            <span className={`font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${
              isAuto ? 'badge-accent' : 'elevated text-muted border border-light'
            }`}>
              {isAuto ? <Zap size={10} /> : <UserCheck size={10} />}
              <span>{isAuto ? 'Automática' : 'Manual'}</span>
            </span>

            {isOverdue && (
              <span className="font-body inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold badge-warning">
                <AlertTriangle size={10} />
                <span>Pendente ({Math.abs(days!)}d atrás)</span>
              </span>
            )}
          </div>

          <div className="font-body flex items-center gap-2 text-xs font-normal text-muted flex-wrap">
            <span>{item.category.name}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.wallet.color }} />
              {item.wallet.name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Repeat size={11} className="text-muted" />
              {translateFrequency(item.frequency)}
            </span>
            <span>•</span>
            <span className={isOverdue ? 'text-amber-600 dark:text-amber-400 font-medium' : isToday ? 'text-expense font-semibold' : ''}>
              {isToday ? 'Vence Hoje' : isOverdue ? `Venceu em ${formatDate(item.nextDate)}` : `Próxima: ${formatDate(item.nextDate)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Valores & Ação Directa */}
      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-1 pt-2 md:pt-0 border-t md:border-t-0 border-light">
        <div className="text-left md:text-right">
          <span className="font-body text-[10px] font-medium text-muted uppercase tracking-wider block md:hidden">Valor</span>
          <div className={`font-metric font-bold text-lg sm:text-xl ${isIncome ? 'text-income' : 'text-main'}`}>
            {isIncome ? '+ ' : '- '}{formatCurrency(item.amount)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Ação manual rápida se for item pendente ou de hoje */}
          {!isAuto && onConfirm && item.status === 'ACTIVE' && (
            <button
              onClick={(e) => onConfirm(e, item)}
              className="font-body px-3 py-1.5 rounded-xl bg-[#5B21B6] text-white text-xs font-medium hover:bg-[#4C1D95] transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              title="Registrar liquidação"
            >
              <Check size={14} />
              <span>Confirmar</span>
            </button>
          )}

          <div className="p-1.5 rounded-lg text-muted group-hover:text-main group-hover:bg-elevated transition-all">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FILTERS DRAWER ---
interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

const FiltersDrawer = ({ isOpen, onClose, filters, setFilters }: FiltersDrawerProps) => {
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  const [isVisible, setIsVisible] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setRenderDrawer(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setRenderDrawer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, filters]);

  if (!renderDrawer) return null;

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared = { type: 'ALL', status: 'ALL', frequency: 'ALL' };
    setLocalFilters(cleared);
    setFilters(cleared);
    onClose();
  };

  const content = (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className={`fixed inset-0 drawer-overlay transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose} 
      />

      <div className={`relative w-full lg:h-full h-[92vh] overflow-auto sm:max-w-[450px] shadow-2xl flex flex-col z-10 transition-transform duration-300 sm:border-l border-t sm:border-t-0 rounded-t-3xl sm:rounded-none surface border-default ${
        isVisible ? 'translate-y-0 translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 md:p-6 pb-2 shrink-0">
          <h3 className="font-display font-bold text-lg flex items-center gap-2 text-main">
            <Filter size={20} className="text-accent" />
            <span>Filtros Avançados</span>
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl text-muted hover:text-main hover:bg-elevated transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <label className="font-body text-xs font-medium flex items-center gap-2 mb-2.5 text-muted">
              <ArrowUpDown size={14} /> Tipo de Recorrência
            </label>
            <select
              value={localFilters.type}
              onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value })}
              className="font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer elevated border-light text-main focus:border-accent hover:border-hover transition-colors"
            >
              <option value="ALL">Todas as Recorrências</option>
              <option value="INCOME">Entradas (Receitas)</option>
              <option value="EXPENSE">Saídas (Despesas)</option>
            </select>
          </div>

          <div>
            <label className="font-body text-xs font-medium flex items-center gap-2 mb-2.5 text-muted">
              <CheckCircle2 size={14} /> Status
            </label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className="font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer elevated border-light text-main focus:border-accent hover:border-hover transition-colors"
            >
              <option value="ALL">Todos os Status</option>
              <option value="ACTIVE">Ativa</option>
              <option value="PAUSED">Pausada</option>
              <option value="ENDED">Encerrada</option>
            </select>
          </div>

          <div>
            <label className="font-body text-xs font-medium flex items-center gap-2 mb-2.5 text-muted">
              <Repeat size={14} /> Frequência
            </label>
            <select
              value={localFilters.frequency}
              onChange={(e) => setLocalFilters({ ...localFilters, frequency: e.target.value })}
              className="font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer elevated border-light text-main focus:border-accent hover:border-hover transition-colors"
            >
              <option value="ALL">Todas as Frequências</option>
              <option value="DAILY">Diário</option>
              <option value="WEEKLY">Semanal</option>
              <option value="MONTHLY">Mensal</option>
              <option value="YEARLY">Anual</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-light flex flex-col sm:flex-row items-center gap-3 shrink-0 surface">
          <button onClick={handleClear} className="font-body cursor-pointer w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border border-default text-main font-semibold text-sm hover:bg-elevated transition-colors">
            Limpar
          </button>
          <button onClick={handleApply} className="font-body cursor-pointer w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-sm font-semibold shadow-sm flex items-center justify-center gap-2 bg-[#5B21B6] text-white hover:opacity-90 transition-colors">
            <Check size={18} />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

// --- DETAILS DRAWER ---
interface DetailsDrawerProps {
  item: Recurrence | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (item: Recurrence) => void;
}

const DetailsDrawer = ({ item, isOpen, onClose, onDelete, onToggleStatus, onEdit }: DetailsDrawerProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [visibleItem, setVisibleItem] = useState<Recurrence | null>(item);

  useEffect(() => {
    if (isOpen && item) {
      setShouldRender(true);
      setVisibleItem(item);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, item]);

  if (!shouldRender || !visibleItem) return null;

  const Icon = visibleItem.category.icon;
  const isIncome = visibleItem.type === 'INCOME';

  const content = (
    <div className={`fixed inset-0 z-50 flex sm:justify-end flex-col sm:flex-row ${animateIn ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`fixed inset-0 drawer-overlay transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose} 
      />
      
      <div className={`surface w-full h-[92vh] lg:h-full sm:max-w-[450px] mt-auto sm:mt-0 shadow-2xl flex flex-col z-10 transition-transform duration-300 sm:border-l border-t sm:border-t-0 rounded-t-3xl sm:rounded-none ${
        animateIn ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
      }`}>
        
        <div className="flex items-center justify-between p-5 pb-0 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`font-body px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
              visibleItem.status === 'ACTIVE' ? 'badge-income border-transparent' : 
              visibleItem.status === 'PAUSED' ? 'badge-warning border-transparent' : 
              'elevated text-muted border-light'
            }`}>
              {translateStatus(visibleItem.status)}
            </span>
            <span className="font-mono text-xs font-normal text-muted bg-elevated px-2 py-0.5 rounded border border-light flex items-center gap-1">
              <Hash size={10} />
              {visibleItem.code}
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-muted hover:bg-elevated hover:text-main transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 pt-3 flex-1 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mb-4 shadow-sm text-white" style={{ backgroundColor: visibleItem.category.color }}>
              <Icon size={32} strokeWidth={2} />
            </div>
            
            <h3 className="font-display font-bold text-2xl text-main mb-1.5 px-4">{visibleItem.description}</h3>
            
            <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
              <span className="font-body text-[12px] font-medium uppercase tracking-wider text-muted">{visibleItem.category.name}</span>
              <span className="w-1 h-1 rounded-full bg-border-hover"></span>
              <span className="font-body flex items-center gap-1 text-[12px] font-medium badge-accent px-2 py-0.5 rounded-md">
                {visibleItem.executionType === 'AUTOMATIC' ? <Zap size={12} /> : <UserCheck size={12} />}
                {visibleItem.executionType === 'AUTOMATIC' ? 'Execução Automática' : 'Execução Manual'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center elevated w-full py-6 rounded-2xl border border-light">
              <span className="font-body text-xs font-medium text-muted uppercase tracking-wider mb-1">Valor do Contrato</span>
              <div className={`font-metric text-4xl font-bold tracking-tight ${isIncome ? 'text-income' : 'text-main'}`}>
                {isIncome ? '+ ' : '- '}{formatCurrency(visibleItem.amount)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <h4 className="font-heading font-semibold text-sm text-main px-1">Detalhes do Contrato</h4>
            <div className="border border-light rounded-2xl flex flex-col text-[14px] surface overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-light">
                <span className="font-body flex items-center gap-2.5 font-normal text-muted">
                  <Calendar size={18} className="text-accent" /> Próxima Cobrança
                </span>
                <span className="font-body font-semibold text-main">{formatDate(visibleItem.nextDate)}</span>
              </div>

              <div className="flex items-center justify-between p-4 border-b border-light">
                <span className="font-body flex items-center gap-2.5 font-normal text-muted">
                  <Clock size={18} /> Última Cobrança
                </span>
                <span className="font-body font-medium text-main">{formatDate(visibleItem.lastDate)}</span>
              </div>

              <div className="flex items-center justify-between p-4 border-b border-light">
                <span className="font-body flex items-center gap-2.5 font-normal text-muted">
                  <Wallet size={18} /> Carteira
                </span>
                <span className="font-body font-medium text-main flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: visibleItem.wallet.color }} />
                  {visibleItem.wallet.name}
                </span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span className="font-body flex items-center gap-2.5 font-normal text-muted">
                  <CheckCircle2 size={18} /> Ocorrências
                </span>
                <span className="font-metric font-medium text-main">{visibleItem.occurrences} processadas</span>
              </div>
            </div>
          </div>

          <div className="border border-light rounded-2xl p-5 surface flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-body text-xs font-medium text-muted uppercase tracking-wide">Total Histórico</span>
              <span className="font-body text-[11px] font-normal text-muted mt-0.5">Montante acumulado</span>
            </div>
            <span className="font-metric text-lg font-bold text-main">{formatCurrency(visibleItem.totalAmountProcessed)}</span>
          </div>
        </div>

        <div className="p-5 border-t border-light flex flex-col sm:flex-row items-center gap-3 shrink-0 surface">
          <button 
            onClick={() => onDelete(visibleItem.id)}
            className="font-body w-full sm:w-auto p-3.5 rounded-xl badge-expense border border-transparent text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
            title="Excluir"
          >
            <Trash2 size={20} /> <span className="sm:hidden">Excluir</span>
          </button>

          <button 
            onClick={() => onToggleStatus(visibleItem.id)}
            className={`font-body w-full sm:w-auto flex-1 py-3.5 px-4 rounded-xl border border-transparent font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer ${
              visibleItem.status === 'ACTIVE' ? 'badge-warning' : 'badge-income'
            }`}
          >
            {visibleItem.status === 'ACTIVE' ? <><Pause size={18} /> Pausar</> : <><Play size={18} /> Ativar</>}
          </button>

          <button 
            onClick={() => onEdit(visibleItem)}
            className="font-body w-full sm:w-auto flex-[1.5] py-3.5 px-4 rounded-xl badge-accent border border-transparent font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-opacity shadow-sm cursor-pointer"
          >
            <Edit2 size={18} /> Editar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

// --- MOCK CREATE MODAL ---
const CreateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 drawer-overlay" onClick={onClose} />
      <div className="surface w-full max-w-md rounded-3xl z-10 overflow-hidden shadow-2xl animate-fade-in-up">
        <div className="p-5 border-b border-light flex justify-between items-center elevated">
          <h2 className="font-display font-bold text-lg text-main">Nova Recorrência</h2>
          <button onClick={onClose} className="text-muted hover:text-main cursor-pointer"><X size={20} /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="font-body text-xs font-medium text-muted mb-1 block">Descrição</label>
            <input type="text" placeholder="Ex: Conta de Luz" className="font-body w-full p-3 rounded-xl elevated border border-light text-main focus:outline-none focus:border-accent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body text-xs font-medium text-muted mb-1 block">Valor</label>
              <input type="text" placeholder="R$ 0,00" className="font-metric w-full p-3 rounded-xl elevated border border-light text-main focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-muted mb-1 block">Frequência</label>
              <select className="font-body w-full p-3 rounded-xl elevated border border-light text-main focus:outline-none focus:border-accent appearance-none bg-transparent cursor-pointer">
                <option>Mensal</option>
                <option>Anual</option>
                <option>Semanal</option>
              </select>
            </div>
          </div>
          <button onClick={onClose} className="font-body w-full py-3.5 mt-2 rounded-xl bg-[#5B21B6] text-white font-semibold hover:bg-[#4C1D95] transition-colors shadow-md cursor-pointer">
            Salvar Recorrência
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 6. MAIN PAGE COMPONENT
// ==========================================
export default function RecurrencesPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({ type: 'ALL', status: 'ALL', frequency: 'ALL' });
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Recurrence | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [recurrencesList, setRecurrencesList] = useState<Recurrence[]>(mockRecurrences);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleDelete = (id: string) => {
    setRecurrencesList(prev => prev.filter(r => r.id !== id));
    setSelectedItem(null);
  };

  const handleToggleStatus = (id: string) => {
    setRecurrencesList(prev => prev.map(r => 
      r.id === id ? { ...r, status: r.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : r
    ));
    setSelectedItem(prev => prev && prev.id === id 
      ? { ...prev, status: prev.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } 
      : prev
    );
  };

  const handleQuickConfirm = (e: React.MouseEvent, item: Recurrence) => {
    e.stopPropagation();
    alert(`Recorrência "${item.description}" confirmada e registrada no fluxo financeiro!`);
  };

  const handleEdit = (_item: Recurrence) => {
    setSelectedItem(null);
    setIsCreateOpen(true);
  };

  // Filtragem base dos dados
  const filteredData = useMemo(() => {
    return recurrencesList.filter(item => {
      const matchSearch = item.description.toLowerCase().includes(search.toLowerCase()) || 
                          item.category.name.toLowerCase().includes(search.toLowerCase());
      const matchType = filters.type === 'ALL' || item.type === filters.type;
      const matchStatus = filters.status === 'ALL' || item.status === filters.status;
      const matchFreq = filters.frequency === 'ALL' || item.frequency === filters.frequency;
      
      return matchSearch && matchType && matchStatus && matchFreq;
    });
  }, [search, filters, recurrencesList]);

  // Divisão em 3 Seções Claras
  const categorizedSections = useMemo(() => {
    const today: Recurrence[] = [];
    const pending: Recurrence[] = [];
    const upcoming: Recurrence[] = [];

    filteredData.forEach(item => {
      if (!item.nextDate) {
        upcoming.push(item);
        return;
      }

      const diffDays = getDaysDifference(item.nextDate);

      if (diffDays === 0) {
        today.push(item);
      } else if (diffDays !== null && diffDays < 0 && item.status === 'ACTIVE') {
        pending.push(item);
      } else {
        upcoming.push(item);
      }
    });

    return { today, pending, upcoming };
  }, [filteredData]);

  // Destaques superiores (semana)
  const upcomingHighlights = useMemo(() => {
    return recurrencesList
      .filter(item => item.status === 'ACTIVE' && item.nextDate && getDaysDifference(item.nextDate)! >= 0 && getDaysDifference(item.nextDate)! <= 15)
      .sort((a, b) => getDaysDifference(a.nextDate)! - getDaysDifference(b.nextDate)!);
  }, [recurrencesList]);

  // Totais
  const summary = useMemo(() => {
    const active = recurrencesList.filter(i => i.status === 'ACTIVE');
    const income = active.filter(i => i.type === 'INCOME').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = active.filter(i => i.type === 'EXPENSE').reduce((acc, curr) => acc + curr.amount, 0);
    return { count: active.length, income, expense };
  }, [recurrencesList]);

  return (
    <div className="page-container">
      <ThemeStyles />
      
      <RecurrencesHeader 
        onNew={() => setIsCreateOpen(true)} 
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 animate-fade-in-up mt-6">
        
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="surface p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-body text-xs font-medium text-muted uppercase tracking-wider block mb-1">Recorrências Ativas</span>
              <div className="font-metric text-2xl font-bold text-main flex items-baseline gap-1.5">
                {summary.count} 
                <span className="font-body text-sm font-normal text-muted normal-case tracking-normal">contratos</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full badge-accent flex items-center justify-center">
              <Repeat size={24} />
            </div>
          </div>

          <div className="surface p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-body text-xs font-medium text-muted uppercase tracking-wider block mb-1">Entradas Estimadas / Mês</span>
              <div className="font-metric text-2xl font-bold text-income">{formatCurrency(summary.income)}</div>
            </div>
            <div className="w-12 h-12 rounded-full badge-income flex items-center justify-center">
              <ArrowUpRight size={24} />
            </div>
          </div>

          <div className="surface p-5 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <span className="font-body text-xs font-medium text-muted uppercase tracking-wider block mb-1">Saídas Estimadas / Mês</span>
              <div className="font-metric text-2xl font-bold text-expense">{formatCurrency(summary.expense)}</div>
            </div>
            <div className="w-12 h-12 rounded-full badge-expense flex items-center justify-center">
              <ArrowDownRight size={24} />
            </div>
          </div>
        </div>

        {/* CARDS DE DESTAQUE APRIMORADOS */}
        <UpcomingHighlights items={upcomingHighlights} onSelect={setSelectedItem} />

        {/* TOOLBAR */}
        <div className="mb-8">
          <RecurrencesToolbar 
            searchQuery={search}
            setSearchQuery={setSearch}
            filters={filters}
            onOpenFilters={() => setIsFiltersOpen(true)}
          />
        </div>

        {/* LISTAGEM ORGANIZADA EM 3 SEÇÕES DISTINTAS */}
        {filteredData.length === 0 ? (
          <div className="surface rounded-3xl p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full badge-accent flex items-center justify-center mb-4">
              <AlertCircle size={28} />
            </div>
            <h3 className="font-heading font-semibold text-lg text-main mb-1">Nenhuma recorrência encontrada</h3>
            <p className="font-body text-sm text-muted">Ajuste os filtros ou crie uma nova recorrência.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            
            {/* SEÇÃO 1: RECORRÊNCIAS PARA HOJE */}
            {categorizedSections.today.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-light">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl badge-expense">
                      <Zap size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-main">Recorrências para Hoje</h3>
                        <span className="font-metric text-xs font-bold px-2 py-0.5 rounded-full badge-expense">
                          {categorizedSections.today.length}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted">Ações e lançamentos agendados para a data de hoje.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {categorizedSections.today.map(item => (
                    <RecurrenceCard 
                      key={item.id} 
                      item={item} 
                      onSelect={setSelectedItem} 
                      onConfirm={handleQuickConfirm} 
                    />
                  ))}
                </div>
              </section>
            )}

            {/* SEÇÃO 2: RECORRÊNCIAS PENDENTES */}
            {categorizedSections.pending.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-light">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl badge-warning">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-main">Recorrências Pendentes</h3>
                        <span className="font-metric text-xs font-bold px-2 py-0.5 rounded-full badge-warning">
                          {categorizedSections.pending.length}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted">Compromissos vencidos que requerem atenção ou confirmação.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {categorizedSections.pending.map(item => (
                    <RecurrenceCard 
                      key={item.id} 
                      item={item} 
                      onSelect={setSelectedItem} 
                      onConfirm={handleQuickConfirm} 
                    />
                  ))}
                </div>
              </section>
            )}

            {/* SEÇÃO 3: PRÓXIMAS RECORRÊNCIAS */}
            {categorizedSections.upcoming.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-light">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl badge-accent">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-main">Próximas Recorrências</h3>
                        <span className="font-metric text-xs font-bold px-2 py-0.5 rounded-full badge-accent">
                          {categorizedSections.upcoming.length}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted">Compromissos e recebimentos previstos para datas futuras.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {categorizedSections.upcoming.map(item => (
                    <RecurrenceCard 
                      key={item.id} 
                      item={item} 
                      onSelect={setSelectedItem} 
                      onConfirm={handleQuickConfirm} 
                    />
                  ))}
                </div>
              </section>
            )}

          </div>
        )}

      </main>

      {/* DRAWERS & MODALS */}
      <FiltersDrawer 
        isOpen={isFiltersOpen} 
        onClose={() => setIsFiltersOpen(false)} 
        filters={filters}
        setFilters={setFilters}
      />

      <DetailsDrawer 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onEdit={handleEdit}
      />

      <CreateModal 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />

    </div>
  );
}