import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";

function useDashboard() {
	const auth = useAuthContext();
	const { setAccountByUser, account } = useAccountContext();

	const accountService = useAccountService();

	useEffect(() => {
		const fetchAccount = async () => {
			const data = await accountService.getByUsername(auth.username ?? '');
			setAccountByUser(data);
		}
		fetchAccount();
	}, [auth.username, account]);

	const queryDashboard = useQuery({
		queryKey: [
			'dashboard',
			account?.id
		],
		queryFn: () => accountService.getDashboard(account?.id ?? '')
	});

	return {
		dashboard: queryDashboard.data ?? null,
		name: auth.fullName
	}
}

export default useDashboard;