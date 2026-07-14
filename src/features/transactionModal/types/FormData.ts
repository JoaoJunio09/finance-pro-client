import type { TransactionType } from "../../../types/TransactionType";

export interface FormData {
	id: string | null,
	amount: string,
	description: string,
	categoryId: string,
	registeredAt: string,
	type: TransactionType,
	walletId?: string,
	observation?: string,
}