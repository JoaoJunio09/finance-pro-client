import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { TransactionStatus } from "../../../types/TransactionStatus";
import type { TransactionType } from "../../../types/TransactionType";

export interface TxFormData {
	id?: string;
	amount: string;
	description: string;
	date: string;
	time: string;
	type: TransactionType;
	status: TransactionStatus;
	category?: CategoryResponse;
	wallet?: WalletResponse;
}