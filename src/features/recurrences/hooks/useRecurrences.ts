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
	const [type, setType] = useState<RecurrenceType | undefined>();
	const [frequencyType, setFrequencyType] = useState<FrequencyType | undefined>();
	const [executionType, setExecutionType] = useState<ExecutionType | undefined>();
	const [sort, setSort] = useState<RecurrenceSort | undefined>();
	
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
		setSort(undefined);
	}

	const allRecurrences = useMemo<AllRecurrenceResponse | null>(() => queryOverview.data ?? null, [queryOverview.data]);

	return {
		allRecurrences,
		loading: queryOverview.isFetching,
		setType,
		setFrequencyType,
		setExecutionType,
		setSort,
		clearFilters
	}
}

export default useRecurrences;