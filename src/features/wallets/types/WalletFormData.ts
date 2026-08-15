import type { BankResponse } from "../../../models/bank/BankResponse";

export interface WalletFormData {
	id: string;
	name: string;
	description: string;
	balance: string;
	cardDigits: string;
	type: string;
	color?: string;
	goalId?: string;
	accountId: string;
	bank?: BankResponse;
}