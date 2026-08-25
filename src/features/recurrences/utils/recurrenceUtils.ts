import type { FrequencyType } from '../../../types/FrequencyType';
import type { RecurrenceStatus } from '../types/recurrence';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Cria a Date em horário LOCAL a partir de uma string "yyyy-MM-dd" (ou "yyyy-MM-ddTHH:mm:ss...")
export const parseLocalDate = (dateString: string): Date => {
  const datePart = dateString.split('T')[0]; // ignora hora/timezone, se houver
  const [year, month, day] = datePart.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/D';
  const date = parseLocalDate(dateString);
  return date.toLocaleDateString('pt-BR'); // ajuste o formato conforme já usa
};

export const getDaysDifference = (dateString: string | null): number | null => {
  if (!dateString) return null;
  const target = new Date(dateString);
  const today = new Date();

  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const translateFrequency = (freq: FrequencyType): string => {
  const map: Record<FrequencyType, string> = {
    BIWEEKLY: 'Quinzenal',
    MONTHLY: 'Mensal',
    YEARLY: 'Anual',
  };
  return map[freq];
};

export const translateStatus = (status: RecurrenceStatus): string => {
  const map: Record<RecurrenceStatus, string> = {
    ACTIVE: 'Ativa',
    PAUSED: 'Pausada',
    ENDED: 'Encerrada',
  };
  return map[status];
};