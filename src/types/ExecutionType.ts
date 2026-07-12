const ExecutionType = {
	CREDIT: 'AUTOMATIC',
	DEBIT: 'MANUALLY'
} as const;

export type ExecutionType = typeof ExecutionType[keyof typeof ExecutionType];