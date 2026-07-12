import { CheckCircle2 } from "lucide-react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

export interface RecurrenceCardProps {
	type: 'overdue' | 'today',
	recurrence: RecurrenceResponse
}

function RecurrenceCard({
	type,
	recurrence
}: RecurrenceCardProps) {
	return (
		<div
			key={recurrence.id}
			className="flex flex-row justify-between items-center p-[10px] rounded-[12px]"
			style={{ backgroundColor: 'rgba(17,17,19,0.5)' }}
		>
			<div className="flex flex-col min-w-0 pr-[8px]">
				<span className="font-['Inter'] text-[13px] font-medium text-[#FFFFFF] truncate">{recurrence.description}</span>
				<span className={`
					font-['Inter'] text-[10px]
					${type === "today" ? 'text-[#FBBF24]' : 'text-[#F87171]'}
				`}>
					{type === 'today' ? (
						'Vence Hoje'
					) : (
						`Atrasada há ${new Date().getDate() - recurrence.dayOne} dias`
					)}
					
				</span>
			</div>
			<div className="flex items-center gap-[10px] flex-shrink-0">
				<span className="font-['Outfit'] text-[13px] font-bold tabular-nums text-white">
					{recurrence.type === 'CREDIT' ? '+' : '−'}{formatCurrencyLabel(recurrence.amount)}
				</span>
				<button 
					className="w-[28px] h-[28px] rounded-lg flex items-center justify-center transition-all hover:-translate-y-[1px] hover:scale-105 active:scale-95" 
					title="Confirmar recebimento/pagamento" 
					style={{ backgroundColor: 'rgba(52,211,153,0.10)' }} 
					onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.20)'} 
					onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(52,211,153,0.10)'}
				>
					<CheckCircle2 size={14} color="#34D399" />
				</button>
			</div>
		</div>
	)
}

export default RecurrenceCard;