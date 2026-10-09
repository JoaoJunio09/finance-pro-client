const InstallmentPlanStatus = {
	PAYING: 'PAYING',
	INVOICED: 'INVOICED',
	PAID: 'PAID',
	EXPIRED: 'EXPIRED'
} as const;

export type InstallmentPlanStatus = typeof InstallmentPlanStatus[keyof typeof InstallmentPlanStatus];