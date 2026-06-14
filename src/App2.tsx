import React, { useState } from 'react';
import { 
  Home, 
  Wallet, 
  FileText, 
  BarChart3, 
  Target, 
  Settings, 
  Menu, 
  X, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  User, 
  DollarSign,
  PieChart,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// ==========================================
// TYPES & MOCK DATA
// ==========================================

interface WalletItem {
  id: string;
  name: string;
  balance: number;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  color: string;
  bgLight: string;
  icon: React.ReactNode;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

interface Insight {
  id: string;
  type: 'success' | 'info' | 'warning';
  text: string;
  subtext: string;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  icon: string;
  color: string;
}

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  isToday: boolean;
}

// ==========================================
// COMPONENT MAIN
// ==========================================

export default function FinanceProDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Painel de Controle');

  // Core Data State
  const kpis = {
    saldoAtual: 8540.00,
    receitas: 7200.00,
    despesas: 3400.00,
    sobrou: 3800.00,
    maiorGasto: { categoria: 'Alimentação', icone: '🍔', percentual: 32, valor: 1088.00 }
  };

  const wallets: WalletItem[] = [
    { id: '1', name: 'Conta Principal', balance: 4000.00, trend: 'up', percentage: 40, color: '#2563eb', bgLight: 'bg-blue-600/10', icon: <Wallet className="w-4 h-4 text-blue-500" /> },
    { id: '2', name: 'Reserva de Emergência', balance: 3000.00, trend: 'up', percentage: 30, color: '#06b6d4', bgLight: 'bg-cyan-600/10', icon: <Layers className="w-4 h-4 text-cyan-500" /> },
    { id: '3', name: 'Viagem', balance: 1500.00, trend: 'neutral', percentage: 15, color: '#8b5cf6', bgLight: 'bg-violet-600/10', icon: <Target className="w-4 h-4 text-violet-500" /> },
    { id: '4', name: 'Moto', balance: 2000.00, trend: 'up', percentage: 15, color: '#f59e0b', bgLight: 'bg-amber-600/10', icon: <Settings className="w-4 h-4 text-amber-500" /> },
  ];

  const categories: ExpenseCategory[] = [
    { name: 'Alimentação', amount: 1088.00, percentage: 32, color: 'bg-amber-500', icon: '🍔' },
    { name: 'Moradia', amount: 952.00, percentage: 28, color: 'bg-blue-500', icon: '🏠' },
    { name: 'Transporte', amount: 510.00, percentage: 15, color: 'bg-indigo-500', icon: '🚗' },
    { name: 'Lazer', amount: 340.00, percentage: 10, color: 'bg-pink-500', icon: '🎮' },
    { name: 'Saúde', amount: 272.00, percentage: 8, color: 'bg-emerald-500', icon: '💊' },
    { name: 'Educação', amount: 238.00, percentage: 7, color: 'bg-violet-500', icon: '📚' },
  ];

  const insights: Insight[] = [
    { id: '1', type: 'success', text: 'Você gastou 12% menos que no mês passado.', subtext: 'Excelente controle em Lazer e Transporte.' },
    { id: '2', type: 'info', text: 'Sua reserva de emergência cresceu R$ 500.', subtext: 'Você atingiu 40% da meta total estipulada.' },
    { id: '3', type: 'warning', text: 'Alimentação continua sendo sua principal categoria.', subtext: '32% de todo o seu orçamento mensal.' },
    { id: '4', type: 'success', text: 'Você economizou acima da média dos últimos 3 meses.', subtext: 'Mantendo o ritmo, você antecipará sua meta de viagem.' }
  ];

  const goals: Goal[] = [
    { id: '1', name: 'Viagem para o Nordeste', target: 10000, current: 3000, icon: '🏖️', color: 'from-blue-600 to-indigo-600' },
    { id: '2', name: 'Reserva de Emergência', target: 20000, current: 8000, icon: '🚨', color: 'from-cyan-600 to-blue-600' },
    { id: '3', name: 'Nova Moto', target: 15000, current: 6000, icon: '🚗', color: 'from-amber-600 to-orange-600' }
  ];

  const transactions: Transaction[] = [
    { id: '1', description: 'Mercado Pão de Açúcar', category: 'Alimentação', amount: 120.00, type: 'expense', date: 'Hoje', isToday: true },
    { id: '2', description: 'Aporte Reserva', category: 'Investimento', amount: 500.00, type: 'expense', date: 'Hoje', isToday: true },
    { id: '3', description: 'Projeto Freelance UX', category: 'Renda Extra', amount: 1200.00, type: 'income', date: 'Hoje', isToday: true },
    { id: '4', description: 'Assinatura Netflix', category: 'Lazer', amount: 39.90, type: 'expense', date: 'Ontem', isToday: false },
    { id: '5', description: 'Posto Shell Combustível', category: 'Transporte', amount: 100.00, type: 'expense', date: 'Ontem', isToday: false },
  ];

  const menuItems = [
    { name: 'Painel de Controle', icon: <Home className="w-5 h-5" /> },
    { name: 'Carteiras', icon: <Wallet className="w-5 h-5" /> },
    { name: 'Lançamentos', icon: <FileText className="w-5 h-5" /> },
    { name: 'Relatórios', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Metas', icon: <Target className="w-5 h-5" /> },
    { name: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* ==========================================
          SIDEBAR DESKTOP
         ========================================== */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-slate-900 border-r border-slate-800/60 z-30 justify-between">
        <div>
          {/* Logo Brand */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800/40 gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-black text-sm text-white tracking-wider">F</span>
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Finance<span className="text-blue-500 font-black">Pro</span></span>
              <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">Premium SaaS</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5 mt-4">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  {item.name}
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer Account Info */}
        <div className="p-4 border-t border-slate-800/40 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 transition-colors duration-150 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-md shadow-indigo-500/10">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="font-semibold text-xs text-blue-400">JP</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">João Pinheiro</p>
              <p className="text-[10px] text-slate-500 truncate">SaaS Account Tier</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </aside>

      {/* ==========================================
          MOBILE DRAWER / CONTAINER
         ========================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 left-0 w-72 bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between border-r border-slate-800 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center">
                <span className="font-black text-sm text-white">F</span>
              </div>
              <span className="font-bold text-white text-base">Finance<span className="text-blue-500">Pro</span></span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 space-y-1.5 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeMenu === item.name ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-semibold">João Pinheiro</p>
          <p className="text-[10px] text-slate-500">joao@financepro.com</p>
        </div>
      </div>

      {/* ==========================================
          MAIN APP WORKSPACE CONTAINER
         ========================================== */}
      <main className="flex-1 lg:pl-64 min-w-0 flex flex-col min-h-screen">
        
        {/* Mobile Header Trigger */}
        <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800/60 flex items-center justify-between px-4 sticky top-0 z-20 backdrop-blur-md bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="font-black text-xs text-white">F</span>
            </div>
            <span className="font-bold text-sm text-white">Finance<span className="text-blue-500">Pro</span></span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Dashboard Dynamic Wrapper Layout */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-full w-full">
          
          {/* 1. HERO SECTION PREMIUM */}
          <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sábado, 13 de Junho de 2026</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Bom dia, João <span className="inline-block animate-bounce origin-bottom">👋</span>
                </h1>
                <p className="text-slate-400 text-sm mt-1 max-w-xl">
                  "Seu dinheiro está trabalhando para seus objetivos. Cada decisão financeira conta."
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-center bg-slate-950/40 p-2 rounded-xl border border-slate-800/50 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score Saúde Financeira</p>
                  <p className="text-xs font-bold text-emerald-400">9.4 / 10 • Excelente</p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. KPI'S PRINCIPAIS (HIGH DENSITY BENTO BOX) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            
            {/* Saldo Atual Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-blue-500/30">
              <div className="absolute top-4 right-4 bg-blue-600/10 p-2 rounded-xl">
                <DollarSign className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Saldo Atual</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 8.540,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+4.2% este mês</span>
              </div>
            </div>

            {/* Receitas Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-emerald-500/30">
              <div className="absolute top-4 right-4 bg-emerald-600/10 p-2 rounded-xl">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Receitas do Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 7.200,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>100% projetado atingido</span>
              </div>
            </div>

            {/* Despesas Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-rose-500/30">
              <div className="absolute top-4 right-4 bg-rose-600/10 p-2 rounded-xl">
                <ArrowDownLeft className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Despesas do Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 3.400,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>8% menor que teto planejado</span>
              </div>
            </div>

            {/* Sobrou no Mês Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-cyan-500/30">
              <div className="absolute top-4 right-4 bg-cyan-600/10 p-2 rounded-xl">
                <PieChart className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sobrou no Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mt-2 tracking-tight">R$ 3.800,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">52%</span> do ganho mensal livre
              </div>
            </div>

            {/* Maior Categoria de Gasto Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-amber-500/30 sm:col-span-2 xl:col-span-1">
              <div className="absolute top-4 right-4 bg-amber-600/10 p-2 rounded-xl text-sm">
                {kpis.maiorGasto.icone}
              </div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Maior Gasto</p>
              <h3 className="text-xl font-bold text-white mt-2 tracking-tight">{kpis.maiorGasto.categoria}</h3>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                <span>R$ {kpis.maiorGasto.valor.toFixed(2)}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">{kpis.maiorGasto.percentual}%</span>
              </div>
            </div>

          </section>

          {/* ASYMMETRIC DASHBOARD DATA GRIDS MIXED */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* LEFT ROW COMPILATION COL-SPAN-2 */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* 3. CARTEIRAS PREMIUM & 4. DISTRIBUIÇÃO FINANCEIRA */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/60 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Minhas Carteiras & Alocação</h2>
                    <p className="text-xs text-slate-400">Distribuição estruturada do patrimônio líquido</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                    <span className="px-2 py-1 rounded bg-blue-600 text-white font-medium">Saldos Ativos</span>
                  </div>
                </div>

                {/* Sub layout grid para carteiras + distribuição em barras inline premium */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Carteiras List */}
                  <div className="space-y-3">
                    {wallets.map((wallet) => (
                      <div key={wallet.id} className="p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl flex items-center justify-between hover:bg-slate-950 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-lg ${wallet.bgLight}`}>
                            {wallet.icon}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-300">{wallet.name}</p>
                            <span className="text-[10px] text-slate-500 font-medium">Alocação: {wallet.percentage}%</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">R$ {wallet.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5 justify-end">
                            <ArrowUpRight className="w-2.5 h-2.5" /> Estável
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Distribuição Gráfica Linear Avançada */}
                  <div className="bg-slate-950/40 border border-slate-800/50 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 mb-3">Composição Visual do Patrimônio</p>
                      
                      {/* Barra Segmentada de Distribuição */}
                      <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-800 mb-4">
                        {wallets.map((w) => (
                          <div 
                            key={w.id} 
                            style={{ width: `${w.percentage}%`, backgroundColor: w.color }} 
                            className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 relative group cursor-pointer"
                            title={`${w.name}: ${w.percentage}%`}
                          />
                        ))}
                      </div>

                      {/* Legendas Complexas */}
                      <div className="grid grid-cols-2 gap-3">
                        {wallets.map((w) => (
                          <div key={w.id} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
                            <div className="text-[11px] truncate">
                              <span className="text-slate-300 block font-medium truncate">{w.name}</span>
                              <span className="text-slate-500 font-bold">{w.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2 bg-blue-950/10 p-2 rounded-lg">
                      <AlertCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>70% do seu capital está líquido em contas ou reservas de resgate rápido.</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 5. EVOLUÇÃO FINANCEIRA */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">Evolução Financeira</h2>
                    <p className="text-xs text-slate-400">Gráfico comparativo de evolução patrimonial líquida (Jan - Jun)</p>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +56% no Semestre
                  </span>
                </div>

                {/* Gráfico customizado simulado em barras/UI CSS pura de altíssima fidelidade */}
                <div className="h-48 flex items-end justify-between pt-4 px-2 sm:px-6 bg-slate-950/40 border border-slate-800/40 rounded-xl relative">
                  
                  {/* Grid Lines Horizontais de Fundo */}
                  <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/40 pointer-events-none" />
                  <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/40 pointer-events-none" />
                  <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/40 pointer-events-none" />

                  {/* Dados dos Meses */}
                  {[
                    { month: 'Jan', val: 35, display: 'R$ 4.100' },
                    { month: 'Fev', val: 42, display: 'R$ 4.900' },
                    { month: 'Mar', val: 58, display: 'R$ 5.500' },
                    { month: 'Abr', val: 65, display: 'R$ 6.200' },
                    { month: 'Mai', val: 80, display: 'R$ 7.800' },
                    { month: 'Jun', val: 100, display: 'R$ 8.540' },
                  ].map((data, idx) => (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group z-10 w-10 sm:w-14">
                      
                      {/* Tooltip Dinâmico */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-slate-900 border border-slate-700 text-[10px] text-white py-1 px-2 rounded-md font-bold whitespace-nowrap shadow-xl">
                        {data.display}
                      </span>

                      {/* Barra Principal de Evolução */}
                      <div 
                        style={{ height: `${data.val}%` }} 
                        className={`w-full rounded-t-md transition-all duration-500 relative ${
                          idx === 5 
                            ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20' 
                            : 'bg-slate-800 group-hover:bg-slate-700'
                        }`}
                      />
                      
                      <span className="text-[10px] sm:text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-2.5 mb-1.5 transition-colors">
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. GASTOS POR CATEGORIA */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6">
                <div className="mb-4">
                  <h2 className="text-base font-bold text-white tracking-tight">Gastos por Categoria</h2>
                  <p className="text-xs text-slate-400">Detalhamento proporcional do consumo mensal executado</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-950/50 border border-slate-800/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{cat.icon}</span>
                          <span className="text-slate-200">{cat.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-100 block">R$ {cat.amount.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {/* Barra de Progresso Customizada por Categoria */}
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${cat.color} rounded-full`} 
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <span>Percentual sobre despesas</span>
                        <span className="text-slate-400 font-bold">{cat.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT SIDE ROW COMPILATION CONTROLS (COL-SPAN-1) */}
            <div className="space-y-6">
              
              {/* 7. INSIGHTS INTELIGENTES */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    Insights Inteligentes
                  </h2>
                  <p className="text-xs text-slate-400">Análise automatizada dos seus hábitos atuais</p>
                </div>

                <div className="space-y-3">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id} 
                      className={`p-3 rounded-xl border flex gap-3 ${
                        insight.type === 'success' ? 'bg-emerald-950/10 border-emerald-900/30 text-emerald-400' :
                        insight.type === 'warning' ? 'bg-amber-950/10 border-amber-900/30 text-amber-400' :
                        'bg-blue-950/10 border-blue-900/30 text-blue-400'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {insight.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {insight.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                        {insight.type === 'info' && <Sparkles className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 leading-tight">{insight.text}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{insight.subtext}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. METAS FINANCEIRAS */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Metas Ativas</h2>
                  <p className="text-xs text-slate-400">Monitoramento de objetivos de médio e longo prazo</p>
                </div>

                <div className="space-y-4">
                  {goals.map((goal) => {
                    const pct = Math.round((goal.current / goal.target) * 100);
                    return (
                      <div key={goal.id} className="space-y-2 p-3 bg-slate-950/40 border border-slate-800/50 rounded-xl">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{goal.icon}</span>
                            <span className="font-semibold text-slate-200">{goal.name}</span>
                          </div>
                          <span className="font-bold text-blue-400">{pct}%</span>
                        </div>

                        {/* Barra Metas */}
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${goal.color} rounded-full`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                          <span>Acumulado: R$ {goal.current.toLocaleString()}</span>
                          <span>Alvo: R$ {goal.target.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 9. ATIVIDADES RECENTES */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Atividades Recentes</h2>
                  <p className="text-xs text-slate-400">Fluxo de caixa em tempo real da sua conta</p>
                </div>

                <div className="space-y-4">
                  
                  {/* Bloco Hoje */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded inline-block">Hoje</p>
                    {transactions.filter(t => t.isToday).map((t) => (
                      <div key={t.id} className="flex items-center justify-between py-1 border-b border-slate-800/40 last:border-0">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{t.description}</p>
                          <span className="text-[10px] text-slate-500 block">{t.category}</span>
                        </div>
                        <span className={`text-xs font-bold shrink-0 ${t.type === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bloco Ontem */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded inline-block">Ontem</p>
                    {transactions.filter(t => !t.isToday).map((t) => (
                      <div key={t.id} className="flex items-center justify-between py-1 border-b border-slate-800/40 last:border-0">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200 truncate">{t.description}</p>
                          <span className="text-[10px] text-slate-500 block">{t.category}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-300 shrink-0">
                          - R$ {t.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* 10. RESUMO DOS RELATÓRIOS (PREVIEWS VISUAIS MICRO SPRINT) */}
          <section className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-white tracking-tight">Resumo Exclusivo de Relatórios</h2>
              <p className="text-xs text-slate-400">Previsões gráficas consolidadas analíticas do sistema</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Mini Preview 1: Receitas x Despesas */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-400">Receitas x Despesas</p>
                <div className="flex items-center gap-2 h-8">
                  <div className="h-full w-1/2 bg-blue-600 rounded" title="Receitas" style={{ height: '100%' }} />
                  <div className="h-full w-1/2 bg-slate-700 rounded" title="Despesas" style={{ height: '47%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-medium">Despesas ocupam 47% das receitas.</span>
              </div>

              {/* Mini Preview 2: Evolução Mensal */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-400">Evolução Mensal</p>
                <div className="flex items-end gap-1 h-8">
                  <div className="bg-blue-600/30 w-full h-1/3 rounded-sm" />
                  <div className="bg-blue-600/50 w-full h-1/2 rounded-sm" />
                  <div className="bg-blue-600/70 w-full h-2/3 rounded-sm" />
                  <div className="bg-blue-600 w-full h-full rounded-sm" />
                </div>
                <span className="text-[10px] text-slate-500 block font-medium">Curva de crescimento linear ascendente.</span>
              </div>

              {/* Mini Preview 3: Ranking de Gastos */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl space-y-2">
                <p className="text-xs font-semibold text-slate-400">Ranking de Gastos</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-300 font-medium"><span>1. Alimentação</span><span>32%</span></div>
                  <div className="flex justify-between text-[10px] text-slate-400"><span>2. Moradia</span><span>28%</span></div>
                  <div className="flex justify-between text-[10px] text-slate-500"><span>3. Transporte</span><span>15%</span></div>
                </div>
              </div>

              {/* Mini Preview 4: Categorias Mais Utilizadas */}
              <div className="p-4 bg-slate-950/60 border border-slate-800/50 rounded-xl flex flex-col justify-between">
                <p className="text-xs font-semibold text-slate-400">Categorias Utilizadas</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">🍔</span>
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">🏠</span>
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">🚗</span>
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">🎮</span>
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">💊</span>
                  <span className="text-[10px] text-slate-400 font-bold">+1</span>
                </div>
                <span className="text-[10px] text-slate-500 block font-medium mt-2">6 categorias movimentadas na quinzena.</span>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}