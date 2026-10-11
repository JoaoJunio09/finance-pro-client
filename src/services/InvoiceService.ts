import type { InvoiceDetails } from '../models/invoice/InvoiceDetails';
import api from './api';

export default class InvoiceService {
  private readonly baseUrl = '/api/invoices/v1';
  private readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private get headers() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async getDetails(invoiceId: string, signal?: AbortSignal) {
    const response = await api.get<InvoiceDetails>(
      `${this.baseUrl}/${invoiceId}/credit-card-bill`,
      { headers: this.headers, signal }
    );
    return response.data;
  }

  async payInvoice(invoiceId: string, paymentWalletId: string) {
    const response = await api.patch<InvoiceDetails>(
      `${this.baseUrl}/${invoiceId}/credit-card-bill`,
      { paymentWalletId },
      { headers: this.headers }
    );
    return response.data;
  }

  async payInstallment(invoiceId: string, installmentId: string, paymentWalletId: string) {
    const response = await api.patch<InvoiceDetails>(
      `${this.baseUrl}/${invoiceId}/credit-card-bill/installments/${installmentId}`,
      { paymentWalletId },
      { headers: this.headers }
    );
    return response.data;
  }
}
