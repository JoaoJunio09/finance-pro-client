import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import type { AllRecurrenceResponse } from "../../../models/recurrence/AllRecurrenceResponse";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceSort } from "../../../types/RecurrenceSort";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import useDebounce from "../../../hooks/useDebounce";

function useRecurrences(onSuccess: () => void) {
	const [search, setSearch] = useState('');
	const [type, setType] = useState<RecurrenceType | undefined>(undefined);
	const [frequencyType, setFrequencyType] = useState<FrequencyType | undefined>(undefined);
	const [executionType, setExecutionType] = useState<ExecutionType | undefined>(undefined);
	const [sort, setSort] = useState<RecurrenceSort>('NEAREST_DATE');
	
	const { account } = useAccountContext();
	const queryClient = useQueryClient();
	
	const recurrenceService = useRecurrenceService();

	const debouncedSearch = useDebounce(search, 1000);

	console.log(debouncedSearch)

	const queryRecurrences = useQuery({
		queryKey: [
			'recurrences',
			account?.id,
			type,
			frequencyType,
			executionType,
			sort,
			debouncedSearch
		],
		queryFn: ({ signal }) => recurrenceService.getAll({
			accountId: account?.id,
			type: type,
			frequencyType: frequencyType,
			executionType: executionType,
			sort: sort,
			search: debouncedSearch ?? undefined,
			signal
		}),
		enabled: Boolean(account?.id) || !!debouncedSearch,
		placeholderData: keepPreviousData,
		retry: 3
	});

	const queryOverview = useQuery({
		queryKey: [
			'recurrencesOverview',
			account?.id,
			type,
			frequencyType,
			executionType,
			sort
		],
		queryFn: () => recurrenceService.getOverview(account?.id),
		enabled: Boolean(account?.id) || !!debouncedSearch,
		placeholderData: keepPreviousData,
		retry: 3
	});

	const recurrenceMutationDelete = useMutation({
		mutationFn: (id: string) => recurrenceService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['recurrences'] });
			queryClient.invalidateQueries({ queryKey: ['recurrencesOverview'] });

			showToast({
				title: 'Excluido com sucesso',
				message: 'A Recorrência foi removida da sua conta',
				type: 'success'
			});

			onSuccess();
		},
		onError: () => {
			showToast({
				title: 'Erro ao remover',
				message: 'Não foi possível remover Recorrência',
				type: 'error'
			});
		}
	});

	function clearFilters() {
		setType(undefined);
		setFrequencyType(undefined);
		setExecutionType(undefined);
		setSort('NEAREST_DATE');
	}

	function deleteRecurrence(id: string) {
		recurrenceMutationDelete.mutate(id);
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
		recurrences: queryRecurrences.data ?? [],
		isLoading: queryOverview.isLoading || queryRecurrences.isLoading,
		isFetching: queryOverview.isFetching || queryRecurrences.isFetching,
		isLoadingSave: recurrenceMutationDelete.isPending,
		search,
		setSearch,
		setType,
		type,
		setFrequencyType,
		frequencyType,
		setExecutionType,
		executionType,
		setSort,
		sort,
		activeFiltersCount,
		clearFilters,
		deleteRecurrence
	}
}

export default useRecurrences;