import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceStatus } from "../../../types/RecurrenceStatus";
import type { RecurrenceType } from "../../../types/RecurrenceType";

export interface RecFormData {
	id?: string,
	amount: string,
	type: RecurrenceType,
	frequencyType: FrequencyType,
	executionType: ExecutionType,
	status: RecurrenceStatus,
	dayOne: string,
	dayTwo?: string,
	monthOfTheYear?: string,
	description?: string,
	dayOneAlreadyOccurred: boolean,
	dayTwoAlreadyOccurred: boolean,
	monthOfTheYearAlreadyOccurred: boolean,
	startDate: string,
	endDate: string,
	category?: CategoryResponse,
	wallet?: WalletResponse,
	accountId: string
}