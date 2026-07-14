import { createPortal } from 'react-dom';
import { useEffect, type ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

function Overlay({ children, onClose, className }: OverlayProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <div className={className}>{children}</div>,
    document.body
  );
}

export default Overlay;