import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CalendarDays, 
  CalendarRange, 
  Calendar, 
  RefreshCw, 
  ChevronDown, 
  MoreVertical,
  Check
} from 'lucide-react';

// ==========================================================================
// TYPES & INTERFACES
// ==========================================================================

export type BillingTimeType = 'MONTHLY' | 'BIWEEKLY' | 'YEARLY';
export type RecurrenceType = 'INCOME' | 'EXPENSE';

export interface Recurrence {
  id: string;
  name: string;
  type: RecurrenceType;
  amount: number;
  billingTimeType: BillingTimeType;
  dayOne: number;
  dayTwo?: number;
  monthOfTheYear?: number; // 1 a 12 (Janeiro a Dezembro)
  category: string;
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  recurrences: Recurrence[];
}

// ==========================================================================
// DADOS MOCKADOS REALISTAS
// ==========================================================================

const INITIAL_RECURRENCES: Recurrence[] = [
  { id: '1', name: 'Salário Principal', type: 'INCOME', amount: 5200, billingTimeType: 'MONTHLY', dayOne: 5, category: 'Salário' },
  { id: '2', name: 'Freelance Design', type: 'INCOME', amount: 1500, billingTimeType: 'BIWEEKLY', dayOne: 1, dayTwo: 15, category: 'Freelance' },
  { id: '3', name: 'Aluguel do Apê', type: 'EXPENSE', amount: 1200, billingTimeType: 'MONTHLY', dayOne: 10, category: 'Moradia' },
  { id: '4', name: 'Netflix Premium', type: 'EXPENSE', amount: 55.90, billingTimeType: 'MONTHLY', dayOne: 15, category: 'Assinaturas' },
  { id: '5', name: 'Spotify Familiar', type: 'EXPENSE', amount: 21.90, billingTimeType: 'MONTHLY', dayOne: 15, category: 'Assinaturas' },
  { id: '6', name: 'Academia Fox', type: 'EXPENSE', amount: 120, billingTimeType: 'MONTHLY', dayOne: 1, category: 'Saúde' },
  { id: '7', name: 'IPVA Carro', type: 'EXPENSE', amount: 890, billingTimeType: 'YEARLY', dayOne: 15, monthOfTheYear: 3, category: 'Transporte' },
  { id: '8', name: 'Curso de Inglês', type: 'EXPENSE', amount: 197, billingTimeType: 'MONTHLY', dayOne: 20, category: 'Educação' },
];

const CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Freelance', 'Assinaturas', 'Outros'];

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
};

const getMonthName = (month: number, year: number): string => {
  const date = new Date(year, month, 1);
  const rawLabel = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1);
};

// ==========================================================================
// COMPONENT: RECURRENCES PAGE (Tema Dark Exclusivamente)
// ==========================================================================

interface RecurrencesProps {
	isSidebarExpanded: boolean
}

