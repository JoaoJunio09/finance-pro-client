import type { DayIndicators } from "./DayIndicators";

export interface CalendarDayView {
	key: string;
	dayNumber: number;
	isCurrentMonth: boolean;
	isToday: boolean;
	data: DayIndicators;
}