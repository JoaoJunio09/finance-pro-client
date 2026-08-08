import {
  Activity,
  Car,
  Coffee,
  CreditCard,
  Home,
  ShoppingCart,
  Wallet
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import ContextualAnalyticsHeader from './components/ContextualAnalyticsHeader/ContextutalAnalyticsHeader';
import HealthExplanationModal from './components/HealthExplanationModal/HealthExplanationModal';
import MobileFlushHero from './components/MobileFlushHero/MobileFlushHero';
import CashflowSubpage from './components/SubPages/CashflowSubpage/CashflowSubpage';
import CategoriesSubpage from './components/SubPages/CategoriesSubpage/CategoriesSubpage';
import EvolutionSubpage from './components/SubPages/EvolutionSubpage/EvolutionSubpage';
import HealthSubpage from './components/SubPages/HealthSubpage/HealthSubpage';
import OverviewSubpage from './components/SubPages/OverviewSubpage/OverviewSubpage';
import RecurrencesSubpage from './components/SubPages/RecurrencesSubpage/RecurrencesSubpage';
import ReportsSubpage from './components/SubPages/ReportsSubpage/ReportsSubpage';

export type Trend = 'up' | 'down' | 'neutral';
export type InsightType = 'positive' | 'negative' | 'neutral' | 'alert';
export type HealthStatus = 'Excelente' | 'Muito Boa' | 'Boa' | 'Regular' | 'Crítica';
export type PeriodOption = 'current_month' | 'last_3_months' | 'last_6_months' | 'this_year';
export type AnalyticsSubpage = 'overview' | 'cashflow' | 'categories' | 'health' | 'evolution' | 'reports' | 'recurrences';

export interface SubpageOption {
  id: AnalyticsSubpage;
  label: string;
  shortLabel?: string;
  icon: React.ElementType;
}

export interface Metric {
  value: number;
  previousValue: number;
  trend: Trend;
  percentageChange: number;
}

export interface MonthlySummary {
  netBalance: Metric;
  income: Metric;
  expense: Metric;
  futureCommitments: number;
  availableToSpend: number;
}

export interface EvolutionDataPoint {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  icon: React.ElementType;
  colorHex: string;
  transactionCount: number;
}

export interface FinancialInsight {
  id: string;
  text: string;
  type: InsightType;
}

export interface HealthMetrics {
  savingsCapacity: number;
  committedPercentage: number;
  savingsRate: number;
  growth: number;
  creditDependence: 'Mínima' | 'Baixa' | 'Média' | 'Alta';
  reserveMonths: number;
}

export interface FinancialHealth {
  score: number;
  status: HealthStatus;
  trendMonth: number;
  metrics: HealthMetrics;
  positiveInsights: FinancialInsight[];
  attentionInsights: FinancialInsight[];
}

export interface RecurrenceItem {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  nextDate: string;
  icon: React.ElementType;
}

export interface RecurrencesData {
  totalCount: number;
  committedValue: number;
  incomeValue: number;
  items: RecurrenceItem[];
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  icon: React.ElementType;
}

const generateMockData = (period: PeriodOption) => {
  const multiplier = period === 'current_month' ? 1 : period === 'last_3_months' ? 3 : period === 'last_6_months' ? 6 : 12;
  const baseIncome = 14850 * (period === 'current_month' ? 1 : period === 'last_3_months' ? 2.8 : 5.7);
  const baseExpense = 8240 * (period === 'current_month' ? 1 : period === 'last_3_months' ? 2.8 : 5.7);
  const futureCommitments = 2870;
  const netBalance = baseIncome - baseExpense;
  const availableToSpend = netBalance - futureCommitments;

  const summary: MonthlySummary = {
    netBalance: {
      value: netBalance,
      previousValue: netBalance * 0.88,
      trend: 'up',
      percentageChange: 13.6
    },
    income: {
      value: baseIncome,
      previousValue: baseIncome * 0.96,
      trend: 'up',
      percentageChange: 4.2
    },
    expense: {
      value: baseExpense,
      previousValue: baseExpense * 1.05,
      trend: 'down',
      percentageChange: -5.1
    },
    futureCommitments,
    availableToSpend
  };

  const days = period === 'current_month' ? 30 : period === 'last_3_months' ? 90 : 180;
  const dataStep = period === 'current_month' ? 1 : 5;

  const evolution: EvolutionDataPoint[] = [];
  for (let i = 0; i < days; i += dataStep) {
    const dayNum = (i % 30) + 1;
    const isPayday = dayNum === 5 || dayNum === 20;
    const dailyIncome = isPayday ? (baseIncome / (period === 'current_month' ? 2 : 6)) : Math.random() * 80;
    const dailyExpense = (baseExpense / (days / dataStep)) + (Math.sin(i) * 120);

    let dateLabel = `${dayNum.toString().padStart(2, '0')}/07`;
    if (period !== 'current_month') {
      const monthNum = Math.floor(i / 30) + 1;
      dateLabel = `${dayNum.toString().padStart(2, '0')}/0${monthNum}`;
    }

    evolution.push({
      date: dateLabel,
      income: Math.round(dailyIncome),
      expense: Math.round(dailyExpense),
      balance: Math.round(18500 + (dailyIncome * 3) - (dailyExpense * (i + 1)))
    });
  }

  const categories: ExpenseCategory[] = [
    { id: '1', name: 'Moradia e Contas', amount: 3200 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 38.8, icon: Home, colorHex: '#8B5CF6', transactionCount: 12 },
    { id: '2', name: 'Alimentação e Mercado', amount: 1850 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 22.4, icon: ShoppingCart, colorHex: '#A78BFA', transactionCount: 28 },
    { id: '3', name: 'Transporte e Mobilidade', amount: 950 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 11.5, icon: Car, colorHex: '#C4B5FD', transactionCount: 16 },
    { id: '4', name: 'Lazer e Estilo de Vida', amount: 800 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 9.7, icon: Coffee, colorHex: '#DDD6FE', transactionCount: 14 },
    { id: '5', name: 'Assinaturas e Serviços', amount: 450 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 5.5, icon: CreditCard, colorHex: '#EDE9FE', transactionCount: 8 },
    { id: '6', name: 'Outras Despesas', amount: 990 * (multiplier > 1 ? multiplier * 0.8 : 1), percentage: 12.1, icon: Wallet, colorHex: '#F5F3FF', transactionCount: 9 }
  ];

  const health: FinancialHealth = {
    score: 82,
    status: 'Muito Boa',
    trendMonth: 8,
    metrics: {
      savingsCapacity: 2400,
      committedPercentage: 28,
      savingsRate: 19,
      growth: 12,
      creditDependence: 'Baixa',
      reserveMonths: 6.4
    },
    positiveInsights: [
      { id: 'p1', text: 'Seu saldo líquido permanece positivo continuamente.', type: 'positive' },
      { id: 'p2', text: 'Suas entradas superaram saídas em mais de 44%.', type: 'positive' },
      { id: 'p3', text: 'Compromissos fixos ocupam uma faixa saudável da renda (28%).', type: 'positive' }
    ],
    attentionInsights: [
      { id: 'a1', text: 'Gastos com alimentação tiveram oscilação recente de +12%.', type: 'alert' },
      { id: 'a2', text: 'Reserva atual atinge 6,4 meses (meta recomendada: 6 a 12 meses).', type: 'neutral' }
    ]
  };

  const recurrences: RecurrencesData = {
    totalCount: 8,
    committedValue: futureCommitments,
    incomeValue: baseIncome,
    items: [
      { id: 'r1', description: 'Aluguel Habitacional', amount: 1500, type: 'expense', category: 'Moradia', nextDate: '10/08', icon: Home },
      { id: 'r2', description: 'Condomínio', amount: 650, type: 'expense', category: 'Moradia', nextDate: '15/08', icon: Home },
      { id: 'r3', description: 'Seguro Auto', amount: 380, type: 'expense', category: 'Transporte', nextDate: '25/08', icon: Car },
      { id: 'r4', description: 'Internet Fibra', amount: 120, type: 'expense', category: 'Assinaturas', nextDate: '20/08', icon: Activity },
      { id: 'r5', description: 'Mensalidade Academia', amount: 150, type: 'expense', category: 'Saúde e Lazer', nextDate: '05/08', icon: Activity },
      { id: 'r6', description: 'Plano de Streaming', amount: 50, type: 'expense', category: 'Assinaturas', nextDate: '12/08', icon: Activity },
      { id: 'r7', description: 'Assinatura Música', amount: 20, type: 'expense', category: 'Assinaturas', nextDate: '17/08', icon: Activity },
      { id: 'r8', description: 'Salário Mensal', amount: 14850, type: 'income', category: 'Renda Fixa', nextDate: '05/08', icon: Wallet },
    ]
  };

  const recentTransactions: Transaction[] = [
    { id: 't1', description: 'Mercado Pago', category: 'Alimentação e Mercado', date: 'Hoje, 14:32', amount: 245.50, type: 'expense', icon: ShoppingCart },
    { id: 't2', description: 'Salário Mensal', category: 'Renda Fixa', date: 'Hoje, 09:00', amount: 14850.00, type: 'income', icon: Wallet },
    { id: 't3', description: 'Viagem Uber', category: 'Transporte', date: 'Ontem, 18:45', amount: 32.90, type: 'expense', icon: Car },
    { id: 't4', description: 'Netflix', category: 'Assinaturas', date: 'Ontem, 10:00', amount: 55.90, type: 'expense', icon: Activity },
    { id: 't5', description: 'Restaurante Sabor', category: 'Lazer e Estilo', date: '12 de Jul', amount: 128.00, type: 'expense', icon: Coffee },
  ];

  return { summary, evolution, categories, health, recurrences, recentTransactions };
};

function Analytics() {
  const [period] = useState<PeriodOption>('current_month');
  const [currentSubpage, setCurrentSubpage] = useState<AnalyticsSubpage>('overview');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  const data = useMemo(() => generateMockData(period), [period]);
  const { summary } = data;

  return (
      <main className="w-full">
        <div className="w-full animate-fade-in-up">
          <MobileFlushHero
            availableToSpend={summary.availableToSpend}
            futureCommitments={summary.futureCommitments}
          />

          <ContextualAnalyticsHeader
            currentSubpage={currentSubpage}
            onSelectSubpage={setCurrentSubpage}
            onGoToReports={() => setCurrentSubpage('reports')}
          />
          
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10">
            {currentSubpage === 'overview' && <OverviewSubpage summary={data.summary} evolution={data.evolution} categories={data.categories} health={data.health} onOpenHealthModal={() => setIsHealthModalOpen(true)} onNavigate={setCurrentSubpage} />}
            {currentSubpage === 'cashflow' && <CashflowSubpage summary={data.summary} evolution={data.evolution} />}
            {currentSubpage === 'categories' && <CategoriesSubpage categories={data.categories} />}
            {currentSubpage === 'health' && <HealthSubpage health={data.health} onOpenHealthModal={() => setIsHealthModalOpen(true)} />}
            {currentSubpage === 'evolution' && <EvolutionSubpage evolution={data.evolution} />}
            {currentSubpage === 'reports' && <ReportsSubpage onDownload={() => {}} />}
            {currentSubpage === 'recurrences' && <RecurrencesSubpage recurrences={data.recurrences} onItemClick={() => {}} />}
          </div>
        </div>

        <HealthExplanationModal isOpen={isHealthModalOpen} onClose={() => setIsHealthModalOpen(false)} />
      </main>
  );
}

export default Analytics;