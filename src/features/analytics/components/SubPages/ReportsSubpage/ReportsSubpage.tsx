import { Download } from 'lucide-react';

import styles from './ReportsSubpage.module.css';

interface ReportOption {
  title: string;
  format: string;
  description: string;
}

// Mock fixo — sem dependência de dados externos, apenas catálogo estático de exportações disponíveis.
const REPORT_OPTIONS: ReportOption[] = [
  { title: 'Relatório Mensal Consolidado', format: 'PDF (Completo)', description: 'Demonstrativo completo de Entradas, Saídas e Score de Saúde.' },
  { title: 'Extrato Analítico de Transações', format: 'CSV / Excel', description: 'Lista detalhada de movimentações prontas para importar no ERP.' },
  { title: 'Relatório de Imposto de Renda', format: 'PDF Fiscal', description: 'Resumo com categorias adequadas para declaração anual.' },
  { title: 'Diagnóstico de Despesas Fixas', format: 'PDF executivo', description: 'Gráficos e recomendações para corte inteligente de despesas.' },
];

interface ReportsSubpageProps {
  onDownload: (reportTitle: string) => void;
}

function ReportsSubpage({ onDownload }: ReportsSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className={`p-6 rounded-3xl flex flex-col gap-4 border ${styles.card}`}>
        <h3 className={`text-base font-bold ${styles.cardTitle}`}>Central de Extratos e Exportações</h3>
        <p className={`text-xs ${styles.cardSubtitle}`}>Baixe seus relatórios contábeis nos formatos oficiais de exportação.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {REPORT_OPTIONS.map((report) => (
            <div key={report.title} className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${styles.reportCard}`}>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${styles.formatBadge}`}>
                  {report.format}
                </span>
                <h4 className={`text-sm font-bold mt-2 ${styles.reportTitle}`}>{report.title}</h4>
                <p className={`text-xs mt-1 ${styles.reportDescription}`}>{report.description}</p>
              </div>
              <button
                onClick={() => onDownload(report.title)}
                className={`w-full py-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${styles.downloadBtn}`}
                type="button"
              >
                <Download size={14} /> Download Relatório
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsSubpage;