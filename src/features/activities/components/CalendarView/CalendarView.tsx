import { useMemo } from 'react';

import { isSameDayFromLocalDateTime } from '../../../../utils/FormatDate';
import type { FinancialActivity } from '../../types/FinancialActivity';
import { isSameDay } from '../../utils/activityFormatters';
import styles from './CalendarView.module.css';

// Utilitário para gerar os dias do calendário (preenchendo os espaços vazios do grid)
const generateCalendarDays = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const startingDayOfWeek = firstDayOfMonth.getDay(); 
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  
  const days = [];
  
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  const remainingSlots = 42 - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};

interface CalendarViewProps {
  currentMonth: Date;
  activities: FinancialActivity[];
  onDayClick: (date: Date) => void;
}

export function CalendarView({ 
  currentMonth, 
  activities,
  onDayClick
}: CalendarViewProps) {
  const days = useMemo(() => generateCalendarDays(currentMonth), [currentMonth]);
  const today = new Date();

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className={`rounded-3xl p-5 sm:p-8 flex flex-col border ${styles.viewCard}`}>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
        {weekDays.map(day => (
          <div key={day} className={`text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wider py-2 ${styles.textMuted}`}>
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((dayObj, index) => {
          const isToday = isSameDay(dayObj.date, today);
          const dayActivities = activities.filter(a => isSameDayFromLocalDateTime(a.registeredAt ?? '', dayObj.date));
          
          const hasIncome = dayActivities.some(a => a.type === 'CREDIT');
          const hasExpense = dayActivities.some(a => a.type === 'DEBIT');
          const hasRecurrence = dayActivities.some(a => a.isRecurrent);

          return (
            <div 
              key={index}
              onClick={() => onDayClick(dayObj.date)}
              className={`
                aspect-square sm:aspect-auto sm:h-28 rounded-2xl p-1 sm:p-2 border transition-all cursor-pointer flex flex-col
                ${dayObj.isCurrentMonth ? styles.calendarDayCurrent : styles.calendarDayOther}
                ${isToday ? styles.calendarDayToday : ''}
              `}
            >
              <div className="flex justify-center sm:justify-end">
                <span className={`
                  flex items-center justify-center text-xs sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 rounded-full
                  ${isToday ? `${styles.bgAccent} ${styles.textWhite} font-bold shadow-sm` : styles.textMain}
                `}>
                  {dayObj.date.getDate()}
                </span>
              </div>
              
              <div className="mt-auto pt-1 pb-1 sm:pb-2 flex justify-center gap-1 sm:gap-1.5 flex-wrap">
                {hasIncome && <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm ${styles.bgIncome}`} />}
                {hasExpense && <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm ${styles.bgExpense}`} />}
                {hasRecurrence && <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm ${styles.bgAccent}`} />}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 border-t flex-wrap ${styles.borderLight}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${styles.bgIncome}`} />
          <span className={`text-[11px] sm:text-xs font-medium ${styles.textMuted}`}>Receita</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${styles.bgExpense}`} />
          <span className={`text-[11px] sm:text-xs font-medium ${styles.textMuted}`}>Despesa</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full shadow-sm ${styles.bgAccent}`} />
          <span className={`text-[11px] sm:text-xs font-medium ${styles.textMuted}`}>Recorrência</span>
        </div>
      </div>
    </div>
  );
}