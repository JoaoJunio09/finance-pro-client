import type { InstallmentPlanStatus } from "../../types/InstallmentPlanStatus";
import type { InstallmentResponse } from "../installment/InstallmentResponse";
import type { InvoiceResponse } from "../invoice/InvoiceResponse";

export interface InstallmentPlanResponse {
	id: string;
	description: string;
	value: number;
	times: number;
	fees: number;
	startDate: string;
	endDate: string;
	status: InstallmentPlanStatus;
	invoice: InvoiceResponse;
	installments: InstallmentResponse[];
}
