import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell, 
  Sparkles, 
  Target, 
  Search,
  Home,
  PieChart,
  Settings,
  Zap,
  Moon,
  Sun,
  Smartphone,
  Laptop,
  ArrowRightLeft,
  X,
  History,
  Edit3,
  ChevronRight
} from 'lucide-react';

// ==========================================
// DADOS MOCKADOS ULTRA-PREMIUM (Mocks Artísticos)
// ==========================================

const MOCK_WALLET_TRANSACTIONS = [
  { id: 'wt1', title: 'Starbucks Coffee', amount: 32.50, type: 'EXPENSE', date: 'Hoje', icon: Target },
  { id: 'wt2', title: 'Pix Recebido', amount: 150.00, type: 'INCOME', date: 'Ontem', icon: ArrowUpRight },
  { id: 'wt3', title: 'Uber Viagem', amount: 24.90, type: 'EXPENSE', date: '12 Jul', icon: ArrowDownRight },
  { id: 'wt4', title: 'Spotify Premium', amount: 21.90, type: 'EXPENSE', date: '10 Jul', icon: Zap }
];

const MOCK_WALLETS = [
  { id: 'w1', name: 'Conta Principal', brand: 'Nubank', balance: 8340.00, digits: '4521', color: 'from-[#8B5CF6] to-[#6D28D9]', glow: 'rgba(139,92,246,0.3)', txs: MOCK_WALLET_TRANSACTIONS },
  { id: 'w2', name: 'Investimentos', brand: 'BTG Pactual', balance: 5580.00, digits: '8847', color: 'from-[#0B1528] to-[#1E3A8A]', glow: 'rgba(59,130,246,0.25)', txs: MOCK_WALLET_TRANSACTIONS },
  { id: 'w3', name: 'Reserva', brand: 'Itaú', balance: 12500.00, digits: '9087', color: 'from-[#FF5F00] to-[#EC6608]', glow: 'rgba(236,102,8,0.25)', txs: MOCK_WALLET_TRANSACTIONS },
  { id: 'w4', name: 'Rendimento Fixo', brand: 'Inter', balance: 3420.00, digits: '1243', color: 'from-[#FF7A00] to-[#EA580C]', glow: 'rgba(249,122,0,0.25)', txs: MOCK_WALLET_TRANSACTIONS },
  { id: 'w5', name: 'Viagem Euro', brand: 'Mercado Pago', balance: 1200.00, digits: '7765', color: 'from-[#009EE3] to-[#0073C5]', glow: 'rgba(0,158,227,0.25)', txs: MOCK_WALLET_TRANSACTIONS },
  { id: 'w6', name: 'Caixa Emergencial', brand: 'Santander', balance: 2500.00, digits: '9981', color: 'from-[#EC0000] to-[#CC0000]', glow: 'rgba(236,0,0,0.25)', txs: MOCK_WALLET_TRANSACTIONS },
];

const MOCK_TIMELINE = [
  { id: 't1', title: 'Salário Mensal', category: 'Renda', time: 'Hoje, 14:32', amount: 5200.00, type: 'INCOME', icon: Zap },
  { id: 't2', title: 'Aluguel Residencial', category: 'Moradia', time: 'Hoje, 09:15', amount: 1200.00, type: 'EXPENSE', icon: Home },
  { id: 't3', title: 'Supermercado Angeloni', category: 'Alimentação', time: 'Ontem, 19:45', amount: 345.20, type: 'EXPENSE', icon: Target },
  { id: 't4', title: 'Rendimento de Fundo', category: 'Investimentos', time: '08 Jul, 10:00', amount: 45.90, type: 'INCOME', icon: TrendingUp },
  { id: 't5', title: 'Assinatura Adobe Cloud', category: 'Serviços', time: '07 Jul, 16:20', amount: 124.00, type: 'EXPENSE', icon: ArrowUpRight },
];

const MOCK_INSIGHTS = [
  { text: "Você economizou 18% mais este mês em comparação com o período anterior.", type: "success" },
  { text: "Seu patrimônio líquido cresceu R$ 1.240 este mês de forma orgânica.", type: "info" },
  { text: "Atenção: Suas assinaturas automáticas representam R$ 240 nos próximos 5 dias.", type: "warning" }
];

