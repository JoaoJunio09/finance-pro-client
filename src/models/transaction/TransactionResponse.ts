import type { TransactionStatus } from "../../types/TransactionStatus";
import type { TransactionType } from "../../types/TransactionType";
import type { CategoryResponse } from "../category/CategoryResponse";
import type { WalletResponse } from "../wallet/WalletResponse";

export interface TransactionResponse {
	id: string,
	amount: number,
	description: string,
	observation: string,
	type: TransactionType,
	status: TransactionStatus,
	category: CategoryResponse,
	registeredAt: string,
	wallet: WalletResponse,
	recurrenceId: string
}