import { CalendarClock, Icon, Search, SlidersHorizontal } from "lucide-react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function RecurrenceSkeleton() {
	return (
		<SkeletonTheme baseColor="#1c1c1f" highlightColor="#28282c">
			<main className="flex-1 w-full min-w-0 flex flex-col relative z-10">
				<div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col w-full">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-[16px] mb-[24px] animate-slide-up">
						<div>
							<Skeleton height={20} width={200} />
							<Skeleton height={20} width={200} />
						</div>

						<div className="flex flex-row gap-[8px] flex-wrap w-full sm:w-auto overflow-x-auto hide-scrollbar">					
							<Skeleton height={50} width={160} />
						</div>
					</div>

					<div
						className="w-full relative overflow-hidden rounded-[24px] p-[24px] sm:p-[28px] mb-[24px] shadow-2xl border border-white/[0.06] animate-slide-up delay-100"
						style={{ background: 'linear-gradient(to bottom right, #111113, #151518)' }}
					>
						<div
							className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-[30%]" 
							style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)' }}
						/>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
							<div className="lg:col-span-2 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/[0.06] pb-6 sm:pb-0 pr-0 sm:pr-[20px] lg:pr-[32px]">
								<Skeleton height={20} width={200} />
								
								<Skeleton height={50} width={200} />
								
								<div className="flex items-center gap-[6px] mt-[8px]">
									<Skeleton height={20} width={230} />
								</div>
							</div>

							<div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
								<Skeleton height={60} width={120} />
							</div>

							<div className="flex flex-col justify-center border-b sm:border-b-0 lg:border-r border-white/[0.06] py-6 sm:py-0 px-0 sm:px-[20px] lg:px-[24px]">
								<Skeleton height={60} width={120} />
							</div>

							<div className="flex flex-col justify-center pt-6 sm:pt-0 pl-0 sm:pl-[20px] lg:pl-[24px]">
								<Skeleton height={60} width={120} />
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">
						<div className="flex flex-col order-2 lg:order-1 min-w-0 animate-slide-up delay-100">
							<div className="flex flex-row items-center gap-[10px] mb-[16px]">
								<div className="flex-1 relative">
									<Skeleton height={40} width={'w-full'} borderRadius={10} />
								</div>
								
								<Skeleton height={40} width={160} borderRadius={10} />
							</div>

							<div
								className="w-full rounded-[24px] overflow-hidden" 
								style={{
									background: 'linear-gradient(to bottom right, #111113, #151518)',
									border: '1px solid rgba(255,255,255,0.06)',
									boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
								}}
							>
								<div className="grid grid-cols-1 gap-0">
									<div
										className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px]`}
										style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
									>
										{/* Top/Left Mobile/Desktop: Icon + Info */}
										<div className="flex items-center gap-[14px] flex-1 min-w-0">
											<div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors">
												<Skeleton height={40} width={40} borderRadius={10} />
											</div>

											<div className="flex-1 min-w-0 flex flex-col">
												<div className="flex flex-row justify-between items-center gap-[8px]">
													<Skeleton height={15} width={100} />
												</div>

												<div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
													<Skeleton height={15} width={100} />
												</div>
											</div>
										</div>

										{/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
										<div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
											{/* Valor Desktop */}
											<Skeleton height={30} width={80} />
											
											<div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
											
											{/* AÇÕES SEMPRE VISÍVEIS */}
											<div className="flex flex-row gap-[4px] flex-shrink-0">
												<Skeleton height={30} width={30} borderRadius={10} />
												<Skeleton height={30} width={30} borderRadius={10} />
											</div>
										</div>

									</div>
									<div
										className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px]`}
										style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
									>
										{/* Top/Left Mobile/Desktop: Icon + Info */}
										<div className="flex items-center gap-[14px] flex-1 min-w-0">
											<div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors">
												<Skeleton height={40} width={40} borderRadius={10} />
											</div>

											<div className="flex-1 min-w-0 flex flex-col">
												<div className="flex flex-row justify-between items-center gap-[8px]">
													<Skeleton height={15} width={100} />
												</div>

												<div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
													<Skeleton height={15} width={100} />
												</div>
											</div>
										</div>

										{/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
										<div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
											{/* Valor Desktop */}
											<Skeleton height={30} width={80} />
											
											<div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
											
											{/* AÇÕES SEMPRE VISÍVEIS */}
											<div className="flex flex-row gap-[4px] flex-shrink-0">
												<Skeleton height={30} width={30} borderRadius={10} />
												<Skeleton height={30} width={30} borderRadius={10} />
											</div>
										</div>

									</div>
									<div
										className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px]`}
										style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
									>
										{/* Top/Left Mobile/Desktop: Icon + Info */}
										<div className="flex items-center gap-[14px] flex-1 min-w-0">
											<div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors">
												<Skeleton height={40} width={40} borderRadius={10} />
											</div>

											<div className="flex-1 min-w-0 flex flex-col">
												<div className="flex flex-row justify-between items-center gap-[8px]">
													<Skeleton height={15} width={100} />
												</div>

												<div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
													<Skeleton height={15} width={100} />
												</div>
											</div>
										</div>

										{/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
										<div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
											{/* Valor Desktop */}
											<Skeleton height={30} width={80} />
											
											<div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
											
											{/* AÇÕES SEMPRE VISÍVEIS */}
											<div className="flex flex-row gap-[4px] flex-shrink-0">
												<Skeleton height={30} width={30} borderRadius={10} />
												<Skeleton height={30} width={30} borderRadius={10} />
											</div>
										</div>

									</div>
									<div
										className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px]`}
										style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
										onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
										onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
									>
										{/* Top/Left Mobile/Desktop: Icon + Info */}
										<div className="flex items-center gap-[14px] flex-1 min-w-0">
											<div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors">
												<Skeleton height={40} width={40} borderRadius={10} />
											</div>

											<div className="flex-1 min-w-0 flex flex-col">
												<div className="flex flex-row justify-between items-center gap-[8px]">
													<Skeleton height={15} width={100} />
												</div>

												<div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
													<Skeleton height={15} width={100} />
												</div>
											</div>
										</div>

										{/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
										<div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
											{/* Valor Desktop */}
											<Skeleton height={30} width={80} />
											
											<div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
											
											{/* AÇÕES SEMPRE VISÍVEIS */}
											<div className="flex flex-row gap-[4px] flex-shrink-0">
												<Skeleton height={30} width={30} borderRadius={10} />
												<Skeleton height={30} width={30} borderRadius={10} />
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-[16px] order-1 lg:order-2 lg:sticky lg:top-8 w-full animate-slide-up delay-100">
							<div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)' }}>
								<div className="flex items-center gap-[8px] mb-[12px]">
									<Skeleton height={20} width={200} />
								</div>

								<div className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
									<div className="flex flex-col min-w-0 pr-[8px]">
										<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">
											<Skeleton height={20} width={100} />
										</span>
										<span className="font-['Inter'] text-[10px] text-[#C4B5FD]">
											<Skeleton height={20} width={100} />
										</span>
									</div>
									<span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white flex-shrink-0">
										<Skeleton height={25} width={80} />
									</span>
								</div>
								<div className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
									<div className="flex flex-col min-w-0 pr-[8px]">
										<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">
											<Skeleton height={20} width={100} />
										</span>
										<span className="font-['Inter'] text-[10px] text-[#C4B5FD]">
											<Skeleton height={20} width={100} />
										</span>
									</div>
									<span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white flex-shrink-0">
										<Skeleton height={25} width={80} />
									</span>
								</div>
								<div className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
									<div className="flex flex-col min-w-0 pr-[8px]">
										<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">
											<Skeleton height={20} width={100} />
										</span>
										<span className="font-['Inter'] text-[10px] text-[#C4B5FD]">
											<Skeleton height={20} width={100} />
										</span>
									</div>
									<span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white flex-shrink-0">
										<Skeleton height={25} width={80} />
									</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</main>
		</SkeletonTheme>
	)
}

export default RecurrenceSkeleton;