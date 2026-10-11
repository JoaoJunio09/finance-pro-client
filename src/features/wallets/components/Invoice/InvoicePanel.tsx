import { Layers3 } from 'lucide-react';
import type { InstallmentPlanResponse } from '../../../../models/installmentPlan/InstallmentPlanResponse';
import type { InvoiceDetails } from '../../../../models/invoice/InvoiceDetails';
import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatInvoiceDate, formatInvoiceMonth, getInvoiceVisualStatus } from '../../../../utils/invoices';
import { InvoiceInstallments } from './InvoiceInstallments';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { InstallmentPlanOverview } from './InstallmentPlanOverview';
import styles from './Invoice.module.css';

interface Props {
  invoice: InvoiceResponse;
  details: InvoiceDetails;
  plans: InstallmentPlanResponse[];
  plansLoading: boolean;
  onPay: (installmentId?: string) => void;
  onPlans: (planId?: string) => void;
}

export function InvoicePanel({ invoice, details, plans, plansLoading, onPay, onPlans }: Props) {
  const status = getInvoiceVisualStatus(details);
  const canPay = details.status !== 'PAID' && details.pendingAmount > 0
    && Boolean(details.closingDate && details.expirationDate);

  return (
    <section className={styles.screen} aria-label="Detalhes da fatura">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Fatura selecionada</span>
          <h2 className="capitalize">{formatInvoiceMonth(details.closingDate)}</h2>
          <p>O ciclo é definido pelo mês de fechamento, mesmo após o vencimento.</p>
        </div>
        <InvoiceStatusBadge invoice={details} />
      </div>
      <dl className={styles.metadata}>
        <div><dt>Fechamento</dt><dd>{formatInvoiceDate(details.closingDate)}</dd></div>
        <div><dt>Vencimento</dt><dd>{formatInvoiceDate(details.expirationDate)}</dd></div>
        <div><dt>Limite desta fatura</dt><dd>{invoice.limit == null ? 'Não informado' : formatCurrencyLabel(invoice.limit)}</dd></div>
        <div><dt>Prazo após fechamento</dt><dd>{invoice.daysUntilExpiration == null ? 'Não informado' : `${invoice.daysUntilExpiration} dias`}</dd></div>
      </dl>
      <dl className={styles.totals}>
        <div><dt>Total da fatura</dt><dd>{formatCurrencyLabel(details.totalAmount)}</dd></div>
        <div><dt>Já pago</dt><dd>{formatCurrencyLabel(details.paidAmount)}</dd></div>
        <div className={styles.outstanding}><dt>Restante a pagar</dt><dd>{formatCurrencyLabel(details.pendingAmount)}</dd></div>
      </dl>
      {status === 'EXPIRED' && <p className={styles.notice}>Esta fatura está vencida. Ao registrar o pagamento, somente as parcelas pendentes deste ciclo serão marcadas como pagas.</p>}
      {status === 'DUE_SOON' && <p className={styles.notice}>O vencimento está próximo. Depois de pagar no banco, volte aqui para atualizar tudo em poucos cliques.</p>}
      {details.pendingAmount === 0 && details.status !== 'PAID' && (
        <p className={styles.notice}>Não há valor pendente neste ciclo. O status da fatura ainda consta como em aberto no servidor.</p>
      )}
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Atalho do mês</span>
          <h2>Parcelas para acompanhar agora</h2>
          <p className={styles.muted}>Começamos pelas pendentes. Você também pode ver as pagas ou todas em ordem alfabética.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => onPlans()}>
            <Layers3 size={16} aria-hidden="true" /> Visualizar parcelamentos
          </button>
          {canPay && <button type="button" className={styles.primary} onClick={() => onPay()}>Registrar fatura paga</button>}
        </div>
      </div>
      <InvoiceInstallments installments={details.installments} expired={status === 'EXPIRED'}
        onPay={canPay ? onPay : undefined} filterable />
      <InstallmentPlanOverview plans={plans} isLoading={plansLoading} onSelect={onPlans} />
      <p className={styles.identifier}>Identificador da fatura: {details.invoiceId}</p>
    </section>
  );
}
