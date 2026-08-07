import type { CategoryResponse } from "../category/CategoryResponse";
import type { RecurrenceSummary } from "../recurrence/RecurrenceSummary";
import type { TransactionResponse } from "../transaction/TransactionResponse";
import type { WalletResponse } from "../wallet/WalletResponse";

export interface ExpensesByCategory {
	category: CategoryResponse,
	percentage: number,
	amount: number
}

export interface DashboardResponse {
	id: string,
	currentBalance: number,
	income: number,
	expenses: number,
	availableToSpend: number,
	wallets: WalletResponse[],
	transactions: TransactionResponse[],
	recurrences: RecurrenceSummary[],
	expensesByCategory: ExpensesByCategory[]
}