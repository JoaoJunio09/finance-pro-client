import { useEffect, useState } from 'react';
import TopProgressBar from '../../../components/ui/TopProgressBar/TopProgressBar';
import { useAccountContext } from '../../../context/AccountContext';
import type { TransactionType } from '../../../types/TransactionType';
import TransactionModal from '../../newTransaction/components/NewTransactionModal';
import useDashboard from '../hooks/useDashboard';
import Apresentation from './Apresentation';
import CurrentBalance from './CurrentBalance';
import Insights from './Insights';
import MonthOverview from './MonthOverview';
import PerfomTransaction from './PerfomTransaction';
import RecentActivities from './RecentActivities';

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<TransactionType>('CREDIT');
  const { account, transactions, loading } = useDashboard();
  const { setAccountByUser } = useAccountContext();

  useEffect(() => {
    if (account) {
      setAccountByUser(account);
    }
  }, [account]);

  return (
    <main className="flex-1 w-full min-w-0 relative z-10 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20 flex flex-col flex-1">
        {loading && (
          <TopProgressBar />
        )}

        <Apresentation
          income={account?.income ?? 0}
          expense={account?.expenses ?? 0}
        />
        
        <CurrentBalance
          currentBalance={account?.currentBalance}
        />

        <div className="mt-16 md:mt-20 lg:mt-28 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 w-full min-w-0">  
          <div className="flex flex-col gap-16 lg:gap-20 min-w-0 w-full">
            <PerfomTransaction
              setOpenModal={setOpenModal}
              setType={setType}
            />
            <RecentActivities
              transactions={transactions}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-20 min-w-0 w-full">
            <MonthOverview
              income={account?.income ?? 0}
              expense={account?.expenses ?? 0}
              netIncome={account?.netIncome ?? 0}
              biggestExpense={account?.biggestExpense ?? null}
            />
            <Insights />
          </div>
        </div>

        <TransactionModal
          isOpen={true}
          onClose={() => setOpenModal(false)}
        />
      </div>
      <div className="h-28 md:h-0"></div>
 
    </main>
  );
}

export default Dashboard;