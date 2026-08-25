import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import { useMemo, useState } from "react";
import type { Filters } from "../types/filter";

function useRecurrences() {
	const [filters, setFilters] = useState<Filters>({ status: 'ALL', frequency: 'ALL', type: 'ALL' });

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
		allRecurrences,
		filters,
		setFilters
	}
}

export default useRecurrences;