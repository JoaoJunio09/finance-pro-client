import { useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Navigation/Desktop/Sidebar";
import MobileBottomNav from "../components/layout/Navigation/Mobile/MobileBottomNav";
import QuickActions from "../components/layout/QuickActions/QuickActions";
import Dashboard from "../features/dashboard/Dashboard";
import TransactionModal from "../features/transactionModal/TransactionModal";
import type { TransactionType } from "../types/TransactionType";

function DashboardPage() {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [isOpenQuickActions, setIsOpenQuickActions] = useState(false);

	const [isOpenTxModal, setIsOpenTxModal] = useState(false);
	const [txType, setTxType] = useState<TransactionType>('CREDIT');

	return (
		<div className={`min-h-screen ${false ? 'theme-dark' : 'theme-light'} bg-[var(--bg-base)] text-[var(--text-main)] relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)]`}>
			<Header
				handleOpenSidebar={() => setIsOpenSidebar(!isOpenSidebar)}
			/>
			<Sidebar
				isOpen={isOpenSidebar}
				onClose={() => setIsOpenSidebar(false)}
				mainView="dashboard"
			/>
			<MobileBottomNav
				isOpenQuickActions={isOpenQuickActions}
				onToggleQuickActions={() => setIsOpenQuickActions(!isOpenQuickActions)}
				mainView="dashboard"
			/>
			<QuickActions
				isOpen={isOpenQuickActions}
				onToggle={() => setIsOpenQuickActions(!isOpenQuickActions)}
				handleOpenTxModal={() => setIsOpenTxModal(true)}
				selectTxType={setTxType}
			/>

			<div className="w-full">
				<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 lg:pb-10">
					<Dashboard />
				</div>
			</div>

			<TransactionModal
        isOpen={isOpenTxModal}
        onClose={() => setIsOpenTxModal(false)}
        initialType={txType}
				transaction={null}
      />
		</div>		
	)
}

export default DashboardPage;