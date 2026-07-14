import type { ExecutionType } from "../../types/ExecutionType";
import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceType } from "../../types/RecurrenceType";

export interface RecurrenceRequest {
	id: string | null,
	amount: number,
	type: RecurrenceType,
	frequencyType: FrequencyType,
	executionType: ExecutionType,
	dayOne?: number,
	dayTwo?: number,
	monthOfTheYear?: number,
	description: string,
	dayOneAlreadyOccurred: boolean,
	dayTwoAlreadyOccurred: boolean,
	monthOfTheYearAlreadyOccurred: boolean,
	categoryId: string,
	walletId: string,
	accountId: string
}