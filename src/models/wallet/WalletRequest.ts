export interface WalletRequest {
	name: string,
	description?: string,
	balance: number,
	goalId?: string,
	bankId?: string | null,
	accountId: string
}