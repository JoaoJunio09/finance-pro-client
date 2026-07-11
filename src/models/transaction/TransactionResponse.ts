import type { TransactionType } from "../../types/TransactionType";
import type { CategoryResponse } from "../category/CategoryResponse";
import type { WalletSummary } from "../wallet/WalletSummary";

export interface TransactionResponse {
	id: string,
	amount: number,
	description: string,
	observation: string,
	type: TransactionType,
	category: CategoryResponse,
	registeredAt: string,
	wallet: WalletSummary,
	recurrenceId: string
}