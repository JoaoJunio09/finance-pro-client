import { Check, CheckCircle2, Target } from "lucide-react";
import { Link } from "react-router-dom";
import FinancePageHeader from "../../components/shared/FinancePage/FinancePageHeader";
import FinancialLifeBackButton from "../../components/shared/FinancePage/FinancialLifeBackButton";
import pageStyles from "../../components/shared/FinancePage/FinancePage.module.css";
import FinanceSummary from "../../components/shared/FinanceSummary/FinanceSummary";
import useGoals from "./hooks/useGoals";
import styles from "./Goals.module.css";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function Goals() {
  const { data: goals = [], isLoading, isError, refetch } = useGoals();
  const accumulated = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount ?? 0),
    0
  );
  const targetAmount = goals.reduce(
    (sum, goal) => sum + Number(goal.totalAmount ?? 0),
    0
  );
  const completedCount = goals.filter(
    (goal) =>
      Number(goal.totalAmount) > 0 &&
      Number(goal.currentAmount) >= Number(goal.totalAmount)
  ).length;

  return (
    <div className={pageStyles.page}>
      <FinancePageHeader
        title="Minhas metas"
        description="Acompanhe o progresso dos objetivos vinculados às suas carteiras."
        back={<FinancialLifeBackButton />}
      />
      <main className={pageStyles.content}>
        {!isLoading && !isError && (
          <FinanceSummary
            label="Resumo das metas"
            primary={{
              label: "Acumulado nas metas",
              value: currency.format(accumulated),
            }}
            items={[
              {
                label: "Valor dos objetivos",
                value: currency.format(targetAmount),
                icon: Target,
              },
              {
                label: "Em andamento",
                value: String(goals.length - completedCount),
                icon: Target,
              },
              {
                label: "Alcançadas",
                value: String(completedCount),
                icon: CheckCircle2,
              },
            ]}
          />
        )}
        {isLoading ? (
          <p role="status">Carregando suas metas…</p>
        ) : isError ? (
          <div className={styles.empty} role="alert">
            <p>Não foi possível carregar suas metas.</p>
            <button type="button" onClick={() => void refetch()}>
              Tentar novamente
            </button>
          </div>
        ) : goals.length === 0 ? (
          <section className={styles.empty}>
            <Target size={35} aria-hidden="true" />
            <h2>Nenhuma meta vinculada às suas carteiras</h2>
            <p>
              Seus objetivos aparecerão aqui quando estiverem associados a uma
              carteira.
            </p>
            <Link to="/carteiras">Ver minhas carteiras</Link>
          </section>
        ) : (
          <div className={styles.grid}>
            {goals.map((goal) => {
              const total = Number(goal.totalAmount ?? 0);
              const current = Number(goal.currentAmount ?? 0);
              const percentage =
                total > 0
                  ? Math.min(100, Math.max(0, (current / total) * 100))
                  : 0;
              const completed = total > 0 && current >= total;
              const Icon = completed ? Check : Target;
              return (
                <article key={goal.id} className={styles.card}>
                  <div className={styles.cardHeading}>
                    <span className={styles.icon}>
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <span className={styles.status}>
                      {completed ? "Alcançada" : "Em andamento"}
                    </span>
                  </div>
                  <h2>{goal.name}</h2>
                  {goal.description && <p>{goal.description}</p>}
                  <div className={styles.amount}>
                    <strong>{currency.format(current)}</strong>
                    <span>de {currency.format(total)}</span>
                  </div>
                  <progress
                    value={percentage}
                    max={100}
                    aria-label={`Progresso de ${goal.name}: ${Math.round(
                      percentage
                    )}%`}
                  />
                  <div className={styles.progressCopy}>
                    <span>{Math.round(percentage)}% do objetivo</span>
                    <span>
                      {completed
                        ? "Meta alcançada"
                        : `Faltam ${currency.format(
                            Math.max(0, total - current)
                          )}`}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
