import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
	ChevronRight,
	Info,
	SlidersHorizontal,
	Check,
	Home,
	ShoppingCart,
	Car,
	Coffee,
	CreditCard,
	Wallet,
	Activity,
	TrendingUp,
	TrendingDown,
	ShieldCheck,
	X,
	Calendar,
	ChevronDown,
	BarChart3,
	PieChart,
	FileText,
	ArrowLeft,
	ArrowUpRight,
	ArrowDownRight,
	HelpCircle,
	CheckCircle2,
	AlertCircle,
	Download,
	Repeat,
	Search,
	Bell,
	User,
	Menu} from 'lucide-react';
import {
	ResponsiveContainer,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Area,
	BarChart,
	Bar,
	PieChart as RechartsPieChart,
	Pie,
	Cell
} from 'recharts';

const ThemeStyles = () => (
	<style>{`
		:root {
			--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
		}

		.theme-dark {
			--bg-base: #09090B;
			--bg-surface: #121214;
			--bg-elevated: #18181B;
			
			--text-main: #FAFAFA;
			--text-muted: #A1A1AA;
			
			--border-color: rgba(255, 255, 255, 0.08);
			--border-light: rgba(255, 255, 255, 0.04);
			--border-hover: rgba(255, 255, 255, 0.12);
			
			--accent: #7C3AED;
			--accent-muted: rgba(124, 58, 237, 0.1);
			
			--income: #10B981;
			--income-muted: rgba(16, 185, 129, 0.1);
			
			--expense: #EF4444;
			--expense-muted: rgba(239, 68, 68, 0.1);
			
			--warning: #F59E0B;
			--warning-muted: rgba(245, 158, 11, 0.1);

			--chart-grid: rgba(255, 255, 255, 0.04);
			--chart-tooltip-bg: rgba(24, 24, 27, 0.95);
			
			--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.2);
			--shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.4);
		}

		.theme-light {
			--bg-base: #F8F9FA;
			--bg-surface: #FFFFFF;
			--bg-elevated: #F3F4F6;
			
			--text-main: #18181B;
			--text-muted: #71717A;
			
			--border-color: rgba(0, 0, 0, 0.06);
			--border-light: rgba(0, 0, 0, 0.03);
			--border-hover: rgba(0, 0, 0, 0.12);
			
			--accent: #5B21B6;
			--accent-muted: rgba(91, 33, 182, 0.06);
			
			--income: #059669;
			--income-muted: rgba(5, 150, 105, 0.06);
			
			--expense: #DC2626;
			--expense-muted: rgba(220, 38, 38, 0.06);
			
			--warning: #D97706;
			--warning-muted: rgba(217, 119, 6, 0.06);

			--chart-grid: rgba(0, 0, 0, 0.04);
			--chart-tooltip-bg: rgba(255, 255, 255, 0.98);
			
			--shadow-card: 0 1px 4px rgba(0, 0, 0, 0.04);
			--shadow-hover: 0 6px 16px rgba(0, 0, 0, 0.08);
		}

		body {
			background-color: var(--bg-base);
			color: var(--text-main);
			font-family: var(--font-sans);
			-webkit-font-smoothing: antialiased;
			transition: background-color 0.3s ease, color 0.3s ease;
			overflow-x: hidden;
		}

		::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}
		::-webkit-scrollbar-track {
			background: transparent;
		}
		::-webkit-scrollbar-thumb {
			background: var(--border-color);
			border-radius: 10px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: var(--text-muted);
		}

		.scrollbar-hide::-webkit-scrollbar {
			display: none;
		}
		.scrollbar-hide {
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(8px); }
			to { opacity: 1; transform: translateY(0); }
		}
		
		@keyframes scaleIn {
			from { opacity: 0; transform: scale(0.98); }
			to { opacity: 1; transform: scale(1); }
		}

		.animate-fade-in-up {
			animation: fadeInUp 0.4s cubic-bezier(0.2, 0, 0, 1) forwards;
			opacity: 0;
		}
		
		.animate-scale-in {
			animation: scaleIn 0.25s cubic-bezier(0.2, 0, 0, 1) forwards;
		}

		.interactive-card {
			transition: box-shadow 0.25s ease, border-color 0.25s ease;
		}
		.interactive-card:hover {
			box-shadow: var(--shadow-hover);
			border-color: var(--border-hover);
		}
	`}</style>
);

type Trend = 'up' | 'down' | 'neutral';
type InsightType = 'positive' | 'negative' | 'neutral' | 'alert';
type HealthStatus = 'Excelente' | 'Muito Boa' | 'Boa' | 'Regular' | 'Crítica';
type PeriodOption = 'current_month' | 'last_3_months' | 'last_6_months' | 'this_year';
type AnalyticsSubpage = 'overview' | 'cashflow' | 'categories' | 'health' | 'evolution' | 'reports' | 'recurrences';

interface SubpageOption {
	id: AnalyticsSubpage;
	label: string;
	shortLabel?: string;
	icon: React.ElementType;
}

interface Metric {
	value: number;
	previousValue: number;
	trend: Trend;
	percentageChange: number;
}

interface MonthlySummary {
	netBalance: Metric;
	income: Metric;
	expense: Metric;
	futureCommitments: number;
	availableToSpend: number;
}

interface EvolutionDataPoint {
	date: string;
	income: number;
	expense: number;
	balance: number;
}

interface ExpenseCategory {
	id: string;
	name: string;
	amount: number;
	percentage: number;
	icon: React.ElementType;
	colorHex: string;
	transactionCount: number;
}

interface FinancialInsight {
	id: string;
	text: string;
	type: InsightType;
}

interface HealthMetrics {
	savingsCapacity: number;
	committedPercentage: number;
	savingsRate: number;
	growth: number;
	creditDependence: 'Mínima' | 'Baixa' | 'Média' | 'Alta';
	reserveMonths: number;
}

interface FinancialHealth {
	score: number;
	status: HealthStatus;
	trendMonth: number;
	metrics: HealthMetrics;
	positiveInsights: FinancialInsight[];
	attentionInsights: FinancialInsight[];
}

interface RecurrenceItem {
	id: string;
	description: string;
	amount: number;
	type: 'income' | 'expense';
	category: string;
	nextDate: string;
	icon: React.ElementType;
}

interface RecurrencesData {
	totalCount: number;
	committedValue: number;
	incomeValue: number;
	items: RecurrenceItem[];
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

	return { summary, evolution, categories, health, recurrences };
};

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};

const formatPercent = (value: number) => {
	return `${value > 0 ? '+' : ''}${value.toFixed(1).replace('.', ',')}%`;
};

const getHealthColor = (score: number) => {
	if (score >= 80) return 'var(--income)';
	if (score >= 60) return 'var(--accent)';
	if (score >= 40) return 'var(--warning)';
	return 'var(--expense)';
};

