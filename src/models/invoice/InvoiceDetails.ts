import type { InvoiceStatus } from './InvoiceResponse';

export interface InvoiceInstallment {
  id: string;
  installmentPlanId: string;
  description: string;
  value: number;
  paid: boolean;
  month: number;
  year: number;
}

export interface InvoiceDetails {
  invoiceId: string;
  closingDate: string | null;
  expirationDate: string | null;
  status: InvoiceStatus;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  installments: InvoiceInstallment[];
}
