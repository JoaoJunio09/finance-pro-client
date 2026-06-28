import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { AccountResponse } from "../../../models/account/AccountResponse";

export interface MetricData {
  title: string;
  value: number | string;
  type: 'income' | 'expense' | 'net' | 'max_expense';
  subtitle?: string;
}

function useDashboard() {
	const { username } = useAuthContext();

	const accountService = useAccountService();
	const transactionService = useTransactionService();

	const queryAccount = useQuery({
		queryKey: ['account'],
		queryFn: () => accountService.getByUsername(username ?? ''),
		retry: 3
	});
	
	const account = useMemo<AccountResponse | undefined>(() => {
		if (!queryAccount.data) return;
		return queryAccount.data
	}, [queryAccount.data]);

	const metrics = useMemo<MetricData[]>(() => {
		return [
			{
				title: 'Entrou',
				type: 'income',
				value: account?.income ?? 0,
				subtitle: 'Receitas/Entradas'
			},
			{
				title: 'Saiu',
				type: 'expense',
				value: account?.expenses ?? 0,
				subtitle: 'Despesas/Saídas'
			},
			{
				title: 'Sobrou',
				type: 'net',
				value: account?.netIncome ?? 0,
				subtitle: 'Receitas menos Despesas'
			},
			{
				title: account?.biggestExpense.category.name ?? 'Nenhum',
				type: 'max_expense',
				value: account?.biggestExpense.value ?? 0,
				subtitle: 'Maior gasto'
			},
		]
	}, [account]);

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			account?.id
		],
		queryFn: () => transactionService.getAll({ accountId: account?.id }),
		enabled: !!account?.id,
		retry: 3
	});

	const queryOverview = useQuery({
		queryKey: [
			'overview',
			account?.id
		],
		queryFn: () => transactionService.overview(account?.id),
		enabled: !!account?.id
	});

	return {
		account: queryAccount.data ?? null,
		errorAccount: queryAccount.error,
		loadingAccount: queryAccount.isLoading,
		transactions: queryTransactions.data ?? [],
		errorTransactions: queryTransactions.error,
		loadingTransactions: queryTransactions.isLoading,
		metrics,
		overview: queryOverview.data ?? null
	}
}

export default useDashboard;