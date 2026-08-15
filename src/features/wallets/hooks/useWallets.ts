import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useWalletService from "../../../hooks/useWalletService";
import { useState } from "react";
import type { WalletFormData } from "../types/WalletFormData";
import useBankService from "../../../hooks/useBankService";

function useWallets() {
	const [form, setForm] = useState<WalletFormData>({
		id: '',
		name: '',
		description: '',
		balance: '',
		type: '',
		color: '',
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

	function selectColor(color: string) {
		setForm((prev) => ({...prev, color: color }));
	}

	function saveOrUpdate() {

	}

	return {
		wallets: queryWallets.data ?? [],
		banks: queryBanks.data ?? [],
		form,
		selectColor
	}
}

export default useWallets;