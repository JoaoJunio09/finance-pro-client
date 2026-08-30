import { CalendarDays, Calendar as CalendarIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isSameDayFromLocalDateTime } from '../../../../utils/FormatDate';
import type { FinancialActivity } from '../../types/FinancialActivity';

import styles from './DayDetailsDrawer.module.css';
import ActivityListItem from '../ActivityListItem/ActivityListItem';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';

interface DayDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  activities: FinancialActivity[];
}

export function DayDetailsDrawer({ 
  isOpen, 
  onClose, 
  selectedDate, 
  activities 
}: DayDetailsDrawerProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Aguarda o componente ser montado fora da tela antes de disparar o visual "aberto"
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender || !selectedDate) return null;

  const formattedDate = new Intl.DateTimeFormat('pt-BR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  }).format(selectedDate);

  const dayActivities = activities.filter(a => isSameDayFromLocalDateTime(a.registeredAt, selectedDate));
  const totalIncome = dayActivities.filter(a => a.type === 'CREDIT').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = dayActivities.filter(a => a.type === 'DEBIT').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 backdrop-blur-sm z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles.overlay} ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      
      {/* Mobile Bottom Sheet */}
      <div className={`lg:hidden fixed bottom-15 left-0 right-0 z-[55] rounded-t-3xl border-t transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform max-h-[85vh] flex flex-col ${styles.bgSurface} ${styles.borderDefault} ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-full flex justify-center pt-3 pb-2" onClick={onClose}>
          <div className={`w-12 h-1.5 rounded-full ${styles.bgBorderHover}`} />
        </div>
        
        <div className={`px-5 pb-4 border-b ${styles.borderLight}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.textAccent}`}>Atividades do dia</span>
          <h3 className={`text-lg font-bold capitalize mt-0.5 ${styles.textMain}`}>{formattedDate}</h3>
        </div>

        <div className={`flex-1 overflow-y-auto p-5 pb-10 ${styles.scrollbarHide}`}>
          {dayActivities.length === 0 ? (
            <div className="text-center py-10 flex flex-col items-center opacity-50">
              <CalendarIcon size={32} className={`mb-3 ${styles.textMuted}`} />
              <p className={`text-sm font-medium ${styles.textMuted}`}>Nenhuma atividade neste dia.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {dayActivities.map(act => <ActivityListItem key={act.id} activity={act} />)}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Drawer */}
      <div className={`hidden lg:flex fixed top-0 right-0 bottom-0 w-[420px] border-l z-[55] shadow-2xl flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${styles.bgSurface} ${styles.borderDefault} ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`flex items-center justify-between p-6 border-b ${styles.borderDefault}`}>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${styles.textAccent}`}>
              <CalendarDays size={14} /> Atividades do dia
            </span>
            <h3 className={`text-xl font-bold capitalize mt-1 ${styles.textMain}`}>{formattedDate}</h3>
          </div>
          <button onClick={onClose} className={`p-2 rounded-xl border border-transparent transition-colors ${styles.textMuted} ${styles.interactiveButton} ${styles.interactiveButtonHoverBorder}`}>
            <X size={20} />
          </button>
        </div>

        {dayActivities.length > 0 && (
          <div className={`px-6 py-4 border-b flex gap-4 ${styles.borderLight} ${styles.drawerDivider}`}>
            <div className="flex flex-col">
              <span className={`text-[10px] font-medium ${styles.textMuted}`}>Receitas do dia</span>
              <span className={`text-sm font-bold ${styles.textIncome}`}>{formatCurrencyLabel(totalIncome)}</span>
            </div>
            <div className={`w-px ${styles.bgBorderColor}`} />
            <div className="flex flex-col">
              <span className={`text-[10px] font-medium ${styles.textMuted}`}>Despesas do dia</span>
              <span className={`text-sm font-bold ${styles.textExpense}`}>{formatCurrencyLabel(totalExpense)}</span>
            </div>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto p-6 ${styles.scrollbarHide}`}>
          {dayActivities.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center opacity-50">
              <CalendarIcon size={40} className={`mb-4 ${styles.textMuted}`} />
              <p className={`text-sm font-medium ${styles.textMuted}`}>O dia está livre.</p>
              <p className={`text-xs mt-1 ${styles.textMuted}`}>Nenhuma movimentação registrada.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {dayActivities.map(act => <ActivityListItem key={act.id} activity={act} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}