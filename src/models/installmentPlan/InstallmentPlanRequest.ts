import type { InstallmentPlanStatus } from "../../types/InstallmentPlanStatus";

export interface InstallmentPlanRequest {
	id?: string;
	description: string;
	value: number;
	times: number;
	fees: number;
	status: InstallmentPlanStatus;
	walletId: string;
}