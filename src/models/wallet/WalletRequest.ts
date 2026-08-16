import type { WalletType } from "../../types/WalletType"

export interface WalletRequest {
	id?: string | null,
	name: string,
	description?: string,
	balance: number,
	cardDigits: string | null,
	type: WalletType,
	color?: string
	goalId?: string,
	bankId?: string | null,
	accountId: string
}