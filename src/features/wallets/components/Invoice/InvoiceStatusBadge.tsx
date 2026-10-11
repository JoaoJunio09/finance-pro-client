import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { getInvoiceVisualStatus } from '../../../../utils/invoices';
import styles from './Invoice.module.css';

const presentation = {
  PAID: { label: 'Paga', className: styles.paid },
  PAYING: { label: 'Em aberto', className: styles.paying },
  EXPIRED: { label: 'Vencida', className: styles.expired },
  DUE_SOON: { label: 'Vence em breve', className: styles.dueSoon },
};

export function InvoiceStatusBadge({ invoice }: {
  invoice: Pick<InvoiceResponse, 'status' | 'closingDate' | 'expirationDate'>;
}) {
  const status = presentation[getInvoiceVisualStatus(invoice)];
  return <span className={`${styles.status} ${status.className}`}>{status.label}</span>;
}
