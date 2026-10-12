import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import { useAccountContext } from "../../../context/AccountContext";
import useBankService from "../../../hooks/useBankService";
import useWalletService from "../../../hooks/useWalletService";
import type { BankResponse } from "../../../models/bank/BankResponse";
import type { WalletRequest } from "../../../models/wallet/WalletRequest";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { formatCurrencyToAPI } from "../../../utils/FormatCurrency";
import { getCurrentInvoice } from "../../../utils/invoices";
import { AVAILABLE_COLORS } from "../components/WalletFormModal/WalletFormModal";
import type { WalletFormData } from "../types/WalletFormData";

function useWallets(
	wallet: WalletResponse | null,
	onClose: () => void
) {
	const { account } = useAccountContext();

	const [form, setForm] = useState<WalletFormData>({
		id: '',
		name: '',
		description: '',
		balance: '',
		type: 'CHECKING',
		invoices: [],
		color: AVAILABLE_COLORS[0].value,
		cardDigits: '1234',
		goalId: '',
		accountId: account?.id ?? '',
		bank: undefined,
		invoiceId: '',
		creditLimit: '',
		closingDate: '',
		expirationDate: ''
	});

	const queryClient = useQueryClient();

	const walletService = useWalletService();
	const bankService = useBankService();

	const queryWallets = useQuery({
		queryKey: [
			'wallets',
			account?.id
		],
		queryFn: () => walletService.getAll({ accountId: account?.id }),
		enabled: Boolean(account?.id),
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
			showToast({
				title: 'Adiconado!',
				message: 'Carteira/Cartão adicionado com sucesso',
				type: 'success'
			});
			clearForm();
			onClose();
		}
	});

	const walletMutationUpdate = useMutation({
		mutationFn: (data: WalletRequest) => walletService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });
			showToast({
				title: 'Atualizado!',
				message: 'Carteira/Cartão atualizado com sucesso',
				type: 'success'
			});
			clearForm();
			onClose();
		}
	});

	const walletMutationDelete = useMutation({
		mutationFn: (id: string) => walletService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['wallets'] });
			showToast({
				title: 'Excluído!',
				message: 'Carteira/Cartão excluído com sucesso',
				type: 'success'
			});
			clearForm();
			onClose();
		}
	});

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value
		}));

		if (name === 'type') {
			if (value === 'PHYSICAL' || value === 'OTHER') {
				setForm((prev) => ({...prev, bank: undefined }));
				setForm((prev) => ({...prev, cardDigits: undefined }));
			} else {
				setForm((prev) => ({...prev, color: '' }));
			}
		}
	}

	function onBankChange(bank: BankResponse) {
		setForm((prev) => ({...prev, bank: bank }));
		setForm((prev) => ({...prev, color: bank.gradient }));
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
			cardDigits: form.cardDigits ?? null,
			type: form.type,
			color: form.color ?? form.bank?.gradient,
			accountId: account?.id ?? '',
			bankId: form.bank?.id ?? null,
			invoiceId: form.invoiceId || null,
			creditLimit: form.type === 'CREDIT_CARD'
				? formatCurrencyToAPI(form.creditLimit)
				: null,
			closingDate: form.type === 'CREDIT_CARD' ? form.closingDate : null,
			expirationDate: form.type === 'CREDIT_CARD' ? form.expirationDate : null
		}

		if (isUpdate) {
			walletMutationUpdate.mutate(request);
		}
		else {
			walletMutationSave.mutate(request);
		}
	}

	function deleteWallet(wallet: WalletResponse) {
		walletMutationDelete.mutate(wallet.id);
	}

	function clearForm() {
		setForm({
			id: '',
			name: '',
			description: '',
			balance: '',
			type: 'CHECKING',
			invoices: [],
			color: '',
			cardDigits: '1234',
			goalId: '',
			accountId: account?.id ?? '',
			bank: undefined,
			invoiceId: '',
			creditLimit: '',
			closingDate: '',
			expirationDate: ''
		});
	}

	useEffect(() => {
		if (!wallet) {
			clearForm();
			return;
		}

		const invoice = getCurrentInvoice(wallet.invoices ?? []);

		setForm({
			id: wallet.id,
			name: wallet.name,
			description: wallet.description,
			balance: wallet.balance.toString(),
			cardDigits: wallet.cardDigits,
			type: wallet.type,
			invoices: wallet.invoices ?? [],
			color: wallet.color,
			bank: wallet.bank,
			accountId: account?.id ?? '',
			invoiceId: invoice?.id ?? '',
			creditLimit: invoice?.limit?.toString() ?? '',
			closingDate: invoice?.closingDate ?? '',
			expirationDate: invoice?.expirationDate ?? ''
		});
	}, [wallet]);

	return {
		wallets: queryWallets.data ?? [],
		banks: queryBanks.data ?? [],
		form,
		handleOnChange,
		onBankChange,
		selectColor,
		saveOrUpdate,
		deleteWallet
	}
}

export default useWallets;
