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
  Activity,
  ShoppingCart,
  Car,
  Heart,
  Compass,
  RefreshCw,
  History,
  ArrowRightLeft,
  Fingerprint,
  X
} from 'lucide-react';
import Header from './components/Header/Header';
import { useThemeContext } from '../../context/ThemeContext';
import FinancialOverview from './components/FinancialOverview/FinancialOverview';

// ==========================================
// MOCKS VISUAIS (Sem Lógica de Negócio)
// ==========================================

const MOCK_WALLET_TRANSACTIONS = [
  { id: 'wt1', title: 'Starbucks', amount: 32.50, type: 'EXPENSE', date: 'Hoje', icon: Target },
  { id: 'wt2', title: 'Pix Recebido', amount: 150.00, type: 'INCOME', date: 'Ontem', icon: ArrowUpRight },
  { id: 'wt3', title: 'Uber', amount: 24.90, type: 'EXPENSE', date: '12 Jul', icon: ArrowDownRight },
  { id: 'wt4', title: 'Spotify', amount: 21.90, type: 'EXPENSE', date: '10 Jul', icon: Zap }
];

const MOCK_WALLETS = [
  { 
    id: 'w1', 
    name: 'Conta Principal', 
    brand: 'Nubank', 
    balance: 8340.00, 
    digits: '4521', 
    bg: 'linear-gradient(135deg, #830AD1 0%, #4D0678 100%)', 
    glow: 'rgba(130,10,209,0.4)',
    logo: () => <span className="font-display font-black text-2xl tracking-tighter text-white/95">nu</span>
  },
  { 
    id: 'w2', 
    name: 'Investimentos', 
    brand: 'Mercado Pago', 
    balance: 5580.00, 
    digits: '8847', 
    bg: 'linear-gradient(135deg, #009EE3 0%, #0B3C73 100%)', 
    glow: 'rgba(0,158,227,0.3)',
    logo: () => (
      <div className="flex flex-col items-start leading-none select-none">
        <span className="font-display font-extrabold text-[12px] tracking-tight text-white/90">mercado</span>
        <span className="font-display font-normal text-[10px] tracking-widest text-[#00E5FF]">pago</span>
      </div>
    )
  },
  { 
    id: 'w3', 
    name: 'Reserva de Emergência', 
    brand: 'Inter', 
    balance: 12500.00, 
    digits: '9087', 
    bg: 'linear-gradient(135deg, #FF7A00 0%, #D84F00 100%)', 
    glow: 'rgba(255,122,0,0.35)',
    logo: () => <span className="font-display font-extrabold text-lg tracking-tight text-white uppercase">inter</span>
  },
  { 
    id: 'w4', 
    name: 'Cartão Premium', 
    brand: 'Itaú Personnalité', 
    balance: 3500.00, 
    digits: '1234', 
    bg: 'linear-gradient(135deg, #EC7000 0%, #001C3D 100%)', 
    glow: 'rgba(236,112,0,0.25)',
    logo: () => (
      <div className="w-8 h-8 rounded-lg bg-[#001C3D] border border-[#EC7000] flex items-center justify-center font-display font-black text-xs text-[#EC7000]">
        Itaú
      </div>
    )
  },
  { 
    id: 'w5', 
    name: 'Wealth Management', 
    brand: 'BTG Pactual', 
    balance: 45000.00, 
    digits: '9911', 
    bg: 'linear-gradient(135deg, #09192C 0%, #15263D 100%)', 
    glow: 'rgba(21,38,61,0.5)',
    logo: () => <span className="font-display font-bold text-xs tracking-widest text-[#D4AF37] uppercase">btg pactual</span>
  }
];

