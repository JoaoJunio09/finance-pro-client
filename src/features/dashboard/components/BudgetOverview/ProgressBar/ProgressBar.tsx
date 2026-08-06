import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  colorVar: string; // nome da CSS variable, ex: '--income'
}

export function ProgressBar({ percentage, colorVar }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`h-2 w-full rounded-full overflow-hidden ${styles.track}`}>
      <div
        className={styles.fill}
        style={{ width: `${clamped}%`, backgroundColor: `var(${colorVar})` }}
      />
    </div>
  );
}

export default ProgressBar;