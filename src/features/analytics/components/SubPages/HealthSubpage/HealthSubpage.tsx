import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  Target,
} from "lucide-react";
import type { FinancialHealthResponse } from "../../../../../models/account/financialHealth/FinancialHealthResponse";
import { getFinancialHealthStatus } from "../../../../../utils/analytics";
import FinancialHealthGauge from "../../FinancialHealthGauge/FinancialHealthGauge";
import styles from "./HealthSubpage.module.css";

interface HealthSubpageProps {
  health?: FinancialHealthResponse;
  onOpenHealthModal: () => void;
}

export function HealthSubpage({
  health,
  onOpenHealthModal,
}: HealthSubpageProps) {
  if (!health) return;
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div
        className={`p-6 sm:p-8 rounded-3xl flex flex-col lg:flex-row items-center gap-8 justify-between border ${styles.heroCard}`}
      >
        <div className="flex flex-col gap-2 max-w-xl">
          <span
            className={`text-xs font-bold uppercase tracking-wider ${styles.eyebrow}`}
          >
            Indicadores do mês
          </span>
          <h2 className={`text-2xl font-extrabold ${styles.title}`}>
            Sua Saúde Financeira está {getFinancialHealthStatus(health.status)}
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${styles.subtitle}`}
          >
            Conheça o medidor e os indicadores que ajudam a acompanhar sua saúde
            financeira.
          </p>
          <button
            onClick={onOpenHealthModal}
            className={`w-fit mt-2 px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${styles.methodologyBtn}`}
            type="button"
          >
            Entender metodologia do score <HelpCircle size={14} />
          </button>
        </div>

        <FinancialHealthGauge score={health.score} status={health.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}
        >
          <h3
            className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${styles.cardTitle}`}
          >
            <CheckCircle2 size={16} className={styles.iconIncome} />
            Pontos Fortes Identificados
          </h3>
          <div className="flex flex-col gap-3">
            {health.identifiedStrengths.length > 0 ? (
              health.identifiedStrengths.map((item) => (
                <div
                  key={item.text}
                  className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${styles.insightRow}`}
                >
                  {item.text}
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>
                  <Target size={22} aria-hidden="true" />
                </span>
                <h4 className={styles.emptyTitle}>
                  Nenhum ponto forte identificado
                </h4>
                <p className={styles.emptyDescription}>
                  Os registros deste mês ainda não atenderam aos critérios de
                  destaque do score. A metodologia mostra como cada hábito
                  pontua.
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className={`p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}
        >
          <h3
            className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${styles.cardTitle}`}
          >
            <AlertCircle size={16} className={styles.iconWarning} />
            Oportunidades de Otimização
          </h3>
          <div className="flex flex-col gap-3">
            {health.optimizationPointsIdentified.length > 0 ? (
              health.optimizationPointsIdentified.map((item) => (
                <div
                  key={item.text}
                  className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed ${styles.insightRow}`}
                >
                  {item.text}
                </div>
              ))
            ) : (
              <div
                className={`${styles.emptyState} ${styles.emptyStatePositive}`}
              >
                <span className={styles.emptyIcon}>
                  <ListChecks size={22} aria-hidden="true" />
                </span>
                <h4 className={styles.emptyTitle}>
                  Nenhum ponto de atenção identificado
                </h4>
                <p className={styles.emptyDescription}>
                  O cálculo atual não encontrou melhorias a destacar nos seus
                  registros deste mês. Continue acompanhando suas finanças.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthSubpage;
