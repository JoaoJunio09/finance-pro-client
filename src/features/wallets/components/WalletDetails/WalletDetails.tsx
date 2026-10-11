import { useQuery } from '@tanstack/react-query';
import { History, ReceiptText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BackButton } from '../../../../components/ui/BackButton/BackButton';
import useInvoiceService from '../../../../hooks/useInvoiceService';
import useInstallmentPlanService from '../../../../hooks/useInstallmentPlanService';
import useWalletService from '../../../../hooks/useWalletService';
import type { InstallmentPlanResponse } from '../../../../models/installmentPlan/InstallmentPlanResponse';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { getCurrentInvoice } from '../../../../utils/invoices';
import { useInvoicePayment } from '../../hooks/useInvoicePayment';
import { InstallmentPlansExplorer } from '../InstallmentPlansExplorer/InstallmentPlansExplorer';
import { InvoiceHistory } from '../Invoice/InvoiceHistory';
import { InvoicePanel } from '../Invoice/InvoicePanel';
import { InvoicePayment } from '../Invoice/InvoicePayment';
import { WalletVisual } from '../WalletVisual/WalletVisual';
import styles from '../Invoice/Invoice.module.css';

type View = 'details' | 'history' | 'payment' | 'plans';

interface Props {
  wallet: WalletResponse;
  wallets: WalletResponse[];
  initialView?: 'details' | 'history';
  onBack: () => void;
}

export function WalletDetails({ wallet: initialWallet, wallets, initialView = 'details', onBack }: Props) {
  const walletService = useWalletService();
  const invoiceService = useInvoiceService();
  const installmentPlanService = useInstallmentPlanService();
  const [view, setView] = useState<View>(initialView);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [installmentId, setInstallmentId] = useState<string>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const walletQuery = useQuery({
    queryKey: ['wallet', initialWallet.id],
    queryFn: () => walletService.getById(initialWallet.id),
    initialData: wallets.find(item => item.id === initialWallet.id) ?? initialWallet,
    retry: 1,
  });
  const wallet = walletQuery.data;
  const invoices = wallet.invoices ?? [];
  const isCreditCard = wallet.type === 'CREDIT_CARD';
  const invoice = invoices.find(item => item.id === selectedInvoiceId) ?? getCurrentInvoice(invoices);
  const invoiceQuery = useQuery({
    queryKey: ['invoice', wallet.id, invoice?.id],
    queryFn: ({ signal }) => invoiceService.getDetails(invoice!.id, signal),
    enabled: isCreditCard && Boolean(invoice) && view !== 'history',
    retry: 1,
  });
  const installmentPlansQuery = useQuery<InstallmentPlanResponse[]>({
    queryKey: ['installment-plans', wallet.id],
    queryFn: ({ signal }) => installmentPlanService.getAllByWallet(wallet.id, signal),
    enabled: isCreditCard && (view === 'details' || view === 'plans'),
    retry: 1,
  });
  const payment = useInvoicePayment(wallet.id, () => setView('details'));
  const details = invoiceQuery.data;
  const displayInvoice = invoice && details?.invoiceId === invoice.id
    ? { ...invoice, status: details.status, closingDate: details.closingDate, expirationDate: details.expirationDate }
    : invoice;
  const paymentWallets = wallets.filter(item => item.id !== wallet.id && item.type !== 'CREDIT_CARD');

  useEffect(() => {
    headingRef.current?.focus();
  }, [view, invoice?.id]);

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

  const compact = view !== 'details';
  const showHeaderWallet = view !== 'plans';
  const backLabel = view === 'payment' || view === 'plans'
    ? 'Voltar à fatura'
    : view === 'details' && selectedInvoiceId ? 'Voltar ao histórico' : 'Todas as carteiras';
  const goBack = () => {
    if (view === 'payment' || view === 'plans') setView('details');
    else if (view === 'details' && selectedInvoiceId) setView('history');
    else onBack();
  };

  return (
    <main className="relative z-10 mx-auto max-w-[1400px] min-w-0 px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-12">
      <BackButton className="mb-6" label={backLabel} onClick={goBack} disabled={payment.isPending} />
      <section className="min-w-0 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-7">
        <div className={`grid min-w-0 grid-cols-1 gap-6 sm:items-center ${showHeaderWallet ? (compact ? 'sm:grid-cols-[minmax(0,1fr)_220px]' : 'xl:grid-cols-[minmax(0,1fr)_380px]') : ''}`}>
          <div className="min-w-0">
            <p className={styles.eyebrow}>{isCreditCard ? 'Seu cartão' : 'Detalhes da carteira'}</p>
            <h1 ref={headingRef} tabIndex={-1} className="mt-2 break-words text-2xl font-bold text-[var(--text-main)] outline-none">{wallet.name}</h1>
            <p className={styles.muted}>{wallet.bank?.name ?? wallet.description}</p>
            {isCreditCard && view !== 'payment' && (
              <div className={`${styles.filters} mt-5`} aria-label="Navegação das faturas">
                <button type="button" className={styles.filter} aria-pressed={view !== 'history'}
                  onClick={() => { setSelectedInvoiceId(null); setView('details'); }}>
                  <ReceiptText size={16} aria-hidden="true" /> Fatura do cartão
                </button>
                <button type="button" className={styles.filter} aria-pressed={view === 'history'}
                  onClick={() => setView('history')}>
                  <History size={16} aria-hidden="true" /> Histórico de faturas
                </button>
              </div>
            )}
          </div>
          {showHeaderWallet && (
            <WalletVisual size={compact ? 'compact' : 'large'} wallet={wallet}
              invoice={view === 'history' ? getCurrentInvoice(invoices) : displayInvoice} />
          )}
        </div>
        <div className="mt-8 border-t border-[var(--border-color)] pt-6" key={`${view}-${invoice?.id ?? 'empty'}`}>
          {!isCreditCard ? (
            <p className={styles.notice}>Acompanhe o saldo e as movimentações desta carteira pela listagem de transações.</p>
          ) : walletQuery.isError ? (
            <div className={styles.empty} role="alert">
              <p>Não foi possível atualizar os dados do cartão.</p>
              <button type="button" className={styles.secondary} onClick={() => void walletQuery.refetch()}>Tentar novamente</button>
            </div>
          ) : view === 'history' ? (
            <InvoiceHistory
              invoices={invoices}
              onSelect={selectInvoice}
              onPay={startInvoicePayment}
            />
          ) : !invoice ? (
            <div className={styles.empty}>
              <ReceiptText size={28} aria-hidden="true" />
              <p>Este cartão ainda não possui faturas.</p>
              <p>A API precisa disponibilizar uma fatura para registrar compras parceladas neste cartão.</p>
            </div>
          ) : invoiceQuery.isPending ? (
            <p className={styles.empty} role="status">Carregando fatura…</p>
          ) : invoiceQuery.isError ? (
            <div className={styles.empty} role="alert">
              <p>Não foi possível carregar esta fatura. Seus dados não foram alterados.</p>
              <button type="button" className={styles.secondary} onClick={() => void invoiceQuery.refetch()}>Tentar novamente</button>
            </div>
          ) : details && (
            view === 'payment' ? (
              <InvoicePayment details={details} wallets={paymentWallets} installmentId={installmentId}
                busy={payment.isPending} onConfirm={paymentWalletId => payment.mutate({
                  invoiceId: details.invoiceId,
                  paymentWalletId,
                  installmentId,
                })} />
            ) : view === 'plans' ? (
              <InstallmentPlansExplorer
                wallet={wallet}
                plans={installmentPlansQuery.data ?? []}
                cycleDate={details.closingDate}
                initialPlanId={selectedPlanId}
                isLoading={installmentPlansQuery.isPending}
                isError={installmentPlansQuery.isError}
                onRetry={() => void installmentPlansQuery.refetch()}
              />
            ) : (
              <InvoicePanel
                invoice={invoice}
                details={details}
                plans={installmentPlansQuery.data ?? []}
                plansLoading={installmentPlansQuery.isPending}
                onPay={startPayment}
                onPlans={showInstallmentPlans}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}
