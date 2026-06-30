import type { TransactionType } from "../../types/TransactionType";
import type { CategoryResponse } from "../category/CategoryResponse";

export interface TransactionResponse {
	id: number,
	amount: number,
	description: string,
	observation: string,
	type: TransactionType,
	category: CategoryResponse,
	registeredAt: string
}