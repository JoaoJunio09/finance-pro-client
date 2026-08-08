import { Briefcase } from 'lucide-react';
import type { TxWallet } from '../../types/TxWallet';

import styles from './TxWalletBrandMark.module.css';

type BrandMarkSize = 'sm' | 'md';

interface TxWalletBrandMarkProps {
  wallet: TxWallet;
  size?: BrandMarkSize;
}

const sizeTextClass: Record<BrandMarkSize, { nubank: string; itau: string }> = {
  sm: { nubank: 'text-[11px]', itau: 'text-[10px]' },
  md: { nubank: 'text-base', itau: 'text-lg' },
};

export function TxWalletBrandMark({ wallet, size = 'md' }: TxWalletBrandMarkProps) {
  const textSizes = sizeTextClass[size];

  if (wallet.icon === 'nubank') {
    return (
      <span className={`font-bold tracking-tight ${textSizes.nubank}`} style={{ color: wallet.color }}>
        nubank
      </span>
    );
  }

  if (wallet.icon === 'itau') {
    return <span className={`font-bold tracking-tighter px-1 rounded-sm ${textSizes.itau} ${styles.itauBrand}`}>Itaú</span>;
  }

  if (size === 'sm') {
    return <span className={styles.walletNameDefault}>{wallet.name}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Briefcase size={18} className={styles.walletIconMuted} />
      <span className={`font-medium text-sm ${styles.walletNameDefault}`}>{wallet.name}</span>
    </div>
  );
}

export default TxWalletBrandMark;