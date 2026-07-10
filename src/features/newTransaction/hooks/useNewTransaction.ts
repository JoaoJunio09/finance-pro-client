import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { RecurrenceRequest } from "../../../models/recurrence/RecurrenceRequest";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import type { TransactionType } from "../../../types/TransactionType";
import type { FormData } from "../types/FormData";
import type { TransactionModalType } from "../types/TransactionModalType";
import { formatCurrencyInput, formatCurrencyToAPI } from "../../../utils/FormatCurrency";

function useNewTransaction(onClose: () => void) {
	const [inputsError, setInputsError] = useState<Record<string, string>>({});
	const [form, setForm] = useState<FormData>({
		amount: '',
		description: '',
		categoryId: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();
	const queryClient = useQueryClient();

	const categoryService = useCategoryService();
	const transactionService = useTransactionService();
	const recurrenceService = useRecurrenceService();

	let typeParam: TransactionType | undefined = undefined;

	if (form.type === 'RECURRING') {
		typeParam = form.recurrenceType;
	} else if (form.type === 'CREDIT' || form.type === 'DEBIT') {
		typeParam = form.type;
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
			amount: '',
			description: '',
			categoryId: '',
			walletId: '',
			toWalletId: '',
			fromWalletId: '',
			registeredAt: '',
			type: 'CREDIT',
			recDayOne: '',
			recDayTwo: '',
			frequencyType: 'MONTHLY',
			month: '',
			observation: '',
			recurrenceType: 'CREDIT'
		})
	}

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			typeParam,
			form.recurrenceType
		],
		queryFn: () => categoryService.getAll(
			typeParam !== undefined
				? { type: typeParam }
				: {}
		),
		retry: 3
	});

	const transactionMutation = useMutation({
		mutationFn: (data: TransactionRequest) => transactionService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['transactions'] });

			if (form.type === 'CREDIT') {
				showToast({
					title: 'Aumentando sua renda!!',
					message: 'Receita adicionada com sucesso',
					type: 'finance'
				});
			}
			else {
				showToast({
					title: 'Saldo atualizado!!',
					message: 'Receita adicionada com sucesso',
					type: 'success'
				});
			}

			clearErrors();
			resetForm();
			onClose();
		},
		onError: () => {
			showToast({
				title: 'Erro ao salvar',
				message: 'Não foi possível concluir a transação',
				type: 'error'
			});
		}
	});

	const recurrenceMutation = useMutation({
		mutationFn: (data: RecurrenceRequest) => recurrenceService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['recurrences'] });

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
			showToast({
				title: 'Erro ao salvar',
				message: 'Não foi possível concluir a operação',
				type: 'error'
			});
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

		setForm((prev) => ({ ...prev, [name]: value }));

		if (value && value.trim() !== '') {
			const errorKey = name === 'walletId' ? 'wallet' : name === 'categoryId' ? 'category' : name;
			removeError(errorKey);
		}
	}

	function setType(type: TransactionModalType) {
		setForm((prev) => ({
			...prev,
			type: type
		}));
	}

	function setFrequency(freq: FrequencyType) {
		setForm((prev) => ({
			...prev,
			frequencyType: freq
		}));
		removeError('frequencyType');
	}

	function setRecurrenceType(recurrenceType: RecurrenceType) {
		setForm((prev) => ({
			...prev,
			recurrenceType: recurrenceType
		}));
		removeError('recurrenceType');
	}

	function register() {
		const isRecurring: boolean = form.type === "RECURRING";	

		if (!isRecurring) {
			registerTransaction();
			return;
		}

		registerRecurrence();
	}

	function registerTransaction() {
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

		if (!form.registeredAt || form.registeredAt === '') {
			localErrors['registeredAt'] = 'Informe a data da transação';
		}

		if (!form.walletId || form.walletId === '') {
			localErrors['wallet'] = 'Selecione uma carteira';
		}

		if (!form.categoryId || form.categoryId === '') {
			localErrors['category'] = 'Selecione uma categoria';
		}

		setInputsError(localErrors);

		if (Object.keys(localErrors).length > 0) {
			return;
		}

		const type:TransactionType = form.type === 'CREDIT' ? 'CREDIT' : 'DEBIT';

		const transaction:TransactionRequest = {
			amount: formatCurrencyToAPI(form.amount),
			description: form.description,
			observation: form.observation,
			registeredAt: form.registeredAt,
			type: type,
			status: 'COMPLETED',
			categoryId: form.categoryId,
			walletId: form.walletId ?? '',
			accountId: account.id
		}

		transactionMutation.mutate(transaction);
	}

	function registerRecurrence() {
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

		if (!form.recurrenceType) {
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

		if (Object.keys(localErrors).length > 0 || !form.walletId || !form.frequencyType || !form.recurrenceType) {
			return;
		}

		let recurrence:RecurrenceRequest = {
			amount: formatCurrencyToAPI(form.amount),
			description: form.description,
			type: form.recurrenceType,
			frequencyType: form.frequencyType,
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

		recurrenceMutation.mutate(recurrence);
	}

	return {
		categories: queryCategories.data ?? [],
		wallets: account?.wallets ?? [],
		handleOnChange,
		setFrequency,
		setType,
		setRecurrenceType,
		form,
		register,
		isLoading: transactionMutation.isPending || recurrenceMutation.isPending,
		inputsError,
		clearErrors,
		resetForm
	}
}

export default useNewTransaction;