import Insights from "./Insights";
import Metrics from "./Metrics";
import Overview from "./Overview";
import RecentActivities from "./RecentActivities";

const TopHeader = () => {
	return (
		<header className="px-4 lg:px-8 pt-8 pb-6 flex flex-row justify-between items-center w-full max-w-[1440px] mx-auto flex-shrink-0">
			<div>
				<h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-[#EDEDED] to-[#A1A1AA] bg-clip-text text-transparent font-sans">
					FinancePro
				</h1>
				<p className="text-xs text-[#A1A1AA] mt-1 font-sans">Olá, Arthur. Visualize sua vida financeira em segundos.</p>
			</div>
			
			<div className="text-xs text-[#71717A] font-medium tracking-wider uppercase select-none hidden sm:block font-sans">
				{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
			</div>
		</header>
	)
}

interface DashboardProps {
	isSidebarExpanded: boolean
}

function Dashboard({ isSidebarExpanded }: DashboardProps) {
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
			<TopHeader />

			<div className="px-4 lg:px-8 pb-12 flex flex-col gap-8 max-w-[1440px] w-full mx-auto overflow-x-hidden">
				<Metrics />

				<Overview />

				<Insights />

				<RecentActivities />
			</div>
		</main>
	)
}

export default Dashboard;