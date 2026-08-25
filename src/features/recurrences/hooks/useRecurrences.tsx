import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import { useMemo } from "react";

function useRecurrences() {
	const { account } = useAccountContext();

	const recurrenceService = useRecurrenceService();

	const queryAllRecurrences = useQuery({
		queryKey: [
			'recurrences',
			account?.id
		],
		queryFn: () => recurrenceService.getOverview(account?.id),
		enabled: !!account?.id,
		retry: 3
	});

	const allRecurrences = useMemo(() => queryAllRecurrences.data, [queryAllRecurrences.data]);

	return {
		allRecurrences
	}
}

export default useRecurrences;