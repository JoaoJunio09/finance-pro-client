import type { RecurrenceResponse } from "../recurrence/RecurrenceResponse";
import type { TransactionResponse } from "../transaction/TransactionResponse";

export interface ActivitiesResponse {
	transactions: TransactionResponse[];
	recurrences: RecurrenceResponse[];
}