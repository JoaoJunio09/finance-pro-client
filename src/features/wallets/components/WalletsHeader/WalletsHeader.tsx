import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Landmark, CreditCard, ShieldCheck, TrendingUp, Banknote, Plus } from 'lucide-react';

import styles from './WalletsHeader.module.css';
import type { WalletFilter } from '../../types/wallet';

interface Props {
  currentFilter: WalletFilter;
  setFilter: (filter: WalletFilter) => void;
  onAddWallet: () => void;
}

export const WalletsHeader: React.FC<Props> = ({ currentFilter, setFilter, onAddWallet }) => {
  const filters: { id: WalletFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'Todas', icon: Wallet },
    { id: 'accounts', label: 'Contas', icon: Landmark },
    { id: 'credit_cards', label: 'Cartões', icon: CreditCard },
    { id: 'reserves', label: 'Reservas', icon: ShieldCheck },
    { id: 'investments', label: 'Investimentos', icon: TrendingUp },
    { id: 'physical', label: 'Dinheiro Físico', icon: Banknote },
  ];

  const [tabRects, setTabRects] = useState<{ [key: string]: { left: number; width: number } }>({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updateRects = () => {
      const newRects: { [key: string]: { left: number; width: number } } = {};
      filters.forEach((sub) => {
        const el = tabsRef.current[sub.id];
        if (el) newRects[sub.id] = { left: el.offsetLeft, width: el.offsetWidth };
      });
      setTabRects(newRects);
    };
    updateRects();
    window.addEventListener('resize', updateRects);
    const timeout = setTimeout(updateRects, 150);
    return () => { window.removeEventListener('resize', updateRects); clearTimeout(timeout); };
  }, [currentFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`w-full relative shadow-md overflow-hidden ${styles.headerContainer}`}>
      <div className={`absolute inset-0 opacity-20 pointer-events-none ${styles.patternOverlay}`}></div>
      
      <div className="w-full relative z-20 pt-8 lg:pt-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
            <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
              <span className="text-xs font-semibold text-white/90 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border border-white/20 shadow-sm">
                <Wallet size={14} className="text-white" />
                Gerenciamento
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight">
                  Suas Carteiras
                </h1>
              </div>
              <p className="text-sm text-white/80 max-w-md font-medium leading-relaxed mt-1">
                Organize suas contas, reservas, cartões de crédito e investimentos em um só lugar.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mt-2 sm:mt-0 pb-1">
              <button 
                onClick={onAddWallet}
                className="flex px-5 py-2.5 h-11 rounded-xl bg-white text-[#4C1D95] text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-[1.02] active:scale-95 items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Adicionar carteira</span>
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mt-2">
            <div className="flex items-end gap-1 sm:gap-2 min-w-max relative pb-0 border-b border-white/20">
              {tabRects[currentFilter] && (
                <div
                  className={`absolute border border-white/20 transition-all duration-300 ease-out z-0 rounded-t-xl ${styles.activeTabIndicator}`}
                  style={{ left: tabRects[currentFilter].left, width: tabRects[currentFilter].width, top: 0, bottom: '-1px' }}
                />
              )}
              {filters.map((sub) => {
                const Icon = sub.icon;
                const isActive = currentFilter === sub.id;
                return (
                  <button
                    key={sub.id}
                    ref={(el) => { tabsRef.current[sub.id] = el; }}
                    onClick={() => setFilter(sub.id)}
                    className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold transition-colors duration-200 relative focus:outline-none select-none z-10 ${isActive ? 'text-[var(--text-main)]' : 'text-white/80 hover:text-white'}`}
                  >
                    <Icon size={16} className={`transition-colors duration-200 ${isActive ? 'text-[var(--accent)]' : 'text-white/80'}`} />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};