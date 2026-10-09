export type CreditCardBillStatus = 'PAID' | 'PENDING' | 'DUE_SOON' | 'EXPIRED';

export interface CreditCardBillInstallment {
  id: string;
  installmentPlanId: string;
  description: string;
  value: number;
  paid: boolean;
  month: number;
  year: number;
}

export interface CreditCardBill {
  walletId: string;
  closingDate: string;
  expirationDate: string;
  status: CreditCardBillStatus;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  installments: CreditCardBillInstallment[];
}
