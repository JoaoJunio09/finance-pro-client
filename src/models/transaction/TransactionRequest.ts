import type { TransactionType } from "../../enums/TransactionType";

export interface TransactionRequest {
	amount: number,
	description: string,
	observation?: string,
	type: TransactionType,
	registeredAt: string,
	categoryId: string,
	accountId: string
}