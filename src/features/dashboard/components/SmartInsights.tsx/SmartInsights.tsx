import type { LucideIcon } from "lucide-react";
import { Activity, ShoppingCart, Zap, Target, Sparkles, Car } from "lucide-react";

import styles from './SmartInsights.module.css';

export interface InsightData {
	id: string;
	title: string;
	desc: string;
	icon: LucideIcon;
}

// TODO: remover quando os dados vierem de uma API/store real
const DEFAULT_INSIGHTS: InsightData[] = [
	{ id: 'si1', title: 'Alimentação', desc: 'Você gastou 18% menos com alimentação este mês.', icon: ShoppingCart },
	{ id: 'si2', title: 'Previsão', desc: 'O salário entra em 2 dias.', icon: Zap },
	{ id: 'si3', title: 'Saúde Financeira', desc: 'Você possui saldo suficiente para todas as contas dos próximos 15 dias.', icon: Target },
	{ id: 'si4', title: 'Assinaturas', desc: 'Suas assinaturas representam 8% dos gastos.', icon: Sparkles },
	{ id: 'si5', title: 'Transporte', desc: 'A categoria Transporte aumentou 12%.', icon: Car },
];

interface SmartInsightsProps {
	insights?: InsightData[];
}

function SmartInsights({ insights = DEFAULT_INSIGHTS }: SmartInsightsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2 mb-2">
				<Activity className={`w-4 h-4 ${styles.headerIcon}`} />
				<h3 className="text-[11px] uppercase tracking-widest text-muted font-bold">Sistema Financeiro Inteligente</h3>
			</div>

			<div className="flex flex-col gap-3">
				{insights.map((insight) => {
					const Icon = insight.icon;
					return (
						<div key={insight.id} className={`relative p-4 rounded-2xl bg-glass group flex gap-4 items-start ${styles.insightCard}`}>
							<div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${styles.insightIcon}`}>
								<Icon className="w-4 h-4" />
							</div>
							<div className="flex flex-col">
								<h4 className="text-xs font-semibold text-main mb-1">{insight.title}</h4>
								<p className="text-[12px] text-muted leading-relaxed font-light">
									{insight.desc}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SmartInsights;