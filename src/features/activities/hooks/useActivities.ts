import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { CalendarDay } from "../types/CalendarDay";
import showToast from "../../../components/ui/Toast/Toast";

function getRecurrenceDaysInMonth(
  recurrence: RecurrenceResponse,
  month: number, // 0-indexed (padrão JS)
  year: number
): number[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNumber = month + 1; // backend é 1-indexed

  switch (recurrence.frequencyType) {
    case 'MONTHLY': {
      if (!recurrence.dayOne) return [];
      return [Math.min(recurrence.dayOne, daysInMonth)];
    }

    case 'BIWEEKLY': {
      const days: number[] = [];
      if (recurrence.dayOne) days.push(Math.min(recurrence.dayOne, daysInMonth));
      if (recurrence.dayTwo) days.push(Math.min(recurrence.dayTwo, daysInMonth));
      return days;
    }

    case 'YEARLY': {
      if (!recurrence.dayOne || !recurrence.monthOfTheYear) return [];
      if (recurrence.monthOfTheYear !== monthNumber) return [];
      return [Math.min(recurrence.dayOne, daysInMonth)];
    }

    default:
      return [];
  }
}

function isPastMonth(month: number, year: number): boolean {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  if (year < currentYear) return true;
  if (year === currentYear && month < currentMonth) return true;
  return false;
}

function useActivities() {
  const [transactionDeleteId, setTransactionDeleteId] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const month = useMemo(() => currentDate.getMonth(), [currentDate]);
	const year = useMemo(() => currentDate.getFullYear(), [currentDate]);

	const { account } = useAccountContext();
  const queryClient = useQueryClient();

  const accountId = account?.id;

	const transactionService = useTransactionService();
  const recurrenceService = useRecurrenceService();

  const transactionMutationDelete = useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      showToast({
        type: 'success',
        title: 'Excluido!',
        message: 'A transação foi excluida com sucesso.'
      });
    },
    onError: () => {
      showToast({
        type: 'error',
        title: 'Erro ao excluir Transação!',
        message: 'Tente novamente em instantes.'
      });
    }
  });

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			accountId,
      month,
      year
		],
		queryFn: () => transactionService.getAll({
      accountId: accountId,
      month: (month+1),
      year: year
    }),
    enabled: Boolean(accountId),
		retry: 1,
    placeholderData: keepPreviousData
	});

  const queryRecurrences = useQuery({
    queryKey: [
      'recurrences',
      accountId
    ],
    queryFn: () => recurrenceService.getAll({ accountId: accountId }),
    enabled: !!accountId,
    retry: 1
  });  

	const allTransaction = useMemo(() => {
		return queryTransactions.data;
	}, [queryTransactions.data, accountId, month, year]);

  const recurrences = useMemo(() => {
    return queryRecurrences.data ?? [];
  }, [queryRecurrences.data]);

  const recurrencesByDate = useMemo(() => {
    const map = new Map<string, RecurrenceResponse[]>();

    if (isPastMonth(month, year)) return map;

    for (const rec of recurrences) {
      if (!rec.active) continue;

      const days = getRecurrenceDaysInMonth(rec, month, year);
      for (const day of days) {
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        if (!map.has(dateString)) map.set(dateString, []);
        map.get(dateString)!.push(rec);
      }
    }

    return map;
  }, [recurrences, month, year]);

	const calendarDays = useMemo<CalendarDay[]>(() => {
    const days: CalendarDay[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOffset = new Date(year, month, 1).getDay(); 

    const totalCells = Math.ceil((daysInMonth + firstDayOffset) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOffset || i >= daysInMonth + firstDayOffset) {
        days.push({ date: null, transactions: [], recurrences: [] });
      }
      else {
        const dayNumber = i - firstDayOffset + 1;
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;

        const dayTxs = allTransaction?.transactions.filter(tx => {
          const txDateOnly = tx.registeredAt.split('T')[0]; // "2026-07-15"
          return txDateOnly === dateString;
        });
        const dayRecurrences = recurrencesByDate.get(dateString) ?? [];
        
        let inTotal = 0, outTotal = 0;
        dayTxs?.forEach(tx => {
          if (tx.type === 'CREDIT') inTotal += tx.amount;
          else outTotal += tx.amount;
        });

        const futureTotal = dayRecurrences.reduce((sum, r) => sum + r.amount, 0);

        days.push({
          date: dateString,
          transactions: dayTxs ?? [],
          recurrences: dayRecurrences,
          inTotal,
          outTotal,
          futureTotal
        });
      }
    }
    return days;
  }, [month, year, allTransaction?.transactions, recurrencesByDate]);

	const selectedDateInfo = useMemo<CalendarDay | null | undefined>(() => {
    if (!selectedDate) return null;
    return calendarDays.find(d => d.date === selectedDate);
  }, [selectedDate, calendarDays]);

  function goToPreviousMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  function deleteTransaction() {
    if (!transactionDeleteId) return;
    transactionMutationDelete.mutate(transactionDeleteId);
  }

	return {
    allTransaction: queryTransactions.data,
    deleteTransaction,
    setTransactionDeleteId,
		calendarDays,
		error: queryTransactions.error,
    loadingDelete: transactionMutationDelete.isPending,
		loadingQuery: queryTransactions.isLoading || queryRecurrences.isLoading,
    fetching:
      (queryTransactions.isFetching && !queryTransactions.isLoading) ||
      (queryRecurrences.isFetching && !queryRecurrences.isLoading),
		selectedDate,
		setSelectedDate,
		selectedDateInfo,
		currentDate,
		setCurrentDate,
		goToPreviousMonth,
		goToNextMonth,
		month,
		year
	}
}

export default useActivities;