import { Activity, Repeat, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import QuickActionBtn from '../../../shared/QuickActions/QuickActionBtn';

import styles from './QuickActionsMobile.module.css';

const ACTIONS = [
  { icon: TrendingUp, label: 'Receita', colorVar: '--income', delay: '150ms', closeDelay: '0ms', openPos: 'bottom-[270px] left-[50%] -translate-x-1/2' },
  { icon: TrendingDown, label: 'Despesa', colorVar: '--expense', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[200px] left-[22%] -translate-x-1/2' },
  { icon: Repeat, label: 'Transferência', colorHex: '#3B82F6', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[200px] left-[78%] -translate-x-1/2' },
  { icon: Activity, label: 'Recorrências', colorHex: '#A855F7', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[130px] left-[15%] -translate-x-1/2' },
  { icon: Wallet, label: 'Carteiras', colorHex: '#F97316', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[130px] left-[85%] -translate-x-1/2' },
];

interface QuickActionsMobileProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function QuickActionsMobile({ isOpen, onToggle }: QuickActionsMobileProps) {
  return (
    <div className="lg:hidden">
      <div
        className={`fixed inset-0 transition-all ease-in-out z-[60] ${styles.overlay} ${
          isOpen ? 'duration-300 opacity-95 pointer-events-auto' : 'duration-500 delay-100 opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <div className="fixed inset-0 pointer-events-none z-[65]">
        <div className="absolute w-full h-full max-w-md mx-auto left-0 right-0">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActionsMobile;