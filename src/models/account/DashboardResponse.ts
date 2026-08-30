import type { RecurrenceSummary } from "../recurrence/RecurrenceSummary";
import type { TransactionResponse } from "../transaction/TransactionResponse";
import type { WalletResponse } from "../wallet/WalletResponse";
import type { CategorySpending } from "./AnalyticsResponse";

export interface DashboardResponse {
	id: string,
	currentBalance: number,
	income: number,
	expenses: number,
	availableToSpend: number,
	wallets: WalletResponse[],
	transactions: TransactionResponse[],
	recurrences: RecurrenceSummary[],
	expensesByCategory: CategorySpending[]
}