import type { TransactionStatus } from "../../types/TransactionStatus";
import type { TransactionType } from "../../types/TransactionType";

export interface TransactionSummary {
	id: string,
	amount: number,
	description: string,
	type: TransactionType,
	status: TransactionStatus,
	registeredAt: string
}