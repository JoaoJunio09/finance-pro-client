import type { TransactionResponse } from "./TransactionResponse";

export interface AllTransactionResponse {
	currentBalance: number,
	availableToSpend: number,
	income: number,
	expenses: number,
	netIncome: number,
	commitment: number,
	transactionBiggestIncome: TransactionResponse,
	transactionBiggestExpense: TransactionResponse,
	transactions: TransactionResponse[]
}