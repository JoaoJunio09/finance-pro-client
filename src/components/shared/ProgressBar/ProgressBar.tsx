import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  colorVar?: string;  // token do tema, ex: '--income'
  colorHex?: string;  // cor arbitrária vinda de dado, ex: '#8B5CF6'
}

export function ProgressBar({ percentage, colorVar, colorHex }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const color = colorHex ?? (colorVar ? `var(${colorVar})` : undefined);

  return (
    <div className={`h-2 w-full rounded-full overflow-hidden ${styles.track}`}>
      <div className={styles.fill} style={{ width: `${clamped}%`, backgroundColor: color }} />
    </div>
  );
}