import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";
import useWalletService from "../../../hooks/useWalletService";

function useDashboard() {
	const [walletSelectedId, setWalletSelectedId] = useState('');

	const { username } = useAuthContext();

	const accountService = useAccountService();
	const walletService = useWalletService();

	const queryAccount = useQuery({
		queryKey: ['account'],
		queryFn: () => accountService.getByUsername(username ?? ''),
		enabled: !!username,
		retry: 3
	});

	const queryDashboardOverview = useQuery({
		queryKey: [
			'dashboard',
			'transactions',
			'wallets',
			'recurrences',
			queryAccount.data?.id
		],
		queryFn: () => accountService.getDashboardOverview(queryAccount.data?.id ?? ''),
		enabled: Boolean(queryAccount.data?.id),
		retry: 3
	});

	const queryWalletSelectedDetails = useQuery({
		queryKey: [
			'walletSelectedDetails',
			queryAccount.data?.id,
			walletSelectedId
		],
		queryFn: () => walletService.details(queryAccount.data?.id ?? '', walletSelectedId),
		enabled: Boolean(queryAccount.data?.id) && Boolean(walletSelectedId),
		retry: 3
	});

	function selectWalletDetails(id: string) {
		setWalletSelectedId(id);
	}

	return {
		account: queryAccount.data ?? null,
		dashboard: queryDashboardOverview.data ?? null,
		walletSelected: queryWalletSelectedDetails.data ?? null,
		selectWalletDetails
	}
}

export default useDashboard;