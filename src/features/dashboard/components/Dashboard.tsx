import { useState } from 'react';
import TopProgressBar from '../../../components/ui/TopProgressBar/TopProgressBar';
import TransactionModal from '../../newTransaction/components/NewTransactionModal';
import useDashboard from '../hooks/useDashboard';
import Apresentation from './Apresentation';
import CurrentBalance from './CurrentBalance';
import Insights from './Insights';
import MonthOverview from './MonthOverview';
import PerfomTransaction from './PerfomTransaction';
import RecentActivities from './RecentActivities';
import type { TransactionType } from '../../../types/TransactionType';

// PRÓXIMOS PASSOS - DASHBOARD:
// 1. Adicionar uma Transação: Receita e Despesa.
// 2. Cada categoria deve ter um ícone referente a mesma (implementar no back-end).
// 3. Formatar data e hora das movimentações no front-end.
// 4. Back-end deve gerar Insights automáticos de acordo com as ações do usuário:
//    1º Insight: Fala sobre o saldo atual do usuário (ex: Você economizou 18% em alimentação neste mês. Excelente trabalho.)
//    2º Insight: Fala sobre as despesas do usuário (ex: Sua conta de energia aumentou em relação ao mês passado)
//    Esses Insights serão gerados de acordo com uma análise completa de todas as movimentações do usuário.

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<TransactionType>('CREDIT');
  const { account, transactions, loading } = useDashboard();
  if (!account) return;

  return (
    <main className="flex-1 w-full min-w-0 relative z-10 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20 flex flex-col flex-1">
        {loading && (
          <TopProgressBar />
        )}

        <Apresentation
          income={account?.income}
          expense={account?.expenses}
        />
        
        <CurrentBalance
          currentBalance={account.currentBalance}
        />

        <div className="mt-16 md:mt-20 lg:mt-28 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px] gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 w-full min-w-0">  
          <div className="flex flex-col gap-16 lg:gap-20 min-w-0 w-full">
            <PerfomTransaction
              setOpenModal={setOpenModal}
              setType={setType}
            />
            <RecentActivities
              transactions={transactions}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-20 min-w-0 w-full">
            <MonthOverview
              income={account.income}
              expense={account.expenses}
              netIncome={account.netIncome}
              biggestExpense={account.biggestExpense}
            />
            <Insights />
          </div>
        </div>

        <TransactionModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          type={type}
        />
      </div>
      <div className="h-28 md:h-0"></div>
 
    </main>
  );
}

export default Dashboard;