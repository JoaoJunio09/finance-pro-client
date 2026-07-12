import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Pencil, 
  Trash2 
} from 'lucide-react';

// ==========================================================================
// INTERFACES
// ==========================================================================

export interface Recurrence {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  frequency: 'MONTHLY' | 'BIWEEKLY' | 'YEARLY';
  dayOne: number;
  dayTwo?: number;
  monthOfYear?: number;
  category: string;
  wallet: string;
}

interface RecurrencesSectionProps {
  recurrences?: Recurrence[];
  onAddIncome?: () => void;
  onAddExpense?: () => void;
  onAddRecurrence?: () => void;
  onEditRecurrence?: (recurrence: Recurrence) => void;
  onDeleteRecurrence?: (id: string) => void;
}

// ==========================================================================
// MOCK DATA
// ==========================================================================

const MOCK_RECURRENCES: Recurrence[] = [
  { id: '1', name: 'Salário', type: 'INCOME', amount: 5200, frequency: 'MONTHLY', dayOne: 5, category: 'Salário', wallet: 'Conta Principal' },
  { id: '2', name: 'Freelance Fixo', type: 'INCOME', amount: 1500, frequency: 'BIWEEKLY', dayOne: 1, dayTwo: 15, category: 'Freelance', wallet: 'Conta Principal' },
  { id: '3', name: 'Aluguel', type: 'EXPENSE', amount: 1200, frequency: 'MONTHLY', dayOne: 10, category: 'Moradia', wallet: 'Conta Principal' },
  { id: '4', name: 'Netflix', type: 'EXPENSE', amount: 55.90, frequency: 'MONTHLY', dayOne: 15, category: 'Assinaturas', wallet: 'Conta Principal' },
  { id: '5', name: 'Academia', type: 'EXPENSE', amount: 120, frequency: 'MONTHLY', dayOne: 1, category: 'Saúde', wallet: 'Conta Principal' },
  { id: '6', name: 'IPVA', type: 'EXPENSE', amount: 890, frequency: 'YEARLY', dayOne: 15, monthOfYear: 3, category: 'Transporte', wallet: 'Moto' },
];

const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// ==========================================================================
// UTILS
// ==========================================================================

const formatCurrency = (val: number): string => {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
};

const getFrequencyLabel = (freq: string) => {
  switch (freq) {
    case 'MONTHLY': return 'Mensal';
    case 'BIWEEKLY': return 'Quinzenal';
    case 'YEARLY': return 'Anual';
    default: return '';
  }
};

const getOccurrenceText = (rec: Recurrence) => {
  switch (rec.frequency) {
    case 'MONTHLY': return `Todo dia ${rec.dayOne}`;
    case 'BIWEEKLY': return `Dias ${rec.dayOne} e ${rec.dayTwo}`;
    case 'YEARLY': return `${rec.dayOne} de ${rec.monthOfYear ? MONTHS[rec.monthOfYear - 1] : ''}`;
    default: return '';
  }
};

// ==========================================================================
// COMPONENTE PRINCIPAL
// ==========================================================================

