import { useEffect, useState } from 'react';
import TopProgressBar from '../../../components/ui/TopProgressBar/TopProgressBar';
import useActivities from '../hooks/useActivities';
import Apresentation from './Apresentation';
import Calendar from './Calendar';
import DetailsOfDay from './DetailsOfDay';
import MonthSummaryAndInsights from './MonthSummaryAndInsights';
import Overview from './Overview';
import RecentTransactions from './RecentTransactions';
import ActivitiesSkeleton from './ActivitiesSkeleton';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Activities() {
  const {
    allTransaction,
    calendarDays,
    error,
    loading,
    fetching,
    selectedDate,
    setSelectedDate,
    selectedDateInfo,
    goToPreviousMonth,
    goToNextMonth,
    month,
    year
  } = useActivities();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 relative z-10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col flex-1">
        {(loading || fetching) && <TopProgressBar />}

        {loading  ? (
          <ActivitiesSkeleton />
        ) : (
          <div>
            <Apresentation
              activeMonth={month}
              activeYear={year}
              goToPreviousMonth={goToPreviousMonth}
              goToNextMonth={goToNextMonth}
              MONTHS={MONTHS}
            />

            {allTransaction?.transactionBiggestIncome && allTransaction.transactionBiggestExpense && (
              <>
                <Overview
                  allTransaction={allTransaction ?? null}
                />

                <MonthSummaryAndInsights
                  allTransaction={allTransaction ?? null}
                />
              </>
            )}
            <Calendar
              calendarDays={calendarDays}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              currentBalance={allTransaction?.currentBalance ?? 0}  
            />
            <RecentTransactions
              allTransaction={allTransaction ?? null}
            />
          </div>
        )}

        {selectedDateInfo && (
          <DetailsOfDay
            selectedDateInfo={selectedDateInfo}
            setSelectedDate={setSelectedDate}
            MONTHS={MONTHS}
          />
        )}
      </div>
      <div className="h-28 md:h-0"></div>
    </main>
  );
}

export default Activities;