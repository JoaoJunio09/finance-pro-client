export interface WalletRequest {
	name: string,
	description: string,
	balance: number,
	goalId?: string,
	account: string
}