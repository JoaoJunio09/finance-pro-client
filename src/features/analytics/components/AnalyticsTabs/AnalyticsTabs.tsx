'use client';

import {
	Activity,
	BarChart3,
	FileText,
	PieChart,
	Repeat,
	ShieldCheck,
	TrendingUp,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import styles from './AnalyticsTabs.module.css';

export type AnalyticsSubpage =
  | 'overview'
  | 'cashflow'
  | 'categories'
  | 'health'
  | 'evolution'
  | 'reports'
  | 'recurrences';

export interface SubpageOption {
  id: AnalyticsSubpage;
  label: string;
  description: string;
  icon: React.ElementType;
}

export const SUBPAGES: SubpageOption[] = [
  { id: 'overview', label: 'Visão Geral', description: 'Acompanhe a inteligência e os indicadores da sua gestão.', icon: BarChart3 },
  { id: 'cashflow', label: 'Fluxo de Caixa', description: 'Análise detalhada de movimentações e liquidez mensal.', icon: Activity },
  { id: 'categories', label: 'Categorias', description: 'Composição de gastos e impactos no seu orçamento.', icon: PieChart },
  { id: 'health', label: 'Saúde Financeira', description: 'Diagnóstico completo sobre seus hábitos financeiros.', icon: ShieldCheck },
  { id: 'evolution', label: 'Evolução', description: 'Acompanhamento do seu patrimônio e performance acumulada.', icon: TrendingUp },
  { id: 'reports', label: 'Relatórios', description: 'Exportação de demonstrativos e extratos contábeis.', icon: FileText },
  { id: 'recurrences', label: 'Recorrências', description: 'Visão consolidada de assinaturas e gastos fixos.', icon: Repeat },
];

interface AnalyticsTabsProps {
  currentSubpage: AnalyticsSubpage;
  onSelect: (sub: AnalyticsSubpage) => void;
}

export function AnalyticsTabs({ currentSubpage, onSelect }: AnalyticsTabsProps) {
  const [tabRects, setTabRects] = useState<Record<string, { left: number; width: number }>>({});
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const updateRects = () => {
      const newRects: Record<string, { left: number; width: number }> = {};
      SUBPAGES.forEach((sub) => {
        const el = tabsRef.current[sub.id];
        if (el) newRects[sub.id] = { left: el.offsetLeft, width: el.offsetWidth };
      });
      setTabRects(newRects);
    };

    updateRects();
    window.addEventListener('resize', updateRects);
    const timeout = setTimeout(updateRects, 150);

    return () => {
      window.removeEventListener('resize', updateRects);
      clearTimeout(timeout);
    };
  }, [currentSubpage]);

  return (
    <div className="relative w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className={`flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b ${styles.tabsBorder}`}>
        {tabRects[currentSubpage] && (
          <div
            className={`absolute transition-all duration-300 ease-out z-0 rounded-t-xl ${styles.activeIndicator}`}
            style={{
              left: tabRects[currentSubpage].left,
              width: tabRects[currentSubpage].width,
              top: 0,
              bottom: '-1px',
            }}
          />
        )}

        {SUBPAGES.map((sub) => {
          const Icon = sub.icon;
          const isActive = currentSubpage === sub.id;

          return (
            <button
              key={sub.id}
              ref={(el) => {
                tabsRef.current[sub.id] = el;
              }}
              onClick={() => onSelect(sub.id)}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-medium transition-colors duration-200 relative focus:outline-none select-none z-10 ${
                isActive ? styles.tabActive : styles.tabInactive
              }`}
              type="button"
            >
              <Icon size={16} className={`transition-colors duration-200 ${isActive ? styles.iconActive : styles.iconInactive}`} />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AnalyticsTabs;