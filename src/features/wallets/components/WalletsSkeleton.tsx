import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function WalletsSkeleton() {
	return (
		<SkeletonTheme baseColor="#1c1c1f" highlightColor="#28282c">
			<div
				className="animate-slide-up relative overflow-hidden rounded-[24px] p-[28px] md:p-[32px] border border-white/[0.06] flex flex-col md:flex-row justify-between gap-6 shadow-2xl group transition-all duration-300"
				style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
			>
				<div className="relative z-10 flex flex-col gap-3 justify-center">
					<div>
						<Skeleton height={20} width={150} />
					</div>
					<div>
						<Skeleton height={60} width={200} />
					</div>
				</div>

				{/* Lado Direito: Métricas Rápidas */}
				<div className="relative z-10 flex flex-col gap-[10px] items-start md:items-end justify-center shrink-0">
					<div className="flex items-center gap-[8px] md:justify-end">
						<Skeleton height={20} width={200} />
					</div>
						<div className="flex items-center gap-[8px] md:justify-end">
							<Skeleton height={20} width={200} />
						</div>
					
						<div className="flex items-center gap-[8px] md:justify-end">
							<Skeleton height={20} width={200} />
						</div>
				</div>
			</div>

			<div className="animate-slide-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
				<div 
					className={`
						relative overflow-hidden w-full rounded-[20px] aspect-[1.586] transition-all duration-200 ease-out group select-none cursor-pointer hover:-translate-y-1
					`}
					style={{ 
						background:'#111',
						boxShadow: 'none',
					}}
				>
					<div className="absolute top-[22%] left-[8%] w-[36px] h-[28px] rounded-[5px] flex items-center justify-center overflow-hidden">
						<Skeleton height={50} width={50} />
					</div>
					<div
						className="absolute bottom-[38%] left-[8%] font-['Outfit'] font-medium tracking-[0.18em] text-white/80"
						style={{ fontSize: true ? '12px' : '14px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div
						className="absolute bottom-[16%] left-[8%] font-['Inter'] font-semibold text-white truncate max-w-[50%]"
						style={{ fontSize: '13px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div className="absolute bottom-[14%] right-[8%] text-right">
						<div className="font-['Inter'] uppercase text-white/60 tracking-wider mb-0.5" style={{ fontSize: true ? '8px' : '10px' }}>
							<Skeleton height={20} width={50} />
						</div>
						<div className="font-['Outfit'] font-bold tabular-nums text-white" style={{ fontSize: true ? '14px' : '16px' }}>
							<Skeleton height={30} width={100} />
						</div>
					</div>
				</div>
				<div 
					className={`
						relative overflow-hidden w-full rounded-[20px] aspect-[1.586] transition-all duration-200 ease-out group select-none cursor-pointer hover:-translate-y-1
					`}
					style={{ 
						background:'#111',
						boxShadow: 'none',
					}}
				>
					<div className="absolute top-[22%] left-[8%] w-[36px] h-[28px] rounded-[5px] flex items-center justify-center overflow-hidden">
						<Skeleton height={50} width={50} />
					</div>
					<div
						className="absolute bottom-[38%] left-[8%] font-['Outfit'] font-medium tracking-[0.18em] text-white/80"
						style={{ fontSize: true ? '12px' : '14px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div
						className="absolute bottom-[16%] left-[8%] font-['Inter'] font-semibold text-white truncate max-w-[50%]"
						style={{ fontSize: '13px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div className="absolute bottom-[14%] right-[8%] text-right">
						<div className="font-['Inter'] uppercase text-white/60 tracking-wider mb-0.5" style={{ fontSize: true ? '8px' : '10px' }}>
							<Skeleton height={20} width={50} />
						</div>
						<div className="font-['Outfit'] font-bold tabular-nums text-white" style={{ fontSize: true ? '14px' : '16px' }}>
							<Skeleton height={30} width={100} />
						</div>
					</div>
				</div>
				<div 
					className={`
						relative overflow-hidden w-full rounded-[20px] aspect-[1.586] transition-all duration-200 ease-out group select-none cursor-pointer hover:-translate-y-1
					`}
					style={{ 
						background:'#111',
						boxShadow: 'none',
					}}
				>
					<div className="absolute top-[22%] left-[8%] w-[36px] h-[28px] rounded-[5px] flex items-center justify-center overflow-hidden">
						<Skeleton height={50} width={50} />
					</div>
					<div
						className="absolute bottom-[38%] left-[8%] font-['Outfit'] font-medium tracking-[0.18em] text-white/80"
						style={{ fontSize: true ? '12px' : '14px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div
						className="absolute bottom-[16%] left-[8%] font-['Inter'] font-semibold text-white truncate max-w-[50%]"
						style={{ fontSize: '13px' }}
					>
						<Skeleton height={20} width={100} />
					</div>
					<div className="absolute bottom-[14%] right-[8%] text-right">
						<div className="font-['Inter'] uppercase text-white/60 tracking-wider mb-0.5" style={{ fontSize: true ? '8px' : '10px' }}>
							<Skeleton height={20} width={50} />
						</div>
						<div className="font-['Outfit'] font-bold tabular-nums text-white" style={{ fontSize: true ? '14px' : '16px' }}>
							<Skeleton height={30} width={100} />
						</div>
					</div>
				</div>
			</div>

			<div
				className="animate-slide-up rounded-[24px] border border-white/[0.05] p-[24px] flex flex-col md:flex-row gap-[32px] items-center shadow-2xl mb-12"
				style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
			>
				<div
					className="relative w-[160px] h-[160px] flex-shrink-0 border border-white/[0.04] rounded-full flex items-center justify-center p-3"
					style={{ background: 'rgba(17,17,19,0.5)' }}
				>
					<Skeleton height={160} width={160} borderRadius={100} />
				</div>
	
				<div className="flex-1 w-full flex flex-col">
					
						<div className="flex flex-wrap flex-row items-center gap-[12px] py-[10px] border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
							<Skeleton height={10} width={10} borderRadius={100} />
							<div className="font-['Inter'] text-[13px] text-white font-medium flex-1 truncate">
								<Skeleton height={20} width={100} />
							</div>
							
							<div className="hidden sm:block w-[120px] h-[6px] rounded-full bg-white/[0.04] overflow-hidden flex-shrink-0">
								<Skeleton height={20} width={100} />
							</div>
							
							<div className="font-['Outfit'] text-[12px] font-semibold text-[#8B5CF6] tabular-nums min-w-[40px] text-right flex-shrink-0">
								<Skeleton height={30} width={50} />
							</div>
							<div className="font-['Outfit'] text-[13px] font-semibold tabular-nums min-w-[90px] text-right flex-shrink-0" style={{ color: 'red' }}>
								<Skeleton height={30} width={100} />
							</div>
						</div>
					
				</div>
			</div>
		</SkeletonTheme>
	)
}

export default WalletsSkeleton;