import type { ElementType } from 'react';

export type ActivityType = 'income' | 'expense';
export type ActivityStatus = 'completed' | 'pending';

export interface FinancialActivity {
  id: string;
  title: string;
  amount: number;
  type: ActivityType;
  isRecurrent: boolean;
  category: string;
  wallet: string;
  status: ActivityStatus;
  date: Date;
  icon: ElementType;
}