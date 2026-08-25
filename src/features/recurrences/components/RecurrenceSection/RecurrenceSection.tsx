import type { RecurrenceResponse } from '../../../../models/recurrence/RecurrenceResponse';
import { RecurrenceCard } from '../RecurrenceCard/RecurrenceCard';
import styles from './RecurrenceSection.module.css';

type RecurrenceSectionVariant = 'expense' | 'warning' | 'accent';

const variantClassMap: Record<RecurrenceSectionVariant, string> = {
  expense: styles.badgeExpense,
  warning: styles.badgeWarning,
  accent: styles.badgeAccent,
};

interface RecurrenceSectionProps {
  icon: React.ElementType;
  variant: RecurrenceSectionVariant;
  title: string;
  description: string;
  items: RecurrenceResponse[];
  onSelect: (r: RecurrenceResponse) => void;
  onConfirm?: (e: React.MouseEvent, r: RecurrenceResponse) => void;
}

export const RecurrenceSection = ({
  icon: Icon,
  variant,
  title,
  description,
  items,
  onSelect,
  onConfirm,
}: RecurrenceSectionProps) => {
  if (items.length === 0) return null;

  const badgeClass = variantClassMap[variant];

  return (
    <section className="flex flex-col gap-4">
      <div className={`flex items-center justify-between pb-3 border-b ${styles.borderLight}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${badgeClass}`}>
            <Icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-heading font-bold text-lg ${styles.textMain}`}>{title}</h3>
              <span className={`font-metric text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                {items.length}
              </span>
            </div>
            <p className={`font-body text-xs ${styles.textMuted}`}>{description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {items.map(item => (
          <RecurrenceCard
            key={item.id}
            item={item}
            onSelect={onSelect}
            onConfirm={onConfirm}
          />
        ))}
      </div>
    </section>
  );
};