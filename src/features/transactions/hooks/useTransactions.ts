import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useCategoryService from "../../../hooks/useCategoryService";
import useTransactionService from "../../../hooks/useTransactionService";
import useWalletService from "../../../hooks/useWalletService";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import type { CategoryType } from "../../../types/CategoryType";
import type { SummaryCard } from "../types/SummaryCard";
import type { SortOption } from "../types/transaction";
import type { CategoryFilter, TransactionStatusFilter, TransactionTypeFilter, WalletFilter } from "../utils/Filter";
import showToast from "../../../components/ui/Toast/Toast";

function useTransactions(
	onClose: () => void
) {
	const now = new Date();
	const month = now.getMonth();
	const year = now.getFullYear();
	
	const [currentMonth, setCurrentMonth] = useState(new Date(year, month, 1));

	const [search, setSearch] = useState('');

	const [txStatusFilter, setTxStatusFilter] = useState<TransactionStatusFilter>('all');
	const [txTypeFilter, setTxTypeFilter] = useState<TransactionTypeFilter>('all');
	const [walletFilter, setWalletFilter] = useState<WalletFilter>('all');
	const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
	const [sort, setSort] = useState<SortOption>('recent');

	const [categoryType, setCategoryType] = useState<CategoryType>('CREDIT');

	const { account } = useAccountContext();

	const transactionService = useTransactionService();
	const walletService = useWalletService();
	const categoryService = useCategoryService();

	const queryClient = useQueryClient();

	const queryTransactions = useQuery({
		queryKey: [
			'transactions',
			account?.id,
			currentMonth
		],
		queryFn: () => transactionService.getAll({
			accountId: account?.id,
			month: currentMonth.getMonth()+1,
			year: currentMonth.getFullYear()
		}),
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

	const queryCategories = useQuery({
		queryKey: [
			'categories',
			account?.id
		],
		queryFn: () => categoryService.getAll({ type: categoryType }),
		retry: 3
	});

	const txMutationDelete = useMutation({
		mutationFn: (id: string) => transactionService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['dashboard' ] });
			queryClient.invalidateQueries({ queryKey: ['transactions', account?.id ] });
			showToast({
				title: 'Excluído!',
				message: 'Transação excluída com sucesso',
				type: 'success'
			});
			onClose();
		}
	});

	function deleteTransaction(transaction: TransactionResponse) {
		txMutationDelete.mutate(transaction.id);
	}

	const transactions = useMemo(() => queryTransactions.data ?? [], [queryTransactions.data]);
	const wallets = useMemo(() => queryWallets.data ?? [], [queryWallets.data]);
	const categories = useMemo(() => queryCategories.data ?? [], [queryCategories.data]);

	const summaryCard = useMemo<SummaryCard>(() => {
    let pendingCount = 0;
    let pendingTotal = 0;

    transactions.forEach((tx) => {
      if (tx.status === 'PENDING') {
        pendingCount += 1;
        pendingTotal += tx.amount;
      }
    });

    return {
			income: account?.income ?? 0,
			expense: account?.expenses ?? 0,
			netIncome: account?.netIncome ?? 0,
			pendingCount: pendingCount,
			pendingTotal: pendingTotal
		}
  }, [transactions]);

	return {
		transactions,
		wallets,
		categories,
		summaryCard,
		currentMonth,
		setCurrentMonth,
		search,
		setSearch,
		txStatusFilter,
		setTxStatusFilter,
		txTypeFilter,
		setTxTypeFilter,
		walletFilter,
		setWalletFilter,
		categoryFilter,
		setCategoryFilter,
		sort,
		setSort,
		deleteTransaction
	}
}

export default useTransactions;