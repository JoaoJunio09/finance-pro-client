import { Briefcase, Car, Coffee, CreditCard, Icon, ShoppingBag, TransgenderIcon, Wallet } from "lucide-react";
import { formatCurrency } from "../../../utils/FormatCurrency";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";


const TimelineItem = ({ transaction, isLast }: { transaction: TransactionResponse, isLast: boolean }) => {
  const isIncome = transaction.type === 'CREDIT';

  return (
    <div className="relative flex gap-4 sm:gap-6 lg:gap-8 group cursor-default w-full min-w-0">
      {!isLast && (
        <div className="absolute left-[23px] top-[48px] bottom-[-16px] w-[2px] bg-white/[0.02] group-hover:bg-white/[0.06] transition-colors duration-500"></div>
      )}
      
      <div className="flex flex-col items-center pt-2 relative z-10 flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-[#111113] border border-white/[0.04] flex items-center justify-center text-zinc-500 group-hover:text-zinc-200 group-hover:border-white/[0.1] group-hover:bg-[#18181B] transition-all duration-300 shadow-sm">
          <TransgenderIcon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 py-3 lg:py-4 pb-8 lg:pb-10 border-b border-transparent group-hover:border-white/[0.02] transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
          
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-zinc-100 font-medium text-base lg:text-lg mb-1 truncate">
              {transaction.description}
            </h4>
            <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm font-medium uppercase tracking-wider text-zinc-600">
              <span className="truncate">{transaction.category.name}</span>
              <span className="w-1 h-1 flex-shrink-0 rounded-full bg-zinc-800"></span>
              <span className="flex-shrink-0 truncate">{transaction.registeredAt}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
            <span className={`text-lg lg:text-xl font-medium tracking-tight ${isIncome ? 'text-emerald-500' : 'text-rose-700'}`}>
              {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
            </span>
            <div className="flex items-center gap-1.5 text-xs lg:text-sm text-zinc-600 font-medium">
              {/* {transaction.wallet.includes('Cartão') ? <CreditCard className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" /> : <Wallet className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />} */}
							<Wallet className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-none">Conta Corrente</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

interface RecentActivitiesProps {
	transactions: TransactionResponse[]
}

function RecentActivities({
	transactions
}: RecentActivitiesProps) {
	return (
		<div className="animate-slide-up delay-300 min-w-0 w-full">
			<div className="flex items-center justify-between mb-8 lg:mb-10 w-full">
				<h3 className="text-zinc-600 text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] font-semibold truncate pr-4">
					Movimentações Recente
				</h3>
				<button className="text-zinc-500 hover:text-zinc-300 flex-shrink-0 text-xs sm:text-sm lg:text-base font-medium transition-colors">
					Ver tudo
				</button>
			</div>
			
			<div className="flex flex-col w-full min-w-0">
				{transactions.map((tx, idx) => (
					<TimelineItem 
						key={tx.id} 
						transaction={tx} 
						isLast={idx === transactions.length - 1} 
					/>
				))}
			</div>
		</div>
	)
}

export default RecentActivities;