import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useTransactionService from "../../../hooks/useTransactionService";
import useWalletService from "../../../hooks/useWalletService";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { CategoryType } from "../../../types/CategoryType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import type { RecFormData } from "../types/RecFormData";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import type { RecurrenceStatus } from "../../../types/RecurrenceStatus";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { ExecutionType } from "../../../types/ExecutionType";

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
		dayTwo: '',
		monthOfTheYear: '',
		dayOneAlreadyOccurred: false,
		dayTwoAlreadyOccurred: false,
		monthOfTheYearAlreadyOccurred: false,
		startDate: '',
		endDate: '',
		accountId: account?.id ?? ''
	});

	const transactionService = useTransactionService();
	const categoryService = useCategoryService();
	const walletService = useWalletService();

	const queryClient = useQueryClient();

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
		const { name, value } = e.target;

		if (name === 'amount') {
			setForm((prev) => ({
				...prev,
				amount: formatCurrencyInput(value),
			}));

			return;
		}

		setForm((prev) => ({
			...prev,
			[name]: value,
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

	const categories = useMemo(() => queryCategories.data ?? [], [queryCategories.data]);
	const wallets = useMemo(() => queryWallets.data ?? [], [queryWallets.data]);

	return {
		form,
		handleOnChange,
		changeType,
		changeExecutionType,
		changeCustomSelectCategory,
		changeCustomSelectWallet,
		categories,
		wallets
	}
}

export default useRecurrenceModal;