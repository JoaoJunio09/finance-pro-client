import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import type { TransactionModalType } from "./TransactionModalType";

export interface FormData {
	id: string | null,
	amount: string,
	description: string,
	categoryId: string,
	registeredAt: string,
	type: TransactionModalType,
	walletId?: string,
	toWalletId?: string,
	fromWalletId?: string,
	observation?: string,
	recurrenceId?: string,
	frequencyType?: FrequencyType,
	recDayOne?: string,
	recDayTwo?: string,
	month?: string,
	recurrenceType?: RecurrenceType
}