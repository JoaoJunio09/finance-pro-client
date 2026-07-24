import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { RecurrenceResponse } from "../../../../../models/recurrence/RecurrenceResponse";
import { formatRelativeDateTime } from "../../../../../utils/FormatDate";
import { renderWalletBadge } from "../../../utils/renderWalletBadge";

import styles from '../TransactionsTimeline.module.css';

interface CardProps {
	recurrence: RecurrenceResponse;
	selectedDate: string | null;
}

const Card = ({
	recurrence,
	selectedDate
}: CardProps) => {
	return (
		<div key={recurrence.id} className={`p-5 rounded-3xl relative z-[1] ${styles.txCard} ${styles.auraRecurring}`}>
			<div className="flex items-center gap-4 relative z-[2]">
				<div
					className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-2xl"
					style={{ backgroundColor: `${recurrence.category.color}15`, color: recurrence.category.color }}
				>
					<DynamicIcon name={recurrence.category.icon as IconName} size={20} />
				</div>
				<div className="flex-1">
					<h4 className={`text-sm font-medium mb-1.5 ${styles.txTitle}`}>{recurrence.description}</h4>
					<div className={`flex items-center gap-2.5 flex-wrap text-xs font-medium ${styles.txMeta}`}>			
						{recurrence.lastExecutionDate && recurrence.lastExecutionDate === selectedDate ? (
							<>
								<span className={styles.metaSeparator}>•</span>
								<span>{formatRelativeDateTime(recurrence.lastExecutionDate)}</span>
							</>
						) : (
							<>
								<span className={styles.metaSeparator}>•</span>
								<span>{formatRelativeDateTime(recurrence.nextExecutionDate)}</span>
							</>
						)}
						<span className={styles.metaSeparator}>•</span>
						<span>{recurrence.category.name}</span>
						<span className={styles.metaSeparator}>•</span>
						{renderWalletBadge(
							recurrence.wallet.bank ? recurrence.wallet.bank.gradient: null,
							recurrence.wallet.bank ? recurrence.wallet.bank.color: null,
							recurrence.wallet.name,
						)}
					</div>
				</div>
				<div className="flex-shrink-0 text-right">
					<span className={`text-base font-semibold tracking-tight ${styles.textRecurring}`}>
						R$ {recurrence.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
					</span>
				</div>
			</div>
		</div>
	)
}

interface RecurrenceListProps {
	recurrences: RecurrenceResponse[];
	selectedDate: string | null;
}

function RecurrenceList({
	recurrences,
	selectedDate
}: RecurrenceListProps) {
	return (
		<div className="flex flex-col gap-4 pb-20">
			{recurrences.map((recurrence) => {
				return (
					<Card
						key={recurrence.id}
						recurrence={recurrence}
						selectedDate={selectedDate}
					/>
				);
			})}
		</div>
	)
}

export default RecurrenceList;