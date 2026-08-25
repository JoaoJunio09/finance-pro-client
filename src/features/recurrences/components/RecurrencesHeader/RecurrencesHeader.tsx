import { Repeat, Plus, Sun, Moon } from 'lucide-react';
import styles from './RecurrencesHeader.module.css';

interface RecurrencesHeaderProps {
  onNew: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (t: 'light' | 'dark') => void;
}

export const RecurrencesHeader = ({ onNew, theme, onThemeChange }: RecurrencesHeaderProps) => (
  <div className={`${styles.headerBg} w-full relative z-20 pt-8 pb-12 shadow-md`}>
    <div className={styles.patternOverlay}></div>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
      <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
        <span className="font-body text-xs font-medium text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 shadow-sm">
          <Repeat size={14} className="text-white" />
          Visão de Compromissos
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight mt-1">
          Recorrências
        </h1>
        <p className="font-body text-sm font-normal text-white/80 max-w-md leading-relaxed mt-1">
          Gerencie suas assinaturas, parcelamentos e compromissos fixos em um só lugar.
        </p>
      </div>

      <button
        onClick={onNew}
        className="font-body flex flex-1 sm:flex-none px-5 py-2.5 h-11 rounded-xl bg-white text-[#4C1D95] text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-95 items-center gap-2 justify-center cursor-pointer"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span className="whitespace-nowrap">Nova Recorrência</span>
        </button>
    </div>
  </div>
);