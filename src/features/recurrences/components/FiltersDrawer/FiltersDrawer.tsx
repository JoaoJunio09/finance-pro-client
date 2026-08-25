import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Filter, X, ArrowUpDown, CheckCircle2, Repeat, Check } from 'lucide-react';
import type { FiltersState } from '../../types/recurrence';
import styles from './FiltersDrawer.module.css';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

export const FiltersDrawer = ({ isOpen, onClose, filters, setFilters }: FiltersDrawerProps) => {
  const [localFilters, setLocalFilters] = useState<FiltersState>(filters);
  const [isVisible, setIsVisible] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setRenderDrawer(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setRenderDrawer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, filters]);

  if (!renderDrawer) return null;

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const cleared = { type: 'ALL', status: 'ALL', frequency: 'ALL' };
    setLocalFilters(cleared);
    setFilters(cleared);
    onClose();
  };

  const content = (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className={`fixed inset-0 drawer-overlay transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`relative w-full lg:h-full h-[92vh] overflow-auto sm:max-w-[450px] shadow-2xl flex flex-col z-10 transition-transform duration-300 sm:border-l border-t sm:border-t-0 rounded-t-3xl sm:rounded-none ${styles.surface} ${styles.borderDefault} ${
        isVisible ? 'translate-y-0 translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 md:p-6 pb-2 shrink-0">
          <h3 className={`font-display font-bold text-lg flex items-center gap-2 ${styles.textMain}`}>
            <Filter size={20} className={styles.textAccent} />
            <span>Filtros Avançados</span>
          </h3>
          <button onClick={onClose} className={`p-2 rounded-xl ${styles.textMuted} hover:text-main hover:bg-elevated transition-colors cursor-pointer`}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <label className={`font-body text-xs font-medium flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <ArrowUpDown size={14} /> Tipo de Recorrência
            </label>
            <select
              value={localFilters.type}
              onChange={(e) => setLocalFilters({ ...localFilters, type: e.target.value })}
              className={`font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.elevated} ${styles.borderLight} ${styles.textMain} focus:border-accent hover:border-hover transition-colors`}
            >
              <option value="ALL">Todas as Recorrências</option>
              <option value="INCOME">Entradas (Receitas)</option>
              <option value="EXPENSE">Saídas (Despesas)</option>
            </select>
          </div>

          <div>
            <label className={`font-body text-xs font-medium flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <CheckCircle2 size={14} /> Status
            </label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className={`font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.elevated} ${styles.borderLight} ${styles.textMain} focus:border-accent hover:border-hover transition-colors`}
            >
              <option value="ALL">Todos os Status</option>
              <option value="ACTIVE">Ativa</option>
              <option value="PAUSED">Pausada</option>
              <option value="ENDED">Encerrada</option>
            </select>
          </div>

          <div>
            <label className={`font-body text-xs font-medium flex items-center gap-2 mb-2.5 ${styles.textMuted}`}>
              <Repeat size={14} /> Frequência
            </label>
            <select
              value={localFilters.frequency}
              onChange={(e) => setLocalFilters({ ...localFilters, frequency: e.target.value })}
              className={`font-body w-full px-4 py-3 border rounded-xl text-sm font-medium focus:outline-none cursor-pointer ${styles.elevated} ${styles.borderLight} ${styles.textMain} focus:border-accent hover:border-hover transition-colors`}
            >
              <option value="ALL">Todas as Frequências</option>
              <option value="DAILY">Diário</option>
              <option value="WEEKLY">Semanal</option>
              <option value="MONTHLY">Mensal</option>
              <option value="YEARLY">Anual</option>
            </select>
          </div>
        </div>

        <div className={`p-6 border-t ${styles.borderLight} flex flex-col sm:flex-row items-center gap-3 shrink-0 ${styles.surface}`}>
          <button onClick={handleClear} className={`font-body cursor-pointer w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border ${styles.borderDefault} ${styles.textMain} font-semibold text-sm hover:bg-elevated transition-colors`}>
            Limpar
          </button>
          <button onClick={handleApply} className="font-body cursor-pointer w-full sm:w-auto flex-1 py-3 px-4 rounded-xl text-sm font-semibold shadow-sm flex items-center justify-center gap-2 bg-[#5B21B6] text-white hover:opacity-90 transition-colors">
            <Check size={18} />
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};