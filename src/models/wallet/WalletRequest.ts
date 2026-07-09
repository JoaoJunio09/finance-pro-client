export interface WalletRequest {
	id?: string | null,
	name: string,
	description?: string,
	balance: number,
	cardDigits: string | null,
	goalId?: string,
	bankId?: string | null,
	accountId: string
}