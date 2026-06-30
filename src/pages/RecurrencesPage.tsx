import React, { useEffect, useState, useMemo } from 'react';
import { 
	Plus, 
	Minus, 
	Sparkles, 
	ArrowUpRight, 
	ArrowDownRight, 
	Coffee, 
	ShoppingBag, 
	Car, 
	Briefcase, 
	LayoutGrid, 
	Activity, 
	Settings,
	CreditCard,
	Wallet,
	Menu,
	X,
	TrendingUp,
	AlertTriangle,
	Zap,
	Target,
	ChevronRight,
	TrendingDown,
	Info,
	CalendarDays
} from 'lucide-react';

// Tipagem de Atividade/Recorrência
interface Recurrence {
	id: string;
	description: string;
	category: string;
	amount: number;
	type: 'in' | 'out';
	wallet: string;
	icon: React.ElementType;
}

// Mapeamento de Recorrências por Dia do Mês (Junho 2026)
const RECURRENCES_BY_DAY: Record<number, Recurrence[]> = {
	5: [
		{
			id: 'r1',
			description: 'Salário Mensal',
			category: 'Renda Principal',
			amount: 5100.00,
			type: 'in',
			wallet: 'Itaú Unibanco',
			icon: Briefcase,
		}
	],
	8: [
		{
			id: 'r2',
			description: 'Aluguel Residencial',
			category: 'Moradia',
			amount: 1200.00,
			type: 'out',
			wallet: 'Itaú Unibanco',
			icon: Settings,
		}
	],
	10: [
		{
			id: 'r3',
			description: 'Netflix Premium',
			category: 'Entretenimento',
			amount: 59.00,
			type: 'out',
			wallet: 'NuBank',
			icon: Coffee,
		},
		{
			id: 'r4',
			description: 'Spotify Family',
			category: 'Entretenimento',
			amount: 21.00,
			type: 'out',
			wallet: 'NuBank',
			icon: Settings,
		}
	],
	15: [
		{
			id: 'r5',
			description: 'Trabalho Freelance',
			category: 'Renda Extra',
			amount: 800.00,
			type: 'in',
			wallet: 'NuBank',
			icon: Sparkles,
		}
	],
	20: [
		{
			id: 'r6',
			description: 'Seguro Automóvel',
			category: 'Transporte',
			amount: 180.00,
			type: 'out',
			wallet: 'Cartão Black',
			icon: Car,
		}
	],
	24: [
		{
			id: 'r7',
			description: 'Adobe Creative Cloud',
			category: 'Assinatura',
			amount: 124.00,
			type: 'out',
			wallet: 'Cartão Black',
			icon: Sparkles,
		}
	],
	27: [
		{
			id: 'r8',
			description: 'Feira Mensal',
			category: 'Alimentação',
			amount: 450.00,
			type: 'out',
			wallet: 'Cartão Black',
			icon: ShoppingBag,
		}
	]
};

const INITIAL_BALANCE = 3000.00; // Saldo Inicial de Junho 2026
const CURRENT_DAY_NUMBER = 28; // Junho 28, 2026

const formatCurrency = (val: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(val);
};

