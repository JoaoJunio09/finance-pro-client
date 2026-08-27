import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { Filters } from "../types/filter";

function useRecurrences() {
	const [filters, setFilters] = useState<Filters>({ status: 'ALL', frequency: 'ALL', type: 'ALL' });

	const { account } = useAccountContext();

	const recurrenceService = useRecurrenceService();

	const queryClient = useQueryClient();

	const recMutationConfirm = useMutation({
		mutationFn: (id: string) => recurrenceService.confirm(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recurrences', account?.id] });
			showToast({
				type: 'success',
				title: 'Confirmado',
				message: 'Recorrência confirmada com sucesso!!'
			});
		}
	});

	const queryAllRecurrences = useQuery({
		queryKey: [
			'recurrences',
			account?.id
		],
		queryFn: () => recurrenceService.getOverview(account?.id),
		enabled: !!account?.id,
		retry: 3
	});

	function confirm(recurrence: RecurrenceResponse) {
		recMutationConfirm.mutate(recurrence.id);
	}

	const allRecurrences = useMemo(() => queryAllRecurrences.data, [queryAllRecurrences.data]);

	return {
		allRecurrences,
		confirm,
		filters,
		setFilters
	}
}

export default useRecurrences;