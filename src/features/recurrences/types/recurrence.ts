import type { ElementType } from 'react';

export type RecurrenceType = 'INCOME' | 'EXPENSE';
export type RecurrenceStatus = 'ACTIVE' | 'PAUSED' | 'ENDED';
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
export type ExecutionType = 'AUTOMATIC' | 'MANUAL';

export interface Category {
  id: string;
  name: string;
  icon: ElementType;
  color: string;
}

export interface Wallet {
  id: string;
  name: string;
  color: string;
}

export interface Recurrence {
  id: string;
  code: string;
  description: string;
  type: RecurrenceType;
  status: RecurrenceStatus;
  executionType: ExecutionType;
  amount: number;
  frequency: RecurrenceFrequency;
  category: Category;
  wallet: Wallet;
  startDate: string;
  nextDate: string | null;
  lastDate: string | null;
  occurrences: number;
  totalAmountProcessed: number;
}

export interface FiltersState {
  type: string;
  status: string;
  frequency: string;
}