import { Layers3 } from 'lucide-react';
import type { InstallmentPlanResponse } from '../../../../models/installmentPlan/InstallmentPlanResponse';
import type { InvoiceDetails } from '../../../../models/invoice/InvoiceDetails';
import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatInvoiceDate, formatInvoiceMonth, getInvoiceVisualStatus } from '../../../../utils/invoices';
import { InstallmentPlanOverview } from './InstallmentPlanOverview';
import styles from './Invoice.module.css';
import { InvoiceInstallments } from './InvoiceInstallments';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';

interface Props {
  invoice: InvoiceResponse;
  details: InvoiceDetails;
  plans: InstallmentPlanResponse[];
  plansLoading: boolean;
  onPay: (installmentId?: string) => void;
  onPlans: (planId?: string) => void;
}

export function InvoicePanel({ details, plans, plansLoading, onPay, onPlans }: Props) {
  const status = getInvoiceVisualStatus(details);
  const canPay = details.status !== 'PAID' && details.pendingAmount > 0
    && Boolean(details.closingDate && details.expirationDate);

  return (
    <section className={styles.screen} aria-label="Detalhes da fatura">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Fatura atual</span>
          <h2 className="capitalize">{formatInvoiceMonth(details.closingDate)}</h2>
        </div>
        <InvoiceStatusBadge invoice={details} />
      </div>
      <dl className={styles.metadata}>
        <div><dt>Fechamento</dt><dd>{formatInvoiceDate(details.closingDate)}</dd></div>
        <div><dt>Vencimento</dt><dd>{formatInvoiceDate(details.expirationDate)}</dd></div>
      </dl>
      <dl className={styles.totals}>
        <div className={styles.outstanding}><dt>Restante a pagar</dt><dd>{formatCurrencyLabel(details.pendingAmount)}</dd></div>
        <div><dt>Total da fatura</dt><dd>{formatCurrencyLabel(details.totalAmount)}</dd></div>
        <div><dt>Já pago</dt><dd>{formatCurrencyLabel(details.paidAmount)}</dd></div>
      </dl>
      {status === 'EXPIRED' && <p className={styles.notice}>Esta fatura está vencida. Ao registrar o pagamento, somente as parcelas pendentes deste ciclo serão marcadas como pagas.</p>}
      {status === 'DUE_SOON' && <p className={styles.notice}>O vencimento está próximo. Depois de pagar no banco, volte aqui para atualizar tudo em poucos cliques.</p>}
      {details.pendingAmount === 0 && details.status !== 'PAID' && (
        <p className={styles.notice}>Não há valor pendente neste ciclo. O status da fatura ainda consta como em aberto no servidor.</p>
      )}
      <div className={styles.heading}>
        <div>
          <h2>Parcelas deste mês</h2>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => onPlans()}>
            <Layers3 size={16} aria-hidden="true" /> Visualizar parcelamentos
          </button>
          {canPay && (
            <button type="button" className={styles.primary} onClick={() => onPay()}>
              {status === 'EXPIRED' ? 'Pagar fatura vencida' : 'Registrar fatura paga'}
            </button>
          )}
        </div>
      </div>
      <InvoiceInstallments
        installments={details.installments}
        expired={status === 'EXPIRED'}
        onPay={canPay ? onPay : undefined}
        filterable
      />
      <InstallmentPlanOverview
        plans={plans}
        isLoading={plansLoading}
        onSelect={onPlans}
      />
    </section>
  );
}
