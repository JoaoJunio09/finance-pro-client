import type { ElementType } from 'react';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';

import styles from './RecentTransactions.module.css';

export type TransactionMovementType = 'income' | 'expense';

export interface RecentTransactionItem {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  type: TransactionMovementType;
  icon: ElementType;
}

interface RecentTransactionsProps {
  transactions: RecentTransactionItem[];
  showBalance: boolean;
  onViewAll: () => void;
  onTransactionClick: (transactionId: string) => void;
}

export function RecentTransactions({
  transactions,
  showBalance,
  onViewAll,
  onTransactionClick,
}: RecentTransactionsProps) {
  return (
    <div className={`interactive-card rounded-[2rem] p-6 sm:p-8 flex flex-col gap-4 shadow-sm border lg:col-span-2 ${styles.card}`}>
      <div className="flex justify-between items-center mb-1">
        <h3 className={`text-base font-semibold ${styles.title}`}>Últimas Movimentações</h3>
        <button onClick={onViewAll} className={`text-xs font-medium transition-colors ${styles.actionLink}`} type="button">
          Ver extrato completo
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';
          return (
            <div
              key={tx.id}
              className={`flex items-center justify-between p-3 sm:px-4 rounded-2xl border border-transparent transition-all cursor-pointer ${styles.row}`}
              onClick={() => onTransactionClick(tx.id)}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isIncome ? styles.iconIncome : styles.iconExpense}`}>
                  <tx.icon size={18} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-sm font-medium leading-none ${styles.description}`}>{tx.description}</span>
                  <span className={`text-[11px] font-normal ${styles.meta}`}>{tx.category} • {tx.date}</span>
                </div>
              </div>
              <span className={`text-sm font-bold ${isIncome ? styles.amountIncome : styles.amountDefault}`}>
                {showBalance ? `${isIncome ? '+' : '-'}${formatCurrencyLabel(tx.amount)}` : '••••'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentTransactions;