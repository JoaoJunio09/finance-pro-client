import { useMemo, useState } from 'react';
import type { RecurrenceResponse } from '../../../../models/recurrence/RecurrenceResponse';
import type { AllTransactionResponse } from '../../../../models/transaction/AllTransactionResponse';
import type { TransactionResponse } from '../../../../models/transaction/TransactionResponse';
import { formatRelativeDateTime } from '../../../../utils/FormatDate';
import EmptyState from './EmptyState/EmptyState';
import MaxExpenseTransaction from './MaxExpenseTransaction/MaxExpenseTransaction';
import MaxIncomeTransaction from './MaxIncomeTransaction/MaxIncomeTransaction';
import RecurrenceList from './RecurrenceList/RecurrenceList';
import SearchTransaction from './Search/Search';
import TransactionList from './TransactionList/TransactionList';
import styles from './TransactionsTimeline.module.css';

interface TransactionsTimelineProps {
  allTransaction: AllTransactionResponse | undefined;
  recurrences: RecurrenceResponse[];
  selectedDate: string | null;
  onSelectTransaction: (transaction: TransactionResponse) => void;
}

export function TransactionsTimeline({
  allTransaction,
  recurrences,
  selectedDate,
  onSelectTransaction
}: TransactionsTimelineProps) {
  const [search, setSearch] = useState<string>('');

  const maxIncomeTransaction = allTransaction?.transactionBiggestIncome;
  const maxExpenseTransaction = allTransaction?.transactionBiggestExpense;

  const transactionsFiltered = useMemo(() => {
    const transactions = allTransaction?.transactions ?? [];

    const normalizedSearch = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      if (selectedDate &&transaction.registeredAt.split('T')[0] !== selectedDate) {
        return false;
      }

      if (normalizedSearch) {
        const matchesSearch =
          transaction.description?.toLowerCase().includes(normalizedSearch) ||
          transaction.category?.name?.toLowerCase().includes(normalizedSearch) ||
          transaction.wallet?.name?.toLowerCase().includes(normalizedSearch);

        if (!matchesSearch) {
          return false;
        }
      }

      return true;
    });
  }, [
    allTransaction?.transactions,
    selectedDate,
    search,
  ]);

  const recurrencesFiltered = useMemo(() => {
    if (selectedDate) {
      return recurrences.filter((recurrence) => {
        const nextDate = recurrence.nextExecutionDate.split('T')[0];
        const lastDate = recurrence.lastExecutionDate?.split('T')[0];
        return nextDate === selectedDate || lastDate === selectedDate;
      });
    }
    
    return recurrences;
  }, [recurrences, selectedDate]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, TransactionResponse[]> = {};

    transactionsFiltered.forEach((transaction) => {
      const dateKey = transaction.registeredAt.split('T')[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(transaction);
    });

    return Object.entries(groups).sort(
      ([dateA], [dateB]) => dateB.localeCompare(dateA)
    );
  }, [transactionsFiltered]);

  return (
    <section className="w-full">
      <div className="w-full flex flex-col">

        <div className={`flex items-center gap-5 w-full mb-6 ${styles.sectionDivider}`}>
          <span>Transações</span>
        </div>

        <SearchTransaction
          search={search}
          setSearch={setSearch}
        />

        {!selectedDate && !search && (maxIncomeTransaction && maxExpenseTransaction) && (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b ${styles.pinnedHighlights}`}>
            {maxIncomeTransaction && (
              <MaxIncomeTransaction
                transaction={maxIncomeTransaction}
                onSelectTransaction={onSelectTransaction}
              />
            )}

            {maxExpenseTransaction && (
              <MaxExpenseTransaction
                transaction={maxExpenseTransaction}
                onSelectTransaction={onSelectTransaction}
              />
            )}
          </div>
        )}

        <div className="w-full">
          {groupedTransactions.length === 0 ? (
            <EmptyState
              title='Nenhuma transação encontrada'
              message='Tente alterar os termos da busca ou selecione outro dia.'
              type='transaction'
            />
          ) : (
            <div className="relative flex flex-col gap-10">
              <div className={`absolute left-[9px] top-[10px] bottom-[10px] w-[1.5px] z-[1] ${styles.flowLine}`}></div>

              {groupedTransactions.map(([date, transactions]) => (
                <div key={date} className="flex flex-col gap-6 relative">
                  <div className="relative top-0 z-[5] pl-[2.2rem]">
                    <span className={`py-1.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider ${styles.dayBadge}`}>
                      {formatRelativeDateTime(date)}
                    </span>
                  </div>

                  <TransactionList
                    transactions={transactions}
                    onSelectTransaction={onSelectTransaction}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`flex items-center gap-5 w-full mt-16 mb-6 ${styles.sectionDivider}`}>
          <span>Recorrências previstas</span>
        </div>

        {recurrencesFiltered.length === 0 ? (
          <EmptyState
            title='Nenhuma recorrência prevista'
            message='Não há nenhuma obrigação ou agendamento futuro para este período.'
            type='transaction'
          />
        ) : (
          <RecurrenceList
            recurrences={recurrencesFiltered}
            selectedDate={selectedDate}
          />
        )}

      </div>
    </section>
  );
}

export default TransactionsTimeline;