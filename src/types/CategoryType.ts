const CategoryType = {
	CREDIT: 'CREDIT',
	DEBIT: 'DEBIT'
} as const;

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];