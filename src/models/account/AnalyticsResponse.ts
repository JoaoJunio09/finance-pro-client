import type { RecurrenceResponse } from "../recurrence/RecurrenceResponse";
import type { TransactionResponse } from "../transaction/TransactionResponse";

export interface CategorySpending {
	id: string;
	name: string;
	color: string;
	icon: string;
	amount: number;
	percentage: number;
}

export interface EvolutionDataPoint {
	date: string;
  income: string;
  expense: string;
  balance: string;
}

export interface BalanceTrajectoryPoint {
	date: string;
	balance: number;
}

export interface AnalyticsResponse {
	availableToSpend: number;
	income: number;
	expense: number;
	commitments: number;
	transactions: TransactionResponse[];
	recurrences: RecurrenceResponse[];
	categorySpending: CategorySpending[];
	evolution: EvolutionDataPoint[];
	trajectory: BalanceTrajectoryPoint[];
}