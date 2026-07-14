import { Search, SlidersHorizontal } from "lucide-react";

interface FilterAndSearchProps {
	setSearch: (value: string) => void;
	search: string;
	setIsFilterDrawerOpen: (isOpen: boolean) => void;
	activeFiltersCount: number;
}

function FilterAndSearch({
	setSearch,
	search,
	setIsFilterDrawerOpen,
	activeFiltersCount
}: FilterAndSearchProps) {
	return (
		<div className="flex flex-row items-center gap-[10px] mb-[16px]">
			<div className="flex-1 relative">
				<Search className="absolute left-[12px] top-1/2 -translate-y-1/2 text-zinc-500 w-[15px] h-[15px]" />
				<input 
					type="text" 
					placeholder="Buscar por nome, categoria ou carteira..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="w-full h-[40px] rounded-[12px] pl-[36px] pr-[16px] font-['Inter'] text-[13px] text-white outline-none transition-all placeholder:text-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518]"
					style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
				/>
			</div>
			
			<button 
				onClick={() => setIsFilterDrawerOpen(true)}
				className="relative flex items-center justify-center h-[40px] px-[16px] rounded-[12px] gap-[8px] font-['Inter'] text-[13px] font-medium transition-all outline-none animate-pulse-subtle"
				style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.06)', color: '#A1A1AA' }}
				onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#FFFFFF'; }}
				onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#A1A1AA'; }}
			>
				<SlidersHorizontal size={15} />
				<span className="hidden sm:block">Filtros Avançados</span>
				{activeFiltersCount > 0 && (
					<span className="absolute -top-[6px] -right-[6px] w-[18px] h-[18px] rounded-full bg-[#8B5CF6] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
						{activeFiltersCount}
					</span>
				)}
			</button>
		</div>
	)
}

export default FilterAndSearch