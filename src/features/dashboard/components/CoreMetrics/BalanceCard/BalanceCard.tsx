import { ShieldCheck, Wallet } from 'lucide-react';
import { formatCurrencyLabel } from '../../../../../utils/FormatCurrency';
import styles from './BalanceCard.module.css';

interface BalanceCardProps {
  totalBalance: number;
  showBalance: boolean;
}

export function BalanceCard({ totalBalance, showBalance }: BalanceCardProps) {
  return (
    <div className={`w-full rounded-3xl p-6 sm:p-10 flex flex-col justify-center shadow-md relative overflow-hidden text-white interactive-card ${styles.card}`}>
      <div className={`absolute inset-0 opacity-20 ${styles.patternOverlay}`}></div>

      <div className="relative z-10 flex flex-col gap-2">
        <span className={`text-sm font-medium flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border ${styles.badge}`}>
          <Wallet size={16} className="text-white" />
          Saldo Atual Total
        </span>
        <div className="flex items-baseline gap-3 mt-2">
          <span className="text-5xl sm:text-6xl font-black tracking-tight text-white tabular-nums drop-shadow-sm">
            {showBalance ? formatCurrencyLabel(totalBalance) : 'R$ •••••'}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className={`flex items-center gap-2 text-xs font-medium ${styles.statusRow}`}>
          <ShieldCheck size={16} className={styles.statusIcon} /> Tudo certo e atualizado com suas contas
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;