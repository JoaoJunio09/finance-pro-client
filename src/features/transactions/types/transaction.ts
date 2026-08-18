export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'paid' | 'pending';
export type SortOption = 'recent' | 'oldest' | 'highest' | 'lowest';
export type ActiveTab = 'all' | 'income' | 'expense' | 'pending';

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

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  status: TransactionStatus;
  categoryId: string;
  walletId: string;
  isRecurrent?: boolean;
  notes?: string;
}