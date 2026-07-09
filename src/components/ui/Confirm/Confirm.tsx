import { AlertTriangle, Icon } from "lucide-react";

const CONFIG = {
	success: {
		icon: AlertTriangle,
		text: 'text-[#F87171]',
		border: 'border-rose-500/20',
		color: 'border-rose-500'
	},
	warning: {
		icon: AlertTriangle,
		text: 'text-[#F87171]',
		border: 'border-rose-500/20',
		color: 'border-rose-500'
	},
	info: {
		icon: AlertTriangle,
		text: 'text-[#F87171]',
		border: 'border-rose-500/20',
		color: 'border-rose-500'
	}
}

interface ConfirmProps {
	type: 'success' | 'warning' | 'info';
	title: string;
	message: string;
	buttonText: string,
	onCancel: () => void;
	onConfirm: () => void;
}

function Confirm({
	type,
	title,
	message,
	buttonText,
	onCancel,
	onConfirm
}: ConfirmProps) {
	const config = CONFIG[type];
	const Icon = config.icon;
	
	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-overlay" onClick={onCancel} />
			
			<div className="relative z-[61] w-full max-w-[380px] bg-[#111113] border border-white/[0.06] rounded-[20px] p-[28px] animate-slide-up">
				
				<div className={`
					w-[44px] h-[44px] rounded-xl bg-[#F8717110] border flex items-center justify-center mb-[16px]
					${config.border}
				`}>
					<Icon size={24} className={`${config.text}`} />
				</div>

				<h3 className="font-['Outfit'] text-[17px] font-semibold text-white">{title}</h3>
				<p className="font-['Inter'] text-[13px] text-zinc-500 mt-[8px] leading-[1.6]">
					{message}
				</p>

				<div className="flex gap-[10px] mt-[24px]">
					<button 
						onClick={onCancel}
						className="flex-1 h-[42px] rounded-[10px] bg-transparent border border-white/[0.08] hover:bg-white/[0.04] font-['Inter'] text-[13px] font-medium text-zinc-400 hover:text-white transition-all outline-none"
					>
						Cancelar
					</button>
					<button 
						onClick={onConfirm}
						className={`
							flex-1 h-[42px] rounded-[10px] bg-[#F8717110] border font-['Inter'] text-[13px] font-semibold text-[#F87171] transition-all outline-none
							${config.border}
							hover:${config.color}
						`}
					>
						{buttonText}
					</button>
				</div>

			</div>
		</div>
	)
}

export default Confirm;