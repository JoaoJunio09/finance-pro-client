import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  PiggyBank,
  Menu,
  X,
  Plus,
  Bell,
  Search,
  CheckCircle,
  Target,
  Coins,
  Activity,
  Briefcase,
  Utensils,
  Home,
  Car,
  HeartPulse,
  Coffee,
  MoreHorizontal,
  Wallet,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

// ==========================================
// INTERFACES & CONTRATOS
// ==========================================
interface Transacao {
  id: string;
  descricao: string;
  categoria: 'Alimentação' | 'Transporte' | 'Moradia' | 'Saúde' | 'Lazer' | 'Outros';
  tipo: 'receita' | 'despesa';
  valor: number;
  data: string;
}

interface Meta {
  id: string;
  nome: string;
  objetivo: number;
  atual: number;
  dataLimite: string;
  tempoEstimado: string;
  categoria: string;
}

const CATEGORIA_CONFIG = {
  'Alimentação': { color: '#fbbf24', icon: Utensils },    // Amber-400
  'Moradia': { color: '#818cf8', icon: Home },             // Indigo-400
  'Transporte': { color: '#2dd4bf', icon: Car },           // Teal-400
  'Saúde': { color: '#f472b6', icon: HeartPulse },        // Pink-400
  'Lazer': { color: '#a78bfa', icon: Coffee },            // Violet-400
  'Outros': { color: '#94a3b8', icon: MoreHorizontal }    // Slate-400
};


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'30' | '60' | '90'>('30');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transacoes' | 'metas'>('dashboard');
  const [modalOpen, setModalOpen] = useState(false);

  const [metas, setMetas] = useState<Meta[]>([
    { id: 'm1', nome: 'Reserva de Emergência', objetivo: 15000, atual: 10250, dataLimite: 'Dez 2026', tempoEstimado: '4 meses', categoria: 'Segurança' },
    { id: 'm2', nome: 'Aportes Renda Variável', objetivo: 40000, atual: 28400, dataLimite: 'Mar 2027', tempoEstimado: '9 meses', categoria: 'Investimentos' },
    { id: 'm3', nome: 'Viagem Internacional', objetivo: 25000, atual: 4800, dataLimite: 'Out 2026', tempoEstimado: '14 meses', categoria: 'Lazer' }
  ]);

  const [transacoes, setTransacoes] = useState<Transacao[]>([
    { id: '1', descricao: 'Consultoria Tech', categoria: 'Outros', tipo: 'receita', valor: 9450.00, data: 'Hoje, 14:30' },
    { id: '2', descricao: 'Aluguel Loft & Condomínio', categoria: 'Moradia', tipo: 'despesa', valor: 3100.00, data: '10 Jun, 2026' },
    { id: '3', descricao: 'Supermercado Orgânico', categoria: 'Alimentação', tipo: 'despesa', valor: 850.40, data: '09 Jun, 2026' },
    { id: '4', descricao: 'Dividendos Carteira FIIs', categoria: 'Outros', tipo: 'receita', valor: 1240.20, data: '08 Jun, 2026' },
    { id: '5', descricao: 'Seguro Saúde Premium', categoria: 'Saúde', tipo: 'despesa', valor: 750.00, data: '05 Jun, 2026' },
    { id: '6', descricao: 'Jantar Michelin', categoria: 'Lazer', tipo: 'despesa', valor: 540.00, data: '04 Jun, 2026' },
    { id: '7', descricao: 'Combustível', categoria: 'Transporte', tipo: 'despesa', valor: 280.00, data: '02 Jun, 2026' },
    { id: '8', descricao: 'Delivery Fim de Semana', categoria: 'Alimentação', tipo: 'despesa', valor: 145.00, data: '01 Jun, 2026' },
  ]);

  const [novaTransacao, setNovaTransacao] = useState({
    descricao: '',
    categoria: 'Alimentação' as Transacao['categoria'],
    tipo: 'despesa' as 'receita' | 'despesa',
    valor: ''
  });

  const totalReceitas = useMemo(() => transacoes.filter(t => t.tipo === 'receita').reduce((acc, t) => acc + t.valor, 0), [transacoes]);
  const totalDespesas = useMemo(() => transacoes.filter(t => t.tipo === 'despesa').reduce((acc, t) => acc + t.valor, 0), [transacoes]);
  const economiaMes = totalReceitas - totalDespesas;

  const saldoDisponivel = 44130.50 + economiaMes;
  const taxaPoupança = totalReceitas > 0 ? ((economiaMes) / totalReceitas) * 100 : 0;

  // Cálculo de gastos por categoria para o novo componente visual
  const gastosPorCategoria = useMemo(() => {
    const despesas = transacoes.filter(t => t.tipo === 'despesa');
    const categorias = Object.keys(CATEGORIA_CONFIG) as Transacao['categoria'][];

    return categorias.map(cat => {
      const valor = despesas.filter(t => t.categoria === cat).reduce((acc, t) => acc + t.valor, 0);
      return {
        nome: cat,
        valor,
        percentual: totalDespesas > 0 ? (valor / totalDespesas) * 100 : 0,
        config: CATEGORIA_CONFIG[cat]
      };
    }).filter(c => c.valor > 0).sort((a, b) => b.valor - a.valor);
  }, [transacoes, totalDespesas]);

  const handleAdicionarTransacao = (e: React.FormEvent) => {
    e.preventDefault();
    const valorNumerico = parseFloat(novaTransacao.valor);
    if (!novaTransacao.descricao || isNaN(valorNumerico)) return;

    const nova: Transacao = {
      id: Math.random().toString(),
      descricao: novaTransacao.descricao,
      categoria: novaTransacao.categoria,
      tipo: novaTransacao.tipo,
      valor: valorNumerico,
      data: 'Hoje, Agora'
    };

    setTransacoes([nova, ...transacoes]);
    setNovaTransacao({ descricao: '', categoria: 'Alimentação', tipo: 'despesa', valor: '' });
    setModalOpen(false);
  };

  const handleAporteSimulado = (metaId: string) => {
    setMetas(prev => prev.map(m => {
      if (m.id === metaId && m.atual < m.objetivo) {
        return { ...m, atual: Math.min(m.objetivo, m.atual + 500) };
      }
      return m;
    }));
  };

  const dataPontosGrafico = useMemo(() => {
    if (selectedPeriod === '30') {
      return {
        pontosReceita: "10,90 80,75 150,55 220,60 290,40 360,30",
        pontosDespesa: "10,130 80,110 150,115 220,95 290,105 360,90",
        meses: ['01 Jun', '03 Jun', '05 Jun', '07 Jun', '09 Jun', '12 Jun']
      };
    } else if (selectedPeriod === '60') {
      return {
        pontosReceita: "10,105 80,85 150,70 220,55 290,45 360,20",
        pontosDespesa: "10,140 80,120 150,100 220,110 290,95 360,85",
        meses: ['Mai 01', 'Mai 15', 'Mai 30', 'Jun 05', 'Jun 10', 'Jun 12']
      };
    } else {
      return {
        pontosReceita: "10,120 80,95 150,85 220,60 290,35 360,15",
        pontosDespesa: "10,145 80,130 150,110 220,100 290,90 360,80",
        meses: ['Abril', 'Mai I', 'Mai II', 'Jun I', 'Jun II', 'Jun Recente']
      };
    }
  }, [selectedPeriod]);

  const getIconeCategoria = (categoria: string) => {
    switch (categoria) {
      case 'Alimentação': return <Utensils className="w-4 h-4" />;
      case 'Moradia': return <Home className="w-4 h-4" />;
      case 'Transporte': return <Car className="w-4 h-4" />;
      case 'Saúde': return <HeartPulse className="w-4 h-4" />;
      case 'Lazer': return <Coffee className="w-4 h-4" />;
      default: return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  // Paleta Redesenhada:
  // Fundo principal: #050B14 (Azul Petróleo muito escuro)
  // Cards: #0A1320 (Azul profundo de superfície)
  // Bordas: #1A283A (Grafite/Azul sutil)
  // Identidade Base: blue-500 para UI, emerald-500 (crescimento), rose-500 (despesas), amber-400 (metas)
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-200 font-sans flex antialiased selection:bg-blue-500/20 selection:text-blue-400">

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1320] border-r border-[#1A283A] flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen shrink-0
        ${sidebarOpen ? 'translate-x-0 shadow-2xl shadow-black' : '-translate-x-full'}
      `}>
        <div>
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#1A283A]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-sm shadow-blue-900/50">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-100 tracking-wide">Finance Pro</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-5 space-y-1.5">
            <span className="px-3 text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-4 mt-2">Plataforma</span>

            <button
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${activeTab === 'dashboard'
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A283A]/50'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Painel de Controle
            </button>

            <button
              onClick={() => { setActiveTab('transacoes'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${activeTab === 'transacoes'
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A283A]/50'
                }`}
            >
              <Coins className="w-4 h-4" />
              Histórico e Lançamentos
            </button>

            <button
              onClick={() => { setActiveTab('metas'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${activeTab === 'metas'
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1A283A]/50'
                }`}
            >
              <Target className="w-4 h-4" />
              Projetos e Metas
            </button>
          </nav>
        </div>

        <div className="p-5 border-t border-[#1A283A]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#1A283A] flex items-center justify-center text-xs font-bold text-slate-300">
              GA
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-200">Guilherme Arantes</span>
              <span className="block text-[10px] text-blue-400 font-medium">Conta Premium</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">

        <header className="h-20 border-b border-[#1A283A] px-6 lg:px-10 flex items-center justify-between shrink-0 bg-[#050B14]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-slate-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-sm font-medium text-slate-300 hidden sm:block">
              Visão consolidada de <span className="text-slate-100 font-semibold">Junho de 2026</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm shadow-blue-900/20"
            >
              <Plus className="w-4 h-4" />
              Novo Lançamento
            </button>
            <button className="text-slate-400 hover:text-slate-200 transition">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8 flex-1 max-w-[1400px] mx-auto w-full">

          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

              <section>
                <h2 className="text-sm font-semibold text-slate-100 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  Insights Inteligentes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-4 flex items-start gap-4 hover:bg-[#0D1826] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Evolução Mensal</p>
                      <p className="text-sm text-slate-200 leading-snug">
                        Você reteve <span className="text-emerald-400 font-medium">15% a mais</span> de capital este mês comparado à sua média anual.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-4 flex items-start gap-4 hover:bg-[#0D1826] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Ponto de Atenção</p>
                      <p className="text-sm text-slate-200 leading-snug">
                        A categoria <span className="text-rose-400 font-medium">Alimentação</span> representa 32% dos seus gastos totais.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-4 flex items-start gap-4 hover:bg-[#0D1826] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Meta Próxima</p>
                      <p className="text-sm text-slate-200 leading-snug">
                        Faltam apenas <span className="text-amber-400 font-medium">R$ 4.750</span> para concluir a Reserva de Emergência.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {/* Saldo Líquido */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">Patrimônio Atual</span>
                    <Briefcase className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold tracking-tight text-slate-100">
                      R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="flex items-center text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        <TrendingUp className="w-3 h-3 mr-1" /> +8,5%
                      </span>
                      <span className="text-[10px] text-slate-500">vs. mês passado</span>
                    </div>
                  </div>
                </div>

                {/* Receitas (Verde) */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">Receitas Totais</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold tracking-tight text-slate-100">
                      R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <div className="mt-4 w-full h-1 bg-[#1A283A] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">100% da meta de entradas atingida.</p>
                  </div>
                </div>

                {/* Despesas (Vermelho) */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">Despesas & Custos</span>
                    <ArrowDownRight className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold tracking-tight text-slate-100">
                      R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <div className="mt-4 w-full h-1 bg-[#1A283A] rounded-full overflow-hidden">
                      {/* Simulação de barra de limite de gastos (ocupando ~40%) */}
                      <div className="h-full bg-rose-500 w-[42%] rounded-full"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">42% do limite mensal consumido.</p>
                  </div>
                </div>

                {/* Retenção */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">Líquido Retido</span>
                    <PiggyBank className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="block text-2xl font-semibold tracking-tight text-slate-100">
                      R$ {economiaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        Taxa: {taxaPoupança.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">Pronto para distribuição nas metas.</p>
                  </div>
                </div>

              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Gráfico SVG de Área (2 Colunas) - Cores Semânticas Rigorosas */}
                <div className="lg:col-span-2 bg-[#0A1320] border border-[#1A283A] rounded-xl p-6 flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">Fluxo Evolutivo</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Acompanhamento de entradas (verde) vs. saídas (vermelho)</p>
                    </div>

                    <div className="flex items-center bg-[#050B14] p-1 rounded-md border border-[#1A283A]">
                      {['30', '60', '90'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPeriod(p as any)}
                          className={`text-[10px] font-medium px-3 py-1.5 rounded transition-colors ${selectedPeriod === p
                            ? 'bg-[#1A283A] text-slate-200'
                            : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                          {p} dias
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-60 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 380 150" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="area-receita" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="area-despesa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Linhas de grade horizontais minimalistas */}
                      <line x1="0" y1="30" x2="380" y2="30" stroke="#1A283A" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="75" x2="380" y2="75" stroke="#1A283A" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="120" x2="380" y2="120" stroke="#1A283A" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Receitas (Verde/Crescimento) */}
                      <path
                        d={`M 10,150 L ${dataPontosGrafico.pontosReceita} L 360,150 Z`}
                        fill="url(#area-receita)"
                        className="transition-all duration-700 ease-in-out"
                      />
                      <path
                        d={`M ${dataPontosGrafico.pontosReceita}`}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-700 ease-in-out"
                      />

                      {/* Despesas (Vermelho/Saída) */}
                      <path
                        d={`M 10,150 L ${dataPontosGrafico.pontosDespesa} L 360,150 Z`}
                        fill="url(#area-despesa)"
                        className="transition-all duration-700 ease-in-out"
                      />
                      <path
                        d={`M ${dataPontosGrafico.pontosDespesa}`}
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-700 ease-in-out"
                      />
                    </svg>

                    <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1 mt-4">
                      {dataPontosGrafico.meses.map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Histórico Recente */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-slate-100">Últimos Registros</h3>
                    <button onClick={() => setActiveTab('transacoes')} className="text-[10px] text-blue-400 font-medium hover:text-blue-300 transition-colors flex items-center">
                      Ver todos <ChevronRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-4">
                    {transacoes.slice(0, 5).map(t => (
                      <div key={t.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${t.tipo === 'receita' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-[#050B14] border-[#1A283A] text-slate-400'
                            }`}>
                            {t.tipo === 'receita' ? <TrendingUp className="w-3.5 h-3.5" /> : getIconeCategoria(t.categoria)}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-200 truncate max-w-[130px] sm:max-w-[150px]">{t.descricao}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{t.data}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-medium ${t.tipo === 'receita' ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Gastos por Categoria */}
                <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-6 flex flex-col">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">Distribuição de Despesas</h3>
                  <p className="text-[11px] text-slate-500 mb-6">Onde seu dinheiro está focado neste mês</p>

                  <div className="space-y-5">
                    {gastosPorCategoria.map((cat, index) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-2.5">
                            <div className="text-slate-400" style={{ color: cat.config.color }}>
                              {getIconeCategoria(cat.nome as any)}
                            </div>
                            <span className="text-xs font-medium text-slate-200">{cat.nome}</span>
                          </div>
                          <div className="text-right flex items-baseline gap-2">
                            <span className="text-[10px] text-slate-500">{cat.percentual.toFixed(1)}%</span>
                            <span className="text-xs font-semibold text-slate-100 w-16 text-right">
                              R$ {cat.valor.toLocaleString('pt-BR')}
                            </span>
                          </div>
                        </div>
                        {/* Barras de progresso com cor dinâmica */}
                        <div className="h-1.5 w-full bg-[#050B14] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${cat.percentual}%`,
                              backgroundColor: cat.config.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metas Redesenhadas (2 colunas) */}
                <div className="lg:col-span-2 bg-[#0A1320] border border-[#1A283A] rounded-xl p-6">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">Projetos & Conquistas</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Acompanhe a materialização dos seus objetivos de vida.</p>
                    </div>
                    <button onClick={() => setActiveTab('metas')} className="text-[10px] text-blue-400 font-medium hover:text-blue-300 transition-colors">
                      Gerenciar Metas
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metas.slice(0, 2).map((meta) => {
                      const progresso = (meta.atual / meta.objetivo) * 100;
                      const isConcluida = progresso >= 100;
                      const valorRestante = meta.objetivo - meta.atual;

                      return (
                        <div
                          key={meta.id}
                          className="bg-[#050B14] border border-[#1A283A] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-[#2A3F5A] transition-colors"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
                                {meta.categoria}
                              </span>
                              <h4 className="text-sm font-medium text-slate-100">{meta.nome}</h4>
                            </div>
                            <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                              {Math.round(progresso)}%
                            </span>
                          </div>

                          <div className="space-y-3 mb-5">
                            <div className="flex justify-between items-end">
                              <span className="text-lg font-semibold text-slate-100">
                                R$ {meta.atual.toLocaleString('pt-BR')}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">
                                de R$ {meta.objetivo.toLocaleString('pt-BR')}
                              </span>
                            </div>
                            {/* Barra Dourada Elegante */}
                            <div className="w-full h-2 bg-[#1A283A] rounded-full overflow-hidden shadow-inner">
                              <div
                                className="h-full bg-amber-400 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${Math.min(100, progresso)}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#1A283A]/50">
                            <div className="flex flex-col">
                              <span className="text-[10px] text-slate-500">Valor Restante</span>
                              <span className="text-xs font-semibold text-slate-300">
                                {isConcluida ? 'Concluído!' : `R$ ${valorRestante.toLocaleString('pt-BR')}`}
                              </span>
                            </div>

                            <button
                              onClick={() => handleAporteSimulado(meta.id)}
                              disabled={isConcluida}
                              className={`text-[10px] font-medium px-3 py-1.5 rounded border transition-colors flex items-center gap-1.5 ${isConcluida
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 cursor-not-allowed'
                                : 'bg-[#0A1320] border-[#1A283A] text-slate-300 hover:text-amber-400 hover:border-amber-500/30'
                                }`}
                            >
                              {isConcluida ? (
                                <><CheckCircle className="w-3.5 h-3.5" /> Alcançada</>
                              ) : (
                                <><Plus className="w-3.5 h-3.5" /> Aportar (+500)</>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

            </div>
          )}

          {activeTab === 'transacoes' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">Histórico de Lançamentos</h2>
                  <p className="text-xs text-slate-500 mt-1">Controle total sobre suas entradas e saídas.</p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-[#0A1320] border border-[#1A283A] text-xs text-slate-200 rounded-lg pl-9 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#050B14] border-b border-[#1A283A] text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                      <th className="p-4 font-medium">Descrição</th>
                      <th className="p-4 font-medium hidden sm:table-cell">Categoria</th>
                      <th className="p-4 font-medium hidden md:table-cell">Data</th>
                      <th className="p-4 font-medium text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A283A] text-xs">
                    {transacoes.map((t) => (
                      <tr key={t.id} className="hover:bg-[#1A283A]/30 transition-colors">
                        <td className="p-4 font-medium text-slate-200 flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${t.tipo === 'receita' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                          {t.descricao}
                        </td>
                        <td className="p-4 hidden sm:table-cell text-slate-400">
                          <div className="flex items-center gap-2">
                            {getIconeCategoria(t.categoria)} {t.categoria}
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell text-slate-500">
                          {t.data}
                        </td>
                        <td className={`p-4 text-right font-medium ${t.tipo === 'receita' ? 'text-emerald-400' : 'text-slate-300'
                          }`}>
                          {t.tipo === 'receita' ? '+' : '-'} R$ {t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'metas' && (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-100">Visão Geral de Projetos</h2>
                <p className="text-xs text-slate-500 mt-1">Seus objetivos de curto, médio e longo prazo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metas.map((meta) => {
                  const progresso = (meta.atual / meta.objetivo) * 100;
                  const isConcluida = progresso >= 100;
                  const valorRestante = meta.objetivo - meta.atual;

                  return (
                    <div key={meta.id} className="bg-[#0A1320] border border-[#1A283A] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
                            {meta.categoria}
                          </span>
                          <h3 className="text-base font-medium text-slate-100 pr-4 leading-tight">{meta.nome}</h3>
                        </div>
                        <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                          {Math.round(progresso)}%
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-end">
                          <span className="text-xl font-semibold text-slate-100">
                            R$ {meta.atual.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            / R$ {meta.objetivo.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#050B14] border border-[#1A283A] rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${Math.min(100, progresso)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#1A283A]">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500">Restam</span>
                          <span className="text-xs font-semibold text-slate-300">
                            {isConcluida ? 'Concluído!' : `R$ ${valorRestante.toLocaleString('pt-BR')}`}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-slate-500">Tempo est.</span>
                          <span className="text-xs font-semibold text-slate-300">
                            {meta.tempoEstimado}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050B14]/80 backdrop-blur-sm">
          <div className="bg-[#0A1320] border border-[#1A283A] rounded-xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-5 py-4 border-b border-[#1A283A] flex items-center justify-between bg-[#050B14]">
              <h3 className="font-semibold text-slate-100 text-sm">Novo Lançamento</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdicionarTransacao} className="p-5 space-y-5">

              <div className="flex rounded-lg bg-[#050B14] p-1 border border-[#1A283A]">
                <button
                  type="button"
                  onClick={() => setNovaTransacao({ ...novaTransacao, tipo: 'despesa' })}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${novaTransacao.tipo === 'despesa' ? 'bg-[#1A283A] text-rose-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  onClick={() => setNovaTransacao({ ...novaTransacao, tipo: 'receita' })}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${novaTransacao.tipo === 'receita' ? 'bg-[#1A283A] text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                  Receita
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-medium block mb-1.5 uppercase tracking-wider">Descrição</label>
                  <input
                    type="text" required placeholder="Ex: Conta de Energia"
                    value={novaTransacao.descricao} onChange={(e) => setNovaTransacao({ ...novaTransacao, descricao: e.target.value })}
                    className="bg-[#050B14] border border-[#1A283A] text-slate-200 text-xs rounded-lg px-3 py-2.5 w-full focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg text-xs transition duration-200 shadow-sm"
                >
                  Registrar Movimentação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}