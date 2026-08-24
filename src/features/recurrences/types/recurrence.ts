import React from 'react';

export type RecurrenceType = 'income' | 'expense';
export type RecurrenceStatus = 'active' | 'paused' | 'finished';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
export type SortOption = 'nextDate' | 'highest' | 'lowest' | 'recent' | 'oldest';
export type ActiveTab = 'all' | 'income' | 'expense' | 'active';

export interface CategoryConfig { 
  id: string; 
  name: string; 
  icon: React.ElementType; 
  color: string; 
  bgColor: string; 
}

export interface WalletConfig { 
  id: string; 
  name: string; 
  bankName: string; 
  bankLogoColor: string; 
}

export interface Occurrence { 
  id: string; 
  date: string; 
  amount: number; 
  status: 'paid' | 'pending'; 
}

export interface Recurrence {
  id: string; 
  description: string; 
  amount: number; 
  type: RecurrenceType; 
  status: RecurrenceStatus;
  frequency: RecurrenceFrequency; 
  categoryId: string; 
  walletId: string; 
  startDate: string;
  nextDate: string | null; 
  endDate?: string | null; 
  notes?: string; 
  history: Occurrence[]; 
  future: Occurrence[];
}