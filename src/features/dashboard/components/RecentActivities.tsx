import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

const formatCurrency = (val: number): string => {
  return val.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
};

export interface Transaction {
  id: string | number;
  description: string;
  category: string;
  wallet: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
}

interface RecentActivitiesTableProps {
  transactions: TransactionResponse[];
}

const RecentActivitiesTable= ({ transactions }: RecentActivitiesTableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#2A2A2A]">
            <th className="pb-3 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] font-sans">
              Descrição
            </th>
            <th className="pb-3 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] font-sans">
              Categoria
            </th>
            <th className="pb-3 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] font-sans hidden lg:table-cell">
              Carteira
            </th>
            <th className="pb-3 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] font-sans hidden lg:table-cell">
              Data
            </th>
            <th className="pb-3 text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] font-sans text-right">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const isIncome = tx.type === 'CREDIT';
            
            const iconBgClass = isIncome ? 'bg-[#4ADE8014]' : 'bg-[#F8717114]';
            const iconColorClass = isIncome ? 'text-[#4ADE80]' : 'text-[#F87171]';
            const IconComponent = isIncome ? ArrowUpRight : ArrowDownRight;

            return (
              <tr 
                key={tx.id} 
                className="border-b border-[#2A2A2A] last:border-0 hover:bg-white/[0.05] transition-colors duration-150"
              >
                {/* Coluna Ícone + Descrição */}
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${iconBgClass} flex items-center justify-center ${iconColorClass} shrink-0`}>
                      <IconComponent size={16} />
                    </div>
                    <span className="text-sm font-medium text-[#EDEDED] font-sans truncate max-w-[180px] sm:max-w-[240px]">
                      {tx.description}
                    </span>
                  </div>
                </td>
                
                {/* Coluna Categoria */}
                <td className="py-4">
                  <span className="inline-flex items-center text-xs text-[#A1A1AA] bg-white/[0.08] rounded-lg px-2.5 py-0.5 font-sans select-none">
                    {tx.category}
                  </span>
                </td>
                
                {/* Coluna Carteira */}
                <td className="py-4 text-xs text-[#71717A] font-sans hidden lg:table-cell">
                  Conta Corrente
                </td>
                
                {/* Coluna Data */}
                <td className="py-4 text-xs text-[#71717A] font-sans whitespace-nowrap hidden lg:table-cell">
                  {tx.registeredAt}
                </td>
                
                {/* Coluna Valor formatado em Plus Jakarta Sans */}
                <td className="py-4 text-sm font-semibold text-right tabular-nums font-money">
                  <span className={isIncome ? 'text-[#4ADE80]' : 'text-[#F87171]'}>
                    {isIncome ? '+' : '−'} {formatCurrency(tx.amount)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface RecentActivitiesProps {
  transactions: TransactionResponse[]
}

function RecentActivities({ transactions }: RecentActivitiesProps) {
	return (
		<section className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.5)] w-full overflow-hidden">
			<div className="flex justify-between items-center">
				<h2 className="text-sm font-medium text-[#EDEDED] font-sans">Atividades Recentes</h2>
				<a 
					href="#todas" 
					onClick={(e) => e.preventDefault()} 
					className="text-xs text-[#6366F1] hover:text-[#8B5CF6] transition-colors duration-150 font-medium font-sans"
				>
					Ver todas →
				</a>
			</div>
			
			<RecentActivitiesTable
        transactions={transactions}
      />
		</section>
	)
}

export default RecentActivities;