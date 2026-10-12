import { History, ReceiptText } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { BackButton } from '../../../../components/ui/BackButton/BackButton';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { getCurrentInvoice } from '../../../../utils/invoices';
import useWalletDetails from '../../hooks/useWalletDetails';
import { InstallmentPlansExplorer } from '../InstallmentPlansExplorer/InstallmentPlansExplorer';
import styles from '../Invoice/Invoice.module.css';
import { InvoiceHistory } from '../Invoice/InvoiceHistory';
import { InvoicePanel } from '../Invoice/InvoicePanel';
import { InvoicePayment } from '../Invoice/InvoicePayment';
import { WalletVisual } from '../WalletVisual/WalletVisual';

interface Props {
  wallet: WalletResponse;
  wallets: WalletResponse[];
  initialView?: 'details' | 'history';
  onBack: () => void;
}

export function WalletDetails({
  wallet: initialWallet,
  wallets,
  initialView = 'details',
  onBack
}: Props) {
   const {
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
		isError,
		isPending
  } = useWalletDetails(initialWallet, wallets, initialView);

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [view, invoice?.id]);

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
          ) : isError ? (
            <div className={styles.empty} role="alert">
              <p>Não foi possível atualizar os dados do cartão.</p>
              <button type="button" className={styles.secondary} onClick={() => walletRefetch}>Tentar novamente</button>
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
          ) : isPending ? (
            <p className={styles.empty} role="status">Carregando fatura…</p>
          ) : isPending ? (
            <div className={styles.empty} role="alert">
              <p>Não foi possível carregar esta fatura. Seus dados não foram alterados.</p>
              <button type="button" className={styles.secondary} onClick={() => invoiceRefetch}>Tentar novamente</button>
            </div>
          ) : details && (
            view === 'payment' ? (
              <InvoicePayment
                details={details}
                wallets={paymentWallets}
                installmentId={installmentId}
                busy={payment.isPending}
                onConfirm={paymentWalletId => payment.mutate({
                  invoiceId: details.invoiceId,
                  paymentWalletId,
                  installmentId,
                })}
              />
            ) : view === 'plans' ? (
              <InstallmentPlansExplorer
                wallet={wallet}
                plans={installmentPlans}
                cycleDate={details.closingDate}
                initialPlanId={selectedPlanId}
                isLoading={isPending}
                isError={isError}
                onRetry={() => installmentPlansRefetch}
              />
            ) : (
              <InvoicePanel
                invoice={invoice}
                details={details}
                plans={installmentPlans}
                plansLoading={isPending}
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