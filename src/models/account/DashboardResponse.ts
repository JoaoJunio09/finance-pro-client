import type { TransactionResponse } from "../transaction/TransactionResponse";

export interface WeeklyFlowPoint {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface DashboardResponse {
  weekStart: string;
  weekEnd: string;
  weeklyFlow: WeeklyFlowPoint[];
  recentTransactions: TransactionResponse[];
}