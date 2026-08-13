import type { CategoryResponse } from '../../../models/category/CategoryResponse';
import type { WalletResponse } from '../../../models/wallet/WalletResponse';
import type { RecurrenceType } from '../../../types/RecurrenceType';
import type { TransactionStatus } from '../../../types/TransactionStatus';
import type { TransactionType } from '../../../types/TransactionType';

export interface FinancialActivity {
  id: string;
  title: string;
  amount: number;
  type: TransactionType | RecurrenceType;
  isRecurrent: boolean;
  category: CategoryResponse;
  wallet: WalletResponse;
  status: TransactionStatus | undefined;
  registeredAt: string;
  icon: string;
}