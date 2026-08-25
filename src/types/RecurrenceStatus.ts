const RecurrenceStatus = {
	ACTIVE: 'ACTIVE',
	PAUSED: 'PAUSED',
	ENDED: 'ENDED'
} as const;

export type RecurrenceStatus = typeof RecurrenceStatus[keyof typeof RecurrenceStatus];