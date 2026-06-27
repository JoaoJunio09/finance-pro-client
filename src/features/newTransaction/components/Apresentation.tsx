import { X } from "lucide-react";
import { type NEW_TRANSACTION_MODAL_CONFIG_TYPE } from "../types/NewTransactionModalConfigs";

interface ApresentationProps {
	config: NEW_TRANSACTION_MODAL_CONFIG_TYPE,
  onClose: () => void;
}

function Apresentation({ config, onClose }: ApresentationProps) {
	const Icon = config.icon;

	return (
		<div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#1F1F1F]">
			<div className="flex items-center gap-3">
				<div
					className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
					style={{
						backgroundColor: `${config.color}14`,
						color: config.color,
						boxShadow: `inset 0 0 0 1px ${config.color}30`,
					}}
				>
					<Icon size={18} />
				</div>
				<div>
					<h2 className="text-[16px] font-semibold text-[#EDEDED] tracking-tight font-sans leading-tight">
						{config.label}
					</h2>
					<p className="text-[12px] text-[#71717A] mt-0.5 font-sans">
						{config.subtitle}
					</p>
				</div>
			</div>
			<button
				onClick={onClose}
				className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-colors duration-150 cursor-pointer"
				aria-label="Fechar"
			>
				<X size={16} />
			</button>
		</div>
	)
}

export default Apresentation;