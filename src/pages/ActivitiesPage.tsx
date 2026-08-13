import { useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Navigation/Desktop/Sidebar";
import MobileBottomNav from "../components/layout/Navigation/Mobile/MobileBottomNav";
import QuickActions from "../components/layout/QuickActions/QuickActions";
import Activities from "../features/activities/Activities";
import TransactionModal from "../features/transactionModal/TransactionModal";
import type { TransactionType } from "../types/TransactionType";

function ActivitiesPage() {
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
				mainView="activities"
			/>
			<MobileBottomNav
				isOpenQuickActions={isOpenQuickActions}
				onToggleQuickActions={() => setIsOpenQuickActions(!isOpenQuickActions)}
				mainView="activities"
			/>
			<QuickActions
				isOpen={isOpenQuickActions}
				onToggle={() => setIsOpenQuickActions(!isOpenQuickActions)}
				handleOpenTxModal={() => setIsOpenTxModal(true)}
				selectTxType={setTxType}
			/>
			
			<Activities />

			<TransactionModal
				isOpen={isOpenTxModal}
				onClose={() => setIsOpenTxModal(false)}
				initialType={txType}
			/>
		</div>
	)
}

export default ActivitiesPage;