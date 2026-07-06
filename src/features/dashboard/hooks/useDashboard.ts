import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";
import useTransactionService from "../../../hooks/useTransactionService";

function useDashboard() {
	const { username } = useAuthContext();

	const accountService = useAccountService();
	const transactionService = useTransactionService();

	const queryAccount = useQuery({
		queryKey: [
			'account',
			username
		],
		queryFn: () => accountService.getByUsername(username ?? ''),
		enabled: !!username
	});

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			queryAccount.data?.id
		],
		queryFn: () => transactionService.getAll({ accountId: queryAccount.data?.id }),
		enabled: !!queryAccount.data?.id
	});

	return {
		account: queryAccount.data ?? null,
		transactions: queryTransactions.data?.transactions ?? [],
		error: queryAccount.error,
		loading: queryAccount.isLoading
	}
}

export default useDashboard;