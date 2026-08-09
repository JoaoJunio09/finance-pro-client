import type { WalletResponse } from '../../../../../models/wallet/WalletResponse';
import { formatCurrencyLabel } from '../../../../../utils/FormatCurrency';
import WalletBrandMark, { type WalletIconType } from '../WalletBrand/WalletBrand';

import styles from './../Wallets.module.css';

export interface Wallet {
  id: string;
  name: string;
  type: string;
  balance: number;
  gradient: string;
  icon: WalletIconType;
  textDark?: boolean;
}

interface WalletCardProps {
  wallet: WalletResponse;
  showBalance: boolean;
}

export function WalletCard({ wallet, showBalance }: WalletCardProps) {
  // const isTextDark = Boolean(wallet.textDark);
  const isTextDark = false;

  return (
    <div
      className={`relative p-6 rounded-[1.25rem] aspect-[1.58/1] shadow-md overflow-hidden flex flex-col justify-between interactive-card border ${
        isTextDark ? styles.cardSurfaceVariant : styles.cardBrandVariant
      }`}
      style={{
        background: wallet.bank.gradient
      }}
    >
      {/* Brilho decorativo suave para imitar o material de um cartão */}
      <div className={`absolute inset-0 pointer-events-none ${styles.sheen}`}></div>

      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-2">
          <WalletBrandMark icon={wallet.bank ? wallet.bank.name : 'Manual'} />
        </div>

        {/* Imitação visual de um "Chip" bancário */}
        <div className={`w-8 h-6 rounded flex items-center justify-center border ${isTextDark ? styles.chipSurfaceVariant : styles.chipBrandVariant}`}>
          <div className={`w-5 h-3 rounded-sm border ${isTextDark ? styles.chipInnerSurfaceVariant : styles.chipInnerBrandVariant}`}></div>
        </div>
      </div>

      <div className="relative z-10">
        <p className={`text-[10px] uppercase tracking-widest font-medium mb-1 ${isTextDark ? styles.labelSurfaceVariant : styles.labelBrandVariant}`}>
          {wallet.name}
        </p>
        <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
          {showBalance ? formatCurrencyLabel(wallet.balance) : 'R$ •••••'}
        </p>
      </div>
    </div>
  );
}

export default WalletCard;