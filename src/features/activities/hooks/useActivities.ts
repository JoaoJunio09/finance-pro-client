import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import type { FinancialActivity } from "../types/FinancialActivity";
import { buildLocalDate, parseLocalDateParts } from "../../../utils/FormatDate";

function useActivities() {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const { account } = useAccountContext();
	const accountService = useAccountService();

	const queryActivities = useQuery({
		queryKey: [
			'activities',
			account?.id,
			currentMonth.getMonth(),
			currentMonth.getFullYear()
		],
		queryFn: () => accountService.getActivities(account?.id ?? '', {
			month: currentMonth.getMonth() + 1, // backend espera 1-12, JS Date usa 0-11
			year: currentMonth.getFullYear()
		}),
		retry: 3
	});

	const activitiesData = useMemo(() => queryActivities.data ?? null, [queryActivities.data]);

	// chave "recorrenciaId-ano-mes-dia" pra toda transação que já nasceu de uma recorrência
	const executedRecurrenceKeys = useMemo(() => {
		const keys = new Set<string>();
		activitiesData?.transactions.forEach(t => {
			if (t.recurrenceId) {
				const day = new Date(t.registeredAt);
				keys.add(`${t.recurrenceId}-${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`);
			}
		});
		return keys;
	}, [activitiesData?.transactions]);

	const activities = useMemo<FinancialActivity[]>(() => {
		let financialActivity: FinancialActivity[] = [];

		// 1. Transações (inclui as que nasceram de recorrência, já com status real)
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

		// 2. Recorrências: projeta a ocorrência dessa recorrência para o mês em exibição
		const viewedYear = currentMonth.getFullYear();
		const viewedMonth = currentMonth.getMonth();

		activitiesData?.recurrences.forEach(activity => {
			const nextExec = parseLocalDateParts(activity.nextExecutionDate);

			// não projeta pra meses anteriores à primeira execução prevista dessa recorrência
			// (meses passados já têm a Transaction real, tratada no loop acima)
			const isBeforeNext =
				viewedYear < nextExec.year ||
				(viewedYear === nextExec.year && viewedMonth < nextExec.month);
			if (isBeforeNext) return;

			const projectedDate = buildLocalDate(viewedYear, viewedMonth, nextExec.day);
			const projKey = `${activity.id}-${viewedYear}-${viewedMonth}-${nextExec.day}`;

			// já existe transação efetivada pra essa ocorrência nesse mês -> não duplica
			if (executedRecurrenceKeys.has(projKey)) return;

			financialActivity.push({
				id: activity.id,
				title: activity.description,
				amount: activity.amount,
				type: activity.type,
				isRecurrent: true,
				category: activity.category,
				wallet: activity.wallet,
				status: undefined, // ainda não efetivada -> ActivityListItem trata como "Prevista"
				registeredAt: projectedDate,
				icon: activity.category.icon
			});
		});

		financialActivity.sort((a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime());
		return financialActivity;
	}, [activitiesData, executedRecurrenceKeys, currentMonth]);

	// transactions, transactionsPending e recurrences continuam exatamente como estavam
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
		transactionsPending,
		currentMonth,
		setCurrentMonth
	}
}

export default useActivities;