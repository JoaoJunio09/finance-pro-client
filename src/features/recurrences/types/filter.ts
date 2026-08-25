import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceStatus } from "../../../types/RecurrenceStatus";
import type { RecurrenceType } from "../../../types/RecurrenceType";

export interface Filters {
  type: 'ALL' | RecurrenceType;
  status: 'ALL' | RecurrenceStatus;
  frequency: 'ALL' | FrequencyType;
}