import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import type { FinancialActivity } from "../types/FinancialActivity";

function useActivities() {
	const today = new Date();

	const [month, setMonth] = useState(today.getMonth());
	const [year, setYear] = useState(today.getFullYear());

	const { account } = useAccountContext();

	const accountService = useAccountService();
	
	const queryActivities = useQuery({
		queryKey: [
			'activities',
			account?.id,
			month,
			year
		],
		queryFn: () => accountService.getActivities(account?.id ?? '', { month: 8, year: 2026 }),
		retry: 3
	});

	const activitiesData = useMemo(() => queryActivities.data ?? null, [queryActivities.data]);

	const activities = useMemo<FinancialActivity[]>(() => {
		let financialActivity: FinancialActivity[] = [];

		activitiesData?.transactions.forEach(activity => {
			financialActivity.push({
				id: activity.id,
				title: activity.description,
				amount: activity.amount,
				type: activity.type,
				isRecurrent: activity.recurrenceId ? true : false,
				category: activity.category,
				wallet: activity.wallet,
				status: activity.status,
				registeredAt: activity.registeredAt,
				icon: activity.category.icon
			});
		});

		activitiesData?.recurrences.forEach(activity => {
			financialActivity.push({
				id: activity.id,
				title: activity.description,
				amount: activity.amount,
				type: activity.type,
				isRecurrent: true,
				category: activity.category,
				wallet: activity.wallet,
				status: undefined,
				registeredAt: activity.lastExecutionDate,
				icon: activity.category.icon
			});
		});

		financialActivity.sort((a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime());
		return financialActivity;
	}, [activitiesData]);

	const transactions = useMemo(() => {
		let activitiesTransactions: FinancialActivity[] = [];

		activitiesData?.transactions.forEach(activity => {
			activitiesTransactions.push({
				id: activity.id,
				title: activity.description,
				amount: activity.amount,
				type: activity.type,
				isRecurrent: activity.recurrenceId ? true : false,
				category: activity.category,
				wallet: activity.wallet,
				status: activity.status,
				registeredAt: activity.registeredAt,
				icon: activity.category.icon
			});
		});

		return activitiesTransactions;
	}, [activitiesData?.transactions]);

	const transactionsPending = useMemo(() => {
		let activitiesTransactions: FinancialActivity[] = [];

		activitiesData?.transactions.forEach(activity => {
			if (activity.status === 'PENDING') {
					activitiesTransactions.push({
					id: activity.id,
					title: activity.description,
					amount: activity.amount,
					type: activity.type,
					isRecurrent: activity.recurrenceId ? true : false,
					category: activity.category,
					wallet: activity.wallet,
					status: activity.status,
					registeredAt: activity.registeredAt,
					icon: activity.category.icon
				});
			}
		});

		return activitiesTransactions ?? [];
	}, [activitiesData?.transactions]);

	const recurrences = useMemo(() => {
		let activitiesRecurrences: FinancialActivity[] = [];

		activitiesData?.recurrences.forEach(activity => {
			activitiesRecurrences.push({
				id: activity.id,
				title: activity.description,
				amount: activity.amount,
				type: activity.type,
				isRecurrent: true,
				category: activity.category,
				wallet: activity.wallet,
				status: undefined,
				registeredAt: activity.lastExecutionDate,
				icon: activity.category.icon
			});
		});

		return activitiesRecurrences;
	}, [activitiesData?.recurrences]);

	return {
		activities,
		transactions,
		recurrences,
		transactionsPending
	}
}

export default useActivities;