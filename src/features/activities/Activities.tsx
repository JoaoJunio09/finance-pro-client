import { useState } from 'react';
import { ActivitiesHeader, type ActivitySubpage } from './components/ActivitiesHeader/ActivitiesHeader';
import { CalendarView } from './components/CalendarView/CalendarView';
import { DayDetailsDrawer } from './components/DayDetailsDrawer/DayDetailsDrawer';
import { SimpleListView } from './components/SimpleListView/SimpleListView';
import useActivities from './hooks/useActivities';
import { getMonthName } from './utils/activityFormatters';

import styles from './Activities.module.css';

function Activities() {
  const [currentSubpage, setCurrentSubpage] = useState<ActivitySubpage>('overview');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  const {
    activities,
    transactions,
    transactionsPending,
    recurrences,
    currentMonth,
    setCurrentMonth
  } = useActivities();

  console.log(activities)

  const handleNewActivity = () => {
    console.log('Nova atividade clicada!');
  };

  return (
    <section className="w-full">
      <div className={`w-full ${styles.animateFadeInUp}`}>
        <div className="w-full bg-gradient-to-br from-[#4C1D95] to-[#312E81] relative shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <ActivitiesHeader 
            currentSubpage={currentSubpage} 
            setSubpage={setCurrentSubpage}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            onNewActivity={handleNewActivity}
          />
        </div>

        <main className={`relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10 ${styles.animateFadeInUp}`}>
          {currentSubpage === 'overview' && (
            <CalendarView 
              currentMonth={currentMonth}
              activities={activities}
              onDayClick={handleDayClick}
            />
          )}
          
          {currentSubpage === 'all' && (
            <SimpleListView 
              title="Todas as Atividades" 
              desc={`Listagem cronológica do mês de ${getMonthName(currentMonth)}.`} 
              activities={activities}
            />
          )}

          {currentSubpage === 'transactions' && (
            <SimpleListView 
              title="Histórico Realizado" 
              desc="Transações efetivadas com sucesso." 
              activities={transactions} 
            />
          )}

          {currentSubpage === 'recurrences' && (
            <SimpleListView 
              title="Recorrências Fixas" 
              desc="Assinaturas e contas com cobrança programada mensalmente." 
              activities={recurrences}
            />
          )}

          {currentSubpage === 'pendings' && (
            <SimpleListView 
              title="Atividades Pendentes" 
              desc="Movimentações agendadas que ainda não foram processadas." 
              activities={transactionsPending} 
            />
          )}
        </main>
      </div>

      <DayDetailsDrawer
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        selectedDate={selectedDate} 
        activities={activities}
      />
    </section>
  );
}

export default Activities;