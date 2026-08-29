import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import { useMemo } from "react";

function useAnalytics() {
	const { account } = useAccountContext();

	const accountService = useAccountService();

	const queryAnalytics = useQuery({
		queryKey: [
			'activities',
			account?.id
		],
		queryFn: () => accountService.getAnalytics(account?.id ?? ''),
		enabled: !!account?.id,
		retry: 3
	});

	const analytics = useMemo(() => queryAnalytics.data, [queryAnalytics.data]);

	return {
		analytics
	}
}

export default useAnalytics;