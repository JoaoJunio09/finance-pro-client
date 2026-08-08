// QuickActionsDesktop.tsx — remove o useState interno, vira 100% controlado
import { Activity, Repeat, TrendingDown, TrendingUp, Wallet, X } from 'lucide-react';

import QuickActionBtn from '../../../shared/QuickActions/QuickActionBtn';
import styles from './QuickActionsDesktop.module.css';

const CLOSED_POS = 'bottom-[45px] right-[60px] translate-x-1/2';

const ACTIONS = [
  { icon: TrendingUp, label: 'Receita', colorVar: '--income', delay: '150ms', closeDelay: '0ms', openPos: 'bottom-[435px] right-[60px] translate-x-1/2' },
  { icon: TrendingDown, label: 'Despesa', colorVar: '--expense', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[355px] right-[60px] translate-x-1/2' },
  { icon: Repeat, label: 'Transferência', colorHex: '#3B82F6', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[275px] right-[60px] translate-x-1/2' },
  { icon: Activity, label: 'Recorrências', colorHex: '#A855F7', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[195px] right-[60px] translate-x-1/2' },
  { icon: Wallet, label: 'Carteiras', colorHex: '#F97316', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[115px] right-[60px] translate-x-1/2' },
];

interface QuickActionsDesktopProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function QuickActionsDesktop({ isOpen, onToggle }: QuickActionsDesktopProps) {
  return (
    <div className="hidden lg:block">
      <div
        className={`fixed inset-0 transition-all ease-in-out z-[60] ${styles.overlay} ${
          isOpen ? 'duration-300 opacity-95 pointer-events-auto' : 'duration-500 delay-100 opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <div className="fixed inset-0 pointer-events-none z-[65]">
        {ACTIONS.map((action) => (
          <QuickActionBtn
            key={action.label}
            icon={action.icon}
            label={action.label}
            colorVar={action.colorVar}
            colorHex={action.colorHex}
            delay={action.delay}
            closeDelay={action.closeDelay}
            isOpen={isOpen}
            openPos={action.openPos}
            closedPos={CLOSED_POS}
          />
        ))}
      </div>

      <div className="fixed bottom-8 right-8 z-[70]">
        <button
          onClick={onToggle}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 pointer-events-auto ${
            isOpen ? styles.fabOpen : styles.fabClosed
          }`}
          type="button"
          aria-label={isOpen ? 'Fechar ações rápidas' : 'Abrir ações rápidas'}
        >
          <X size={28} className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-45'}`} />
        </button>
      </div>
    </div>
  );
}

export default QuickActionsDesktop;