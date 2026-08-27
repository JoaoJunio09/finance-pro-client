import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useWalletService from "../../../hooks/useWalletService";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { CategoryType } from "../../../types/CategoryType";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import type { RecFormData } from "../types/RecFormData";
import type { RecurrenceRequest } from "../../../models/recurrence/RecurrenceRequest";
import showToast from "../../../components/ui/Toast/Toast";

function useRecurrenceModal(
	recurrence: RecurrenceResponse | null,
	initialType: RecurrenceType,
	onClose: () => void
) {
	const [categoryType, setCategoryType] = useState<CategoryType>(initialType === 'CREDIT' ? 'CREDIT' : 'DEBIT');

	const { account } = useAccountContext();

	const now = new Date();
	
	const [form, setForm] = useState<RecFormData>({
		id: '',
		amount: '',
		description: '',
		type: initialType ?? 'DEBIT',
		frequencyType: 'MONTHLY',
		executionType: 'AUTOMATIC',
		status: 'ACTIVE',
		dayOne: now.getDate().toString(),
		dayTwo: undefined,
		monthOfTheYear: undefined,
		dayOneAlreadyOccurred: false,
		dayTwoAlreadyOccurred: false,
		monthOfTheYearAlreadyOccurred: false,
		startDate: '',
		endDate: '',
		accountId: account?.id ?? ''
	});

	const recurrenceService = useRecurrenceService();
	const categoryService = useCategoryService();
	const walletService = useWalletService();

	const queryClient = useQueryClient();

	const recMutationSave = useMutation({
		mutationFn: (data: RecurrenceRequest) => recurrenceService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recurrences', account?.id] });
			showToast({
				title: 'Adicionado',
				message: 'Recorrência adicionada com sucesso ✅',
				type: 'success'
			});
			onClose();
		}
	});

	const recMutationUpdate = useMutation({
		mutationFn: (data: RecurrenceRequest) => recurrenceService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recurrences', account?.id] });
			showToast({
				title: 'Atualizado',
				message: 'Recorrência atualizada com sucesso ✅',
				type: 'success'
			});
			onClose();
		}
	});

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			categoryType
		],
		queryFn: () => categoryService.getAll({ type: categoryType }),
		retry: 3,
		placeholderData: keepPreviousData
	});

	const queryWallets = useQuery({
		queryKey: [
			'wallets',
			account?.id
		],
		queryFn: () => walletService.getAll({ accountId: account?.id }),
		retry: 3
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value, type } = e.target;

		if (name === 'amount') {
			setForm((prev) => ({
				...prev,
				amount: formatCurrencyInput(value),
			}));
			return;
		}

		if (name === 'frequencyType') {
			setForm((prev) => ({
				...prev,
				dayOneAlreadyOccurred: false,
				dayTwoAlreadyOccurred: false,
				monthOfTheYearAlreadyOccurred: false
			}));
		}

		setForm((prev) => ({
			...prev,
			[name]:
				type === 'checkbox'
					? (e.target as HTMLInputElement).checked
					: value,
		}));
	}

	function changeType(type: RecurrenceType) {
		setForm((prev) => ({ ...prev, type: type }));
		setCategoryType(type === 'CREDIT' ? 'CREDIT' : 'DEBIT');
	}

	function changeExecutionType(executionType: ExecutionType) {
		setForm((prev) => ({ ...prev, executionType: executionType }));
	}

	function changeCustomSelectCategory(category: CategoryResponse) {
		setForm((prev) => ({...prev, category: category }));
	}

	function changeCustomSelectWallet(wallet: WalletResponse) {
		setForm((prev) => ({...prev, wallet: wallet }));
	}

	function saveOrUpdate() {
		if (!account?.id || !form.category?.id || !form.wallet?.id) {
			return;
		}

		const request: RecurrenceRequest = {
			id: form.id,
			amount: Number(form?.amount),
			type: form.type,
			frequencyType: form.frequencyType,
			executionType: form.executionType,
			status: form.status,
			dayOne: Number(form.dayOne),
			dayTwo: form.dayTwo ? Number(form.dayTwo) : undefined,
			monthOfTheYear: form.monthOfTheYear ? Number(form.monthOfTheYear) : undefined,
			description: form.description,
			dayOneAlreadyOccurred: form.dayOneAlreadyOccurred,
			dayTwoAlreadyOccurred: form.dayTwoAlreadyOccurred,
			monthOfTheYearAlreadyOccurred: form.monthOfTheYearAlreadyOccurred,
			categoryId: form.category?.id,
			walletId: form.wallet?.id,
			accountId: account?.id
		}

		let isUpdate = recurrence?.id;

		if (isUpdate) {
			recMutationUpdate.mutate(request);
		}
		else {
			recMutationSave.mutate(request);
		}
	}

	const categories = useMemo(() => queryCategories.data ?? [], [queryCategories.data]);
	const wallets = useMemo(() => queryWallets.data ?? [], [queryWallets.data]);

	useEffect(() => {
		if (!recurrence) return;

		setCategoryType(recurrence.type === 'CREDIT' ? 'CREDIT' : 'DEBIT');

		setForm({
			id: recurrence.id,
			amount: recurrence.amount.toString(),
			description: recurrence.description,
			type: recurrence.type,
			frequencyType: recurrence.frequencyType,
			executionType: recurrence.executionType,
			status: recurrence.status,
			dayOne: recurrence.dayOne.toString(),
			dayTwo: recurrence.dayTwo ? recurrence.dayTwo.toString() : undefined,
			monthOfTheYear: recurrence.monthOfTheYear ? recurrence.monthOfTheYear.toString() : undefined,
			dayOneAlreadyOccurred: false,
			dayTwoAlreadyOccurred: false,
			monthOfTheYearAlreadyOccurred: false,
			startDate: '',
			endDate: '',
			category: recurrence.category,
			wallet: recurrence.wallet,
			accountId: account?.id ?? ''
		});
	}, [recurrence]);

	useEffect(() => {
		if (recurrence || categories.length === 0) return;

		setForm((prev) => ({
			...prev,
			category: categories[0],
		}));
	}, [recurrence, categories]);
	
	useEffect(() => {
		if (recurrence || !initialType) return;

		setCategoryType(initialType === 'CREDIT' ? 'CREDIT' : 'DEBIT');
		setForm((prev) => ({ ...prev, type: initialType }));
	}, [initialType, recurrence]);
	return {
		form,
		handleOnChange,
		changeType,
		changeExecutionType,
		changeCustomSelectCategory,
		changeCustomSelectWallet,
		categories,
		wallets,
		saveOrUpdate,
		isSaving: recMutationSave.isPending || recMutationUpdate.isPending
	}
}

export default useRecurrenceModal;