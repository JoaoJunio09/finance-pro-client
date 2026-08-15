import React, { useState, useEffect, useRef } from 'react';
import { 
  CalendarDays, 
  ListFilter, 
  CheckCircle, 
  RepeatIcon, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Plus
} from 'lucide-react';

// Tipagem exportada para ser consumida no estado da página pai
export type ActivitySubpage = 'overview' | 'all' | 'transactions' | 'recurrences' | 'pendings';

interface ActivitiesHeaderProps { 
  currentSubpage: ActivitySubpage; 
  setSubpage: (sub: ActivitySubpage) => void;
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  onNewActivity?: () => void; // Adicionada prop opcional para a ação do botão
}

export function ActivitiesHeader({ 
  currentSubpage, 
  setSubpage,
  currentMonth,
  setCurrentMonth,
  onNewActivity
}: ActivitiesHeaderProps) {
  
  const subpages: { id: ActivitySubpage; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Visão Geral', icon: CalendarDays },
    { id: 'all', label: 'Todas as Atividades', icon: ListFilter },
    { id: 'transactions', label: 'Transações', icon: CheckCircle },
    { id: 'recurrences', label: 'Recorrências', icon: RepeatIcon },
    { id: 'pendings', label: 'Pendentes', icon: CheckCircle2 },
  ];

  const [tabRects, setTabRects] = useState<{ [key: string]: { left: number; width: number } }>({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const getMonthName = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
  };

  useEffect(() => {
    const updateRects = () => {
      const newRects: { [key: string]: { left: number; width: number } } = {};
      subpages.forEach((sub) => {
        const el = tabsRef.current[sub.id];
        if (el) newRects[sub.id] = { left: el.offsetLeft, width: el.offsetWidth };
      });
      setTabRects(newRects);
    };
    
    updateRects();
    window.addEventListener('resize', updateRects);
    const timeout = setTimeout(updateRects, 150);
    
    return () => { 
      window.removeEventListener('resize', updateRects); 
      clearTimeout(timeout); 
    };
  }, [currentSubpage, currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="w-full relative z-20 pt-8 lg:pt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        
        {/* Cabeçalho, Controles de Mês e Ações */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
          
          {/* Títulos e Descrição */}
          <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
            <span className="text-xs font-semibold text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 shadow-sm">
              <CalendarDays size={14} className="text-white" />
              Central de Atividades
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight capitalize">
                {getMonthName(currentMonth)}
              </h1>
            </div>
            <p className="text-sm text-white/80 max-w-md font-medium leading-relaxed mt-1">
              Acompanhe suas transações, recorrências e pendências projetadas e realizadas.
            </p>
          </div>

          {/* Navegação e Botão Principal */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto mt-4 sm:mt-0 pb-1">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-sm overflow-hidden p-1 w-full sm:w-auto justify-center">
              <button 
                onClick={handlePrevMonth} 
                className="cursor-pointer lg:w-12 w-full h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
                aria-label="Mês anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="w-px h-5 mx-1 bg-white/20" />
              <button 
                onClick={handleNextMonth} 
                className="cursor-pointer lg:w-12 w-full h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
                aria-label="Próximo mês"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <button 
              onClick={onNewActivity}
              className="cursor-pointer flex px-5 py-2.5 h-11 rounded-xl bg-white text-[#4C1D95] text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-95 items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Nova atividade</span>
            </button>
          </div>
        </div>

        {/* Abas de Navegação (Subpages) */}
        <div className="relative w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mt-2">
          <div className="flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b border-white/20">
            {/* Animador de fundo da aba ativa */}
            {tabRects[currentSubpage] && (
              <div
                className="absolute bg-[var(--bg-base)] border border-white/20 border-b-[var(--bg-base)] transition-all duration-300 ease-out z-0 rounded-t-xl"
                style={{ 
                  left: tabRects[currentSubpage].left, 
                  width: tabRects[currentSubpage].width, 
                  top: 0, 
                  bottom: '-1px' 
                }}
              />
            )}
            
            {/* Mapeamento dos Botões */}
            {subpages.map((sub) => {
              const Icon = sub.icon;
              const isActive = currentSubpage === sub.id;
              return (
                <button
                  key={sub.id}
                  ref={(el) => { tabsRef.current[sub.id] = el; }}
                  onClick={() => setSubpage(sub.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold transition-colors duration-200 relative focus:outline-none select-none z-10 ${
                    isActive ? 'text-[var(--text-main)]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Icon 
                    size={16} 
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-[var(--accent)]' : 'text-white/80'
                    }`} 
                  />
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}