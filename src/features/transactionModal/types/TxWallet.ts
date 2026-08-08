export type TxWalletIcon = 'nubank' | 'itau' | 'wallet';

export interface TxWallet {
  id: string;
  name: string;
  icon: TxWalletIcon;
  color: string;
}