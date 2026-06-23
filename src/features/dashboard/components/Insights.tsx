import { AlertTriangle, CheckCircle, MinusCircle, XCircle } from "lucide-react";

export interface Insight {
  id: string | number;
  type: 'warning' | 'positive' | 'negative' | 'neutral';
  text: string;
}

const MOCK_INSIGHTS: Insight[] = [
	{
		id: 1,
		type: 'warning',
		text: 'Seus gastos com Alimentação aumentaram 18% em relação ao mês passado.'
	},
	{
		id: 2,
		type: 'positive',
		text: 'Você gastou menos do que ganhou pelo 2º mês consecutivo.'
	},
	{
		id: 3,
		type: 'neutral',
		text: 'Reserva de Emergência cresceu R$ 200,00 este mês.'
	},
	{
		id: 4,
		type: 'negative',
		text: 'Nenhuma transação registrada nos últimos 5 dias.'
	}
];

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIconAndColor = () => {
    switch (insight.type) {
      case 'warning':
        return { icon: AlertTriangle, color: 'text-[#FCD34D]', bg: 'bg-[#FCD34D14]' };
      case 'positive':
        return { icon: CheckCircle, color: 'text-[#4ADE80]', bg: 'bg-[#4ADE8014]' };
      case 'negative':
        return { icon: XCircle, color: 'text-[#F87171]', bg: 'bg-[#F8717114]' };
      case 'neutral':
        return { icon: MinusCircle, color: 'text-[#71717A]', bg: 'bg-[#71717A14]' };
    }
  };

  const { icon: IconComponent, color, bg } = getIconAndColor();

  return (
    <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-4 flex items-start gap-3 transition-colors duration-200 hover:border-[#3A3A3A] shadow-[0_1px_3px_rgba(0,0,0,0.4)] w-full overflow-hidden">
      <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center ${color} shrink-0`}>
        <IconComponent size={16} />
      </div>
      <p className="text-[13px] text-[#A1A1AA] leading-relaxed line-clamp-2 font-sans">
        {insight.text}
      </p>
    </div>
  );
};

function Insights() {
	return (
		<section className="flex flex-col gap-3 w-full">
			<span className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-wider block font-sans">
				Insights
			</span>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
				{MOCK_INSIGHTS.map((insight) => (
					<InsightCard key={insight.id} insight={insight} />
				))}
			</div>
		</section>
	)
}

export default Insights;