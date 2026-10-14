import type React from "react";

export type Trend = "up" | "down" | "neutral";
export type InsightType = "positive" | "negative" | "neutral" | "alert";
export type HealthStatus =
  | "Excelente"
  | "Muito Boa"
  | "Boa"
  | "Regular"
  | "Crítica";
export type PeriodOption =
  | "current_month"
  | "last_3_months"
  | "last_6_months"
  | "this_year";
export type AnalyticsSubpage =
  | "overview"
  | "cashflow"
  | "categories"
  | "health"
  | "evolution"
  | "reports";

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
  creditDependence: "Mínima" | "Baixa" | "Média" | "Alta";
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
  type: "income" | "expense";
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
  type: "income" | "expense";
  icon: React.ElementType;
}
