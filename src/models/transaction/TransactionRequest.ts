import type { TransactionStatus } from "../../types/TransactionStatus";
import type { TransactionType } from "../../types/TransactionType";

export interface TransactionRequest {
	id?: string | null,
	amount: number,
	description: string,
	observation?: string,
	type: TransactionType,
	status: TransactionStatus,
	registeredAt: string,
	categoryId: string,
	walletId: string,
	accountId: string
}