import { Wallet } from 'lucide-react';

import styles from './MobileFlushHero.module.css';

interface MobileFlushHeroProps {
  availableToSpend: number;
  futureCommitments: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function MobileFlushHero({ availableToSpend, futureCommitments }: MobileFlushHeroProps) {
  return (
    <div className={`block lg:hidden w-full rounded-t-none rounded-b-[2rem] p-6 pt-8 pb-8 shadow-md relative overflow-hidden z-20 ${styles.hero}`}>
      <div className={`absolute inset-0 opacity-20 ${styles.patternOverlay}`}></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-3 backdrop-blur-sm border ${styles.badge}`}>
          <Wallet size={14} className="text-white" />
          <span>Disponível para gastar</span>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-white tabular-nums my-1 drop-shadow-sm">
          {formatCurrency(availableToSpend)}
        </h1>

        <p className={`text-xs max-w-xs mt-2 font-medium leading-relaxed ${styles.caption}`}>
          Após considerar <span className="text-white font-semibold">{formatCurrency(futureCommitments)}</span> em
          compromissos projetados.
        </p>
      </div>
    </div>
  );
}

export default MobileFlushHero;