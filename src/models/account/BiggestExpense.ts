import type { CategoryResponse } from "../category/CategoryResponse";

export interface BiggestExpense {
	value: number,
	category: CategoryResponse
}