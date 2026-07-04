import type { FrequencyType } from "../../../types/FrequencyType";
import type { TransactionModalType } from "./TransactionModalType";

export interface FormData {
	amount: string,
	description: string,
	categoryId: string,
	registeredAt: string,
	type: TransactionModalType,
	walletId?: string,
	toWalletId?: string,
	fromWalletId?: string,
	observation?: string,
	frequency?: FrequencyType,
	recDayOne?: string,
	recDayTwo?: string,
	month?: string
}