const MOCK_TIMELINE = [
  { id: 't1', title: 'Salário Mensal', category: 'Renda', time: 'Hoje, 14:32', amount: 5200.00, type: 'INCOME', icon: Zap },
  { id: 't2', title: 'Aluguel Residencial', category: 'Moradia', time: 'Hoje, 09:15', amount: 1200.00, type: 'EXPENSE', icon: Home },
  { id: 't3', title: 'Supermercado', category: 'Alimentação', time: 'Ontem, 19:45', amount: 345.20, type: 'EXPENSE', icon: Target },
  { id: 't4', title: 'Rendimento', category: 'Investimentos', time: '08 Jul, 10:00', amount: 45.90, type: 'INCOME', icon: TrendingUp },
  { id: 't5', title: 'Transferência Pix', category: 'Serviços', time: '07 Jul, 16:20', amount: 150.00, type: 'EXPENSE', icon: ArrowUpRight },
];

const MOCK_CATEGORIES = [
  { id: 'c1', name: 'Alimentação', amount: 1450.00, percent: 35, icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500' },
  { id: 'c2', name: 'Moradia', amount: 1200.00, percent: 28, icon: Home, color: 'text-indigo-500', bg: 'bg-indigo-500/10', bar: 'bg-indigo-500' },
  { id: 'c3', name: 'Transporte', amount: 650.00, percent: 15, icon: Car, color: 'text-amber-500', bg: 'bg-amber-500/10', bar: 'bg-amber-500' },
  { id: 'c4', name: 'Saúde', amount: 450.00, percent: 10, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10', bar: 'bg-rose-500' },
  { id: 'c5', name: 'Assinaturas', amount: 250.00, percent: 6, icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10', bar: 'bg-purple-500' },
];

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

// ==========================================
// ARQUITETURA CSS E PERFORMANCE DE GPU
// ==========================================

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');

  /* ---------- THEMING ---------- */
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
    --dock-bg: rgba(17, 17, 19, 0.55);
    --dock-border: rgba(255, 255, 255, 0.06);
    --dock-glow: rgba(139, 92, 246, 0.15);
    --key-cap-bg: #1C1C1F;
    --drawer-bg: linear-gradient(180deg, rgba(17, 17, 19, 0.95) 0%, rgba(9, 9, 11, 0.95) 100%);
    --drawer-border: rgba(255, 255, 255, 0.04);
    --drawer-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7);
  }

  .theme-light {
    --bg-base: #FAFAFA;
    --bg-surface: #FFFFFF;
    --text-main: #09090B;
    --text-muted: #71717A;
    --border-subtle: rgba(139, 92, 246, 0.08);
    --border-strong: rgba(139, 92, 246, 0.15);
    --plasma-primary: rgba(124, 58, 237, 0.12);
    --plasma-income: rgba(16, 185, 129, 0.05);
    --plasma-expense: rgba(239, 68, 68, 0.03);
    --glass-bg: rgba(250, 250, 250, 0.7);
    --card-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.05);
    --dock-bg: rgba(255, 255, 255, 0.7);
    --dock-border: rgba(139, 92, 246, 0.06);
    --dock-glow: rgba(124, 58, 237, 0.08);
    --key-cap-bg: #E4E4E7;
    --drawer-bg: linear-gradient(180deg, rgba(243, 239, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
    --drawer-border: rgba(139, 92, 246, 0.12);
    --drawer-shadow: 0 30px 60px -15px rgba(139, 92, 246, 0.12);
  }

  /* ---------- BASE ---------- */
  body { font-family: 'Inter', sans-serif; background-color: var(--bg-base); color: var(--text-main); overflow-x: hidden; }
  .font-display { font-family: 'Outfit', sans-serif; }
  .bg-main { background-color: var(--bg-base); }
  .bg-surface { background-color: var(--bg-surface); }
  .bg-glass { background: var(--glass-bg); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
  .border-glass { border: 1px solid var(--border-subtle); }
  .text-main { color: var(--text-main); }
  .text-muted { color: var(--text-muted); }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* ---------- GPU OPTIMIZED ANIMATIONS ---------- */
  @keyframes plasma-flow {
    0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
    50% { transform: translate3d(2%, 4%, 0) scale(1.05) rotate(2deg); }
    100% { transform: translate3d(-2%, -2%, 0) scale(0.95) rotate(-2deg); }
  }
  .animate-plasma { 
    animation: plasma-flow 12s ease-in-out infinite alternate; 
    will-change: transform;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @keyframes wallet-expand {
    from { opacity: 0; transform: scale(0.95) translate3d(0, 20px, 0); }
    to { opacity: 1; transform: scale(1) translate3d(0, 0, 0); }
  }
  .animate-wallet-expand { animation: wallet-expand 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  /* ---------- WALLET CARDS HOVER SYSTEM ---------- */
  .wallet-card-desktop {
    transform: scale(var(--wallet-scale)) translateY(0) translateZ(0);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }
  .wallet-card-desktop:hover {
    transform: scale(var(--wallet-scale)) translateY(-64px) translateZ(0);
    z-index: 50 !important;
  }

  .wallet-indicator-desktop {
    transform: scale(var(--indicator-scale)) translateZ(0);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ---------- TACTILE DOCK & BEADS ---------- */
  .tactile-dock {
    background: var(--dock-bg);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid var(--dock-border);
    box-shadow: 0 4px 30px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.1);
    transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
  }
  .tactile-dock:hover {
    box-shadow: 0 12px 40px -5px var(--dock-glow), inset 0 1px 1px rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }

  .nav-organic-bead {
    position: relative;
    transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
  }
  .nav-organic-bead::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: radial-gradient(circle at center, rgba(139, 92, 246, 0.14) 0%, transparent 75%);
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: 0;
    pointer-events: none;
  }
  .nav-organic-bead:hover::before { opacity: 1; }

  .bead-active {
    background: rgba(139, 92, 246, 0.08);
    border: 1.5px solid rgba(139, 92, 246, 0.25);
    box-shadow: 0 4px 15px -3px rgba(139, 92, 246, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
  .theme-light .bead-active {
    background: rgba(139, 92, 246, 0.06);
    border-color: rgba(139, 92, 246, 0.18);
  }

  .pulsing-aura {
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
    animation: aura-pulse 3s infinite alternate;
  }
  @keyframes aura-pulse {
    0% { box-shadow: 0 0 8px rgba(139, 92, 246, 0.2); }
    100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
  }
`;

// Memoizado para evitar re-renderização de estilo
const ThemeStyles = React.memo(() => (
  <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
));

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function Dashboard() {
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('desktop');
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const [expandedWallet, setExpandedWallet] = useState<typeof MOCK_WALLETS[0] | null>(null);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (expandedWallet) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [expandedWallet]);

  const maxWalletsDesktop = 4;
  const visibleWallets = MOCK_WALLETS.slice(0, maxWalletsDesktop);
  const remainingWalletsCount = MOCK_WALLETS.length - maxWalletsDesktop;

	const { theme, setTheme } = useThemeContext();

  return (
    <div className={`theme-${theme} bg-main min-h-screen relative flex flex-row justify-center overflow-x-hidden selection:bg-[#8B5CF6]/30 transition-colors duration-500 w-full`}>
      <ThemeStyles />

      {/* TOOLBAR DE APRESENTAÇÃO */}
      <div className="fixed top-2 right-2 z-[60] flex bg-[#18181B] rounded-full border border-white/10 p-1 shadow-xl">
        <button onClick={() => setTheme('dark')} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-[#8B5CF6] text-white' : 'text-zinc-500'}`}><Moon className="w-4 h-4" /></button>
        <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-[#8B5CF6] text-white' : 'text-zinc-500'}`}><Sun className="w-4 h-4" /></button>
      </div>

      {/* BOTÃO ORBE FINANCEIRO FIXO (Desktop) */}
      <div className="hidden lg:flex fixed top-8 left-8 z-[55] items-center">
        <button 
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="relative w-12 h-12 rounded-full bg-glass border-glass shadow-[var(--card-shadow)] flex items-center justify-center group active:scale-95 transition-transform duration-300 ease-out"
        >
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#059669] opacity-80 group-hover:scale-105 transition-transform duration-300 ease-out" />
          <div className="absolute inset-2 rounded-full bg-[var(--bg-surface)] backdrop-blur-md flex items-center justify-center text-xs font-semibold text-white tracking-widest font-display shadow-inner">
            <span className="relative z-10 text-[10px] text-main group-hover:text-[#8B5CF6] transition-colors duration-300">F</span>
          </div>
          <div className="absolute -inset-1 border border-[#8B5CF6]/20 rounded-full animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-2 border border-white/5 rounded-full animate-[spin_12s_linear_infinite_reverse] border-dashed" />
        </button>
      </div>

      {/* DRAWER LATERAL INTELIGENTE DESKTOP */}
      <aside 
        className={`hidden lg:flex fixed top-0 left-0 h-full w-[280px] border-r backdrop-blur-3xl z-50 flex-col justify-between py-8 px-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--drawer-bg)',
          borderColor: 'var(--drawer-border)',
          boxShadow: 'var(--drawer-shadow)'
        }}
      >
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3 pl-2 mt-12 select-none">
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wide text-main">FinancePro</span>
              <span className="text-[9px] text-[#8B5CF6] tracking-widest uppercase font-bold opacity-75">SaaS Edition</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { idx: 0, label: 'Dashboard', icon: Activity },
              { idx: 1, label: 'Carteiras', icon: Wallet },
              { idx: 2, label: 'Histórico', icon: History },
              { idx: 3, label: 'Categorias', icon: PieChart },
              { idx: 4, label: 'Recorrências', icon: RefreshCw },
              { idx: 5, label: 'Metas', icon: Compass },
            ].map((link) => {
              const isActive = activeTab === link.idx;
              const Icon = link.icon;
              return (
                <button
                  key={link.idx}
                  onClick={() => {
                    setActiveTab(link.idx);
                    setIsDrawerOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-colors duration-300 relative ${
                    isActive 
                      ? 'bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-main' 
                      : 'text-[var(--text-muted)] hover:text-main hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-[#8B5CF6]" />}
                  <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-[#8B5CF6]' : 'text-[var(--text-muted)]'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-6 pl-2">
          <button className="flex items-center gap-4 text-sm font-semibold text-[var(--text-muted)] hover:text-main transition-colors px-2">
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </button>
          <div className="h-[1px] w-full bg-white/[0.04]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#8B5CF6]/80 via-transparent to-[#059669]/80 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-surface)]">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Perfil" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-main leading-tight">Arthur</span>
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Premium</span>
              </div>
            </div>
            <button className="tactile-dock w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-main relative">
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#8B5CF6] border border-[var(--bg-base)] pulsing-aura" />
            </button>
          </div>
        </div>
      </aside>

      {/* CONTAINER PRINCIPAL */}
      <div 
        className={`flex-1 w-full relative z-10 flex flex-col items-center transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu`}
        style={{ paddingLeft: isDrawerOpen && viewport !== 'mobile' ? '280px' : '0' }}
      >
        <div className={`w-full relative z-10 flex flex-col ${viewport === 'mobile' ? 'max-w-[400px] border-x border-[var(--border-subtle)] bg-main min-h-screen shadow-2xl' : 'max-w-[1440px]'}`}>
          
          <div className="relative w-full overflow-hidden pb-12 pt-8 lg:pt-16 px-6 lg:px-12 flex flex-col">
            
            {/* Plasma Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden isolate">
              <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[var(--plasma-primary)] blur-[100px] rounded-full animate-plasma mix-blend-screen" />
              <div className="absolute top-[20%] right-[-20%] w-[70%] h-[70%] bg-[var(--plasma-income)] blur-[100px] rounded-full animate-plasma mix-blend-screen" style={{ animationDelay: '-5s' }} />
            </div>

            <Header />

            {/* CARD PRINCIPAL */}
            <FinancialOverview />
          </div>

          <div className="px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 pb-32">

            {/* COLUNA ESQUERDA */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              
              {/* Ações Rápidas */}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                {[
                  { icon: ArrowUpRight, label: 'Receita', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { icon: ArrowDownRight, label: 'Despesa', color: 'text-rose-500', bg: 'bg-rose-500/10' },
                  { icon: ArrowRightLeft, label: 'Transferir', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                  { icon: Target, label: 'Metas', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
                ].map((action, i) => (
                  <button key={i} className="flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-[var(--bg-surface)] border border-transparent hover:border-glass hover:bg-[var(--border-subtle)] transition-[background-color,border-color,transform] duration-300 ease-out active:scale-95 group shadow-sm">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${action.bg} ${action.color} transition-transform duration-300 ease-out group-hover:scale-110`}>
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
                  <button className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest hover:text-[#7C3AED] transition-colors">Histórico</button>
                </div>

                <div className="flex flex-col gap-1">
                  {MOCK_TIMELINE.map((item) => {
                    const isInc = item.type === 'INCOME';
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="relative flex items-center gap-4 p-3 rounded-2xl hover:bg-[var(--bg-surface)] transition-[background-color,border-color] duration-300 ease-out group cursor-pointer border border-transparent hover:border-[var(--border-subtle)]">
                        <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-105 ${isInc ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="text-sm font-semibold text-main truncate">{item.title}</h4>
                          <span className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">{item.category} • {item.time}</span>
                        </div>
                        <div className="flex flex-col items-end justify-center shrink-0 pl-2">
                          <span className={`font-display text-sm lg:text-base font-medium tabular-nums ${isInc ? 'text-emerald-500' : 'text-main'}`}>
                            {isInc ? '+' : '−'}{formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Suas Carteiras</h3>
                  <Plus className="w-4 h-4 text-[#8B5CF6] cursor-pointer hover:scale-110 transition-transform" />
                </div>

                {/* Versão DESKTOP: Baseada em classes CSS Puras */}
                <div className="relative h-[330px] w-full select-none hidden lg:block">
                  {visibleWallets.map((wallet, index) => {
                    const LogoComponent = wallet.logo;
                    return (
                      <div 
                        key={wallet.id}
                        onClick={() => setExpandedWallet(wallet)}
                        className="absolute left-0 right-0 h-[160px] rounded-[24px] p-6 flex flex-col justify-between cursor-pointer border border-white/10 overflow-hidden wallet-card-desktop"
                        style={{ 
                          background: wallet.bg,
                          top: `${index * 42}px`, 
                          zIndex: 10 + index,
                          boxShadow: `0 -10px 40px -20px ${wallet.glow}`,
                          '--wallet-scale': 1 - (visibleWallets.length - 1 - index) * 0.025,
                        } as React.CSSProperties}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12] pointer-events-none rounded-[24px]" />
                        <div className="absolute top-0 left-[-50%] w-[120%] h-[30%] bg-white/[0.03] rotate-[35deg] transform translate-y-[-50%] pointer-events-none" />
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{wallet.brand}</span>
                            <h5 className="text-sm font-semibold text-white mt-1">{wallet.name}</h5>
                          </div>
                          <div className="opacity-90"><LogoComponent /></div>
                        </div>

                        <div className="flex justify-between items-end relative z-10">
                          <div className="w-7 h-5 rounded bg-gradient-to-r from-amber-400/30 to-yellow-500/10 border border-amber-300/20 relative overflow-hidden flex items-center justify-center shadow-inner">
                            <div className="absolute w-[1px] h-full bg-amber-300/20 left-1/3" />
                            <div className="absolute w-[1px] h-full bg-amber-300/20 left-2/3" />
                            <div className="absolute h-[1px] w-full bg-amber-300/20 top-1/2" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-mono text-[10px] text-white/50 tracking-widest mb-1">•••• {wallet.digits}</span>
                            <span className="font-display text-xl font-bold text-white tabular-nums">{formatCurrency(wallet.balance)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Indicador Desktop */}
                  {remainingWalletsCount > 0 && (
                    <div 
                      className="absolute left-0 right-0 h-[56px] rounded-[24px] px-6 flex items-center justify-between border border-[var(--border-subtle)] bg-glass backdrop-blur-md transition-shadow duration-300 hover:shadow-md cursor-default wallet-indicator-desktop"
                      style={{ 
                        top: `${visibleWallets.length * 42 + 20}px`,
                        zIndex: 9,
                        '--indicator-scale': 1 - (visibleWallets.length) * 0.025,
                      } as React.CSSProperties}
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Mais carteiras ativas no sistema</span>
                      </div>
                      <span className="font-display text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                        +{remainingWalletsCount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Versão MOBILE */}
                <div className="flex flex-col gap-4 w-full lg:hidden">
                  {visibleWallets.map((wallet) => {
                    const LogoComponent = wallet.logo;
                    return (
                      <div 
                        key={wallet.id}
                        onClick={() => setExpandedWallet(wallet)}
                        className="w-full h-[160px] rounded-[24px] p-6 flex flex-col justify-between cursor-pointer border border-white/10 relative overflow-hidden transition-transform duration-300 ease-out active:scale-[0.98]"
                        style={{ background: wallet.bg, boxShadow: `0 10px 30px -15px ${wallet.glow}` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12] pointer-events-none rounded-[24px]" />
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{wallet.brand}</span>
                            <h5 className="text-sm font-semibold text-white mt-1">{wallet.name}</h5>
                          </div>
                          <LogoComponent />
                        </div>

                        <div className="flex justify-between items-end relative z-10">
                          <div className="w-7 h-5 rounded bg-gradient-to-r from-amber-400/30 to-yellow-500/10 border border-amber-300/20 relative overflow-hidden flex items-center justify-center shadow-inner">
                            <div className="absolute w-[1px] h-full bg-amber-300/20 left-1/3" />
                            <div className="absolute w-[1px] h-full bg-amber-300/20 left-2/3" />
                            <div className="absolute h-[1px] w-full bg-amber-300/20 top-1/2" />
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-mono text-[10px] text-white/50 tracking-widest mb-1">•••• {wallet.digits}</span>
                            <span className="font-display text-xl font-bold text-white tabular-nums">{formatCurrency(wallet.balance)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {remainingWalletsCount > 0 && (
                    <div className="w-full p-4 rounded-[20px] bg-glass border border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-xs font-semibold text-[var(--text-muted)]">Mais carteiras adicionadas</span>
                      </div>
                      <span className="font-display text-xs font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                        +{remainingWalletsCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Despesas por Categoria */}
              <div className="flex flex-col gap-5 mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Despesas por Categoria</h3>
                  <button className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-widest hover:text-[#7C3AED] transition-colors">Ver Relatório</button>
                </div>

                <div className="flex flex-col gap-4">
                  {MOCK_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="relative p-4 rounded-[24px] bg-glass border-glass overflow-hidden group transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer">
                      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full transition-opacity duration-300 ease-out group-hover:opacity-25 ${cat.bg.replace('/10', '')}`} />
                      
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-inner ${cat.bg} ${cat.color} transition-transform duration-300 ease-out group-hover:scale-110`}>
                              <cat.icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h5 className="text-sm font-semibold text-main mb-0.5">{cat.name}</h5>
                              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium">{cat.percent}% do total</span>
                            </div>
                          </div>
                          <span className="font-display text-base font-medium text-main tabular-nums">{formatCurrency(cat.amount)}</span>
                        </div>
                        
                        <div className="w-full h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${cat.bar} transition-[width] duration-1000 ease-out`}
                            style={{ width: `${cat.percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights Card */}
              <div className="relative overflow-hidden rounded-[24px] p-6 bg-glass border-glass shadow-[var(--shadow-soft)] group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl rounded-full transition-colors duration-300 ease-out group-hover:bg-[#8B5CF6]/20" />
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
      </div>

      {/* BOTTOM NAVIGATION (Mobile App Feel) */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 h-24 bg-glass border-t border-[var(--border-subtle)] flex items-center justify-around px-6 pb-4 transition-transform duration-500 ${isFabOpen ? 'z-[120]' : 'z-40'} ${viewport === 'mobile' ? 'max-w-[400px] left-1/2 -translate-x-1/2 rounded-b-[48px]' : ''}`}>
        <button className="flex flex-col items-center gap-1.5 text-[#8B5CF6] transition-transform active:scale-95">
          <Home className="w-6 h-6" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold tracking-wide">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-main transition-transform active:scale-95">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Carteiras</span>
        </button>
        
        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={`relative flex flex-col items-center justify-center -mt-8 transition-transform duration-500 active:scale-95 z-[110] ${isFabOpen ? 'rotate-[135deg]' : 'rotate-0'}`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white border-4 border-[var(--bg-base)] transition-colors duration-500 ${isFabOpen ? 'bg-rose-500 shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] shadow-[0_4px_20px_rgba(139,92,246,0.4)]'}`}>
            <Plus className="w-6 h-6" />
          </div>
        </button>

        <button className="flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-main transition-transform active:scale-95">
          <PieChart className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Análise</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-[var(--text-muted)] hover:text-main transition-transform active:scale-95">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-wide">Ajustes</span>
        </button>
      </nav>

      {/* MENU RADIAL MOBILE (Estilo Mobills) */}
      <div className={`lg:hidden fixed inset-0 z-[100] flex items-end justify-center pointer-events-none`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 pointer-events-auto ${isFabOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
          onClick={() => setIsFabOpen(false)}
        />
        
        <div 
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--bg-surface)] rounded-full transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center ${isFabOpen ? 'scale-[45] opacity-100 shadow-2xl' : 'scale-100 opacity-0'}`} 
        />

        <div className={`relative z-10 w-full max-w-[320px] pb-36 flex flex-col gap-4 pointer-events-auto transition-opacity duration-500 ${isFabOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
           {[
             { icon: ArrowUpRight, label: 'Nova Receita', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
             { icon: ArrowDownRight, label: 'Nova Despesa', color: 'text-rose-500', bg: 'bg-rose-500/10' },
             { icon: ArrowRightLeft, label: 'Transferência', color: 'text-blue-500', bg: 'bg-blue-500/10' },
             { icon: Wallet, label: 'Nova Carteira', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10' },
           ].map((action, i) => (
              <button 
                key={i}
                onClick={() => setIsFabOpen(false)}
                className={`flex items-center justify-between p-4 rounded-3xl bg-[var(--bg-base)] border border-[var(--border-subtle)] shadow-xl transition-all duration-500 hover:border-[#8B5CF6]/30 active:scale-95 group ${isFabOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                style={{ transitionDelay: isFabOpen ? `${100 + (3 - i) * 60}ms` : '0ms' }}
              >
                <span className="font-semibold text-main text-sm ml-2">{action.label}</span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${action.bg} ${action.color} transition-transform group-hover:scale-110`}>
                  <action.icon className="w-5 h-5" />
                </div>
              </button>
           ))}
        </div>
      </div>

      {/* OVERLAY DE EXPANSÃO DA CARTEIRA (Imersivo) */}
      {expandedWallet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-[var(--bg-base)]/80 backdrop-blur-xl transition-opacity animate-wallet-expand" 
            onClick={() => setExpandedWallet(null)}
          />
          
          <div 
            className="relative w-[90%] max-w-md h-[80%] max-h-[700px] rounded-[40px] p-8 flex flex-col justify-between shadow-2xl border border-white/10 animate-wallet-expand overflow-hidden"
            style={{ 
              background: expandedWallet.bg,
              boxShadow: `0 30px 60px -15px ${expandedWallet.glow}`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none rounded-[40px]" />

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-white/60 font-bold">{expandedWallet.brand}</span>
                <h3 className="text-xl font-semibold text-white mt-1">{expandedWallet.name}</h3>
              </div>
              <button onClick={() => setExpandedWallet(null)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8">
              <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold mb-2">Saldo Atual</span>
              <span className="font-display text-4xl font-bold text-white tabular-nums tracking-tighter">
                {formatCurrency(expandedWallet.balance)}
              </span>
            </div>
            
            <div className="relative z-10 font-mono text-center text-sm text-white/55 tracking-[0.2em] mb-4">
              •••• •••• •••• {expandedWallet.digits}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;