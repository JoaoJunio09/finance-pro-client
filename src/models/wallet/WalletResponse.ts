import type { BankResponse } from "../bank/BankResponse";

export interface WalletResponse {
	id: string,
	name: string,
	description: string,
	cardDigits: string,
	balance: number,
	bank: BankResponse
}