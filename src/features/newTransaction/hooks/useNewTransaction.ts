import { useQuery } from "@tanstack/react-query";
import useCategoryService from "../../../hooks/useCategoryService";
import { useState } from "react";
import type { TransactionType } from "../../../types/TransactionType";
import { useAccountContext } from "../../../context/AccountContext";
import type { FormData } from "../types/FormData";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { TransactionModalType } from "../types/TransactionModalType";

function useNewTransaction() {
	const [type, setType] = useState<TransactionModalType>('CREDIT');
	const [form, setForm] = useState<FormData>({
		amount: '',
		description: '',
		categoryId: '',
		registeredAt: '',
		type: 'CREDIT'
	});

	const { account } = useAccountContext();

	const categoryService = useCategoryService();

	let typeParam: TransactionType = 'CREDIT';

	if (type === 'CREDIT') {
		typeParam = 'CREDIT';
	} else if (type === 'DEBIT') {
		typeParam = 'DEBIT';
	}

	const queryCategories = useQuery({
		queryKey: [
			'categories'
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

	function setFrequency(freq: FrequencyType) {
		setForm((prev) => ({
			...prev,
			frequency: freq
		}));
	}

	return {
		categories: queryCategories.data ?? [],
		wallets: account?.wallets ?? [],
		handleOnChange,
		setType,
		type,
		setFrequency,
		form
	}
}

export default useNewTransaction;