import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowUpToLine,
  BarChart3,
  Calendar,
  ChevronRight,
  DollarSign,
  FileText,
  Home,
  Layers,
  Menu,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  X
} from 'lucide-react';
import React, { useState } from 'react';

// ==========================================
// TYPES & MOCK DATA
// ==========================================

interface WalletItem {
  id: string;
  name: string;
  balance: number;
  icon: React.ReactNode;
}

interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
}

interface Activity {
  id: string;
  icon: string;
  description: string;
  category: string;
  time: string;
  amount: number;
  type: 'income' | 'expense';
}

// ==========================================
// COMPONENT MAIN
// ==========================================

export default function FinanceProDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Painel de Controle');

  // Core Data
  const kpis = {
    saldoAtual: 8540.00,
    receitas: 7200.00,
    despesas: 3400.00,
    sobrou: 3800.00,
    maiorGasto: { categoria: 'Alimentação', icone: '🍔', percentual: 32, valor: 1088.00 }
  };

  // Simplified Data for Compact UI
  const wallets: WalletItem[] = [
    { id: '1', name: 'Conta Principal', balance: 4000.00, icon: <Wallet className="w-4 h-4 text-blue-500" /> },
    { id: '2', name: 'Reserva de Emerg', balance: 3000.00, icon: <Layers className="w-4 h-4 text-cyan-500" /> },
    { id: '3', name: 'Viagem', balance: 1500.00, icon: <Target className="w-4 h-4 text-violet-500" /> },
    { id: '4', name: 'Moto', balance: 2000.00, icon: <Settings className="w-4 h-4 text-amber-500" /> },
  ];

  const categories: ExpenseCategory[] = [
    { name: 'Alimentação', amount: 1088.00, percentage: 32, icon: '🍔', color: 'bg-amber-500' },
    { name: 'Moradia', amount: 952.00, percentage: 28, icon: '🏠', color: 'bg-indigo-400' },
    { name: 'Transporte', amount: 510.00, percentage: 15, icon: '🚗', color: 'bg-emerald-500' },
    { name: 'Lazer', amount: 340.00, percentage: 10, icon: '🎮', color: 'bg-violet-500' },
    { name: 'Saúde', amount: 272.00, percentage: 8, icon: '💊', color: 'bg-rose-400' },
  ];

  const goals: Goal[] = [
    { id: '1', name: 'Viagem Nordeste', target: 10000, current: 3000 },
    { id: '2', name: 'Reserva Emerg.', target: 20000, current: 8000 },
    { id: '3', name: 'Nova Moto', target: 15000, current: 6000 }
  ];

  const recentActivities: Activity[] = [
    { id: '1', icon: '🛒', description: 'Mercado', category: 'Alimentação', time: 'Hoje • 14:35', amount: -120.00, type: 'expense' },
    { id: '2', icon: '🏖️', description: 'Transf. Viagem', category: 'Carteiras', time: 'Hoje • 10:15', amount: -500.00, type: 'expense' },
    { id: '3', icon: '💰', description: 'Salário', category: 'Receita', time: 'Ontem • 08:00', amount: 4500.00, type: 'income' },
    { id: '4', icon: '🎬', description: 'Netflix', category: 'Lazer', time: 'Ontem • 18:20', amount: -39.90, type: 'expense' },
    { id: '5', icon: '⛽', description: 'Posto Shell', category: 'Transporte', time: 'Ontem • 12:40', amount: -100.00, type: 'expense' },
  ];

  const upcomingRecurrences = [
    { id: '1', name: 'Salário', date: '15 Ago', amount: 4500.00, type: 'income' },
    { id: '2', name: 'Netflix', date: '20 Ago', amount: -39.90, type: 'expense' },
    { id: '3', name: 'Academia', date: '25 Ago', amount: -89.90, type: 'expense' },
    { id: '4', name: 'Plano de Saúde', date: '28 Ago', amount: -320.00, type: 'expense' },
    { id: '5', name: 'Comissão', date: '30 Ago', amount: 600.00, type: 'income' },
  ];

  // ... dentro do componente, no menuItems:
  const menuItems = [
    { name: 'Painel de Controle', icon: <Home className="w-5 h-5" /> },
    { name: 'Carteiras', icon: <Wallet className="w-5 h-5" /> },
    { name: 'Lançamentos', icon: <FileText className="w-5 h-5" /> },
    { name: 'Recorrências', icon: <RefreshCw className="w-5 h-5" /> }, // Novo item
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
          <div className="h-20 flex items-center px-6 border-b border-slate-800/40 gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="font-black text-sm text-white tracking-wider">F</span>
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Finance<span className="text-blue-500 font-black">Pro</span></span>
            </div>
          </div>
          <nav className="p-4 space-y-1.5 mt-4">
            {menuItems.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/40 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer border border-transparent hover:border-slate-700/50 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-500/20 shrink-0">
              JP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">João Pinheiro</p>
              <p className="text-[11px] font-medium text-slate-500 truncate">joao@financepro.com</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" />
          </div>
        </div>
      </aside>

      {/* ==========================================
          MOBILE DRAWER
         ========================================== */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 w-72 bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between border-r border-slate-800 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
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
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeMenu === item.name ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/30 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-blue-500/20 shrink-0">
              JP
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-200 truncate">João Pinheiro</p>
              <p className="text-[11px] font-medium text-slate-500 truncate">joao@financepro.com</p>
            </div>
            <Settings className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN APP WORKSPACE
         ========================================== */}
      <main className="flex-1 lg:pl-64 min-w-0 flex flex-col min-h-screen">

        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-20 backdrop-blur-md bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <span className="font-black text-xs text-white">F</span>
            </div>
            <span className="font-bold text-sm text-white">Finance<span className="text-blue-500">Pro</span></span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">

          {/* HERO SECTION */}
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

                {/* Botão de Ação Principal Adicionado */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-5 inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 border border-blue-500/30"
                >
                  <Plus className="w-4 h-4" /> Novo Lançamento
                </button>
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

          {/* KPI'S PRINCIPAIS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-blue-500/30">
              <div className="absolute top-4 right-4 bg-blue-600/10 p-2 rounded-xl"><DollarSign className="w-4 h-4 text-blue-400" /></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Saldo Atual</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 8.540,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium"><TrendingUp className="w-3.5 h-3.5" /><span>+4.2% este mês</span></div>
            </div>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-emerald-500/30">
              <div className="absolute top-4 right-4 bg-emerald-600/10 p-2 rounded-xl"><ArrowUpRight className="w-4 h-4 text-emerald-400" /></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Receitas do Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 7.200,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span>100% projetado atingido</span></div>
            </div>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-rose-500/30">
              <div className="absolute top-4 right-4 bg-rose-600/10 p-2 rounded-xl"><ArrowDownLeft className="w-4 h-4 text-rose-400" /></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Despesas do Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">R$ 3.400,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400 font-medium"><TrendingDown className="w-3.5 h-3.5" /><span>8% menor que teto planejado</span></div>
            </div>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-cyan-500/30">
              <div className="absolute top-4 right-4 bg-cyan-600/10 p-2 rounded-xl"><PieChart className="w-4 h-4 text-cyan-400" /></div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Sobrou no Mês</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 mt-2 tracking-tight">R$ 3.800,00</h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400"><span className="text-emerald-400 font-bold">52%</span> do ganho mensal livre</div>
            </div>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative group transition-all duration-200 hover:border-amber-500/30 sm:col-span-2 xl:col-span-1">
              <div className="absolute top-4 right-4 bg-amber-600/10 p-2 rounded-xl text-sm">{kpis.maiorGasto.icone}</div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Maior Gasto</p>
              <h3 className="text-xl font-bold text-white mt-2 tracking-tight">{kpis.maiorGasto.categoria}</h3>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-2">
                <span>R$ {kpis.maiorGasto.valor.toFixed(2)}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">{kpis.maiorGasto.percentual}%</span>
              </div>
            </div>
          </section>

          {/* ÁREA PRINCIPAL DE CONTEÚDO */}
          <section className="space-y-6">

            {/* EVOLUÇÃO FINANCEIRA */}
            {/* Container principal do Gráfico com altura definida */}
            <div className="w-full h-[350px] bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Evolução Financeira</h2>
                  <p className="text-xs text-slate-400">Gráfico comparativo de evolução patrimonial líquida</p>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded-lg flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +56% no Semestre
                </span>
              </div>

              {/* O 'flex-1' aqui fará com que o gráfico ocupe o restante do espaço disponível */}
              <div className="flex-1 min-h-[200px] flex items-end justify-between pt-4 px-2 sm:px-6 bg-slate-950/40 border border-slate-800/40 rounded-xl relative">
                {/* Grid lines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/40 pointer-events-none" />
                <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/40 pointer-events-none" />
                <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/40 pointer-events-none" />

                {[
                  { month: 'Jan', val: 35, display: 'R$ 4.100' }, { month: 'Fev', val: 42, display: 'R$ 4.900' },
                  { month: 'Mar', val: 58, display: 'R$ 5.500' }, { month: 'Abr', val: 65, display: 'R$ 6.200' },
                  { month: 'Mai', val: 80, display: 'R$ 7.800' }, { month: 'Jun', val: 100, display: 'R$ 8.540' },
                ].map((data, idx) => (
                  <div key={idx} className="flex flex-col items-center h-full justify-end group z-10 w-10 sm:w-14">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-slate-900 border border-slate-700 text-[10px] text-white py-1 px-2 rounded-md font-bold whitespace-nowrap shadow-xl">{data.display}</span>

                    {/* A altura definida aqui depende do h-full do container pai */}
                    <div style={{ height: `${data.val}%` }} className={`w-full rounded-t-md transition-all duration-500 relative ${idx === 5 ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20' : 'bg-slate-800 group-hover:bg-slate-700'}`} />

                    <span className="text-[10px] sm:text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-2.5 mb-1.5 transition-colors">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* ATIVIDADES RECENTES */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-white tracking-tight">Atividades Recentes</h2>
                  <span className="text-[10px] text-blue-400 font-bold px-2 py-1 bg-blue-500/10 rounded-lg cursor-pointer hover:bg-blue-500/20 transition-colors">Ver extrato</span>
                </div>
                <div className="space-y-4 flex-1">
                  {recentActivities.map(t => (
                    <div key={t.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800/80 flex items-center justify-center text-lg shadow-sm shrink-0">
                          {t.icon}
                        </div>
                        <div className="min-w-0 pr-2">
                          <p className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors truncate">{t.description}</p>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5 truncate">{t.category} • {t.time}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ${t.amount < 0 ? 'text-slate-200' : 'text-emerald-400'}`}>
                        {t.amount < 0 ? '-' : '+'}R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRÓXIMAS RECORRÊNCIAS (NOVO CARD) */}
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-500" /> Próximas Recorrências
                  </h2>
                  <button className="text-[10px] text-blue-400 font-bold px-2 py-1 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors">Ver todas</button>
                </div>

                <div className="space-y-4">
                  {upcomingRecurrences.map((r) => (
                    <div key={r.id} className="flex items-center justify-between group border-b border-slate-800/50 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                          {r.type === 'income' ? <ArrowUpToLine className="w-3.5 h-3.5" /> : <ArrowDownToLine className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200">{r.name}</p>
                          <p className="text-[10px] font-medium text-slate-500">{r.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${r.type === 'income' ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {r.type === 'income' ? '+' : ''}R$ {Math.abs(r.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </section>

          {/* COMPACT FOOTER GRID */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* CARTEIRAS */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
                <h2 className="text-sm font-bold text-white tracking-tight">Carteiras</h2>
                <Wallet className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-3.5 flex-1">
                {wallets.map(w => (
                  <div key={w.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {w.icon}
                      <span className="text-xs font-medium text-slate-300">{w.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white">R$ {w.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIAS */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
                <h2 className="text-sm font-bold text-white tracking-tight">Categorias</h2>
                <PieChart className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-3.5 flex-1">
                {categories.map((c, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span>{c.icon}</span>
                        <span className="font-medium text-slate-300 truncate">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <span className="font-bold text-slate-100">R$ {c.amount.toLocaleString('pt-BR')}</span>
                        <span className="text-slate-500 font-medium w-6">{c.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color} rounded-full transition-all duration-500`} style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* METAS */}
            <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
                <h2 className="text-sm font-bold text-white tracking-tight">Metas</h2>
                <Target className="w-4 h-4 text-slate-500" />
              </div>
              <div className="space-y-4 flex-1">
                {goals.map(g => {
                  const pct = Math.round((g.current / g.target) * 100);
                  return (
                    <div key={g.id}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-slate-300">{g.name}</span>
                        <span className="text-slate-500 font-semibold">{pct}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* INSIGHTS & RELATÓRIOS */}
            <div className="flex flex-col gap-4">
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
                  <h2 className="text-sm font-bold text-white tracking-tight">Insights</h2>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/40 leading-relaxed">
                    Você gastou <strong className="text-emerald-400">12% menos</strong> este mês.
                  </p>
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/40 leading-relaxed">
                    A reserva de emergência cresceu <strong className="text-blue-400">R$ 500</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/60 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:bg-slate-800/50 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white">Ver Relatórios</h2>
                    <p className="text-[10px] text-slate-500 mt-0.5">Métricas avançadas</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </div>
            </div>

          </section>

        </div>
      </main>

      {/* ==========================================
          MODAL DE LANÇAMENTO
         ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white tracking-tight mb-5">Registrar Novo Lançamento</h2>

            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 group transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <ArrowDownToLine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Receita</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Adicionar entrada de dinheiro</p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/50 group transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <ArrowUpToLine className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">Despesa</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Registrar saída ou gasto</p>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 group transition-all text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Transferência</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mover saldo entre carteiras</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          BOTÃO FLUTUANTE MOBILE (FAB)
         ========================================== */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 flex items-center justify-center z-40 hover:bg-blue-700 transition-colors border border-blue-500/20"
      >
        <Plus className="w-6 h-6" />
      </button>

    </div>
  );
}