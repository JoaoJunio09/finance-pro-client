import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";
import type { FinancialActivity } from "../types/FinancialActivity";

export function toFinancialActivity(transaction: TransactionResponse): FinancialActivity {
  return {
    id: transaction.id,
    title: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    isRecurrent: Boolean(transaction.recurrenceId),
    category: transaction.category,
    wallet: transaction.wallet,
    status: transaction.status,
    registeredAt: transaction.registeredAt,
    icon: transaction.category.icon,
  };
}
