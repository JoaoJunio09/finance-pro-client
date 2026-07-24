import { Repeat } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { TransactionResponse } from "../../../../../models/transaction/TransactionResponse";
import { formatRelativeDateTime } from "../../../../../utils/FormatDate";
import { renderWalletBadge } from "../../../utils/renderWalletBadge";

import styles from '../TransactionsTimeline.module.css';

interface CardProps {
	transaction: TransactionResponse;
	onSelectTransaction: (transaction: TransactionResponse) => void;
	isIncome: boolean;
	isTransfer: boolean;
	isRecurring: boolean;
	auraClass: string;
}

const Card = ({
	transaction,
	isIncome,
	isTransfer,
	isRecurring,
	auraClass,
	onSelectTransaction
}: CardProps) => {
	return (
		<div key={transaction.id} className="relative pl-10">
			<div className="absolute left-[5px] top-1/2 -translate-y-1/2 z-[2]">
				<div
					className={`w-2.5 h-2.5 rounded-full ${styles.nodePoint} ${
						isIncome ? styles.nodeInnerIncome : isTransfer ? styles.nodeInnerTransfer : styles.nodeInnerExpense
					}`}
				></div>
			</div>

			<div
				className={`p-5 flex flex-col relative cursor-pointer rounded-3xl z-[1] ${styles.txCard} ${auraClass}`}
				onClick={() => onSelectTransaction(transaction)}
			>

				{isRecurring && (
					<div className={`absolute py-1 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 uppercase tracking-wider top-[-10px] right-[5px] z-[15] ${styles.recurringBadge}`}>
						<Repeat size={10} />
						<span>Recorrência</span>
					</div>
				)}

				<div className="flex items-center gap-4 relative z-[2]">
					<div
						className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-2xl"
						style={{ backgroundColor: `${transaction.category.color}15`, color: transaction.category.color }}
					>
						{/* <DynamicIcon name={transaction.category.icon as IconName} size={20} /> */}
						<DynamicIcon name={transaction.category.icon as IconName} size={20} />
					</div>

					<div className="flex-1">
						<div className="w-full">
							<h4 className={`text-sm font-medium mb-1.5 ${styles.txTitle}`}>{transaction.description}</h4>
						</div>
						<div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-3 lg:mt-[-6px]">
							<div className={`flex items-center gap-2.5 flex-wrap text-xs font-medium ${styles.txMeta}`}>
								<span>{formatRelativeDateTime(transaction.registeredAt)}</span>
								<span className={styles.metaSeparator}>•</span>
								<span>{transaction.category.name}</span>
							</div>
							<div className="mt-2">
								<span className={`hidden lg:inline pr-2.5 ${styles.metaSeparator}`}>•</span>
								{renderWalletBadge(
									transaction.wallet.bank ? transaction.wallet.bank.gradient : null,
									transaction.wallet.bank ? transaction.wallet.bank.color: null,
									transaction.wallet.name,
								)}
							</div>
						</div>
					</div>

					<div className="absolute right-1 bottom-0 sm:relative sm:text-right sm:flex-shrink-0">
						<span
							className={`text-base font-semibold tracking-tight ${
								isIncome ? styles.textIncome : isTransfer ? styles.textTransfer : styles.textExpenseValue
							}`}
						>
							{isIncome ? '+' : isTransfer ? '' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

interface TransactionListProps {
	transactions: TransactionResponse[];
	onSelectTransaction: (transaction: TransactionResponse) => void;
}

function TransactionList({
	transactions,
	onSelectTransaction
}: TransactionListProps) {
	return (
		<div className="flex flex-col gap-4">
			{transactions?.map((transaction) => {
				const isIncome = transaction.type === 'CREDIT';
				const isTransfer = false;
				const isRecurring = transaction.recurrenceId !== null;

				let auraClass = styles.auraExpense;
				if (isRecurring) auraClass = styles.auraRecurring;
				else if (isIncome) auraClass = styles.auraIncome;
				else if (isTransfer) auraClass = styles.auraTransfer;

				return (
					<Card
						key={transaction.id}
						transaction={transaction}
						onSelectTransaction={onSelectTransaction}
						isIncome={isIncome}
						isTransfer={isTransfer}
						isRecurring={isRecurring}
						auraClass={auraClass}
					/>
				);
			})}
		</div>
	)
}

export default TransactionList;