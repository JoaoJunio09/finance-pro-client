import { ChevronRight, PackageOpen } from 'lucide-react';
import type { InstallmentPlanResponse } from '../../../../models/installmentPlan/InstallmentPlanResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatDateLabel } from '../../../../utils/FormatDate';
import styles from './Invoice.module.css';

interface Props {
  plans: InstallmentPlanResponse[];
  isLoading: boolean;
  onSelect: (planId?: string) => void;
}

const planStatusLabels = {
  PAYING: 'Em andamento',
  INVOICED: 'Na fatura',
  PAID: 'Quitado',
  EXPIRED: 'Com atraso',
} as const;

export function InstallmentPlanOverview({
  plans,
  isLoading,
  onSelect
}: Props) {
  const orderedPlans = [...plans].sort((first, second) =>
    first.description.localeCompare(second.description, 'pt-BR', { sensitivity: 'base' }));

  return (
    <section className={styles.planOverview} aria-labelledby="installment-plans-title">
      <div className={styles.planOverviewHeading}>
        <div>
          <h2 id="installment-plans-title">Parcelamentos</h2>
          <p>Acompanhe todas as parcelas de cada compra.</p>
        </div>
        <button type="button" className={styles.secondary} onClick={() => onSelect()}>
          Ver visão completa <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      {isLoading ? (
        <p className={styles.planLoading} role="status">Organizando seus parcelamentos…</p>
      ) : orderedPlans.length ? (
        <div className={styles.planPreviewGrid}>
          {orderedPlans.map(plan => {
            const paid = plan.installments.filter(installment => installment.isPaid).length;
            const total = plan.installments.reduce((sum, installment) => sum + installment.value, 0);
            const progress = plan.installments.length ? (paid / plan.installments.length) * 100 : 0;

            return (
              <button
                key={plan.id}
                type="button"
                className={styles.planPreview}
                onClick={() => onSelect(plan.id)}
              >
                <span className={styles.planPreviewIcon}><PackageOpen size={20} aria-hidden="true" /></span>
                <span className={styles.planPreviewContent}>
                  <strong>{plan.description}</strong>
                  <small>{paid} de {plan.installments.length} pagas · termina em {formatDateLabel(plan.endDate)}</small>
                  <span className={styles.planPreviewProgress} aria-hidden="true">
                    <span style={{ width: `${progress}%` }} />
                  </span>
                </span>
                <span className={styles.planPreviewMeta}>
                  <strong>{formatCurrencyLabel(total)}</strong>
                  <small>{planStatusLabels[plan.status]}</small>
                </span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.planEmpty}>
          <PackageOpen size={24} aria-hidden="true" />
          <p>Nenhuma compra parcelada neste cartão ainda.</p>
        </div>
      )}
    </section>
  );
}
