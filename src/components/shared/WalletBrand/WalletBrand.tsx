import { CircleDollarSign, Wallet } from 'lucide-react';
import type { BankResponse } from '../../../models/bank/BankResponse';
import type { WalletResponse } from '../../../models/wallet/WalletResponse';
import BankBrand, { type BrandSize } from '../BankBrand/BankBrand';
import styles from '../BankBrand/BankBrand.module.css';

interface WalletBrandProps {
  wallet?: Pick<WalletResponse, 'name' | 'bank' | 'type'>;
  bank?: BankResponse;
  size?: BrandSize;
}

export function WalletBrand({ wallet, bank, size = 'md' }: WalletBrandProps) {
  const selectedBank = bank ?? wallet?.bank;
  if (selectedBank) return <BankBrand bank={selectedBank} size={size} />;
  if (!wallet) return null;

  const isPhysical = wallet.type === 'PHYSICAL';
  const Icon = isPhysical ? Wallet : CircleDollarSign;

  return (
    <span className={`inline-flex items-center gap-1.5 ${styles.bankNameDefault}`}>
      <Icon size={size === 'sm' ? 14 : 18} aria-hidden="true" />
      <span className={size === 'sm' ? 'text-[11px] font-medium' : 'text-sm font-semibold'}>
        {isPhysical ? 'Físico' : wallet.name || 'Carteira'}
      </span>
    </span>
  );
}

export default WalletBrand;
