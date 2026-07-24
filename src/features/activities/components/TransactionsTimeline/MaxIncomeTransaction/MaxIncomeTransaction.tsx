import { Award, TrendingUp } from "lucide-react";
import type { TransactionResponse } from "../../../../../models/transaction/TransactionResponse";
import { formatRelativeDateTime } from "../../../../../utils/FormatDate";
import { renderWalletBadge } from "../../../utils/renderWalletBadge";

import styles from '../TransactionsTimeline.module.css';

interface MaxIncomeTransactionProps {
	transaction: TransactionResponse;
	onSelectTransaction: (transaction: TransactionResponse) => void;
}

function MaxIncomeTransaction({
	transaction,
	onSelectTransaction
}: MaxIncomeTransactionProps) {
	return (
		 <div className="flex flex-col">
				<span className={`text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5 ${styles.textIncome}`}>
					<Award size={14} /> Maior Receita do Mês
				</span>
				<div
					className={`p-5 flex flex-col cursor-pointer rounded-3xl relative z-[1] ${styles.txCard} ${styles.auraIncome}`}
					onClick={() => onSelectTransaction(transaction)}
				>
					<div className="flex items-center gap-4 relative z-[2]">
						<div
							className="flex items-center justify-center flex-shrink-0 rounded-2xl w-12 h-12"
							style={{ backgroundColor: `${transaction.category.color}15`, color: transaction.category.color }}
						>
							<TrendingUp size={20} />
						</div>
						<div className="flex-1">
							<h4 className={`text-sm font-medium mb-1.5 ${styles.txTitle}`}>{transaction.description}</h4>
							<div className={`flex items-center gap-2.5 flex-wrap text-xs font-medium ${styles.txMeta}`}>
								<span>{formatRelativeDateTime(transaction.registeredAt)}</span>
								<span className={styles.metaSeparator}>•</span>
								{renderWalletBadge(
									transaction.wallet.bank ? transaction.wallet.bank.gradient : null,
									transaction.wallet.bank ? transaction.wallet.bank.color : null,
									transaction.wallet.name
								)}
							</div>
						</div>
						<div className="text-right flex-shrink-0">
							<span className={`text-base font-semibold tracking-tight ${styles.textIncome}`}>
								+ R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
							</span>
						</div>
					</div>
				</div>
			</div>
	)
}

export default MaxIncomeTransaction;