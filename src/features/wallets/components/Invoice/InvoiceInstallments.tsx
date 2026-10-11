import { CheckCircle2, Clock3, ListFilter } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { InvoiceInstallment } from '../../../../models/invoice/InvoiceDetails';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import styles from './Invoice.module.css';

type InstallmentFilter = 'PENDING' | 'PAID' | 'ALL';

interface Props {
  installments: InvoiceInstallment[];
  expired?: boolean;
  onPay?: (installmentId: string) => void;
  filterable?: boolean;
}

const filters: { value: InstallmentFilter; label: string }[] = [
  { value: 'PENDING', label: 'Pendentes' },
  { value: 'PAID', label: 'Pagas' },
  { value: 'ALL', label: 'Todas' },
];

export function InvoiceInstallments({ installments, expired = false, onPay, filterable = false }: Props) {
  const [filter, setFilter] = useState<InstallmentFilter>('PENDING');
  const orderedInstallments = useMemo(
    () => [...installments].sort((first, second) =>
      (first.description || 'Compra parcelada').localeCompare(
        second.description || 'Compra parcelada',
        'pt-BR',
        { sensitivity: 'base' }
      )),
    [installments]
  );
  const visibleInstallments = filterable
    ? orderedInstallments.filter(installment =>
      filter === 'ALL' || (filter === 'PAID' ? installment.paid : !installment.paid))
    : orderedInstallments;

  if (!installments.length) {
    return <p className={styles.empty}>Nenhuma parcela vinculada a este mês de fechamento.</p>;
  }

  return (
    <div>
      {filterable && (
        <div className={styles.installmentToolbar}>
          <div className={styles.installmentFilters} aria-label="Filtrar parcelas deste mês">
            <ListFilter size={16} aria-hidden="true" />
            {filters.map(item => {
              const count = item.value === 'ALL'
                ? installments.length
                : installments.filter(installment => item.value === 'PAID' ? installment.paid : !installment.paid).length;

              return (
                <button
                  key={item.value}
                  type="button"
                  className={styles.installmentFilter}
                  aria-pressed={filter === item.value}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <p>Organizadas de A a Z para você encontrar tudo sem esforço.</p>
        </div>
      )}

      {visibleInstallments.length ? (
        <ul className={styles.installmentList} aria-label="Parcelas da fatura">
          {visibleInstallments.map((installment, index) => {
            const isExpired = !installment.paid && expired;
            return (
              <li
                key={installment.id}
                className={`${styles.installmentRow} ${installment.paid ? styles.installmentRowPaid : isExpired ? styles.installmentRowExpired : styles.installmentRowPending}`}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <span className={styles.installmentStateIcon} aria-hidden="true">
                  {installment.paid ? <CheckCircle2 size={20} /> : <Clock3 size={20} />}
                </span>
                <div className={styles.installmentIdentity}>
                  <h3>{installment.description || 'Compra parcelada'}</h3>
                  <small>Parcela de {String(installment.month).padStart(2, '0')}/{installment.year}</small>
                </div>
                <div className={styles.installmentAmount}>
                  <strong>{formatCurrencyLabel(installment.value)}</strong>
                  <span className={`${styles.status} ${installment.paid ? styles.paid : isExpired ? styles.expired : styles.paying}`}>
                    {installment.paid ? 'Paga' : isExpired ? 'Vencida' : 'Pendente'}
                  </span>
                </div>
                {!installment.paid && onPay && (
                  <button type="button" className={styles.quickPay} onClick={() => onPay(installment.id)}>
                    Registrar pagamento
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.filteredEmpty}>
          <CheckCircle2 size={24} aria-hidden="true" />
          <p>{filter === 'PENDING' ? 'Tudo em dia por aqui. Nenhuma parcela pendente neste ciclo.' : 'Nenhuma parcela neste filtro.'}</p>
        </div>
      )}
    </div>
  );
}
