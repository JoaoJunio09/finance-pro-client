import useActivities from '../hooks/useActivities';
import Apresentation from './Apresentation';
import Calendar from './Calendar';
import DetailsOfDay from './DetailsOfDay';
import RecentTransactions from './RecentTransactions';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Activities() {
  const {
    calendarDays,
    transactions,
    error,
    loading,
    selectedDate,
    setSelectedDate,
    selectedDateInfo,
    currentDate,
    setCurrentDate,
    goToPreviousMonth,
    goToNextMonth,
    month,
    year
  } = useActivities();

  const isCurrentMonthView = month === month && year === year;

  return (
    <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 relative z-10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col flex-1">
        
        {/* Apresentação Estratégica Humana (Substitui Header Antigo) */}
        <Apresentation
          activeMonth={month}
          activeYear={year}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          isCurrentMonthView={isCurrentMonthView}
          MONTHS={MONTHS}
        />

        {/* Calendário Premium (100% Responsivo, sem scroll horizontal em telas menores) */}
        <Calendar
          calendarDays={calendarDays}
          isCurrentMonthView={isCurrentMonthView}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {/* Transações Recentes (Nova Seção Listagem Elegante) */}
        <RecentTransactions
          transactions={transactions}
          activeMonth={month}
          MONTHS={MONTHS}
        />

        {/* Renderização Condicional: Drawer (Desktop) ou Bottom Sheet (Mobile) */}
        {selectedDateInfo && (
          <DetailsOfDay
            selectedDateInfo={selectedDateInfo}
            setSelectedDate={setSelectedDate}
            MONTHS={MONTHS}
          />
          // <DetailsOfDay
          //   selectedDateInfo={selectedDateInfo}
          //   setSelectedDate={setSelectedDate}
          //   MONTHS={MONTHS}
          //   activeMonth={month}
          // />
        )}
        
      </div>
      <div className="h-28 md:h-0"></div>
    </main>
  );
}

export default Activities;