import type { RecurrencesData } from '../../../Analytics';
import StatSummaryCard from '../../StatSummaryCard/StatSummaryCard';

import styles from './RecurrencesSubpage.module.css';

interface RecurrencesSubpageProps {
  recurrences: RecurrencesData;
  onItemClick: (itemId: string) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function RecurrencesSubpage({ recurrences, onItemClick }: RecurrencesSubpageProps) {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatSummaryCard
          label="Total de Recorrências"
          value={`${recurrences.totalCount} registros`}
          caption="Assinaturas e despesas/entradas fixas"
          interactive
        />
        <StatSummaryCard
          label="Valor Comprometido (Saídas)"
          value={formatCurrency(recurrences.committedValue)}
          caption="Soma das assinaturas e contas fixas"
          tone="expense"
          interactive
        />
        <StatSummaryCard
          label="Entradas Fixas Projetadas"
          value={formatCurrency(recurrences.incomeValue)}
          caption="Receita garantida esperada"
          tone="income"
          interactive
        />
      </div>

      <div className={`p-6 rounded-3xl flex flex-col gap-5 border ${styles.card}`}>
        <div>
          <h3 className={`text-base font-bold ${styles.cardTitle}`}>Próximas Recorrências</h3>
          <p className={`text-xs ${styles.cardSubtitle}`}>Listagem de eventos fixos agendados para o mês</p>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {recurrences.items.map((item) => {
            const isIncome = item.type === 'income';
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border flex items-center justify-between group transition-colors cursor-pointer ${styles.itemRow}`}
                onClick={() => onItemClick(item.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isIncome ? styles.iconIncome : styles.iconExpense}`}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-semibold transition-colors ${styles.itemDescription}`}>{item.description}</span>
                    <span className={`text-xs ${styles.itemMeta}`}>
                      {item.category} • Próxima cobrança: <span className={styles.itemMetaStrong}>{item.nextDate}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right flex flex-col">
                  <span className={`text-sm font-bold ${isIncome ? styles.amountIncome : styles.amountDefault}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
                  </span>
                  <span className={`text-[11px] font-medium ${styles.itemMeta}`}>{isIncome ? 'Entrada' : 'Saída'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RecurrencesSubpage;