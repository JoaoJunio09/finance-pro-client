import styles from './CustomTooltip.module.css';

interface TooltipPayloadEntry {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={`backdrop-blur-md border rounded-xl p-4 shadow-xl flex flex-col gap-3 min-w-[200px] z-50 ${styles.tooltip}`}>
      <span className={`text-xs font-semibold uppercase tracking-wider ${styles.label}`}>{label}</span>
      <div className="flex flex-col gap-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className={`font-medium ${styles.entryName}`}>{entry.name}</span>
            </div>
            <span className={`tabular-nums font-semibold ${styles.entryValue}`}>{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomTooltip;