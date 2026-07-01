import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

export type CalendarDay = {
	date: string | null;
	transactions: TransactionResponse[];
	inTotal?: number | undefined;
	outTotal?: number | undefined;
	futureTotal?: number | undefined;
};