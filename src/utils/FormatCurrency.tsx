export const formatCurrencyLabel = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function formatCurrencyInput(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');

  if (!onlyNumbers) {
    return '';
  }

  return (Number(onlyNumbers) / 100).toFixed(2);
}

export function formatCurrencyDisplay(value: string) {
  if (!value) {
    return '';
  }

  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyToAPI(value: string) {
  return Number(value);
}

export function getIntegerPart(value: number): string {
  return Math.trunc(value).toLocaleString('pt-BR');
}

export function getDecimalPart(value: number): string {
  return value.toFixed(2).split('.')[1];
}