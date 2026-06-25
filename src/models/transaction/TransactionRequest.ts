import type { TransactionType } from "../../types/TransactionType";

export interface TransactionRequest {
	amount: number,
	type: TransactionType,
	category: string,
	registeredAt: string,
	accountId: number
}