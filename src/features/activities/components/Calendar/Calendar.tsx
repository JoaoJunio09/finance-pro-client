import { CalendarDays } from 'lucide-react';
import type { CalendarDayView } from '../../types/CalendarDayView';
import styles from './Calendar.module.css';

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CalendarProps {
  calendarDays: CalendarDayView[];
  selectedDate: string | null;
  onSelectedDateChange: (date: string | null) => void;
}

export function Calendar({
  calendarDays,
  selectedDate,
  onSelectedDateChange,
}: CalendarProps) {
  return (
    <div className={`${styles.container} p-6 md:p-8`}>
      {/* Cabeçalho */}
      <div className={`flex justify-between items-center mb-6 pb-6 ${styles.header}`}>
        <h2 className={`text-lg font-semibold flex items-center gap-2 ${styles.title}`}>
          <CalendarDays size={18} className={styles.iconMuted} />
          Calendário
        </h2>
        {selectedDate && (
          <button
            onClick={() => onSelectedDateChange(null)}
            className={`text-xs font-medium ${styles.clearFilterBtn}`}
            type="button"
          >
            Limpar filtro
          </button>
        )}
      </div>

      {/* Dias da Semana */}
      <div className="grid grid-cols-7 text-center mb-4">
        {WEEK_DAYS.map((day) => (
          <div key={day} className={`font-semibold ${styles.weekday}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Grid do Calendário */}
      <div className="grid grid-cols-7 gap-0 md:gap-4">
        {calendarDays.map((day) => {
          const isSelected = selectedDate === day.key;

          const cellClasses = [
            styles.dayCell,
            'flex flex-col justify-between items-start',
            !day.isCurrentMonth ? styles.dimmed : '',
            day.isToday ? styles.today : '',
            isSelected ? styles.selected : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={day.key}
              className={cellClasses}
              onClick={() => onSelectedDateChange(day.key)}
              disabled={!day.isCurrentMonth}
              title="Filtrar transações deste dia"
              type="button"
            >
              <div className={styles.dayBg}></div>

              <span className={styles.dateNumber}>{day.dayNumber}</span>

              {day.isCurrentMonth && (
                <div className={styles.dayIndicators}>
                  <div className={styles.barWrapper}>
                    <div className={`${styles.indicatorDot} ${styles.dotInc} ${day.data.hasIncome ? styles.active : ''}`} />
                    <div className={`${styles.indicatorDot} ${styles.dotExp} ${day.data.hasExpense ? styles.active : ''}`} />
                    <div className={`${styles.indicatorDot} ${styles.dotRec} ${day.data.hasRecurring ? styles.active : ''}`} />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;