const FrequencyType = {
	MONTHLY: 'MONTHLY',
	BIWEEKLY: 'BIWEEKLY',
	YEARLY: 'YEARLY',
} as const;

export type FrequencyType = typeof FrequencyType[keyof typeof FrequencyType];