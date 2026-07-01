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
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  AlignLeft,
  Tag,
  ChevronDown,
  Repeat
} from 'lucide-react';

// --- Tipagens Preparadas para Integração via API ---
type TransactionStatus = 'completed' | 'future';
type TransactionType = 'in' | 'out';

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  day: number; 
  time?: string;
  type: TransactionType;
  status: TransactionStatus;
  wallet: string;
  icon: React.ElementType;
}

// --- Dados de Mock ---
const CURRENT_DAY = 15;
const REAL_CURRENT_MONTH = 6; // Julho (0-indexed)
const REAL_CURRENT_YEAR = 2026;

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salário Mensal', category: 'Renda Principal', amount: 5100.00, day: 5, time: '09:00', type: 'in', status: 'completed', wallet: 'Itaú', icon: Briefcase },
  { id: '2', description: 'Aluguel Residencial', category: 'Moradia', amount: 1200.00, day: 8, time: '10:00', type: 'out', status: 'completed', wallet: 'Itaú', icon: Settings },
  { id: '3', description: 'Netflix Premium', category: 'Entretenimento', amount: 59.00, day: 10, time: '08:12', type: 'out', status: 'completed', wallet: 'NuBank', icon: Coffee },
  { id: '4', description: 'Almoço Restaurante', category: 'Alimentação', amount: 45.00, day: 10, time: '12:45', type: 'out', status: 'completed', wallet: 'Cartão Black', icon: ShoppingBag },
  { id: '5', description: 'Supermercado Mensal', category: 'Alimentação', amount: 850.00, day: 12, time: '18:20', type: 'out', status: 'completed', wallet: 'Cartão Black', icon: ShoppingBag },
  { id: '6', description: 'Trabalho Freelance', category: 'Renda Extra', amount: 1450.00, day: 18, type: 'in', status: 'future', wallet: 'NuBank', icon: Sparkles },
  { id: '7', description: 'Seguro Automóvel', category: 'Transporte', amount: 180.00, day: 20, type: 'out', status: 'future', wallet: 'Cartão Black', icon: Car },
  { id: '8', description: 'Adobe Creative Cloud', category: 'Assinatura', amount: 124.00, day: 24, type: 'out', status: 'future', wallet: 'Cartão Black', icon: Sparkles },
  { id: '9', description: 'Energia Elétrica', category: 'Contas', amount: 210.00, day: 25, type: 'out', status: 'future', wallet: 'Itaú', icon: Settings },
  { id: '10', description: 'Rendimento Investimentos', category: 'Investimentos', amount: 320.00, day: 30, type: 'in', status: 'future', wallet: 'Inter', icon: ArrowUpRight },
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

