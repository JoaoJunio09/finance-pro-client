import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import type { TransactionType } from "../../../enums/TransactionType";
import useCategoryService from "../../../hooks/useCategoryService";
import useTransactionService from "../../../hooks/useTransactionService";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { FormData } from "../types/FormData";

function useNewTransaction(
	onClose: () => void
) {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
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
			queryClient.invalidateQueries({ queryKey: ['transactions'] }),
			queryClient.invalidateQueries({ queryKey: ['account'] })
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

	async function registerTransaction(e: ChangeEvent) {
		e.preventDefault();
		try {
			setLoading(true);
			setError(null);

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
				accountId: account.id,
				description: form.description,
				observation: form.observation,
				amount: form.amount,
				registeredAt: form.registeredAt,
				categoryId: form.categoryId,
				type: form.type
			}

			newTransactionMutation.mutate(transaction);

			onClose();

			if (form.type === 'CREDIT') {
				showToast({ title: 'Aumentando sua renda!!', message: 'Receita adicionada com sucesso.', type: 'finance' });
			} else {
				showToast({ title: 'Despesa adicionada', message: 'Saldo da conta atualizado.', type: 'success' });
			}
		}
		catch (err) {
			setError('Não foi possível registrar a Transação');
		}
		finally {
			setLoading(false);
		}
	}

	return {
		categories: queryCategories.data ?? [],
		success: newTransactionMutation.isSuccess,
		form,
		handleOnChange,
		setType,
		error,
		loading,
		registerTransaction
	}
}

export default useNewTransaction;