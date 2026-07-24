import { ArrowUpRight, ArrowDownRight, ArrowRightLeft, Target } from "lucide-react";

import styles from './Actions.module.css';

function Actions() {
	const handleNewIncome = () => {
		// TODO: abrir modal/fluxo de nova receita
	};

	const handleNewExpense = () => {
		// TODO: abrir modal/fluxo de nova despesa
	};

	const handleTransfer = () => {
		// TODO: abrir modal/fluxo de transferência
	};

	const handleGoals = () => {
		// TODO: navegar para metas
	};

	return (
		<div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
			<button
				onClick={handleNewIncome}
				className={`flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-sm ${styles.actionButton}`}
			>
				<div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.actionIcon} ${styles.actionIconSuccess}`}>
					<ArrowUpRight className="w-4 h-4" />
				</div>
				<span className="text-xs font-semibold text-main">Receita</span>
			</button>

			<button
				onClick={handleNewExpense}
				className={`flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-sm ${styles.actionButton}`}
			>
				<div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.actionIcon} ${styles.actionIconDanger}`}>
					<ArrowDownRight className="w-4 h-4" />
				</div>
				<span className="text-xs font-semibold text-main">Despesa</span>
			</button>

			<button
				onClick={handleTransfer}
				className={`flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-sm ${styles.actionButton}`}
			>
				<div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.actionIcon} ${styles.actionIconInfo}`}>
					<ArrowRightLeft className="w-4 h-4" />
				</div>
				<span className="text-xs font-semibold text-main">Transferir</span>
			</button>

			<button
				onClick={handleGoals}
				className={`flex-shrink-0 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-sm ${styles.actionButton}`}
			>
				<div className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.actionIcon} ${styles.actionIconPrimary}`}>
					<Target className="w-4 h-4" />
				</div>
				<span className="text-xs font-semibold text-main">Metas</span>
			</button>
		</div>
	)
}

export default Actions;