// --- Main App Component ---
function Activities() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, type: 'in'|'out', date: string}>({ isOpen: false, type: 'in', date: '' });

  // Estado da Paginação / Navegação de Mês
  const [activeMonth, setActiveMonth] = useState(REAL_CURRENT_MONTH);
  const [activeYear, setActiveYear] = useState(REAL_CURRENT_YEAR);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // Simulação de chamada de API ao mudar de mês
  useEffect(() => {
    // Aqui aconteceria um `await api.get(/transactions?month=${activeMonth}&year=${activeYear})`
    // Para o ambiente de simulação, exibiremos MOCK_TRANSACTIONS se for o mês corrente, 
    // ou uma lista vazia/simulada caso seja outro mês.
    if (activeMonth === REAL_CURRENT_MONTH && activeYear === REAL_CURRENT_YEAR) {
      setTransactionsData(MOCK_TRANSACTIONS);
    } else {
      setTransactionsData([]); // Sem transações em meses anteriores/futuros na simulação
    }
    setSelectedDay(null); // Reseta a seleção ao trocar de página
  }, [activeMonth, activeYear]);

  const handlePrevMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(y => y - 1);
    } else {
      setActiveMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(y => y + 1);
    } else {
      setActiveMonth(m => m + 1);
    }
  };

  // Cálculo de Geometria e Dados do Calendário Baseado no Mês Ativo
  const calendarDays = useMemo(() => {
    const days = [];
    const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
    // getDay() retorna 0 (Dom) a 6 (Sab). Subtraímos 1 para semana começar na Segunda, mas como
    // os headers são Dom, Seg, Ter... então getDay() nos dá o offset direto na grade (0 a 6).
    const firstDayOffset = new Date(activeYear, activeMonth, 1).getDay(); 

    const totalCells = Math.ceil((daysInMonth + firstDayOffset) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOffset || i >= daysInMonth + firstDayOffset) {
        days.push({ day: null, transactions: [] });
      } else {
        const dayNumber = i - firstDayOffset + 1;
        const dayTxs = transactionsData.filter(tx => tx.day === dayNumber);
        
        let inTotal = 0, outTotal = 0, futureTotal = 0;
        dayTxs.forEach(tx => {
          if (tx.status === 'future') {
            futureTotal += tx.amount;
          } else {
            if (tx.type === 'in') {
              inTotal += tx.amount;
            } else {
              outTotal += tx.amount;
            }
          }
        });

        days.push({
          day: dayNumber,
          transactions: dayTxs,
          inTotal,
          outTotal,
          futureTotal
        });
      }
    }
    return days;
  }, [activeMonth, activeYear, transactionsData]);

  // Abertura Segura do Modal
  const handleOpenModal = (e: React.MouseEvent, type: 'in'|'out', day: number) => {
    e.stopPropagation(); // Impede evento de abrir o Drawer
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = (activeMonth + 1) < 10 ? `0${activeMonth + 1}` : `${activeMonth + 1}`;
    setModalConfig({ isOpen: true, type, date: `${formattedDay}/${formattedMonth}/${activeYear}` });
  };

  // Encontra dados do dia selecionado
  const selectedDayInfo = useMemo(() => {
    if (!selectedDay) return null;
    return calendarDays.find(d => d.day === selectedDay);
  }, [selectedDay, calendarDays]);

  const isCurrentMonthView = activeMonth === REAL_CURRENT_MONTH && activeYear === REAL_CURRENT_YEAR;

  return (
    <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 relative z-10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col flex-1">
        
        {/* Apresentação Estratégica Humana (Substitui Header Antigo) */}
        <section className="animate-slide-up flex flex-col items-center text-center w-full mb-10 mt-2">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
            Atividades <span className="font-semibold text-[#8B5CF6]">Recentes</span>
          </h1>
          <p className="text-zinc-500 font-light text-sm md:text-base max-w-[65ch] leading-relaxed mb-8">
            Acompanhe todas as movimentações do mês em um único lugar. Visualize receitas, despesas e recorrências de forma simples, organizada e intuitiva.
          </p>

          {/* Paginação do Calendário */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-4 sm:gap-6 bg-[#111113]/50 border border-white/[0.04] p-1.5 rounded-full backdrop-blur-sm">
              <button 
                onClick={handlePrevMonth}
                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-white min-w-[140px] text-center">
                {MONTHS[activeMonth]} de {activeYear}
              </h2>
              <button 
                onClick={handleNextMonth}
                className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <span className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-2">
              {isCurrentMonthView ? 'Movimentações do mês atual' : 'Mês arquivado'}
            </span>
          </div>
        </section>

        {/* Calendário Premium (100% Responsivo, sem scroll horizontal em telas menores) */}
        <div className="w-full flex flex-col min-w-0 animate-slide-up delay-100 flex-1 mb-16">
          <div className="w-full border border-white/[0.06] rounded-2xl sm:rounded-[32px] overflow-hidden bg-[#0e0e11]/80 backdrop-blur-xl shadow-2xl flex flex-col">
            
            {/* Headers de Semana */}
            <div className="grid grid-cols-7 border-b border-white/[0.06] bg-[#111113]/80 text-center py-3 sm:py-4 font-semibold text-zinc-400 text-[10px] sm:text-xs tracking-wider uppercase">
              <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div>
            </div>

            {/* Grid de Dias */}
            <div className="grid grid-cols-7 bg-white/[0.04] gap-[1px]">
              {calendarDays.map((item, idx) => {
                if (!item.day) {
                  return <div key={`empty-${idx}`} className="bg-[#09090B] min-h-[60px] sm:min-h-[120px] md:min-h-[140px] opacity-40"></div>;
                }

                const isToday = isCurrentMonthView && item.day === CURRENT_DAY;
                const hasFuture = (item.futureTotal ? item.futureTotal > 0 : false);
                const isSelected = selectedDay === item.day;

                return (
                  <div
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`
                      relative flex flex-col p-1 sm:p-2.5 md:p-4 min-h-[70px] sm:min-h-[120px] md:min-h-[140px] bg-[#09090B] 
                      transition-all duration-300 cursor-pointer group hover:bg-[#111113] hover:z-10
                      ${isSelected ? 'ring-2 ring-inset ring-[#8B5CF6] z-10 bg-[#111113]' : ''}
                    `}
                  >
                    {/* Destaque sutil Amarelo para Recorrências Futuras */}
                    {hasFuture ? <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500/40"></div> : null}

                    {/* Header da Célula: Dia */}
                    <div className="flex items-start justify-between w-full relative z-10">
                      <div className={`
                        flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[10px] sm:text-xs md:text-sm font-medium
                        ${isToday ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-zinc-400 group-hover:text-zinc-200'}
                      `}>
                        {item.day}
                      </div>
                      
                      {/* Status Dots (Mobile Only) */}
                      <div className="flex sm:hidden flex-wrap items-center justify-end gap-0.5 max-w-[20px] mt-1 mr-1">
                        {(item.inTotal || 0) > 0 ? <div className="w-1 h-1 rounded-full bg-emerald-500"></div> : null}
                        {(item.outTotal || 0) > 0 ? <div className="w-1 h-1 rounded-full bg-rose-500"></div> : null}
                        {hasFuture ? <div className="w-1 h-1 rounded-full bg-amber-500"></div> : null}
                      </div>
                    </div>

                    {/* Conteúdo Desktop/Tablet */}
                    <div className="hidden sm:flex flex-col gap-1 flex-1 w-full min-w-0 mt-2">
                      {item.transactions.slice(0, 2).map(tx => (
                        <div key={tx.id} className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-zinc-400 truncate">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 
                            ${tx.status === 'future' ? 'bg-amber-500' : tx.type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                          />
                          <span className={`truncate font-medium ${tx.status === 'future' ? 'text-amber-500/80' : 'text-zinc-300'}`}>
                            {tx.description}
                          </span>
                        </div>
                      ))}
                      {item.transactions.length > 2 ? (
                        <div className="text-[9px] md:text-[10px] text-[#8B5CF6] font-semibold pl-3 mt-0.5">
                          +{item.transactions.length - 2} mais
                        </div>
                      ) : null}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Legenda do Calendário */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-[10px] sm:text-xs text-zinc-500 font-medium animate-slide-up delay-200 px-4">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Receita Concluída</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Despesa Concluída</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Recorrência Futura</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>Dia Atual</div>
          </div>
        </div>

        {/* Transações Recentes (Nova Seção Listagem Elegante) */}
        <section className="w-full flex flex-col min-w-0 animate-slide-up delay-300">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-6">
            Transações do Mês
          </h3>
          
          {transactionsData.length > 0 ? (
            <div className="flex flex-col gap-3">
              {transactionsData.map((tx) => {
                const Icon = tx.icon;
                const isFuture = tx.status === 'future';
                const isInc = tx.type === 'in';
                
                return (
                  <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0e0e11]/50 border border-white/[0.04] hover:bg-[#111113] hover:border-white/[0.08] transition-all rounded-[20px] group gap-4">
                    
                    {/* Left: Metadata */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors flex-shrink-0
                        ${isFuture ? 'bg-amber-500/5 border-amber-500/10 text-amber-500/70 group-hover:text-amber-400 group-hover:bg-amber-500/10' : 
                        'bg-white/[0.02] border-white/[0.04] text-zinc-500 group-hover:text-zinc-300'}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <h4 className={`text-sm sm:text-base font-medium truncate ${isFuture ? 'text-amber-100/90' : 'text-zinc-200'}`}>
                          {tx.description}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 truncate">
                          <span className={`${isFuture ? 'text-amber-500/80' : 'text-[#8B5CF6]'} font-medium`}>{tx.category}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0"></span>
                          <span>{tx.day < 10 ? `0${tx.day}` : tx.day} de {MONTHS[activeMonth]} {tx.time ? `às ${tx.time}` : ''}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 hidden sm:block"></span>
                          <span className="hidden sm:block">{tx.wallet}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: Values & Badges */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 pl-16 sm:pl-0">
                      <span className={`text-base sm:text-lg font-bold tracking-tight ${isFuture ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isInc ? '+' : '-'}{formatCurrency(tx.amount)}
                      </span>
                      <div className="flex items-center gap-2">
                        {isFuture ? (
                          <span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                            <Clock className="w-3 h-3" /> Previsto
                          </span>
                        ) : (
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${isInc ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                            {isInc ? 'Receita' : 'Despesa'}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center bg-[#0e0e11]/50 border border-white/[0.04] rounded-[24px]">
              <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-600 mb-4">
                <CalendarDays className="w-5 h-5" />
              </div>
              <p className="text-zinc-500 font-light text-sm">Nenhuma movimentação registrada para este mês.</p>
            </div>
          )}
        </section>

        {/* Renderização Condicional: Drawer (Desktop) ou Bottom Sheet (Mobile) */}
        {selectedDayInfo && (
          <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-overlay" onClick={() => setSelectedDay(null)} />
            
            <div className="
              relative w-full md:max-w-[440px] bg-[#09090B] border-t md:border-t-0 md:border-l border-white/[0.06] 
              h-[85vh] md:h-full flex flex-col z-10 shadow-2xl rounded-t-3xl md:rounded-none
              animate-bottom-sheet md:animate-drawer
            ">
              
              <div className="w-12 h-1.5 bg-white/[0.1] rounded-full mx-auto mt-4 md:hidden flex-shrink-0"></div>

              <div className="px-6 pt-4 pb-4 md:pt-8 md:pb-6 border-b border-white/[0.04] flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                    {selectedDayInfo.day < 10 ? `0${selectedDayInfo.day}` : selectedDayInfo.day} de {MONTHS[activeMonth]}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium mt-1">Detalhes do Dia</p>
                </div>
                <button onClick={() => setSelectedDay(null)} className="p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8">
                
                {/* Realizadas */}
                {selectedDayInfo.transactions?.filter(tx => tx.status === 'completed').length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full"></div> Realizadas
                    </h4>
                    {selectedDayInfo.transactions.filter(tx => tx.status === 'completed').map(tx => {
                      const Icon = tx.icon;
                      const isInc = tx.type === 'in';
                      return (
                        <div key={tx.id} className="p-4 bg-[#111113] border border-white/[0.04] rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-zinc-200">{tx.description}</h4>
                              <span className="text-xs text-zinc-500">{tx.category}</span>
                            </div>
                          </div>
                          <span className={`text-base font-bold tracking-tight ${isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isInc ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {/* Futuras */}
                {selectedDayInfo.transactions?.filter(tx => tx.status === 'future').length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Recorrências Futuras
                    </h4>
                    {selectedDayInfo.transactions.filter(tx => tx.status === 'future').map(tx => {
                      const Icon = tx.icon;
                      return (
                        <div key={tx.id} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-amber-100/90">{tx.description}</h4>
                              <span className="text-xs text-amber-500/70">Previsto • {tx.category}</span>
                            </div>
                          </div>
                          <span className={`text-base font-bold tracking-tight text-amber-400`}>
                            {tx.type === 'in' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {selectedDayInfo.transactions?.length === 0 ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-600 mb-4">
                      <Activity className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-zinc-500 font-light">Nenhum evento agendado para este dia.</p>
                  </div>
                ) : null}

              </div>

              {/* Sticky Footer: Ações sempre visíveis */}
              <div className="p-4 sm:p-6 border-t border-white/[0.04] bg-[#09090B] flex gap-3 flex-shrink-0 z-20 sticky bottom-0">
                <button 
                  onClick={(e) => handleOpenModal(e, 'in', selectedDayInfo.day)}
                  className="flex-1 py-4 sm:py-3.5 rounded-xl bg-[#111113] hover:bg-emerald-500/10 border border-white/[0.04] hover:border-emerald-500/30 text-emerald-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Receita
                </button>
                <button 
                  onClick={(e) => handleOpenModal(e, 'out', selectedDayInfo.day)}
                  className="flex-1 py-4 sm:py-3.5 rounded-xl bg-[#111113] hover:bg-rose-500/10 border border-white/[0.04] hover:border-rose-500/30 text-rose-400 font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Minus className="w-4 h-4" /> Despesa
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Footer App */}
        <footer className="w-full border-t border-white/[0.04] text-zinc-500 text-xs sm:text-sm mt-16 pt-8 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <span className="font-light tracking-wide text-zinc-400">© {activeYear} Avora. Todos os direitos reservados.</span>
          </div>
        </footer>
        
      </div>
      <div className="h-28 md:h-0"></div>
    </main>
  );
}

export default Activities;