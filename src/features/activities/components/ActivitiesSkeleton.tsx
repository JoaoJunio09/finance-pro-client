import { PieChart, Sparkles } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ActivitiesSkeleton() {
	return (
		<SkeletonTheme baseColor="#1c1c1f" highlightColor="#28282c">
			<section className="w-full mb-12 animate-slide-up delay-100">
				<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">

					{/* Patrimônio Atual */}
					<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#111113] to-[#151518] border border-white/[0.06] rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
						<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"></div>
						<span className="block mb-2">
							<Skeleton width={120} height={11} />
						</span>
						<span className="block">
							<Skeleton width={140} height={34} />
						</span>
					</div>

					{/* Comparativo / segundo card grande */}
					<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#111113] to-[#151518] border border-white/[0.06] rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
						<span className="block mb-2">
							<Skeleton width={140} height={11} />
						</span>
						<span className="block mb-4">
							<Skeleton width={140} height={34} />
						</span>
						<Skeleton width={160} height={22} borderRadius={6} />
					</div>

					{/* Entrou */}
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="block mb-1">
							<Skeleton width={60} height={10} />
						</span>
						<Skeleton width={80} height={20} />
					</div>

					{/* Saiu */}
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="block mb-1">
							<Skeleton width={50} height={10} />
						</span>
						<Skeleton width={80} height={20} />
					</div>

					{/* Sobrou Líquido */}
					<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
						<span className="block mb-1">
							<Skeleton width={100} height={10} />
						</span>
						<Skeleton width={80} height={20} />
					</div>

					{/* Comprometido */}
					<div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 flex flex-col justify-center">
						<span className="block mb-1">
							<Skeleton width={90} height={10} />
						</span>
						<Skeleton width={80} height={20} />
					</div>

				</div>
			</section>
			<section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 animate-slide-up delay-200">
				{/* Insights Conversacionais (Left - 7 cols) */}
				<div className="lg:col-span-7 flex flex-col">
					<h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
						<Sparkles className="w-5 h-5 text-[#8B5CF6]" /> Insights Inteligentes
					</h3>
					<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-6">

						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
							<div className="flex-1 space-y-2">
								<Skeleton height={18} />
								<Skeleton height={18} width="70%" />
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
							<div className="flex-1 space-y-2">
								<Skeleton height={18} />
								<Skeleton height={18} width="55%" />
							</div>
						</div>

						<div className="flex items-start gap-4">
							<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
							<div className="flex-1 space-y-2">
								<Skeleton height={18} />
								<Skeleton height={18} width="60%" />
							</div>
						</div>

					</div>
				</div>

				{/* Resumo & Mini Chart (Right - 5 cols) */}
				<div className="lg:col-span-5 flex flex-col">
					<h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
						<PieChart className="w-5 h-5 text-zinc-500" /> Resumo do Mês
					</h3>
					<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-between">

						<div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Gasto</span>
								<Skeleton width={90} height={14} />
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Receita</span>
								<Skeleton width={90} height={14} />
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Despesa</span>
								<Skeleton width={80} height={14} />
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Receita</span>
								<Skeleton width={80} height={14} />
							</div>
							<div>
								<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Previsão Fim do Mês</span>
								<Skeleton width={110} height={14} />
							</div>
						</div>

						{/* Chart placeholder */}
						<div className="w-full h-16 relative mt-auto border-b border-white/[0.04]">
							<Skeleton height={64} borderRadius={8} />
						</div>
					</div>
				</div>
			</section>
		</SkeletonTheme>
	)
}

export default ActivitiesSkeleton;