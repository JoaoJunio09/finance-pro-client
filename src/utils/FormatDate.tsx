const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export function formatRelativeDateTime(
  localDateTime: string | null | undefined
): string {
  // A API não enviou uma data válida
  if (!localDateTime) {
    return '';
  }

  const now = new Date();

  let date: Date;
  let hasTime = false;

  // LocalDate: YYYY-MM-DD
  // Exemplo: 2026-07-30
  if (!localDateTime.includes('T')) {
    const [year, month, day] = localDateTime
      .split('-')
      .map(Number);

    date = new Date(year, month - 1, day);
  } else {
    // LocalDateTime: YYYY-MM-DDTHH:mm:ss
    // Exemplo: 2026-07-20T15:30:00
    date = new Date(localDateTime);
    hasTime = true;
  }

  const startOfDay = (d: Date) =>
    new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate()
    );

  const dateDay = startOfDay(date);
  const today = startOfDay(now);

  const diffInDays = Math.round(
    (today.getTime() - dateDay.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  let hourText = '';

  if (hasTime) {
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour !== 0 || minute !== 0) {
      hourText = ` às ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }
  }

  if (diffInDays === 0) {
    return `Hoje${hourText}`;
  }

  if (diffInDays === 1) {
    return `Ontem${hourText}`;
  }

  if (diffInDays === 2) {
    return `Anteontem${hourText}`;
  }

  const dia = date.getDate();
  const mes = MONTHS[date.getMonth()];

  return `${dia} de ${mes}${hourText}`;
}

export function formatDateLabel(
  dateString: string | null | undefined
): string {
  if (!dateString) {
    return '';
  }

  const [, month, day] = dateString
    .split('-')
    .map(Number);

  const dayFormatted = day < 10
    ? `0${day}`
    : `${day}`;

  return `${dayFormatted} de ${MONTHS[month - 1]}`;
}