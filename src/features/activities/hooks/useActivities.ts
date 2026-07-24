import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import type { CalendarDayView } from "../types/CalendarDayView";
import type { DayIndicators } from "../types/DayIndicators";

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
	const [transactionDetails, setTransactionDetails] = useState<TransactionResponse | null>(null);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	
	const month = useMemo(() => currentDate.getMonth(), [currentDate]);
	const year = useMemo(() => currentDate.getFullYear(), [currentDate]);

	const { account } = useAccountContext();

  const accountId = account?.id;

	const transactionService = useTransactionService();
  const recurrenceService = useRecurrenceService();

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			accountId,
      month,
      year,
			currentDate
		],
		queryFn: () => transactionService.getAll({
      accountId: accountId,
      month: month+1,
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

	const allTransaction = useMemo(() => queryTransactions.data, [queryTransactions.data, accountId, month, year, currentDate]);

  const recurrences = useMemo(() => queryRecurrences.data ?? [], [queryRecurrences.data]);

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

	function buildCalendarDays(): CalendarDayView[] {
		const today = new Date();
		const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

		const days: CalendarDayView[] = [];
		const firstDayIndex = new Date(year, month, 1).getDay();
		const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		const emptyIndicators: DayIndicators = { hasIncome: false, hasExpense: false, hasRecurring: false };

		// Dias do mês anterior (visíveis, desabilitados)
		for (let i = firstDayIndex - 1; i >= 0; i--) {
			const dayNumber = daysInPrevMonth - i;
			const prevMonthIdx = month === 0 ? 11 : month - 1;
			const prevYear = month === 0 ? year - 1 : year;
			const key = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
			days.push({ key, dayNumber, isCurrentMonth: false, isToday: false, data: emptyIndicators });
		}

		// Dias do mês atual
		for (let day = 1; day <= daysInCurrentMonth; day++) {
			const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

			const dayTxs = allTransaction?.transactions?.filter((tx) => tx.registeredAt.split('T')[0] === dateKey) ?? [];
			const dayRecurrences = recurrencesByDate.get(dateKey) ?? [];

			days.push({
				key: dateKey,
				dayNumber: day,
				isCurrentMonth: true,
				isToday: dateKey === todayKey,
				data: {
					hasIncome: dayTxs.some((tx) => tx.type === 'CREDIT'),
					hasExpense: dayTxs.some((tx) => tx.type === 'DEBIT'),
					hasRecurring: dayRecurrences.length > 0,
				},
			});
		}

		// Dias do próximo mês (visíveis, desabilitados, fechando o grid em 35 ou 42 células)
		const totalCells = days.length > 35 ? 42 : 35;
		const remainingCells = totalCells - days.length;
		for (let d = 1; d <= remainingCells; d++) {
			const nextMonthIdx = month === 11 ? 0 : month + 1;
			const nextYear = month === 11 ? year + 1 : year;
			const key = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
			days.push({ key, dayNumber: d, isCurrentMonth: false, isToday: false, data: emptyIndicators });
		}

		return days;
	}

	const calendarDays = useMemo(() => buildCalendarDays(), [year, month, allTransaction, recurrencesByDate]);
	
	function goToPreviousMonth() {
		setSelectedDate(null);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
		setSelectedDate(null);
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

	return {
		allTransaction,
		isLoading: queryTransactions.isLoading || queryRecurrences.isLoading,
		isFetching:
			(queryTransactions.isFetching && !queryTransactions.isLoading) ||
      (queryRecurrences.isFetching && !queryRecurrences.isLoading),
		recurrences,
		calendarDays,
		selectedDate,
		setSelectedDate,
		transactionDetails,
		setTransactionDetails,
		goToPreviousMonth,
		goToNextMonth,
		month,
		year
	}
}

export default useActivities;