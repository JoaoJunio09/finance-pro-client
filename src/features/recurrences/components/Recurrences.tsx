import useRecurrences from '../hooks/useRecurrences';
import Apresentation from './Apresentation';
import FilterAndSearch from './FilterAndSearch';
import MonthlyImpact from './MontlyImpact';
import RecurrencesList from './RecurrencesList';
import RecurrencesOverdueList from './RecurrencesOverdueList';
import RecurrencesTodayList from './RecurrencesTodayList';
import RecurrencesUpcomingList from './RecurrencesUpcomingList';

export default function Recurrences() {
	const {
		allRecurrences,
		loading,
		setType,
		setFrequencyType,
		setExecutionType,
		setSort,
		clearFilters
	} = useRecurrences();

	console.log(allRecurrences);

  return (
		<main className="flex-1 w-full min-w-0 flex flex-col relative z-10 animate-slide-up">
			<div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 flex flex-col w-full">
				<Apresentation />

				<MonthlyImpact
					totalRegistered={allRecurrences?.totalRegistered ?? 0}
					totalIncomeAmount={allRecurrences?.totalIncomeAmount ?? 0}
					totalExpenseAmount={allRecurrences?.totalExpenseAmount ?? 0}
					monthlyImpact={allRecurrences?.monthlyImpact ?? 0}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[24px] items-start">
					
					<div className="flex flex-col order-2 lg:order-1 min-w-0">	
						<FilterAndSearch />

						<RecurrencesList
							recurrences={allRecurrences?.recurrences ?? []}
						/>
					</div>

					<div className="flex flex-col gap-[16px] order-1 lg:order-2 lg:sticky lg:top-8 w-full">
						{allRecurrences?.recurrencesOverdue && allRecurrences?.recurrencesOverdue.length > 0 && (
							<RecurrencesOverdueList
								recurrences={allRecurrences.recurrencesOverdue ?? []}
							/>
						)}
						{allRecurrences?.recurrencesDueToday && allRecurrences?.recurrencesDueToday.length > 0 && (
							<RecurrencesTodayList
								recurrences={allRecurrences?.recurrencesDueToday ?? []}
							/>
						)}

						<RecurrencesUpcomingList
							recurrences={allRecurrences?.recurrences ?? []}
						/>
					</div>
				</div>
			</div>

			{/* DRAWER DE FILTROS ESTILIZADO (ATUALIZADO) */}
      {/* {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          
          <div className="relative w-full max-w-[340px] flex flex-col animate-drawer shadow-[-20px_0_60px_rgba(0,0,0,0.5)] border-l border-white/[0.08]"
               style={{ background: 'linear-gradient(to bottom, #111113, #0D0D0F)' }}>
            
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
                  {(['ALL', 'INCOME', 'EXPENSE'] as const).map(t => {
                    const label = t === 'ALL' ? 'Todos os tipos' : t === 'INCOME' ? 'Receitas' : 'Despesas';
                    const active = filterType === t;
                    return (
                      <button 
                        key={t} onClick={() => setFilterType(t)}
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
                    const active = filterFrequency === f;
                    return (
                      <button 
                        key={f} onClick={() => setFilterFrequency(f)}
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
                  {(['ALL', 'AUTOMATIC', 'MANUAL'] as const).map(e => {
                    const label = e === 'ALL' ? 'Todos os formatos' : e === 'AUTOMATIC' ? 'Automática' : 'Manual';
                    const active = filterExecution === e;
                    return (
                      <button 
                        key={e} onClick={() => setFilterExecution(e)}
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
              </div>

              <div className="p-[20px] border-b border-white/[0.04]">
                <span className="font-['Inter'] text-[11px] uppercase tracking-widest font-semibold text-zinc-500 block mb-[10px]">Ordenar por</span>
                <div className="flex flex-col gap-[8px]">
                  {(['DATE', 'VALUE', 'NAME'] as const).map(sort => {
                    const label = sort === 'DATE' ? 'Vencimento (Mais próxima)' : sort === 'VALUE' ? 'Maior valor' : 'Nome alfabético';
                    const active = sortBy === sort;
                    return (
                      <button 
                        key={sort} onClick={() => setSortBy(sort)}
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
                onClick={() => { setFilterType('ALL'); setFilterFrequency('ALL'); setFilterExecution('ALL'); setFilterStatus('ALL'); setSortBy('DATE'); }}
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
        </div>
      )} */}
		</main>
  );
}