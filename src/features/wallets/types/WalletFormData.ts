import type { BankResponse } from "../../../models/bank/BankResponse";
import type { WalletType } from "../../../types/WalletType";

export interface WalletFormData {
	id: string;
	name: string;
	description: string;
	balance: string;
	cardDigits?: string;
	type: WalletType;
	closingDate: string;
	daysUntilExpiration?: number;
	expirationDate?: string;
	color?: string;
	goalId?: string;
	bank?: BankResponse;
	accountId: string;
}