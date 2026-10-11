import {
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Layers3,
  PackageOpen,
  ReceiptText,
  TimerReset,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { BackButton } from '../../../../components/ui/BackButton/BackButton';
import type { InstallmentResponse } from '../../../../models/installment/InstallmentResponse';
import type { InstallmentPlanResponse } from '../../../../models/installmentPlan/InstallmentPlanResponse';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatDateLabel } from '../../../../utils/FormatDate';
import { WalletVisual } from '../WalletVisual/WalletVisual';
import styles from './InstallmentPlansExplorer.module.css';

type InstallmentState = 'PAID' | 'CURRENT' | 'UPCOMING' | 'EXPIRED';

interface Props {
  wallet: WalletResponse;
  plans: InstallmentPlanResponse[];
  cycleDate: string | null;
  initialPlanId?: string | null;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

const planStatus = {
  PAYING: { label: 'Em andamento', className: styles.statusPaying },
  INVOICED: { label: 'Na fatura', className: styles.statusPaying },
  PAID: { label: 'Quitado', className: styles.statusPaid },
  EXPIRED: { label: 'Parcela vencida', className: styles.statusExpired },
} as const;

const installmentState = {
  PAID: { label: 'Paga', className: styles.installmentPaid },
  CURRENT: { label: 'Neste ciclo', className: styles.installmentCurrent },
  UPCOMING: { label: 'Próxima', className: styles.installmentUpcoming },
  EXPIRED: { label: 'Vencida', className: styles.installmentExpired },
} as const;

function getPlanTotal(plan: InstallmentPlanResponse) {
  return plan.installments.reduce((total, installment) => total + installment.value, 0);
}

function getCycleIndex(cycleDate: string | null) {
  if (!cycleDate) {
    const today = new Date();
    return today.getFullYear() * 12 + today.getMonth() + 1;
  }

  const [year, month] = cycleDate.split('-').map(Number);
  return year * 12 + month;
}

function getInstallmentState(installment: InstallmentResponse, cycleDate: string | null): InstallmentState {
  if (installment.isPaid) return 'PAID';

  const installmentIndex = installment.year * 12 + installment.month;
  const cycleIndex = getCycleIndex(cycleDate);

  if (installmentIndex < cycleIndex) return 'EXPIRED';
  if (installmentIndex === cycleIndex) return 'CURRENT';
  return 'UPCOMING';
}

function sortInstallments(installments: InstallmentResponse[]) {
  return [...installments].sort((first, second) =>
    first.year - second.year || first.month - second.month);
}

export function InstallmentPlansExplorer({
  wallet,
  plans,
  cycleDate,
  initialPlanId = null,
  isLoading,
  isError,
  onRetry,
}: Props) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(initialPlanId);
  const orderedPlans = useMemo(
    () => [...plans].sort((first, second) =>
      first.description.localeCompare(second.description, 'pt-BR', { sensitivity: 'base' })),
    [plans]
  );
  const selectedPlan = orderedPlans.find(plan => plan.id === selectedPlanId) ?? null;

  useEffect(() => {
    setSelectedPlanId(initialPlanId);
  }, [initialPlanId]);

  if (selectedPlan) {
    const installments = sortInstallments(selectedPlan.installments);
    const paidInstallments = installments.filter(item => item.isPaid).length;
    const pendingInstallments = installments.length - paidInstallments;
    const totalValue = getPlanTotal(selectedPlan);

    return (
      <section className={styles.screen} aria-label={`Detalhes do parcelamento ${selectedPlan.description}`}>
        <BackButton label="Voltar aos parcelamentos" onClick={() => setSelectedPlanId(null)} />

        <div className={styles.detailHero}>
          <div className={styles.detailHeading}>
            <span className={styles.eyebrow}><ReceiptText size={14} aria-hidden="true" /> Parcelamento selecionado</span>
            <h2>{selectedPlan.description}</h2>
            <p>Começou em {formatDateLabel(selectedPlan.startDate)} e segue organizado parcela por parcela.</p>
          </div>
          <div className={styles.detailReference}>
            <WalletVisual size="compact" wallet={wallet} />
            <span className={`${styles.status} ${planStatus[selectedPlan.status].className}`}>
              {planStatus[selectedPlan.status].label}
            </span>
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}><span>Valor original</span><strong>{formatCurrencyLabel(selectedPlan.value)}</strong></div>
          <div className={styles.metric}><span>Total parcelado</span><strong>{formatCurrencyLabel(totalValue)}</strong></div>
          <div className={styles.metric}><span>Juros</span><strong>{selectedPlan.fees}%</strong></div>
          <div className={styles.metric}><span>Seu progresso</span><strong>{paidInstallments}/{installments.length} pagas</strong></div>
        </div>

        <div className={styles.detailGrid}>
          <section className={styles.timelineCard}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>Linha do tempo</span>
                <h3>Todas as parcelas</h3>
              </div>
              <span className={styles.counter}>{pendingInstallments} em aberto</span>
            </div>

            <div className={styles.installmentGrid}>
              {installments.map((installment, index) => {
                const state = installmentState[getInstallmentState(installment, cycleDate)];
                return (
                  <article className={`${styles.installmentCard} ${state.className}`} key={installment.id}>
                    <div className={styles.installmentTop}>
                      <span>Parcela {String(index + 1).padStart(2, '0')}</span>
                      {installment.isPaid ? <CheckCircle2 size={17} aria-hidden="true" /> : <Clock3 size={17} aria-hidden="true" />}
                    </div>
                    <strong>{formatCurrencyLabel(installment.value)}</strong>
                    <p>{String(installment.month).padStart(2, '0')}/{installment.year}</p>
                    <small>{state.label}</small>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className={styles.summaryCard}>
            <span className={styles.eyebrow}><CircleDollarSign size={14} aria-hidden="true" /> Resumo da compra</span>
            <div className={styles.summaryValue}>
              {installments.length}x de {formatCurrencyLabel(installments.length ? totalValue / installments.length : 0)}
            </div>
            <div className={styles.progressTrack} aria-label={`${paidInstallments} de ${installments.length} parcelas pagas`}>
              <span style={{ width: `${installments.length ? (paidInstallments / installments.length) * 100 : 0}%` }} />
            </div>
            <p>{paidInstallments} parcelas confirmadas de {installments.length} no total.</p>
            <div className={styles.summaryRows}>
              <div><span>Início</span><strong>{formatDateLabel(selectedPlan.startDate)}</strong></div>
              <div><span>Término previsto</span><strong>{formatDateLabel(selectedPlan.endDate)}</strong></div>
              <div><span>Cartão</span><strong>{wallet.name}</strong></div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  const activePlans = orderedPlans.filter(plan => plan.status !== 'PAID').length;
  const totalOpenAmount = orderedPlans
    .flatMap(plan => plan.installments)
    .filter(installment => !installment.isPaid)
    .reduce((total, installment) => total + installment.value, 0);

  return (
    <section className={styles.screen} aria-label="Parcelamentos do cartão">
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}><Layers3 size={14} aria-hidden="true" /> Compras em movimento</span>
          <h2>Seus parcelamentos, sem complicação</h2>
          <p>Cada compra tem sua própria história. Abra uma delas para enxergar o que já passou, o ciclo atual e o que vem depois.</p>
        </div>
        <WalletVisual size="compact" wallet={wallet} />
      </div>

      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}><span className={styles.overviewIcon}><Layers3 size={19} /></span><div><p>Planos ativos</p><strong>{activePlans}</strong></div></div>
        <div className={styles.overviewCard}><span className={styles.overviewIcon}><TimerReset size={19} /></span><div><p>Valor ainda em aberto</p><strong>{formatCurrencyLabel(totalOpenAmount)}</strong></div></div>
        <div className={styles.overviewCard}><span className={styles.overviewIcon}><CreditCard size={19} /></span><div><p>Cartão acompanhado</p><strong>{wallet.name}</strong></div></div>
      </div>

      <div className={styles.listHeading}>
        <div><span className={styles.eyebrow}>Uma compra por vez</span><h3>Todos os parcelamentos</h3></div>
        <span>{orderedPlans.length} {orderedPlans.length === 1 ? 'parcelamento' : 'parcelamentos'}</span>
      </div>

      {isLoading ? (
        <p className={styles.empty} role="status">Organizando seus parcelamentos…</p>
      ) : isError ? (
        <div className={styles.empty} role="alert">
          <p>Não foi possível buscar os parcelamentos deste cartão.</p>
          <button type="button" onClick={onRetry}>Tentar novamente</button>
        </div>
      ) : orderedPlans.length ? (
        <div className={styles.planList}>
          {orderedPlans.map((plan, index) => {
            const installments = sortInstallments(plan.installments);
            const paid = installments.filter(item => item.isPaid).length;
            const nextInstallment = installments.find(item => !item.isPaid);
            const total = getPlanTotal(plan);

            return (
              <button
                className={styles.planCard}
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className={styles.planIdentity}>
                  <span className={styles.planIcon}><PackageOpen size={21} aria-hidden="true" /></span>
                  <div><h4>{plan.description}</h4><p>{installments.length} parcelas · termina em {formatDateLabel(plan.endDate)}</p></div>
                </div>
                <div className={styles.planProgress}>
                  <div className={styles.planProgressLabel}><span>{paid} de {installments.length} pagas</span><strong>{formatCurrencyLabel(total)}</strong></div>
                  <div className={styles.progressTrack}><span style={{ width: `${installments.length ? (paid / installments.length) * 100 : 0}%` }} /></div>
                  <small>{nextInstallment ? `Próxima referência: ${String(nextInstallment.month).padStart(2, '0')}/${nextInstallment.year}` : 'Tudo quitado por aqui'}</small>
                </div>
                <div className={styles.planAction}>
                  <span className={`${styles.status} ${planStatus[plan.status].className}`}>{planStatus[plan.status].label}</span>
                  <ChevronRight size={20} aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}><PackageOpen size={26} aria-hidden="true" /><p>Nenhum parcelamento encontrado neste cartão.</p></div>
      )}
    </section>
  );
}
