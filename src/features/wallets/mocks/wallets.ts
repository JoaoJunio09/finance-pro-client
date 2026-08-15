import type { Wallet } from "../types/wallet";

export const MOCK_WALLETS: Wallet[] = [
  { id: 'w1', name: 'Conta Principal', bank: 'Nubank', type: 'checking', balance: 4850.00, description: 'Conta corrente de uso diário.', colorScheme: 'purple' },
  { id: 'w2', name: 'Reserva de Emergência', bank: 'Itaú', type: 'reserve', balance: 12500.00, description: 'Reserva para imprevistos (6 meses).', colorScheme: 'orange' },
  { id: 'w3', name: 'Carteira de Ações', bank: 'XP Investimentos', type: 'investment', balance: 28750.00, colorScheme: 'blue' },
  { id: 'w4', name: 'Dinheiro na Carteira', bank: 'Físico', type: 'physical', balance: 350.00, colorScheme: 'green' },
  { id: 'w5', name: 'Poupança Conjunta', bank: 'Caixa Econômica', type: 'savings', balance: 5200.00, colorScheme: 'neutral' }
];

export const AVAILABLE_BANKS = [
  'Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 
  'Caixa Econômica', 'XP Investimentos', 'Inter', 'BTG Pactual', 'C6 Bank', 'Físico', 'Outro'
];