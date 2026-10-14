import { Download, FileSpreadsheet } from "lucide-react";
import type { AnalyticsResponse } from "../../../../../models/account/AnalyticsResponse";
import styles from "./ReportsSubpage.module.css";

function csvCell(value: string | number) {
  let text =
    typeof value === "number"
      ? value.toLocaleString("pt-BR", {
          useGrouping: false,
          maximumFractionDigits: 2,
        })
      : value;
  if (typeof value === "string" && /^[=+\-@\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}

function downloadCsv(name: string, rows: (string | number)[][]) {
  const content =
    "\uFEFF" + rows.map((row) => row.map(csvCell).join(";")).join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/csv;charset=utf-8;" })
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function ReportsSubpage({
  analytics,
}: {
  analytics?: AnalyticsResponse;
}) {
  const month = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const exportSummary = () => {
    if (!analytics) return;
    downloadCsv("capto-resumo.csv", [
      ["Período", "Indicador", "Valor (R$)"],
      [month, "Receitas", analytics.income],
      [month, "Despesas", analytics.expense],
      [month, "Compromissos", analytics.commitments],
      [month, "Disponível para gastar", analytics.availableToSpend],
    ]);
  };
  const exportTransactions = () => {
    if (!analytics) return;
    downloadCsv("capto-transacoes.csv", [
      [
        "Data",
        "Descrição",
        "Tipo",
        "Status",
        "Categoria",
        "Carteira",
        "Valor (R$)",
      ],
      ...analytics.transactions.map((transaction) => [
        transaction.registeredAt,
        transaction.description,
        transaction.type === "CREDIT" ? "Receita" : "Despesa",
        transaction.status,
        transaction.category.name,
        transaction.wallet.name,
        transaction.amount,
      ]),
    ]);
  };

  return (
    <section className={`rounded-3xl border p-6 ${styles.card}`}>
      <h2 className={`text-lg font-bold ${styles.cardTitle}`}>
        Seus registros de {month}
      </h2>
      <p className={`mt-2 text-sm ${styles.cardSubtitle}`}>
        Baixe arquivos CSV para consultar em uma planilha.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            title: "Resumo financeiro",
            description: "Receitas, despesas, compromissos e valor disponível.",
            onClick: exportSummary,
          },
          {
            title: "Transações do mês",
            description: "Movimentações com data, categoria, carteira e valor.",
            onClick: exportTransactions,
          },
        ].map((report) => (
          <article
            key={report.title}
            className={`flex flex-col gap-3 rounded-2xl border p-5 ${styles.reportCard}`}
          >
            <FileSpreadsheet
              size={25}
              className="text-[var(--accent)]"
              aria-hidden="true"
            />
            <h3 className={`font-bold ${styles.reportTitle}`}>
              {report.title}
            </h3>
            <p className={`flex-1 text-sm ${styles.reportDescription}`}>
              {report.description}
            </p>
            <button
              type="button"
              disabled={!analytics}
              onClick={report.onClick}
              className={`mt-3 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold disabled:opacity-50 ${styles.downloadBtn}`}
            >
              <Download size={16} aria-hidden="true" />
              Baixar CSV
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
