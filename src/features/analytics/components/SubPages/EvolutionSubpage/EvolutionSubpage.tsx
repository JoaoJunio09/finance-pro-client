import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { BalanceTrajectoryPoint } from '../../../../../models/account/AnalyticsResponse';
import CustomTooltip from '../../CustomTooltip/CustomTooltip';
import styles from './EvolutionSubpage.module.css';

interface EvolutionSubpageProps {
  evolution: BalanceTrajectoryPoint[];
}

export function EvolutionSubpage({ evolution }: EvolutionSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className={`p-6 rounded-3xl flex flex-col gap-5 border ${styles.card}`}>
        <div>
          <h3 className={`text-base font-bold ${styles.cardTitle}`}>Trajetória Acumulada de Saldo</h3>
          <p className={`text-xs ${styles.cardSubtitle}`}>Crescimento patrimonial líquido ao longo do tempo</p>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolution}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} tickFormatter={(v) => `R$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" name="Saldo Acumulado" stroke="var(--accent)" strokeWidth={3} fill="var(--accent-muted)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EvolutionSubpage;