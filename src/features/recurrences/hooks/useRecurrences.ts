import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceSort } from "../../../types/RecurrenceSort";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import type { AllRecurrenceResponse } from "../../../models/recurrence/AllRecurrenceResponse";

function useRecurrences() {
	const [type, setType] = useState<RecurrenceType | undefined>(undefined);
	const [frequencyType, setFrequencyType] = useState<FrequencyType | undefined>(undefined);
	const [executionType, setExecutionType] = useState<ExecutionType | undefined>(undefined);
	const [sort, setSort] = useState<RecurrenceSort>('NEAREST_DATE');
	
	const { account } = useAccountContext();
	
	const recurrenceService = useRecurrenceService();

	const queryOverview = useQuery({
		queryKey: [
			'recurrencesOverview',
			account?.id,
			type,
			frequencyType,
			executionType,
			sort
		],
		queryFn: () => recurrenceService.getOverview({
			accountId: account?.id,
			type: type,
			frequencyType: frequencyType,
			executionType: executionType,
			sort: sort
		}),
		enabled: Boolean(account?.id)
			|| Boolean(type)
			|| Boolean(frequencyType)
			|| Boolean(executionType)
			|| Boolean(sort),
		retry: 1
	});

	function clearFilters() {
		setType(undefined);
		setFrequencyType(undefined);
		setExecutionType(undefined);
		setSort('NEAREST_DATE');
	}

	const allRecurrences = useMemo<AllRecurrenceResponse | null>(() => queryOverview.data ?? null, [queryOverview.data]);

	const activeFiltersCount = useMemo(() => {
		let count = 0;

		if (type) count++;
		if (frequencyType) count++;
		if (executionType) count++;
		if (sort !== 'NEAREST_DATE') count++;

		return count;
	}, [type, frequencyType, executionType, sort]);

	return {
		allRecurrences,
		loading: queryOverview.isFetching,
		setType,
		type,
		setFrequencyType,
		frequencyType,
		setExecutionType,
		executionType,
		setSort,
		sort,
		activeFiltersCount,
		clearFilters
	}
}

export default useRecurrences;