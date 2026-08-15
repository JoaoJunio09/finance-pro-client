import { Landmark, ShieldCheck, TrendingUp, Wallet as WalletIcon } from 'lucide-react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';

import styles from './FinancialSummary.module.css';

const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export const FinancialSummary = ({ wallets }: { wallets: WalletResponse[] }) => {
  const total = wallets.reduce((acc, w) => acc + w.balance, 0);
  const accounts = wallets.filter(w => w.type === 'CHECKING' || w.type === 'SAVING').reduce((acc, w) => acc + w.balance, 0);
  const investments = wallets.filter(w => w.type === 'INVESTMENTS').reduce((acc, w) => acc + w.balance, 0);
  const reserves = wallets.filter(w => w.type === 'RESERVE').reduce((acc, w) => acc + w.balance, 0);

  const SummaryItem = ({ label, value, icon: Icon, isPrimary }: any) => (
    <div className={`flex items-center gap-4 border p-4 rounded-2xl shadow-sm transition-colors ${styles.summaryCard}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPrimary ? styles.iconWrapperPrimary : styles.iconWrapper}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-medium text-[var(--text-muted)] mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[var(--text-main)]">{formatCurrency(value)}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      <SummaryItem label="Saldo Total" value={total} icon={WalletIcon} isPrimary />
      <SummaryItem label="Contas" value={accounts} icon={Landmark} />
      <SummaryItem label="Investimentos" value={investments} icon={TrendingUp} />
      <SummaryItem label="Reservas" value={reserves} icon={ShieldCheck} />
    </div>
  );
};