import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import useBankService from "../../../hooks/useBankService";
import useWalletService from "../../../hooks/useWalletService";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import type { WalletFormData } from "../types/WalletFormData";
import { AVAILABLE_COLORS } from "../components/WalletFormModal/WalletFormModal";

function useWallets() {
	const [form, setForm] = useState<WalletFormData>({
		id: '',
		name: '',
		description: '',
		balance: '',
		type: 'CHECKING',
		color: AVAILABLE_COLORS[0].value,
		cardDigits: '',
		goalId: '',
		accountId : '',
		bank: undefined
	});

	const { account } = useAccountContext();

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

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value
		}));

		if (name === 'amount' && value) {
			setForm((prev) => ({...prev, amount: formatCurrencyInput(value) }));
		}
		console.log(form)
	}

	function selectColor(color: string) {
		setForm((prev) => ({...prev, color: color }));
	}

	function saveOrUpdate() {

	}

	return {
		wallets: queryWallets.data ?? [],
		banks: queryBanks.data ?? [],
		form,
		handleOnChange,
		selectColor
	}
}

export default useWallets;