const GlobalStyles = () => (
	<style dangerouslySetInnerHTML={{__html: `
		@keyframes slideUpFade {
			0% { opacity: 0; transform: translateY(20px); }
			100% { opacity: 1; transform: translateY(0); }
		}
		.animate-slide-up {
			animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
			opacity: 0;
		}
		.delay-100 { animation-delay: 100ms; }
		.delay-200 { animation-delay: 200ms; }
		.delay-300 { animation-delay: 300ms; }
		.delay-400 { animation-delay: 400ms; }
		.delay-500 { animation-delay: 500ms; }
		
		/* Ocultar barra de rolagem horizontal nativa para visual mais limpo em mobile */
		.hide-scrollbar::-webkit-scrollbar {
			display: none;
		}
		.hide-scrollbar {
			-ms-overflow-style: none;
			scrollbar-width: none;
		}
	`}} />
);

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => (
	<>
		<div
			className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
				isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
			onClick={() => setIsOpen(false)}
		/>

		<aside
			className={`
				fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0
				transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
				${isOpen
					? 'w-[280px] md:w-[256px] translate-x-0 bg-[#09090B]/95 md:bg-[#09090B]/50 border-r border-white/[0.04] backdrop-blur-md shadow-2xl md:shadow-none'
					: 'w-[280px] md:w-[64px] -translate-x-full bg-[#09090B]/95 border-r border-transparent md:translate-x-0 md:bg-transparent md:backdrop-blur-none'
				}
			`}
		>
			<div className="flex items-center h-28 pl-4 pr-6 flex-shrink-0">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111113] to-[#18181B] flex items-center justify-center border border-white/[0.08] shadow-lg cursor-pointer hover:border-[#7C3AED]/50 transition-colors duration-500 relative group"
				>
					<div className="w-4 h-4 rounded-full bg-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.6)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-shadow duration-500"></div>
				</div>
			</div>

			<div 
				className={`flex-1 flex flex-col w-[280px] md:w-[256px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
					isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
				}`}
			>
				<nav className="flex-1 w-full flex flex-col gap-3 px-6 pt-4">
					<button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group">
						<LayoutGrid className="w-5 h-5 flex-shrink-0" />
						<span className="ml-4 font-medium whitespace-nowrap">Dashboard</span>
					</button>
					
					<button className="h-12 w-full rounded-2xl bg-[#7C3AED]/10 text-[#8B5CF6] flex items-center px-4 transition-all hover:bg-[#7C3AED]/15 group">
						<Activity className="w-5 h-5 flex-shrink-0" />
						<span className="ml-4 font-medium whitespace-nowrap">Atividade</span>
					</button>
					
					<button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group">
						<Settings className="w-5 h-5 flex-shrink-0" />
						<span className="ml-4 font-medium whitespace-nowrap">Configurações</span>
					</button>
				</nav>

				<div className="p-6 mb-4 md:mb-8">
					<div className="flex items-center gap-4 p-3 rounded-2xl bg-[#111113]/50 border border-white/[0.02] hover:border-white/[0.08] transition-all cursor-pointer">
						<div className="w-10 h-10 flex-shrink-0 rounded-full border border-white/10 overflow-hidden">
							<img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
						</div>
						<div className="flex flex-col flex-1 min-w-0">
							<span className="text-sm font-medium text-zinc-200 truncate">Admin Avora</span>
							<span className="text-xs text-zinc-500 truncate">admin@avora.com</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	</>
);

const MobileNav = ({ setIsOpen }: { setIsOpen: (val: boolean) => void }) => (
	<nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.04] flex justify-around items-center py-5 px-6 z-40 safe-area-bottom pb-8">
		<button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2">
			<Menu className="w-6 h-6" />
		</button>
		<button className="text-zinc-500 hover:text-zinc-200 transition-colors p-2">
			<LayoutGrid className="w-6 h-6" />
		</button>
		<button className="text-[#8B5CF6] p-2">
			<Activity className="w-6 h-6" />
		</button>
		<button className="w-8 h-8 rounded-full border border-white/10 overflow-hidden ml-2">
			<img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover grayscale" />
		</button>
	</nav>
);

