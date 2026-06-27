import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button/Button";
import showToast from "../../../components/ui/Toast/Toast";
import { useAuthContext } from "../../../context/AuthContext";
import useDashboard from "../hooks/useDashboard";
import Insights from "./Insights";
import Metrics from "./Metrics";
import Overview from "./Overview";
import RecentActivities from "./RecentActivities";

import { useAccountContext } from "../../../context/AccountContext";
import type { TransactionType } from "../../../enums/TransactionType";
import NewTransactionModal from "../../newTransaction/components/NewTransactionModal";

interface TopActionsProps {
	openModal: (isOpen: boolean) => void
	setType: (type: TransactionType) => void
}

const TopActions = ({
	openModal,
	setType
}: TopActionsProps) => {
	const { fullName } = useAuthContext();

	const styleForButton = 'h-9 px-3.5 rounded-xl text-[13px] font-semibold font-sans border shrink-0 lg:w-auto w-16 p-0';
	
	return (
		<header className="px-4 lg:px-8 pt-8 pb-6 flex flex-row flex-wrap gap-4 justify-between items-center w-full max-w-[1440px] mx-auto flex-shrink-0">
			<div>
				<h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-[#EDEDED] to-[#A1A1AA] bg-clip-text text-transparent font-sans">
					Olá, {fullName?.split(' ')[0]}!
				</h1>
				<p className="text-xs text-[#A1A1AA] mt-1 font-sans">Visualize sua vida financeira em segundos.</p>
			</div>
			
			<div className="flex items-center gap-2">
				<Button
					onClick={() => {
						openModal(true);
						setType('CREDIT')
					}}
					className={styleForButton}
					style={{
						backgroundColor: '#4ADE8014',
						color: '#4ADE80',
						borderColor: '#4ADE8030',
					}}
				>
					<ArrowDownLeft size={15} />
					<span className="hidden lg:inline">Receita</span>
				</Button>

				<Button
					onClick={() => {
						openModal(true);
						setType('DEBIT')
					}}
					className={styleForButton}
					style={{
						backgroundColor: '#F8717114',
						color: '#F87171',
						borderColor: '#F8717130',
					}}
				>
					<ArrowUpRight size={15} />
					<span className="hidden lg:inline">Despesa</span>
				</Button>
			</div>
			{/* <div className="text-xs text-[#71717A] font-medium tracking-wider uppercase select-none hidden sm:block font-sans">
				{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
			</div> */}
		</header>
	)
}

interface DashboardProps {
	isSidebarExpanded: boolean
}

function Dashboard({ isSidebarExpanded }: DashboardProps) {
	const [openTransantionModal, setOpenTransactionModal] = useState(false);
	const [typeTransaction, setTypeTransaction] = useState<TransactionType>('CREDIT');
	const { 
		account,
		errorAccount,
		loadingAccount,
		transactions,
		errorTransactions,
		loadingTransactions,
		metrics,
		overview
	} = useDashboard();

	const { setAccount } = useAccountContext();

	useEffect(() => {
		if (account) {
			setAccount(account);
		}

		if (errorAccount) {
			showToast({ title: 'Erro ao carregar', message: 'Não foi possível carregar os dados da conta', type: 'error' });
		}
		if (errorTransactions) {
			showToast({ title: 'Erro ao carregar', message: 'Não foi possível carregar as Transações', type: 'error' });
		}
	}, [errorAccount, account]);

	return (
		<main 
			className="flex-1 flex flex-col overflow-y-auto mt-14 lg:mt-0"
			style={{
				marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024
					? (isSidebarExpanded ? '240px' : '68px')
					: '0px',
				transition: 'margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)'
			}}
		>
			<TopActions
				openModal={setOpenTransactionModal}
				setType={setTypeTransaction}
			/>

			<div className="px-4 lg:px-8 pb-12 flex flex-col gap-8 max-w-[1440px] w-full mx-auto overflow-x-hidden">
				<Metrics
					metrics={metrics}
				/>

				<Overview
					overviewData={overview}
					total={account?.currentBalance ?? 0}
					wallets={account?.wallets ?? []}
				/>

				<Insights />

				<RecentActivities
					transactions={transactions}
				/>
			</div>

			<NewTransactionModal
				open={openTransantionModal}
				type={typeTransaction}
				onClose={() => setOpenTransactionModal(false)}
			/>
		</main>
	)
}

export default Dashboard;