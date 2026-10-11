import {
  Banknote,
  CreditCard,
  Landmark,
  Plus,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { WalletFilter } from '../../types/wallet';
import styles from './WalletsHeader.module.css';

interface WalletsHeaderProps {
  currentFilter: WalletFilter;
  setFilter: (filter: WalletFilter) => void;
  onAddWallet: () => void;
}

const filters: { id: WalletFilter; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Todas', icon: Wallet },
  { id: 'accounts', label: 'Contas e poupança', icon: Landmark },
  { id: 'credit_cards', label: 'Cartões de crédito', icon: CreditCard },
  { id: 'reserves', label: 'Reservas', icon: ShieldCheck },
  { id: 'investments', label: 'Investimentos', icon: TrendingUp },
  { id: 'physical', label: 'Dinheiro físico', icon: Banknote },
];

function WalletsHeader({ currentFilter, setFilter, onAddWallet }: WalletsHeaderProps) {
  const [tabRects, setTabRects] = useState<Record<string, { left: number; width: number }>>({});
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const updateRects = () => {
      const newRects: Record<string, { left: number; width: number }> = {};

      filters.forEach(filter => {
        const element = tabsRef.current[filter.id];
        if (element) {
          newRects[filter.id] = {
            left: element.offsetLeft,
            width: element.offsetWidth,
          };
        }
      });

      setTabRects(newRects);
    };

    updateRects();
    window.addEventListener('resize', updateRects);
    const timeout = window.setTimeout(updateRects, 150);

    return () => {
      window.removeEventListener('resize', updateRects);
      window.clearTimeout(timeout);
    };
  }, [currentFilter]);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerInner}>
        <div className={styles.titleRow}>
          <div className={styles.titleCopy}>
            <h1>Carteiras</h1>
            <p>Contas, cartões e reservas em um só lugar.</p>
          </div>

          <button type="button" onClick={onAddWallet} className={styles.addButton}>
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
            <span>Adicionar carteira</span>
          </button>
        </div>

        <div className={styles.tabsScroll}>
          <div className={styles.tabs}>
            {tabRects[currentFilter] && (
              <div
                className={styles.activeTabIndicator}
                style={{
                  left: tabRects[currentFilter].left,
                  width: tabRects[currentFilter].width,
                }}
              />
            )}

            {filters.map(filter => {
              const Icon = filter.icon;
              const isActive = currentFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  ref={element => { tabsRef.current[filter.id] = element; }}
                  type="button"
                  className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setFilter(filter.id)}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default WalletsHeader;
