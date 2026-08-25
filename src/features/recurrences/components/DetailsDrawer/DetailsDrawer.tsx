import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Hash,
  Zap,
  UserCheck,
  Calendar,
  Clock,
  Wallet,
  CheckCircle2,
  Trash2,
  Pause,
  Play,
  Edit2,
} from 'lucide-react';
import type { Recurrence } from '../../types/recurrence';
import { formatCurrency, formatDate, translateStatus } from '../../utils/recurrenceUtils';
import styles from './DetailsDrawer.module.css';

interface DetailsDrawerProps {
  item: Recurrence | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (item: Recurrence) => void;
}

export const DetailsDrawer = ({ item, isOpen, onClose, onDelete, onToggleStatus, onEdit }: DetailsDrawerProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [visibleItem, setVisibleItem] = useState<Recurrence | null>(item);

  useEffect(() => {
    if (isOpen && item) {
      setShouldRender(true);
      setVisibleItem(item);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, item]);

  if (!shouldRender || !visibleItem) return null;

  const Icon = visibleItem.category.icon;
  const isIncome = visibleItem.type === 'INCOME';

  const content = (
    <div className={`fixed inset-0 z-50 flex sm:justify-end flex-col sm:flex-row ${animateIn ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`fixed inset-0 drawer-overlay transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`${styles.surface} w-full h-[92vh] lg:h-full sm:max-w-[450px] mt-auto sm:mt-0 shadow-2xl flex flex-col z-10 transition-transform duration-300 sm:border-l border-t sm:border-t-0 rounded-t-3xl sm:rounded-none ${
        animateIn ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
      }`}>

        <div className="flex items-center justify-between p-5 pb-0 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`font-body px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
              visibleItem.status === 'ACTIVE' ? `${styles.badgeIncome} border-transparent` :
              visibleItem.status === 'PAUSED' ? `${styles.badgeWarning} border-transparent` :
              `${styles.elevated} ${styles.textMuted} ${styles.borderLight}`
            }`}>
              {translateStatus(visibleItem.status)}
            </span>
            <span className={`font-mono text-xs font-normal ${styles.textMuted} bg-elevated px-2 py-0.5 rounded border ${styles.borderLight} flex items-center gap-1`}>
              <Hash size={10} />
              {visibleItem.code}
            </span>
          </div>
          <button onClick={onClose} className={`p-2 rounded-xl ${styles.textMuted} hover:bg-elevated hover:text-main transition-colors cursor-pointer`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 pt-3 flex-1 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mb-4 shadow-sm text-white" style={{ backgroundColor: visibleItem.category.color }}>
              <Icon size={32} strokeWidth={2} />
            </div>

            <h3 className={`font-display font-bold text-2xl ${styles.textMain} mb-1.5 px-4`}>{visibleItem.description}</h3>

            <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
              <span className={`font-body text-[12px] font-medium uppercase tracking-wider ${styles.textMuted}`}>{visibleItem.category.name}</span>
              <span className="w-1 h-1 rounded-full bg-border-hover"></span>
              <span className={`font-body flex items-center gap-1 text-[12px] font-medium ${styles.badgeAccent} px-2 py-0.5 rounded-md`}>
                {visibleItem.executionType === 'AUTOMATIC' ? <Zap size={12} /> : <UserCheck size={12} />}
                {visibleItem.executionType === 'AUTOMATIC' ? 'Execução Automática' : 'Execução Manual'}
              </span>
            </div>

            <div className={`flex flex-col items-center justify-center ${styles.elevated} w-full py-6 rounded-2xl border ${styles.borderLight}`}>
              <span className={`font-body text-xs font-medium ${styles.textMuted} uppercase tracking-wider mb-1`}>Valor do Contrato</span>
              <div className={`font-metric text-4xl font-bold tracking-tight ${isIncome ? styles.textIncome : styles.textMain}`}>
                {isIncome ? '+ ' : '- '}{formatCurrency(visibleItem.amount)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <h4 className={`font-heading font-semibold text-sm ${styles.textMain} px-1`}>Detalhes do Contrato</h4>
            <div className={`border ${styles.borderLight} rounded-2xl flex flex-col text-[14px] ${styles.surface} overflow-hidden`}>
              <div className={`flex items-center justify-between p-4 border-b ${styles.borderLight}`}>
                <span className={`font-body flex items-center gap-2.5 font-normal ${styles.textMuted}`}>
                  <Calendar size={18} className={styles.textAccent} /> Próxima Cobrança
                </span>
                <span className={`font-body font-semibold ${styles.textMain}`}>{formatDate(visibleItem.nextDate)}</span>
              </div>

              <div className={`flex items-center justify-between p-4 border-b ${styles.borderLight}`}>
                <span className={`font-body flex items-center gap-2.5 font-normal ${styles.textMuted}`}>
                  <Clock size={18} /> Última Cobrança
                </span>
                <span className={`font-body font-medium ${styles.textMain}`}>{formatDate(visibleItem.lastDate)}</span>
              </div>

              <div className={`flex items-center justify-between p-4 border-b ${styles.borderLight}`}>
                <span className={`font-body flex items-center gap-2.5 font-normal ${styles.textMuted}`}>
                  <Wallet size={18} /> Carteira
                </span>
                <span className={`font-body font-medium ${styles.textMain} flex items-center gap-2`}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: visibleItem.wallet.color }} />
                  {visibleItem.wallet.name}
                </span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span className={`font-body flex items-center gap-2.5 font-normal ${styles.textMuted}`}>
                  <CheckCircle2 size={18} /> Ocorrências
                </span>
                <span className={`font-metric font-medium ${styles.textMain}`}>{visibleItem.occurrences} processadas</span>
              </div>
            </div>
          </div>

          <div className={`border ${styles.borderLight} rounded-2xl p-5 ${styles.surface} flex items-center justify-between gap-4`}>
            <div className="flex flex-col">
              <span className={`font-body text-xs font-medium ${styles.textMuted} uppercase tracking-wide`}>Total Histórico</span>
              <span className={`font-body text-[11px] font-normal ${styles.textMuted} mt-0.5`}>Montante acumulado</span>
            </div>
            <span className={`font-metric text-lg font-bold ${styles.textMain}`}>{formatCurrency(visibleItem.totalAmountProcessed)}</span>
          </div>
        </div>

        <div className={`p-5 border-t ${styles.borderLight} flex flex-col sm:flex-row items-center gap-3 shrink-0 ${styles.surface}`}>
          <button
            onClick={() => onDelete(visibleItem.id)}
            className={`font-body w-full sm:w-auto p-3.5 rounded-xl ${styles.badgeExpense} border border-transparent text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer`}
            title="Excluir"
          >
            <Trash2 size={20} /> <span className="sm:hidden">Excluir</span>
          </button>

          <button
            onClick={() => onToggleStatus(visibleItem.id)}
            className={`font-body w-full sm:w-auto flex-1 py-3.5 px-4 rounded-xl border border-transparent font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-opacity cursor-pointer ${
              visibleItem.status === 'ACTIVE' ? styles.badgeWarning : styles.badgeIncome
            }`}
          >
            {visibleItem.status === 'ACTIVE' ? <><Pause size={18} /> Pausar</> : <><Play size={18} /> Ativar</>}
          </button>

          <button
            onClick={() => onEdit(visibleItem)}
            className={`font-body w-full sm:w-auto flex-[1.5] py-3.5 px-4 rounded-xl ${styles.badgeAccent} border border-transparent font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-80 transition-opacity shadow-sm cursor-pointer`}
          >
            <Edit2 size={18} /> Editar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};