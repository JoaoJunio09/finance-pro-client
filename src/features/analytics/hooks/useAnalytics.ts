import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import { useMemo } from "react";

function useAnalytics() {
	const { account } = useAccountContext();

	const accountService = useAccountService();

	const queryActivities = useQuery({
		queryKey: [
			'activities',
			account?.id
		],
		queryFn: () => accountService.getActivities(account?.id ?? '', {}),
		enabled: !!account?.id,
		retry: 3
	});

	const activities = useMemo(() => queryActivities.data, [queryActivities.data]);

	return {
		activities
	}
}

export default useAnalytics;