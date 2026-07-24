import Apresentation from './components/Apresentation/Apresentation';
import Calendar from './components/Calendar/Calendar';
import MonthSelector from './components/MonthSelector/MonthSelector';
import SummaryCards from './components/SummaryCards/SummaryCards';
import TransactionsTimeline from './components/TransactionsTimeline/TransactionsTimeline';
import useActivities from './hooks/useActivities';

import styles from './Activities.module.css';
import TransactionDetails from './components/TransactionDetails/TransactionDetails';
import { useState } from 'react';
import type { TransactionResponse } from '../../models/transaction/TransactionResponse';
import TopProgressBar from '../../components/ui/TopProgressBar/TopProgressBar';
import ActivitiesSkeleton from './components/Skeleton/ActivitiesSkeleton';

const BackgroundGlow = () => {
  return (
    <>
      <div className={`${styles.glow} ${styles.glowBlobPrimary}`}></div>
      <div className={`${styles.glow} ${styles.glowBlobSuccess}`}></div>
    </>
  )
}

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Activities() {
  const [isOpenDrawerDetails, setIsOpenDrawerDetails] = useState(false);
  const {
    allTransaction,
    isLoading,
    isFetching,
    recurrences,
    calendarDays,
    goToPreviousMonth,
    goToNextMonth,
    selectedDate,
    setSelectedDate,
    transactionDetails,
    setTransactionDetails,
    month,
    year
  } = useActivities();

  function handleSelectedTransaction(transaction: TransactionResponse) {
    setTransactionDetails(transaction);
    setIsOpenDrawerDetails(true);
  }

  return (
    <main className="flex-1 w-full relative z-10 flex flex-col items-center">
      <div className="w-full relative z-10 flex flex-col max-w-[400px] bg-main min-h-screen shadow-2xl lg:max-w-[1440px] lg:border-none lg:shadow-none lg:min-h-0">
        {(isLoading || isFetching) && <TopProgressBar />}
        
        <BackgroundGlow />

        {false ? (
          <ActivitiesSkeleton />
        ) : (
          <div className="layout py-8 px-5 sm:px-8 lg:px-12">
            <Apresentation />

            <MonthSelector
              goToNextMonth={goToNextMonth}
              goToPreviousMonth={goToPreviousMonth}
              activeMonth={month}
              activeYear={year}
              MONTHS={MONTHS}
            />

            {allTransaction?.transactionBiggestIncome && allTransaction.transactionBiggestExpense && (
              <SummaryCards
                currentBalance={allTransaction?.currentBalance ?? 0}
                income={allTransaction?.income ?? 0}
                expenses={allTransaction?.expenses ?? 0}
              />
            )}  

            <main className="main-content flex flex-col gap-12 w-full animate-fade-in delay-100">
              <Calendar
                calendarDays={calendarDays}
                selectedDate={selectedDate}
                onSelectedDateChange={setSelectedDate}
              />

              <TransactionsTimeline
                allTransaction={allTransaction}
                recurrences={recurrences ?? []}
                onSelectTransaction={handleSelectedTransaction}
                selectedDate={selectedDate}
              />
            </main>

            <TransactionDetails
              isOpen={isOpenDrawerDetails}
              onClose={() => setIsOpenDrawerDetails(false)}
              transactionSelected={transactionDetails ?? null}
              onDelete={() => {}}
              onEdit={() => {}}
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Activities;