import { AlertCircle, Clock } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import RecurrenceCard from "./RecurrenceCard";

interface RecurrencesTodayListProps {
	recurrences: RecurrenceResponse[]
}

function RecurrencesTodayList({
	recurrences
}: RecurrencesTodayListProps) {
	return (
		<div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
			<div className="flex items-center gap-[8px] mb-[12px]">
				<Clock size={15} color="#FBBF24" />
				<span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#FBBF24]">Pendentes Hoje</span>
				<span className="ml-auto bg-[#FBBF2426] text-[#FBBF24] font-['Inter'] text-[11px] font-bold px-[8px] py-[2px] rounded-full">
					{recurrences.length}
				</span>
			</div>
			<p className="font-['Inter'] text-[10px] text-zinc-500 mb-[12px]">Vencimento no dia de hoje</p>
			
			<div className="flex flex-col gap-[8px]">
				{recurrences.map(recurrence => (
					<RecurrenceCard type="today" recurrence={recurrence} />
				))}
			</div>
		</div>
	)
}

export default RecurrencesTodayList;