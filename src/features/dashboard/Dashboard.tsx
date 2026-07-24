import { useEffect, useState } from 'react';
import { useAccountContext } from '../../context/AccountContext';
import Actions from './components/Actions/Actions';
import CategoryExpenses from './components/CategoryExpenses/CategoryExpenses';
import FinancialOverview from './components/FinancialOverview/FinancialOverview';
import FutureCashFlow from './components/FutureCashFlow/FutureCashFlow';
import Header from './components/Header/Header';
import RecentActivities from './components/RecentActivities/RecentActivities';
import SmartInsights from './components/SmartInsights.tsx/SmartInsights';
import WalletDetailModal from './components/WalletDetailModal/WalletDetailModal';
import Wallets from './components/Wallets/Wallets';
import useDashboard from './hooks/useDashboard';

export default function Dashboard() {
  const [openWalletDetail, setOpenWalletDetails] = useState(false);

  const { setAccountByUser } = useAccountContext();
  const {
    dashboard,
    account,
    selectWalletDetails,
    walletSelected
  } = useDashboard();

  useEffect(() => {
    if (account) {
      setAccountByUser(account);
    }
  }, [account]);

  const handleSelectedWalletDetails = (id: string) => {
    setOpenWalletDetails(true);
    selectWalletDetails(id);
  }

  return (
    <main className="flex-1 w-full relative z-10 flex flex-col items-center">
      <div className="w-full relative z-10 flex flex-col max-w-[400px] bg-main min-h-screen shadow-2xl lg:max-w-[1440px] lg:border-none lg:shadow-none lg:min-h-0">
        
        <div className="relative w-full overflow-hidden pb-12 pt-8 lg:pt-16 px-6 lg:px-12 flex flex-col">
          
          {/* Plasma Background */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden isolate">
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[var(--effect-glow-header-primary)] blur-[100px] rounded-full animate-plasma mix-blend-screen" />
            <div className="absolute top-[20%] right-[-20%] w-[70%] h-[70%] bg-[var(--effect-glow-header-income)] blur-[100px] rounded-full animate-plasma mix-blend-screen" style={{ animationDelay: '-5s' }} />
          </div>

          <Header />

          <FinancialOverview
            currentBalance={dashboard?.currentBalance ?? 0}
            income={dashboard?.income ?? 0}
            expenses={dashboard?.expenses ?? 0}
          />
        </div>

        <div className="px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 pb-32">
          <div className="lg:col-span-7 flex flex-col gap-10">
            <Actions />

            <RecentActivities
              transactions={dashboard?.transactions ?? []}
            />

            <FutureCashFlow
              recurrences={dashboard?.recurrences ?? []}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-10">
            <Wallets
              wallets={dashboard?.wallets ?? []}
              onSelectWallet={handleSelectedWalletDetails}
            />

            <CategoryExpenses
              expensesByCategory={dashboard?.expensesByCategory ?? []}
            />

            <SmartInsights />

            {openWalletDetail && (
              <WalletDetailModal
                walletDetails={walletSelected ?? null}
                transactions={walletSelected?.transactions ?? []}
                onClose={() => setOpenWalletDetails(false)}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}