import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import type { EvolutionDataPoint, MonthlySummary } from '../../../Analytics';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import StatSummaryCard from '../../StatSummaryCard/StatSummaryCard';

import styles from './CashflowSubpage.module.css';

interface CashflowSubpageProps {
  summary: MonthlySummary;
  evolution: EvolutionDataPoint[];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CashflowSubpage({ summary, evolution }: CashflowSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatSummaryCard
          label="Entradas do Período"
          value={formatCurrency(summary.income.value)}
          caption="Crescimento de +4.2% frente ao mês anterior"
          tone="income"
        />
        <StatSummaryCard
          label="Saídas do Período"
          value={formatCurrency(summary.expense.value)}
          caption="Redução de -5.1% em gastos variáveis"
          tone="expense"
        />
        <StatSummaryCard
          label="Resultado Líquido"
          value={formatCurrency(summary.netBalance.value)}
          caption="Margem líquida de 44.5% retida"
          tone="income"
        />
      </div>

      <div className={`p-6 rounded-3xl flex flex-col gap-5 border ${styles.card}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`text-base font-bold ${styles.cardTitle}`}>Comparativo Diário / Semanal</h3>
            <p className={`text-xs ${styles.cardSubtitle}`}>Volume acumulado de Entradas vs Saídas</p>
          </div>
        </div>

        <div className="h-[350px] w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolution.slice(0, 15)} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={(v) => `R$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Entradas" fill="var(--income)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Saídas" fill="var(--expense)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CashflowSubpage;