import type { TransactionSummary } from "../transaction/TransactionSummary";
import type { WalletResponse } from "./WalletResponse";

export interface WalletDetailsResponse {
	income: number,
	expenses: number,
	wallet: WalletResponse,
	transactions: TransactionSummary[]
}