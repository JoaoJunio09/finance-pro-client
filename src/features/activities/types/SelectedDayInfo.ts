import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

export type SelectedDayInfo = {
	day: number | null;
	transactions: TransactionResponse[];
	inTotal?: number | undefined;
	outTotal?: number | undefined;
	futureTotal?: number | undefined;
};