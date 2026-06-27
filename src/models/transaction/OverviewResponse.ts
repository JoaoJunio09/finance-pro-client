export type Month = 
  | 'January' | 'February' | 'March' | 'April' | 'May' | 'June' 
  | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export interface WeekOverview {
	week: number;  
  income: number;
  expenses: number;
}
export interface OverviewResponse {
	overview: Record<Month, WeekOverview[]>
}