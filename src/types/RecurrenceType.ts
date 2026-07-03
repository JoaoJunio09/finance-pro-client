const RecurrenceType = {
	CREDIT: 'CREDIT',
	DEBIT: 'DEBIT'
} as const;

export type RecurrenceType = typeof RecurrenceType[keyof typeof RecurrenceType];