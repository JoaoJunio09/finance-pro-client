import {
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Layers3,
  ReceiptText,
  TimerReset
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { BackButton } from '../../../../components/ui/BackButton/BackButton';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatDateLabel } from '../../../../utils/FormatDate';
import { WalletVisual } from '../WalletVisual/WalletVisual';

import styles from './InstallmentPlansExplorer.module.css';

type PlanStatus = 'PAYING' | 'PAID' | 'EXPIRED';
type InstallmentState = 'PAID' | 'CURRENT' | 'UPCOMING' | 'EXPIRED';

interface MockInstallment {
  number: number;
  value: number;
  month: number;
  year: number;
  state: InstallmentState;
}

interface MockInstallmentPlan {
  id: string;
  description: string;
  totalValue: number;
  value: number;
  times: number;
  fees: number;
  startDate: string;
  endDate: string;
  status: PlanStatus;
  category: string;
  installments: MockInstallment[];
}

const mockInstallmentPlans: MockInstallmentPlan[] = [
  {
    id: 'mock-plan-cellphone',
    description: 'Celular Galaxy S25',
    totalValue: 3_588,
    value: 2_990,
    times: 12,
    fees: 20,
    startDate: '2026-01-10',
    endDate: '2026-12-10',
    status: 'PAYING',
    category: 'Eletrônicos',
    installments: Array.from({ length: 12 }, (_, index) => ({
      number: index + 1,
      value: 299,
      month: index + 1,
      year: 2026,
      state: index < 9 ? 'PAID' : index === 9 ? 'CURRENT' : 'UPCOMING'
    }))
  },
  {
    id: 'mock-plan-course',
    description: 'Curso de especialização',
    totalValue: 1_200,
    value: 1_200,
    times: 6,
    fees: 0,
    startDate: '2026-06-05',
    endDate: '2026-11-05',
    status: 'PAYING',
    category: 'Educação',
    installments: Array.from({ length: 6 }, (_, index) => ({
      number: index + 1,
      value: 200,
      month: index + 6,
      year: 2026,
      state: index < 4 ? 'PAID' : index === 4 ? 'CURRENT' : 'UPCOMING'
    }))
  },
  {
    id: 'mock-plan-furniture',
    description: 'Móveis para escritório',
    totalValue: 1_890,
    value: 1_750,
    times: 5,
    fees: 8,
    startDate: '2026-05-12',
    endDate: '2026-09-12',
    status: 'EXPIRED',
    category: 'Casa',
    installments: Array.from({ length: 5 }, (_, index) => ({
      number: index + 1,
      value: 378,
      month: index + 5,
      year: 2026,
      state: index < 4 ? 'PAID' : 'EXPIRED'
    }))
  },
  {
    id: 'mock-plan-headphones',
    description: 'Fone sem fio',
    totalValue: 899.4,
    value: 899.4,
    times: 3,
    fees: 0,
    startDate: '2026-02-15',
    endDate: '2026-04-15',
    status: 'PAID',
    category: 'Eletrônicos',
    installments: Array.from({ length: 3 }, (_, index) => ({
      number: index + 1,
      value: 299.8,
      month: index + 2,
      year: 2026,
      state: 'PAID'
    }))
  }
];

const planStatus = {
  PAYING: { label: 'Em andamento', className: styles.statusPaying },
  PAID: { label: 'Quitado', className: styles.statusPaid },
  EXPIRED: { label: 'Parcela vencida', className: styles.statusExpired }
};

const installmentState = {
  PAID: { label: 'Paga', className: styles.installmentPaid },
  CURRENT: { label: 'Mês atual', className: styles.installmentCurrent },
  UPCOMING: { label: 'Próxima', className: styles.installmentUpcoming },
  EXPIRED: { label: 'Vencida', className: styles.installmentExpired }
};

interface Props {
  wallet: WalletResponse;
  onBack: () => void;
}

