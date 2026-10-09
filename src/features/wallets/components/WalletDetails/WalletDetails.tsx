import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, CreditCard, Layers3, ReceiptText, WalletCards } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BackButton } from '../../../../components/ui/BackButton/BackButton';
import showToast from '../../../../components/ui/Toast/Toast';
import useWalletService from '../../../../hooks/useWalletService';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatDateLabel } from '../../../../utils/FormatDate';
import { InstallmentPlansExplorer } from '../InstallmentPlansExplorer/InstallmentPlansExplorer';
import { WalletVisual } from '../WalletVisual/WalletVisual';

interface Props {
  wallet: WalletResponse;
  wallets: WalletResponse[];
  onBack: () => void;
}

const billStatus = {
  PAID: { label: 'Fatura paga', className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' },
  PENDING: { label: 'Fatura pendente', className: 'bg-amber-500/15 text-amber-700 dark:text-amber-300' },
  DUE_SOON: { label: 'Vencendo em breve', className: 'bg-orange-500/15 text-orange-700 dark:text-orange-300' },
  EXPIRED: { label: 'Fatura vencida', className: 'bg-red-500/15 text-red-700 dark:text-red-300' }
};

export function WalletDetails({ wallet, wallets, onBack }: Props) {
  const walletService = useWalletService();
  const queryClient = useQueryClient();
  const [isPaymentView, setIsPaymentView] = useState(false);
  const [isInstallmentExplorerOpen, setIsInstallmentExplorerOpen] = useState(false);
  const paymentWallets = useMemo(
    () => wallets.filter(item => item.id !== wallet.id && item.type !== 'CREDIT_CARD'),
    [wallets, wallet.id]
  );
  const [paymentWalletId, setPaymentWalletId] = useState('');
  const isCreditCard = wallet.type === 'CREDIT_CARD';

  const billQuery = useQuery({
    queryKey: ['credit-card-bill', wallet.id],
    queryFn: () => walletService.getCreditCardBill(wallet.id),
    enabled: isCreditCard
  });

  const refreshBill = () => {
    queryClient.invalidateQueries({ queryKey: ['credit-card-bill', wallet.id] });
    queryClient.invalidateQueries({ queryKey: ['wallets'] });
  };

  const payInstallment = useMutation({
    mutationFn: (installmentId: string) => walletService.payCreditCardInstallment(wallet.id, installmentId, paymentWalletId),
    onSuccess: () => {
      showToast({ title: 'Parcela paga', message: 'O valor foi debitado da carteira selecionada.', type: 'success' });
      refreshBill();
    }
  });

  const payBill = useMutation({
    mutationFn: () => walletService.payCreditCardBill(wallet.id, paymentWalletId),
    onSuccess: () => {
      showToast({ title: 'Fatura paga', message: 'Todas as parcelas pendentes do ciclo foram quitadas.', type: 'success' });
      setIsPaymentView(false);
      refreshBill();
    }
  });

  const bill = billQuery.data;
  const status = bill ? billStatus[bill.status] : null;
  const canPay = Boolean(paymentWalletId) && (bill?.pendingAmount ?? 0) > 0;

  if (isCreditCard && isInstallmentExplorerOpen) {
    return (
      <main className="relative z-10 mx-auto max-w-[1400px] min-w-0 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-12">
        <section className="min-w-0 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3 border-b border-[var(--border-light)] pb-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">{wallet.bank?.name ?? 'Cartão de crédito'}</p>
                <h1 className="font-bold text-[var(--text-main)]">{wallet.name}</h1>
              </div>
            </div>
          </div>
          <InstallmentPlansExplorer
            wallet={wallet}
            onBack={() => setIsInstallmentExplorerOpen(false)}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="relative z-10 mx-auto max-w-[1400px] min-w-0 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-12">
      <BackButton className="mb-6" label="Todas as carteiras" onClick={onBack} />

      <section className="min-w-0 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-7">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)]">Detalhes da carteira</p>
            <h1 className="mt-1 text-2xl font-bold text-[var(--text-main)]">{wallet.name}</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{wallet.bank?.name ?? wallet.description}</p>
          </div>
          <WalletVisual size="large" wallet={wallet} />
        </div>

        {isCreditCard && (
          <button
            onClick={() => setIsInstallmentExplorerOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-elevated)] px-4 py-3 text-sm font-bold text-[var(--text-main)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-sm"
          >
            <Layers3 size={18} /> Visualizar parcelamentos
          </button>
        )}

        {!isCreditCard && (
          <div className="mt-8 rounded-2xl border border-[var(--border-light)] bg-[var(--bg-elevated)] p-6 text-sm text-[var(--text-muted)]">
            Esta carteira não é um cartão de crédito. Acompanhe o saldo e as movimentações normalmente pela listagem de transações.
          </div>
        )}

        {isCreditCard && billQuery.isLoading && <p className="mt-8 text-sm text-[var(--text-muted)]">Carregando fatura…</p>}

        {isCreditCard && billQuery.isError && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">
            <AlertTriangle size={20} /> Não foi possível carregar a fatura deste cartão.
          </div>
        )}

        {isCreditCard && bill && !isPaymentView && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-[var(--border-light)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Status</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${status?.className}`}>{status?.label}</span>
              </div>
              <div className="rounded-2xl border border-[var(--border-light)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Fechamento</p>
                <p className="mt-3 font-bold text-[var(--text-main)]">{formatDateLabel(bill.closingDate)}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-light)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">Vencimento</p>
                <p className="mt-3 font-bold text-[var(--text-main)]">{formatDateLabel(bill.expirationDate)}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-light)] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">A pagar</p>
                <p className="mt-3 font-bold text-[var(--text-main)]">{formatCurrencyLabel(bill.pendingAmount)}</p>
              </div>
            </div>

            {bill.status === 'EXPIRED' && <p className="rounded-xl bg-red-500/10 p-3 text-sm font-medium text-red-700 dark:text-red-300">Esta fatura venceu. Quite-a para avançar o ciclo do cartão.</p>}
            {bill.status === 'DUE_SOON' && <p className="rounded-xl bg-orange-500/10 p-3 text-sm font-medium text-orange-700 dark:text-orange-300">A fatura vence em breve. Revise as parcelas antes de pagar.</p>}

            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border-light)] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-[var(--text-main)]">Fatura do ciclo</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{bill.installments.length} parcela(s) vinculada(s) ao fechamento atual.</p>
              </div>
              <button onClick={() => setIsPaymentView(true)} disabled={bill.pendingAmount === 0} className="rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
                Pagar fatura
              </button>
            </div>

            <div className="space-y-3">
              {bill.installments.map(installment => (
                <div key={installment.id} className="flex flex-col gap-3 rounded-2xl border border-[var(--border-light)] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--bg-elevated)] p-2 text-[var(--accent)]"><ReceiptText size={20} /></div>
                    <div>
                      <p className="font-semibold text-[var(--text-main)]">{installment.description}</p>
                      <p className="text-sm text-[var(--text-muted)]">Parcela de {String(installment.month).padStart(2, '0')}/{installment.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:text-right">
                    <div><p className="font-bold text-[var(--text-main)]">{formatCurrencyLabel(installment.value)}</p><p className={`text-xs font-semibold ${installment.paid ? 'text-emerald-600' : 'text-amber-600'}`}>{installment.paid ? 'Paga' : 'Pendente'}</p></div>
                    {!installment.paid && (
                      <button disabled={!paymentWalletId || payInstallment.isPending} onClick={() => payInstallment.mutate(installment.id)} className="rounded-lg border border-[var(--accent)] px-3 py-2 text-xs font-bold text-[var(--accent)] disabled:opacity-50">
                        Pagar parcela
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {bill.installments.length === 0 && <p className="rounded-2xl bg-[var(--bg-elevated)] p-5 text-sm text-[var(--text-muted)]">Não há parcelas neste ciclo de fechamento.</p>}
            </div>

            {bill.pendingAmount > 0 && (
              <label className="block text-sm font-semibold text-[var(--text-main)]">
                Carteira para pagar uma parcela
                <select value={paymentWalletId} onChange={event => setPaymentWalletId(event.target.value)} className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-sm font-normal">
                  <option value="">Selecione a carteira de origem</option>
                  {paymentWallets.map(paymentWallet => <option key={paymentWallet.id} value={paymentWallet.id}>{paymentWallet.name} · {formatCurrencyLabel(paymentWallet.balance)}</option>)}
                </select>
              </label>
            )}
          </div>
        )}

        {isCreditCard && bill && isPaymentView && (
          <div className="mt-8 space-y-6">
            <BackButton label="Voltar aos detalhes da fatura" onClick={() => setIsPaymentView(false)} />
            <div className="rounded-2xl border border-[var(--border-light)] p-5">
              <div className="flex items-center gap-3"><CreditCard className="text-[var(--accent)]" /><div><h2 className="font-bold text-[var(--text-main)]">Confirmar pagamento da fatura</h2><p className="text-sm text-[var(--text-muted)]">Todas as parcelas pendentes ou vencidas deste ciclo serão quitadas.</p></div></div>
              <div className="mt-5 space-y-2 border-y border-[var(--border-light)] py-4 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Total do ciclo</span><strong>{formatCurrencyLabel(bill.totalAmount)}</strong></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Já pago</span><strong>{formatCurrencyLabel(bill.paidAmount)}</strong></div>
                <div className="flex justify-between text-base"><span className="font-semibold text-[var(--text-main)]">Total a debitar</span><strong className="text-[var(--accent)]">{formatCurrencyLabel(bill.pendingAmount)}</strong></div>
              </div>
              <label className="mt-5 block text-sm font-semibold text-[var(--text-main)]">Debitar da carteira
                <select value={paymentWalletId} onChange={event => setPaymentWalletId(event.target.value)} className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3 text-sm font-normal">
                  <option value="">Selecione a carteira de origem</option>
                  {paymentWallets.map(paymentWallet => <option key={paymentWallet.id} value={paymentWallet.id}>{paymentWallet.name} · {formatCurrencyLabel(paymentWallet.balance)}</option>)}
                </select>
              </label>
              <button disabled={!canPay || payBill.isPending} onClick={() => payBill.mutate()} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"><WalletCards size={18} /> Confirmar pagamento da fatura</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
