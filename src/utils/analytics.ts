import type { FinancialHealthStatus } from "../models/account/financialHealth/FinancialHealthResponse";

export function getFinancialHealthStatus(status: FinancialHealthStatus) {
	if (status === 'EXCELLENT') return 'Excelente';
	else if (status === 'VERY_GOOD') return 'Muito bom';
	else if (status === 'GOOD') return 'Bom';
	else if (status === 'FAIR') return 'Mediano';
	else return 'Crítico';
}