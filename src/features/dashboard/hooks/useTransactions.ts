import { useQuery } from "@tanstack/react-query";
import useTransactionService from "../../../hooks/useTransactionService";
import type { AccountResponse } from "../../../models/account/AccountResponse";

function useTransactions(account: AccountResponse | null) {
	const transactionService = useTransactionService();

	const queryTransactions= useQuery({
		queryKey: [
			'transactions',
			account?.id
		],
		queryFn: () => transactionService.getAll({ accountId: account?.id }),
		enabled: !!account?.id,
		retry: 3
	});

	return {
		transactions: queryTransactions.data ?? [],
		error: queryTransactions.error,
		loading: queryTransactions.isLoading
	}
}

export default useTransactions;