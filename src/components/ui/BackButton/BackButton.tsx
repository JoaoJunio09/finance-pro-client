import { ArrowLeft } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

import styles from './BackButton.module.css';

interface BackButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
}

export function BackButton({ label, className, type = 'button', ...props }: BackButtonProps) {
  return (
    <button
      {...props}
      className={[styles.button, className].filter(Boolean).join(' ')}
      type={type}
    >
      <ArrowLeft aria-hidden="true" size={17} />
      <span>{label}</span>
    </button>
  );
}
