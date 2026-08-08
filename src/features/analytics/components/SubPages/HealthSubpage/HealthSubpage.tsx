import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import type { FinancialHealth } from '../../../Analytics';
import FinancialHealthGauge from '../../FinancialHealthGauge/FinancialHealthGauge';

import styles from './HealthSubpage.module.css';

interface HealthSubpageProps {
  health: FinancialHealth;
  onOpenHealthModal: () => void;
}

export function HealthSubpage({ health, onOpenHealthModal }: HealthSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className={`p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row items-center gap-8 justify-between border ${styles.heroCard}`}>
        <div className="flex flex-col gap-2 max-w-xl">
          <span className={`text-xs font-bold uppercase tracking-wider ${styles.eyebrow}`}>Diagnóstico Especializado</span>
          <h2 className={`text-2xl font-extrabold ${styles.title}`}>Sua Saúde Financeira está {health.status}</h2>
          <p className={`text-xs sm:text-sm leading-relaxed ${styles.subtitle}`}>
            Parabéns! Suas reservas cobrem mais de 6 meses de despesas vitais e o seu índice de endividamento
            permanece em níveis extremamente controlados.
          </p>
          <button
            onClick={onOpenHealthModal}
            className={`w-fit mt-2 px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${styles.methodologyBtn}`}
            type="button"
          >
            Entender metodologia do score <HelpCircle size={14} />
          </button>
        </div>

        <FinancialHealthGauge score={health.score} status={health.status} trendMonth={health.trendMonth} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${styles.cardTitle}`}>
            <CheckCircle2 size={16} className={styles.iconIncome} />
            Pontos Fortes Identificados
          </h3>
          <div className="flex flex-col gap-3">
            {health.positiveInsights.map((item) => (
              <div key={item.id} className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${styles.insightRow}`}>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}>
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${styles.cardTitle}`}>
            <AlertCircle size={16} className={styles.iconWarning} />
            Oportunidades de Otimização
          </h3>
          <div className="flex flex-col gap-3">
            {health.attentionInsights.map((item) => (
              <div key={item.id} className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${styles.insightRow}`}>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthSubpage;