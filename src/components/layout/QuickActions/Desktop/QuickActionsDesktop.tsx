import { X } from 'lucide-react';
import type { TransactionType } from '../../../../types/TransactionType';
import QuickActionBtn from '../../../shared/QuickActions/QuickActionBtn';
import { ACTIONS_DESKTOP } from '../config/actions';
import { handleOnClickBtnAction } from '../utils/handleActionClick';

import styles from './QuickActionsDesktop.module.css';

const CLOSED_POS = 'bottom-[45px] right-[60px] translate-x-1/2';

interface QuickActionsDesktopProps {
  isOpen: boolean;
  onToggle: () => void;
  handleOpenTxModal: () => void;
  selectTxType: (type: TransactionType) => void;
}

export function QuickActionsDesktop({
  isOpen,
  onToggle,
  handleOpenTxModal,
  selectTxType
}: QuickActionsDesktopProps) {
  return (
    <div className="hidden lg:block">
      <div
        className={`fixed inset-0 transition-all ease-in-out z-[60] ${styles.overlay} ${
          isOpen ? 'duration-300 opacity-95 pointer-events-auto' : 'duration-500 delay-100 opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <div className="fixed inset-0 pointer-events-none z-[65]">
        {ACTIONS_DESKTOP.map((action) => (
          <QuickActionBtn
            key={action.label}
            onClick={() => handleOnClickBtnAction(action, selectTxType, handleOpenTxModal, onToggle)}
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