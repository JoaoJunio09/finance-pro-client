import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useTransactionService from "../../../hooks/useTransactionService";
import type { SummaryCard } from "../types/SummaryCard";

function useTransactions() {
	const date = new Date();

	const [month, setMonth] = useState(date.getMonth()+1);
	const [year, setYear] = useState(date.getFullYear());

	const [search, setSearch] = useState('');

	const { account } = useAccountContext();

	const transactionService = useTransactionService(); 

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			account?.id,
			month,
			year
		],
		queryFn: () => transactionService.getAll({
			accountId: account?.id
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
		search,
		setSearch
	}
}

export default useTransactions;