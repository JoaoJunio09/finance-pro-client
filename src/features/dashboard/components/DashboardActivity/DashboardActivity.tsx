import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DashboardResponse } from "../../../../models/account/DashboardResponse";
import styles from "./DashboardActivity.module.css";
import WeeklyFlowChart from "./WeeklyFlowChart";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

interface DashboardActivityProps {
  activity?: DashboardResponse;
  isLoading: boolean;
  isError: boolean;
  showBalance: boolean;
  onRetry: () => void;
}

export default function DashboardActivity({
  activity,
  isLoading,
  isError,
  showBalance,
  onRetry,
}: DashboardActivityProps) {
  if (isLoading) {
    return (
      <section
        className={styles.loading}
        role="status"
        aria-label="Carregando gráfico e transações"
      >
        <div />
        <div />
      </section>
    );
  }
  if (isError || !activity) {
    return (
      <section className={styles.error} role="alert">
        <p>Não foi possível carregar o gráfico e as transações.</p>
        <button type="button" onClick={onRetry}>
          Tentar novamente
        </button>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label="Movimentações da sua conta">
      <WeeklyFlowChart activity={activity} showBalance={showBalance} />
      <article className={styles.card}>
        <div className={styles.heading}>
          <div>
            <h2>Transações recentes</h2>
            <p>Seus últimos registros</p>
          </div>
          <Link to="/vida-financeira/transacoes">
            Ver todas
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        {activity.recentTransactions.length === 0 ? (
          <div className={styles.empty}>
            <p>Você ainda não tem transações registradas.</p>
            <Link to="/vida-financeira/transacoes">Ver transações</Link>
          </div>
        ) : (
          <ul className={styles.transactions}>
            {activity.recentTransactions.slice(0, 6).map((transaction) => {
              const income = transaction.type === "CREDIT";
              const pending = transaction.status === "PENDING";
              const Icon = income ? ArrowDownLeft : ArrowUpRight;
              return (
                <li key={transaction.id} className={styles.transaction}>
                  <span
                    className={`${styles.transactionIcon} ${
                      income ? styles.income : styles.expense
                    }`}
                  >
                    <Icon
                      size={19}
                      aria-label={income ? "Receita" : "Despesa"}
                    />
                  </span>
                  <div className={styles.transactionCopy}>
                    <strong title={transaction.description}>
                      {transaction.description ||
                        transaction.category?.name ||
                        "Transação"}
                    </strong>
                    <span>
                      {transaction.category?.name || "Sem categoria"}
                      <span aria-hidden="true"> · </span>
                      <time dateTime={transaction.registeredAt}>
                        {dateFormat.format(new Date(transaction.registeredAt))}
                      </time>
                    </span>
                  </div>
                  <div className={styles.transactionValue}>
                    <strong className={income ? styles.income : styles.expense}>
                      {showBalance
                        ? `${income ? "+" : "−"} ${currency.format(
                            transaction.amount
                          )}`
                        : "••••"}
                    </strong>
                    <span
                      className={pending ? styles.pending : styles.completed}
                    >
                      {pending ? "Pendente" : "Concluída"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </section>
  );
}
