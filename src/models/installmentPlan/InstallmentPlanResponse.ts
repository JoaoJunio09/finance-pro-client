import type { InstallmentPlanStatus } from "../../types/InstallmentPlanStatus";
import type { InstallmentResponse } from "../installment/InstallmentResponse";
import type { WalletResponse } from "../wallet/WalletResponse";

export interface InstallmentPlanResponse {
	id: string;
	description: string;
	value: number;
	times: number;
	fees: number;
	startDate: string;
	endDate: string;
	status: InstallmentPlanStatus;
	wallet: WalletResponse;
	installments: InstallmentResponse[];
}