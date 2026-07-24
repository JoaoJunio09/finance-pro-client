import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './MonthSelector.module.css';

interface MonthSelectorProps {
  activeMonth: number;
	activeYear: number;
	goToPreviousMonth: () => void;
	goToNextMonth: () => void;
	MONTHS: string[];
}

function MonthSelector({
  activeMonth,
  activeYear,
  goToPreviousMonth,
  goToNextMonth,
  MONTHS
}: MonthSelectorProps) {
  return (
    <div className={styles.monthSelectorWrapper}>
      <div className={styles.monthSelector}>
        <button
          className={styles.iconBtn}
          onClick={goToPreviousMonth}
          aria-label="Mês Anterior"
          type="button"
        >
          <ChevronLeft size={16} />
        </button>

        <span
          key={`${activeYear}-${activeMonth}`}
          className={`${styles.currentMonth} ${styles.animateMonth}`}
        >
          {MONTHS[activeMonth]}
          <span className={styles.yearSubtle}>{activeYear}</span>
        </span>

        <button
          className={styles.iconBtn}
          onClick={goToNextMonth}
          aria-label="Próximo Mês"
          type="button"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default MonthSelector;