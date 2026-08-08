import { Activity, Repeat, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type { Action } from "../types/Actions";

export const ACTIONS_DESKTOP: Action[] = [
	{ icon: TrendingUp, label: 'Receita', type: 'income', colorVar: '--income', delay: '150ms', closeDelay: '0ms', openPos: 'bottom-[435px] right-[60px] translate-x-1/2' },
	{ icon: TrendingDown, label: 'Despesa', type: 'expense', colorVar: '--expense', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[355px] right-[60px] translate-x-1/2' },
	{ icon: Repeat, label: 'Transferência', type: 'trasfer', colorHex: '#3B82F6', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[275px] right-[60px] translate-x-1/2' },
	{ icon: Activity, label: 'Recorrências', type: 'recurrence', colorHex: '#A855F7', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[195px] right-[60px] translate-x-1/2' },
	{ icon: Wallet, label: 'Carteiras', type: 'wallet', colorHex: '#F97316', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[115px] right-[60px] translate-x-1/2' },
];

export const ACTIONS_MOBILE: Action[] = [
	{ icon: TrendingUp, label: 'Receita', type: 'income', colorVar: '--income', delay: '150ms', closeDelay: '0ms', openPos: 'bottom-[270px] left-[50%] -translate-x-1/2' },
	{ icon: TrendingDown, label: 'Despesa', type: 'expense', colorVar: '--expense', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[200px] left-[22%] -translate-x-1/2' },
	{ icon: Repeat, label: 'Transferência', type: 'trasfer', colorHex: '#3B82F6', delay: '100ms', closeDelay: '50ms', openPos: 'bottom-[200px] left-[78%] -translate-x-1/2' },
	{ icon: Activity, label: 'Recorrências', type: 'recurrence', colorHex: '#A855F7', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[130px] left-[15%] -translate-x-1/2' },
	{ icon: Wallet, label: 'Carteiras', type: 'wallet', colorHex: '#F97316', delay: '50ms', closeDelay: '100ms', openPos: 'bottom-[130px] left-[85%] -translate-x-1/2' },
];