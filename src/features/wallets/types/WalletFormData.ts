import type { BankResponse } from "../../../models/bank/BankResponse";
import type { WalletType } from "../../../types/WalletType";

export interface WalletFormData {
	id: string;
	name: string;
	description: string;
	balance: string;
	cardDigits: string;
	type: WalletType;
	color?: string;
	goalId?: string;
	accountId: string;
	bank?: BankResponse;
}