import React, { useEffect, useState, useMemo } from 'react';
import { 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Coffee, 
  ShoppingBag, 
  Car, 
  Briefcase, 
  LayoutGrid, 
  Activity, 
  Settings,
  CreditCard,
  Wallet,
  Menu,
  X,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Tag,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

type TransactionType = 'in' | 'out' | 'all';

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  rawDate: string; // Para agrupamento ordenado
  type: 'in' | 'out';
  wallet: string;
  icon: React.ElementType;
}

// Conjunto expandido e detalhado de transações para a página dedicada
const DETAILED_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salário mensal da empresa',
    category: 'Renda Principal',
    amount: 5100,
    date: 'Hoje, 09:00',
    rawDate: '2026-06-28',
    type: 'in',
    wallet: 'Itaú Unibanco',
    icon: Briefcase,
  },
  {
    id: '2',
    description: 'Mercado Nacional - Compra do Mês',
    category: 'Alimentação',
    amount: 230.50,
    date: 'Ontem, 19:30',
    rawDate: '2026-06-27',
    type: 'out',
    wallet: 'Cartão Black',
    icon: ShoppingBag,
  },
  {
    id: '3',
    description: 'Posto Ipiranga Centro',
    category: 'Transporte',
    amount: 180.00,
    date: 'Ontem, 14:15',
    rawDate: '2026-06-27',
    type: 'out',
    wallet: 'Cartão Black',
    icon: Car,
  },
  {
    id: '4',
    description: 'Assinatura Streaming Premium',
    category: 'Entretenimento',
    amount: 55.90,
    date: '25 de Junho, 08:12',
    rawDate: '2026-06-25',
    type: 'out',
    wallet: 'NuBank',
    icon: Settings,
  },
  {
    id: '5',
    description: 'Cafeteria Central Expresso',
    category: 'Alimentação',
    amount: 24.90,
    date: '24 de Junho, 15:30',
    rawDate: '2026-06-24',
    type: 'out',
    wallet: 'NuBank',
    icon: Coffee,
  },
  {
    id: '6',
    description: 'Projeto Freelance Design System',
    category: 'Renda Extra',
    amount: 1450.00,
    date: '22 de Junho, 11:00',
    rawDate: '2026-06-22',
    type: 'in',
    wallet: 'Itaú Unibanco',
    icon: Sparkles,
  },
  {
    id: '7',
    description: 'Uber Viagem Reunião',
    category: 'Transporte',
    amount: 42.10,
    date: '20 de Junho, 18:45',
    rawDate: '2026-06-20',
    type: 'out',
    wallet: 'NuBank',
    icon: Car,
  },
  {
    id: '8',
    description: 'Farmácia Vida Segura',
    category: 'Saúde',
    amount: 112.30,
    date: '18 de Junho, 10:20',
    rawDate: '2026-06-18',
    type: 'out',
    wallet: 'Cartão Black',
    icon: ShoppingBag,
  }
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes slideUpFade {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
    .delay-100 { animation-delay: 100ms; }
    .delay-200 { animation-delay: 200ms; }
    .delay-300 { animation-delay: 300ms; }
    .delay-400 { animation-delay: 400ms; }
    .delay-500 { animation-delay: 500ms; }
    
    ::-webkit-scrollbar { width: 0px; background: transparent; }
  `}} />
);

function Activities() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<TransactionType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Categorias únicas mapeadas dinamicamente
  const categories = useMemo(() => {
    const list = DETAILED_TRANSACTIONS.map(tx => tx.category);
    return ['all', ...Array.from(new Set(list))];
  }, []);

  // Filtro de Busca e Tipo em tempo real
  const filteredTransactions = useMemo(() => {
    return DETAILED_TRANSACTIONS.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tx.wallet.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' ? true : tx.type === selectedType;
      const matchesCategory = selectedCategory === 'all' ? true : tx.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  // Cálculos dinâmicos com base nos itens filtrados
  const totals = useMemo(() => {
    let entradas = 0;
    let saidas = 0;
    filteredTransactions.forEach(tx => {
      if (tx.type === 'in') entradas += tx.amount;
      else saidas += tx.amount;
    });
    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
      mediaTransacao: filteredTransactions.length > 0 ? (entradas + saidas) / filteredTransactions.length : 0
    };
  }, [filteredTransactions]);

  const handleExport = () => {
    setIsExporting(true);
    // Simulação premium de geração de relatório para o SaaS
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
      <main className="flex-1 w-full min-w-0 relative z-10 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20 flex flex-col flex-1">
          
          {/* Header e Ações de Relatório */}
          <header className="animate-slide-up flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full mb-12">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">
                Atividades <span className="font-semibold text-[#8B5CF6]">Recentes</span>
              </h1>
              <p className="text-zinc-500 font-light text-sm md:text-base max-w-[60ch]">
                Consulte e gerencie o histórico completo de transações, faturamento e fluxo de caixa da sua conta.
              </p>
            </div>
            
            {/* Exportar Relatório */}
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`
                h-12 px-6 rounded-2xl flex items-center justify-center gap-3 font-medium transition-all duration-300 relative overflow-hidden flex-shrink-0 active:scale-[0.98]
                ${exportSuccess 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-[#111113] hover:bg-[#151518] text-zinc-300 hover:text-white border border-white/[0.04] hover:border-white/[0.1] shadow-lg shadow-black/20'
                }
              `}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando...</span>
                </>
              ) : exportSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Relatório Pronto</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Exportar Planilha</span>
                </>
              )}
            </button>
          </header>

          {/* Widgets Estatísticos de Detalhes Mensais (Mês de Junho) */}
          <section className="animate-slide-up delay-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 w-full min-w-0">
            
            {/* Caixa Entradas */}
            <div className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.08] transition-all p-6 rounded-[24px] flex flex-col justify-between min-h-[140px] group">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Faturamento Total</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white group-hover:text-emerald-500 transition-colors">
                  {formatCurrency(totals.entradas)}
                </h3>
                <p className="text-zinc-600 text-xs mt-1">Soma de todas as receitas</p>
              </div>
            </div>

            {/* Caixa Saídas */}
            <div className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.08] transition-all p-6 rounded-[24px] flex flex-col justify-between min-h-[140px] group">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Despesas do Mês</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-500">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white group-hover:text-rose-500 transition-colors">
                  {formatCurrency(totals.saidas)}
                </h3>
                <p className="text-zinc-600 text-xs mt-1">Soma de todas as saídas</p>
              </div>
            </div>

            {/* Caixa Balanço Líquido */}
            <div className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.08] transition-all p-6 rounded-[24px] flex flex-col justify-between min-h-[140px] group">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Balanço Final</span>
                <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/10 flex items-center justify-center text-[#8B5CF6]">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className={`text-2xl lg:text-3xl font-semibold tracking-tight transition-colors ${totals.saldo >= 0 ? 'text-white group-hover:text-[#8B5CF6]' : 'text-rose-500'}`}>
                  {formatCurrency(totals.saldo)}
                </h3>
                <p className="text-zinc-600 text-xs mt-1">Margem líquida consolidada</p>
              </div>
            </div>

            {/* Caixa Média por Operação */}
            <div className="bg-[#111113] border border-white/[0.04] hover:border-white/[0.08] transition-all p-6 rounded-[24px] flex flex-col justify-between min-h-[140px] group">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Média por Ticket</span>
                <div className="w-8 h-8 rounded-xl bg-zinc-500/5 border border-zinc-500/10 flex items-center justify-center text-zinc-400">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                  {formatCurrency(totals.mediaTransacao)}
                </h3>
                <p className="text-zinc-600 text-xs mt-1">Média de valor por operação</p>
              </div>
            </div>

          </section>

          {/* Sistema Premium de Filtros em Tempo Real */}
          <div className="animate-slide-up delay-200 bg-[#111113]/40 border border-white/[0.04] rounded-3xl p-6 mb-8 w-full min-w-0 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Campo de Busca Livre */}
            <div className="relative flex-1 max-w-lg min-w-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Buscar por descrição, categoria ou banco..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-[#09090B] border border-white/[0.04] focus:border-[#7C3AED]/50 rounded-2xl text-sm font-light text-zinc-200 placeholder-zinc-600 outline-none transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Seleção de Filtros */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Filtro por Tipo de Fluxo */}
              <div className="flex items-center gap-1 bg-[#09090B] border border-white/[0.04] p-1.5 rounded-2xl">
                <button 
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${selectedType === 'all' ? 'bg-[#111113] text-white shadow-sm border border-white/[0.03]' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Tudo
                </button>
                <button 
                  onClick={() => setSelectedType('in')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${selectedType === 'in' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Receitas
                </button>
                <button 
                  onClick={() => setSelectedType('out')}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${selectedType === 'out' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/10' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  Despesas
                </button>
              </div>

              {/* Filtro Dropdown de Categorias */}
              <div className="relative">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none h-12 pl-10 pr-10 bg-[#09090B] border border-white/[0.04] focus:border-[#7C3AED]/50 rounded-2xl text-xs font-semibold text-zinc-300 outline-none transition-all cursor-pointer"
                >
                  <option value="all">Todas Categorias</option>
                  {categories.filter(cat => cat !== 'all').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>

            </div>
          </div>

          {/* Lista de Atividades Detalhadas */}
          <div className="animate-slide-up delay-300 flex-1 min-w-0 w-full bg-[#111113]/20 border border-white/[0.04] rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8 w-full">
              <h3 className="text-zinc-500 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold">
                Lista de Registros ({filteredTransactions.length})
              </h3>
              <span className="text-xs text-zinc-600 font-light">Mês atual: Junho 2026</span>
            </div>

            {filteredTransactions.length > 0 ? (
              <div className="flex flex-col">
                {filteredTransactions.map((tx, idx) => {
                  const Icon = tx.icon;
                  const isIncome = tx.type === 'in';
                  const isLast = idx === filteredTransactions.length - 1;

                  return (
                    <div key={tx.id} className="relative flex gap-4 sm:gap-6 lg:gap-8 group cursor-default w-full min-w-0">
                      {!isLast && (
                        <div className="absolute left-[23px] top-[48px] bottom-[-16px] w-[2px] bg-white/[0.02] group-hover:bg-white/[0.06] transition-colors duration-500"></div>
                      )}
                      
                      {/* Círculo do Ícone */}
                      <div className="flex flex-col items-center pt-2 relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-2xl bg-[#111113] border border-white/[0.04] flex items-center justify-center text-zinc-500 group-hover:text-zinc-200 group-hover:border-white/[0.1] group-hover:bg-[#18181B] transition-all duration-300 shadow-sm">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Detalhes da Linha */}
                      <div className="flex-1 min-w-0 py-4 pb-8 border-b border-white/[0.02] last:border-b-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
                          
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-zinc-100 font-medium text-base lg:text-lg mb-1 truncate">
                              {tx.description}
                            </h4>
                            <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-medium uppercase tracking-wider text-zinc-600">
                              <span className="truncate text-[#8B5CF6]">{tx.category}</span>
                              <span className="w-1 h-1 flex-shrink-0 rounded-full bg-zinc-800"></span>
                              <span className="flex-shrink-0 truncate">{tx.date}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                            <span className={`text-lg lg:text-xl font-medium tracking-tight ${isIncome ? 'text-emerald-500' : 'text-zinc-100'}`}>
                              {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs lg:text-sm text-zinc-600 font-medium">
                              {tx.wallet.includes('Cartão') ? <CreditCard className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" /> : <Wallet className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />}
                              <span className="truncate max-w-[120px] sm:max-w-none">{tx.wallet}</span>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State Elegante
              <div className="py-20 flex flex-col items-center justify-center text-center w-full">
                <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-600 mb-6">
                  <Filter className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-zinc-400 mb-1">Nenhuma atividade encontrada</h4>
                <p className="text-zinc-600 text-sm max-w-[35ch] font-light">
                  Tente alterar os termos da pesquisa ou limpe os filtros para visualizar os dados.
                </p>
                {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all') && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedType('all');
                      setSelectedCategory('all');
                    }}
                    className="mt-6 h-10 px-6 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 font-medium text-xs border border-white/[0.04] transition-all"
                  >
                    Resetar Filtros
                  </button>
                )}
              </div>
            )}
          </div>
          
        </div>
        <div className="h-28 md:h-0"></div>
      </main>
  );
}

export default Activities;