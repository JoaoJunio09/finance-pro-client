import type { RecurrenceSummary } from "../recurrence/RecurrenceSummary";
import type { TransactionResponse } from "../transaction/TransactionResponse";
import type { WalletResponse } from "../wallet/WalletResponse";

export interface CategorySpendingDTO {
	id: string,
	name: string,
	color: string,
	icon: string,
	amount: number,
	percentage: number
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
	expensesByCategory: CategorySpendingDTO[]
}