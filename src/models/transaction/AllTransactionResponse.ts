import type { CategoryResponse } from "../category/CategoryResponse";
import type { TransactionResponse } from "./TransactionResponse";

export interface AllTransactionResponse {
	currentBalance: number,
	availableToSpend: number,
	income: number,
	expenses: number,
	netIncome: number,
	commitment: number,
	expenseOfTheMonth: BiggestExpenseOfTheMonth,
	incomeOfTheMonth: BiggestIncomeOfTheMonth,
	transactions: TransactionResponse[]
}

interface BiggestExpenseOfTheMonth {
	value: number,
	category: CategoryResponse
}

interface BiggestIncomeOfTheMonth {
	value: number,
	category: CategoryResponse
}