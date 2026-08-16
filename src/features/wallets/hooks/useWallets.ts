import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useBankService from "../../../hooks/useBankService";
import useWalletService from "../../../hooks/useWalletService";
import type { WalletRequest } from "../../../models/wallet/WalletRequest";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { formatCurrencyToAPI } from "../../../utils/FormatCurrency";
import { AVAILABLE_COLORS } from "../components/WalletFormModal/WalletFormModal";
import type { WalletFormData } from "../types/WalletFormData";
import type { BankResponse } from "../../../models/bank/BankResponse";

function useWallets(
	wallet: WalletResponse | null
) {
	const [form, setForm] = useState<WalletFormData>({
		id: '',
		name: '',
		description: '',
		balance: '',
		type: 'CHECKING',
		color: AVAILABLE_COLORS[0].value,
		cardDigits: '1234',
		goalId: '',
		accountId : '',
	});

	const { account } = useAccountContext();

	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const bankService = useBankService();

	const queryWallets = useQuery({
		queryKey: [
			'wallets',
			account?.id
		],
		queryFn: () => walletService.getAll({ accountId: account?.id }),
		retry: 3
	});

	const queryBanks = useQuery({
		queryKey: ['banks'],
		queryFn: () => bankService.getAll(),
		retry: 3
	});

	const walletMutationSave = useMutation({
		mutationFn: (data: WalletRequest) => walletService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });
		}
	});

	const walletMutationUpdate = useMutation({
		mutationFn: (data: WalletRequest) => walletService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });
		}
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value
		}));

		if (name === 'bank' && value) {
			setForm((prev) => ({...prev, color: value}));
		}
	}

	function onBankChange(bank: BankResponse) {
		setForm((prev) => ({...prev, bank: bank }));
	}

	function selectColor(color: string) {
		setForm((prev) => ({...prev, color: color }));
	}

	function saveOrUpdate() {
		let isUpdate = wallet?.id;

		const request:WalletRequest = {
			id: form.id,
			balance: formatCurrencyToAPI(form.balance),
			name: form.name,
			description: form.description,
			cardDigits: form.cardDigits,
			type: form.type,
			color: form.color,
			accountId: account?.id ?? '',
			bankId: form.bank?.id
		}

		if (isUpdate) {
			walletMutationUpdate.mutate(request);
		}
		else {
			walletMutationSave.mutate(request);
		}
	}

	return {
		wallets: queryWallets.data ?? [],
		banks: queryBanks.data ?? [],
		form,
		handleOnChange,
		onBankChange,
		selectColor,
		saveOrUpdate
	}
}

export default useWallets;