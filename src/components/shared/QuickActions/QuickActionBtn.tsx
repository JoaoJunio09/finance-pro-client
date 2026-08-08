import type { ElementType } from 'react';

import styles from './QuickActionBtn.module.css';

interface QuickActionBtnProps {
  icon: ElementType;
  label: string;
  colorVar?: string; // token do tema, ex: '--income'
  colorHex?: string; // cor fixa sem token de tema correspondente
  delay: string;
  closeDelay: string;
  isOpen: boolean;
  openPos: string;
  closedPos?: string;
  onClick: () => void
}

export function QuickActionBtn({
  icon: Icon,
  label,
  colorVar,
  colorHex,
  delay,
  closeDelay,
  isOpen,
  openPos,
  closedPos = 'bottom-[45px] left-[50%] -translate-x-1/2',
  onClick
}: QuickActionBtnProps) {
  const posClass = isOpen ? openPos : closedPos;
  const background = colorHex ?? (colorVar ? `var(${colorVar})` : undefined);

  return (
    <div
      className={`absolute ${posClass} flex flex-col items-center gap-1.5 transition-all transform ${
        isOpen
          ? 'duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-100 scale-100 pointer-events-auto'
          : 'duration-300 ease-in-out opacity-0 scale-50 pointer-events-none'
      }`}
      style={{ transitionDelay: isOpen ? delay : closeDelay }}
    >
      <button
        onClick={onClick}
        className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        style={{ backgroundColor: background }}
        type="button"
        aria-label={label}
      >
        <Icon size={20} />
      </button>
      <span
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm transition-opacity duration-300 ${styles.labelChip} ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default QuickActionBtn;