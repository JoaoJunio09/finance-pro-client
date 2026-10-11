import { Landmark, ShieldCheck, TrendingUp, type LucideIcon } from 'lucide-react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import styles from './FinancialSummary.module.css';

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(value);

interface SummaryItemProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function SummaryItem({ label, value, icon: Icon }: SummaryItemProps) {
  return (
    <div className={styles.summaryItem}>
      <Icon size={16} aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong>{formatCurrency(value)}</strong>
      </div>
    </div>
  );
}

export function FinancialSummary({ wallets }: { wallets: WalletResponse[] }) {
  const total = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const accounts = wallets
    .filter(wallet => wallet.type === 'CHECKING' || wallet.type === 'SAVING')
    .reduce((sum, wallet) => sum + wallet.balance, 0);
  const investments = wallets
    .filter(wallet => wallet.type === 'INVESTMENTS')
    .reduce((sum, wallet) => sum + wallet.balance, 0);
  const reserves = wallets
    .filter(wallet => wallet.type === 'RESERVE')
    .reduce((sum, wallet) => sum + wallet.balance, 0);

  return (
    <section className={styles.summary} aria-label="Resumo das carteiras">
      <div className={styles.total}>
        <span>Saldo total</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
      <div className={styles.breakdown}>
        <SummaryItem label="Contas" value={accounts} icon={Landmark} />
        <SummaryItem label="Investimentos" value={investments} icon={TrendingUp} />
        <SummaryItem label="Reservas" value={reserves} icon={ShieldCheck} />
      </div>
    </section>
  );
}
