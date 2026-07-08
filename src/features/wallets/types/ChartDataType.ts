import type { BankResponse } from "../../../models/bank/BankResponse";

export type ChartDataType = {
	percentage: number;
	dasharray: string;
	dashoffset: number;
	chartColor: string;
	id: string;
	name: string;
	description: string;
	cardDigits: string;
	balance: number;
	bank: BankResponse;
}[]