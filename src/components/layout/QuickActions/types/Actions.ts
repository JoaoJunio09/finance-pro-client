import { type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type Action = {
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	label: string;
	type: 'income' | 'expense' | 'trasfer' | 'recurrence' | 'wallet';
	colorVar?: string;
	delay: string;
	closeDelay: string;
	openPos: string;
	colorHex?: string;
}