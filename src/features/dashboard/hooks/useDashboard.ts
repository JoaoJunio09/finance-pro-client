import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";
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

	const queryAccount = useQuery({
		queryKey: ['account'],
		queryFn: () => accountService.getByUsername(username ?? ''),
		retry: 2
	});
	
	const account = useMemo<AccountResponse | undefined>(() => {
		if (!queryAccount.data) return;
		return {
			id: queryAccount.data.id,
			currentBalance: queryAccount.data?.currentBalance,
			income: queryAccount.data?.income,
			expenses: queryAccount.data?.expenses,
			netIncome: queryAccount.data?.netIncome,
			biggestExpense: {
				value: queryAccount.data?.biggestExpense.value,
				category: queryAccount.data?.biggestExpense.category,
			},
			wallets: queryAccount.data.wallets
		}
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
				title: account?.biggestExpense.category ?? 'Nenhum',
				type: 'max_expense',
				value: account?.biggestExpense.value ?? 0,
				subtitle: 'Maior gasto'
			},
		]
	}, [account]);

	return {
		account: queryAccount.data ?? null,
		error: queryAccount.error,
		loading: queryAccount.isLoading,
		metrics,
	}
}

export default useDashboard;