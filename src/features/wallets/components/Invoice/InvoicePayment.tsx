import { useState } from 'react';
import type { InvoiceDetails } from '../../../../models/invoice/InvoiceDetails';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatInvoiceDate, formatInvoiceMonth } from '../../../../utils/invoices';
import { InvoiceInstallments } from './InvoiceInstallments';
import styles from './Invoice.module.css';

interface Props {
  details: InvoiceDetails;
  wallets: WalletResponse[];
  installmentId?: string;
  busy: boolean;
  onConfirm: (paymentWalletId: string) => void;
}

export function InvoicePayment({ details, wallets, installmentId, busy, onConfirm }: Props) {
  const [paymentWalletId, setPaymentWalletId] = useState('');
  const selectedWallet = wallets.find(wallet => wallet.id === paymentWalletId);
  const installments = details.installments.filter(item =>
    !item.paid && (!installmentId || item.id === installmentId));
  const amount = installmentId ? (installments[0]?.value ?? 0) : details.pendingAmount;
  const insufficientBalance = selectedWallet && selectedWallet.balance < amount;
  const canPay = Boolean(selectedWallet) && !insufficientBalance && amount > 0
    && details.status !== 'PAID' && Boolean(details.closingDate && details.expirationDate);

  return (
    <form className={`${styles.screen} ${styles.form}`} onSubmit={event => {
      event.preventDefault();
      if (canPay && !busy) onConfirm(paymentWalletId);
    }} aria-busy={busy}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Um registro rápido, sem repetir o banco</span>
          <h2>{installmentId ? 'Registrar parcela paga' : 'Registrar fatura paga'}</h2>
          <p>{formatInvoiceMonth(details.closingDate)} · Vencimento em {formatInvoiceDate(details.expirationDate)}</p>
        </div>
      </div>
      <p className={styles.notice}>
        {installmentId
          ? 'Marque somente esta parcela como paga e o Capto ajusta a carteira escolhida. Nenhuma operação será feita no seu banco.'
          : 'Marque as parcelas pendentes deste ciclo como pagas e ajuste sua carteira no Capto. Parcelas já pagas e outros ciclos não entram neste registro.'}
      </p>
      <InvoiceInstallments installments={installments} />
      <dl className={styles.metadata}>
        <div><dt>Total do ciclo</dt><dd>{formatCurrencyLabel(details.totalAmount)}</dd></div>
        <div><dt>Já pago no ciclo</dt><dd>{formatCurrencyLabel(details.paidAmount)}</dd></div>
      </dl>
      <label className={styles.selectLabel}>
        Em qual carteira o pagamento já aconteceu?
        <select className={styles.select} required value={paymentWalletId} disabled={busy}
          onChange={event => setPaymentWalletId(event.target.value)}>
          <option value="">Selecione a carteira de origem</option>
          {wallets.map(wallet => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name} · {formatCurrencyLabel(wallet.balance)}
            </option>
          ))}
        </select>
      </label>
      {!wallets.length && <p className={styles.notice}>Adicione uma carteira de saldo para pagar esta fatura. Não é possível pagar com outro cartão de crédito.</p>}
      {insufficientBalance && <p className={styles.notice} role="alert">A carteira selecionada não possui saldo suficiente para este pagamento.</p>}
      <div className={styles.paymentTotal}>
        <span>Valor para registrar</span>
        <strong>{formatCurrencyLabel(amount)}</strong>
      </div>
      <button type="submit" className={styles.primary} disabled={!canPay || busy}>
        {busy ? 'Registrando…' : installmentId ? 'Confirmar parcela paga' : 'Confirmar fatura paga'}
      </button>
      <p className={styles.muted} role="status">
        {selectedWallet && !insufficientBalance
          ? `Saldo após o débito: ${formatCurrencyLabel(selectedWallet.balance - amount)}.`
          : 'Selecione uma carteira para conferir o saldo após o débito.'}
      </p>
    </form>
  );
}
