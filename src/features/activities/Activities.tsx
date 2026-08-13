import { useState } from 'react';
import ActivitiesPresentation from './components/ActivitiesPresentation/ActivitiesPresentation';
import { CalendarView } from './components/CalendarView/CalendarView';
import { ContextualActivitiesHeader, type ActivitySubpage } from './components/ContextualActivitiesHeader/ContexttualActivitiesHeader';
import { DayDetailsDrawer } from './components/DayDetailsDrawer/DayDetailsDrawer';
import { SimpleListView } from './components/SimpleListView/SimpleListView';
import useActivities from './hooks/useActivities';
import { getMonthName } from './utils/activityFormatters';

import styles from './Activities.module.css';

function Activities() {
  const [currentSubpage, setCurrentSubpage] = useState<ActivitySubpage>('overview');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsDrawerOpen(true);
  };

  const { activities, transactions, transactionsPending, recurrences } = useActivities();

  return (
    <section className="w-full">
      <div className={`w-full ${styles.animateFadeInUp}`}>
        <ContextualActivitiesHeader 
          currentSubpage={currentSubpage} 
          setSubpage={setCurrentSubpage}
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />

				<ActivitiesPresentation />
				
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