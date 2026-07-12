import type { ExecutionType } from "../../types/ExecutionType";
import type { FrequencyType } from "../../types/FrequencyType";
import type { RecurrenceSort } from "../../types/RecurrenceSort";
import type { RecurrenceType } from "../../types/RecurrenceType";

export interface ParamsRecurrenceAPI {
	accountId?: string,
	type?: RecurrenceType,
	frequencyType?: FrequencyType,
	executionType?: ExecutionType,
	sort?: RecurrenceSort
}