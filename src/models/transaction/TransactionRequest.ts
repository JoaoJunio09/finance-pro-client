import type { TransactionType } from "../../enums/TransactionType";

export interface TransactionRequest {
	amount: number,
	type: TransactionType,
	category: string,
	registeredAt: string,
	accountId: string
}