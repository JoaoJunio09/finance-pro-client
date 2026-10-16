export type FinancialHealthStatus = 'EXCELLENT' | 'VERY_GOOD' | 'GOOD' | 'FAIR' | 'CRITICAL';

export interface FeedbackFinancialHealth {
	text: string;
	status: 'positive' | 'neutral' | 'alert';
}

export interface FinancialHealthResponse {
	score: number;
	status: FinancialHealthStatus;
	identifiedStrengths: FeedbackFinancialHealth[];
	optimizationPointsIdentified: FeedbackFinancialHealth[];
}