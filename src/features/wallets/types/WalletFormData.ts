import type { InvoiceResponse } from "../../../models/invoice/InvoiceResponse";
import type { BankResponse } from "../../../models/bank/BankResponse";
import type { WalletType } from "../../../types/WalletType";

export interface WalletFormData {
	id: string;
	name: string;
	description: string;
	balance: string;
	cardDigits?: string;
	type: WalletType;
	invoices: InvoiceResponse[];
	color?: string;
	goalId?: string;
	bank?: BankResponse;
	accountId: string;
	invoiceId?: string;
	creditLimit: string;
	closingDate: string;
	expirationDate: string;
}
