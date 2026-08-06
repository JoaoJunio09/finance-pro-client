import { Activity, Eye, EyeOff } from 'lucide-react';

import styles from './Greeting.module.css';

interface GreetingProps {
  userName: string;
  showBalance: boolean;
  onToggleBalance: () => void;
}

// --- MOCK: dados de ritmo de gastos (fixos por enquanto) ---
const DAYS_REMAINING_IN_MONTH = 17;
const SAFE_DAILY_LIMIT_LABEL = 'R$ 225,00';

export function Greeting({ userName, showBalance, onToggleBalance }: GreetingProps) {
  return (
    <section className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm ${styles.section}`}>
      {/* Background Decorativo Suave */}
      <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${styles.decorBlobTop}`}></div>
      <div className={`absolute bottom-0 left-20 w-32 h-32 rounded-full blur-3xl pointer-events-none ${styles.decorBlobBottom}`}></div>

      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-[10px] uppercase tracking-widest backdrop-blur-md px-2.5 py-1 rounded-full border ${styles.eyebrow}`}>
            Seu resumo de hoje
          </span>
        </div>
        <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mt-1 ${styles.title}`}>
          Bom dia, {userName} 👋
        </h1>
        <p className={`text-sm font-medium max-w-md leading-relaxed ${styles.subtitle}`}>
          Aqui está o panorama da sua vida financeira para você acompanhar tudo de forma rápida.
        </p>
      </div>

      {/* Sub-header Contextual */}
      <div className={`relative z-10 flex items-center justify-between sm:justify-end gap-4 sm:gap-6 self-stretch sm:self-center shrink-0 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 ${styles.subHeaderBorder}`}>
        <div className="flex flex-col sm:items-end">
          <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 hidden sm:block ${styles.pacingLabel}`}>
            Ritmo de Gastos
          </span>
          <span className={`text-sm font-semibold flex items-center gap-1.5 ${styles.pacingValue}`}>
            <Activity size={15} className={styles.pacingIcon} /> {DAYS_REMAINING_IN_MONTH} dias restantes no mês
          </span>
          <span className={`text-[11px] font-medium mt-0.5 ${styles.pacingMuted}`}>
            Limite diário seguro: <span className={styles.pacingMutedStrong}>{showBalance ? SAFE_DAILY_LIMIT_LABEL : '••••'}</span>
          </span>
        </div>
        <button
          onClick={onToggleBalance}
          className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border transition-all shadow-sm group shrink-0 ${styles.toggleBtn}`}
          title={showBalance ? 'Ocultar valores' : 'Mostrar valores'}
          type="button"
        >
          {showBalance ? (
            <EyeOff size={20} className="group-hover:scale-110 transition-transform" />
          ) : (
            <Eye size={20} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </section>
  );
}

export default Greeting;