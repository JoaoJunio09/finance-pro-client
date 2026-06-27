import type { TransactionType } from "../../enums/TransactionType";

export interface TransactionResponse {
	id: number,
	amount: number,
	description: string,
	observation: string,
	type: TransactionType,
	category: string,
	registeredAt: string
}