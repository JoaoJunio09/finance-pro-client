import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { TransactionType } from "../../../types/TransactionType";
import type { FormData } from "../types/FormData";

function useNewTransaction(
	onClose: () => void
) {
	const [form, setForm] = useState<FormData>({
		amount: 0,
		description: '',
		categoryId: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();

	const transactionService = useTransactionService();
	const categoryService = useCategoryService();

	const queryClient = useQueryClient();

	const newTransactionMutation = useMutation({
		mutationFn: (data: TransactionRequest) => transactionService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['transactions']
			});

			queryClient.invalidateQueries({
				queryKey: ['account']
			});

			onClose();

			if (form.type === 'CREDIT') {
				showToast({ title: 'Aumentando sua renda!!', message: 'Receita adicionada com sucesso.', type: 'finance' });
			}
			else {
				showToast({ title: 'Despesa adicionada', message: 'Saldo da conta atualizado.', type: 'success' });
			}
		},
		onError: () => {
			showToast({
				title: 'Erro',
				message: 'Não foi possível efetuar a transação.',
				type: 'error'
			});
		}
	});

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			form.type
		],
		queryFn: () => categoryService.getAll({ type: form.type }),
		enabled: !!form.type
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value
		}))
	}

	function setType(type: TransactionType) {
		setForm((prev) => ({
			...prev,
			type: type
		}));
	}

	async function registerTransaction() {
		if (!account) return;

		if (!form.amount || form.amount === 0) {
			showToast({ title: 'Dados inválidos', message: 'Preencha um valor maior que 0', type: 'error' });
			return;
		}

		if (!form.description || form.description === '') {
			showToast({ title: 'Dados inválidos', message: 'Informe uma descrição para a transação', type: 'error' });
			return;
		}

		if (!form.registeredAt || form.registeredAt === '') {
			showToast({ title: 'Dados inválidos', message: 'Informe a data da transação', type: 'error' });
			return;
		}

		if (!form.categoryId || form.categoryId === '') {
			showToast({ title: 'Dados inválidos', message: 'Selecione uma categoria', type: 'error' });
			return;
		}

		if (!form.walletId || form.walletId === '') {
			showToast({ title: 'Dados inválidos', message: 'Escolha uma carteira para efeturar a transação.', type: 'error' });
			return;
		}

		const transaction:TransactionRequest = {
			amount: form.amount,
			description: form.description,
			observation: form.observation,
			registeredAt: form.registeredAt,
			type: form.type,
			status: "COMPLETED",
			categoryId: form.categoryId,
			walletId: form.walletId,
			accountId: account.id,
		}

		console.log(transaction)
		
		newTransactionMutation.mutate(transaction);
	}

	return {
		categories: queryCategories.data ?? [],
		success: newTransactionMutation.isSuccess,
		form,
		handleOnChange,
		setType,
		registerTransaction,
		loading: newTransactionMutation.isPending
	}
}

export default useNewTransaction;