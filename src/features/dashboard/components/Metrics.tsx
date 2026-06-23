import { ShoppingCart, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type { MetricData } from "../hooks/useDashboard";

const formatCurrency = (val: number | string): string => {
  return val.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
};

interface MetricCardProps {
  metric: MetricData;
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const isPositive = metric.type === 'income' || metric.type === 'net';
  const isNegative = metric.type === 'expense';
  
  const getValueColor = () => {
    if (isPositive) return 'text-[#4ADE80]';
    if (isNegative) return 'text-[#F87171]';
    return 'text-[#EDEDED]';
  };

  const getIconData = () => {
    switch (metric.type) {
      case 'income':
        return { icon: TrendingUp, color: 'text-[#4ADE80]', bg: 'bg-[#4ADE8018]' };
      case 'expense':
        return { icon: TrendingDown, color: 'text-[#F87171]', bg: 'bg-[#F8717118]' };
      case 'net':
        return { icon: Wallet, color: 'text-[#6366F1]', bg: 'bg-[#6366F118]' };
      case 'max_expense':
        return { icon: ShoppingCart, color: 'text-[#FCD34D]', bg: 'bg-[#FCD34D18]' };
    }
  };

  const { icon: IconComponent, color: iconColor, bg: iconBg } = getIconData();
  const isSobrou = metric.type === 'net';

  return (
    <div className={`bg-[#111111] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col justify-between min-h-[140px] shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all duration-150 hover:border-[#3A3A3A] ${isSobrou ? 'border border-[#6366F1]/40 shadow-[0_0_0_1px_rgba(99,102,241,0.12)]' : ''}`}>
      {/* Ícone no topo */}
      <div className='flex justify-between flex-col-reverse lg:flex-row lg:items-center'>
        <div className="mt-0">
          <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] block">
            {metric.title}
          </span>
          <div className={`text-[20px] font-semibold mt-1 tracking-tight tabular-nums font-money ${getValueColor()}`}>
            {formatCurrency(metric.value)}
          </div>
        </div>

        <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} shrink-0 mb-5 lg:mb-0`}>
          <IconComponent size={18} />
        </div>
      </div>

      <span className="text-xs text-[#71717A] mt-1 block font-sans">
        {metric.subtitle}
      </span>
    </div>
  );
};

interface MetricsProps {
  metrics: MetricData[]
}

function Metrics({ metrics }: MetricsProps) {
	return (
		<section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
			{metrics.map((metric) => (
				<MetricCard key={metric.title} metric={metric} />
			))}
		</section>
	)
}

export default Metrics;