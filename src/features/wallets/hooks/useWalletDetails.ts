import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import showToast from "../../../components/ui/Toast/Toast";
import useInstallmentPlanService from "../../../hooks/useInstallmentPlanService";
import useInvoiceService from "../../../hooks/useInvoiceService";
import useWalletService from "../../../hooks/useWalletService";
import type { InstallmentPlanResponse } from "../../../models/installmentPlan/InstallmentPlanResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { getCurrentInvoice } from "../../../utils/invoices";
import type { View } from "../types/wallet";

interface InvoicePayment {
  invoiceId: string;
  paymentWalletId: string;
  installmentId?: string;
}

function useWalletDetails(
	initialWallet: WalletResponse,
	wallets: WalletResponse[],
	initialView: View
) {
	const [view, setView] = useState<View>(initialView);
	const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
	const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
	const [installmentId, setInstallmentId] = useState<string>();

	const walletService = useWalletService();
  const invoiceService = useInvoiceService();
  const installmentPlanService = useInstallmentPlanService();

	const queryClient = useQueryClient();
	
	const resetQueries = async () => await Promise.all([
		queryClient.invalidateQueries({ queryKey: ['invoice', wallet.id] }),
		queryClient.invalidateQueries({ queryKey: ['installment-plans', wallet.id] }),
		queryClient.invalidateQueries({ queryKey: ['wallet', wallet.id] }),
		queryClient.invalidateQueries({ queryKey: ['wallets'] }),
		queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
		queryClient.invalidateQueries({ queryKey: ['transactions'] }),
	]);

	const queryWallet = useQuery({
    queryKey: ['wallet', initialWallet.id],
    queryFn: () => walletService.getById(initialWallet.id),
    initialData: wallets.find(item => item.id === initialWallet.id) ?? initialWallet,
    retry: 1,
  });

	const wallet = queryWallet.data;
	const invoices = wallet.invoices ?? [];
	const isCreditCard = wallet.type === 'CREDIT_CARD';
	const invoice = invoices.find(item => item.id === selectedInvoiceId) ?? getCurrentInvoice(invoices);

	const queryInvoice = useQuery({
    queryKey: ['invoice', wallet.id, invoice?.id],
    queryFn: ({ signal }) => invoiceService.getDetails(invoice!.id, signal),
    enabled: isCreditCard && Boolean(invoice) && view !== 'history',
    retry: 1,
  });

	const queryInstallmentPlans = useQuery<InstallmentPlanResponse[]>({
		queryKey: [
			'installment-plans',
			wallet.id
		],
		queryFn: ({ signal }) => installmentPlanService.getAllByWallet(wallet.id, signal),
		enabled: isCreditCard && (view === 'details' || view === 'plans'),
		retry: 1,
	});

	const onPaid = () => setView('details');

	const payment = useMutation({
    mutationFn: ({ invoiceId, paymentWalletId, installmentId }: InvoicePayment) =>
      installmentId
        ? invoiceService.payInstallment(invoiceId, installmentId, paymentWalletId)
        : invoiceService.payInvoice(invoiceId, paymentWalletId),
    retry: false,
    onSuccess: (details, variables) => {
      queryClient.setQueryData(['invoice', wallet.id,, variables.invoiceId], details);
      showToast({
        title: 'Tudo certo por aqui',
        message: variables.installmentId
          ? 'A parcela foi marcada como paga e o saldo da carteira foi ajustado.'
          : 'A fatura foi marcada como paga. O próximo ciclo já pode ser acompanhado no histórico.',
        type: 'success',
      });
      onPaid();
    },
    onError: () => {
      showToast({
        title: 'O registro não foi concluído',
        message: 'Confira a fatura e o saldo atualizado antes de tentar de novo.',
        type: 'error',
      });
    },
    onSettled: async () => resetQueries()
  });

	const details = queryInvoice.data;
	const installmentPlans = queryInstallmentPlans.data ?? [];

	const displayInvoice = invoice && details?.invoiceId === invoice.id
    ? { ...invoice, status: details.status, closingDate: details.closingDate, expirationDate: details.expirationDate }
    : invoice;
  const paymentWallets = wallets.filter(item => item.id !== wallet.id && item.type !== 'CREDIT_CARD');

	function selectInvoice(id: string) {
    setSelectedInvoiceId(id);
    setView('details');
  }

  function startPayment(id?: string) {
    setSelectedInvoiceId(invoice?.id ?? null);
    setInstallmentId(id);
    setView('payment');
  }

  function startInvoicePayment(invoiceId: string) {
    setSelectedInvoiceId(invoiceId);
    setInstallmentId(undefined);
    setView('payment');
  }

  function showInstallmentPlans(planId?: string) {
    setSelectedPlanId(planId ?? null);
    setView('plans');
  }

	const walletRefetch = queryWallet.refetch();
	const invoiceRefetch = queryInvoice.refetch();
	const installmentPlansRefetch = queryInstallmentPlans.refetch();

	return {
		setView,
		selectedInvoiceId,
		setSelectedInvoiceId,
		view,
		selectedPlanId,
		installmentId,
		wallet,
		invoices,
		isCreditCard,
		invoice,
		installmentPlans,
		payment,
		details,
		displayInvoice,
		paymentWallets,
		selectInvoice,
		startPayment,
		startInvoicePayment,
		showInstallmentPlans,
		walletRefetch,
		invoiceRefetch,
		installmentPlansRefetch,
		isError: queryWallet.isError || queryInvoice.isError || queryInstallmentPlans.isError,
		isPending: queryWallet.isPending || queryInvoice.isPending || queryInstallmentPlans.isPending
	}
}

export default useWalletDetails