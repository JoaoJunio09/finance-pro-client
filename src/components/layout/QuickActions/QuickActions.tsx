import type { TransactionType } from '../../../types/TransactionType';
import QuickActionsDesktop from './Desktop/QuickActionsDesktop';
import QuickActionsMobile from './Mobile/QuickActionsMobile';

interface QuickActionsProps {
  isOpen: boolean;
  onToggle: () => void;
  handleOpenTxModal: () => void;
  selectTxType: (type: TransactionType) => void;
}

function QuickActions({
  isOpen,
  onToggle,
  handleOpenTxModal,
  selectTxType
}: QuickActionsProps) { 
  return (
    <>
      <QuickActionsDesktop
        isOpen={isOpen}
        onToggle={onToggle}
        handleOpenTxModal={handleOpenTxModal}
        selectTxType={selectTxType}
      />

      <QuickActionsMobile
        isOpen={isOpen}
        onToggle={onToggle}
        handleOpenTxModal={handleOpenTxModal}
        selectTxType={selectTxType}
      />
    </>
  );
}

export default QuickActions;