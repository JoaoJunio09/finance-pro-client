import { ArrowUpRight, ArrowDownRight, ArrowRightLeft, Wallet, Rotate3D, RotateCw } from "lucide-react";

import styles from './FabRadialMenu.module.css';

interface FabRadialMenuProps {
	isFabOpen: boolean;
	onClose: () => void;
}

function FabRadialMenu({ isFabOpen, onClose }: FabRadialMenuProps) {
	return (
		<div className={`lg:hidden fixed inset-0 z-[100] flex items-end justify-center pointer-events-none`}>
			<div
				className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-500 pointer-events-auto ${styles.scrim} ${isFabOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
				onClick={onClose}
			/>

			<div
				className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] origin-center ${styles.expandCircle} ${isFabOpen ? 'scale-[45] opacity-100 shadow-2xl' : 'scale-100 opacity-0'}`}
			/>

			<div className={`relative z-10 w-full max-w-[320px] pb-36 flex flex-col gap-4 pointer-events-auto transition-opacity duration-500 ${isFabOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
				{[
					{ icon: ArrowUpRight, label: 'Nova Receita', variant: styles.iconSuccess },
					{ icon: ArrowDownRight, label: 'Nova Despesa', variant: styles.iconDanger },
					{ icon: RotateCw, label: 'Suas Recorrências', variant: styles.iconInfo },
					{ icon: Wallet, label: 'Suas Carteiras', variant: styles.iconPrimary },
				].map((action, i) => (
					<button
						key={i}
						onClick={onClose}
						className={`flex items-center justify-between p-4 rounded-3xl shadow-xl transition-all duration-500 active:scale-95 group ${styles.actionButton} ${isFabOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
						style={{ transitionDelay: isFabOpen ? `${100 + (3 - i) * 60}ms` : '0ms' }}
					>
						<span className="font-semibold text-main text-sm ml-2">{action.label}</span>
						<div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${styles.actionIcon} ${action.variant}`}>
							<action.icon className="w-5 h-5" />
						</div>
					</button>
				))}
			</div>
		</div>
	);
}

export default FabRadialMenu;