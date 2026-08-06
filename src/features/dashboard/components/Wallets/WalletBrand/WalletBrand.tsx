import { Wallet } from 'lucide-react';

import styles from './../Wallets.module.css';

export type WalletIconType = 'nubank' | 'itau' | 'wallet';

interface WalletBrandMarkProps {
  icon: WalletIconType;
}

export function WalletBrandMark({ icon }: WalletBrandMarkProps) {
  if (icon === 'nubank') {
    return <span className="font-bold tracking-tight text-lg">nubank</span>;
  }

  if (icon === 'itau') {
    return <span className={`font-bold tracking-tighter text-xl px-1 rounded-sm ${styles.itauBrand}`}>Itaú</span>;
  }

  return (
    <div className={`flex items-center gap-1.5 ${styles.physicalWalletLabel}`}>
      <Wallet size={18} />
      <span className="font-semibold text-sm">Físico</span>
    </div>
  );
}

export default WalletBrandMark;