const TransactionStatus = {
	COMPLETED: 'COMPLETED',
	PENDING: 'PENDING'
} as const;

export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus];