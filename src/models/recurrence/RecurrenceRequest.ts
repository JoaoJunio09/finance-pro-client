import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceType } from "../../types/RecurrenceType";

export interface RecurrenceRequest {
	amount: number,
	type: RecurrenceType,
	frequencyType: FrequencyType,
	dayOne?: number,
	dayTwo?: number,
	monthOfTheYear?: number,
	description: string,
	walletId: string,
	accountId: string
}