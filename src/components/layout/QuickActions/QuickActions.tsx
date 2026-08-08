import QuickActionsDesktop from './Desktop/QuickActionsDesktop';
import QuickActionsMobile from './Mobile/QuickActionsMobile';

interface QuickActionsProps {
  isOpen: boolean;
  onToggle: () => void;
}

function QuickActions({ isOpen, onToggle }: QuickActionsProps) {
  return (
    <>
      <QuickActionsDesktop isOpen={isOpen} onToggle={onToggle} />
      <QuickActionsMobile isOpen={isOpen} onToggle={onToggle} />
    </>
  );
}

export default QuickActions;