import type { WalletType } from "../../types/WalletType";
import type { BankResponse } from "../bank/BankResponse";

export interface WalletResponse {
	id: string,
	name: string,
	description: string,
	cardDigits: string,
	type: WalletType,
	color: string,
	balance: number,
	bank?: BankResponse
}