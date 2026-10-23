import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

export function formatActivityCurrency(value: number): string {
  return formatCurrencyLabel(Math.abs(value));
}

export function getMonthName(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(
    date
  );
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}
