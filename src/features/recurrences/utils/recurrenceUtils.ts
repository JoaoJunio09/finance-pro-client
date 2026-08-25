import type { FrequencyType } from '../../../types/FrequencyType';
import type { RecurrenceFrequency, RecurrenceStatus } from '../types/recurrence';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/D';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    new Date(dateString)
  );
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