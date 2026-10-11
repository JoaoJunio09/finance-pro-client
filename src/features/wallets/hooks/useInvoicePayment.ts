import { useMutation, useQueryClient } from '@tanstack/react-query';
import showToast from '../../../components/ui/Toast/Toast';
import useInvoiceService from '../../../hooks/useInvoiceService';

interface InvoicePayment {
  invoiceId: string;
  paymentWalletId: string;
  installmentId?: string;
}

export function useInvoicePayment(walletId: string, onPaid: () => void) {
  const service = useInvoiceService();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invoiceId, paymentWalletId, installmentId }: InvoicePayment) =>
      installmentId
        ? service.payInstallment(invoiceId, installmentId, paymentWalletId)
        : service.payInvoice(invoiceId, paymentWalletId),
    retry: false,
    onSuccess: (details, variables) => {
      queryClient.setQueryData(['invoice', walletId, variables.invoiceId], details);
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
    onSettled: async () => {
      // Refresh even after a lost response: the server may have processed the debit.
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['invoice', walletId] }),
        queryClient.invalidateQueries({ queryKey: ['installment-plans', walletId] }),
        queryClient.invalidateQueries({ queryKey: ['wallet', walletId] }),
        queryClient.invalidateQueries({ queryKey: ['wallets'] }),
        queryClient.invalidateQueries({ queryKey: ['dashboard'] }),
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
      ]);
    },
  });
}
