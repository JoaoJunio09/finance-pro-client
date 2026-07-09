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

function useWallets() {
	const [form, setForm] = useState<FormData>({
		name: '', 
		bankIdOrType: '',
		balance: '',
		digits: ''
	});

	const { account } = useAccountContext();
	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const bankService = useBankService();

	const walletMutation = useMutation({
		mutationFn: (data: WalletRequest) => walletService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });

			showToast({
				type: 'success',
				title: 'Aumentando sua renda!!',
				message: 'Carteira/Cartão foi adicionada à sua conta'
			})
		},
		onError: (err) => {
			console.log(err);
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
			cardDigits: form.digits,
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
		form.digits,
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

	const totalAssets = wallets
		.reduce((total, wallet) => total + (wallet.balance || 0), 0);

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		if (name === 'balance') {
			setForm((prev) => ({ ...prev, balance: formatCurrencyInput(value) }));
			return;
		}

		if (name === 'digits') {
			setForm((prev) => ({ ...prev, digits: value.replace(/\D/g, '') }));
			return;
		}

		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function saveOrUpdate() {
		if (!account) {
			return;
		}

		const bankId = form.bankIdOrType === WalletDefault
			? null
			: form.bankIdOrType;

		const wallet: WalletRequest = {
			name: form.name,
			balance: formatCurrencyToAPI(form.balance),
			accountId: account.id,
			bankId: bankId
		}

		walletMutation.mutate(wallet);
	}

	return {
		wallets,
		banks,
		previewWallet,
		totalAssets,
		form,
		handleOnChange,
		saveOrUpdate
	}
}

export default useWallets;