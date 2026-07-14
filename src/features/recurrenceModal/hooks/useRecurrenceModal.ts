import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useWalletService from "../../../hooks/useWalletService";
import type { RecurrenceRequest } from "../../../models/recurrence/RecurrenceRequest";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import { formatCurrencyInput, formatCurrencyToAPI } from "../../../utils/FormatCurrency";
import type { RecurrenceFormData } from "../types/RecurrenceFormData";
import type { ExecutionType } from "../../../types/ExecutionType";

function useRecurrenceModal(
	onClose: () => void,
	recurrence: RecurrenceResponse | null
) {
	const [inputsError, setInputsError] = useState<Record<string, string>>({});
	const [form, setForm] = useState<RecurrenceFormData>({
		id: null,
		amount: '',
		description: '',
		type: 'CREDIT',
		frequencyType: 'MONTHLY',
		executionType: 'AUTOMATIC',
		recDayOne: '',
		recDayTwo: '',
		month: '',
		dayOneAlreadyOccurred: false,
		dayTwoAlreadyOccurred: false,
		monthOfTheYearAlreadyOccurred: false,
		categoryId: '',
		walletId: '',
	});

	const { account } = useAccountContext();
	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const categoryService = useCategoryService();
	const recurrenceService = useRecurrenceService();

	useEffect(() => {
		if (!recurrence) return;
		
		setForm({
			id: recurrence.id,
			amount: formatCurrencyInput((recurrence.amount * 100).toString()),
			description: recurrence.description,
			type: recurrence.type,
			frequencyType: recurrence.frequencyType,
			executionType: recurrence.executionType,
			recDayOne: recurrence.dayOne.toString(),
			recDayTwo: recurrence.dayTwo ? recurrence.dayTwo.toString() : '',
			month: recurrence.monthOfTheYear ? recurrence.monthOfTheYear.toString() : '',
			dayOneAlreadyOccurred: false,
			dayTwoAlreadyOccurred: false,
			monthOfTheYearAlreadyOccurred: false,
			categoryId: recurrence.category.id,
			walletId: recurrence.wallet.id
		});
	}, [recurrence]);

	const queryWallets = useQuery({
		queryKey: [
			'wallets',
			account?.id
		],
		queryFn: () => walletService.getAll({ accountId: account?.id }),
		enabled: Boolean(account?.id),
		retry: 1
	});

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			form.type,
		],
		queryFn: () => categoryService.getAll({ type: form.type }),
		retry: 3
	});

	const recurrenceMutationSave = useMutation({
		mutationFn: (data: RecurrenceRequest) => recurrenceService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['recurrences'] });
			queryClient.invalidateQueries({ queryKey: ['recurrencesOverview'] });

			if (form.type === 'CREDIT') {
				showToast({
					title: 'Recorrência adicionada.',
					message: 'Receita recorrente adicionada com sucesso à sua conta',
					type: 'success'
				});
			}
			else {
				showToast({
					title: 'Recorrência adicionada.',
					message: 'Despesa recorrente adicionada com sucesso à sua conta',
					type: 'success'
				});
			}

			clearErrors();
			resetForm();
			onClose();
		},
		onError: () => {
			if (form.dayOneAlreadyOccurred || form.dayTwoAlreadyOccurred || form.monthOfTheYearAlreadyOccurred && form.executionType === 'MANUALLY') {
				showToast({
					title: 'Erro ao Salvar',
					message: 'Para marcar que a recorrência já aconteceu, o tipo de execução deve ser automática. Se precisar, mude depois.',
					type: 'error'
				});
			}
			else {
				showToast({
					title: 'Erro ao Salvar',
					message: 'Não foi possível concluir a operação',
					type: 'error'
				});
			}
		}
	});

	const recurrenceMutationUpdate = useMutation({
		mutationFn: (data: RecurrenceRequest) => recurrenceService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['recurrences'] });
			queryClient.invalidateQueries({ queryKey: ['recurrencesOverview'] });

			if (form.type === 'CREDIT') {
				showToast({
					title: 'Recorrência atualizada.',
					message: 'Receita recorrente atualizada com sucesso à sua conta',
					type: 'success'
				});
			}
			else {
				showToast({
					title: 'Recorrência atualizada.',
					message: 'Despesa recorrente atualizada com sucesso à sua conta',
					type: 'success'
				});
			}

			clearErrors();
			resetForm();
			onClose();
		},
		onError: () => {
			if (form.dayOneAlreadyOccurred || form.dayTwoAlreadyOccurred || form.monthOfTheYearAlreadyOccurred && form.executionType === 'MANUALLY') {
				showToast({
					title: 'Erro ao atualizar',
					message: 'Para marcar que a recorrência já aconteceu, o tipo de execução deve ser automática. Se precisar, mude depois.',
					type: 'error'
				});
			}
			else {
				showToast({
					title: 'Erro ao atualizar',
					message: 'Não foi possível concluir a operação',
					type: 'error'
				});
			}
		}
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;

		if (name === 'amount') {
			const formattedValue = formatCurrencyInput(value);
			setForm((prev) => ({ ...prev, amount: formattedValue }));

			const numericAmount = formatCurrencyToAPI(formattedValue);
			if (numericAmount > 0) {
				removeError('amount');
			}
			return;
		}

		if (name === 'recDayOne') {
			setForm((prev) => ({ ...prev, recDayOne: value, dayOneAlreadyOccurred: false }));
			if (value.trim() !== '') removeError('recDayOne');
			return;
		}

		if (name === 'recDayTwo') {
			setForm((prev) => ({ ...prev, recDayTwo: value, dayTwoAlreadyOccurred: false }));
			if (value.trim() !== '') removeError('recDayTwo');
			return;
		}

		if (name === 'month') {
			setForm((prev) => ({
				...prev,
				month: value,
				dayOneAlreadyOccurred: false,
				monthOfTheYearAlreadyOccurred: false
			}));
			if (value.trim() !== '') removeError('month');
			return;
		}

		setForm((prev) => ({ ...prev, [name]: value }));

		if (value && value.trim() !== '') {
			const errorKey = name === 'walletId' ? 'wallet' : name === 'categoryId' ? 'category' : name;
			removeError(errorKey);
		}
	}

	function setType(type: RecurrenceType) {
		setForm((prev) => ({
			...prev,
			type: type
		}));
	}

	function setFrequencyType(frequencyType: FrequencyType) {
		setForm((prev) => ({
			...prev,
			frequencyType: frequencyType
		}));
	}

	function setExecutionType(executionType: ExecutionType) {
		setForm((prev) => ({
			...prev,
			executionType: executionType
		}));
	}

	function setAlreadyOccurred(
		field: 'dayOneAlreadyOccurred' | 'dayTwoAlreadyOccurred' | 'monthOfTheYearAlreadyOccurred',
		value: boolean
	) {
		setForm((prev) => ({
			...prev,
			[field]: value
		}));
	}

	function removeError(field: string) {
		setInputsError(prev => {
			const newErrors = { ...prev };
			delete newErrors[field];
			return newErrors;
		});
	}

	function clearErrors() {
		setInputsError({});
	}

	function resetForm() {
		setForm({
			id: null,
			amount: '',
			description: '',
			executionType: 'AUTOMATIC',
			type: 'CREDIT',
			frequencyType: 'MONTHLY',
			recDayOne: '',
			recDayTwo: '',
			month: '',
			dayOneAlreadyOccurred: false,
			dayTwoAlreadyOccurred: false,
			monthOfTheYearAlreadyOccurred: false,
			categoryId: '',
			walletId: '',
		});
	}

	function saveOrUpdate() {
		if (!account) {
			return;
		}
		
		const localErrors: Record<string, string> = {};

		if (!form.amount || form.amount === '' || formatCurrencyToAPI(form.amount) <= 0) {
			localErrors['amount'] = 'Digite um valor';
		}

		if (!form.description || form.description === '') {
			localErrors['description'] = 'Preencha a descrição';
		}

		if (!form.type) {
			localErrors['recurrenceType'] = 'Escolha o tipo da Recorrência';
		}

		if (!form.frequencyType) {
			localErrors['frequencyType'] = 'Escolha a frequência da Recorrência';
		}

		if (!form.walletId || form.walletId === '') {
			localErrors['wallet'] = 'Selecione uma carteira';
		}

		if (!form.categoryId || form.categoryId === '') {
			localErrors['category'] = 'Selecione uma categoria';
		}

		setInputsError(localErrors);

		if (Object.keys(localErrors).length > 0 || !form.walletId || !form.frequencyType || !form.type) {
			return;
		}

		let recurrence:RecurrenceRequest = {
			id: form.id,
			amount: formatCurrencyToAPI(form.amount),
			description: form.description,
			executionType: form.executionType,
			type: form.type,
			frequencyType: form.frequencyType,
			categoryId: form.categoryId,
			dayOneAlreadyOccurred: form.dayOneAlreadyOccurred,
			dayTwoAlreadyOccurred: form.dayTwoAlreadyOccurred,
			monthOfTheYearAlreadyOccurred: form.monthOfTheYearAlreadyOccurred,
			walletId: form.walletId,
			accountId: account.id
		}

		if (form.frequencyType === 'MONTHLY' && form.recDayOne) {
			recurrence.dayOne = Number(form.recDayOne);
		}

		if (form.frequencyType === 'BIWEEKLY' && form.recDayOne && form.recDayTwo) {
			recurrence.dayOne = Number(form.recDayOne);
			recurrence.dayTwo = Number(form.recDayTwo);
		}

		if (form.frequencyType === 'YEARLY' && form.recDayOne && form.month) {
			recurrence.dayOne = Number(form.recDayOne);
			recurrence.monthOfTheYear = Number(form.month);
		}

		console.log(recurrence)

		let isEditing = form.id !== null ? true : false;

		if (isEditing) {
			recurrenceMutationUpdate.mutate(recurrence);
		} else {
			recurrenceMutationSave.mutate(recurrence);
		}
	}

	return {
		categories: queryCategories.data ?? [],
		wallets: queryWallets.data ?? [],
		form,
		saveOrUpdate,
		handleOnChange,
		setType,
		setFrequencyType,
		setExecutionType,
		setAlreadyOccurred,
		inputsError,
		clearErrors,
		resetForm
	}
}

export default useRecurrenceModal;