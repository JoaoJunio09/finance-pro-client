import { CheckCircle2, Pen, Repeat, Tag, TimerIcon, Trash2, TypeOutline, Wallet, X } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';

import type { TransactionResponse } from '../../../../models/transaction/TransactionResponse';
import { formatRelativeDateTime } from '../../../../utils/FormatDate';
import { renderWalletBadge } from '../../utils/renderWalletBadge';

import styles from './TransactionDetails.module.css';

interface TransactionDetailsProps {
  transactionSelected: TransactionResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (transaction: TransactionResponse) => void;
  onDelete?: (transaction: TransactionResponse) => void;
}

export function TransactionDetails({
  transactionSelected,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: TransactionDetailsProps) {
  if (!transactionSelected) {
    return null;
  }

  const isCredit = transactionSelected.type === 'CREDIT';

  return (
    <>
      <div
        className={`${styles.backdrop} ${
          !isOpen ? styles.backdropClosing : ''
        }`}
        onClick={onClose}
      />

      <aside
        className={`${styles.detailsPanel} ${
          !isOpen ? styles.panelClosing : ''
        }`}
      >
        <div className="flex flex-col h-full px-6 py-8 md:px-10 md:py-10">

          <div
            className={styles.mobileDragHandle}
            onClick={onClose}
          >
            <div className={styles.handleBar} />
          </div>

          <header className={styles.panelHeader}>
            <div className="flex flex-col gap-1">
              <span className={styles.categoryBadgeTag}>
                Detalhes da Transação
              </span>

              <h2 className={styles.panelTitle}>
                {transactionSelected.description}
              </h2>

              <p className={styles.panelSubtitle}>
                {formatRelativeDateTime(
                  transactionSelected.registeredAt
                )}
              </p>
            </div>

            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fechar detalhes"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 flex flex-col gap-6 overflow-y-auto my-6">

            <div className={styles.amountContainer}>
              {transactionSelected.recurrenceId && (
                <div className={styles.recurrenceBadge}>
                  <Repeat size={12} />
                  Recorrência
                </div>
              )}

              <span className={styles.amountLabel}>
                Valor Total
              </span>

              <span
                className={`${styles.amountValue} ${
                  isCredit
                    ? styles.creditAmount
                    : styles.debitAmount
                }`}
              >
                {isCredit ? '+' : '-'} R${' '}
                {transactionSelected.amount.toLocaleString(
                  'pt-BR',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </span>

              <span className={styles.statusPill}>
                <CheckCircle2
                  size={13}
                  className="text-[var(--color-success)]"
                />
                Efetivada
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className={styles.infoCard}>
                <span className={styles.infoCardLabel}>
                  <Tag size={14} />
                  Categoria
                </span>

                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={styles.categoryIconCircle}
                    style={{
                      backgroundColor:
                        `${transactionSelected.category.color}18`,
                      color:
                        transactionSelected.category.color,
                    }}
                  >
                    <DynamicIcon
                      name={
                        transactionSelected.category.icon as IconName
                      }
                      size={14}
                    />
                  </div>

                  <span className={styles.infoCardValue}>
                    {transactionSelected.category.name}
                  </span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <span className={styles.infoCardLabel}>
                  <Wallet size={14} />
                  Carteira
                </span>

                <div className="flex items-center gap-2 mt-1">
                  {renderWalletBadge(
                    transactionSelected.wallet.bank.gradient,
                    transactionSelected.wallet.bank.color,
                    transactionSelected.wallet.name,
                  )}
                </div>
              </div>

							<div className={styles.infoCard}>
                <span className={styles.infoCardLabel}>
                  <TimerIcon size={14} />
                  Data e hora
                </span>

                <div className="flex items-center gap-2 mt-1">
                  <p className={`font-medium text-sm ${styles.dateTimeLabel}`}>{formatRelativeDateTime(transactionSelected.registeredAt)}</p>
                </div>
              </div>

							<div className={styles.infoCard}>
                <span className={styles.infoCardLabel}>
                  <TypeOutline size={14} />
                  Tipo
                </span>

                <div className="flex items-center gap-2 mt-1">
                  <p className={`font-semibold text-sm ${transactionSelected.type === 'CREDIT' ? 'text-emerald-500' : 'text-red-500'}`}>
										{transactionSelected.type}
									</p>
                </div>
              </div>

            </div>
          </div>

          <footer className={styles.panelFooter}>
            <button
              className={`${styles.actionBtn} ${styles.editBtn}`}
              onClick={() =>
                onEdit?.(transactionSelected)
              }
            >
              <Pen size={16} />
              Editar
            </button>

            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={() =>
                onDelete?.(transactionSelected)
              }
            >
              <Trash2 size={16} />
              Excluir
            </button>
          </footer>

        </div>
      </aside>
    </>
  );
}

export default TransactionDetails;