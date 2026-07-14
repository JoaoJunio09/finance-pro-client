import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useRecurrenceService from "../../../hooks/useRecurrenceService";
import useTransactionService from "../../../hooks/useTransactionService";
import useWalletService from "../../../hooks/useWalletService";
import type { RecurrenceRequest } from "../../../models/recurrence/RecurrenceRequest";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import type { TransactionType } from "../../../types/TransactionType";
import { formatCurrencyInput, formatCurrencyToAPI } from "../../../utils/FormatCurrency";
import type { FormData } from "../types/FormData";

function useTransactionModal(
	onClose: () => void,
	transaction: TransactionResponse | null
) {
	const [inputsError, setInputsError] = useState<Record<string, string>>({});
	const [form, setForm] = useState<FormData>({
		id: null,
		amount: '',
		description: '',
		categoryId: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();
	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const categoryService = useCategoryService();
	const transactionService = useTransactionService();
	const recurrenceService = useRecurrenceService();

	useEffect(() => {
		if (!transaction) return;
		
		setForm({
			id: transaction.id,
			amount: formatCurrencyInput((transaction.amount * 100).toString()),
			description: transaction.description,
			observation: transaction.observation,
			categoryId: transaction.category.id,
			walletId: transaction.wallet.id,
			registeredAt: transaction.registeredAt,
			type: transaction.type,
		});
	}, [transaction]);

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
			observation: '',
			categoryId: '',
			walletId: '',
			registeredAt: '',
			type: 'CREDIT',
		});
	}

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

	const transactionMutationSave = useMutation({
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
					message: 'Despesa adicionada com sucesso',
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

	const transactionMutationUpdate = useMutation({
		mutationFn: (data: TransactionRequest) => transactionService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['account'] });
			queryClient.invalidateQueries({ queryKey: ['transactions'] });

			if (form.type === 'CREDIT') {
				showToast({
					title: 'Aumentando sua renda!!',
					message: 'Receita atualizada com sucesso',
					type: 'finance'
				});
			}
			else {
				showToast({
					title: 'Saldo atualizado!!',
					message: 'Despesa atualizada com sucesso',
					type: 'success'
				});
			}

			clearErrors();
			resetForm();
			onClose();
		},
		onError: () => {
			showToast({
				title: 'Erro ao atualizar',
				message: 'Não foi possível concluir a transação',
				type: 'error'
			});
		}
	})

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

	function setType(type: TransactionType) {
		setForm((prev) => ({
			...prev,
			type: type
		}));
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

		let isEditing = form.id !== null ? true : false;

		const type:TransactionType = form.type === 'CREDIT' ? 'CREDIT' : 'DEBIT';

		const transaction:TransactionRequest = {
			id: form.id,
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

		if (isEditing) {
			transactionMutationUpdate.mutate(transaction);
		} else {
			transactionMutationSave.mutate(transaction);
		}
	}

	return {
		categories: queryCategories.data ?? [],
		wallets: queryWallets.data ?? [],
		handleOnChange,
		setType,
		form,
		saveOrUpdate,
		isLoading: transactionMutationSave.isPending || transactionMutationUpdate.isPending || recurrenceMutation.isPending,
		inputsError,
		clearErrors,
		resetForm
	}
}

export default useTransactionModal;