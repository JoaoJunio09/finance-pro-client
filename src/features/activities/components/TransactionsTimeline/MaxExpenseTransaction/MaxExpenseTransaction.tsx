import { Award, TrendingDown } from "lucide-react";
import type { TransactionResponse } from "../../../../../models/transaction/TransactionResponse";
import { formatRelativeDateTime } from "../../../../../utils/FormatDate";
import { renderWalletBadge } from "../../../utils/renderWalletBadge";

import styles from '../TransactionsTimeline.module.css';

interface MaxExpenseTransactionProps {
	transaction: TransactionResponse;
	onSelectTransaction: (transaction: TransactionResponse) => void;
}

function MaxExpenseTransaction({
	transaction,
	onSelectTransaction
}: MaxExpenseTransactionProps) {
	return (
		<div className="flex flex-col">
			<span className={`text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 ${styles.textExpenseValue}`}>
				<Award size={14} /> Maior Despesa do Mês
			</span>
			<div
				className={`p-5 flex flex-col cursor-pointer rounded-3xl relative z-[1] ${styles.txCard} ${styles.auraExpense}`}
				onClick={() => onSelectTransaction(transaction)}
			>
				<div className="flex items-center gap-4 relative z-[2]">
					<div
						className="flex items-center justify-center flex-shrink-0 rounded-2xl w-12 h-12"
						style={{ backgroundColor: `${transaction.category.color}15`, color: transaction.category.color }}
					>
						<TrendingDown size={20} />
					</div>
					<div className="flex-1">
						<h4 className={`text-sm font-medium mb-1.5 ${styles.txTitle}`}>{transaction.description}</h4>
						<div className={`flex items-center gap-2.5 flex-wrap text-xs font-medium ${styles.txMeta}`}>
							<span>{formatRelativeDateTime(transaction.registeredAt)}</span>
							<span className={styles.metaSeparator}>•</span>
							{renderWalletBadge(
								transaction.wallet.bank ? transaction.wallet.bank.gradient : null,
								transaction.wallet.bank ? transaction.wallet.bank.color : null,
								transaction.wallet.name,
							)}
						</div>
					</div>
					<div className="text-right flex-shrink-0">
						<span className={`text-base font-semibold tracking-tight ${styles.textExpenseValue}`}>
							- R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MaxExpenseTransaction;