export interface WalletRequest {
	id?: string | null,
	name: string,
	description?: string,
	balance: number,
	cardDigits: string,
	goalId?: string,
	bankId?: string | null,
	accountId: string
}