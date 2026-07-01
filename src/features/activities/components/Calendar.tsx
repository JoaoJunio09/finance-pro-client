import type { CalendarDay } from "../types/CalendarDay";

interface CalendarProps {
	calendarDays: CalendarDay[];
	isCurrentMonthView: boolean;
	selectedDate: string | null;
	setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

function Calendar({
	calendarDays,
	isCurrentMonthView,
	selectedDate,
	setSelectedDate
}: CalendarProps) {
	const currentDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

	return (
		<div className="w-full flex flex-col min-w-0 animate-slide-up delay-100 flex-1 mb-16">
			<div className="w-full border border-white/[0.06] rounded-2xl sm:rounded-[32px] overflow-hidden bg-[#0e0e11]/80 backdrop-blur-xl shadow-2xl flex flex-col">
				
				{/* Headers de Semana */}
				<div className="grid grid-cols-7 border-b border-white/[0.06] bg-[#111113]/80 text-center py-3 sm:py-4 font-semibold text-zinc-400 text-[10px] sm:text-xs tracking-wider uppercase">
					<div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div>
				</div>

				{/* Grid de Dias */}
				<div className="grid grid-cols-7 bg-white/[0.04] gap-[1px]">
					{calendarDays.map((item, idx) => {
						if (!item.date) {
							return <div key={`empty-${idx}`} className="bg-[#09090B] min-h-[60px] sm:min-h-[120px] md:min-h-[140px] opacity-40"></div>;
						}

						const isToday = item.date === currentDate;
						const hasFuture = (item.futureTotal ? item.futureTotal > 0 : false);
						const isSelected = selectedDate === item.date;

						return (
							<div
								key={item.date}
								onClick={() => setSelectedDate(item.date)}
								className={`
									relative flex flex-col p-1 sm:p-2.5 md:p-4 min-h-[70px] sm:min-h-[120px] md:min-h-[140px] bg-[#09090B] 
									transition-all duration-300 cursor-pointer group hover:bg-[#111113] hover:z-10
									${isSelected ? 'ring-2 ring-inset ring-[#8B5CF6] z-10 bg-[#111113]' : ''}
								`}
							>
								{/* Destaque sutil Amarelo para Recorrências Futuras */}
								{hasFuture ? <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500/40"></div> : null}

								{/* Header da Célula: Dia */}
								<div className="flex items-start justify-between w-full relative z-10">
									<div className={`
										flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-[10px] sm:text-xs md:text-sm font-medium
										${isToday ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-zinc-400 group-hover:text-zinc-200'}
									`}>
										{item.date.slice(8, 10)}
									</div>
									
									{/* Status Dots (Mobile Only) */}
									<div className="flex sm:hidden flex-wrap items-center justify-end gap-0.5 max-w-[20px] mt-1 mr-1">
										{(item.inTotal || 0) > 0 ? <div className="w-1 h-1 rounded-full bg-emerald-500"></div> : null}
										{(item.outTotal || 0) > 0 ? <div className="w-1 h-1 rounded-full bg-rose-500"></div> : null}
										{hasFuture ? <div className="w-1 h-1 rounded-full bg-amber-500"></div> : null}
									</div>
								</div>

								{/* Conteúdo Desktop/Tablet */}
								<div className="hidden sm:flex flex-col gap-1 flex-1 w-full min-w-0 mt-2">
									{item.transactions.slice(0, 2).map(tx => (
										<div key={tx.id} className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-zinc-400 truncate">
											<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 
												${tx.type === 'CREDIT' ? 'bg-emerald-500' : 'bg-rose-500'}`} 
											/>	
											<span className={`truncate font-medium ${tx.description === 'future' ? 'text-amber-500/80' : 'text-zinc-300'}`}>
												{tx.description}
											</span>
										</div>
									))}
									{item.transactions.length > 2 ? (
										<div className="text-[9px] md:text-[10px] text-[#8B5CF6] font-semibold pl-3 mt-0.5">
											+{item.transactions.length - 2} mais
										</div>
									) : null}
								</div>

							</div>
						);
					})}
				</div>
			</div>

			{/* Legenda do Calendário */}
			<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-[10px] sm:text-xs text-zinc-500 font-medium animate-slide-up delay-200 px-4">
				<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Receita Concluída</div>
				<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Despesa Concluída</div>
				<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Recorrência Futura</div>
				<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>Dia Atual</div>
			</div>
		</div>
	)
}

export default Calendar;