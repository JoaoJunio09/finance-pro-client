import {
  Activity,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  RepeatIcon
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import styles from './ContextualActivitiesHeader.module.css';

export type ActivitySubpage = 'overview' | 'all' | 'transactions' | 'recurrences' | 'pendings';

interface SubpageOption {
  id: ActivitySubpage;
  label: string;
  icon: React.ElementType;
}

interface ContextualActivitiesHeaderProps {
  currentSubpage: ActivitySubpage;
  setSubpage: (sub: ActivitySubpage) => void;
  currentMonth: Date;
  setCurrentMonth: (d: Date) => void;
}

const getMonthName = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
};

export function ContextualActivitiesHeader({ 
  currentSubpage, 
  setSubpage,
  currentMonth,
  setCurrentMonth
}: ContextualActivitiesHeaderProps) {
  const subpages: SubpageOption[] = [
    { id: 'overview', label: 'Visão Geral', icon: CalendarDays },
    { id: 'all', label: 'Todas as Atividades', icon: ListFilter },
    { id: 'transactions', label: 'Transações', icon: CheckCircle },
    { id: 'recurrences', label: 'Recorrências', icon: RepeatIcon },
    { id: 'pendings', label: 'Pendentes', icon: CheckCircle2 },
  ];

  const [tabRects, setTabRects] = useState<{ [key: string]: { left: number; width: number } }>({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

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
    return () => { window.removeEventListener('resize', updateRects); clearTimeout(timeout); };
  }, [currentSubpage]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className={`w-full mt-0 lg:mt-0 ${styles.bgSurface}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-6 sm:gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 h-full">
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${styles.bgElevated} ${styles.borderLight} ${styles.textMain}`}>
                  <Activity size={14} />
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider flex items-center h-full ${styles.textMuted}`}>
                  Central de Atividades
                </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight capitalize ${styles.textMain}`}>
                {getMonthName(currentMonth)}
              </h1>
            </div>
            <p className={`text-sm hidden sm:block ${styles.textMuted}`}>
              Acompanhe transações e recorrências projetadas e realizadas.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center w-full sm:w-auto mt-2 sm:mt-0">
            <div className={`flex items-center border rounded-xl shadow-sm overflow-hidden p-0.5 ${styles.bgSurface} ${styles.borderDefault}`}>
              <button onClick={handlePrevMonth} className={`w-8 h-8 flex items-center justify-center rounded-lg ${styles.textMuted} ${styles.interactiveButton}`}>
                <ChevronLeft size={16} />
              </button>
              <div className={`w-px h-4 mx-1 ${styles.bgBorderColor}`} />
              <button onClick={handleNextMonth} className={`w-8 h-8 flex items-center justify-center rounded-lg ${styles.textMuted} ${styles.interactiveButton}`}>
                <ChevronRight size={16} />
              </button>
            </div>
            <button className={`flex px-3 py-1.5 h-9 rounded-xl border shadow-sm items-center gap-2 ml-2 text-xs font-semibold transition-all ${styles.bgSurface} ${styles.borderDefault} ${styles.textMain} ${styles.interactiveButton}`}>
              <ListFilter size={15} />
              <span className="hidden sm:inline">Filtros</span>
            </button>
          </div>
        </div>

        <div className={`relative w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 ${styles.scrollbarHide}`}>
          <div className={`flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b ${styles.borderDefault}`}>
            {tabRects[currentSubpage] && (
              <div
                className={`absolute border transition-all duration-300 ease-out z-0 rounded-t-xl ${styles.tabIndicator}`}
                style={{ left: tabRects[currentSubpage].left, width: tabRects[currentSubpage].width, top: 0, bottom: '-1px' }}
              />
            )}
            {subpages.map((sub) => {
              const Icon = sub.icon;
              const isActive = currentSubpage === sub.id;
              return (
                <button
                  key={sub.id}
                  ref={(el) => { tabsRef.current[sub.id] = el; }}
                  onClick={() => setSubpage(sub.id)}
                  className={`flex items-center gap-2 py-3 px-4 text-sm font-medium relative focus:outline-none select-none z-10 ${styles.tabButton} ${isActive ? styles.tabButtonActive : styles.textMuted}`}
                >
                  <Icon size={16} className={isActive ? styles.tabIconActive : styles.textMuted} />
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

export default ContextualActivitiesHeader;