export function InstallmentPlansExplorer({ wallet, onBack }: Props) {
  const walletName = wallet.name;
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const selectedPlan = useMemo(
    () => mockInstallmentPlans.find(plan => plan.id === selectedPlanId) ?? null,
    [selectedPlanId]
  );

  const activePlans = mockInstallmentPlans.filter(plan => plan.status === 'PAYING').length;
  const totalOpenAmount = mockInstallmentPlans
    .flatMap(plan => plan.installments)
    .filter(installment => installment.state === 'CURRENT' || installment.state === 'EXPIRED')
    .reduce((total, installment) => total + installment.value, 0);

  if (selectedPlan) {
    const paidInstallments = selectedPlan.installments.filter(item => item.state === 'PAID').length;
    const pendingInstallments = selectedPlan.installments.filter(item => item.state !== 'PAID').length;

    return (
      <div className={styles.screen}>
        <BackButton label="Voltar aos parcelamentos" onClick={() => setSelectedPlanId(null)} />

        <div className={styles.detailHero}>
          <div className={styles.detailHeading}>
            <span className={styles.eyebrow}><ReceiptText size={14} /> Parcelamento selecionado</span>
            <h2>{selectedPlan.description}</h2>
            <p>{selectedPlan.category} · iniciado em {formatDateLabel(selectedPlan.startDate)}</p>
          </div>
          <div className={styles.detailReference}>
            <WalletVisual size="compact" wallet={wallet} />
            <span className={`${styles.status} ${planStatus[selectedPlan.status].className}`}>
              {planStatus[selectedPlan.status].label}
            </span>
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span>Valor original</span>
            <strong>{formatCurrencyLabel(selectedPlan.value)}</strong>
          </div>
          <div className={styles.metric}>
            <span>Total com juros</span>
            <strong>{formatCurrencyLabel(selectedPlan.totalValue)}</strong>
          </div>
          <div className={styles.metric}>
            <span>Juros</span>
            <strong>{selectedPlan.fees}%</strong>
          </div>
          <div className={styles.metric}>
            <span>Parcelas</span>
            <strong>{paidInstallments}/{selectedPlan.times} pagas</strong>
          </div>
        </div>

        <div className={styles.detailGrid}>
          <section className={styles.timelineCard}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>Cronograma</span>
                <h3>Todas as parcelas</h3>
              </div>
              <span className={styles.counter}>{pendingInstallments} em aberto</span>
            </div>

            <div className={styles.installmentGrid}>
              {selectedPlan.installments.map(installment => {
                const state = installmentState[installment.state];
                return (
                  <article className={`${styles.installmentCard} ${state.className}`} key={installment.number}>
                    <div className={styles.installmentTop}>
                      <span>Parcela {String(installment.number).padStart(2, '0')}</span>
                      {installment.state === 'PAID' ? <CheckCircle2 size={17} /> : <Clock3 size={17} />}
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
            <span className={styles.eyebrow}><CircleDollarSign size={14} /> Resumo do plano</span>
            <div className={styles.summaryValue}>{selectedPlan.times}x de {formatCurrencyLabel(selectedPlan.totalValue / selectedPlan.times)}</div>
            <div className={styles.progressTrack}>
              <span style={{ width: `${(paidInstallments / selectedPlan.times) * 100}%` }} />
            </div>
            <p>{paidInstallments} parcelas confirmadas de {selectedPlan.times} no total.</p>
            <div className={styles.summaryRows}>
              <div><span>Início</span><strong>{formatDateLabel(selectedPlan.startDate)}</strong></div>
              <div><span>Término previsto</span><strong>{formatDateLabel(selectedPlan.endDate)}</strong></div>
              <div><span>Carteira</span><strong>{walletName}</strong></div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.screen}>
      <BackButton label="Voltar aos detalhes do cartão" onClick={onBack} />

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}><Layers3 size={14} /> Visão de parcelamentos</span>
          <h2>Compras parceladas do seu cartão</h2>
          <p>Acompanhe cada compra, o progresso de pagamento e as parcelas que chegam nas próximas faturas.</p>
        </div>
        <WalletVisual size="compact" wallet={wallet} />
      </div>

      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}><Layers3 size={19} /></span>
          <div><p>Planos ativos</p><strong>{activePlans}</strong></div>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}><TimerReset size={19} /></span>
          <div><p>Próximas cobranças</p><strong>{formatCurrencyLabel(totalOpenAmount)}</strong></div>
        </div>
        <div className={styles.overviewCard}>
          <span className={styles.overviewIcon}><CreditCard size={19} /></span>
          <div><p>Carteira vinculada</p><strong>{walletName}</strong></div>
        </div>
      </div>

      <div className={styles.listHeading}>
        <div><span className={styles.eyebrow}>Organização por compra</span><h3>Seus parcelamentos</h3></div>
        <span>{mockInstallmentPlans.length} registros demonstrativos</span>
      </div>

      <div className={styles.planList}>
        {mockInstallmentPlans.map((plan, index) => {
          const paid = plan.installments.filter(item => item.state === 'PAID').length;
          const currentInstallment = plan.installments.find(item => item.state === 'CURRENT' || item.state === 'EXPIRED');
          return (
            <button
              className={styles.planCard}
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className={styles.planIdentity}>
                <span className={styles.planIcon}><ReceiptText size={21} /></span>
                <div><h4>{plan.description}</h4><p>{plan.category} · {plan.times} parcelas · termina em {formatDateLabel(plan.endDate)}</p></div>
              </div>
              <div className={styles.planProgress}>
                <div className={styles.planProgressLabel}><span>{paid} de {plan.times} pagas</span><strong>{formatCurrencyLabel(plan.totalValue / plan.times)}</strong></div>
                <div className={styles.progressTrack}><span style={{ width: `${(paid / plan.times) * 100}%` }} /></div>
                <small>{currentInstallment ? `Próxima: ${String(currentInstallment.month).padStart(2, '0')}/${currentInstallment.year}` : 'Plano concluído'}</small>
              </div>
              <div className={styles.planAction}>
                <span className={`${styles.status} ${planStatus[plan.status].className}`}>{planStatus[plan.status].label}</span>
                <ChevronRight size={20} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
