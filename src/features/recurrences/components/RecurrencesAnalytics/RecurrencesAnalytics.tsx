import React, { useMemo } from 'react';
import { 
  CheckCircle2, Repeat, CalendarDays, PauseCircle, ShieldCheck, 
  TrendingDown, PieChart 
} from 'lucide-react';
import { formatCurrency, getDaysUntil } from '../../utils/recurrenceUtils';
import type { Recurrence } from '../../types/recurrence';
import { CATEGORIES } from '../../mocks/recurrenceMocks';

interface SummaryCardsProps {
  recurrences: Recurrence[];
}

export const SummaryCards = ({ recurrences }: SummaryCardsProps) => {
  const summary = useMemo(() => {
    let activeCount = 0; 
    let pausedCount = 0; 
    let recurringCommitments = 0; 
    let upcomingCount = 0;

    recurrences.forEach((r) => {
      if (r.status === 'active') activeCount++;
      if (r.status === 'paused') pausedCount++;
      if (r.status === 'active' && r.type === 'expense') recurringCommitments += r.amount;
      if (r.status === 'active' && r.nextDate) {
        const days = getDaysUntil(r.nextDate);
        if (days !== null && days >= 0 && days <= 7) upcomingCount++;
      }
    });

    return { activeCount, pausedCount, recurringCommitments, upcomingCount };
  }, [recurrences]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-30 pt-6">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm hover:border-[var(--border-hover)] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[var(--text-muted)]">Ativas</span>
          <div className="w-8 h-8 rounded-xl bg-[var(--income-muted)] text-[var(--income)] flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>
        <div className="text-2xl font-bold text-[var(--text-main)]">{summary.activeCount}</div>
        <p className="text-xs text-[var(--text-muted)] mt-1">Regras em funcionamento</p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm hover:border-[var(--border-hover)] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[var(--text-muted)]">Compromissos Recorrentes</span>
          <div className="w-8 h-8 rounded-xl bg-[var(--expense-muted)] text-[var(--expense)] flex items-center justify-center">
            <Repeat size={18} />
          </div>
        </div>
        <div className="text-2xl font-bold text-[var(--expense)]">{formatCurrency(summary.recurringCommitments)}</div>
        <p className="text-xs text-[var(--text-muted)] mt-1">Valor estimado (saídas ativas)</p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm hover:border-[var(--border-hover)] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[var(--text-muted)]">Próximos 7 dias</span>
          <div className="w-8 h-8 rounded-xl bg-[var(--info-muted)] text-[var(--info)] flex items-center justify-center">
            <CalendarDays size={18} />
          </div>
        </div>
        <div className="text-2xl font-bold text-[var(--text-main)]">{summary.upcomingCount}</div>
        <p className="text-xs text-[var(--text-muted)] mt-1">Ocorrências iminentes</p>
      </div>

      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 rounded-2xl shadow-sm hover:border-[var(--border-hover)] transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[var(--text-muted)]">Pausadas</span>
          <div className="w-8 h-8 rounded-xl bg-[var(--warning-muted)] text-[var(--warning)] flex items-center justify-center">
            <PauseCircle size={18} />
          </div>
        </div>
        <div className="text-2xl font-bold text-[var(--warning)]">{summary.pausedCount}</div>
        <p className="text-xs text-[var(--text-muted)] mt-1">Aguardando reativação</p>
      </div>
    </div>
  );
};

interface RecurrencesAnalysisProps {
  recurrences: Recurrence[];
}

export const RecurrencesAnalysis = ({ recurrences }: RecurrencesAnalysisProps) => {
  const stats = useMemo(() => {
    const activeInc = recurrences
      .filter(r => r.type === 'income' && r.status === 'active')
      .reduce((acc, r) => acc + r.amount, 0);
      
    const activeExp = recurrences
      .filter(r => r.type === 'expense' && r.status === 'active')
      .reduce((acc, r) => acc + r.amount, 0);
      
    const commitment = activeInc > 0 ? (activeExp / activeInc) * 100 : 0;
    
    const expByCategory = recurrences
      .filter(r => r.type === 'expense' && r.status === 'active')
      .reduce((acc, r) => { 
        acc[r.categoryId] = (acc[r.categoryId] || 0) + r.amount; 
        return acc; 
      }, {} as Record<string, number>);
      
    const topCategories = Object.entries(expByCategory)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([id, amount]) => ({ 
        category: CATEGORIES[id] || CATEGORIES.outros, 
        amount, 
        percentage: activeExp > 0 ? (amount / activeExp) * 100 : 0 
      }));
      
    return { activeInc, activeExp, commitment, topCategories };
  }, [recurrences]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 relative z-10 animate-fade-in-up">
      <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 sm:p-6 rounded-2xl shadow-sm">
        <h3 className="text-sm font-bold text-[var(--text-main)] mb-5 flex items-center gap-2">
          <ShieldCheck size={18} className="text-[var(--accent)]" /> Comprometimento de Renda
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)]">Despesas Fixas</p>
              <p className="text-lg font-bold text-[var(--expense)]">{formatCurrency(stats.activeExp)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-[var(--text-muted)]">Receita Fixa</p>
              <p className="text-lg font-bold text-[var(--income)]">{formatCurrency(stats.activeInc)}</p>
            </div>
          </div>
          
          <div className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] h-3 rounded-full overflow-hidden mt-1 relative">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                stats.commitment > 80 ? 'bg-[var(--expense)]' : stats.commitment > 50 ? 'bg-[var(--warning)]' : 'bg-[var(--accent)]'
              }`} 
              style={{ width: `${Math.min(stats.commitment, 100)}%` }} 
            />
          </div>
          
          <p className="text-xs text-[var(--text-muted)] text-center leading-relaxed">
            Você compromete <strong className="text-[var(--text-main)]">{stats.commitment.toFixed(1)}%</strong> da sua renda fixa com pagamentos recorrentes e assinaturas.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-color)] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col">
        <h3 className="text-sm font-bold text-[var(--text-main)] mb-5 flex items-center gap-2">
          <TrendingDown size={18} className="text-[var(--expense)]" /> Maiores Categorias Recorrentes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1">
          {stats.topCategories.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" 
                style={{ backgroundColor: item.category.bgColor, color: item.category.color }}
              >
                <item.category.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-[var(--text-main)] truncate pr-2">{item.category.name}</span>
                  <span className="text-xs font-bold text-[var(--text-main)]">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-[var(--bg-elevated)] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ backgroundColor: item.category.color, width: `${item.percentage}%` }} 
                  />
                </div>
              </div>
            </div>
          ))}
          {stats.topCategories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center h-full text-center p-4">
              <PieChart size={32} className="text-[var(--border-hover)] mb-2" />
              <span className="text-xs text-[var(--text-muted)]">Nenhuma despesa ativa no momento para análise.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};