export default function RecurrencesSection({
  recurrences = MOCK_RECURRENCES,
  onAddIncome = () => console.log('Adicionar Receita'),
  onAddExpense = () => console.log('Adicionar Despesa'),
  onAddRecurrence = () => console.log('Adicionar Recorrência'),
  onEditRecurrence = (rec) => console.log('Editar Recorrência', rec.id),
  onDeleteRecurrence = (id) => console.log('Deletar Recorrência', id),
}: RecurrencesSectionProps) {

  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Cálculos consolidados usando useMemo
  const { filteredRecurrences, totalIncome, totalExpense, netImpact } = useMemo(() => {
    let inc = 0;
    let exp = 0;

    const filtered = recurrences.filter(rec => {
      // Cálculo dos resumos considerando todas as ativas (base mensal simplificada)
      const multiplier = rec.frequency === 'BIWEEKLY' ? 2 : rec.frequency === 'YEARLY' ? (1/12) : 1;
      const calculatedAmount = rec.amount * multiplier;

      if (rec.type === 'INCOME') inc += calculatedAmount;
      else exp += calculatedAmount;

      if (filterType === 'all') return true;
      if (filterType === 'income') return rec.type === 'INCOME';
      return rec.type === 'EXPENSE';
    });

    return {
      filteredRecurrences: filtered,
      totalIncome: inc,
      totalExpense: exp,
      netImpact: inc - exp
    };
  }, [recurrences, filterType]);

  return (
    <section className="w-full mt-8 mb-4 font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .font-outfit { font-family: 'Outfit', sans-serif !important; }
        .font-inter { font-family: 'Inter', sans-serif !important; }
        .gradient-net {
          background: linear-gradient(135deg, #FFFFFF 30%, #C4B5FD 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      {/* BLOCO A — HEADER DA SEÇÃO COM 3 BOTÕES DE AÇÃO */}
      

      {/* BLOCO B — CARDS DE RESUMO (3 cards compactos) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div 
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(52,211,153,0.10)' }}>
              <TrendingUp size={16} color="#34D399" />
            </div>
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[10px] font-semibold text-zinc-500 font-inter">Receitas/mês</span>
              <span className="text-[20px] font-bold tabular-nums text-[#34D399] font-outfit mt-0.5">{formatCurrency(totalIncome)}</span>
            </div>
          </div>
        </div>

        <div 
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(248,113,113,0.10)' }}>
              <TrendingDown size={16} color="#F87171" />
            </div>
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[10px] font-semibold text-zinc-500 font-inter">Despesas/mês</span>
              <span className="text-[20px] font-bold tabular-nums text-[#F87171] font-outfit mt-0.5">{formatCurrency(totalExpense)}</span>
            </div>
          </div>
        </div>

        <div 
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ backgroundColor: 'rgba(17,17,19,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(139,92,246,0.10)' }}>
              <RefreshCw size={16} color="#8B5CF6" />
            </div>
            <div className="flex flex-col">
              <span className="uppercase tracking-widest text-[10px] font-semibold text-zinc-500 font-inter">Impacto líquido</span>
              <span 
                className={`text-[20px] font-bold tabular-nums font-outfit mt-0.5 ${netImpact >= 0 ? 'gradient-net' : 'text-[#F87171]'}`}
              >
                {formatCurrency(netImpact)}
              </span>
            </div>
          </div>
        </div>
      </div> */}

				<div>
          <h2 className="text-[18px] font-semibold text-white font-outfit">
            Recorrências
          </h2>
          <p className="text-[13px] text-zinc-500 mt-0.5">
            Receitas e despesas automáticas do seu mês
          </p>
        </div>

      {/* BLOCO C — FILTROS DA LISTA */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'income', label: 'Receitas' },
          { key: 'expense', label: 'Despesas' }
        ].map(filter => {
          const isActive = filterType === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key as any)}
              className="h-8 px-[14px] rounded-lg text-[12px] font-medium transition-all duration-150 font-inter outline-none"
              style={{
                backgroundColor: isActive ? 'rgba(139,92,246,0.10)' : 'transparent',
                borderColor: isActive ? 'rgba(139,92,246,0.20)' : 'rgba(255,255,255,0.06)',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: isActive ? '#C4B5FD' : '#71717A'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#D4D4D8';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#71717A';
                }
              }}
            >
              {filter.label}
            </button>
          );
        })}
        <div className="flex-1 text-right text-[12px] text-zinc-500 font-inter">
          {filteredRecurrences.length} {filteredRecurrences.length === 1 ? 'recorrência ativa' : 'recorrências ativas'}
        </div>
      </div>

      {/* BLOCO D — LISTA COMPLETA DE RECORRÊNCIAS */}
      <div 
        className="rounded-[24px] overflow-hidden"
        style={{ 
          background: 'linear-gradient(to bottom right, #111113, #151518)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
        }}
      >
        {filteredRecurrences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center col-span-1 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5" style={{ backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <RefreshCw size={22} color="#8B5CF6" />
            </div>
            <h3 className="text-[15px] font-semibold text-white font-outfit">Nenhuma recorrência cadastrada</h3>
            <p className="text-[13px] text-zinc-500 mt-1 max-w-[280px] font-inter">
              Adicione receitas e despesas fixas para automatizar seu controle financeiro.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {filteredRecurrences.map((rec, index) => {
              const isInc = rec.type === 'INCOME';
              const amtColor = isInc ? '#34D399' : '#F87171';
              const formattedAmt = `${isInc ? '+' : '−'}${formatCurrency(rec.amount)}`;
              
              // Verifica se a célula atual está na coluna da esquerda no modo Desktop (para adicionar a borda direita)
              const isLeftColumn = index % 2 === 0;

              return (
                <div 
                  key={rec.id}
                  className="group flex items-center gap-3.5 px-5 py-[18px] transition-colors duration-150"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    borderRight: isLeftColumn ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Ícone */}
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isInc ? 'rgba(52,211,153,0.10)' : 'rgba(248,113,113,0.10)' }}
                  >
                    {isInc ? <TrendingUp size={18} color="#34D399" /> : <TrendingDown size={18} color="#F87171" />}
                  </div>

                  {/* Informações da Recorrência */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-[14px] font-semibold text-white font-inter truncate">
                        {rec.name}
                      </span>
                      <span className="text-[15px] font-bold tabular-nums font-outfit shrink-0" style={{ color: amtColor }}>
                        {formattedAmt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span 
                        className="text-[10px] font-semibold rounded-md px-2 py-0.5 font-inter"
                        style={{ 
                          backgroundColor: 'rgba(139,92,246,0.08)', 
                          border: '1px solid rgba(139,92,246,0.15)',
                          color: '#C4B5FD' 
                        }}
                      >
                        {getFrequencyLabel(rec.frequency)}
                      </span>
                      <span className="text-zinc-600 text-[10px]">·</span>
                      <span className="text-[11px] text-zinc-500 font-inter">
                        {getOccurrenceText(rec)}
                      </span>
                      {rec.category && (
                        <>
                          <span className="text-zinc-600 text-[10px]">·</span>
                          <span className="text-[11px] text-zinc-500 font-inter truncate max-w-[80px]">
                            {rec.category}
                          </span>
                        </>
                      )}
                      <span className="text-zinc-600 text-[10px]">·</span>
                      <span className="text-[11px] text-zinc-500 font-inter truncate max-w-[80px]">
                        {rec.wallet}
                      </span>
                    </div>
                  </div>

                  {/* Ações Rápidas (Sempre visíveis no Mobile, Visíveis no Hover no Desktop) */}
                  <div className="flex items-center gap-1.5 shrink-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      onClick={(e) => { e.stopPropagation(); onEditRecurrence(rec); }}
                      className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none border-none bg-transparent cursor-pointer text-zinc-500"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.color = '#D4D4D8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#71717A';
                      }}
                      title="Editar"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteRecurrence(rec.id); }}
                      className="w-[30px] h-[30px] rounded-lg flex items-center justify-center transition-colors outline-none border-none cursor-pointer"
                      style={{ backgroundColor: 'rgba(248,113,113,0.08)', color: '#F87171' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(248,113,113,0.08)'}
                      title="Remover"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
}