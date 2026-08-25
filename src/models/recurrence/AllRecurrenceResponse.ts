import type { RecurrenceResponse } from "./RecurrenceResponse";

export interface AllRecurrenceResponse {
	totalActives: number;
  totalIncomeAmount: number;
  totalExpenseAmount: number;
  monthlyImpact: number;
  recurrences: RecurrenceResponse[];
  recurrencesDueToday: RecurrenceResponse[];
  recurrencesOverdue: RecurrenceResponse[];
  recurrencesUpcoming: RecurrenceResponse[];
  recurrencesHighlightsOfTheWeek: RecurrenceResponse[];
}