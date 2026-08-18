import {
	ArrowDownRight,
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Clock,
	DollarSign,
	Plus,
	Tag
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { ActiveTab } from '../../types/transaction';

import styles from './TransactionsHeader.module.css';

interface TransactionsHeaderProps {
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
  onOpenAddModal: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const TransactionsHeader = ({ 
  currentMonth, 
  setCurrentMonth, 
  onOpenAddModal, 
  activeTab, 
  setActiveTab 
}: TransactionsHeaderProps) => {
  
  const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'Todas', icon: Tag },
    { id: 'income', label: 'Receitas', icon: ArrowUpRight },
    { id: 'expense', label: 'Despesas', icon: ArrowDownRight },
    { id: 'pending', label: 'Pendentes', icon: Clock }
  ];

  const [tabRects, setTabRects] = useState<{ [key: string]: { left: number; width: number } }>({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const getMonthName = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
  };

  useEffect(() => {
    const updateRects = () => {
      const newRects: { [key: string]: { left: number; width: number } } = {};
      tabs.forEach((tab) => {
        const el = tabsRef.current[tab.id];
        if (el) newRects[tab.id] = { left: el.offsetLeft, width: el.offsetWidth };
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
  }, [activeTab, currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="w-full relative z-20 pt-8 lg:pt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        
        {/* Título e Ações */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
            <span className="text-xs font-semibold text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 shadow-sm">
              <DollarSign size={14} className="text-white" />
              Gerenciamento Financeiro
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight capitalize">
                {getMonthName(currentMonth)}
              </h1>
            </div>
            <p className="text-sm text-white/80 max-w-md font-medium leading-relaxed mt-1">
              Acompanhe, filtre e gerencie todas as suas receitas e despesas em um único lugar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0 pb-1">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-sm overflow-hidden p-1 w-full sm:w-auto justify-center">
              <button 
                onClick={handlePrevMonth} 
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="w-px h-5 mx-1 bg-white/20" />
              <button 
                onClick={handleNextMonth} 
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <button 
              onClick={onOpenAddModal}
              className="flex px-5 py-2.5 h-11 rounded-xl bg-white text-[#4C1D95] text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-95 items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Plus size={18} strokeWidth={2.5} />
              <span>Nova transação</span>
            </button>
          </div>
        </div>

        {/* Abas */}
        <div className={`relative w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mt-2 ${styles.scrollbarHide}`}>
          <div className="flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b border-white/20">
            {tabRects[activeTab] && (
              <div
                className={`absolute border border-white/20 transition-all duration-300 ease-out z-0 rounded-t-xl ${styles.bgBase} ${styles.borderBottomBase}`}
                style={{ left: tabRects[activeTab].left, width: tabRects[activeTab].width, top: 0, bottom: '-1px' }}
              />
            )}
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabsRef.current[tab.id] = el; }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold transition-colors duration-200 relative focus:outline-none select-none z-10 ${isActive ? styles.textMain : 'text-white/80 hover:text-white'}`}
                >
                  <Icon size={16} className={`transition-colors duration-200 ${isActive ? styles.textAccent : 'text-white/80'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};