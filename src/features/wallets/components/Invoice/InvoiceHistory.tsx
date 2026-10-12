import { ChevronRight, ReceiptText } from 'lucide-react';
import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { formatCurrencyLabel } from '../../../../utils/FormatCurrency';
import { formatInvoiceDate, formatInvoiceMonth, getInvoiceVisualStatus } from '../../../../utils/invoices';
import useInvoiceHistory from '../../hooks/useInvoiceHistory';
import styles from './Invoice.module.css';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';

interface Props {
  invoices: InvoiceResponse[];
  onSelect: (invoiceId: string) => void;
  onPay: (invoiceId: string) => void;
}

// A API não retornar o histórico de faturas montado, quem está fazendo isso atualmente é o front-end.
// O histórico de faturas está sendo montado com base na coleção que vem junto com WalletResponse,
// então o front-end está montando em ordem (sorted) e organizando com base no status da Fatura.

export function InvoiceHistory({ invoices, onSelect, onPay }: Props) {
  const {
    filter,
		setFilter,
		year,
		setYear,
		years,
		filtered,
    filters
  } = useInvoiceHistory(invoices);

  return (
    <section className={styles.screen} aria-label="Histórico de faturas">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Mês a mês</span>
          <h2>Histórico de faturas</h2>
          <p>Consulte cada ciclo, os valores pagos e as parcelas que compõem a fatura.</p>
        </div>
        <span className={styles.muted}>{invoices.length} fatura(s)</span>
      </div>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Filtrar faturas por situação">
          {filters.map(item => (
            <button key={item.value} type="button" className={styles.filter}
              aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className={styles.selectLabel}>
          Ano do fechamento
          <select className={styles.select} value={year} onChange={event => setYear(event.target.value)}>
            <option value="">Todos os anos</option>
            {years.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>
      <div className={styles.list}>
        {filtered.map(invoice => {
          const isExpired = getInvoiceVisualStatus(invoice) === 'EXPIRED';

          return (
            <article key={invoice.id} className={styles.historyItem}>
              <button
                type="button"
                className={styles.historyDetails}
                onClick={() => onSelect(invoice.id)}
                aria-label={`Ver fatura de ${formatInvoiceMonth(invoice.closingDate)}`}
              >
                <div>
                  <strong>{formatInvoiceMonth(invoice.closingDate)}</strong>
                  <small>Limite do ciclo: {invoice.limit == null ? 'Não informado' : formatCurrencyLabel(invoice.limit)}</small>
                </div>
                <div>
                  <small>Fechamento: {formatInvoiceDate(invoice.closingDate)}</small>
                  <small>Vencimento: {formatInvoiceDate(invoice.expirationDate)}</small>
                </div>
              </button>
              <InvoiceStatusBadge invoice={invoice} />
              {isExpired ? (
                <button type="button" className={`${styles.primary} ${styles.historyPay}`} onClick={() => onPay(invoice.id)}>
                  Pagar fatura
                </button>
              ) : (
                <button type="button" className={styles.historyOpen} onClick={() => onSelect(invoice.id)}>
                  Ver detalhes <ChevronRight size={18} aria-hidden="true" />
                </button>
              )}
            </article>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <ReceiptText size={28} aria-hidden="true" />
          <p>{invoices.length ? 'Nenhuma fatura corresponde aos filtros selecionados.' : 'Este cartão ainda não possui faturas cadastradas.'}</p>
        </div>
      )}
    </section>
  );
}