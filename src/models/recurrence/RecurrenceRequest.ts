import type { ExecutionType } from "../../types/ExecutionType";
import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceStatus } from "../../types/RecurrenceStatus";
import type { RecurrenceType } from "../../types/RecurrenceType";

export interface RecurrenceRequest {
	id?: string,
	amount: number,
	type: RecurrenceType,
	frequencyType: FrequencyType,
	executionType: ExecutionType,
	status: RecurrenceStatus,
	dayOne?: number,
	dayTwo?: number,
	monthOfTheYear?: number,
	description?: string,
	dayOneAlreadyOccurred: boolean,
	dayTwoAlreadyOccurred: boolean,
	monthOfTheYearAlreadyOccurred: boolean,
	categoryId: string,
	walletId: string,
	accountId: string
}