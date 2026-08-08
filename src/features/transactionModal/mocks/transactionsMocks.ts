import { Activity, Car, Coffee, Home, ShoppingCart, Wallet } from 'lucide-react';
import type { TxCategory } from '../types/TxCategory';
import type { TxWallet } from '../types/TxWallet';

export const TX_CATEGORIES: TxCategory[] = [
  { id: 'c1', name: 'Alimentação', icon: ShoppingCart, color: '#A78BFA' },
  { id: 'c2', name: 'Moradia', icon: Home, color: '#8B5CF6' },
  { id: 'c3', name: 'Transporte', icon: Car, color: '#C4B5FD' },
  { id: 'c4', name: 'Lazer', icon: Coffee, color: '#DDD6FE' },
  { id: 'c5', name: 'Assinaturas', icon: Activity, color: '#EDE9FE' },
  { id: 'c6', name: 'Salário', icon: Wallet, color: 'var(--income)' },
];

export const TX_WALLETS: TxWallet[] = [
  { id: 'w1', name: 'Nubank', icon: 'nubank', color: '#8A05BE' },
  { id: 'w2', name: 'Itaú', icon: 'itau', color: '#EC7000' },
  { id: 'w3', name: 'Carteira Física', icon: 'wallet', color: 'var(--text-muted)' },
];