import type { TransactionType } from "../../types/TransactionType";

export interface TransactionResponse {
	id: number,
	amount: number,
	description: string,
	observation: string,
	type: TransactionType,
	category: string,
	registeredAt: string
}