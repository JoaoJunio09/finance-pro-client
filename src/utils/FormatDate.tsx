export function formatRelativeDateTime(localDateTime: string): string {
  const date = new Date(localDateTime);
  const now = new Date();

  // Zera horas para comparar apenas os dias (evita bug de fuso/horário)
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const dateDay = startOfDay(date);
  const today = startOfDay(now);

  const diffInDays = Math.round((today.getTime() - dateDay.getTime()) / (1000 * 60 * 60 * 24));

  const hour = date.getHours();
  const horaTexto = `${hour} hora${hour === 1 ? '' : 's'}`;

  if (diffInDays === 0) {
    return `Hoje às ${horaTexto}`;
  }

  if (diffInDays === 1) {
    return `Ontem às ${horaTexto}`;
  }

  if (diffInDays === 2) {
    return `Anteontem às ${horaTexto}`;
  }

  // A partir de 3 dias atrás (e também datas futuras): "27 de junho às 15 horas"
  const meses = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];

  return `${dia} de ${mes} às ${horaTexto}`;
}

export function formatDateLabel(dateString: string, MONTHS: string[]): string {
  const [, month, day] = dateString.split('-').map(Number);
  const dayFormatted = day < 10 ? `0${day}` : `${day}`;
  return `${dayFormatted} de ${MONTHS[month - 1]}`;
}