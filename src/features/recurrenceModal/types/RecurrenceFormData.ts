import type { ExecutionType } from "../../../types/ExecutionType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceType } from "../../../types/RecurrenceType";

export interface RecurrenceFormData {
	id: string | null,
	amount: string,
	description: string,
	type: RecurrenceType,
	frequencyType: FrequencyType,
	executionType: ExecutionType,
	recDayOne: string,
	recDayTwo?: string,
	month?: string,
	dayOneAlreadyOccurred: boolean,
	dayTwoAlreadyOccurred: boolean,
	monthOfTheYearAlreadyOccurred: boolean,
	categoryId: string,
	walletId: string,
}