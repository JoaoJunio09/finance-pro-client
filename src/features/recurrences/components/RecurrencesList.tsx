import { Pencil, RefreshCw, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { FrequencyType } from "../../../types/FrequencyType";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const getFrequencyLabel = (frequencyType: FrequencyType) => {
	switch (frequencyType) {
		case 'MONTHLY': return 'Mensal';
		case 'BIWEEKLY': return 'Quinzenal';
		case 'YEARLY': return 'Anual';
		default: return '';
	}
};

const getOccurrenceText = (recurrence: RecurrenceResponse) => {
	switch (recurrence.frequencyType) {
		case 'MONTHLY':
			return `Todo dia ${recurrence.dayOne}`;
		case 'BIWEEKLY':
			return `Dias ${recurrence.dayOne} e ${recurrence.dayTwo}`;
		case 'YEARLY':
			return `${recurrence.dayOne} de ${recurrence.monthOfTheYear ? MONTHS_PT[recurrence.monthOfTheYear - 1] : ''}`;
		default:
			return '';
	}
};

interface RecurrenceCardProps {
	recurrence: RecurrenceResponse;
	onEdit: (recurrence: RecurrenceResponse | null) => void;
	onDelete: (id: string) => void;
}

const RecurrenceCardToList = ({
	recurrence,
	onEdit,
	onDelete
}: RecurrenceCardProps) => {
	const isIncome = recurrence.type === 'CREDIT';
	const isPaused = recurrence.active === false;
	const Icon = isIncome ? TrendingUp : TrendingDown;
	const iconColor = isPaused ? '#71717A' : isIncome ? '#34D399' : '#F87171';
	const iconBg = isPaused ? 'rgba(255,255,255,0.04)' : isIncome ? 'rgba(52,211,153,0.10)' : 'rgba(248,113,113,0.10)';

	return (
		<div
			className={`flex flex-col sm:flex-row justify-between sm:items-center py-[16px] px-[20px] transition-colors duration-150 gap-[12px] sm:gap-[16px] ${isPaused ? 'opacity-50' : ''}`}
			style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
			onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
			onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
		>
			{/* Top/Left Mobile/Desktop: Icon + Info */}
			<div className="flex items-center gap-[14px] flex-1 min-w-0">
				<div className="w-[40px] h-[40px] rounded-xl flex-shrink-0 flex items-center justify-center transition-colors" style={{ backgroundColor: iconBg }}>
					<Icon size={18} color={iconColor} />
				</div>

				<div className="flex-1 min-w-0 flex flex-col">
					<div className="flex flex-row justify-between items-center gap-[8px]">
						<span className="font-['Inter'] text-[14px] font-semibold text-[#FFFFFF] truncate">
							{recurrence.description}
						</span>
						{/* Valor Mobile */}
						<span className="sm:hidden font-['Outfit'] text-[15px] font-bold tabular-nums flex-shrink-0" style={{ color: iconColor }}>
							{isIncome ? '+' : '−'}{formatCurrencyLabel(recurrence.amount)}
						</span>
					</div>

					<div className="flex flex-row gap-[8px] items-center mt-[4px] flex-wrap">
						<span className="font-['Inter'] text-[10px] font-semibold rounded-md px-[8px] py-[2px]" 
									style={{ backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
							{getFrequencyLabel(recurrence.frequencyType)}
						</span>
						<span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
						<span className="font-['Inter'] text-[11px] text-zinc-500">{getOccurrenceText(recurrence)}</span>
						<span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
						<span className="font-['Inter'] text-[11px] text-zinc-500">{recurrence.category.name}</span>
						<span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
						<span className="font-['Inter'] text-[11px] text-zinc-500 truncate">Conta Corrente</span>
						<span className="text-zinc-600 font-bold text-[14px] leading-none">·</span>
						<span className="font-['Inter'] text-[10px] text-zinc-600 uppercase tracking-widest">{recurrence.executionType === 'AUTOMATIC' ? 'Automática' : 'Manual'}</span>
					</div>
				</div>
			</div>

			{/* Bottom/Right Mobile/Desktop: Desktop Value + Divider + Actions */}
			<div className="flex items-center justify-end flex-shrink-0 gap-[8px]">
				{/* Valor Desktop */}
				<span className="hidden sm:block font-['Outfit'] text-[15px] font-bold tabular-nums pr-[4px]" style={{ color: iconColor }}>
					{isIncome ? '+' : '−'}{formatCurrencyLabel(recurrence.amount)}
				</span>
				
				<div className="hidden sm:block w-[1px] h-[32px] bg-white/[0.08] mx-[4px]" />
				
				{/* AÇÕES SEMPRE VISÍVEIS */}
				<div className="flex flex-row gap-[4px] flex-shrink-0">
					{/* <button 
						// onClick={(e) => { e.stopPropagation(); togglePause(rec.id); }}
						className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none hover:bg-white/[0.06]"
						title={false ? "Retomar" : "Pausar"}
					>
						{false ? <Play size={13} color="#34D399" /> : <Pause size={13} color="#71717A" />}
					</button> */}
					<button 
						onClick={(e) => {
							e.stopPropagation();
							onEdit(recurrence);
						}}
						className="cursor-pointer w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none hover:bg-white/[0.06] group/btn"
						title="Editar"
					>
						<Pencil size={13} className="text-zinc-500 group-hover/btn:text-zinc-300 transition-colors" />
					</button>
					<button 
						onClick={(e) => {
							e.stopPropagation();
							onDelete(recurrence.id);
						}}
						className="cursor-pointer w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none bg-[#F871710F] hover:bg-[#F871711F]"
						title="Remover"
					>
						<Trash2 size={13} color="#F87171" />
					</button>
				</div>
			</div>

		</div>
	)
}

interface RecurrencesListProps {
	recurrences: RecurrenceResponse[];
	onEdit: (recurrence: RecurrenceResponse | null) => void;
	onDelete: (id: string) => void;
}

function RecurrencesList({
	recurrences,
	onEdit,
	onDelete
} : RecurrencesListProps) {
	return (
		<div
			className="w-full rounded-[24px] overflow-hidden" 
			style={{
				background: 'linear-gradient(to bottom right, #111113, #151518)',
				border: '1px solid rgba(255,255,255,0.06)',
				boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
			}}
		>
			
			<div className="grid grid-cols-1 gap-0">
				{recurrences.length > 0 ? (
					recurrences.map((rec) => (
						<RecurrenceCardToList
							key={rec.id}
							recurrence={rec}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))
				) : (
					<div className="col-span-1 py-[56px] px-[24px] flex flex-col items-center justify-center text-center">
						<div className="w-[48px] h-[48px] rounded-2xl flex items-center justify-center mb-[14px]" style={{ backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
							<RefreshCw size={22} color="#8B5CF6" />
						</div>
						<h3 className="font-['Outfit'] text-[15px] font-semibold text-[#FFFFFF]">Nenhuma recorrência encontrada</h3>
						<p className="font-['Inter'] text-[13px] text-zinc-500 mt-[4px] max-w-[280px]">
							Nenhuma recorrência corresponde aos filtros ativos.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default RecurrencesList;