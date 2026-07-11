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
import type { TransactionResponse } from '../../../models/transaction/TransactionResponse';
import TransactionModal from '../../transactionModal/components/TransactionModal';
import type { TransactionModalType } from '../../transactionModal/types/TransactionModalType';
import Confirm from '../../../components/ui/Confirm/Confirm';

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function Activities() {
  const [transaction, setTransaction] = useState<TransactionResponse | null>(null); 
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const {
    allTransaction,
    deleteTransaction,
    setTransactionDeleteId,
    calendarDays,
    error,
    loadingDelete,
    loadingQuery,
    fetching,
    selectedDate,
    setSelectedDate,
    selectedDateInfo,
    goToPreviousMonth,
    goToNextMonth,
    month,
    year
  } = useActivities();

  function handleSaveOrUpdate(transaction: TransactionResponse | null) {
    setTransaction(transaction);
    setOpenModal(true);
  }

  function handleOnDelete(id: string) {
    setTransactionDeleteId(id);
    setOpenModalConfirm(true);
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const type: TransactionModalType = transaction?.type === 'CREDIT' ? 'CREDIT' : 'DEBIT';

  return (
    <main className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 relative z-10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 flex flex-col flex-1">
        {(loadingQuery || fetching) && <TopProgressBar />}

        {loadingQuery  ? (
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
              handleSaveOrUpdate={handleSaveOrUpdate}
              handleOnDelete={handleOnDelete}
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

        {openModal && (
          <TransactionModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            type={type}
            transaction={transaction}
          />
        )}

      {openModalConfirm && (
        <Confirm
          type='warning'
          title='Excluir Transação'
          message='Ao excluir a transação, esta ação não poderá ser desfeita.'
          buttonText='Excluir'
          isLoading={loadingDelete}
          onCancel={() => {
            setTransactionDeleteId(null);
            setOpenModalConfirm(false);
          }}
          onConfirm={() => {
            deleteTransaction();
            setOpenModalConfirm(false);
          }}
        />
      )}

      </div>
      <div className="h-28 md:h-0"></div>
    </main>
  );
}

export default Activities;