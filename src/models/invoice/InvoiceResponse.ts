export type InvoiceStatus = 'PAYING' | 'PAID' | 'EXPIRED';

export interface InvoiceResponse {
  id: string;
  limit: number | null;
  status: InvoiceStatus;
  closingDate: string | null;
  expirationDate: string | null;
  daysUntilExpiration: number | null;
}
