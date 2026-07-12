import { AlertCircle } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import RecurrenceCard from "./RecurrenceCard";

interface RecurrencesOverdueListProps {
	recurrences: RecurrenceResponse[]
}

function RecurrencesOverdueList({
	recurrences
}: RecurrencesOverdueListProps) {
	return (
		<div className="w-full rounded-[16px] p-[16px] flex flex-col" style={{ backgroundColor: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)' }}>
			<div className="flex items-center gap-[8px] mb-[12px]">
				<AlertCircle size={15} color="#F87171" />
				<span className="font-['Inter'] text-[12px] font-semibold uppercase tracking-widest text-[#F87171]">Em Atraso</span>
				<span className="ml-auto bg-[#F8717126] text-[#F87171] font-['Inter'] text-[11px] font-bold px-[8px] py-[2px] rounded-full">
					{recurrences.length}
				</span>
			</div>
			<p className="font-['Inter'] text-[10px] text-zinc-500 mb-[12px]">Aguardando confirmação manual</p>
			
			<div className="flex flex-col gap-[8px]">
				{recurrences.map(recurrence => (
					<RecurrenceCard type="overdue" recurrence={recurrence} />
				))}
			</div>
		</div>
	)
}

export default RecurrencesOverdueList;