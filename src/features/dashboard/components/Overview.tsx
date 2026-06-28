import { Landmark, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { Month, OverviewResponse } from "../../../models/transaction/OverviewResponse";

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTHS_ORDER: Month[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_LABELS: Record<Month, string> = {
  January: 'Jan', February: 'Fev', March: 'Mar', April: 'Abr',
  May: 'Mai', June: 'Jun', July: 'Jul', August: 'Ago',
  September: 'Set', October: 'Out', November: 'Nov', December: 'Dez'
};

const CURRENT_MONTH = MONTHS_ORDER[new Date().getMonth()];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatCurrency = (val: number): string =>
  val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });

// ─── Types ───────────────────────────────────────────────────────────────────

interface WeeklyData {
  name: string;
  income: number;
  expenses: number;
}

interface TooltipEntry {
  value: number;
  payload: { name: string; income: number; expenses: number };
}

// ─── WalletBalanceCard ───────────────────────────────────────────────────────

interface WalletBalanceCardProps {
  total: number;
  wallets: WalletResponse[];
}

const WalletBalanceCard = ({ total, wallets }: WalletBalanceCardProps) => (
  <div className="bg-[#171717] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col justify-between shadow-[0_0_0_1px_rgba(99,102,241,0.09),0_1px_3px_rgba(0,0,0,0.4)]">
    <div>
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em]">
          Saldo Atual
        </span>
        <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1]">
          <Landmark size={18} />
        </div>
      </div>

      <div className="text-[40px] font-semibold text-[#EDEDED] mt-4 tracking-tight tabular-nums leading-none font-money">
        {formatCurrency(total)}
      </div>

      <p className="text-[12px] text-gray-400 font-sans pt-5 pb-3">
        Dinheiro disponível considerando todas as suas carteiras.
      </p>

      <div className="flex items-center gap-1.5 bg-[#4ADE8010] py-1 px-2.5 rounded-lg w-fit mt-3">
        <TrendingUp className="text-[#4ADE80]" size={14} />
        <span className="text-[12px] text-[#4ADE80] font-sans">
          Crescimento de 6,2% no último mês
        </span>
      </div>

      <div className="h-[1px] bg-[#2A2A2A] my-7" />

      <div className="flex flex-col gap-4">
        {wallets.map((wallet) => (
          <div key={wallet.name} className="flex justify-between items-center text-[14px]">
            <span className="text-[#A1A1AA] font-sans">{wallet.name}</span>
            <span className="text-[#EDEDED] font-semibold tabular-nums font-money">
              {formatCurrency(wallet.balance)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── CustomTooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl shadow-lg">
      <p className="text-[11px] text-[#71717A] uppercase tracking-wider mb-2 font-medium font-sans">
        {payload[0].payload.name}
      </p>
      <div className="flex flex-col gap-1.5 text-xs">
        {[
          { label: 'Entradas', color: '#4ADE80', value: payload[0].value },
          { label: 'Saídas',   color: '#F87171', value: payload[1].value },
        ].map(({ label, color, value }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[#A1A1AA] font-sans">{label}:</span>
            <span className="font-semibold text-[#EDEDED] tabular-nums font-money">
              {formatCurrency(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── FinancialEvolutionCard ──────────────────────────────────────────────────

interface FinancialEvolutionCardProps {
  months: Month[];
  selectedMonth: Month;
  onMonthChange: (month: Month) => void;
  data: WeeklyData[];
}

const FinancialEvolutionCard = ({ months, selectedMonth, onMonthChange, data }: FinancialEvolutionCardProps) => (
  <div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col h-full justify-between shadow-[0_1px_3px_rgba(0,0,0,0.5)] w-full overflow-hidden">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h3 className="text-sm font-medium text-[#EDEDED] font-sans">Evolução Financeira</h3>

      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
        {months.map((m) => (
          <button
            key={m}
            onClick={() => onMonthChange(m)}
            className={`py-1 px-2.5 rounded-xl text-xs font-medium transition-all duration-150 whitespace-nowrap font-sans ${
              m === selectedMonth
                ? 'bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/40'
                : 'bg-[#1A1A1A] text-[#71717A] border border-transparent hover:text-[#A1A1AA]'
            }`}
          >
            {MONTH_LABELS[m]}
          </button>
        ))}
      </div>
    </div>

    <div className="h-[200px] lg:h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#2A2A2A" strokeDasharray="0" />
          <XAxis dataKey="name" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} dy={10} />
          <YAxis stroke="#71717A" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `R$ ${v}`} dx={-5} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="income"   fill="#4ADE80" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={20} />
          <Bar dataKey="expenses" fill="#F87171" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="flex items-center gap-4 mt-4 text-[12px] text-[#A1A1AA] font-sans">
      {[
        { label: 'Entradas', color: 'bg-[#4ADE80]/80' },
        { label: 'Saídas',   color: 'bg-[#F87171]/80' },
      ].map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Overview ────────────────────────────────────────────────────────────────

interface OverviewProps {
  overviewData: OverviewResponse | null;
  total: number;
  wallets: WalletResponse[];
}

function Overview({ overviewData, total, wallets }: OverviewProps) {
  const months = overviewData
    ? MONTHS_ORDER.filter((m) => overviewData.overview[m]?.length > 0)
    : [];

  const [selectedMonth, setSelectedMonth] = useState<Month>(CURRENT_MONTH);

  useEffect(() => {
    if (months.length > 0 && !months.includes(selectedMonth)) {
      setSelectedMonth(months[months.length - 1]);
    }
  }, [overviewData]);

  const chartData: WeeklyData[] = (overviewData?.overview[selectedMonth] ?? []).map((w) => ({
    name: `Semana ${w.week}`,
    income: Number(w.income),
    expenses: Number(w.expenses),
  }));

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-6 items-stretch w-full">
      <WalletBalanceCard total={total} wallets={wallets} />
      <FinancialEvolutionCard
        months={months}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        data={chartData}
      />
    </section>
  );
}

export default Overview;