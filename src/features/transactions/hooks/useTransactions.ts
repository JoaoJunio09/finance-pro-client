import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useTransactionService from "../../../hooks/useTransactionService";
import type { SummaryCard } from "../types/SummaryCard";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

function useTransactions() {
	const now = new Date();
	const month = now.getMonth();
	const year = now.getFullYear();
	
	const [currentMonth, setCurrentMonth] = useState(new Date(year, month, 1));

	const [selectedTx, setSelectedTx] = useState<TransactionResponse | null>(null);
	const [search, setSearch] = useState('');

	const { account } = useAccountContext();

	const transactionService = useTransactionService(); 

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			account?.id,
			currentMonth
		],
		queryFn: () => transactionService.getAll({
			accountId: account?.id,
			month: currentMonth.getMonth()+1,
			year: currentMonth.getFullYear()
		}),
		retry: 3,
		placeholderData: keepPreviousData
	});

	const transactions = useMemo(() => queryTransactions.data ?? [], [queryTransactions.data]);

	const summaryCard = useMemo<SummaryCard>(() => {
    let pendingCount = 0;
    let pendingTotal = 0;

    transactions.forEach((tx) => {
      if (tx.status === 'PENDING') {
        pendingCount += 1;
        pendingTotal += tx.amount;
      }
    });

    return {
			income: account?.income ?? 0,
			expense: account?.expenses ?? 0,
			netIncome: account?.netIncome ?? 0,
			pendingCount: pendingCount,
			pendingTotal: pendingTotal
		}
  }, [transactions]);

	return {
		transactions,
		summaryCard,
		currentMonth,
		setCurrentMonth,
		selectedTx,
		setSelectedTx,
		search,
		setSearch
	}
}

export default useTransactions;