import { useState } from "react";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Navigation/Desktop/Sidebar";
import MobileBottomNav from "../components/layout/Navigation/Mobile/MobileBottomNav";
import QuickActions from "../components/layout/QuickActions/QuickActions";
import TransactionModal from "../features/transactionModal/TransactionModal";
import type { TransactionType } from "../types/TransactionType";
import Wallets from "../features/wallets/Wallets";

function WalletsPage() {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [isOpenQuickActions, setIsOpenQuickActions] = useState(false);

	const [isOpenTxModal, setIsOpenTxModal] = useState(false);
	const [txType, setTxType] = useState<TransactionType>('CREDIT');

	return  (
		<div className={`min-h-screen ${true ? 'theme-dark' : 'theme-light'} bg-[var(--bg-base)] text-[var(--text-main)] relative selection:bg-[var(--accent-muted)] selection:text-[var(--accent)]`}>
			<Header
				handleOpenSidebar={() => setIsOpenSidebar(!isOpenSidebar)}
			/>
			<Sidebar
				isOpen={isOpenSidebar}
				onClose={() => setIsOpenSidebar(false)}
				mainView="wallets"
			/>
			<MobileBottomNav
				isOpenQuickActions={isOpenQuickActions}
				onToggleQuickActions={() => setIsOpenQuickActions(!isOpenQuickActions)}
				mainView={undefined}
			/>
			<QuickActions
				isOpen={isOpenQuickActions}
				onToggle={() => setIsOpenQuickActions(!isOpenQuickActions)}
				handleOpenTxModal={() => setIsOpenTxModal(true)}
				selectTxType={setTxType}
			/>

			<Wallets />

			<TransactionModal
				isOpen={isOpenTxModal}
				onClose={() => setIsOpenTxModal(false)}
				initialType={txType}
			/>
		</div>
	)
}

export default WalletsPage;