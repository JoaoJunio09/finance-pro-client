import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { TransactionType } from "../../../types/TransactionType";
import type { FormData } from "../types/FormData";
import type { TransactionModalType } from "../types/TransactionModalType";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import useTransactionService from "../../../hooks/useTransactionService";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import showToast from "../../../components/ui/Toast/Toast";
import type { RecurrenceRequest } from "../../../models/recurrence/RecurrenceRequest";
import type { RecurrenceType } from "../../../types/RecurrenceType";

function useNewTransaction(onClose: () => void) {
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

	if (form.type === 'CREDIT' || form.recurrenceType === 'CREDIT') {
		typeParam = 'CREDIT';
	} else if (form.type === 'DEBIT' || form.recurrenceType === 'DEBIT') {
		typeParam = 'DEBIT';
	}

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			typeParam,
			form.type,
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
			queryClient.invalidateQueries({
				queryKey: [
					'transactions',
					'recurrences'
				]
			});

			if (form.type === 'CREDIT') {
				showToast({
					title: 'Recorrência adicionada!!',
					message: 'Receita recorrente adicionada com sucesso à sua conta',
					type: 'success'
				});
			}
			else {
				showToast({
					title: 'Recorrência adicionada!!',
					message: 'Despesa recorrente adicionada com sucesso à sua conta',
					type: 'success'
				});
			}

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

		setForm((prev) => ({
			...prev,
			[name]: value
		}));
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
	}

	function setRecurrenceType(recurrenceType: RecurrenceType) {
		setForm((prev) => ({
			...prev,
			recurrenceType: recurrenceType
		}));
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

		if (!form.amount || form.amount === '') {
			showToast({
				title: 'Dados inválidos',
				message: 'Digite um valor',
				type: 'error'
			});
			return;
		}

		if (!form.walletId  || form.walletId === '') {
			showToast({
				title: 'Dados inválidos',
				message: 'Selecione uma Carteira',
				type: 'error'
			});
			return;
		}

		if (!form.categoryId || form.categoryId === '') {
			showToast({
				title: 'Dados inválidos',
				message: 'Selecione uma Categoria',
				type: 'error'
			});
			return;
		}

		const type:TransactionType = form.type === 'CREDIT' ? 'CREDIT' : 'DEBIT';

		const transaction:TransactionRequest = {
			amount: Number(form.amount),
			description: form.description,
			observation: form.observation,
			registeredAt: form.registeredAt,
			type: type,
			status: 'COMPLETED',
			categoryId: form.categoryId,
			walletId: form?.walletId,
			accountId: account.id
		}

		transactionMutation.mutate(transaction);
	}

	function registerRecurrence() {
		if (!account) {
			return;
		}

		if (!form.recurrenceType || !form.frequencyType || !form.walletId) {
			showToast({
				title: 'Dados inválidos',
				message: 'Preencha todos os dados para registrar a Recorrência',
				type: 'error'
			});
			return;
		}

		let recurrence:RecurrenceRequest = {
			amount: Number(form.amount),
			description: form.description,
			type: form.recurrenceType,
			frequencyType: form.frequencyType,
			walletId: form.walletId,
			accountId: account.id
		}

		if (form.frequencyType === 'MONTHLY' && form.recDayOne) {
			console.log(form.recDayOne)
			recurrence.dayOne = Number(form.recDayOne);
		}

		if (form.frequencyType === 'MONTHLY' && form.recDayOne && form.recDayTwo) {
			recurrence.dayOne = Number(form.recDayOne);
			recurrence.dayTwo = Number(form.recDayTwo);
		}

		if (form.frequencyType === 'YEARLY' && form.recDayOne && form.month) {
			recurrence.dayOne = Number(form.recDayOne);
			recurrence.monthOfTheYear = Number(form.month);
		}

		console.log(recurrence)

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
		register
	}
}

export default useNewTransaction;