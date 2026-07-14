import type { ExecutionType } from "../../types/ExecutionType";
import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceType } from "../../types/RecurrenceType";
import type { CategoryResponse } from "../category/CategoryResponse";
import type { WalletResponse } from "../wallet/WalletResponse";

export interface RecurrenceResponse {
	id: string;
	amount: number;
	description: string;
	type: RecurrenceType;
	frequencyType: FrequencyType;
	executionType: ExecutionType;
	dayOne: number;
	dayTwo: number;
	monthOfTheYear: number;
	nextExecutionDate: string;
	lastExecutionDate: string;
	active: boolean;
	category: CategoryResponse,
	wallet: WalletResponse
}