const TrendIndicator = ({ trend, value, showLabel = true }: { trend: Trend, value: number, showLabel?: boolean }) => {
	const isPositive = value > 0;
	const isNegative = value < 0;

	let Icon = Activity;
	if (trend === 'up') Icon = TrendingUp;
	if (trend === 'down') Icon = TrendingDown;

	return (
		<div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
			<span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 transition-colors ${
				isPositive ? 'bg-[var(--income-muted)] text-[var(--income)]' : 
				isNegative ? 'bg-[var(--expense-muted)] text-[var(--expense)]' : 
				'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
			}`}>
				<Icon size={12} strokeWidth={2.5} />
			</span>
			<span className={`truncate ${isPositive ? 'text-[var(--income)]' : isNegative ? 'text-[var(--expense)]' : 'text-[var(--text-muted)]'}`}>
				{formatPercent(value)}
			</span>
			{showLabel && <span className="text-[var(--text-muted)] font-normal tracking-tight ml-1 hidden sm:inline truncate">vs. período anterior</span>}
		</div>
	);
};

const MetricCard = ({ title, amount, trend, trendValue, icon: Icon, colorClass, animationDelay, subtitle }: any) => {
	const textColorClass = colorClass.split(' ').find((c: string) => c.startsWith('text-')) || 'text-[var(--text-main)]';
	
	return (
		<div 
			className="interactive-card bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden group animate-fade-in-up shadow-sm"
			style={{ animationDelay }}
		>
			<div className="flex justify-between items-start gap-2">
				<div className="flex flex-col gap-1 min-w-0 flex-1">
					<span className="text-xs sm:text-sm font-medium text-[var(--text-muted)] truncate">{title}</span>
					<span className="text-base sm:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-main)] tabular-nums mt-0.5 sm:mt-1 truncate">
						{formatCurrency(amount)}
					</span>
					{subtitle && <span className="text-[10px] sm:text-xs text-[var(--text-muted)] font-normal truncate">{subtitle}</span>}
				</div>
				<div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl flex items-center justify-center bg-[var(--bg-elevated)] border border-[var(--border-light)] ${textColorClass} bg-opacity-10 transition-colors duration-300`}>
					<Icon size={18} className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
				</div>
			</div>
			
			<div className="mt-1 sm:mt-2 pt-2 sm:pt-3 border-t border-[var(--border-light)]">
				<TrendIndicator trend={trend} value={trendValue} showLabel={false} />
			</div>
		</div>
	);
};

const ProgressBar = ({ percentage, colorHex }: { percentage: number, colorHex: string }) => (
	<div className="h-2 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
		<div 
			className="h-full rounded-full transition-all duration-1000 ease-out"
			style={{ width: `${Math.min(100, Math.max(0, percentage))}%`, backgroundColor: colorHex }}
		/>
	</div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-[var(--chart-tooltip-bg)] backdrop-blur-md border border-[var(--border-color)] rounded-xl p-4 shadow-xl flex flex-col gap-3 min-w-[200px] z-50">
				<span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{label}</span>
				<div className="flex flex-col gap-2">
					{payload.map((entry: any, index: number) => (
						<div key={index} className="flex justify-between items-center text-sm">
							<div className="flex items-center gap-2">
								<span 
									className="w-2.5 h-2.5 rounded-full shadow-sm" 
									style={{ backgroundColor: entry.color }}
								/>
								<span className="text-[var(--text-muted)] font-medium">{entry.name}</span>
							</div>
							<span className="text-[var(--text-main)] tabular-nums font-semibold">
								{formatCurrency(entry.value)}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	}
	return null;
};

const FinancialHealthGauge = ({ score, status, trendMonth }: { score: number; status: HealthStatus; trendMonth: number }) => {
	const radius = 54;
	const circumference = Math.PI * radius;
	const strokeDashoffset = circumference - (score / 100) * circumference;
	const color = getHealthColor(score);

	return (
		<div className="flex flex-col items-center justify-center relative py-2">
			<div className="relative w-48 h-28 flex items-center justify-center">
				<svg className="w-full h-full overflow-visible" viewBox="0 0 120 70">
					<defs>
						<linearGradient id="scoreArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="var(--accent)" />
							<stop offset="100%" stopColor={color} />
						</linearGradient>
					</defs>
					<path
						d="M 10,65 A 50,50 0 0,1 110,65"
						fill="none"
						stroke="var(--bg-elevated)"
						strokeWidth="10"
						strokeLinecap="round"
					/>
					<path
						d="M 10,65 A 50,50 0 0,1 110,65"
						fill="none"
						stroke="url(#scoreArcGradient)"
						strokeWidth="10"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						className="transition-all duration-1000 ease-out"
					/>
				</svg>

				<div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
					<div className="flex items-baseline gap-0.5">
						<span className="text-4xl font-extrabold tracking-tight" style={{ color }}>{score}</span>
						<span className="text-xs text-[var(--text-muted)] font-bold">/100</span>
					</div>
					<span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-main)] border border-[var(--border-light)] mt-1 shadow-sm">
						{status}
					</span>
				</div>
			</div>

			<div className="flex items-center gap-1.5 text-xs text-[var(--income)] font-medium mt-2 bg-[var(--income-muted)] px-3 py-1 rounded-full border border-[var(--income)]/20">
				<TrendingUp size={13} />
				<span>+{trendMonth}% este mês</span>
			</div>
		</div>
	);
};

const HealthExplanationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
			
			<div className="relative bg-[var(--bg-surface)] border border-[var(--border-color)] w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
				<div className="w-12 h-1.5 bg-[var(--border-hover)] rounded-full mx-auto mb-4 sm:hidden" />

				<div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)] mb-4">
					<div className="flex items-center gap-2.5">
						<div className="w-9 h-9 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center text-[var(--accent)]">
							<ShieldCheck size={20} />
						</div>
						<div>
							<h3 className="text-base font-bold text-[var(--text-main)]">Score de Saúde Financeira</h3>
							<p className="text-xs text-[var(--text-muted)]">Como é calculada a sua nota</p>
						</div>
					</div>
					<button 
						onClick={onClose}
						className="p-2 rounded-full hover:bg-[var(--bg-elevated)] text-[var(--text-muted)] transition-colors"
					>
						<X size={18} />
					</button>
				</div>

				<p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-5">
					O algoritmo do FinancePro avalia 5 pilares fundamentais da sua gestão pessoal para calcular um score de 0 a 100 em tempo real:
				</p>

				<div className="flex flex-col gap-3">
					{[
						{ title: 'Saldo Líquido Positivo', desc: 'Capacidade recorrente de manter entradas maiores que saídas.', weight: '25%', color: 'bg-emerald-500' },
						{ title: 'Comprometimento de Renda', desc: 'Percentual da renda alocado em despesas e parcelas fixas.', weight: '20%', color: 'bg-purple-500' },
						{ title: 'Reserva de Emergência', desc: 'Meses de custo de vida cobertos por investimentos líquidos.', weight: '20%', color: 'bg-blue-500' },
						{ title: 'Capacidade de Poupança', desc: 'Taxa mensal poupada e investida sobre o faturamento.', weight: '20%', color: 'bg-amber-500' },
						{ title: 'Uso Saudável do Crédito', desc: 'Baixa dependência de rotativos e alavancagem em cartão.', weight: '15%', color: 'bg-teal-500' },
					].map((item, idx) => (
						<div key={idx} className="p-3.5 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-light)] flex items-start justify-between gap-3">
							<div className="flex items-start gap-3">
								<span className={`w-2.5 h-2.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
								<div>
									<h4 className="text-xs sm:text-sm font-semibold text-[var(--text-main)]">{item.title}</h4>
									<p className="text-xs text-[var(--text-muted)] mt-0.5 leading-normal">{item.desc}</p>
								</div>
							</div>
							<span className="text-xs font-bold text-[var(--accent)] bg-[var(--accent-muted)] px-2.5 py-1 rounded-lg shrink-0">
								{item.weight}
							</span>
						</div>
					))}
				</div>

				<button
					onClick={onClose}
					className="mt-6 w-full py-3 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md"
				>
					Entendido
				</button>
			</div>
		</div>
	);
};

const MobileFlushHero = ({ availableToSpend, futureCommitments }: { availableToSpend: number; futureCommitments: number }) => {
	return (
		<div className="block lg:hidden w-full bg-gradient-to-br from-[#4C1D95] to-[#312E81] rounded-t-none rounded-b-[2rem] p-6 pt-8 pb-8 shadow-md relative overflow-hidden z-20">
			<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20"></div>
			
			<div className="relative z-10 flex flex-col items-center text-center">
				<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-3 backdrop-blur-sm">
					<Wallet size={14} className="text-white" />
					<span>Disponível para gastar</span>
				</div>

				<h1 className="text-4xl font-black tracking-tight text-white tabular-nums my-1 drop-shadow-sm">
					{formatCurrency(availableToSpend)}
				</h1>

				<p className="text-xs text-white/70 max-w-xs mt-2 font-medium leading-relaxed">
					Após considerar <span className="text-white font-semibold">{formatCurrency(futureCommitments)}</span> em compromissos projetados.
				</p>
			</div>
		</div>
	);
};

const ContextualAnalyticsHeader = ({ 
	currentSubpage, 
	setSubpage 
}: { 
	currentSubpage: AnalyticsSubpage; 
	setSubpage: (sub: AnalyticsSubpage) => void;
}) => {
	const subpages: SubpageOption[] = [
		{ id: 'overview', label: 'Visão Geral', icon: BarChart3 },
		{ id: 'cashflow', label: 'Fluxo de Caixa', icon: Activity },
		{ id: 'categories', label: 'Categorias', icon: PieChart },
		{ id: 'health', label: 'Saúde Financeira', icon: ShieldCheck },
		{ id: 'evolution', label: 'Evolução', icon: TrendingUp },
		{ id: 'reports', label: 'Relatórios', icon: FileText },
		{ id: 'recurrences', label: 'Recorrências', icon: Repeat },
	];

	const currentOption = subpages.find(s => s.id === currentSubpage);
	
	const [tabRects, setTabRects] = useState<{ [key: string]: { left: number; width: number } }>({});
	const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

	useEffect(() => {
		const updateRects = () => {
			const newRects: { [key: string]: { left: number; width: number } } = {};
			subpages.forEach((sub) => {
				const el = tabsRef.current[sub.id];
				if (el) {
					newRects[sub.id] = { left: el.offsetLeft, width: el.offsetWidth };
				}
			});
			setTabRects(newRects);
		};
		
		updateRects();
		window.addEventListener('resize', updateRects);
		const timeout = setTimeout(updateRects, 150);
		
		return () => {
			window.removeEventListener('resize', updateRects);
			clearTimeout(timeout);
		};
	}, [currentSubpage]);

	return (
		<div className="w-full bg-[var(--bg-surface)]">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-6 sm:gap-8">
				
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					
					<div className="flex flex-col gap-1.5">
						<div className="flex items-center gap-2 mb-1 h-6">
							{currentSubpage !== 'overview' ? (
								<button 
									onClick={() => setSubpage('overview')}
									className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors group h-full"
								>
									<ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
									Voltar para Analytics
								</button>
							) : (
								<div className="flex items-center gap-2 h-full">
									<div className="w-6 h-6 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-main)] shrink-0">
										<BarChart3 size={14} />
									</div>
									<span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center h-full">Análises</span>
								</div>
							)}
						</div>

						<div className="flex items-baseline gap-2">
							<h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-tight">
								{currentSubpage === 'overview' ? 'Analytics' : currentOption?.label}
							</h1>
						</div>
						
						<p className="text-sm text-[var(--text-muted)] hidden sm:block">
							{currentSubpage === 'overview' && 'Acompanhe a inteligência e os indicadores da sua gestão.'}
							{currentSubpage === 'cashflow' && 'Análise detalhada de movimentações e liquidez mensal.'}
							{currentSubpage === 'categories' && 'Composição de gastos e impactos no seu orçamento.'}
							{currentSubpage === 'health' && 'Diagnóstico completo sobre seus hábitos financeiros.'}
							{currentSubpage === 'evolution' && 'Acompanhamento do seu patrimônio e performance acumulada.'}
							{currentSubpage === 'reports' && 'Exportação de demonstrativos e extratos contábeis.'}
							{currentSubpage === 'recurrences' && 'Visão consolidada de assinaturas e gastos fixos.'}
						</p>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center w-full sm:w-auto mt-2 sm:mt-0">
						<div className="relative flex-1 sm:flex-none">
							<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
							<input 
								type="text" 
								placeholder="Pesquisar..." 
								className="w-full sm:w-56 lg:w-72 bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] rounded-xl pl-9 pr-4 py-1.5 text-xs sm:text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all shadow-sm"
							/>
						</div>

						<button className="relative flex shrink-0 items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)] transition-all shadow-sm">
							<Bell size={15} className="text-[var(--text-muted)]" />
							<span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[var(--expense)] rounded-full ring-2 ring-[var(--bg-surface)]"></span>
						</button>

						<button className="relative flex shrink-0 items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] text-white shadow-sm border border-[var(--border-color)] overflow-hidden hover:opacity-90 transition-opacity">
							<User size={15} />
						</button>
					</div>
				</div>

				<div className="relative w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
					<div className="flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b border-[var(--border-color)]">
						
						{tabRects[currentSubpage] && (
							<div
								className="absolute bg-[var(--bg-elevated)] border border-[var(--border-color)] border-b-[var(--bg-elevated)] transition-all duration-300 ease-out z-0 rounded-t-xl"
								style={{
									left: tabRects[currentSubpage].left,
									width: tabRects[currentSubpage].width,
									top: 0,
									bottom: '-1px'
								}}
							/>
						)}

						{subpages.map((sub) => {
							const Icon = sub.icon;
							const isActive = currentSubpage === sub.id;

							return (
								<button
									key={sub.id}
									ref={(el) => {
										tabsRef.current[sub.id] = el;
									}}
									onClick={() => setSubpage(sub.id)}
									className={`flex items-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 relative focus:outline-none select-none z-10 ${
										isActive 
											? 'text-[var(--text-main)]' 
											: 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
									}`}
								>
									<Icon 
										size={16} 
										className={`transition-colors duration-200 ${
											isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
										}`} 
									/>
									<span>{sub.label}</span>
								</button>
							);
						})}
					</div>
				</div>

			</div>
		</div>
	);
};

const OverviewSubpage = ({ summary, evolution, categories, health, onOpenHealthModal, onNavigate }: any) => {
	return (
		<div className="flex flex-col gap-8 animate-fade-in-up">
			<section className="hidden lg:flex flex-row gap-6">
				<div className="flex-1 bg-gradient-to-br from-[#4C1D95] to-[#312E81] border border-[#5B21B6]/50 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden shadow-md">
					<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20"></div>
					<div className="flex flex-col gap-3 relative z-10">
						<span className="text-xs font-semibold text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20">
							<Wallet size={14} className="text-white" />
							Disponível para gastar
						</span>
						<div className="flex items-baseline gap-3 mt-1">
							<span className="text-5xl font-bold tracking-tight text-white tabular-nums drop-shadow-sm">
								{formatCurrency(summary.availableToSpend)}
							</span>
						</div>
						<p className="text-sm text-white/70 mt-1 max-w-md font-medium leading-relaxed">
							Saldo livre calculado após descontar <span className="text-white font-semibold">{formatCurrency(summary.futureCommitments)}</span> em compromissos e assinaturas recorrentes fixadas.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-4 w-80">
					<MetricCard 
						title="Entradas Totais" 
						amount={summary.income.value} 
						trend={summary.income.trend} 
						trendValue={summary.income.percentageChange}
						icon={TrendingUp}
						colorClass="bg-[var(--income)] text-[var(--income)]"
						animationDelay="100ms"
					/>
					<MetricCard 
						title="Saídas Realizadas" 
						amount={summary.expense.value} 
						trend={summary.expense.trend} 
						trendValue={summary.expense.percentageChange}
						icon={TrendingDown}
						colorClass="bg-[var(--expense)] text-[var(--expense)]"
						animationDelay="200ms"
					/>
				</div>
			</section>

			<section className="grid grid-cols-2 gap-3 lg:hidden">
				<MetricCard 
					title="Entradas" amount={summary.income.value} trend={summary.income.trend} trendValue={summary.income.percentageChange}
					icon={ArrowUpRight} colorClass="bg-[var(--income)] text-[var(--income)]" animationDelay="0ms"
				/>
				<MetricCard 
					title="Saídas" amount={summary.expense.value} trend={summary.expense.trend} trendValue={summary.expense.percentageChange}
					icon={ArrowDownRight} colorClass="bg-[var(--expense)] text-[var(--expense)]" animationDelay="100ms"
				/>
			</section>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
				
				<div className="xl:col-span-2 flex flex-col gap-8">
					
					<section className="interactive-card bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
						<div className="flex justify-between items-center">
							<div className="flex flex-col gap-1">
								<h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">Fluxo de Caixa</h3>
								<p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">Movimentações no período</p>
							</div>

							<div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--border-light)] px-3.5 py-1.5 rounded-full">
								<div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--income)]" />Entradas</div>
								<div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[var(--expense)]" />Saídas</div>
							</div>
						</div>

						<div className="h-[320px] w-full mt-1">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={evolution} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
									<defs>
										<linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--income)" stopOpacity={0.25}/>
											<stop offset="95%" stopColor="var(--income)" stopOpacity={0}/>
										</linearGradient>
										<linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="var(--expense)" stopOpacity={0.25}/>
											<stop offset="95%" stopColor="var(--expense)" stopOpacity={0}/>
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
									<XAxis 
										dataKey="date" 
										axisLine={false} 
										tickLine={false} 
										tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
										dy={8}
										minTickGap={25}
									/>
									<YAxis 
										axisLine={false} 
										tickLine={false} 
										tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
										tickFormatter={(val) => `R$${val / 1000}k`}
									/>
									<Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-hover)', strokeWidth: 1, strokeDasharray: '4 4' }} />
									
									<Area 
										type="monotone" 
										dataKey="expense" 
										name="Saídas"
										stroke="var(--expense)" 
										strokeWidth={2.5}
										fillOpacity={1} 
										fill="url(#colorExpense)" 
									/>
									<Area 
										type="monotone" 
										dataKey="income" 
										name="Entradas"
										stroke="var(--income)" 
										strokeWidth={2.5}
										fillOpacity={1} 
										fill="url(#colorIncome)" 
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</section>

					<section className="interactive-card bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">Distribuição de Gastos</h3>
								<p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">Categorias mais relevantes</p>
							</div>
							<button 
								onClick={() => onNavigate('categories')}
								className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
							>
								Detalhar <ChevronRight size={14} />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
							{categories.slice(0, 6).map((cat: ExpenseCategory) => (
								<div key={cat.id} className="flex flex-col gap-2 group cursor-pointer" onClick={() => onNavigate('categories')}>
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-xs" style={{ backgroundColor: cat.colorHex + '20', color: cat.colorHex, border: `1px solid ${cat.colorHex}40` }}>
												<cat.icon size={15} />
											</div>
											<span className="text-xs sm:text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{cat.name}</span>
										</div>
										<div className="flex items-end flex-col">
											<span className="text-xs sm:text-sm font-bold tabular-nums text-[var(--text-main)]">{formatCurrency(cat.amount)}</span>
											<span className="text-[10px] sm:text-xs font-semibold text-[var(--text-muted)]">{cat.percentage.toFixed(1)}%</span>
										</div>
									</div>
									<ProgressBar percentage={cat.percentage} colorHex={cat.colorHex} />
								</div>
							))}
						</div>
					</section>

				</div>

				<div className="flex flex-col gap-8">
					
					<section className="interactive-card bg-gradient-to-b from-[var(--bg-surface)] to-[var(--bg-elevated)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-md relative">
						<div className="flex justify-between items-start border-b border-[var(--border-light)] pb-4">
							<div>
								<h3 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
									<ShieldCheck size={18} className="text-[var(--accent)]" />
									Saúde Financeira
								</h3>
								<p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">Análise inteligente da sua conta</p>
							</div>
							<button 
								onClick={onOpenHealthModal}
								className="w-7 h-7 rounded-full bg-[var(--bg-base)] border border-[var(--border-light)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all shadow-xs"
								aria-label="Como é calculado?"
							>
								<HelpCircle size={15} />
							</button>
						</div>

						<FinancialHealthGauge score={health.score} status={health.status} trendMonth={health.trendMonth} />

						<div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[var(--border-light)]">
							<div className="p-3 bg-[var(--bg-base)] rounded-xl border border-[var(--border-light)] flex flex-col gap-0.5">
								<span className="text-[11px] font-medium text-[var(--text-muted)]">Capacidade Economia</span>
								<span className="text-xs font-bold text-[var(--text-main)]">{formatCurrency(health.metrics.savingsCapacity)}</span>
							</div>
							<div className="p-3 bg-[var(--bg-base)] rounded-xl border border-[var(--border-light)] flex flex-col gap-0.5">
								<span className="text-[11px] font-medium text-[var(--text-muted)]">Renda Comprometida</span>
								<span className="text-xs font-bold text-[var(--text-main)]">{health.metrics.committedPercentage}%</span>
							</div>
							<div className="p-3 bg-[var(--bg-base)] rounded-xl border border-[var(--border-light)] flex flex-col gap-0.5">
								<span className="text-[11px] font-medium text-[var(--text-muted)]">Reserva de Emergência</span>
								<span className="text-xs font-bold text-[var(--text-main)]">{health.metrics.reserveMonths} meses</span>
							</div>
							<div className="p-3 bg-[var(--bg-base)] rounded-xl border border-[var(--border-light)] flex flex-col gap-0.5">
								<span className="text-[11px] font-medium text-[var(--text-muted)]">Dep. de Crédito</span>
								<span className="text-xs font-bold text-[var(--income)]">{health.metrics.creditDependence}</span>
							</div>
						</div>

						<div className="flex flex-col gap-2.5 pt-2 border-t border-[var(--border-light)]">
							<span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">Diagnóstico</span>
							
							{health.positiveInsights.slice(0, 2).map((item: any) => (
								<div key={item.id} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
									<CheckCircle2 size={15} className="text-[var(--income)] shrink-0 mt-0.5" />
									<span className="leading-snug">{item.text}</span>
								</div>
							))}

							{health.attentionInsights.slice(0, 1).map((item: any) => (
								<div key={item.id} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
									<AlertCircle size={15} className="text-[var(--warning)] shrink-0 mt-0.5" />
									<span className="leading-snug">{item.text}</span>
								</div>
							))}
						</div>

						<button 
							onClick={() => onNavigate('health')}
							className="w-full py-2.5 bg-[var(--bg-elevated)] hover:bg-[var(--border-color)] text-[var(--text-main)] rounded-xl text-xs font-semibold border border-[var(--border-light)] transition-all flex items-center justify-center gap-1.5"
						>
							Ver relatório completo de saúde <ChevronRight size={14} />
						</button>
					</section>

					<button 
						onClick={() => onNavigate('reports')}
						className="w-full py-3.5 bg-[var(--text-main)] text-[var(--bg-base)] rounded-2xl text-xs font-bold transition-all shadow-md hover:opacity-90 flex items-center justify-center gap-2 group"
					>
						<Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
						Exportar Relatório PDF
					</button>

				</div>

			</div>
		</div>
	);
};

const CashflowSubpage = ({ summary, evolution }: any) => {
	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1">
					<span className="text-xs font-medium text-[var(--text-muted)]">Entradas do Período</span>
					<span className="text-2xl font-bold text-[var(--income)]">{formatCurrency(summary.income.value)}</span>
					<span className="text-xs text-[var(--text-muted)] mt-1">Crescimento de +4.2% frente ao mês anterior</span>
				</div>
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1">
					<span className="text-xs font-medium text-[var(--text-muted)]">Saídas do Período</span>
					<span className="text-2xl font-bold text-[var(--expense)]">{formatCurrency(summary.expense.value)}</span>
					<span className="text-xs text-[var(--text-muted)] mt-1">Redução de -5.1% em gastos variáveis</span>
				</div>
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1">
					<span className="text-xs font-medium text-[var(--text-muted)]">Resultado Líquido</span>
					<span className="text-2xl font-bold text-[var(--text-main)]">{formatCurrency(summary.netBalance.value)}</span>
					<span className="text-xs text-[var(--income)] mt-1 font-medium">Margem líquida de 44.5% retida</span>
				</div>
			</div>

			<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-base font-bold text-[var(--text-main)]">Comparativo Diário / Semanal</h3>
						<p className="text-xs text-[var(--text-muted)]">Volume acumulado de Entradas vs Saídas</p>
					</div>
				</div>

				<div className="h-[350px] w-full mt-2">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={evolution.slice(0, 15)} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
							<XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
							<YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={(v) => `R$${v/1000}k`} />
							<Tooltip content={<CustomTooltip />} />
							<Bar dataKey="income" name="Entradas" fill="var(--income)" radius={[4, 4, 0, 0]} />
							<Bar dataKey="expense" name="Saídas" fill="var(--expense)" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

const CategoriesSubpage = ({ categories }: any) => {
	const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];

	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				
				<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col items-center justify-center min-h-[300px]">
					<h3 className="text-base font-bold text-[var(--text-main)] self-start mb-2">Composição Percentual</h3>
					<div className="w-full h-64">
						<ResponsiveContainer width="100%" height="100%">
							<RechartsPieChart>
								<Pie
									data={categories}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={90}
									paddingAngle={4}
									dataKey="amount"
								>
									{categories.map((entry: any, index: number) => (
										<Cell key={`cell-${index}`} fill={entry.colorHex || COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip formatter={(value: number) => formatCurrency(value)} />
							</RechartsPieChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="lg:col-span-2 p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-4">
					<h3 className="text-base font-bold text-[var(--text-main)]">Detalhamento por Categoria</h3>
					<div className="flex flex-col gap-4">
						{categories.map((cat: ExpenseCategory) => (
							<div key={cat.id} className="p-4 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-light)] flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.colorHex + '25', color: cat.colorHex }}>
										<cat.icon size={18} />
									</div>
									<div>
										<h4 className="text-sm font-semibold text-[var(--text-main)]">{cat.name}</h4>
										<span className="text-xs text-[var(--text-muted)]">{cat.transactionCount} transações registradas</span>
									</div>
								</div>
								<div className="text-right">
									<span className="text-sm font-bold text-[var(--text-main)] block">{formatCurrency(cat.amount)}</span>
									<span className="text-xs font-medium text-[var(--text-muted)]">{cat.percentage.toFixed(1)}% do total</span>
								</div>
							</div>
						))}
					</div>
				</div>

			</div>
		</div>
	);
};

const HealthSubpage = ({ health, onOpenHealthModal }: any) => {
	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col lg:flex-row items-center gap-8 justify-between">
				<div className="flex flex-col gap-2 max-w-xl">
					<span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Diagnóstico Especializado</span>
					<h2 className="text-2xl font-extrabold text-[var(--text-main)]">Sua Saúde Financeira está {health.status}</h2>
					<p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
						Parabéns! Suas reservas cobrem mais de 6 meses de despesas vitais e o seu índice de endividamento permanece em níveis extremamente controlados.
					</p>
					<button 
						onClick={onOpenHealthModal}
						className="w-fit mt-2 px-4 py-2 bg-[var(--accent-muted)] text-[var(--accent)] rounded-xl text-xs font-bold border border-[var(--accent)]/20 flex items-center gap-1.5"
					>
						Entender metodologia do score <HelpCircle size={14} />
					</button>
				</div>

				<FinancialHealthGauge score={health.score} status={health.status} trendMonth={health.trendMonth} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-4">
					<h3 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
						<CheckCircle2 size={16} className="text-[var(--income)]" />
						Pontos Fortes Identificados
					</h3>
					<div className="flex flex-col gap-3">
						{health.positiveInsights.map((item: any) => (
							<div key={item.id} className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-light)] text-xs text-[var(--text-main)] font-medium leading-relaxed">
								{item.text}
							</div>
						))}
					</div>
				</div>

				<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-4">
					<h3 className="text-sm font-bold text-[var(--text-main)] uppercase tracking-wider flex items-center gap-2">
						<AlertCircle size={16} className="text-[var(--warning)]" />
						Oportunidades de Otimização
					</h3>
					<div className="flex flex-col gap-3">
						{health.attentionInsights.map((item: any) => (
							<div key={item.id} className="p-3.5 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-light)] text-xs text-[var(--text-main)] font-medium leading-relaxed">
								{item.text}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const EvolutionSubpage = ({ evolution }: any) => {
	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-5">
				<div>
					<h3 className="text-base font-bold text-[var(--text-main)]">Trajetória Acumulada de Saldo</h3>
					<p className="text-xs text-[var(--text-muted)]">Crescimento patrimonial líquido ao longo do tempo</p>
				</div>

				<div className="h-[380px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={evolution}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
							<XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
							<YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={(v) => `R$${v/1000}k`} />
							<Tooltip content={<CustomTooltip />} />
							<Area type="monotone" dataKey="balance" name="Saldo Acumulado" stroke="var(--accent)" strokeWidth={3} fill="var(--accent-muted)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

const ReportsSubpage = () => {
	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-4">
				<h3 className="text-base font-bold text-[var(--text-main)]">Central de Extratos e Exportações</h3>
				<p className="text-xs text-[var(--text-muted)]">Baixe seus relatórios contábeis nos formatos oficiais de exportação.</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
					{[
						{ title: 'Relatório Mensal Consolidado', fmt: 'PDF (Completo)', desc: 'Demonstrativo completo de Entradas, Saídas e Score de Saúde.' },
						{ title: 'Extrato Analítico de Transações', fmt: 'CSV / Excel', desc: 'Lista detalhada de movimentações prontas para importar no ERP.' },
						{ title: 'Relatório de Imposto de Renda', fmt: 'PDF Fiscal', desc: 'Resumo com categorias adequadas para declaração anual.' },
						{ title: 'Diagnóstico de Despesas Fixas', fmt: 'PDF executivo', desc: 'Gráficos e recomendações para corte inteligente de despesas.' },
					].map((rep, i) => (
						<div key={i} className="p-5 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-light)] flex flex-col justify-between gap-4">
							<div>
								<span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-muted)] px-2 py-0.5 rounded-md">{rep.fmt}</span>
								<h4 className="text-sm font-bold text-[var(--text-main)] mt-2">{rep.title}</h4>
								<p className="text-xs text-[var(--text-muted)] mt-1">{rep.desc}</p>
							</div>
							<button className="w-full py-2 bg-[var(--bg-surface)] hover:bg-[var(--border-color)] text-[var(--text-main)] text-xs font-semibold rounded-xl border border-[var(--border-light)] flex items-center justify-center gap-2 transition-all">
								<Download size={14} /> Download Relatório
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const RecurrencesSubpage = ({ recurrences }: any) => {
	return (
		<div className="flex flex-col gap-6 animate-fade-in-up">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1 shadow-sm hover:border-[var(--border-hover)] transition-colors">
					<span className="text-xs font-medium text-[var(--text-muted)]">Total de Recorrências</span>
					<span className="text-2xl font-bold text-[var(--text-main)]">{recurrences.totalCount} registros</span>
					<span className="text-xs text-[var(--text-muted)] mt-1">Assinaturas e despesas/entradas fixas</span>
				</div>
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1 shadow-sm hover:border-[var(--border-hover)] transition-colors">
					<span className="text-xs font-medium text-[var(--text-muted)]">Valor Comprometido (Saídas)</span>
					<span className="text-2xl font-bold text-[var(--expense)]">{formatCurrency(recurrences.committedValue)}</span>
					<span className="text-xs text-[var(--text-muted)] mt-1">Soma das assinaturas e contas fixas</span>
				</div>
				<div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl flex flex-col gap-1 shadow-sm hover:border-[var(--border-hover)] transition-colors">
					<span className="text-xs font-medium text-[var(--text-muted)]">Entradas Fixas Projetadas</span>
					<span className="text-2xl font-bold text-[var(--income)]">{formatCurrency(recurrences.incomeValue)}</span>
					<span className="text-xs text-[var(--text-muted)] mt-1">Receita garantida esperada</span>
				</div>
			</div>

			<div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl flex flex-col gap-5 shadow-sm">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-base font-bold text-[var(--text-main)]">Próximas Recorrências</h3>
						<p className="text-xs text-[var(--text-muted)]">Listagem de eventos fixos agendados para o mês</p>
					</div>
				</div>
				
				<div className="flex flex-col gap-3 mt-1">
					{recurrences.items.map((item: any) => (
						<div key={item.id} className="p-4 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-light)] flex items-center justify-between group hover:border-[var(--border-hover)] transition-colors cursor-pointer">
							<div className="flex items-center gap-4">
								<div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.type === 'income' ? 'bg-[var(--income-muted)] text-[var(--income)] border-[var(--income)]/20' : 'bg-[var(--bg-base)] text-[var(--text-main)] border-[var(--border-light)]'}`}>
									<item.icon size={18} />
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{item.description}</span>
									<span className="text-xs text-[var(--text-muted)]">{item.category} • Próxima cobrança: <span className="font-semibold text-[var(--text-main)]">{item.nextDate}</span></span>
								</div>
							</div>
							<div className="text-right flex flex-col">
								<span className={`text-sm font-bold ${item.type === 'income' ? 'text-[var(--income)]' : 'text-[var(--text-main)]'}`}>
									{item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
								</span>
								<span className="text-[11px] font-medium text-[var(--text-muted)]">{item.type === 'income' ? 'Entrada' : 'Saída'}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const QuickActionBtn = ({ icon: Icon, label, color, delay, closeDelay, isOpen, openPos, closedPos = "bottom-[45px] left-[50%] -translate-x-1/2" }: any) => {
	const posClass = isOpen ? openPos : closedPos;
	
	return (
		<div 
			className={`absolute ${posClass} flex flex-col items-center gap-1.5 transition-all transform ${isOpen ? 'duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-100 scale-100 pointer-events-auto' : 'duration-300 ease-in-out opacity-0 scale-50 pointer-events-none'}`} 
			style={{ transitionDelay: isOpen ? delay : closeDelay }}
		>
			<button className={`w-12 h-12 rounded-full ${color} text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform`}>
				 <Icon size={20} />
			</button>
			<span className={`text-[10px] font-bold text-[var(--text-main)] bg-[var(--bg-surface)]/60 px-1.5 py-0.5 rounded backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
				{label}
			</span>
		</div>
	);
};

const MobileMaisPage = ({ setCurrentMainView, setCurrentSubpage }: any) => {
	const menuItems = [
		 { icon: User, label: 'Meu Perfil', desc: 'Meus dados e configurações de conta' },
		 { icon: Activity, label: 'Histórico', desc: 'Todas as movimentações recentes' },
		 { icon: Repeat, label: 'Recorrências', desc: 'Assinaturas e despesas fixas', subpage: 'recurrences' },
		 { icon: PieChart, label: 'Categorias', desc: 'Gestão de categorias e orçamento', subpage: 'categories' },
		 { icon: FileText, label: 'Relatórios', desc: 'Exportar extratos e contabilidade', subpage: 'reports' },
		 { icon: SlidersHorizontal, label: 'Preferências', desc: 'Configurações do aplicativo' },
	];

	return (
		<div className="min-h-screen pt-4 pb-24 px-4 bg-[var(--bg-base)] animate-fade-in-up">
			<h2 className="text-2xl font-bold text-[var(--text-main)] mb-6 px-2">Mais Opções</h2>
			<div className="flex flex-col gap-3">
				 {menuItems.map((item, i) => (
						<button 
							key={i}
							onClick={() => {
								if (item.subpage) {
									 setCurrentSubpage(item.subpage);
									 setCurrentMainView('analytics');
								}
							}}
							className="flex items-center gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl active:scale-95 transition-transform w-full"
						>
							<div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-main)] border border-[var(--border-light)] shadow-sm">
								<item.icon size={20} />
							</div>
							<div className="flex flex-col text-left flex-1">
								<span className="text-sm font-semibold text-[var(--text-main)]">{item.label}</span>
								<span className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">{item.desc}</span>
							</div>
							<ChevronRight size={16} className="text-[var(--text-muted)] shrink-0" />
						</button>
				 ))}
			</div>
		</div>
	);
};

export default function FinanceProAnalytics() {
	const [isDark] = useState(true);
	const [period] = useState<PeriodOption>('current_month');
	
	const [currentSubpage, setCurrentSubpage] = useState<AnalyticsSubpage>('overview');
	const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	
	const [currentMainView, setCurrentMainView] = useState<'dashboard' | 'analytics' | 'carteiras' | 'mais'>('analytics');
	const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

	const data = useMemo(() => generateMockData(period), [period]);
	const { summary, evolution, categories, health, recurrences } = data;

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className={`min-h-screen ${isDark ? 'theme-dark' : 'theme-light'} bg-[var(--bg-base)] text-[var(--text-main)] relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)]`}>
			<ThemeStyles />

			<header className="hidden lg:flex sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] py-3 items-center justify-center shadow-sm h-14">
				<div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
					<button 
						onClick={toggleSidebar}
						className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
						aria-label="Abrir menu"
					>
						<Menu size={20} />
					</button>
					
					<div className="flex items-center">
						<button className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shadow-sm">
							 <div className="w-full h-full bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] flex items-center justify-center text-white text-xs font-bold">
								 FP
							 </div>
						</button>
					</div>
				</div>
			</header>

			<div 
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
				onClick={() => setIsSidebarOpen(false)}
				aria-hidden="true"
			/>

			<aside 
				className={`fixed top-0 left-0 bottom-0 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-color)] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-[var(--accent)] rounded-xl flex items-center justify-center">
							<ShieldCheck size={18} className="text-white" />
						</div>
						<span className="font-bold text-[var(--text-main)] tracking-tight">FinancePro</span>
					</div>
					<button 
						onClick={() => setIsSidebarOpen(false)}
						className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] transition-colors"
						aria-label="Fechar menu"
					>
						<X size={18} />
					</button>
				</div>

				<nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 scrollbar-hide">
					<span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 px-3">Principal</span>
					
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors w-full text-left font-medium">
						<Home size={18} />
						Dashboard
					</button>
					
					<button 
						className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--accent-muted)] text-[var(--accent)] font-semibold w-full text-left"
						onClick={() => {
							setCurrentSubpage('overview');
							setIsSidebarOpen(false);
						}}
					>
						<BarChart3 size={18} />
						Analytics
					</button>
					
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors w-full text-left font-medium">
						<Wallet size={18} />
						Carteiras
					</button>
					
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors w-full text-left font-medium">
						<CreditCard size={18} />
						Transações
					</button>
					
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors w-full text-left font-medium">
						<Repeat size={18} />
						Recorrências
					</button>
					
					<div className="my-2 border-t border-[var(--border-light)]" />
					
					<span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 px-3">Configurações</span>
					
					<button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-main)] transition-colors w-full text-left font-medium">
						<User size={18} />
						Meu Perfil
					</button>
				</nav>
			</aside>

			<div className={currentMainView === 'analytics' ? 'block' : 'hidden lg:block'}>
				<MobileFlushHero availableToSpend={summary.availableToSpend} futureCommitments={summary.futureCommitments} />

				<ContextualAnalyticsHeader 
					currentSubpage={currentSubpage} 
					setSubpage={setCurrentSubpage}
				/>

				<main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10">
					{currentSubpage === 'overview' && (
						<OverviewSubpage 
							summary={summary} 
							evolution={evolution} 
							categories={categories} 
							health={health} 
							onOpenHealthModal={() => setIsHealthModalOpen(true)}
							onNavigate={setCurrentSubpage}
						/>
					)}
					{currentSubpage === 'cashflow' && (
						<CashflowSubpage summary={summary} evolution={evolution} />
					)}
					{currentSubpage === 'categories' && (
						<CategoriesSubpage categories={categories} />
					)}
					{currentSubpage === 'health' && (
						<HealthSubpage health={health} onOpenHealthModal={() => setIsHealthModalOpen(true)} />
					)}
					{currentSubpage === 'evolution' && (
						<EvolutionSubpage evolution={evolution} />
					)}
					{currentSubpage === 'reports' && (
						<ReportsSubpage />
					)}
					{currentSubpage === 'recurrences' && (
						<RecurrencesSubpage recurrences={recurrences} />
					)}
				</main>
			</div>

			<div className="block lg:hidden">
				 {currentMainView === 'dashboard' && <div className="p-6 text-center text-[var(--text-muted)] pt-20 animate-fade-in-up">Dashboard em construção...</div>}
				 {currentMainView === 'carteiras' && <div className="p-6 text-center text-[var(--text-muted)] pt-20 animate-fade-in-up">Carteiras em construção...</div>}
				 {currentMainView === 'mais' && <MobileMaisPage setCurrentMainView={setCurrentMainView} setCurrentSubpage={setCurrentSubpage} />}
			</div>

			{/* Botão de Ações Rápidas - Desktop */}
			<div className="hidden lg:block">
				{/* Overlay Desktop (mesmo efeito da versão mobile mas adaptado visualmente ao corner fixo) */}
				<div 
					className={`fixed inset-0 bg-[var(--bg-base)] transition-all ease-in-out z-[60] ${isQuickActionsOpen ? 'duration-300 opacity-95 pointer-events-auto' : 'duration-500 delay-100 opacity-0 pointer-events-none'}`} 
					onClick={() => setIsQuickActionsOpen(false)} 
				/>
				
				{/* Ações Rápidas em formato de Stack Vertical sobre o botão */}
				<div className="fixed inset-0 pointer-events-none z-[65]">
					 <QuickActionBtn icon={TrendingUp} label="Receita" color="bg-[var(--income)]" delay="150ms" closeDelay="0ms" isOpen={isQuickActionsOpen} openPos="bottom-[435px] right-[60px] translate-x-1/2" closedPos="bottom-[45px] right-[60px] translate-x-1/2" />
					 <QuickActionBtn icon={TrendingDown} label="Despesa" color="bg-[var(--expense)]" delay="100ms" closeDelay="50ms" isOpen={isQuickActionsOpen} openPos="bottom-[355px] right-[60px] translate-x-1/2" closedPos="bottom-[45px] right-[60px] translate-x-1/2" />
					 <QuickActionBtn icon={Repeat} label="Transferência" color="bg-blue-500" delay="100ms" closeDelay="50ms" isOpen={isQuickActionsOpen} openPos="bottom-[275px] right-[60px] translate-x-1/2" closedPos="bottom-[45px] right-[60px] translate-x-1/2" />
					 <QuickActionBtn icon={Activity} label="Recorrências" color="bg-purple-500" delay="50ms" closeDelay="100ms" isOpen={isQuickActionsOpen} openPos="bottom-[195px] right-[60px] translate-x-1/2" closedPos="bottom-[45px] right-[60px] translate-x-1/2" />
					 <QuickActionBtn icon={Wallet} label="Carteiras" color="bg-orange-500" delay="50ms" closeDelay="100ms" isOpen={isQuickActionsOpen} openPos="bottom-[115px] right-[60px] translate-x-1/2" closedPos="bottom-[45px] right-[60px] translate-x-1/2" />
				</div>

				{/* Trigger Desktop */}
				<div className="fixed bottom-8 right-8 z-[70]">
					<button 
						onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
						className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-300 pointer-events-auto ${isQuickActionsOpen ? 'bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-none border border-[var(--border-light)]' : 'bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] hover:scale-105 active:scale-95'}`}
					>
						<X size={28} className={`transition-transform duration-300 ${isQuickActionsOpen ? 'rotate-0' : 'rotate-45'}`} />
					</button>
				</div>
			</div>

			{}
			<nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-[60] transition-colors duration-300 ${isQuickActionsOpen ? 'bg-transparent border-transparent' : 'bg-[var(--bg-surface)] border-t border-[var(--border-color)] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]'}`}>
				<div className="flex items-center justify-between h-[68px] px-2 relative pb-safe">
					
					<div className={`fixed inset-0 bg-[var(--bg-base)] transition-all ease-in-out ${isQuickActionsOpen ? 'duration-300 opacity-95 pointer-events-auto' : 'duration-500 delay-100 opacity-0 pointer-events-none'}`} onClick={() => setIsQuickActionsOpen(false)} />

					<div className="fixed inset-0 pointer-events-none z-[65]">
						 <div className="absolute w-full h-full max-w-md mx-auto left-0 right-0">
							 <QuickActionBtn icon={TrendingUp} label="Receita" color="bg-[var(--income)]" delay="150ms" closeDelay="0ms" isOpen={isQuickActionsOpen} openPos="bottom-[270px] left-[50%] -translate-x-1/2" />
							 <QuickActionBtn icon={TrendingDown} label="Despesa" color="bg-[var(--expense)]" delay="100ms" closeDelay="50ms" isOpen={isQuickActionsOpen} openPos="bottom-[200px] left-[22%] -translate-x-1/2" />
							 <QuickActionBtn icon={Repeat} label="Transferência" color="bg-blue-500" delay="100ms" closeDelay="50ms" isOpen={isQuickActionsOpen} openPos="bottom-[200px] left-[78%] -translate-x-1/2" />
							 <QuickActionBtn icon={Activity} label="Recorrências" color="bg-purple-500" delay="50ms" closeDelay="100ms" isOpen={isQuickActionsOpen} openPos="bottom-[130px] left-[15%] -translate-x-1/2" />
							 <QuickActionBtn icon={Wallet} label="Carteiras" color="bg-orange-500" delay="50ms" closeDelay="100ms" isOpen={isQuickActionsOpen} openPos="bottom-[130px] left-[85%] -translate-x-1/2" />
						 </div>
					</div>

					<div className="flex w-full justify-between items-center z-[70]">
						 <button onClick={() => { setCurrentMainView('dashboard'); setIsQuickActionsOpen(false); }} className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${isQuickActionsOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} ${currentMainView === 'dashboard' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
								<Home size={22} className={`mb-1 transition-transform ${currentMainView === 'dashboard' ? 'scale-110' : ''}`} />
								<span className="text-[10px] font-medium">Dashboard</span>
						 </button>
						 <button onClick={() => { setCurrentMainView('analytics'); setIsQuickActionsOpen(false); }} className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${isQuickActionsOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} ${currentMainView === 'analytics' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
								<BarChart3 size={22} className={`mb-1 transition-transform ${currentMainView === 'analytics' ? 'scale-110' : ''}`} />
								<span className="text-[10px] font-medium">Análises</span>
						 </button>
						 
						 <div className="relative -top-6 flex items-center justify-center w-16">
							 <button 
								 onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
								 className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-300 ${isQuickActionsOpen ? 'bg-[var(--bg-elevated)] text-[var(--text-main)] shadow-none border border-[var(--border-light)]' : 'bg-gradient-to-tr from-[var(--accent)] to-[#9333EA] hover:scale-105 active:scale-95'}`}
							 >
								 <X size={28} className={`transition-transform duration-300 ${isQuickActionsOpen ? 'rotate-0' : 'rotate-45'}`} />
							 </button>
						 </div>
						 
						 <button onClick={() => { setCurrentMainView('carteiras'); setIsQuickActionsOpen(false); }} className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${isQuickActionsOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} ${currentMainView === 'carteiras' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
								<Wallet size={22} className={`mb-1 transition-transform ${currentMainView === 'carteiras' ? 'scale-110' : ''}`} />
								<span className="text-[10px] font-medium">Carteiras</span>
						 </button>
						 <button onClick={() => { setCurrentMainView('mais'); setIsQuickActionsOpen(false); }} className={`flex flex-col items-center justify-center w-14 transition-all duration-300 ${isQuickActionsOpen ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'} ${currentMainView === 'mais' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
								<Menu size={22} className={`mb-1 transition-transform ${currentMainView === 'mais' ? 'scale-110' : ''}`} />
								<span className="text-[10px] font-medium">Mais</span>
						 </button>
					</div>
				</div>
			</nav>

			<HealthExplanationModal 
				isOpen={isHealthModalOpen} 
				onClose={() => setIsHealthModalOpen(false)} 
			/>
		</div>
	);
}