import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

export type CalendarDay = {
	date: string | null;
	transactions: TransactionResponse[];
	recurrences: RecurrenceResponse[];
	inTotal?: number | undefined;
	outTotal?: number | undefined;
	futureTotal?: number | undefined;
};