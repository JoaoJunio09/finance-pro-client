import { CalendarClock } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

/**
 * Parseia uma data no formato "YYYY-MM-DD" (LocalDate do backend) como data LOCAL,
 * evitando o bug clássico de `new Date("YYYY-MM-DD")` interpretar como UTC e
 * "voltar um dia" em fusos negativos (ex: Brasil, UTC-3).
 */
const parseLocalDate = (isoDate: string): Date => {
	const [year, month, day] = isoDate.split('-').map(Number);
	return new Date(year, month - 1, day);
};

const formatUpcoming = (nextExecutionDate: string): { relative: string; formatted: string } => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const next = parseLocalDate(nextExecutionDate);
	next.setHours(0, 0, 0, 0);

	const diffDays = Math.round((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

	const relative =
		diffDays <= 0 ? 'Hoje' :
		diffDays === 1 ? 'Amanhã' :
		`Em ${diffDays} dias`;

	const formatted = next
		.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
		.replace('.', '');

	return { relative, formatted };
};

interface RecurrenceCardToUpcomingListProps {
	recurrence: RecurrenceResponse
}

const RecurrenceCardToUpcomingList = ({
	recurrence
}: RecurrenceCardToUpcomingListProps) => {
	const { relative, formatted } = formatUpcoming(recurrence.nextExecutionDate);

	return (
		<div className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
			<div className="flex flex-col min-w-0 pr-[8px]">
				<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">
					{recurrence.description}
				</span>
				<span className="font-['Inter'] text-[10px] text-[#C4B5FD]">
					{relative} — {formatted}
				</span>
			</div>
			<span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white flex-shrink-0">
				{recurrence.type === 'CREDIT' ? '+' : '−'}{formatCurrencyLabel(recurrence.amount)}
			</span>
		</div>
	)
}

interface RecurrencesUpcomingListProps {
	recurrences: RecurrenceResponse[]
}

function RecurrencesUpcomingList({
	recurrences
}: RecurrencesUpcomingListProps) {
	return (
		<div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)' }}>
			<div className="flex items-center gap-[8px] mb-[12px]">
				<CalendarClock size={15} color="#8B5CF6" />
				<span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#8B5CF6]">Próximos 7 dias</span>
			</div>
			
			{recurrences.length > 0 ? (
				<div className="flex flex-col gap-[8px]">
					{recurrences.map(recurrence => (
						<RecurrenceCardToUpcomingList key={recurrence.id} recurrence={recurrence} />
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center text-center py-[20px]">
					<p className="font-['Inter'] text-[12px] text-zinc-500">Nenhuma recorrência nos próximos 7 dias.</p>
				</div>
			)}
		</div>
	)
}

export default RecurrencesUpcomingList;