export interface InstallmentResponse {
	id: string;
	value: number;
	isPaid: boolean;
	month: number;
	year: number;
}