const MOCK_GOALS = [
  { name: "Reserva de Emergência", current: 8340, target: 12000, percentage: 69, color: 'from-[#8B5CF6] to-[#6D28D9]' },
  { name: "Viagem de Fim de Ano", current: 3000, target: 10000, percentage: 30, color: 'from-[#10B981] to-[#059669]' }
];

const MOCK_CATEGORIES = [
  { name: "Alimentação", percentage: 35, amount: 554.75, color: "stroke-rose-500 text-rose-500", rawColor: "#EF4444" },
  { name: "Moradia", percentage: 28, amount: 443.80, color: "stroke-amber-500 text-amber-500", rawColor: "#F59E0B" },
  { name: "Transporte", percentage: 18, amount: 285.30, color: "stroke-[#8B5CF6] text-[#8B5CF6]", rawColor: "#8B5CF6" },
  { name: "Assinaturas & Lazer", percentage: 19, amount: 301.15, color: "stroke-blue-500 text-blue-500", rawColor: "#3B82F6" }
];

// Utilitário global declarado no topo para garantir acesso seguro de escopo
const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

// ==========================================
// ESTILOS DE TEMA CSS (MISTURA DE MINIMALISMO E GRADIENTES SUTIS)
// ==========================================

const ThemeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');

    .theme-dark {
      --bg-base: #09090B;
      --bg-surface: #111113;
      --text-main: #FFFFFF;
      --text-muted: #A1A1AA;
      --border-subtle: rgba(255, 255, 255, 0.04);
      --border-strong: rgba(255, 255, 255, 0.08);
      --plasma-primary: rgba(139, 92, 246, 0.15); 
      --plasma-income: rgba(16, 185, 129, 0.08); 
      --plasma-expense: rgba(239, 68, 68, 0.05); 
      --glass-bg: rgba(9, 9, 11, 0.6);
      --card-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);
    }

    .theme-light {
      --bg-base: #FAFAFA;
      --bg-surface: #FFFFFF;
      --text-main: #09090B;
      --text-muted: #71717A;
      --border-subtle: rgba(0, 0, 0, 0.04);
      --border-strong: rgba(0, 0, 0, 0.08);
      --plasma-primary: rgba(124, 58, 237, 0.12);
      --plasma-income: rgba(16, 185, 129, 0.05);
      --plasma-expense: rgba(239, 68, 68, 0.03);
      --glass-bg: rgba(250, 250, 250, 0.7);
      --card-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.05);
    }

    body { font-family: 'Inter', sans-serif; background-color: var(--bg-base); color: var(--text-main); overflow-x: hidden; }
    .font-display { font-family: 'Outfit', sans-serif; }
    
    .bg-main { background-color: var(--bg-base); }
    .bg-surface { background-color: var(--bg-surface); }
    .bg-glass { background: var(--glass-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
    .border-glass { border: 1px solid var(--border-subtle); }
    .text-main { color: var(--text-main); }
    .text-muted { color: var(--text-muted); }
    
    /* Animações Orgânicas e Fluidas */
    @keyframes plasma-flow {
      0% { transform: translate(0, 0) scale(1) rotate(0deg); }
      50% { transform: translate(2%, 4%) scale(1.05) rotate(2deg); }
      100% { transform: translate(-2%, -2%) scale(0.95) rotate(-2deg); }
    }
    .animate-plasma { animation: plasma-flow 12s ease-in-out infinite alternate; }
    
    @keyframes wallet-expand {
      from { opacity: 0; transform: scale(0.95) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .animate-wallet-expand { animation: wallet-expand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    @keyframes circular-explode {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-explode { animation: circular-explode 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

    /* Partículas Senoidais e de Constelação Financeira */
    @keyframes floating-particle {
      0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
      50% { transform: translateY(-15px) translateX(10px); opacity: 0.8; }
      100% { transform: translateY(5px) translateX(-5px); opacity: 0.3; }
    }
    .particle-1 { animation: floating-particle 6s ease-in-out infinite; }
    .particle-2 { animation: floating-particle 9s ease-in-out infinite 2s; }
    .particle-3 { animation: floating-particle 7s ease-in-out infinite 4s; }

    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* SVG Wave Animation */
    @keyframes wave-move {
      0% { transform: translateX(0); }
      50% { transform: translateX(-25%); }
      100% { transform: translateX(-50%); }
    }
    .animate-wave-subtle { animation: wave-move 16s linear infinite; }
  `}} />
);

// ==========================================
// COMPONENTE PRINCIPAL (Mobile-First Architecture Real)
// ==========================================

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  
  // Estado para a expansão imersiva da carteira
  const [expandedWallet, setExpandedWallet] = useState<typeof MOCK_WALLETS[0] | null>(null);

  // Estados Interativos de Web Design
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlusMenuOpen, setIsPlusMenuOpen] = useState(false);
  
  // Estado para o Orbit Menu Desktop
  const [isOrbitOpen, setIsOrbitOpen] = useState(false);

  // Impede scroll do body quando a carteira estiver expandida
  useEffect(() => {
    if (expandedWallet) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [expandedWallet]);

  return (
    <div className={`theme-${theme} bg-main min-h-screen relative flex flex-col items-center overflow-x-hidden selection:bg-[#8B5CF6]/30 transition-colors duration-500 pb-32`}>
      <ThemeStyles />

      {/* TOOLBAR DE APRESENTAÇÃO (Apenas Canvas) */}
      <div className="fixed top-2 right-2 z-[60] flex bg-[#18181B] rounded-full border border-white/10 p-1 shadow-xl">
        <button onClick={() => setViewport(v => v === 'mobile' ? 'desktop' : 'mobile')} className="p-2 rounded-full text-zinc-500 hover:text-white transition-colors duration-200 flex items-center gap-1.5 px-3">
          {viewport === 'mobile' ? <Laptop className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          <span className="text-[10px] font-semibold uppercase">{viewport}</span>
        </button>
        <div className="w-[1px] h-6 bg-zinc-800 self-center mx-1" />
        <button onClick={() => setTheme('dark')} className={`p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'bg-[#8B5CF6] text-white' : 'text-zinc-500'}`}><Moon className="w-4 h-4" /></button>
        <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'bg-[#8B5CF6] text-white' : 'text-zinc-500'}`}><Sun className="w-4 h-4" /></button>
      </div>

      {/* CONTAINER PRINCIPAL - ARQUITETURA MOBILE FIRST COMPARTILHADA */}
      <div className={`w-full relative z-10 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${viewport === 'mobile' ? 'max-w-[400px] border-x border-[var(--border-subtle)] bg-main min-h-screen shadow-2xl pb-24' : 'max-w-[1440px] px-6 lg:px-12'}`}>
        
        {/* ================================================== */}
        {/* HEADER EXCLUSIVO MOBILE */}
        {/* ================================================== */}
        {viewport === 'mobile' && (
          <header className="relative z-20 flex items-center justify-between py-6 border-b border-[var(--border-subtle)] mb-6 px-4">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#8B5CF6]/30 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <img src="https://github.com/joaojuniodev.png" alt="Perfil" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--bg-base)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold transition-colors duration-200 group-hover:text-[#8B5CF6]">Boa noite,</span>
                <h1 className="text-base font-display font-semibold text-main tracking-wide">João</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 rounded-full bg-glass border-glass flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--border-subtle)] transition-colors duration-200">
                <Search className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-glass border-glass flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--border-subtle)] transition-colors duration-200 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#8B5CF6] border-2 border-[var(--bg-base)]" />
              </button>
            </div>
          </header>
        )}

        {/* ================================================== */}
        {/* CARD PRINCIPAL (RESTAURADO COMPLETAMENTE AO ORIGINAL COM ILUSTRAÇÃO SVG NO DESKTOP) */}
        {/* ================================================== */}
        <section className="relative w-full rounded-[28px] overflow-hidden p-8 shadow-premium mt-6 group select-none card-base">
          {/* Linha de luz e efeitos */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br from-[#8B5CF6]/30 via-transparent to-transparent z-0" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[35%] bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent z-0" />
          
          {/* ILUSTRAÇÃO FINANCEIRA ANIMADA (DESKTOP) - Fica no espaço vazio à direita */}
          <div className="absolute inset-y-0 right-8 w-[40%] h-full hidden lg:block pointer-events-none z-0 overflow-hidden">
            <svg className="absolute top-1/2 -translate-y-1/2 right-12 w-[180px] h-[180px] text-[#8B5CF6]/15" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Círculo Holográfico */}
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="animate-spin" style={{ animationDuration: '40s', transformOrigin: 'center' }} />
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="40 10" className="animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse', transformOrigin: 'center' }} />
              
              {/* Ondas Senoidais Fluindo pelo Círculo */}
              <path d="M40 100 Q70 70 100 100 T160 100" stroke="currentColor" strokeWidth="2.5" className="animate-pulse" style={{ transformOrigin: 'center' }} />
              <path d="M40 105 Q70 135 100 105 T160 105" stroke="currentColor" strokeWidth="1" opacity="0.5" className="animate-pulse" style={{ animationDelay: '1s', transformOrigin: 'center' }} />

              {/* Moedas/Partículas flutuantes com brilho */}
              <g className="particle-1">
                <circle cx="100" cy="40" r="8" fill="rgba(16, 185, 129, 0.2)" stroke="#10B981" strokeWidth="1.5" />
                <path d="M100 37 V43 M97 40 H103" stroke="#10B981" strokeWidth="1" />
              </g>
              <g className="particle-2">
                <circle cx="150" cy="140" r="6" fill="rgba(139, 92, 246, 0.2)" stroke="#8B5CF6" strokeWidth="1.5" />
                <circle cx="150" cy="140" r="1.5" fill="#8B5CF6" />
              </g>
              <g className="particle-3">
                <circle cx="50" cy="130" r="10" fill="rgba(248, 113, 113, 0.15)" stroke="#F87171" strokeWidth="1.5" />
                <path d="M46 130 H54" stroke="#F87171" strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-2">Saldo Consolidado</span>
              <h2 className="text-4xl sm:text-5xl font-['Outfit'] font-bold text-main tracking-tight leading-none tabular-nums">
                R$ 15.420,00
              </h2>
            </div>

            <div className="flex gap-8 border-l-0 md:border-l border-[var(--border-subtle)] pl-0 md:pl-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Entradas</span>
                <span className="text-xl font-['Outfit'] font-bold text-emerald-400 tabular-nums flex items-center gap-1.5">
                  <TrendingUp className="w-4.5 h-4.5" /> R$ 5.200,00
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Saídas</span>
                <span className="text-xl font-['Outfit'] font-bold text-rose-400 tabular-nums flex items-center gap-1.5">
                  <TrendingDown className="w-4.5 h-4.5" /> R$ 1.585,00
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* GRID DE CONTEÚDO (NÃO POLUÍDO) */}
        {/* ================================================== */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* COLUNA ESQUERDA (Mobile: Cima / Desktop: Esquerda) */}
          <div className="lg:col-span-7 flex flex-col gap-8 min-w-0">
            
            {/* Ações Rápidas (Chips de Interação) */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
              {[
                { icon: ArrowUpRight, label: 'Receita', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { icon: ArrowDownRight, label: 'Despesa', color: 'text-rose-500', bg: 'bg-rose-500/10' },
                { icon: ArrowRightLeft, label: 'Transferir', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { icon: Target, label: 'Metas', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
              ].map((action, i) => (
                <button key={i} className="flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-[var(--bg-surface)] border-glass hover:bg-[var(--border-subtle)] transition-colors duration-200 active:scale-95 group shadow-sm">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.bg} ${action.color} transition-transform duration-200 group-hover:scale-110`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-main">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Atividade Recente */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Fluxo Recente</h3>
                <button className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest hover:text-[#7C3AED] transition-colors duration-200">Ver Histórico</button>
              </div>

              <div className="flex flex-col gap-1">
                {MOCK_TIMELINE.map((item) => {
                  const isInc = item.type === 'INCOME';
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="relative flex items-center gap-4 p-3 rounded-2xl hover:bg-[var(--bg-surface)] transition-colors duration-200 group cursor-pointer border border-transparent hover:border-[var(--border-subtle)]">
                      <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${isInc ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-main truncate">{item.title}</h4>
                        <span className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">{item.category} • {item.time}</span>
                      </div>
                      <div className="flex flex-col items-end justify-center shrink-0 pl-2">
                        <span className={`font-display text-sm lg:text-base font-bold tabular-nums ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isInc ? '+' : '-'}{formatCurrency(item.amount)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO: DISTRIBUIÇÃO DE DESPESAS (CONCÊNTRICA NADA DE CARD PIZZA COMUM) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Distribuição por Categoria</h3>
              <div className="w-full card-base rounded-[32px] p-6 lg:p-8 flex flex-col md:flex-row items-center gap-8">
                
                {/* Visualizador de Anéis Nada de pizza comum */}
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0 bg-white/[0.01] rounded-full border border-base">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14.5" fill="none" stroke="var(--border-subtle)" strokeWidth="1.5" />
                    {MOCK_CATEGORIES.map((cat, idx) => (
                      <circle 
                        key={idx} 
                        cx="18" 
                        cy="18" 
                        r={14.5 - (idx * 2.5)} 
                        fill="none" 
                        stroke={cat.rawColor} 
                        strokeWidth="1.8" 
                        strokeDasharray={`${cat.percentage} ${100 - cat.percentage}`} 
                        strokeDashoffset={100 - (idx * 15)} 
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    ))}
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Despesas</span>
                    <span className="text-sm font-['Outfit'] font-bold text-main tabular-nums">Julho</span>
                  </div>
                </div>

                {/* Legendas Modernas e Minimalistas */}
                <div className="flex-1 w-full grid grid-cols-2 gap-4">
                  {MOCK_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="flex flex-col p-3 rounded-xl bg-white/[0.01] border border-[var(--border-subtle)] hover:bg-white/[0.03] transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.rawColor }} />
                        <span className="text-[11px] text-[var(--text-muted)] truncate">{cat.name}</span>
                      </div>
                      <span className="font-display text-sm font-semibold text-main tabular-nums">
                        {cat.percentage}% ({formatCurrency(cat.amount)})
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* COLUNA DIREITA (Mobile: Baixo / Desktop: Direita) */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full">
            
            {/* Carteiras Empilhadas (Apple Wallet Deck Avançado) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Suas Carteiras</h3>
                  {MOCK_WALLETS.length > 4 && (
                    <span className="text-[10px] bg-white/[0.04] border border-white/[0.08] text-[var(--text-muted)] px-1.5 py-0.5 rounded font-mono font-bold">+{MOCK_WALLETS.length - 4}</span>
                  )}
                </div>
                <Plus className="w-4 h-4 text-[#8B5CF6] cursor-pointer hover:scale-110 transition-transform duration-200" />
              </div>

              {/* Stack de Carteiras com maior espaçamento vertical e 100% de visibilidade no mobile (Sem Hover/Stack no Mobile) */}
              {viewport === 'mobile' ? (
                <div className="flex flex-col gap-4">
                  {MOCK_WALLETS.slice(0, 4).map((wallet) => (
                    <div 
                      key={wallet.id}
                      onClick={() => setExpandedWallet(wallet)}
                      className="w-full h-[140px] rounded-[24px] p-5 flex flex-col justify-between border border-white/10"
                      style={{ 
                        background: `linear-gradient(135deg, var(--bg-surface), var(--bg-base))`,
                        boxShadow: `0 15px 35px -15px ${wallet.glow}`,
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold opacity-80">{wallet.brand}</span>
                          <h5 className="text-sm font-semibold text-main mt-1">{wallet.name}</h5>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${wallet.color} opacity-90 shadow-inner flex items-center justify-center text-white`}>
                          <Zap className="w-4 h-4 text-white opacity-60" />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-xs text-zinc-500 tracking-widest">•••• {wallet.digits}</span>
                        <span className="font-display text-base font-bold text-main tabular-nums">{formatCurrency(wallet.balance)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative h-[300px] w-full select-none">
                  {MOCK_WALLETS.slice(0, 4).map((wallet, index) => (
                    <div 
                      key={wallet.id}
                      onClick={() => setExpandedWallet(wallet)}
                      className="absolute left-0 right-0 h-[140px] rounded-[24px] p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer border border-white/10 hover:-translate-y-16 hover:scale-[1.02] hover:z-[60]"
                      style={{ 
                        background: `linear-gradient(135deg, var(--bg-surface), var(--bg-base))`,
                        top: `${index * 48}px`, // Subida e espaçamento ideal restaurado para Desktop
                        zIndex: 10 + index,
                        boxShadow: `0 15px 35px -15px ${wallet.glow}`,
                        transform: `scale(${1 - (4 - 1 - index) * 0.025})`, // Escala sutil e elegante
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold opacity-80">{wallet.brand}</span>
                          <h5 className="text-sm font-semibold text-main mt-1">{wallet.name}</h5>
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${wallet.color} opacity-90 shadow-inner flex items-center justify-center text-white`}>
                          <Zap className="w-4 h-4 text-white opacity-60" />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-xs text-zinc-500 tracking-widest">•••• {wallet.digits}</span>
                        <span className="font-display text-base font-bold text-main tabular-nums">{formatCurrency(wallet.balance)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Metas de Reserva */}
            <div className="card-base rounded-[24px] p-6">
              <h4 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-5">Metas de Reserva</h4>
              <div className="space-y-4">
                {MOCK_GOALS.map((goal, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-main">{goal.name}</span>
                      <span className="text-subtle tabular-nums">{goal.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden border border-base">
                      <div className={`h-full bg-gradient-to-r ${goal.color} rounded-full`} style={{ width: `${goal.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="relative overflow-hidden rounded-[24px] p-6 bg-glass border-glass shadow-[var(--shadow-soft)] group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl rounded-full transition-colors duration-500 group-hover:bg-[#8B5CF6]/20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Inteligência Financeira</h3>
                </div>
                <p className="font-['Inter'] text-sm text-main leading-relaxed font-light">
                  Seu patrimônio líquido cresceu <span className="text-emerald-500 font-semibold">R$ 1.240</span> este mês. A categoria Moradia representou a maior parte das suas saídas.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================================================== */}
      {/* BOTTOM NAVIGATION (Mobile App Feel) */}
      {/* ================================================== */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 h-24 bg-glass border-t border-[var(--border-subtle)] flex items-center justify-around px-6 z-40 pb-4 transition-transform duration-500 ${viewport === 'mobile' ? 'max-w-[400px] left-1/2 -translate-x-1/2 rounded-b-[48px]' : ''}`}>
        <button className="flex flex-col items-center gap-1.5 text-[#8B5CF6] transition-transform duration-200 active:scale-95">
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold tracking-wide">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-transform duration-200 active:scale-95">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Carteiras</span>
        </button>
        
        {/* BOTÃO "+" CENTRAL DE EXPANSÃO CIRCULAR ESTILO MOBILLS */}
        <button 
          onClick={() => setIsPlusMenuOpen(!isPlusMenuOpen)}
          className="relative flex flex-col items-center justify-center -mt-8 transition-transform duration-200 active:scale-95 z-50 outline-none"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-[0_4px_20px_rgba(139,92,246,0.4)] text-white border-4 border-[var(--bg-base)]">
            <Plus className={`w-6 h-6 transition-transform duration-300 ${isPlusMenuOpen ? 'rotate-45' : ''}`} />
          </div>
        </button>
        
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-transform duration-200 active:scale-95">
          <PieChart className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Análise</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-transform duration-200 active:scale-95">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Ajustes</span>
        </button>
      </nav>

      {/* ================================================== */}
      {/* EXPANSÃO CIRCULAR "+" (MOBILLS INSPIRED) */}
      {/* ================================================== */}
      {isPlusMenuOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-[var(--bg-base)]/90 backdrop-blur-md animate-wallet-expand" onClick={() => setIsPlusMenuOpen(false)} />
          
          <div className="absolute bottom-32 flex flex-col items-center gap-3 animate-explode z-50">
            {[
              { label: 'Nova Receita', color: 'bg-emerald-500', icon: ArrowUpRight, action: () => console.log('Receita') },
              { label: 'Nova Despesa', color: 'bg-rose-500', icon: ArrowDownRight, action: () => console.log('Despesa') },
              { label: 'Nova Transferência', color: 'bg-blue-500', icon: ArrowRightLeft, action: () => console.log('Transferência') },
              { label: 'Nova Carteira', color: 'bg-[#8B5CF6]', icon: Wallet, action: () => console.log('Carteira') },
              { label: 'Nova Meta', color: 'bg-amber-500', icon: Target, action: () => console.log('Meta') },
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setIsPlusMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-3 rounded-full bg-[var(--bg-surface)] border border-white/5 shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 text-sm font-semibold text-white w-52 outline-none"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white shrink-0`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* NAVEGAÇÃO DE ORBE EXCLUSIVA DESKTOP (ORBIT MENU CONSTELLATION) */}
      {/* ================================================== */}
      {viewport === 'desktop' && (
        <div className="fixed bottom-8 right-8 z-[50] hidden lg:block">
          
          {/* Constelação Orbitante de Itens */}
          {isOrbitOpen && (
            <div className="absolute inset-0 pointer-events-none">
              {[
                { label: 'Dashboard', icon: Home, style: { bottom: '200px', right: '10px' } },
                { label: 'Carteiras', icon: Wallet, style: { bottom: '150px', right: '90px' } },
                { label: 'Histórico', icon: History, style: { bottom: '90px', right: '160px' } },
                { label: 'Categorias', icon: PieChart, style: { bottom: '30px', right: '200px' } },
                { label: 'Ajustes', icon: Settings, style: { bottom: '-30px', right: '210px' } },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="absolute pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] border border-white/5 shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-semibold text-white w-40 animate-explode"
                  style={{ ...item.style, animationDelay: `${idx * 50}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#C4B5FD] shrink-0">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* O Orbe Principal */}
          <button
            onClick={() => setIsOrbitOpen(!isOrbitOpen)}
            className="w-16 h-16 rounded-full bg-glass border-glass flex items-center justify-center text-main hover:border-[#8B5CF6]/40 transition-all duration-300 shadow-premium outline-none relative overflow-hidden animate-pulse-slow"
            style={{
              boxShadow: '0 0 20px rgba(139,92,246,0.3), inset 0 0 15px rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#6D28D9]/20" />
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-transform duration-300 ${isOrbitOpen ? 'rotate-45' : ''}`}>
              <Plus className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      )}

      {/* ================================================== */}
      {/* COMMAND PALETTE / BUSCA INTELIGENTE */}
      {/* ================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-3xl p-6 shadow-2xl animate-wallet-expand flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">Busca Unificada</span>
              <button onClick={() => setIsSearchOpen(false)} className="text-zinc-500 hover:text-white transition-colors duration-200 outline-none">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Pesquise por transações, carteiras, categorias..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-11 bg-[var(--bg-base)] border border-[var(--border-subtle)] rounded-xl pl-10 pr-4 text-xs font-semibold text-white outline-none focus:border-[#8B5CF6]"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block px-1 mb-2">Exemplos de Busca</span>
              {['Transação Supermercado', 'Carteira Principal', 'Categoria Alimentação'].map((item, idx) => (
                <div key={idx} className="p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-[var(--border-subtle)] rounded-xl text-xs font-medium text-main cursor-pointer transition-colors duration-200 flex items-center justify-between">
                  <span>{item}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* OVERLAY DE EXPANSÃO DA CARTEIRA (Imersivo) */}
      {/* ================================================== */}
      {expandedWallet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Fundo Blur Animado */}
          <div 
            className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-xl transition-opacity duration-200 animate-wallet-expand" 
            onClick={() => setExpandedWallet(null)}
          />
          
          {/* Cartão Expandido (Ocupa ~80% da tela) */}
          <div 
            className="relative w-[90%] max-w-md h-[80%] max-h-[700px] rounded-[40px] p-8 flex flex-col justify-between shadow-2xl border border-white/10 animate-wallet-expand overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, var(--bg-surface), var(--bg-base))`,
              boxShadow: `0 30px 60px -15px ${expandedWallet.glow}`
            }}
          >
            {/* Fundo Glow Espalhado correspondente à cor da carteira */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${expandedWallet.color} opacity-10 blur-3xl rounded-full pointer-events-none`} />

            {/* Cabeçalho do Cartão Expandido */}
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">{expandedWallet.brand}</span>
                <h3 className="text-xl font-semibold text-main mt-1">{expandedWallet.name}</h3>
              </div>
              <button onClick={() => setExpandedWallet(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-200 outline-none">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Saldo Centralizado Imersivo */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">Saldo Atual</span>
              <span className="font-display text-5xl font-light text-main tracking-tighter tabular-nums text-center">
                {formatCurrency(expandedWallet.balance)}
              </span>
            </div>

            {/* Últimas Transações Limpas (Minimalistas) */}
            <div className="relative z-10 flex flex-col gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold mb-2">Últimas Movimentações</span>
              {expandedWallet.txs.map((tx) => {
                const isInc = tx.type === 'INCOME';
                const Icon = tx.icon;
                return (
                  <div key={tx.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isInc ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-main">{tx.title}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{tx.date}</span>
                      </div>
                    </div>
                    <span className={`font-display text-sm font-bold tabular-nums ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isInc ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}