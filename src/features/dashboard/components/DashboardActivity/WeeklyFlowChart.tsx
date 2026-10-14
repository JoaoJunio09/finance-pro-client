import { useReducedMotion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardResponse } from "../../../../models/account/DashboardResponse";
import styles from "./DashboardActivity.module.css";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const compactCurrency = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const shortDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});
const weekDay = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });
const localDate = (date: string) => new Date(`${date}T12:00:00`);

export default function WeeklyFlowChart({
  activity,
  showBalance,
}: {
  activity: DashboardResponse;
  showBalance: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const income = activity.weeklyFlow.reduce(
    (sum, point) => sum + Number(point.income),
    0
  );
  const expense = activity.weeklyFlow.reduce(
    (sum, point) => sum + Number(point.expense),
    0
  );
  const points = activity.weeklyFlow.map((point) => ({
    ...point,
    income: Number(point.income),
    expense: Number(point.expense),
  }));

  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        <div>
          <h2>Entradas e saídas da semana</h2>
          <p>
            {shortDate.format(localDate(activity.weekStart))} a{" "}
            {shortDate.format(localDate(activity.weekEnd))} · Transações
            concluídas
          </p>
        </div>
      </div>
      <div className={styles.totals}>
        <div>
          <span>
            <i className={styles.incomeDot} />
            Receitas
          </span>
          <strong className={styles.income}>
            {showBalance ? currency.format(income) : "••••"}
          </strong>
        </div>
        <div>
          <span>
            <i className={styles.expenseDot} />
            Despesas
          </span>
          <strong className={styles.expense}>
            {showBalance ? currency.format(expense) : "••••"}
          </strong>
        </div>
      </div>
      {!showBalance ? (
        <div className={styles.hiddenChart}>Valores ocultos</div>
      ) : (
        <>
          <div
            className={styles.chart}
            role="img"
            aria-label={`Gráfico da semana: ${currency.format(
              income
            )} em receitas e ${currency.format(expense)} em despesas.`}
          >
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart
                data={points}
                margin={{ top: 15, right: 0, left: -12, bottom: 0 }}
                barGap={4}
              >
                <CartesianGrid
                  stroke="var(--border-light)"
                  strokeDasharray="3 5"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    weekDay.format(localDate(date)).replace(".", "")
                  }
                  tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={12}
                />
                <YAxis
                  tickFormatter={(value) => compactCurrency.format(value)}
                  tick={{ fill: "var(--text-muted)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={52}
                />
                <Tooltip
                  cursor={{ fill: "var(--bg-elevated)" }}
                  formatter={(value) => currency.format(Number(value))}
                  labelFormatter={(date) =>
                    shortDate.format(localDate(String(date)))
                  }
                  contentStyle={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: 12,
                    color: "var(--text-main)",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="income"
                  name="Receitas"
                  fill="var(--income)"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={23}
                  isAnimationActive={!reducedMotion}
                  animationDuration={550}
                />
                <Bar
                  dataKey="expense"
                  name="Despesas"
                  fill="var(--expense)"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={23}
                  isAnimationActive={!reducedMotion}
                  animationDuration={550}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {income === 0 && expense === 0 && (
            <p className={styles.chartNote}>
              Nenhuma receita ou despesa concluída nesta semana.
            </p>
          )}
          <details className={styles.chartDetails}>
            <summary>Ver valores por dia</summary>
            <table>
              <caption className="sr-only">
                Receitas e despesas por dia da semana
              </caption>
              <thead>
                <tr>
                  <th scope="col">Dia</th>
                  <th scope="col">Receitas</th>
                  <th scope="col">Despesas</th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.date}>
                    <th scope="row">
                      {shortDate.format(localDate(point.date))}
                    </th>
                    <td>{currency.format(point.income)}</td>
                    <td>{currency.format(point.expense)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </article>
  );
}
