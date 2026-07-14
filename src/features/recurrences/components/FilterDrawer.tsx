import { Check, SlidersHorizontal, X } from "lucide-react";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { RecurrenceSort } from "../../../types/RecurrenceSort";
import Overlay from "../../../components/ui/Overlay/Overlay";

interface FilterDrawerProps {
	setIsFilterDrawerOpen: (isOpen: boolean) => void;
	setType: React.Dispatch<React.SetStateAction<RecurrenceType | undefined>>;
	type: RecurrenceType | undefined;
	setFrequencyType: React.Dispatch<React.SetStateAction<FrequencyType | undefined>>;
	frequencyType: FrequencyType | undefined;
	setExecutionType: React.Dispatch<React.SetStateAction<ExecutionType | undefined>>;
	executionType: ExecutionType | undefined;
	setSort: React.Dispatch<React.SetStateAction<RecurrenceSort>>;
	sortType: RecurrenceSort;
	activeFiltersCount: number;
	clearFilters: () => void;
}

function FilterDrawer({
	setIsFilterDrawerOpen,
	setType,
	type,
	setFrequencyType,
	frequencyType,
	setExecutionType,
	executionType,
	setSort,
	sortType,
	activeFiltersCount,
	clearFilters
}: FilterDrawerProps) {
	return (
		<Overlay
			className="filter-drawer-root fixed inset-0 z-[100] flex justify-end"
      onClose={() => setIsFilterDrawerOpen(false)}
		>
			<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
			
			<div
				className="relative w-full max-w-[340px] flex flex-col animate-drawer shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/[0.08] overflow-y-auto"
        style={{ background: 'linear-gradient(to bottom, #111113, #0D0D0F)' }}
			>
				
				<div className="p-[20px] border-b border-white/[0.06] flex items-center justify-between">
					<div className="flex items-center gap-[10px]">
						<SlidersHorizontal size={18} color="#8B5CF6" />
						<h3 className="font-['Outfit'] text-[16px] font-semibold text-[#FFFFFF]">Filtros</h3>
						{activeFiltersCount > 0 && (
							<span className="bg-[#8B5CF626] text-[#C4B5FD] font-['Inter'] text-[10px] font-bold px-[8px] py-[2px] rounded-full">
								{activeFiltersCount}
							</span>
						)}
					</div>
					<button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 rounded-lg hover:bg-white/[0.06] text-zinc-500 hover:text-white transition-colors">
						<X size={18} />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pb-24">
					
					<div className="p-[20px] border-b border-white/[0.04]">
						<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Tipo</span>
						<div className="flex flex-col gap-[8px]">
							{(['ALL', 'CREDIT', 'DEBIT'] as const).map(t => {
								const label = t === 'ALL' ? 'Todos os tipos' : t === 'CREDIT' ? 'Receitas' : 'Despesas';
								const active = (t === 'ALL' && type === undefined) || type === t;
								return (
									<button 
										key={t} onClick={() => setType(t === 'ALL' ? undefined : t)}
										className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
										style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
									>
										{label}
										{active && <Check size={14} color="#C4B5FD" />}
									</button>
								)
							})}
						</div>
					</div>

					<div className="p-[20px] border-b border-white/[0.04]">
						<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Frequência</span>
						<div className="flex flex-col gap-[8px]">
							{(['ALL', 'MONTHLY', 'BIWEEKLY', 'YEARLY'] as const).map(f => {
								const label = f === 'ALL' ? 'Todas as frequências' : f === 'MONTHLY' ? 'Mensal' : f === 'BIWEEKLY' ? 'Quinzenal' : 'Anual';
								const active = (f === 'ALL' && frequencyType === undefined) || frequencyType === f;
								return (
									<button 
										key={f} onClick={() => setFrequencyType(f === 'ALL' ? undefined : f)}
										className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
										style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
									>
										{label}
										{active && <Check size={14} color="#C4B5FD" />}
									</button>
								)
							})}
						</div>
					</div>

					<div className="p-[20px] border-b border-white/[0.04]">
						<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Execução</span>
						<div className="flex flex-col gap-[8px]">
							{(['ALL', 'AUTOMATIC', 'MANUALLY'] as const).map(e => {
								const label = e === 'ALL' ? 'Todos os formatos' : e === 'AUTOMATIC' ? 'Automática' : 'Manual';
								const active = (e === 'ALL' && executionType === undefined) || executionType === e;
								return (
									<button 
										key={e} onClick={() => setExecutionType(e === 'ALL' ? undefined : e)}
										className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
										style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
									>
										{label}
										{active && <Check size={14} color="#C4B5FD" />}
									</button>
								)
							})}
						</div>
					</div>

					{/* <div className="p-[20px] border-b border-white/[0.04]">
						<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Status</span>
						<div className="flex flex-col gap-[8px]">
							{(['ALL', 'ACTIVE', 'PAUSED'] as const).map(s => {
								const label = s === 'ALL' ? 'Todos os status' : s === 'ACTIVE' ? 'Ativas' : 'Pausadas';
								const active = filterStatus === s;
								return (
									<button 
										key={s} onClick={() => setFilterStatus(s)}
										className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
										style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
									>
										{label}
										{active && <Check size={14} color="#C4B5FD" />}
									</button>
								)
							})}
						</div>
					</div> */}

					<div className="p-[20px] border-b border-white/[0.04]">
						<span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Ordenar por</span>
						<div className="flex flex-col gap-[8px]">
							{(['NEAREST_DATE', 'HIGHEST_AMOUNT', 'ALPHABETICAL'] as const).map(sort => {
								const label = sort === 'NEAREST_DATE' ? 'Vencimento (Mais próxima)' : sort === 'HIGHEST_AMOUNT' ? 'Maior valor' : 'Nome alfabético';
								const active = sortType === sort;
								return (
									<button 
										key={sort} onClick={() => setSort(sort)}
										className="w-full flex justify-between items-center px-[14px] py-[12px] rounded-xl font-['Inter'] text-[13px] font-medium transition-colors"
										style={active ? { backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.25)', color: '#C4B5FD' } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
									>
										{label}
										{active && <Check size={14} color="#C4B5FD" />}
									</button>
								)
							})}
						</div>
					</div>

				</div>

				<div className="p-[20px] border-t border-white/[0.06] sticky bottom-0 flex flex-row items-center gap-[12px] bg-[#0D0D0F]/90 backdrop-blur-md">
					<button 
						onClick={clearFilters}
						className="font-['Inter'] text-[13px] font-medium text-zinc-500 hover:text-white transition-colors py-[12px] px-[8px] outline-none"
					>
						Limpar
					</button>
					<button 
						onClick={() => setIsFilterDrawerOpen(false)}
						className="flex-1 rounded-[10px] font-['Inter'] text-[13px] font-semibold text-[#FFFFFF] py-[12px] transition-all active:scale-[0.98] outline-none"
						style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
					>
						Aplicar Filtros
					</button>
				</div>

			</div>
		</Overlay>
	)
}

export default FilterDrawer;