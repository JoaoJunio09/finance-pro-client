import { CalendarClock } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

interface RecurrenceCardToUpcomingListProps {
	recurrence: RecurrenceResponse
}

const RecurrenceCardToUpcomingList = ({
	recurrence
}: RecurrenceCardToUpcomingListProps) => {
	return (
		<div key={recurrence.id} className="flex flex-row justify-between items-center p-[10px] rounded-[12px]" style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}>
			<div className="flex flex-col min-w-0 pr-[8px]">
				<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">
					{recurrence.description}
				</span>
				<span className="font-['Inter'] text-[10px] text-[#C4B5FD]">
					Em {recurrence.dayOne - new Date().getDate()} dia{recurrence.dayOne - new Date().getDate() > 1 ? 's' : ''} — {recurrence.dayOne} jul
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
						<RecurrenceCardToUpcomingList recurrence={recurrence} />
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