import { AlertCircle, ArrowDownRight, ArrowUpRight, CheckCircle2, ChevronRight, Download, HelpCircle, ShieldCheck, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import { ProgressBar } from '../../../../../components/shared/ProgressBar/ProgressBar';
import type { EvolutionDataPoint, ExpenseCategory, FinancialHealth, MonthlySummary } from '../../../Analytics';
import type { AnalyticsSubpage } from '../../AnalyticsTabs/AnalyticsTabs';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import FinancialHealthGauge from '../../FinancialHealthGauge/FinancialHealthGauge';

import styles from './OverviewSubpage.module.css';
import AnalyticsMetric from '../../AnalyticsMetric/AnalyticsMetric';

interface OverviewSubpageProps {
  summary: MonthlySummary;
  evolution: EvolutionDataPoint[];
  categories: ExpenseCategory[];
  health: FinancialHealth;
  onOpenHealthModal: () => void;
  onNavigate: (subpage: AnalyticsSubpage) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function OverviewSubpage({ summary, evolution, categories, health, onOpenHealthModal, onNavigate }: OverviewSubpageProps) {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      {/* Hero + métricas — Desktop */}
      <section className="hidden lg:flex flex-row gap-6">
        <div className={`flex-1 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden shadow-md ${styles.heroCard}`}>
          <div className={`absolute inset-0 opacity-20 ${styles.heroPattern}`}></div>
          <div className="flex flex-col gap-3 relative z-10">
            <span className={`text-xs font-semibold flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border ${styles.heroBadge}`}>
              <Wallet size={14} className="text-white" />
              Disponível para gastar
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-5xl font-bold tracking-tight text-white tabular-nums drop-shadow-sm">
                {formatCurrency(summary.availableToSpend)}
              </span>
            </div>
            <p className={`text-sm mt-1 max-w-md font-medium leading-relaxed ${styles.heroCaption}`}>
              Saldo livre calculado após descontar{' '}
              <span className="text-white font-semibold">{formatCurrency(summary.futureCommitments)}</span> em
              compromissos e assinaturas recorrentes fixadas.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-80">
          <AnalyticsMetric
            title="Entradas Totais"
            amount={summary.income.value}
            trend={summary.income.trend}
            trendValue={summary.income.percentageChange}
            icon={TrendingUp}
            tone="income"
            animationDelay="100ms"
          />
          <AnalyticsMetric
            title="Saídas Realizadas"
            amount={summary.expense.value}
            trend={summary.expense.trend}
            trendValue={summary.expense.percentageChange}
            icon={TrendingDown}
            tone="expense"
            animationDelay="200ms"
          />
        </div>
      </section>

      {/* Métricas — Mobile */}
      <section className="grid grid-cols-2 gap-3 lg:hidden">
        <AnalyticsMetric
          title="Entradas"
          amount={summary.income.value}
          trend={summary.income.trend}
          trendValue={summary.income.percentageChange}
          icon={ArrowUpRight}
          tone="income"
          animationDelay="0ms"
        />
        <AnalyticsMetric
          title="Saídas"
          amount={summary.expense.value}
          trend={summary.expense.trend}
          trendValue={summary.expense.percentageChange}
          icon={ArrowDownRight}
          tone="expense"
          animationDelay="100ms"
        />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">

          {/* Fluxo de Caixa */}
          <section className={`interactive-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm border ${styles.card}`}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h3 className={`text-base sm:text-lg font-bold ${styles.cardTitle}`}>Fluxo de Caixa</h3>
                <p className={`text-xs sm:text-sm font-medium ${styles.cardSubtitle}`}>Movimentações no período</p>
              </div>

              <div className={`hidden sm:flex items-center gap-4 text-xs font-semibold px-3.5 py-1.5 rounded-full border ${styles.legend}`}>
                <div className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${styles.legendIncomeDot}`} />Entradas</div>
                <div className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${styles.legendExpenseDot}`} />Saídas</div>
              </div>
            </div>

            <div className="h-[320px] w-full mt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolution} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--income)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--income)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--expense)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--expense)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }} dy={8} minTickGap={25} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }} tickFormatter={(val) => `R$${val / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-hover)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="expense" name="Saídas" stroke="var(--expense)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpense)" />
                  <Area type="monotone" dataKey="income" name="Entradas" stroke="var(--income)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Distribuição de Gastos */}
          <section className={`interactive-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm border ${styles.card}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className={`text-base sm:text-lg font-bold ${styles.cardTitle}`}>Distribuição de Gastos</h3>
                <p className={`text-xs sm:text-sm font-medium ${styles.cardSubtitle}`}>Categorias mais relevantes</p>
              </div>
              <button onClick={() => onNavigate('categories')} className={`text-xs sm:text-sm font-semibold hover:underline flex items-center gap-1 ${styles.linkAccent}`} type="button">
                Detalhar <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {categories.slice(0, 6).map((cat) => (
                <div key={cat.id} className={`flex flex-col gap-2 group cursor-pointer ${styles.categoryRow}`} onClick={() => onNavigate('categories')}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-xs"
                        style={{ backgroundColor: `${cat.colorHex}20`, color: cat.colorHex, border: `1px solid ${cat.colorHex}40` }}
                      >
                        <cat.icon size={15} />
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold transition-colors ${styles.categoryName}`}>{cat.name}</span>
                    </div>
                    <div className="flex items-end flex-col">
                      <span className={`text-xs sm:text-sm font-bold tabular-nums ${styles.categoryAmount}`}>{formatCurrency(cat.amount)}</span>
                      <span className={`text-[10px] sm:text-xs font-semibold ${styles.categoryPercent}`}>{cat.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <ProgressBar percentage={cat.percentage} colorHex={cat.colorHex} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-8">
          {/* Saúde Financeira */}
          <section className={`interactive-card rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-md relative border ${styles.healthCard}`}>
            <div className={`flex justify-between items-start border-b pb-4 ${styles.healthHeader}`}>
              <div>
                <h3 className={`text-base font-bold flex items-center gap-2 ${styles.cardTitle}`}>
                  <ShieldCheck size={18} className={styles.linkAccent} />
                  Saúde Financeira
                </h3>
                <p className={`text-xs font-medium mt-0.5 ${styles.cardSubtitle}`}>Análise inteligente da sua conta</p>
              </div>
              <button
                onClick={onOpenHealthModal}
                className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all shadow-xs ${styles.helpBtn}`}
                type="button"
                aria-label="Como é calculado?"
              >
                <HelpCircle size={15} />
              </button>
            </div>

            <FinancialHealthGauge score={health.score} status={health.status} trendMonth={health.trendMonth} />

            <div className={`grid grid-cols-2 gap-2.5 pt-2 border-t ${styles.healthHeader}`}>
              <div className={`p-3 rounded-xl border flex flex-col gap-0.5 ${styles.statTile}`}>
                <span className={`text-[11px] font-medium ${styles.cardSubtitle}`}>Capacidade Economia</span>
                <span className={`text-xs font-bold ${styles.categoryAmount}`}>{formatCurrency(health.metrics.savingsCapacity)}</span>
              </div>
              <div className={`p-3 rounded-xl border flex flex-col gap-0.5 ${styles.statTile}`}>
                <span className={`text-[11px] font-medium ${styles.cardSubtitle}`}>Renda Comprometida</span>
                <span className={`text-xs font-bold ${styles.categoryAmount}`}>{health.metrics.committedPercentage}%</span>
              </div>
              <div className={`p-3 rounded-xl border flex flex-col gap-0.5 ${styles.statTile}`}>
                <span className={`text-[11px] font-medium ${styles.cardSubtitle}`}>Reserva de Emergência</span>
                <span className={`text-xs font-bold ${styles.categoryAmount}`}>{health.metrics.reserveMonths} meses</span>
              </div>
              <div className={`p-3 rounded-xl border flex flex-col gap-0.5 ${styles.statTile}`}>
                <span className={`text-[11px] font-medium ${styles.cardSubtitle}`}>Dep. de Crédito</span>
                <span className={`text-xs font-bold ${styles.legendIncomeText}`}>{health.metrics.creditDependence}</span>
              </div>
            </div>

            <div className={`flex flex-col gap-2.5 pt-2 border-t ${styles.healthHeader}`}>
              <span className={`text-xs font-bold uppercase tracking-wider ${styles.categoryAmount}`}>Diagnóstico</span>

              {health.positiveInsights.slice(0, 2).map((item) => (
                <div key={item.id} className={`flex items-start gap-2.5 text-xs ${styles.cardSubtitle}`}>
                  <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${styles.legendIncomeText}`} />
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}

              {health.attentionInsights.slice(0, 1).map((item) => (
                <div key={item.id} className={`flex items-start gap-2.5 text-xs ${styles.cardSubtitle}`}>
                  <AlertCircle size={15} className={`shrink-0 mt-0.5 ${styles.warningText}`} />
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('health')}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${styles.secondaryBtn}`}
              type="button"
            >
              Ver relatório completo de saúde <ChevronRight size={14} />
            </button>
          </section>

          <button onClick={() => onNavigate('reports')} className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group ${styles.exportBtn}`} type="button">
            <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            Exportar Relatório PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverviewSubpage;