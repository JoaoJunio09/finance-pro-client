import { Sparkles } from "lucide-react";

interface Insight {
  id: string;
  text: string;
  highlight: string;
  type: 'positive' | 'negative' | 'neutral';
}

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    text: 'Você economizou 18% em alimentação neste mês. Excelente trabalho.',
    highlight: 'economizou 18%',
    type: 'positive',
  },
  {
    id: '2',
    text: 'Sua conta de energia aumentou em relação ao mês passado.',
    highlight: 'aumentou',
    type: 'negative',
  }
];

const InsightCard = ({ insight, delayClass }: { insight: Insight, delayClass: string }) => {
  const parts = insight.text.split(insight.highlight);
  const dotColor = insight.type === 'positive' ? 'bg-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 
                   insight.type === 'negative' ? 'bg-zinc-400' : 'bg-zinc-600';

  return (
    <div className={`w-full min-w-0 p-5 lg:p-7 rounded-2xl bg-[#0f0f12] border border-white/[0.03] hover:border-white/[0.08] transition-colors duration-300 animate-slide-up ${delayClass} group`}>
      <div className="flex gap-4 items-start">
        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125 ${dotColor}`}></div>
        <p className="flex-1 min-w-0 text-zinc-400 text-sm lg:text-[15px] leading-relaxed font-light">
          {parts[0]}
          <span className="text-zinc-100 font-medium">{insight.highlight}</span>
          {parts[1]}
        </p>
      </div>
    </div>
  );
};

function Insights() {
	return (
		<div className="w-full min-w-0">
			<h3 className="text-zinc-600 text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] font-semibold mb-5 lg:mb-6 flex items-center gap-2 lg:gap-3 animate-slide-up delay-500">
				<Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-[#8B5CF6]" />
				Insights
			</h3>
			<div className="flex flex-col gap-4 w-full min-w-0">
				{MOCK_INSIGHTS.map((insight, idx) => (
					<InsightCard 
						key={insight.id} 
						insight={insight} 
						delayClass={`delay-[${500 + (idx * 100)}ms]`} 
					/>
				))}
			</div>
		</div>
	)
}

export default Insights;