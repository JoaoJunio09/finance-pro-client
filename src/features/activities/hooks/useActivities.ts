import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useTransactionService from "../../../hooks/useTransactionService";
import type { CalendarDay } from "../types/CalendarDay";

function useActivities() {
	const [selectedDate, setSelectedDate] = useState<string | null>(null);
	const [currentDate, setCurrentDate] = useState<Date>(new Date());

	const month = useMemo(() => currentDate.getMonth(), [currentDate]);
	const year = useMemo(() => currentDate.getFullYear(), [currentDate]);

	const { account } = useAccountContext();

	const transactionService = useTransactionService();

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			account.id
		],
		queryFn: () => transactionService.getAll({ accountId: account.id }),
		enabled: !!account.id,
		retry: 3
	});

	function goToPreviousMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

	const transactions = useMemo(() => {
		return queryTransactions.data ?? []
	}, [queryTransactions.data]);

	const calendarDays = useMemo<CalendarDay[]>(() => {
    const days: CalendarDay[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOffset = new Date(year, month, 1).getDay();

    const totalCells = Math.ceil((daysInMonth + firstDayOffset) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      if (i < firstDayOffset || i >= daysInMonth + firstDayOffset) {
        days.push({ date: null, transactions: [] });
      } else {
        const dayNumber = i - firstDayOffset + 1;
        const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;

        const dayTxs = transactions.filter(tx => {
          const txDateOnly = tx.registeredAt.split('T')[0]; // "2026-07-15"
          return txDateOnly === dateString;
        });
        
        let inTotal = 0, outTotal = 0, futureTotal = 0;

        dayTxs.forEach(tx => {
          if (tx.type === 'CREDIT') {
            inTotal += tx.amount;
          } else {
            outTotal += tx.amount;
          }
        });

        days.push({
          date: dateString,
          transactions: dayTxs,
          inTotal,
          outTotal,
          futureTotal
        });
      }
    }
    return days;
  }, [month, year, transactions]);

	const selectedDateInfo = useMemo<CalendarDay | null | undefined>(() => {
    if (!selectedDate) return null;
    return calendarDays.find(d => d.date === selectedDate);
  }, [selectedDate, calendarDays]);

	return {
		calendarDays,
		transactions,
		error: queryTransactions.error,
		loading: queryTransactions.isLoading,
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