import { TrendingUp } from "lucide-react";
import type { TransactionResponse } from "../../../../../models/transaction/TransactionResponse";
import WalletBrand from "../../../../../components/shared/WalletBrand/WalletBrand";
import { formatCurrencyLabel } from "../../../../../utils/FormatCurrency";
import { formatRelativeDateTime } from "../../../../../utils/FormatDate";

export default function IncomeSubpage({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const incomes = transactions
    .filter(
      (transaction) =>
        transaction.type === "CREDIT" && transaction.status === "COMPLETED"
    )
    .sort((first, second) => second.amount - first.amount);
  const highestAmount = incomes[0]?.amount ?? 0;

  return (
    <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:p-7">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <TrendingUp size={21} className="text-[var(--income)]" />
        Receitas recebidas no mês em ordem de valor
      </h2>
      {!incomes.length ? (
        <p className="text-sm text-[var(--text-muted)]">
          Nenhuma receita registrada neste mês.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {incomes.map((transaction, index) => (
            <article
              key={transaction.id}
              className="rounded-2xl border border-[var(--border-light)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">
                    {index + 1}. {transaction.description}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    {transaction.category.name} ·{" "}
                    {formatRelativeDateTime(transaction.registeredAt)}
                  </p>
                </div>
                <strong className="shrink-0 text-sm text-[var(--income)]">
                  {formatCurrencyLabel(transaction.amount)}
                </strong>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                <div
                  className="h-full rounded-full bg-[var(--income)]"
                  style={{
                    width: `${
                      highestAmount > 0
                        ? (transaction.amount / highestAmount) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <div className="mt-3 text-xs">
                <WalletBrand wallet={transaction.wallet} size="sm" />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
