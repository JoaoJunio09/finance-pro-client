import type { TransactionType } from "../../../types/TransactionType";

export interface FormData {
	amount: number,
	description: string,
	categoryId: string,
	registeredAt: string,
	type: TransactionType,
	walletId?: string,
	toWalletId?: string,
	fromWalletId?: string,
	observation?: string 
}