import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import type { TransactionType } from "../../../enums/TransactionType";
import useTransactionService from "../../../hooks/useTransactionService";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";
import type { FormData } from "../types/FormData";

function useNewTransaction() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<FormData>({
		amount: 0,
		description: '',
		category: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();

	const transactionService = useTransactionService();

	const queryClient = useQueryClient();

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

	const newTransactionMutation = useMutation({
		mutationFn: (data: TransactionRequest) => transactionService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		}
	});

	async function registerTransaction(e: ChangeEvent) {
		e.preventDefault();
		try {
			setLoading(true);
			setError(null);

			if (!form.amount || form.amount === 0) {
				setError('Preencha um valor maior que 0');
			}

			if (!form.category || form.category === '') {
				setError('Informe a categoria da transação');
			}

			if (!form.walletId || form.walletId === '') {
				setError('Escolha uma carteira para efeturar a transação');
			}

			const transaction:TransactionRequest = {
				accountId: account.id,
				amount: form.amount,
				category: form.category,
				registeredAt: form.registeredAt,
				type: form.type
			} 

			console.log(transaction);

			// newTransactionMutation.mutate(transaction);
		}
		catch (err) {
			throw err;
		}
		finally {
			setLoading(false);
			setError(null);
		}
	}

	return {
		form,
		handleOnChange,
		setType,
		error,
		loading,
		registerTransaction
	}
}

export default useNewTransaction;