import type { RecurrenceType } from "../../types/RecurrenceType";
import type { CategoryResponse } from "../category/CategoryResponse";

export interface RecurrenceSummary {
	id: string,
	amount: number,
	type: RecurrenceType,
	description: string,
	nextExecutionDate: string,
	category: CategoryResponse
}