export default function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	
	// Controle do Modal de Adição
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalConfig, setModalConfig] = useState<{type: 'in' | 'out', date: string}>({ type: 'in', date: '' });

	const calendarData = useMemo(() => {
		let currentBalance = INITIAL_BALANCE;
		const daysArray = [];
		let totalIn = 0;
		let totalOut = 0;

		for (let day = 1; day <= 30; day++) {
			const recurrences = RECURRENCES_BY_DAY[day] || [];
			const balanceBefore = currentBalance;
			let dayIn = 0;
			let dayOut = 0;

			recurrences.forEach(rec => {
				if (rec.type === 'in') {
					dayIn += rec.amount;
					totalIn += rec.amount;
				} else {
					dayOut += rec.amount;
					totalOut += rec.amount;
				}
			});

			currentBalance = currentBalance + dayIn - dayOut;

			let indicator: { label: string; icon: any; color: string; type: string } | null = null;
			if (dayIn >= 1000) {
				indicator = { label: 'Recebimento importante', icon: Sparkles, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', type: 'success' };
			} else if (dayOut >= 1000) {
				indicator = { label: 'Grande queda no saldo', icon: TrendingDown, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', type: 'danger' };
			} else if (currentBalance < 2000) {
				indicator = { label: 'Saldo baixo previsto', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', type: 'warning' };
			} else if (recurrences.length >= 2) {
				indicator = { label: 'Múltiplos pagamentos', icon: Zap, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', type: 'info' };
			} else if (day === 30) {
				indicator = { label: 'Meta mensal batida', icon: Target, color: 'text-[#8B5CF6] bg-[#7C3AED]/10 border-[#7C3AED]/20', type: 'purple' };
			}

			let sidebarHighlightClass = '';
			const netImpact = dayIn - dayOut;
			if (netImpact >= 1000) {
				sidebarHighlightClass = 'bg-emerald-500'; 
			} else if (netImpact > 0) {
				sidebarHighlightClass = 'bg-emerald-500/40';
			} else if (netImpact <= -1000) {
				sidebarHighlightClass = 'bg-rose-500'; 
			} else if (netImpact < 0) {
				sidebarHighlightClass = 'bg-rose-500/40';
			}

			daysArray.push({
				day,
				recurrences,
				balanceBefore,
				dayIn,
				dayOut,
				balanceAfter: currentBalance,
				indicator,
				sidebarHighlightClass
			});
		}

		return {
			days: daysArray,
			totalIn,
			totalOut,
			finalBalance: currentBalance
		};
	}, []);

	const autoInsights = useMemo(() => {
		return [
			{ id: 1, text: `Sua maior despesa programada acontece no dia 08 (${formatCurrency(1200)}).`, icon: TrendingDown, color: 'text-rose-400' },
			{ id: 2, text: `Você terminará o mês com uma valorização prevista de ${formatCurrency(calendarData.finalBalance)}.`, icon: Target, color: 'text-[#8B5CF6]' },
			{ id: 3, text: `Você possui 5 pagamentos programados e concentrados no decorrer de Junho.`, icon: Zap, color: 'text-cyan-400' },
			{ id: 4, text: `Este será seu saldo ideal mais alto projetado das últimas semanas.`, icon: Sparkles, color: 'text-emerald-400' }
		];
	}, [calendarData]);

	const selectedDayInfo = useMemo(() => {
		if (selectedDay === null) return null;
		return calendarData.days.find(d => d.day === selectedDay);
	}, [selectedDay, calendarData]);

	const chartPoints = useMemo(() => {
		const width = 1200;
		const height = 80;
		const padding = 10;
		
		const balances = calendarData.days.map(d => d.balanceAfter);
		const minVal = Math.min(...balances);
		const maxVal = Math.max(...balances);
		const range = maxVal - minVal || 1;

		return calendarData.days.map((d, index) => {
			const x = (index / (calendarData.days.length - 1)) * (width - padding * 2) + padding;
			const y = height - ((d.balanceAfter - minVal) / range) * (height - padding * 2) - padding;
			return `${x},${y}`;
		}).join(' ');
	}, [calendarData]);

	const openTransactionModal = (type: 'in' | 'out', day: number) => {
		const formattedDay = day < 10 ? `0${day}` : `${day}`;
		setModalConfig({ type, date: `${formattedDay}/06/2026` });
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen flex bg-[#09090B] text-zinc-100 selection:bg-[#7C3AED]/30 font-sans">
			<GlobalStyles />
			
			{/* Background Glow */}
			<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[100vw] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.06)_0%,_rgba(9,9,11,0)_60%)]"></div>
			</div>

			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

			<main className="flex-1 w-full min-w-0 relative z-10 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-x-hidden">
				<div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20 flex flex-col flex-1">
					
					<header className="animate-slide-up space-y-3 lg:space-y-4 mb-12">
						<h2 className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-light tracking-wide">
							Evolução Patrimonial
						</h2>
						<p className="text-zinc-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-snug max-w-[70ch]">
							Veja a evolução diária prevista do seu saldo e como cada recorrência programada impactará sua carteira.
						</p>
					</header>

					<section className="animate-slide-up delay-100 grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6 bg-[#111113]/30 border border-white/[0.04] rounded-3xl p-6 mb-10 w-full min-w-0 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/[0.04]">
						<div className="flex flex-col pb-4 sm:pb-0">
							<span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1">Saldo Inicial</span>
							<span className="text-xl lg:text-2xl font-light text-zinc-300">{formatCurrency(INITIAL_BALANCE)}</span>
						</div>
						<div className="flex flex-col pt-4 sm:pt-0 sm:pl-6">
							<span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
								Receitas Previstas
							</span>
							<span className="text-xl lg:text-2xl font-semibold text-emerald-400 tracking-tight">+{formatCurrency(calendarData.totalIn)}</span>
						</div>
						<div className="flex flex-col pt-4 sm:pt-0 sm:pl-6">
							<span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
								<span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
								Despesas Previstas
							</span>
							<span className="text-xl lg:text-2xl font-semibold text-rose-400 tracking-tight">-{formatCurrency(calendarData.totalOut)}</span>
						</div>
						<div className="flex flex-col pt-4 sm:pt-0 sm:pl-6">
							<span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
								<span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
								Saldo Final Estimado
							</span>
							<span className="text-2xl lg:text-3xl font-bold text-[#8B5CF6] tracking-tight">{formatCurrency(calendarData.finalBalance)}</span>
						</div>
					</section>

					<section className="animate-slide-up delay-200 bg-[#111113]/40 border border-white/[0.04] rounded-3xl p-6 mb-10 w-full min-w-0">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-zinc-400">Linha de Evolução Financeira de Junho</h3>
							<span className="text-xs text-zinc-600 font-light hidden sm:block">Evolução do Saldo do Dia 01 ao Dia 30</span>
						</div>
						<div className="w-full h-24 relative">
							<svg className="w-full h-full overflow-visible" viewBox="0 0 1200 80" preserveAspectRatio="none">
								<defs>
									<linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
										<stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
									</linearGradient>
								</defs>
								<polyline fill="none" stroke="#8B5CF6" strokeWidth="2" points={chartPoints} />
							</svg>
						</div>
					</section>

					{/* Calendário 100% de Largura e Otimizado para Mobile */}
					<div className="flex flex-col gap-12 md:gap-16 w-full min-w-0 animate-slide-up delay-300">
						
						<div className="w-full flex flex-col min-w-0">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 w-full">
								<h3 className="text-zinc-500 text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold">
									Planejador Mensal de Junho 2026
								</h3>
								<span className="text-xs text-zinc-600 font-light">Selecione qualquer dia para detalhar o fluxo no painel lateral</span>
							</div>

							{/* Wrapper de Scroll Horizontal para preservar estrutura em telas pequenas */}
							<div className="w-full overflow-x-auto hide-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0">
								<div className="min-w-[800px] md:min-w-full border border-white/[0.06] rounded-3xl overflow-hidden bg-[#0e0e11]/40 backdrop-blur-md shadow-2xl">
									
									<div className="grid grid-cols-7 border-b border-white/[0.06] bg-[#111113]/60 text-center py-4 font-semibold text-zinc-400 text-xs tracking-wider uppercase">
										<div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div><div>Dom</div>
									</div>

									<div className="grid grid-cols-7 bg-white/[0.02] gap-[1px]">
										{calendarData.days.map((item) => {
											const maxVisibleRecurrences = 2;
											const visibleRecs = item.recurrences.slice(0, maxVisibleRecurrences);
											const hiddenCount = item.recurrences.length - maxVisibleRecurrences;
											const isToday = item.day === CURRENT_DAY_NUMBER;

											return (
												<div
													key={item.day}
													onClick={() => setSelectedDay(item.day)}
													className="relative flex flex-col justify-between p-4 min-h-[150px] md:min-h-[170px] bg-[#09090B] transition-all duration-200 cursor-pointer group hover:bg-white/[0.02]"
												>
													{item.sidebarHighlightClass && (
														<div className={`absolute top-0 left-0 bottom-0 w-[3px] ${item.sidebarHighlightClass}`} />
													)}

													<div className="flex items-start justify-between w-full relative z-10">
														{isToday ? (
															<div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7C3AED] text-white text-[16px] md:text-[18px] font-bold shadow-[0_0_12px_rgba(124,58,237,0.4)]">
																{item.day}
															</div>
														) : (
															<span className="text-[16px] md:text-[18px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
																{item.day < 10 ? `0${item.day}` : item.day}
															</span>
														)}
														{item.indicator && (
															<div className={`w-5 h-5 rounded-md flex items-center justify-center border ${item.indicator.color} flex-shrink-0`}>
																<item.indicator.icon className="w-3 h-3" />
															</div>
														)}
													</div>

													{/* Recorrências Organizadas (1 Linha por Recorrência, Tipografia Legível) */}
													<div className="flex-1 flex flex-col gap-2.5 min-w-0 mt-4 mb-2 relative z-10">
														{visibleRecs.length > 0 ? (
															<>
																{visibleRecs.map((rec) => (
																	<div key={rec.id} className="flex items-center gap-2 text-[13px] md:text-[14px] text-zinc-300 truncate">
																		<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${rec.type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
																		<span className="truncate font-medium">{rec.description}</span>
																	</div>
																))}
																{hiddenCount > 0 && (
																	<div className="text-[12px] text-[#8B5CF6] font-semibold pl-3">
																		+{hiddenCount} mais
																	</div>
																)}
															</>
														) : (
															<span className="text-[12px] text-zinc-600 font-light italic mt-1">Sem recorrências</span>
														)}
													</div>

													<div className="flex flex-col justify-end w-full pt-3 border-t border-white/[0.02] relative z-10">
														<div className="flex items-center justify-between gap-1 w-full text-[12px]">
															<span className="text-zinc-500 font-light truncate">Previsto</span>
															<span className="font-semibold text-[#8B5CF6] tracking-tight text-right">
																{formatCurrency(item.balanceAfter)}
															</span>
														</div>

														{/* Botões Hover que Abrem Modal (Sem propagar clique pro Drawer) */}
														<div className="flex gap-2 justify-between w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
															<button 
																onClick={(e) => { 
																	e.stopPropagation(); 
																	openTransactionModal('in', item.day);
																}}
																className="flex-1 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium hover:bg-emerald-500/20 hover:text-emerald-300 transition-all text-center flex items-center justify-center gap-1"
															>
																<Plus className="w-3 h-3" /> Receita
															</button>
															<button 
																onClick={(e) => { 
																	e.stopPropagation(); 
																	openTransactionModal('out', item.day);
																}}
																className="flex-1 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-400 font-medium hover:bg-rose-500/20 hover:text-rose-300 transition-all text-center flex items-center justify-center gap-1"
															>
																<Minus className="w-3 h-3" /> Despesa
															</button>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col min-w-0">
							<div className="mb-6">
								<h3 className="text-zinc-400 text-lg md:text-xl font-medium tracking-tight">
									Insights Inteligentes
								</h3>
								<p className="text-zinc-600 text-xs sm:text-sm font-light mt-0.5">
									O que a Avora identificou para este mês.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
								{autoInsights.map((insight) => {
									const Icon = insight.icon;
									return (
										<div 
											key={insight.id} 
											className="bg-[#111113]/50 border border-white/[0.04] hover:border-white/[0.08] transition-all p-5 rounded-2xl flex gap-4 items-start min-h-[100px] group"
										>
											<div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/[0.04] ${insight.color} flex-shrink-0 mt-0.5`}>
												<Icon className="w-4 h-4" />
											</div>
											<p className="text-sm text-zinc-400 font-light leading-relaxed group-hover:text-zinc-300 transition-colors">
												{insight.text}
											</p>
										</div>
									);
								})}
							</div>
						</div>

						<div className="w-full border-t border-white/[0.04] pt-8 flex flex-col min-w-0">
							<h4 className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-6 flex items-center gap-2">
								<Info className="w-4 h-4 text-[#8B5CF6]" /> Legenda do Calendário
							</h4>

							<div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-zinc-500 font-light">
								<div className="flex items-center gap-2.5">
									<span className="w-1.5 h-4 bg-emerald-500 rounded-sm"></span>
									<span>Grande Recebimento (+ R$ 1.000)</span>
								</div>
								<div className="flex items-center gap-2.5">
									<span className="w-1.5 h-4 bg-emerald-500/40 rounded-sm"></span>
									<span>Pequena Entrada</span>
								</div>
								<div className="flex items-center gap-2.5">
									<span className="w-1.5 h-4 bg-rose-500 rounded-sm"></span>
									<span>Grande Despesa (- R$ 1.000)</span>
								</div>
								<div className="flex items-center gap-2.5">
									<span className="w-1.5 h-4 bg-rose-500/40 rounded-sm"></span>
									<span>Pequena Despesa</span>
								</div>
								<div className="flex items-center gap-2.5">
									<div className="w-5 h-5 rounded-md flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
										<AlertTriangle className="w-3 h-3" />
									</div>
									<span>Alerta: Saldo previsto abaixo de R$ 2.000</span>
								</div>
								<div className="flex items-center gap-2.5">
									<div className="w-5 h-5 rounded-md flex items-center justify-center border border-[#7C3AED]/20 bg-[#7C3AED]/10 text-[#8B5CF6]">
										<Target className="w-3 h-3" />
									</div>
									<span>Meta de Faturamento Mensal</span>
								</div>
							</div>
						</div>

					</div>

					{/* Drawer Lateral para detalhar Dia Selecionado */}
					{selectedDayInfo && (
						<div className="fixed inset-0 z-50 flex justify-end">
							<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDay(null)} />
							
							<div className="relative w-full max-w-md bg-[#09090B] border-l border-white/[0.04] h-full flex flex-col z-10 shadow-2xl animate-slide-up">
								<div className="p-6 border-b border-white/[0.04] flex items-center justify-between">
									<div>
										<span className="text-xs uppercase tracking-widest text-[#8B5CF6] font-semibold">Inspecionador de Dia</span>
										<h3 className="text-2xl font-bold text-white mt-1">Dia {selectedDayInfo.day < 10 ? `0${selectedDayInfo.day}` : selectedDayInfo.day} de Junho</h3>
									</div>
									<button 
										onClick={() => setSelectedDay(null)}
										className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] text-zinc-500 hover:text-white transition-colors"
									>
										<X className="w-5 h-5" />
									</button>
								</div>

								<div className="p-6 border-b border-white/[0.04] bg-[#111113]/30">
									<span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4 block">Fluxo Matemático</span>
									
									<div className="space-y-4 font-light">
										<div className="flex justify-between items-center text-sm">
											<span className="text-zinc-400">Saldo Anterior</span>
											<span className="text-zinc-300 font-semibold tracking-tight">{formatCurrency(selectedDayInfo.balanceBefore)}</span>
										</div>

										<div className="flex justify-between items-center text-sm">
											<span className="text-emerald-500 flex items-center gap-1.5 font-medium">
												<Plus className="w-3.5 h-3.5" /> Receitas do Dia
											</span>
											<span className="text-emerald-400 font-bold tracking-tight">+{formatCurrency(selectedDayInfo.dayIn)}</span>
										</div>

										<div className="flex justify-between items-center text-sm">
											<span className="text-rose-500 flex items-center gap-1.5 font-medium">
												<Minus className="w-3.5 h-3.5" /> Despesas do Dia
											</span>
											<span className="text-rose-400 font-bold tracking-tight">-{formatCurrency(selectedDayInfo.dayOut)}</span>
										</div>

										<div className="border-t border-white/[0.04] pt-4 flex justify-between items-center">
											<span className="font-medium text-white flex items-center gap-1.5">
												Saldo Previsto Final
											</span>
											<span className="text-[22px] font-bold text-[#8B5CF6] tracking-tight">{formatCurrency(selectedDayInfo.balanceAfter)}</span>
										</div>
									</div>
								</div>

								<div className="flex-1 overflow-y-auto p-6 space-y-4">
									<span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block">Recorrências Programadas</span>
									
									{selectedDayInfo.recurrences.length > 0 ? (
										<div className="space-y-3">
											{selectedDayInfo.recurrences.map((rec) => {
												const Icon = rec.icon;
												return (
													<div key={rec.id} className="p-4 bg-[#111113] border border-white/[0.04] rounded-2xl flex items-center justify-between gap-4">
														<div className="flex items-center gap-3">
															<div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-400">
																<Icon className="w-5 h-5" />
															</div>
															<div>
																<h4 className="text-sm font-medium text-white">{rec.description}</h4>
																<span className="text-xs text-zinc-500 font-light">{rec.category}</span>
															</div>
														</div>
														<span className={`text-base font-semibold tracking-tight ${rec.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
															{rec.type === 'in' ? '+' : '-'}{formatCurrency(rec.amount)}
														</span>
													</div>
												);
											})}
										</div>
									) : (
										<div className="py-12 text-center text-zinc-600 text-sm font-light">
											Nenhuma transação programada para este dia.
										</div>
									)}
								</div>
							</div>
						</div>
					)}

					{/* Modal de Criação Rápida de Transação (Receita/Despesa) */}
					{isModalOpen && (
						<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
							<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
							
							<div className="relative w-full max-w-md bg-[#09090B] border border-white/[0.06] rounded-3xl p-6 shadow-2xl animate-slide-up">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl font-medium text-white flex items-center gap-2">
										<span className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/[0.04] ${modalConfig.type === 'in' ? 'text-emerald-400' : 'text-rose-400'}`}>
											{modalConfig.type === 'in' ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
										</span>
										Nova {modalConfig.type === 'in' ? 'Receita' : 'Despesa'}
									</h3>
									<button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
										<X className="w-5 h-5" />
									</button>
								</div>

								<div className="space-y-4">
									<div>
										<label className="text-xs font-medium text-zinc-400 block mb-1.5">Data da Operação</label>
										<div className="relative">
											<CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
											<input 
												type="text" 
												value={modalConfig.date}
												readOnly
												className="w-full h-12 pl-10 pr-4 bg-[#111113] border border-white/[0.04] rounded-xl text-sm text-zinc-300 font-medium outline-none cursor-not-allowed"
											/>
										</div>
									</div>
									
									<div>
										<label className="text-xs font-medium text-zinc-400 block mb-1.5">Descrição</label>
										<input 
											type="text" 
											placeholder="Ex: Pagamento Cliente X"
											className="w-full h-12 px-4 bg-[#111113] border border-white/[0.04] focus:border-[#7C3AED]/50 rounded-xl text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all"
										/>
									</div>
									
									<div>
										<label className="text-xs font-medium text-zinc-400 block mb-1.5">Valor Bruto</label>
										<input 
											type="text" 
											placeholder="R$ 0,00"
											className="w-full h-12 px-4 bg-[#111113] border border-white/[0.04] focus:border-[#7C3AED]/50 rounded-xl text-sm text-zinc-100 font-semibold tracking-tight placeholder-zinc-600 outline-none transition-all"
										/>
									</div>

									<div className="pt-4 flex gap-3">
										<button 
											onClick={() => setIsModalOpen(false)}
											className="flex-1 h-11 rounded-xl bg-transparent border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.02] font-medium transition-all"
										>
											Cancelar
										</button>
										<button 
											className={`flex-1 h-11 rounded-xl font-medium transition-all ${
												modalConfig.type === 'in' 
													? 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950' 
													: 'bg-rose-500 hover:bg-rose-400 text-rose-950'
											}`}
										>
											Salvar {modalConfig.type === 'in' ? 'Receita' : 'Despesa'}
										</button>
									</div>
								</div>
							</div>
						</div>
					)}

					<footer className="w-full border-t border-white/[0.04] text-zinc-500 text-xs sm:text-sm mt-16 pt-8 pb-4">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
							<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
								<span className="font-light tracking-wide text-zinc-400">
									© 2026 Avora. Todos os direitos reservados.
								</span>
								<span className="hidden sm:inline w-1 h-1 rounded-full bg-zinc-800"></span>
								<span className="text-zinc-400 font-light">
									Desenvolvido por{' '}
									<a href="https://github.com/joaojuniodev" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] font-medium hover:text-[#a78bfa] transition-colors">
										Joao Junio Dev
									</a>
								</span>
							</div>
							<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
								<span className="text-[10px] text-emerald-500 font-medium tracking-wide uppercase">Sistemas Online</span>
							</div>
						</div>
					</footer>
					
				</div>
				<div className="h-28 md:h-0"></div>
			</main>

			<MobileNav setIsOpen={setIsSidebarOpen} />
		</div>
	);
}