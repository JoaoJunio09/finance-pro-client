import type { RecurrenceResponse } from "../recurrence/RecurrenceResponse";
import type { TransactionResponse } from "../transaction/TransactionResponse";

interface CategorySpending {
	id: string;
	name: string;
	color: string;
	icon: string;
	amount: number;
	percentage: number;
}

export interface AnalyticsResponse {
	availableToSpend: number;
	income: number;
	expense: number;
	commitments: number;
	transactions: TransactionResponse[];
	recurrences: RecurrenceResponse[];
	categorySpending: CategorySpending[];
}