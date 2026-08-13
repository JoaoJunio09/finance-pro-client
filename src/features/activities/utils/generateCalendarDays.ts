interface CalendarDayCell {
  date: Date;
  isCurrentMonth: boolean;
}

export function generateCalendarDays(currentDate: Date): CalendarDayCell[] {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const days: CalendarDayCell[] = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  const remainingSlots = 42 - days.length;
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  return days;
}