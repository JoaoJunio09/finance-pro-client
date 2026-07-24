import { Activity, TrendingDown, TrendingUp } from 'lucide-react';

import styles from './SummaryCards.module.css';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';

interface SummaryProps {
  currentBalance: number,
  income: number,
  expenses: number
}

function Summary({
  currentBalance,
  income,
  expenses
}: SummaryProps) {
  const isBalancePositive = currentBalance > 0;
  return (
    <section className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 ${styles.section}`}>

      {/* 1. Card: Entradas do Mês */}
      <div className={styles.statCard}>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className={styles.title}>Entradas do Mês</span>
          <div className={`${styles.iconCircle} ${styles.iconIncome}`}>
            <TrendingUp size={16} />
          </div>
        </div>
        <h3 className={styles.value}>
          {formatCurrencyLabel(income)}
        </h3>
      </div>

      {/* 2. Card: Saídas do Mês */}
      <div className={styles.statCard}>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className={styles.title}>Saídas do Mês</span>
          <div className={`${styles.iconCircle} ${styles.iconExpense}`}>
            <TrendingDown size={16} />
          </div>
        </div>
        <h3 className={styles.value}>
          {formatCurrencyLabel(expenses)}
        </h3>
      </div>

      {/* 3. Card: Saldo Líquido */}
      <div className={styles.statCard}>
        {/* Efeito Glow exclusivo do card de saldo */}
        <div className={styles.cardGlowBg}></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className={styles.title}>Saldo Líquido</span>
          <div className={`${styles.iconCircle} ${styles.iconBalance}`}>
            <Activity
              size={16}
              className={isBalancePositive ? styles.iconBalanceSuccess : styles.iconBalanceDanger}
            />
          </div>
        </div>

        <h3
          className={`${styles.value} ${
            isBalancePositive ? styles.valueSuccess : styles.valueDanger
          }`}
        >
          {formatCurrencyLabel(currentBalance)}
        </h3>
      </div>

    </section>
  );
}

export default Summary;