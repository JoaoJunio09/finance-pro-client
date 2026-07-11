import type { BiggestExpense } from "./BiggestExpense";

export interface AccountResponse {
	id: string,
	currentBalance: number,
	income: number,
	expenses: number,
	netIncome: number,
	biggestExpense: BiggestExpense
}