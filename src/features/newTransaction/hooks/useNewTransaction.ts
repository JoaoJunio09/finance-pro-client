import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { TransactionType } from "../../../types/TransactionType";
import type { FormData } from "../types/FormData";
import type { TransactionModalType } from "../types/TransactionModalType";
import type { TransactionRequest } from "../../../models/transaction/TransactionRequest";

function useNewTransaction() {
	const [form, setForm] = useState<FormData>({
		amount: '',
		description: '',
		categoryId: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();

	const categoryService = useCategoryService();

	let typeParam: TransactionType | undefined = 'CREDIT';

	if (form.type === 'CREDIT') {
		typeParam = 'CREDIT';
	} else if (form.type === 'DEBIT') {
		typeParam = 'DEBIT';
	} else {
		typeParam = undefined;
	}

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			typeParam,
			form.type
		],
		queryFn: () => categoryService.getAll({ type: typeParam }),
		retry: 3
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
			frequency: freq
		}));
	}

	function register() {
		const isRecurring: boolean = form.type === "RECURRING";

		if (!form.walletId) {
			return;
		}

		if (!account) {
			return;
		}

		if (!isRecurring) {
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

			console.log(transaction);
		}
	}

	return {
		categories: queryCategories.data ?? [],
		wallets: account?.wallets ?? [],
		handleOnChange,
		setFrequency,
		setType,
		form,
		register
	}
}

export default useNewTransaction;