function Recurrences({ isSidebarExpanded }: RecurrencesProps) {
  // --- ESTADOS ---
  const [recurrences, setRecurrences] = useState<Recurrence[]>(INITIAL_RECURRENCES);
  
  // Controle de exibição do Calendário
  const todayDate = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(todayDate.getMonth()); // 0-11
  const [currentYear, setCurrentYear] = useState<number>(todayDate.getFullYear());
  
  // Filtros de tipo para a lista à direita
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Controle de abertura do Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<RecurrenceType | null>(null);
  const [modalPrefilledDay, setModalPrefilledDay] = useState<number | null>(null);

  // Estados de controle do Formulário de Cadastro
  const [formName, setFormName] = useState<string>('');
  const [formAmount, setFormAmount] = useState<string>('');
  const [formFrequency, setFormFrequency] = useState<BillingTimeType>('MONTHLY');
  const [formDayOne, setFormDayOne] = useState<number>(5);
  const [formDayTwo, setFormDayTwo] = useState<number>(20);
  const [formMonth, setFormMonth] = useState<number>(1);
  const [formCategory, setFormCategory] = useState<string>('');

  // Carregar fontes do Google e estilos CSS dinâmicos
  useEffect(() => {
    const linkFonts = document.createElement('link');
    linkFonts.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600&family=Inter:wght@400;500;600&display=swap';
    linkFonts.rel = 'stylesheet';
    document.head.appendChild(linkFonts);

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .font-money {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
      }
      .font-sans {
        font-family: 'Inter', sans-serif !important;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .gradient-text-positive {
        background: linear-gradient(135deg, #4ADE80, #22D3EE);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes modalSlideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-overlay {
        animation: modalFadeIn 250ms ease forwards;
      }
      .animate-card {
        animation: modalSlideUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        animation-delay: 50ms;
      }
      .theme-transition {
        transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease, box-shadow 150ms ease !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(linkFonts);
      document.head.removeChild(styleElement);
    };
  }, []);

  // --- LÓGICA DE NEGÓCIO ---

  // 1. Estatísticas de Resumo Superior
  const summaryMetrics = useMemo(() => {
    let incomeSum = 0;
    let incomeCount = 0;
    let expenseSum = 0;
    let expenseCount = 0;

    recurrences.forEach(rec => {
      // Ajusta o multiplicador quinzenal para representação mensal real
      const multiplier = rec.billingTimeType === 'BIWEEKLY' ? 2 : 1;
      const amountCalculated = rec.amount * multiplier;

      if (rec.type === 'INCOME') {
        incomeSum += amountCalculated;
        incomeCount++;
      } else {
        expenseSum += amountCalculated;
        expenseCount++;
      }
    });

    return {
      incomeSum,
      incomeCount,
      expenseSum,
      expenseCount,
      netSum: incomeSum - expenseSum
    };
  }, [recurrences]);

  // 2. Filtrar Recorrências para exibição na lista à direita
  const filteredRecurrences = useMemo(() => {
    return recurrences.filter(rec => {
      if (filterType === 'all') return true;
      if (filterType === 'income') return rec.type === 'INCOME';
      return rec.type === 'EXPENSE';
    });
  }, [recurrences, filterType]);

  // 3. Função Auxiliar para verificar e mapear recorrências a um dia específico
  const getDayRecurrences = (day: number, month: number, year: number): Recurrence[] => {
    const calendarMonthIndex = month + 1; // 1-12
    return recurrences.filter(rec => {
      if (rec.billingTimeType === 'MONTHLY') {
        return rec.dayOne === day;
      }
      if (rec.billingTimeType === 'BIWEEKLY') {
        return rec.dayOne === day || rec.dayTwo === day;
      }
      if (rec.billingTimeType === 'YEARLY') {
        return rec.dayOne === day && rec.monthOfTheYear === calendarMonthIndex;
      }
      return false;
    });
  };

  // 4. Construtor Nativo do Calendário (Matrix 7 colunas x semanas)
  const calendarGrid = useMemo(() => {
    const grid: CalendarDay[][] = [];
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let currentDayNum = 1;
    let week: CalendarDay[] = [];

    // Preenche com dias vazios do mês anterior para alinhar o dia da semana inicial
    for (let i = 0; i < firstDayIndex; i++) {
      week.push({ day: 0, isCurrentMonth: false, isToday: false, recurrences: [] });
    }

    // Preenche os dias reais do mês
    while (currentDayNum <= daysInMonth) {
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }

      const isToday = todayDate.getDate() === currentDayNum && 
                      todayDate.getMonth() === currentMonth && 
                      todayDate.getFullYear() === currentYear;

      const dayRecs = getDayRecurrences(currentDayNum, currentMonth, currentYear);

      week.push({
        day: currentDayNum,
        isCurrentMonth: true,
        isToday,
        recurrences: dayRecs
      });

      currentDayNum++;
    }

    // Completa o restante da última semana com células de dia vazio
    if (week.length > 0) {
      while (week.length < 7) {
        week.push({ day: 0, isCurrentMonth: false, isToday: false, recurrences: [] });
      }
      grid.push(week);
    }

    return grid;
  }, [currentMonth, currentYear, recurrences]);

  // --- NAVEGAÇÃO DO CALENDÁRIO ---
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // --- SUBMIT DO FORMULÁRIO DO MODAL ---
  const handleOpenModal = (type: RecurrenceType | null = null, day: number | null = null) => {
    setModalType(type);
    setFormFrequency('MONTHLY');
    setFormCategory('');
    setFormName('');
    setFormAmount('');
    if (day !== null) {
      setFormDayOne(day);
      setModalPrefilledDay(day);
    } else {
      setFormDayOne(5);
      setModalPrefilledDay(null);
    }
    setShowModal(true);
  };

  const handleSaveRecurrence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAmount || !formCategory) return;

    const numericAmount = parseFloat(formAmount.replace(/\D/g, '')) / 100;
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const resolvedType = modalType || 'EXPENSE';

    const newRec: Recurrence = {
      id: Date.now().toString(),
      name: formName,
      type: resolvedType,
      amount: numericAmount,
      billingTimeType: formFrequency,
      dayOne: formDayOne,
      dayTwo: formFrequency === 'BIWEEKLY' ? formDayTwo : undefined,
      monthOfTheYear: formFrequency === 'YEARLY' ? formMonth : undefined,
      category: formCategory
    };

    setRecurrences(prev => [newRec, ...prev]);
    setShowModal(false);

    console.log('Recorrência adicionada com sucesso:', newRec);
  };

  const isCurrentMonthExhibited = todayDate.getMonth() === currentMonth && todayDate.getFullYear() === currentYear;

  return (
		<main 
			className="flex-1 flex flex-col overflow-y-auto mt-14 lg:mt-0"
			style={{
				marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024
					? (isSidebarExpanded ? '240px' : '68px')
					: '0px',
				transition: 'margin-left 250ms cubic-bezier(0.4, 0, 0.2, 1)'
			}}
		>
			<div className="flex-1 flex flex-col min-w-0 transition-colors duration-200 overflow-x-hidden p-6 md:p-10 max-w-[1440px] w-full mx-auto gap-8 bg-[#0D0D0D]">
      
				{/* ──────────────────────────────────────────────────────────────────────────
						BLOCO 1 — HEADER DA PÁGINA
						────────────────────────────────────────────────────────────────────────── */}
				<header className="flex flex-row justify-between items-start gap-4">
					<div>
						<h1 className="text-2xl font-semibold tracking-tight font-sans text-[#EDEDED] leading-none">
							Recorrências
						</h1>
						<p className="text-sm font-sans text-[#71717A] mt-2">
							Gerencie suas receitas e despesas automáticas
						</p>
					</div>

					<button 
						onClick={() => handleOpenModal(null, null)}
						className="h-[38px] px-4 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer active:scale-[0.99] border-none text-white font-sans"
						style={{ backgroundColor: '#6366F1' }}
						onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5558E3'}
						onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366F1'}
					>
						<Plus size={15} />
						Nova Recorrência
					</button>
				</header>

				{/* ──────────────────────────────────────────────────────────────────────────
						BLOCO 2 — CARDS DE RESUMO (3 cards em linha)
						────────────────────────────────────────────────────────────────────────── */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
					{/* Receitas Recorrentes */}
					<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-[#4ADE8014] flex items-center justify-center text-[#4ADE80] shrink-0">
								<TrendingUp size={16} />
							</div>
							<span className="text-[11px] font-semibold uppercase tracking-[0.08em] font-sans text-[#71717A]">
								Receitas Mensais
							</span>
						</div>
						<div className="mt-4">
							<div className="text-[22px] font-semibold tabular-nums font-money text-[#4ADE80]">
								{formatCurrency(summaryMetrics.incomeSum)}
							</div>
							<span className="text-[12px] font-sans block mt-1 text-[#71717A]">
								{summaryMetrics.incomeCount} {summaryMetrics.incomeCount === 1 ? 'recorrência ativa' : 'recorrências ativas'}
							</span>
						</div>
					</div>

					{/* Despesas Recorrentes */}
					<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-[#F8717114] flex items-center justify-center text-[#F87171] shrink-0">
								<TrendingDown size={16} />
							</div>
							<span className="text-[11px] font-semibold uppercase tracking-[0.08em] font-sans text-[#71717A]">
								Despesas Mensais
							</span>
						</div>
						<div className="mt-4">
							<div className="text-[22px] font-semibold tabular-nums font-money text-[#F87171]">
								{formatCurrency(summaryMetrics.expenseSum)}
							</div>
							<span className="text-[12px] font-sans block mt-1 text-[#71717A]">
								{summaryMetrics.expenseCount} {summaryMetrics.expenseCount === 1 ? 'recorrência ativa' : 'recorrências ativas'}
							</span>
						</div>
					</div>

					{/* Saldo Recorrente */}
					<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-5 flex flex-col justify-between min-h-[120px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: summaryMetrics.netSum >= 0 ? '#4ADE8014' : '#F8717114' }}>
								<Wallet size={16} style={{ color: summaryMetrics.netSum >= 0 ? '#4ADE80' : '#F87171' }} />
							</div>
							<span className="text-[11px] font-semibold uppercase tracking-[0.08em] font-sans text-[#71717A]">
								Impacto Mensal Líquido
							</span>
						</div>
						<div className="mt-4">
							{summaryMetrics.netSum >= 0 ? (
								<div className="text-[22px] font-semibold tabular-nums font-money gradient-text-positive select-all">
									{formatCurrency(summaryMetrics.netSum)}
								</div>
							) : (
								<div className="text-[22px] font-semibold tabular-nums font-money select-all text-[#F87171]">
									{formatCurrency(summaryMetrics.netSum)}
								</div>
							)}
							<span className="text-[12px] font-sans block mt-1 text-[#71717A]">
								receitas − despesas recorrentes
							</span>
						</div>
					</div>
				</section>

				{/* ──────────────────────────────────────────────────────────────────────────
						BLOCO 3 — LAYOUT PRINCIPAL (Colunas)
						────────────────────────────────────────────────────────────────────────── */}
				<section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 w-full items-start">
					
					{/* COLUNA ESQUERDA — CALENDÁRIO FINANCEIRO */}
					<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl p-6 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full">
						
						{/* Header do Calendário */}
						<div className="flex flex-row justify-between items-center mb-5">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-1">
									<button
										onClick={handlePrevMonth}
										className="w-[34px] h-[34px] rounded-xl border border-[#2A2A2A] bg-[#141414] text-[#71717A] hover:text-[#EDEDED] hover:border-[#71717A] flex items-center justify-center transition-colors outline-none cursor-pointer"
									>
										<ChevronLeft size={16} />
									</button>
									<span className="text-base font-semibold font-sans text-[#EDEDED] min-w-[120px] text-center select-none">
										{getMonthName(currentMonth, currentYear)}
									</span>
									<button
										onClick={handleNextMonth}
										className="w-[34px] h-[34px] rounded-xl border border-[#2A2A2A] bg-[#141414] text-[#71717A] hover:text-[#EDEDED] hover:border-[#71717A] flex items-center justify-center transition-colors outline-none cursor-pointer"
									>
										<ChevronRight size={16} />
									</button>
								</div>

								{isCurrentMonthExhibited && (
									<span className="text-[11px] font-semibold border rounded-lg px-2.5 py-0.5 bg-[#6366F118] border-[#6366F140] text-[#6366F1] select-none">
										Hoje
									</span>
								)}
							</div>

							{/* Legenda Lateral */}
							<div className="flex items-center gap-4 text-xs font-medium text-[#A1A1AA] select-none">
								<div className="flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
									<span>Receitas</span>
								</div>
								<div className="flex items-center gap-1.5">
									<span className="w-1.5 h-1.5 rounded-full bg-[#F87171]" />
									<span>Despesas</span>
								</div>
							</div>
						</div>

						{/* Grid de Dias da Semana */}
						<div className="grid grid-cols-7 text-center select-none mb-2 border-b border-[#2A2A2A] pb-2">
							{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
								<span key={day} className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#71717A]">
									{day}
								</span>
							))}
						</div>

						{/* Grid de Dias do Calendário */}
						<div className="grid grid-cols-7 gap-1">
							{calendarGrid.map((week, wIdx) => (
								<React.Fragment key={wIdx}>
									{week.map((cell, dIdx) => {
										if (cell.day === 0) {
											return (
												<div key={dIdx} className="h-14 lg:h-[72px] bg-transparent" />
											);
										}

										const hasRecs = cell.recurrences.length > 0;
										const hasIncome = cell.recurrences.some(r => r.type === 'INCOME');
										const hasExpense = cell.recurrences.some(r => r.type === 'EXPENSE');

										// Estilização condicional baseada na presença de dados
										let cellBg = '#0D0D0D';
										let cellBorder = '1px solid #1A1A1A';

										if (hasRecs) {
											if (hasIncome && hasExpense) {
												cellBg = '#6366F108';
												cellBorder = '1px solid rgba(99, 102, 241, 0.25)';
											} else if (hasIncome) {
												cellBg = '#4ADE8008';
												cellBorder = '1px solid rgba(74, 222, 128, 0.18)';
											} else {
												cellBg = '#F871710A';
												cellBorder = '1px solid rgba(248, 113, 113, 0.18)';
											}
										}

										if (cell.isToday) {
											cellBg = 'rgba(99, 102, 241, 0.08)';
											cellBorder = '1px solid rgba(99, 102, 241, 0.40)';
										}

										return (
											<div
												key={dIdx}
												className="relative h-14 lg:h-[72px] rounded-xl flex flex-col justify-between p-1.5 transition-all group overflow-hidden border theme-transition"
												style={{ 
													backgroundColor: cellBg,
													border: cellBorder
												}}
											>
												{/* Número do Dia */}
												<div className="flex justify-between items-center w-full">
													{cell.isToday ? (
														<div className="w-[22px] h-[22px] rounded-lg bg-[#6366F1] flex items-center justify-center text-white text-[12px] font-semibold font-sans">
															{cell.day}
														</div>
													) : (
														<span className="text-[13px] font-medium font-sans p-0.5" style={{ color: hasRecs ? '#EDEDED' : '#71717A' }}>
															{cell.day}
														</span>
													)}
												</div>

												{/* Pills das Recorrências no Dia (Esconde no Hover para dar lugar às ações rápidas) */}
												<div className="flex flex-col gap-1 w-full max-h-[36px] overflow-hidden group-hover:opacity-0 transition-opacity duration-150">
													{cell.recurrences.slice(0, 2).map(rec => {
														const isInc = rec.type === 'INCOME';
														return (
															<div 
																key={rec.id}
																className="text-[9px] lg:text-[10px] rounded-md px-1.5 py-0.5 border truncate flex items-center gap-1 tracking-wide"
																style={{
																	backgroundColor: isInc ? '#4ADE8018' : '#F8717118',
																	borderColor: isInc ? '#4ADE8030' : '#F8717130',
																	color: isInc ? '#4ADE80' : '#F87171'
																}}
															>
																<span className="truncate">{rec.name}</span>
															</div>
														);
													})}
													{cell.recurrences.length > 2 && (
														<div className="text-[9px] rounded-md px-1.5 py-0.5 bg-[#6366F118] text-[#6366F1] text-center font-semibold">
															+{cell.recurrences.length - 2} mais
														</div>
													)}
												</div>

												{/* Botões Rápidos de Cadastro que surgem no Hover */}
												<div className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#1A1A1A]/80 pointer-events-auto">
													<button
														onClick={() => handleOpenModal('INCOME', cell.day)}
														title="Adicionar receita"
														className="w-[22px] h-[22px] rounded-md bg-[#4ADE8020] border border-[#4ADE8040] text-[#4ADE80] flex items-center justify-center cursor-pointer hover:bg-[#4ADE8035] transition-colors outline-none"
													>
														<Plus size={12} />
													</button>
													<button
														onClick={() => handleOpenModal('EXPENSE', cell.day)}
														title="Adicionar despesa"
														className="w-[22px] h-[22px] rounded-md bg-[#F8717120] border border-[#F8717140] text-[#F87171] flex items-center justify-center cursor-pointer hover:bg-[#F8717135] transition-colors outline-none"
													>
														<X size={10} />
													</button>
												</div>

											</div>
										);
									})}
								</React.Fragment>
							))}
						</div>

					</div>

					{/* COLUNA DIREITA — LISTA DE RECORRÊNCIAS ATIVAS */}
					<div className="bg-[#141414] border border-[#2A2A2A] rounded-3xl flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full overflow-hidden">
						{/* Header da lista */}
						<div className="px-5 py-4 border-b border-[#2A2A2A] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
							<h3 className="text-sm font-semibold font-sans text-[#EDEDED]">
								Recorrências Ativas
							</h3>

							{/* Pills de Filtragem */}
							<div className="flex items-center gap-1">
								{[
									{ type: 'all', label: 'Todas' },
									{ type: 'income', label: 'Receitas' },
									{ type: 'expense', label: 'Despesas' }
								].map(opt => {
									const isActive = filterType === opt.type;
									return (
										<button
											key={opt.type}
											onClick={() => setFilterType(opt.type as any)}
											className="py-1 px-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-150 border-none outline-none font-sans"
											style={{
												backgroundColor: isActive ? '#6366F118' : 'transparent',
												color: isActive ? '#6366F1' : '#71717A'
											}}
											onMouseEnter={(e) => {
												if (!isActive) e.currentTarget.style.color = '#A1A1AA';
											}}
											onMouseLeave={(e) => {
												if (!isActive) e.currentTarget.style.color = '#71717A';
											}}
										>
											{opt.label}
										</button>
									);
								})}
							</div>
						</div>

						{/* Lista de Recorrências */}
						<div className="overflow-y-auto max-h-[500px] scrollbar-hide flex flex-col divide-y divide-[#2A2A2A]">
							{filteredRecurrences.length === 0 ? (
								/* Estado Vazio */
								<div className="flex flex-col items-center justify-center py-16 px-6 text-center select-none">
									<RefreshCw size={28} className="text-[#71717A] animate-spin mb-4" style={{ animationDuration: '3s' }} />
									<h4 className="text-sm font-medium font-sans text-[#A1A1AA]">
										Nenhuma recorrência cadastrada
									</h4>
									<p className="text-xs font-sans text-[#71717A] mt-2 max-w-[280px]">
										Adicione recorrências para controlar seus gastos e receitas fixos.
									</p>
								</div>
							) : (
								filteredRecurrences.map(rec => {
									const isInc = rec.type === 'INCOME';
									const formattedAmt = isInc ? `+${formatCurrency(rec.amount)}` : `−${formatCurrency(rec.amount)}`;
									const amtColor = isInc ? '#4ADE80' : '#F87171';

									// Determina descrição da data de ocorrência
									let occurrenceText = '';
									if (rec.billingTimeType === 'MONTHLY') {
										occurrenceText = `Todo dia ${rec.dayOne}`;
									} else if (rec.billingTimeType === 'BIWEEKLY') {
										occurrenceText = `Dias ${rec.dayOne} e ${rec.dayTwo}`;
									} else if (rec.billingTimeType === 'YEARLY') {
										const mNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
										const monthName = mNames[(rec.monthOfTheYear || 1) - 1];
										occurrenceText = `${rec.dayOne} de ${monthName}`;
									}

									return (
										<div 
											key={rec.id}
											className="p-5 flex items-center justify-between gap-4 group transition-colors duration-150"
											onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1A1A'}
											onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
										>
											<div className="flex items-center gap-3.5 flex-1 min-w-0">
												{/* Ícone contextual */}
												<div 
													className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
													style={{ backgroundColor: isInc ? '#4ADE8014' : '#F8717114', color: amtColor }}
												>
													{isInc ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
												</div>

												{/* Nome, Valor e Detalhes */}
												<div className="flex-1 flex flex-col min-w-0">
													<div className="flex justify-between items-center w-full">
														<span className="text-sm font-medium font-sans text-[#EDEDED] truncate max-w-[180px]">
															{rec.name}
														</span>
														<span className="text-sm font-semibold font-money tabular-num" style={{ color: amtColor }}>
															{formattedAmt}
														</span>
													</div>

													{/* Metadados */}
													<div className="flex items-center gap-2 mt-1.5 flex-wrap">
														<span className="text-[10px] font-semibold font-sans px-1.5 py-0.5 bg-[#6366F118] border border-[#6366F140] text-[#6366F1] rounded-md select-none">
															{rec.billingTimeType === 'MONTHLY' ? 'Mensal' : rec.billingTimeType === 'BIWEEKLY' ? 'Quinzenal' : 'Anual'}
														</span>
														<span className="text-[#71717A] text-[10px] select-none">•</span>
														<span className="text-xs font-sans text-[#71717A] truncate max-w-[120px]">
															{occurrenceText}
														</span>
														{rec.category && (
															<>
																<span className="text-[#71717A] text-[10px] select-none">•</span>
																<span className="text-xs font-sans text-[#71717A] truncate">
																	{rec.category}
																</span>
															</>
														)}
													</div>
												</div>
											</div>

											{/* Menu de Ações Rápido */}
											<button
												onClick={() => console.log('Ações de recorrência:', rec.id)}
												className="w-7 h-7 rounded-lg text-[#71717A] hover:text-[#EDEDED] hover:bg-[#2A2A2A] flex items-center justify-center transition-colors outline-none cursor-pointer border-none bg-transparent opacity-0 group-hover:opacity-100 duration-150 shrink-0"
											>
												<MoreVertical size={16} />
											</button>

										</div>
									);
								})
							)}
						</div>
					</div>

				</section>

				{/* ──────────────────────────────────────────────────────────────────────────
						BLOCO 6 — MODAL DE NOVA RECORRÊNCIA
						────────────────────────────────────────────────────────────────────────── */}
				{showModal && (
					<div 
						onClick={() => setShowModal(false)}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay"
						style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
					>
						{/* Card do Modal */}
						<div 
							onClick={(e) => e.stopPropagation()}
							className="w-full max-w-[460px] rounded-3xl p-7 border flex flex-col animate-card max-h-[90vh] overflow-y-auto scrollbar-hide transition-colors duration-200"
							style={{ 
								backgroundColor: '#141414', 
								borderColor: '#2A2A2A',
								boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
							}}
						>
							{/* Header do Modal */}
							<div className="flex justify-between items-center mb-6">
								<div className="flex items-center gap-3">
									<div 
										className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
										style={{ 
											backgroundColor: modalType === 'INCOME' ? '#4ADE8014' : modalType === 'EXPENSE' ? '#F8717114' : '#6366F118'
										}}
									>
										{modalType === 'INCOME' ? (
											<TrendingUp size={18} className="text-[#4ADE80]" />
										) : modalType === 'EXPENSE' ? (
											<TrendingDown size={18} className="text-[#F87171]" />
										) : (
											<RefreshCw size={18} className="text-[#6366F1]" />
										)}
									</div>
									<h3 className="text-[17px] font-semibold font-sans text-[#EDEDED]">
										Nova Recorrência
									</h3>
								</div>

								<button 
									onClick={() => setShowModal(false)}
									className="p-1 rounded-lg hover:bg-[#1E1E1E] transition-colors cursor-pointer outline-none border-none bg-transparent"
									style={{ color: '#71717A' }}
								>
									<X size={18} />
								</button>
							</div>

							{/* SELETOR DE TIPO (Receita / Despesa) */}
							<div className="flex gap-2 mb-5">
								<button
									type="button"
									onClick={() => setModalType('INCOME')}
									className="flex-1 h-10 rounded-xl flex items-center justify-center gap-2 font-semibold font-sans text-[13px] border transition-all cursor-pointer"
									style={{
										backgroundColor: modalType === 'INCOME' ? '#4ADE8018' : '#0D0D0D',
										borderColor: modalType === 'INCOME' ? '#4ADE8040' : '#2A2A2A',
										color: modalType === 'INCOME' ? '#4ADE80' : '#71717A'
									}}
								>
									<TrendingUp size={14} />
									Receita
								</button>
								
								<button
									type="button"
									onClick={() => setModalType('EXPENSE')}
									className="flex-1 h-10 rounded-xl flex items-center justify-center gap-2 font-semibold font-sans text-[13px] border transition-all cursor-pointer"
									style={{
										backgroundColor: modalType === 'EXPENSE' ? '#F8717118' : '#0D0D0D',
										borderColor: modalType === 'EXPENSE' ? '#F8717140' : '#2A2A2A',
										color: modalType === 'EXPENSE' ? '#F87171' : '#71717A'
									}}
								>
									<TrendingDown size={14} />
									Despesa
								</button>
							</div>

							{/* FORMULÁRIO DE CADASTRO */}
							<form onSubmit={handleSaveRecurrence} className="flex flex-col gap-4">
								
								{/* CAMPO NOME */}
								<div className="flex flex-col">
									<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
										Nome da recorrência
									</label>
									<input
										type="text"
										required
										value={formName}
										onChange={(e) => setFormName(e.target.value)}
										placeholder="Ex: Salário, Netflix, Aluguel..."
										className="h-11 px-3.5 rounded-xl font-sans text-[13px] border outline-none theme-transition bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
										onFocus={(e) => {
											e.target.style.borderColor = '#6366F1';
											e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.12)';
										}}
										onBlur={(e) => {
											e.target.style.borderColor = '#2A2A2A';
											e.target.style.boxShadow = 'none';
										}}
									/>
								</div>

								{/* CAMPO VALOR */}
								<div className="flex flex-col">
									<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
										Valor
									</label>
									<div 
										className="relative w-full h-11 border rounded-xl flex items-center theme-transition"
										style={{ backgroundColor: '#0D0D0D', borderColor: '#2A2A2A' }}
										onFocus={(e) => {
											e.currentTarget.style.borderColor = '#6366F1';
											e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.12)';
										}}
										onBlur={(e) => {
											e.currentTarget.style.borderColor = '#2A2A2A';
											e.currentTarget.style.boxShadow = 'none';
										}}
									>
										<span className="absolute left-3.5 font-sans font-medium text-[14px] text-[#71717A]">
											R$
										</span>
										<input
											type="text"
											required
											value={formAmount}
											onChange={(e) => {
												const raw = e.target.value.replace(/\D/g, '');
												if (!raw) {
													setFormAmount('');
													return;
												}
												const num = parseFloat(raw) / 100;
												setFormAmount(num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
											}}
											placeholder="0,00"
											className="w-full h-full bg-transparent border-none outline-none pl-11 pr-4 font-money text-[15px] font-semibold tabular-nums text-[#EDEDED]"
										/>
									</div>
								</div>

								{/* CAMPO FREQUÊNCIA */}
								<div className="flex flex-col">
									<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-2 text-[#71717A]">
										Frequência
									</label>
									<div className="flex gap-2">
										{[
											{ key: 'MONTHLY', label: 'Mensal', sub: 'Todo mês', icon: CalendarDays },
											{ key: 'BIWEEKLY', label: 'Quinzenal', sub: '2x por mês', icon: CalendarRange },
											{ key: 'YEARLY', label: 'Anual', sub: '1x por ano', icon: Calendar }
										].map(f => {
											const isSel = formFrequency === f.key;
											const Icon = f.icon;
											return (
												<button
													key={f.key}
													type="button"
													onClick={() => setFormFrequency(f.key as any)}
													className="flex-1 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 border transition-all cursor-pointer font-sans"
													style={{
														backgroundColor: isSel ? '#6366F118' : '#0D0D0D',
														borderColor: isSel ? '#6366F140' : '#2A2A2A',
														color: isSel ? '#6366F1' : '#71717A'
													}}
												>
													<div className="flex items-center gap-1.5 text-xs font-semibold">
														<Icon size={14} />
														{f.label}
													</div>
													<span className="text-[9px] opacity-80">{f.sub}</span>
												</button>
											);
										})}
									</div>
								</div>

								{/* CAMPOS DINÂMICOS DE DIA */}
								{formFrequency === 'MONTHLY' && (
									<div className="flex flex-col">
										<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
											Dia do mês
										</label>
										<div className="relative">
											<select
												value={formDayOne}
												onChange={(e) => setFormDayOne(parseInt(e.target.value))}
												className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
											>
												{Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
													<option key={day} value={day}>Dia {day}</option>
												))}
											</select>
											<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
										</div>
									</div>
								)}

								{formFrequency === 'BIWEEKLY' && (
									<div className="grid grid-cols-2 gap-3">
										<div className="flex flex-col">
											<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
												Primeiro dia
											</label>
											<div className="relative">
												<select
													value={formDayOne}
													onChange={(e) => setFormDayOne(parseInt(e.target.value))}
													className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
												>
													{Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
														<option key={day} value={day}>Dia {day}</option>
													))}
												</select>
												<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
											</div>
										</div>

										<div className="flex flex-col">
											<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
												Segundo dia
											</label>
											<div className="relative">
												<select
													value={formDayTwo}
													onChange={(e) => setFormDayTwo(parseInt(e.target.value))}
													className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
												>
													{Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
														<option key={day} value={day}>Dia {day}</option>
													))}
												</select>
												<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
											</div>
										</div>
									</div>
								)}

								{formFrequency === 'YEARLY' && (
									<div className="grid grid-cols-2 gap-3">
										<div className="flex flex-col">
											<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
												Mês
											</label>
											<div className="relative">
												<select
													value={formMonth}
													onChange={(e) => setFormMonth(parseInt(e.target.value))}
													className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
												>
													{['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((m, idx) => (
														<option key={m} value={idx + 1}>{m}</option>
													))}
												</select>
												<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
											</div>
										</div>

										<div className="flex flex-col">
											<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
												Dia
											</label>
											<div className="relative">
												<select
													value={formDayOne}
													onChange={(e) => setFormDayOne(parseInt(e.target.value))}
													className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
												>
													{Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
														<option key={day} value={day}>Dia {day}</option>
													))}
												</select>
												<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
											</div>
										</div>
									</div>
								)}

								{/* CAMPO CATEGORIA */}
								<div className="flex flex-col">
									<label className="text-[11px] font-medium font-sans uppercase tracking-[0.06em] mb-1.5 text-[#71717A]">
										Categoria
									</label>
									<div className="relative">
										<select
											value={formCategory}
											onChange={(e) => setFormCategory(e.target.value)}
											required
											className="w-full h-11 pl-3.5 pr-8 rounded-xl text-[13px] border outline-none appearance-none cursor-pointer bg-[#0D0D0D] border-[#2A2A2A] text-[#EDEDED]"
										>
											<option value="" disabled>Selecione uma categoria</option>
											{CATEGORIES.map(cat => (
												<option key={cat} value={cat}>{cat}</option>
											))}
										</select>
										<ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A]" size={14} />
									</div>
								</div>

								{/* DIVISOR */}
								<div className="w-full h-[1px] my-1" style={{ backgroundColor: '#2A2A2A' }} />

								{/* FOOTER DO MODAL */}
								<div className="flex gap-3">
									<button
										type="button"
										onClick={() => setShowModal(false)}
										className="h-10 px-5 rounded-xl text-xs font-semibold border flex items-center justify-center transition-colors cursor-pointer outline-none bg-transparent"
										style={{ borderColor: '#2A2A2A', color: '#A1A1AA' }}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = '#1A1A1A';
											e.currentTarget.style.borderColor = '#71717A';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = 'transparent';
											e.currentTarget.style.borderColor = '#2A2A2A';
										}}
									>
										Cancelar
									</button>
									
									<button
										type="submit"
										className="flex-1 h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer outline-none border-none"
										style={{
											backgroundColor: modalType === 'INCOME' ? '#4ADE80' : modalType === 'EXPENSE' ? '#F87171' : '#6366F1',
											color: modalType === 'INCOME' ? '#0A0A0A' : '#FFFFFF'
										}}
										onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
										onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
									>
										Salvar Recorrência
									</button>
								</div>

							</form>
						</div>
					</div>
				)}

			</div>
		</main>
  );
}

export default Recurrences;