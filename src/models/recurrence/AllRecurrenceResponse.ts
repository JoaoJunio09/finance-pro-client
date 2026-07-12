import type { RecurrenceResponse } from "./RecurrenceResponse";

export interface AllRecurrenceResponse {
	totalRegistered: number;
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  monthlyImpact: number;
  recurrencesDueToday: RecurrenceResponse[];
  recurrencesOverdue: RecurrenceResponse[];
  recurrencesUpcoming: RecurrenceResponse[];
  recurrences: RecurrenceResponse[];
}