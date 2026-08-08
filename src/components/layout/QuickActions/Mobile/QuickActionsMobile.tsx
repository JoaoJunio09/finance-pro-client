import type { TransactionType } from '../../../../types/TransactionType';
import QuickActionBtn from '../../../shared/QuickActions/QuickActionBtn';
import { ACTIONS_MOBILE } from '../config/actions';
import { handleOnClickBtnAction } from '../utils/handleActionClick';

import styles from './QuickActionsMobile.module.css';

interface QuickActionsMobileProps {
  isOpen: boolean;
  onToggle: () => void;
  handleOpenTxModal: () => void;
  selectTxType: (type: TransactionType) => void;
}

export function QuickActionsMobile({
  isOpen,
  onToggle,
  handleOpenTxModal,
  selectTxType
}: QuickActionsMobileProps) {
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
          {ACTIONS_MOBILE.map((action) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuickActionsMobile;