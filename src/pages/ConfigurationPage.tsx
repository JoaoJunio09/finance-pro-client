import React, { useState } from 'react';
import { 
  LayoutGrid, 
  RefreshCw, 
  Settings as SettingsIcon,
  Menu,
  X,
  User,
  ShieldCheck,
  EyeOff,
  Palette,
  Accessibility,
  Bell,
  Sparkles,
  CreditCard,
  Receipt,
  Blocks,
  Webhook,
  Database,
  Info,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  Crown,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

// ==========================================
// 1. ESTILOS GLOBAIS E TIPOGRAFIA
// ==========================================

const GlobalStyles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" />
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .animate-slide-up { animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      .card-premium {
        background: linear-gradient(135deg, #111113 0%, #151518 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
      }
    `}} />
  </>
);

// ==========================================
// 2. MOCK DATA (Isolado e Simples)
// ==========================================

const MOCK_USER = {
  name: "João Junio",
  username: "@joaojuniodev",
  email: "hello@joaojunio.dev",
  phone: "+55 11 99999-9999",
  avatar: "https://github.com/joaojuniodev.png",
  plan: "Premium",
  status: "Ativo",
  createdAt: "Novembro de 2024"
};

const MOCK_PLAN = {
  name: "FinancePro Premium",
  price: "R$ 49,90/mês",
  nextBilling: "15 de Agosto de 2026",
  usage: 42, // porcentagem
  limits: "Ilimitado",
};

// ==========================================
// 3. COMPONENTES DE LAYOUT (SIDEBAR & NAV)
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
          <button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group"><RefreshCw className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-['Inter'] font-medium">Recorrências</span></button>
          <button className="h-12 w-full rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center px-4 transition-all"><SettingsIcon className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-['Inter'] font-medium">Configurações</span></button>
        </nav>
      </div>
    </aside>
  </>
);

const MobileNav = ({ setIsOpen }: { setIsOpen: (v: boolean) => void }) => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.05] flex justify-around items-center py-5 px-6 z-40 safe-area-bottom">
    <button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2"><Menu className="w-6 h-6" /></button>
    <button className="text-zinc-500 hover:text-zinc-200 transition-colors p-2"><LayoutGrid className="w-6 h-6" /></button>
    <button className="text-[#8B5CF6] p-2"><SettingsIcon className="w-6 h-6" /></button>
  </nav>
);

// ==========================================
// 4. COMPONENTES DE CONFIGURAÇÃO
// ==========================================

const SettingsHeader = () => (
  <div className="w-full card-premium rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden animate-slide-up">
    {/* Decoração sutil de fundo */}
    <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-3xl pointer-events-none" />

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 w-full lg:w-auto">
      <div className="relative">
        <img 
          src={MOCK_USER.avatar} 
          alt={MOCK_USER.name} 
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-[20px] object-cover border border-white/[0.1] shadow-xl"
        />
        <div className="absolute -bottom-2 -right-2 bg-[#111113] p-1 rounded-lg">
          <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-md border border-emerald-500/20" title="Conta Ativa">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-white tracking-tight">{MOCK_USER.name}</h1>
          <span className="px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#C4B5FD] text-[10px] font-['Inter'] font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <Crown className="w-3 h-3" /> {MOCK_USER.plan}
          </span>
        </div>
        <p className="font-['Inter'] text-zinc-400 text-sm">{MOCK_USER.username}</p>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 font-['Inter'] text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {MOCK_USER.email}</span>
          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {MOCK_USER.phone}</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {MOCK_USER.createdAt}</span>
        </div>
      </div>
    </div>

    <div className="relative z-10 w-full lg:w-auto flex shrink-0">
      <button className="w-full lg:w-auto px-6 py-3.5 rounded-xl font-['Inter'] text-sm font-semibold text-white transition-all active:scale-[0.98] outline-none hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', boxShadow: '0 4px 14px rgba(124,58,237,0.25)' }}>
        Editar Perfil
      </button>
    </div>
  </div>
);

const PlanCard = () => (
  <div className="col-span-1 md:col-span-2 xl:col-span-3 w-full bg-[#111113] border border-[#8B5CF6]/20 rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-8 relative overflow-hidden shadow-2xl group animate-slide-up" style={{ animationDelay: '100ms' }}>
    {/* Gradiente de fundo do plano premium */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent pointer-events-none" />
    
    <div className="flex flex-col flex-1 relative z-10">
      <div className="flex items-center gap-3 mb-2">
        <Crown className="w-5 h-5 text-[#8B5CF6]" />
        <h3 className="font-['Outfit'] text-xl font-semibold text-white tracking-tight">Assinatura Ativa</h3>
      </div>
      <p className="font-['Inter'] text-sm text-zinc-400 mb-6 max-w-xl">
        Você está no plano <strong className="text-white">{MOCK_PLAN.name}</strong>. Aproveite todos os recursos avançados e limites expandidos da plataforma.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
        <div>
          <span className="block font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Valor</span>
          <span className="block font-['Outfit'] text-lg font-medium text-white">{MOCK_PLAN.price}</span>
        </div>
        <div>
          <span className="block font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Próxima Cobrança</span>
          <span className="block font-['Outfit'] text-lg font-medium text-white">{MOCK_PLAN.nextBilling}</span>
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div className="flex justify-between items-end mb-2">
            <span className="block font-['Inter'] text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Uso do Plano</span>
            <span className="block font-['Outfit'] text-xs font-semibold text-[#8B5CF6]">{MOCK_PLAN.usage}%</span>
          </div>
          <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full" style={{ width: `${MOCK_PLAN.usage}%` }} />
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 relative z-10 justify-center">
      <button className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors font-['Inter'] text-sm font-medium text-white outline-none">
        Comparar Planos
      </button>
      <button className="px-5 py-3 rounded-xl bg-transparent border border-transparent hover:bg-white/[0.02] transition-colors font-['Inter'] text-sm font-medium text-zinc-400 hover:text-white outline-none flex items-center justify-center sm:justify-start lg:justify-center gap-2">
        <Receipt className="w-4 h-4" /> Histórico
      </button>
    </div>
  </div>
);

const SettingsCard = ({ 
  icon: Icon, 
  title, 
  description, 
  items, 
  delay 
}: { 
  icon: any, title: string, description: string, items: string[], delay: string 
}) => (
  <div 
    className="group flex flex-col bg-[#111113] hover:bg-[#151518] border border-white/[0.06] hover:border-white/[0.12] rounded-[24px] p-6 sm:p-8 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl animate-slide-up hover:-translate-y-1"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center justify-between mb-5">
      <div className="w-12 h-12 rounded-[14px] bg-white/[0.02] border border-white/[0.05] group-hover:border-[#8B5CF6]/30 group-hover:bg-[#8B5CF6]/10 flex items-center justify-center transition-colors duration-300">
        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#8B5CF6] transition-colors duration-300" />
      </div>
      <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center transition-all duration-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
        <ArrowRight className="w-4 h-4 text-zinc-500" />
      </div>
    </div>
    
    <h3 className="font-['Outfit'] text-lg font-semibold text-white mb-2 tracking-tight group-hover:text-[#8B5CF6] transition-colors">{title}</h3>
    <p className="font-['Inter'] text-sm text-zinc-500 mb-6 flex-1 line-clamp-2">{description}</p>
    
    <div className="pt-5 border-t border-white/[0.04]">
      <p className="font-['Inter'] text-xs font-medium text-zinc-600 truncate leading-relaxed">
        {items.join(' • ')}
      </p>
    </div>
  </div>
);

const DangerZone = () => (
  <div className="w-full bg-[#111113] border border-rose-500/20 rounded-[24px] p-6 sm:p-8 mt-4 relative overflow-hidden animate-slide-up" style={{ animationDelay: '500ms' }}>
    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
    
    <div className="flex items-center gap-3 mb-6 relative z-10">
      <ShieldAlert className="w-5 h-5 text-rose-500" />
      <h3 className="font-['Outfit'] text-lg font-semibold text-rose-500 tracking-tight">Zona de Perigo</h3>
    </div>
    
    <p className="font-['Inter'] text-sm text-zinc-400 mb-8 max-w-3xl relative z-10">
      Ações executadas nesta seção são irreversíveis. Tenha certeza absoluta antes de prosseguir com o encerramento do plano ou exclusão de dados pessoais do sistema.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
      <button className="px-5 py-4 rounded-xl bg-[#09090B] border border-white/[0.06] hover:border-rose-500/30 hover:bg-rose-500/5 transition-colors font-['Inter'] text-sm font-medium text-zinc-300 hover:text-rose-400 text-left flex items-center justify-between group outline-none">
        <span>Desativar conta</span>
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <button className="px-5 py-4 rounded-xl bg-[#09090B] border border-white/[0.06] hover:border-rose-500/30 hover:bg-rose-500/5 transition-colors font-['Inter'] text-sm font-medium text-zinc-300 hover:text-rose-400 text-left flex items-center justify-between group outline-none">
        <span>Cancelar assinatura</span>
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
      <button className="px-5 py-4 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors font-['Inter'] text-sm font-semibold text-rose-500 text-left flex items-center justify-between group outline-none">
        <span>Excluir conta definitivamente</span>
        <LogOut className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  </div>
);

// ==========================================
// 5. CONFIGURAÇÕES DOS BLOCOS (MOCK)
// ==========================================

const SETTINGS_CATEGORIES = [
  {
    id: 'profile',
    title: 'Perfil',
    description: 'Gerencie suas informações pessoais, contatos e dados de recuperação.',
    icon: User,
    items: ['Nome', 'Username', 'Foto', 'Email', 'Telefone']
  },
  {
    id: 'security',
    title: 'Segurança',
    description: 'Proteja sua conta com autenticação em duas etapas e monitoramento de sessões.',
    icon: ShieldCheck,
    items: ['Senha', '2FA', 'Sessões ativas', 'Dispositivos', 'Histórico']
  },
  {
    id: 'privacy',
    title: 'Privacidade',
    description: 'Controle como seus dados são utilizados, exportados e compartilhados.',
    icon: EyeOff,
    items: ['Compartilhamento', 'Exportar dados', 'Exclusão', 'Permissões']
  },
  {
    id: 'appearance',
    title: 'Aparência',
    description: 'Personalize o tema, a paleta de cores e o comportamento das animações.',
    icon: Palette,
    items: ['Tema Dark/Light', 'Paleta', 'Redução de movimento']
  },
  {
    id: 'accessibility',
    title: 'Acessibilidade',
    description: 'Adapte a interface para melhor legibilidade, contraste e navegação.',
    icon: Accessibility,
    items: ['Contraste', 'Tamanho da fonte', 'Espaçamento', 'Leitor de tela']
  },
  {
    id: 'notifications',
    title: 'Notificações',
    description: 'Escolha exatamente quando e como deseja ser notificado pelo Avora.',
    icon: Bell,
    items: ['Email', 'Push', 'Alertas financeiros', 'Orçamentos']
  },
  {
    id: 'ai',
    title: 'Avora AI',
    description: 'Configure as preferências e o escopo de atuação do seu assistente inteligente.',
    icon: Sparkles,
    items: ['Nível de autonomia', 'Categorização', 'Insights proativos']
  },
  {
    id: 'billing',
    title: 'Cobrança',
    description: 'Gerencie cartões, visualize faturas e histórico completo de pagamentos.',
    icon: CreditCard,
    items: ['Métodos de pagamento', 'Última cobrança', 'Notas Fiscais']
  },
  {
    id: 'integrations',
    title: 'Integrações',
    description: 'Conecte sua conta com Google, Apple, Open Banking e outros serviços.',
    icon: Blocks,
    items: ['Open Banking', 'Pix', 'Google', 'Apple', 'Microsoft']
  },
  {
    id: 'api',
    title: 'API & Desenvolvedores',
    description: 'Gere chaves de API, configure webhooks e tokens de integração.',
    icon: Webhook,
    items: ['API Keys', 'Webhooks', 'Tokens de acesso', 'Logs']
  },
  {
    id: 'data',
    title: 'Dados e Backup',
    description: 'Gerencie rotinas de backup, sincronização e importação de planilhas.',
    icon: Database,
    items: ['Exportar', 'Importar CSV', 'Backup Automático', 'Sync']
  },
  {
    id: 'about',
    title: 'Sobre',
    description: 'Informações do sistema, versões, licenças e canais de atendimento.',
    icon: Info,
    items: ['Versão', 'Licença', 'Termos', 'Suporte Técnico']
  }
];

// ==========================================
// 6. PÁGINA PRINCIPAL DE CONFIGURAÇÕES
// ==========================================

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#09090B] font-['Inter'] text-white pb-20 relative overflow-x-hidden">
      <GlobalStyles />
      
      {/* Gradiente Radial de Fundo Global */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px]"
          style={{ background: 'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.08) 0%, rgba(9, 9, 11, 0) 60%)' }}
        />
      </div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 w-full min-w-0 flex flex-col relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col gap-[28px] w-full">
          
          {/* TÍTULO DA PÁGINA */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px] mb-[8px] animate-slide-up">
            <div>
              <h1 className="font-['Outfit'] text-[24px] md:text-[28px] font-bold text-[#FFFFFF] tracking-tight">Configurações</h1>
              <p className="font-['Inter'] text-[14px] text-zinc-500 mt-[2px]">Gerencie sua conta, assinatura e preferências do sistema.</p>
            </div>
          </div>

          {/* HEADER DO USUÁRIO */}
          <SettingsHeader />

          {/* GRID DE CONFIGURAÇÕES E PLANO */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <PlanCard />
            
            {SETTINGS_CATEGORIES.map((category, index) => (
              <SettingsCard 
                key={category.id}
                icon={category.icon}
                title={category.title}
                description={category.description}
                items={category.items}
                delay={`${150 + (index * 50)}ms`}
              />
            ))}
          </div>

          {/* ZONA DE PERIGO */}
          <DangerZone />

        </div>
      </main>

      <MobileNav setIsOpen={setIsSidebarOpen} />
    </div>
  );
}