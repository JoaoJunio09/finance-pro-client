const WalletType = {
	CHECKING: 'CHECKING',
	SAVING: 'SAVING',
	CREDIT_CARD: 'CREDIT_CARD',
	RESERVE: 'RESERVE',
	INVESTMENTS: 'INVESTMENTS',
	PHYSICAL: 'PHYSICAL',
	OTHER: 'OTHER',
} as const;

export type WalletType = typeof WalletType[keyof typeof WalletType];