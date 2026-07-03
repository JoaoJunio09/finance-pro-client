import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceType } from "../../types/RecurrenceType";

export interface RecurrenceResponse {
	id: number;
	amount: number;
	type: RecurrenceType;
	frequencyType: FrequencyType;
	dayOne: number;
	dayTwo: number;
	monthOfTheYear: number;
	nextExecutionDate: string;
	lastExecutionDate: string;
	active: boolean;
	description: string;
}