import { formatCurrencyLabel } from "../../../utils/FormatCurrency";
import type { ChartDataType } from "../types/ChartDataType";

interface AssetDistributionChartProps {
	chartData: ChartDataType,
	totalAssets: number
}

function AssetDistributionChart({
	chartData,
	totalAssets
}: AssetDistributionChartProps) {
	return (
		<div
			className="animate-slide-up rounded-[24px] border border-white/[0.05] p-[24px] flex flex-col md:flex-row gap-[32px] items-center shadow-2xl mb-12"
			style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
		>
			<div
				className="relative w-[160px] h-[160px] flex-shrink-0 border border-white/[0.04] rounded-full flex items-center justify-center p-3"
				style={{ background: 'rgba(17,17,19,0.5)' }}
			>
				<svg width="144" height="144" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
					{chartData.map(w => (
						<circle
							key={w.id}
							cx="80"
							cy="80"
							r="64"
							fill="none"
							stroke={w.chartColor}
							strokeWidth="12"
							strokeDasharray={w.dasharray}
							strokeDashoffset={w.dashoffset}
							style={{ transition: 'stroke-dasharray 1s ease, stroke-dashoffset 1s ease' }}
						/>
					))}
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
					<span className="font-['Inter'] text-[10px] uppercase text-zinc-500 font-semibold tracking-widest mb-0.5">Total</span>
					<span
						className="font-['Outfit'] text-[16px] font-bold tabular-nums"
						style={{ 
							background: 'linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent'
						}}
					>
						{formatCurrencyLabel(totalAssets ?? 0)}
					</span>
				</div>
			</div>

			<div className="flex-1 w-full flex flex-col">
				{chartData.map(w => (
					<div key={w.id} className="flex flex-wrap flex-row items-center gap-[12px] py-[10px] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
						<div className="w-[10px] h-[10px] rounded-full flex-shrink-0" style={{ backgroundColor: w.chartColor }} />
						<div className="font-['Inter'] text-[13px] text-white font-medium flex-1 truncate">{w.name}</div>
						
						<div className="hidden sm:block w-[120px] h-[6px] rounded-full bg-white/[0.04] overflow-hidden flex-shrink-0">
							<div
								className="h-full rounded-full transition-all duration-1000 ease-out" 
								style={{ width: `${w.percentage}%`, backgroundColor: w.chartColor }}
							/>
						</div>
						
						<div className="font-['Outfit'] text-[12px] font-semibold text-[#8B5CF6] tabular-nums min-w-[40px] text-right flex-shrink-0">
							{w.percentage.toFixed(1)}%
						</div>
						<div className="font-['Outfit'] text-[13px] font-semibold tabular-nums min-w-[90px] text-right flex-shrink-0" style={{ color: w.chartColor }}>
							{formatCurrencyLabel(w.balance)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AssetDistributionChart;