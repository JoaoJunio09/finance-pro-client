import type { TransactionType } from "../../types/TransactionType";

export interface TransactionRequest {
	amount: number,
	description: string,
	observation?: string,
	type: TransactionType,
	registeredAt: string,
	categoryId: string,
	walletId: string,
	accountId: string
}