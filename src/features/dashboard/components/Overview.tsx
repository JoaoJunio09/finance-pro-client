import { Landmark, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";

export type Month = 
  | 'Janeiro' | 'Fevereiro' | 'Março' | 'Abril' | 'Maio' | 'Junho' 
  | 'Julho' | 'Agosto' | 'Setembro' | 'Outubro' | 'Novembro' | 'Dezembro';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

export interface MetricData {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'net' | 'max_expense';
  subtitle?: string;
}

export interface WalletType {
  name: string;
  balance: number;
}

export interface WeeklyData {
  name: string; // 'Semana 1', 'Semana 2', etc.
  entradas: number;
  saidas: number;
}

export interface Insight {
  id: string | number;
  type: 'warning' | 'positive' | 'negative' | 'neutral';
  text: string;
}

export interface Transaction {
  id: string | number;
  description: string;
  category: string;
  wallet: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}

interface TooltipEntry {
  value: number;
  name: string;
  payload: {
    name: string;
    entradas: number;
    saidas: number;
  };
}

// ==========================================================================
// DADOS MOCKADOS REAIS (Realistas, em Português)
// ==========================================================================

const WALLET_BALANCE_TOTAL = 2000.00;

const MOCK_WALLETS: WalletType[] = [
  { name: 'Conta Corrente', balance: 1000.00 },
  { name: 'Reserva de Emergência', balance: 500.00 },
  { name: 'Moto', balance: 500.00 }
];

const MONTHS: Month[] = [
	'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const MOCK_EVOLUTION_DATA: Record<Month, WeeklyData[]> = {
	Janeiro: [
		{ name: 'Semana 1', entradas: 1200, saidas: 800 },
		{ name: 'Semana 2', entradas: 1500, saidas: 950 },
		{ name: 'Semana 3', entradas: 1100, saidas: 1200 },
		{ name: 'Semana 4', entradas: 2200, saidas: 1500 }
	],
	Fevereiro: [
		{ name: 'Semana 1', entradas: 1400, saidas: 900 },
		{ name: 'Semana 2', entradas: 1600, saidas: 1100 },
		{ name: 'Semana 3', entradas: 1800, saidas: 1300 },
		{ name: 'Semana 4', entradas: 2500, saidas: 1700 }
	],
	Março: [
		{ name: 'Semana 1', entradas: 1900, saidas: 1200 },
		{ name: 'Semana 2', entradas: 2100, saidas: 1400 },
		{ name: 'Semana 3', entradas: 1500, saidas: 1100 },
		{ name: 'Semana 4', entradas: 3100, saidas: 2100 }
	],
	Abril: [
		{ name: 'Semana 1', entradas: 2000, saidas: 1500 },
		{ name: 'Semana 2', entradas: 2200, saidas: 1300 },
		{ name: 'Semana 3', entradas: 1800, saidas: 1200 },
		{ name: 'Semana 4', entradas: 2900, saidas: 2200 }
	],
	Maio: [
		{ name: 'Semana 1', entradas: 2300, saidas: 1600 },
		{ name: 'Semana 2', entradas: 2400, saidas: 1800 },
		{ name: 'Semana 3', entradas: 1900, saidas: 1400 },
		{ name: 'Semana 4', entradas: 3200, saidas: 2500 }
	],
	Junho: [
		{ name: 'Semana 1', entradas: 2500, saidas: 1100 },
		{ name: 'Semana 2', entradas: 2100, saidas: 980 },
		{ name: 'Semana 3', entradas: 2800, saidas: 1200 },
		{ name: 'Semana 4', entradas: 2000, saidas: 1000 }
	],
	Julho: [
		{ name: 'Semana 1', entradas: 1800, saidas: 1200 },
		{ name: 'Semana 2', entradas: 2200, saidas: 1400 },
		{ name: 'Semana 3', entradas: 2100, saidas: 1500 },
		{ name: 'Semana 4', entradas: 2700, saidas: 1800 }
	],
	Agosto: [
		{ name: 'Semana 1', entradas: 2100, saidas: 1300 },
		{ name: 'Semana 2', entradas: 2300, saidas: 1500 },
		{ name: 'Semana 3', entradas: 2400, saidas: 1600 },
		{ name: 'Semana 4', entradas: 3000, saidas: 2000 }
	],
	Setembro: [
		{ name: 'Semana 1', entradas: 2200, saidas: 1400 },
		{ name: 'Semana 2', entradas: 2500, saidas: 1600 },
		{ name: 'Semana 3', entradas: 2300, saidas: 1700 },
		{ name: 'Semana 4', entradas: 3100, saidas: 2100 }
	],
	Outubro: [
		{ name: 'Semana 1', entradas: 2400, saidas: 1500 },
		{ name: 'Semana 2', entradas: 2600, saidas: 1800 },
		{ name: 'Semana 3', entradas: 2500, saidas: 1600 },
		{ name: 'Semana 4', entradas: 3200, saidas: 2200 }
	],
	Novembro: [
		{ name: 'Semana 1', entradas: 2500, saidas: 1600 },
		{ name: 'Semana 2', entradas: 2800, saidas: 1900 },
		{ name: 'Semana 3', entradas: 2700, saidas: 1700 },
		{ name: 'Semana 4', entradas: 3400, saidas: 2400 }
	],
	Dezembro: [
		{ name: 'Semana 1', entradas: 3000, saidas: 1800 },
		{ name: 'Semana 2', entradas: 3200, saidas: 2100 },
		{ name: 'Semana 3', entradas: 2900, saidas: 1900 },
		{ name: 'Semana 4', entradas: 4000, saidas: 2800 }
	]
};

const formatCurrency = (val: number): string => {
  return val.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
};

interface WalletBalanceCardProps {
	total: number;
	wallets: WalletResponse[];
}

const WalletBalanceCard = ({ total, wallets }: WalletBalanceCardProps) => {
  return (
    <div className="bg-[#171717] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col justify-between shadow-[0_0_0_1px_rgba(99,102,241,0.09),0_1px_3px_rgba(0,0,0,0.4)]">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] block">
            Saldo Atual
          </span>
          <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] shrink-0">
            <Landmark size={18} />
          </div>
        </div>
        
        {/* Destaque máximo - Elemento visual dominante */}
        <div className="text-[40px] font-semibold text-[#EDEDED] mt-4 tracking-tight tabular-nums leading-none font-money">
          {formatCurrency(total)}
        </div>

        <div className='pt-5 pb-3'>
          <span className="text-[12px] text-gray-400 font-sans">
            Dinheiro disponível considerando todas as suas carteiras.
          </span>
        </div>

        {/* Feedback de crescimento */}
        <div className="flex items-center gap-1.5 bg-[#4ADE8010] py-1 px-2.5 rounded-lg w-fit mt-3">
          <TrendingUp className="text-[#4ADE80]" size={14} />
          
          <span className="text-[12px] text-[#4ADE80] font-sans">
            Crescimento de 6,2% no último mês
          </span>
        </div>
        
        <div className="h-[1px] bg-[#2A2A2A] my-7" />

        {/* Lista de Carteiras - 14px de espaçamento sem bordas */}
        <div className="flex flex-col space-y-5.5">
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
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-[#1A1A1A] border border-[#2A2A2A] p-3 rounded-xl shadow-lg">
				<p className="text-[11px] text-[#71717A] uppercase tracking-wider mb-2 font-medium font-sans">
					{payload[0].payload.name}
				</p>
				<div className="flex flex-col gap-1.5 text-xs">
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
						<span className="text-[#A1A1AA] font-sans">Entradas:</span>
						<span className="font-semibold text-[#EDEDED] tabular-nums font-money">
							{formatCurrency(payload[0].value as number)}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-[#F87171]" />
						<span className="text-[#A1A1AA] font-sans">Saídas:</span>
						<span className="font-semibold text-[#EDEDED] tabular-nums font-money">
							{formatCurrency(payload[1].value as number)}
						</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

interface FinancialEvolutionCardProps {
	currentMonth: Month;
	onMonthChange: (month: Month) => void;
	data: WeeklyData[];
}

const FinancialEvolutionCard: React.FC<FinancialEvolutionCardProps> = ({
	currentMonth,
	onMonthChange,
	data
}) => {
	return (
		<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col h-full justify-between shadow-[0_1px_3px_rgba(0,0,0,0.5)] w-full overflow-hidden">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<h3 className="text-sm font-medium text-[#EDEDED] font-sans">Evolução Financeira</h3>
				
				{/* Seletor de Meses - Pills Horizontais */}
				<div className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-full pb-1 sm:pb-0">
					{MONTHS.map((m) => {
						const isActive = m === currentMonth;
						return (
							<button
								key={m}
								onClick={() => onMonthChange(m)}
								className={`py-1 px-2.5 rounded-xl text-xs font-medium transition-all duration-150 whitespace-nowrap font-sans ${
									isActive 
										? 'bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/40' 
										: 'bg-[#1A1A1A] text-[#71717A] border border-transparent hover:text-[#A1A1AA]'
								}`}
							>
								{m}
							</button>
						);
					})}
				</div>
			</div>

			{/* Gráfico Recharts de Barras Agrupadas — CORREÇÃO 5 (h-[200px] mobile/desktop) */}
			<div className="h-[200px] lg:h-[220px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
						<CartesianGrid vertical={false} stroke="#2A2A2A" strokeDasharray="0" />
						<XAxis 
							dataKey="name" 
							stroke="#71717A" 
							fontSize={12}
							fontFamily="Inter"
							tickLine={false}
							axisLine={false}
							dy={10}
						/>
						<YAxis 
							stroke="#71717A" 
							fontSize={11}
							fontFamily="Plus Jakarta Sans"
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) => `R$ ${value}`}
							dx={-5}
						/>
						<Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
						<Bar dataKey="entradas" fill="#4ADE80" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={20} />
						<Bar dataKey="saidas" fill="#F87171" fillOpacity={0.8} radius={[4, 4, 0, 0]} maxBarSize={20} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Legendas simples e refinadas */}
			<div className="flex items-center gap-4 mt-4 text-[12px] text-[#A1A1AA] font-sans">
				<div className="flex items-center gap-1.5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]/80" />
					<span>● Entradas</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="w-1.5 h-1.5 rounded-full bg-[#F87171]/80" />
					<span>● Saídas</span>
				</div>
			</div>
		</div>
	);
};

interface OverviewProps {
	total: number,
	wallets: WalletResponse[]
}

function Overview({ total, wallets }: OverviewProps) {
	const [selectedMonth, setSelectedMonth] = useState<Month>('Junho');

	return (
		<section className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-6 items-stretch w-full">
			<WalletBalanceCard
				total={total}
				wallets={wallets}
			/>
			
			<FinancialEvolutionCard 
				currentMonth={selectedMonth} 
				onMonthChange={setSelectedMonth} 
				data={MOCK_EVOLUTION_DATA[selectedMonth]} 
			/>
		</section>
	)
}

export default Overview;