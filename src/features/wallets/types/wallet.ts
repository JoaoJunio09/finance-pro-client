export type WalletType = 'checking' | 'savings' | 'credit_card' | 'reserve' | 'investment' | 'physical' | 'other';
export type WalletFilter = 'all' | 'accounts' | 'credit_cards' | 'reserves' | 'investments' | 'physical';

export interface Wallet {
  id: string;
  name: string;
  bank: string;
  type: WalletType;
  balance: number;
  description?: string;
  colorScheme: 'purple' | 'blue' | 'green' | 'orange' | 'neutral';
}