import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useBankService from "../../../hooks/useBankService";
import useWalletService from "../../../hooks/useWalletService";
import type { WalletRequest } from "../../../models/wallet/WalletRequest";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { formatCurrencyInput, formatCurrencyToAPI } from "../../../utils/FormatCurrency";
import type { FormData } from "../types/FormData";
import { WalletDefault } from "../types/WalletDefault";

function useWallets(onSuccess: () => void) {
	const [wallet, setWallet] = useState<WalletResponse | null>(null);
	const [form, setForm] = useState<FormData>({
		id: null,
		name: '', 
		bankIdOrType: '',
		balance: '',
		cardDigits: ''
	});

	const { account } = useAccountContext();
	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const bankService = useBankService();

	const walletMutationSave = useMutation({
		mutationFn: (data: WalletRequest) => walletService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });

			showToast({
				type: 'success',
				title: 'Aumentando sua renda!!',
				message: 'Carteira/Cartão foi adicionada à sua conta'
			});

			onSuccess();
		},
		onError: () => {
			showToast({
				type: 'error',
				title: 'Erro ao salvar Carteira/Cartão',
				message: 'Tente novamente em instantes.'
			});
		}
	});

	const walletMutationUpdate = useMutation({
		mutationFn: (data: WalletRequest) => walletService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });

			showToast({
				type: 'success',
				title: 'Atualizado!!',
				message: 'Carteira/Cartão foi atualizado com sucesso'
			});

			onSuccess();
		},
		onError: () => {
			showToast({
				type: 'error',
				title: 'Erro ao atualizar Carteira/Cartão',
				message: 'Tente novamente em instantes.'
			});
		}
	});

	const queryWallets = useQuery({
		queryKey: [
			'wallets',
			account?.id
		],
		queryFn: () => walletService.getAll({ accountId: account?.id }),
		retry: 1
	});

	const queryBanks = useQuery({
		queryKey: ['banks'],
		queryFn: () => bankService.getAll(),
		retry: 1
	});

	const queryBank = useQuery({
		queryKey: [
			'bank',
			form.bankIdOrType
		],
		queryFn: () => bankService.getById(form.bankIdOrType),
		enabled: !!form.bankIdOrType && form.bankIdOrType !== WalletDefault,
		retry: 1
	});

	const wallets = useMemo(() => queryWallets.data ?? [], [queryWallets.data]);
	const banks = useMemo(() => queryBanks.data ?? [], [queryBanks.data]);

	const previewWallet = useMemo<WalletResponse>(() => {
		return {
			id: '',
			name: form.name,
			balance: Number(form.balance),
			cardDigits: form.cardDigits,
			bank: {
				id: queryBank.data?.id ?? '',
				name: queryBank.data?.name ?? '',
				icon: queryBank.data?.icon ?? '',
				color: queryBank.data?.color ?? '',
				gradient: queryBank.data?.gradient ?? '',
				shadow: queryBank.data?.shadow ?? ''
			},
			description: ''
		}
	}, [
		form.name,
		form.balance,
		form.cardDigits,
		queryBank.data
	]);

	useEffect(() => {
		const firstBank = banks[0];

		if (firstBank && !form.bankIdOrType) {
			setForm(prev => ({
				...prev,
				bankIdOrType: firstBank.id
			}));
		}
	}, [banks]);

	useEffect(() => {
		if (!wallet) return;

		setForm({
			id: wallet.id,
			name: wallet.name,
			balance: wallet.balance.toString(),
			bankIdOrType: wallet.bank ? wallet.bank.id : WalletDefault,
			cardDigits: wallet.cardDigits ?? ''
		});
	}, [wallet]);

	const totalAssets = wallets
		.reduce((total, wallet) => total + (wallet.balance || 0), 0);

	const bigWalletIncome = wallets.toSorted(
		(a, b) => b.balance - a.balance
	)[0] ?? null;
	
	const smallWalletIncome = wallets.toSorted(
		(a, b) => a.balance - b.balance
	)[0] ?? null;

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		if (name === 'balance') {
			setForm((prev) => ({ ...prev, balance: formatCurrencyInput(value) }));
			return;
		}

		if (name === 'cardDigits') {
			setForm((prev) => ({ ...prev, cardDigits: value.replace(/\D/g, '') }));
			return;
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function saveOrUpdate() {
		if (!account || !form) {
			return;
		}

		let isEditing = form.id !== null ? true : false;

		const bankId = form.bankIdOrType === WalletDefault
			? null
			: form.bankIdOrType;

		const wallet: WalletRequest = {
			id: form.id,
			name: form.name,
			balance: formatCurrencyToAPI(form.balance),
			cardDigits: form.cardDigits,
			accountId: account.id,
			bankId: bankId
		}

		if (isEditing) {
			walletMutationUpdate.mutate(wallet);
		} else {
			walletMutationSave.mutate(wallet);
		}

		console.log(form);
		console.log(wallet);
	}

	function reset() {
		setWallet(null);

		setForm({
			id: null,
			name: '',
			balance: '',
			bankIdOrType: '',
			cardDigits: ''
		});
	}

	return {
		wallets,
		banks,
		previewWallet,
		totalAssets,
		bigWalletIncome,
		smallWalletIncome,
		form,
		reset,
		setWallet,
		handleOnChange,
		saveOrUpdate,
		isLoading: walletMutationSave.isPending || walletMutationUpdate.isPending
	}
}

export default useWallets;