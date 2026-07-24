import { Repeat, Zap } from "lucide-react";

import styles from '../TransactionsTimeline.module.css';

interface EmptyStateProps {
	title: string;
	message: string;
	type: 'transaction' | 'recurrence';
}

function EmptyState({
	title,
	message,
	type
}: EmptyStateProps) {
	return (
		<div className={`flex flex-col items-center justify-center py-20 px-6 text-center rounded-3xl ${styles.emptyState}`}>
			<div className={`flex items-center justify-center mb-6 w-16 h-16 rounded-full ${styles.emptyIconCircle}`}>
				{type === 'transaction' ? (
					<Zap size={28} className={styles.emptyIcon} />
				) : ( 
					<Repeat size={24} className={`mb-2 ${styles.emptyIcon}`} />
				)}
			</div>
			<p className={`font-medium text-lg mb-2 ${styles.emptyTitle}`}>{title}</p>
			<p className={`text-sm max-w-[240px] mx-auto ${styles.emptyDesc}`}>{message}</p>
		</div>
	)
}

export default EmptyState;