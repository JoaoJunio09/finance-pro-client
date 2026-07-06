import React, { useState, useMemo, useEffect, useRef } from 'react';
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
	ChevronLeft,
	ChevronRight,
	Clock,
	CalendarDays,
	AlignLeft,
	Tag,
	ChevronDown,
	Info,
	TrendingUp,
	Target,
	Zap,
	TrendingDown,
	AlertTriangle,
	Repeat,
	Check,
	CheckCircle2,
	PieChart,
	Flame,
	Home
} from 'lucide-react';

// ==========================================
// 1. DEFINIÇÕES DE TIPOS E ARQUITETURA BASE
// ==========================================

export interface CalendarCell {
	day: number | null;
	date: Date | null;
	isCurrentMonth: boolean;
}

export interface CalendarHeaderProps {
	month: number;
	year: number;
	onPrevMonth: () => void;
	onNextMonth: () => void;
}

export interface CalendarGridProps<T extends CalendarCell = CalendarCell> {
	cells: T[];
	renderCell?: (cell: T, index: number) => React.ReactNode;
}

export interface CalendarProps<T extends CalendarCell = CalendarCell> {
	month: number;
	year: number;
	onMonthChange: (month: number, year: number) => void;
	renderCell?: (cell: T, index: number) => React.ReactNode;
	customGridGenerator?: (month: number, year: number) => T[];
}

type TransactionStatus = 'completed' | 'future';
type TransactionType = 'in' | 'out';

interface Transaction {
	id: string;
	description: string;
	category: string;
	amount: number;
	day: number; 
	time?: string;
	type: TransactionType;
	status: TransactionStatus;
	wallet: string;
	icon: React.ElementType;
}

interface EnrichedCalendarCell extends CalendarCell {
	transactions: Transaction[];
	inTotal: number;
	outTotal: number;
	futureTotal: number;
	sidebarHighlightClass: string;
}

// ==========================================
// 2. CONSTANTES, MOCKS E UTILS
// ==========================================

const MONTHS_PT = [
	'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const BASE_PATRIMONY = 15420.00; // Patrimônio consolidado base (mock)
const CURRENT_DAY_NUMBER = 5; // Simulação: 5 de Julho de 2026 (Domingo)
const REAL_CURRENT_MONTH = 6; // Julho (0-indexed)
const REAL_CURRENT_YEAR = 2026;

const MOCK_TRANSACTIONS: Transaction[] = [
	{ id: '1', description: 'Salário Mensal', category: 'Renda Principal', amount: 5100.00, day: 2, time: '09:00', type: 'in', status: 'completed', wallet: 'Itaú', icon: Briefcase },
	{ id: '2', description: 'Aluguel Residencial', category: 'Moradia', amount: 1200.00, day: 5, time: '10:00', type: 'out', status: 'completed', wallet: 'Itaú', icon: Home },
	{ id: '3', description: 'Netflix Premium', category: 'Entretenimento', amount: 59.00, day: 10, time: '08:12', type: 'out', status: 'future', wallet: 'NuBank', icon: Coffee },
	{ id: '4', description: 'Almoço Restaurante', category: 'Alimentação', amount: 45.00, day: 4, time: '12:45', type: 'out', status: 'completed', wallet: 'Cartão Black', icon: ShoppingBag },
	{ id: '5', description: 'Supermercado Mensal', category: 'Alimentação', amount: 850.00, day: 12, time: '18:20', type: 'out', status: 'future', wallet: 'Cartão Black', icon: ShoppingBag },
	{ id: '6', description: 'Trabalho Freelance', category: 'Renda Extra', amount: 1450.00, day: 18, type: 'in', status: 'future', wallet: 'NuBank', icon: Sparkles },
	{ id: '7', description: 'Seguro Automóvel', category: 'Transporte', amount: 180.00, day: 20, type: 'out', status: 'future', wallet: 'Cartão Black', icon: Car },
	{ id: '8', description: 'Adobe Creative Cloud', category: 'Assinatura', amount: 124.00, day: 24, type: 'out', status: 'future', wallet: 'Cartão Black', icon: Sparkles },
	{ id: '9', description: 'Energia Elétrica', category: 'Moradia', amount: 210.00, day: 25, type: 'out', status: 'future', wallet: 'Itaú', icon: Settings },
	{ id: '10', description: 'Rendimento Investimentos', category: 'Investimentos', amount: 320.00, day: 30, type: 'in', status: 'future', wallet: 'Inter', icon: ArrowUpRight },
];

const CATEGORIES_MOCK = [
	{ id: 'renda', name: 'Renda Principal', icon: Briefcase, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
	{ id: 'freelance', name: 'Freelance', icon: Sparkles, color: 'text-[#8B5CF6]', bg: 'bg-[#7C3AED]/10' },
	{ id: 'moradia', name: 'Moradia', icon: Home, color: 'text-blue-400', bg: 'bg-blue-500/10' },
	{ id: 'alimentacao', name: 'Alimentação', icon: ShoppingBag, color: 'text-rose-400', bg: 'bg-rose-500/10' },
];

const WALLETS_MOCK = [
	{ id: 'itau', name: 'Itaú Unibanco', balance: 12540.00, icon: Wallet },
	{ id: 'nubank', name: 'Nubank Corrente', balance: 3450.90, icon: Wallet },
];

const formatCurrency = (val: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(val);
};

const formatCurrencyInput = (value: string) => {
	const numbers = value.replace(/\D/g, '');
	if (!numbers) return '';
	const amount = (parseInt(numbers, 10) / 100).toFixed(2);
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(amount));
};

const getTodayDate = () => new Date().toISOString().split('T')[0];
const formatDateBR = (dateStr: string) => {
	if (!dateStr) return '';
	const [y, m, d] = dateStr.split('-');
	return `${d}/${m}/${y}`;
};

// ==========================================
// 3. ESTILOS GLOBAIS
// ==========================================

const GlobalStyles = () => (
	<style dangerouslySetInnerHTML={{__html: `
		@keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
		@keyframes overlayFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(8px); } }
		@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
		@keyframes bottomSheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
		@keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
		
		.animate-slide-up { animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
		.animate-overlay { animation: overlayFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
		.animate-drawer { animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
		.animate-bottom-sheet { animation: bottomSheetUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
		.animate-modal { animation: modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
		
		.hide-scrollbar::-webkit-scrollbar { display: none; }
		.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
		
		.modal-scroll { scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.1) transparent; }
		.modal-scroll::-webkit-scrollbar { width: 6px; }
		.modal-scroll::-webkit-scrollbar-track { background: transparent; }
		.modal-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
		.modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
	`}} />
);

// ==========================================
// 4. ARQUITETURA DE CALENDÁRIO PURA (DESACOPLADA)
// ==========================================

export function generateCalendarGrid(month: number, year: number): CalendarCell[] {
	const cells: CalendarCell[] = [];
	const firstDayOfMonth = new Date(year, month, 1);
	const startDayOfWeek = firstDayOfMonth.getDay();
	const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
	
	for (let i = 0; i < startDayOfWeek; i++) cells.push({ day: null, date: null, isCurrentMonth: false });
	for (let day = 1; day <= totalDaysInMonth; day++) cells.push({ day, date: new Date(year, month, day), isCurrentMonth: true });
	
	const totalGridCells = Math.ceil(cells.length / 7) * 7;
	const remainingCells = totalGridCells - cells.length;
	for (let i = 0; i < remainingCells; i++) cells.push({ day: null, date: null, isCurrentMonth: false });
	
	return cells;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ month, year, onPrevMonth, onNextMonth }) => (
	<div className="flex flex-col items-center text-center w-full mb-10 mt-2">
		<h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4">
			Atividades <span className="font-semibold text-[#8B5CF6]">Recentes</span>
		</h1>
		<p className="text-zinc-500 font-light text-sm md:text-base max-w-[65ch] leading-relaxed mb-8">
			Acompanhe todas as movimentações do mês em um único lugar. Visualize receitas, despesas e recorrências de forma simples, organizada e intuitiva.
		</p>

		<div className="flex flex-col items-center gap-2">
			<div className="flex items-center gap-4 sm:gap-6 bg-[#111113]/50 border border-white/[0.04] p-1.5 rounded-full backdrop-blur-sm shadow-xl">
				<button onClick={onPrevMonth} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors focus:outline-none">
					<ChevronLeft className="w-5 h-5" />
				</button>
				<h2 className="text-lg md:text-xl font-semibold tracking-tight text-white min-w-[140px] text-center select-none">
					{MONTHS_PT[month]} de {year}
				</h2>
				<button onClick={onNextMonth} className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-full transition-colors">
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
			<span className="text-xs text-zinc-500 font-medium tracking-wide uppercase mt-2 select-none">
				{month === REAL_CURRENT_MONTH && year === REAL_CURRENT_YEAR ? 'Movimentações do mês atual' : 'Movimentações arquivadas'}
			</span>
		</div>
	</div>
);

export function CalendarGrid<T extends CalendarCell = CalendarCell>({ cells, renderCell }: CalendarGridProps<T>) {
	return (
		<div className="w-full border border-white/[0.06] rounded-2xl sm:rounded-[32px] overflow-hidden bg-[#0e0e11]/40 backdrop-blur-md shadow-2xl flex flex-col">
			<div className="grid grid-cols-7 border-b border-white/[0.06] bg-[#111113]/60 text-center py-3 sm:py-4 font-semibold text-zinc-400 text-[10px] sm:text-xs tracking-wider uppercase">
				{WEEKDAYS_PT.map((day) => <div key={day}>{day}</div>)}
			</div>
			<div className="grid grid-cols-7 bg-white/[0.02] gap-[1px]">
				{cells.map((cell, index) => renderCell ? <React.Fragment key={index}>{renderCell(cell, index)}</React.Fragment> : <div key={index} className="bg-[#09090B] min-h-[140px] p-4 text-zinc-500">{cell.day || ''}</div>)}
			</div>
		</div>
	);
}

export function Calendar<T extends CalendarCell = CalendarCell>({ month, year, onMonthChange, renderCell, customGridGenerator }: CalendarProps<T>) {
	const cells = useMemo(() => customGridGenerator ? customGridGenerator(month, year) : generateCalendarGrid(month, year) as T[], [month, year, customGridGenerator]);
	const handlePrevMonth = () => { let nextMonth = month - 1; let nextYear = year; if (nextMonth < 0) { nextMonth = 11; nextYear = year - 1; } onMonthChange(nextMonth, nextYear); };
	const handleNextMonth = () => { let nextMonth = month + 1; let nextYear = year; if (nextMonth > 11) { nextMonth = 0; nextYear = year + 1; } onMonthChange(nextMonth, nextYear); };
	return (
		<div className="w-full flex flex-col">
			<CalendarHeader month={month} year={year} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
			<CalendarGrid<T> cells={cells} renderCell={renderCell} />
		</div>
	);
}

// ==========================================
// 5. COMPONENTES DE UI & MODAL
// ==========================================

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => (
	<>
		<div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
		<aside className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isOpen ? 'w-[280px] md:w-[256px] translate-x-0 bg-[#09090B]/95 md:bg-[#09090B]/50 border-r border-white/[0.04] backdrop-blur-md shadow-2xl md:shadow-none' : 'w-[280px] md:w-[64px] -translate-x-full bg-[#09090B]/95 border-r border-transparent md:translate-x-0 md:bg-transparent md:backdrop-blur-none'}`}>
			<div className="flex items-center justify-center md:justify-start h-28 px-4 flex-shrink-0">
				<div onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#111113] to-[#18181B] flex items-center justify-center border border-white/[0.08] shadow-lg cursor-pointer hover:border-[#7C3AED]/50 transition-colors relative group">
					<div className="w-4 h-4 rounded-full bg-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.6)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.8)] transition-shadow"></div>
				</div>
			</div>
			<div className={`flex-1 flex flex-col w-[280px] md:w-[256px] transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
				<nav className="flex-1 w-full flex flex-col gap-3 px-6 pt-4">
					<button className="h-12 w-full rounded-2xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] flex items-center px-4 transition-all group"><LayoutGrid className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-medium">Dashboard</span></button>
					<button className="h-12 w-full rounded-2xl bg-[#7C3AED]/10 text-[#8B5CF6] flex items-center px-4 transition-all"><Activity className="w-5 h-5 flex-shrink-0" /><span className="ml-4 font-medium">Atividade</span></button>
				</nav>
			</div>
		</aside>
	</>
);

const MobileNav = ({ setIsOpen }: { setIsOpen: (v: boolean) => void }) => (
	<nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#09090B]/90 backdrop-blur-xl border-t border-white/[0.04] flex justify-around items-center py-5 px-6 z-40 safe-area-bottom">
		<button onClick={() => setIsOpen(true)} className="text-zinc-500 hover:text-zinc-200 transition-colors p-2"><Menu className="w-6 h-6" /></button>
		<button className="text-[#8B5CF6] p-2"><Activity className="w-6 h-6" /></button>
	</nav>
);

// Dropdown Moderno Customizado para o Modal
const CustomDropdown = ({ label, icon: Icon, placeholder, options, value, onChange, renderOption, renderSelected }: any) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedObj = options.find((o: any) => o.id === value);
	return (
		<div className="relative">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">{label}</label>
			{isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />}
			<button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full relative z-20 bg-[#111113] border ${isOpen ? 'border-[#8B5CF6]/50 shadow-[0_0_0_2px_rgba(139,92,246,0.1)]' : 'border-white/[0.04] hover:border-white/[0.08]'} rounded-2xl py-3.5 pl-12 pr-10 text-left transition-all outline-none flex items-center`}>
				<Icon className={`absolute left-4 w-5 h-5 ${isOpen ? 'text-[#8B5CF6]' : 'text-zinc-500'} transition-colors`} />
				<span className={`block truncate ${!selectedObj ? 'text-zinc-600' : 'text-zinc-100 font-medium'}`}>{selectedObj ? renderSelected(selectedObj) : placeholder}</span>
				<ChevronDown className={`absolute right-4 w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
			</button>
			{isOpen && (
				<div className="absolute z-30 w-full mt-2 bg-[#18181B] border border-white/[0.08] rounded-2xl shadow-2xl py-2 overflow-hidden animate-slide-up origin-top">
					<div className="max-h-[220px] overflow-y-auto modal-scroll">
						{options.map((opt: any) => (
							<button key={opt.id} type="button" onClick={() => { onChange(opt.id); setIsOpen(false); }} className="w-full text-left px-4 py-2.5 hover:bg-white/[0.04] transition-colors flex items-center justify-between">
								{renderOption(opt)}{value === opt.id && <Check className="w-4 h-4 text-[#8B5CF6]" />}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

// Modal Premium de Transação
const TransactionModal = ({ isOpen, onClose, typeStr, prefillDate }: { isOpen: boolean, onClose: () => void, typeStr: 'in' | 'out', prefillDate: string }) => {
	const [type, setType] = useState<'in' | 'out' | 'recurring'>(typeStr);
	const [recurrenceType, setRecurrenceType] = useState<'CREDIT' | 'DEBIT'>('DEBIT');
	const [amountStr, setAmountStr] = useState('');
	const [description, setDescription] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [walletId, setWalletId] = useState('');
	const [date, setDate] = useState(getTodayDate());
	const [freq, setFreq] = useState<'mensal' | 'quinzenal' | 'anual'>('mensal');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			setType(typeStr);
			setDate(prefillDate || getTodayDate());
			setTimeout(() => inputRef.current?.focus(), 100);
		} else {
			setTimeout(() => { setType('out'); setRecurrenceType('DEBIT'); setAmountStr(''); setDescription(''); setCategoryId(''); setWalletId(''); }, 300);
		}
	}, [isOpen, typeStr, prefillDate]);

	if (!isOpen) return null;

	const isIncome = type === 'in';
	const isRecurring = type === 'recurring';
	const themeHex = isIncome ? 'text-emerald-400' : isRecurring ? 'text-[#8B5CF6]' : 'text-rose-400';
	const prefixSign = type === 'out' ? '-' : type === 'in' ? '+' : recurrenceType === 'DEBIT' ? '-' : '+';

	const selectedCategory = CATEGORIES_MOCK.find(c => c.id === categoryId);
	const selectedWallet = WALLETS_MOCK.find(w => w.id === walletId);

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto animate-overlay bg-black/70 px-0 sm:px-6">
			<div className="fixed inset-0 min-h-full" onClick={onClose} />
			<div className="flex-grow hidden sm:block pointer-events-none min-h-[2rem]" />
			<div className="flex-grow sm:hidden pointer-events-none" />
			
			<div className="relative w-full sm:max-w-5xl bg-[#09090B] sm:border border-white/[0.06] rounded-t-[32px] sm:rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row animate-bottom-sheet sm:animate-modal h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex-shrink-0 z-10 min-h-0">
				
				{/* Formulário (Scrollável internamente) */}
				<div className="flex-1 flex flex-col min-h-0">
					<div className="px-6 sm:px-8 pt-8 pb-6 flex-shrink-0 flex items-start justify-between bg-[#09090B] z-10">
						<div>
							<h2 className="text-2xl font-semibold text-white tracking-tight">Adicionar Movimentação</h2>
							<p className="text-sm font-light text-zinc-500 mt-1">Registre uma receita, despesa ou recorrência em poucos segundos.</p>
						</div>
						<button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-colors"><X className="w-5 h-5" /></button>
					</div>

					<div className="flex-1 overflow-y-auto modal-scroll px-6 sm:px-8 pb-8 space-y-8 min-h-0 relative">
						<div className="flex p-1.5 bg-[#111113] rounded-2xl border border-white/[0.04] relative">
							<button type="button" onClick={() => setType('in')} className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all ${type === 'in' ? 'text-emerald-400' : 'text-zinc-500'}`}>Receita</button>
							<button type="button" onClick={() => setType('out')} className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all ${type === 'out' ? 'text-rose-400' : 'text-zinc-500'}`}>Despesa</button>
							<button type="button" onClick={() => setType('recurring')} className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all ${type === 'recurring' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Recorrência</button>
							<div className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] rounded-xl bg-[#18181B] border border-white/[0.04] transition-transform duration-300 z-0" style={{ transform: `translateX(${type === 'in' ? '0%' : type === 'out' ? '100%' : '200%'})` }} />
						</div>

						<div className="flex flex-col items-center justify-center py-4">
							<span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Valor</span>
							<div className="flex items-center justify-center gap-3">
								<span className={`text-4xl sm:text-5xl font-medium ${themeHex} transition-colors duration-300`}>{prefixSign}R$</span>
								<input ref={inputRef} type="text" placeholder="0,00" value={amountStr.replace('R$', '').trim()} onChange={(e) => setAmountStr(formatCurrencyInput(e.target.value))} className="bg-transparent text-6xl sm:text-7xl font-bold text-white w-full max-w-[300px] outline-none placeholder-zinc-800 tracking-tighter" />
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
							<div className="sm:col-span-2">
								<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Descrição</label>
								<div className="relative group">
									<AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
									<input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex.: Salário ou Mercado" className="w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium placeholder-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none" />
								</div>
							</div>

							<CustomDropdown label="Categoria" icon={Tag} placeholder="Selecione" value={categoryId} onChange={setCategoryId} options={CATEGORIES_MOCK} 
								renderSelected={(opt: any) => <div className="flex items-center gap-2"><div className={`w-6 h-6 rounded-md ${opt.bg} flex items-center justify-center ${opt.color}`}><opt.icon className="w-3.5 h-3.5" /></div>{opt.name}</div>}
								renderOption={(opt: any) => <div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg ${opt.bg} flex items-center justify-center ${opt.color}`}><opt.icon className="w-4 h-4" /></div><span className="text-sm font-medium text-zinc-200">{opt.name}</span></div>}
							/>

							<CustomDropdown label="Conta" icon={Wallet} placeholder="Selecione" value={walletId} onChange={setWalletId} options={WALLETS_MOCK} 
								renderSelected={(opt: any) => <div className="flex items-center gap-2"><opt.icon className="w-4 h-4 text-zinc-400" />{opt.name}</div>}
								renderOption={(opt: any) => <div className="flex items-center justify-between w-full"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-zinc-400"><opt.icon className="w-4 h-4" /></div><span className="text-sm font-medium text-zinc-200">{opt.name}</span></div><span className="text-xs font-semibold text-zinc-400">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(opt.balance)}</span></div>}
							/>

							{!isRecurring && (
								<div className="sm:col-span-2">
									<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Data</label>
									<div className="relative group">
										<CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
										<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium outline-none focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08]" style={{ colorScheme: 'dark' }} />
									</div>
								</div>
							)}

							{isRecurring && (
								<div className="sm:col-span-2 animate-slide-up bg-[#111113]/50 border border-[#7C3AED]/20 rounded-2xl p-5 mt-2">
									<div className="mb-6">
										<label className="text-[13px] font-medium text-zinc-300 block mb-1">Tipo da recorrência</label>
										<div className="grid grid-cols-2 gap-3 mt-3">
											<button type="button" onClick={() => setRecurrenceType('CREDIT')} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${recurrenceType === 'CREDIT' ? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'bg-[#09090B] border-white/[0.04]'}`}>
												<div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${recurrenceType === 'CREDIT' ? 'bg-[#8B5CF6] text-white' : 'bg-white/[0.04] text-zinc-400'}`}><ArrowUpRight className="w-4 h-4" /></div>
												<div className="flex flex-col text-left">
													<span className={`text-sm font-semibold ${recurrenceType === 'CREDIT' ? 'text-white' : 'text-zinc-400'}`}>Receita</span>
													<span className={`text-[10px] uppercase tracking-widest mt-0.5 ${recurrenceType === 'CREDIT' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Credit</span>
												</div>
											</button>
											<button type="button" onClick={() => setRecurrenceType('DEBIT')} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${recurrenceType === 'DEBIT' ? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'bg-[#09090B] border-white/[0.04]'}`}>
												<div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${recurrenceType === 'DEBIT' ? 'bg-[#8B5CF6] text-white' : 'bg-white/[0.04] text-zinc-400'}`}><ArrowDownRight className="w-4 h-4" /></div>
												<div className="flex flex-col text-left">
													<span className={`text-sm font-semibold ${recurrenceType === 'DEBIT' ? 'text-white' : 'text-zinc-400'}`}>Despesa</span>
													<span className={`text-[10px] uppercase tracking-widest mt-0.5 ${recurrenceType === 'DEBIT' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Debit</span>
												</div>
											</button>
										</div>
									</div>
									<div className="flex bg-[#09090B] p-1 rounded-xl border border-white/[0.04] mb-4">
										{(['mensal', 'quinzenal', 'anual'] as const).map(f => (
											<button key={f} type="button" onClick={() => setFreq(f)} className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize ${freq === f ? 'bg-[#18181B] text-white' : 'text-zinc-500'}`}>{f}</button>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Live Preview (Fixado na direita) */}
				<div className="w-full sm:w-[340px] bg-[#111113] border-t sm:border-t-0 sm:border-l border-white/[0.04] flex flex-col shrink-0 z-20 min-h-0">
					<div className="hidden sm:flex flex-col flex-1 p-8 overflow-y-auto modal-scroll min-h-0">
						<h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" /> Resumo da Operação</h3>
						<div className="bg-[#09090B] border border-white/[0.04] rounded-2xl p-5 shadow-inner space-y-4">
							<div className="flex justify-between border-b border-white/[0.04] pb-4">
								<span className="text-sm font-medium text-zinc-400">Tipo</span>
								<span className={`text-sm font-bold uppercase ${themeHex}`}>{type === 'in' ? 'Receita' : type === 'out' ? 'Despesa' : 'Recorrência'}</span>
							</div>
							<div><span className="text-xs text-zinc-500 block mb-1">Valor</span><span className="text-xl font-bold text-white">{prefixSign}{amountStr || 'R$ 0,00'}</span></div>
							<div><span className="text-xs text-zinc-500 block mb-1">Descrição</span><span className={`text-sm font-medium ${description ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>{description || 'Não informada'}</span></div>
							<div className="flex gap-3 pt-2">
								<div className="flex-1"><span className="text-[10px] uppercase text-zinc-500 block mb-1">Categoria</span>{selectedCategory ? <span className="text-xs font-medium text-zinc-300">{selectedCategory.name}</span> : <span className="text-xs text-zinc-600">-</span>}</div>
								<div className="flex-1"><span className="text-[10px] uppercase text-zinc-500 block mb-1">Conta</span>{selectedWallet ? <span className="text-xs font-medium text-zinc-300">{selectedWallet.name}</span> : <span className="text-xs text-zinc-600">-</span>}</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-3 p-6 sm:p-8 pt-6 sm:pt-0 shrink-0 bg-[#09090B] sm:bg-[#111113]">
						<button className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-xl ${isIncome ? 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400' : isRecurring ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED]' : 'bg-rose-500 text-rose-950 hover:bg-rose-400'}`}>
							Salvar {isRecurring ? 'Recorrência' : 'Movimentação'}
						</button>
						<button onClick={onClose} className="w-full py-4 rounded-xl bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-white text-sm font-medium transition-colors">Cancelar</button>
					</div>
				</div>
			</div>
			<div className="flex-grow hidden sm:block pointer-events-none min-h-[2rem]" />
		</div>
	);
};

// ==========================================
// 6. DASHBOARD PRINCIPAL (INTELIGÊNCIA FINANCEIRA)
// ==========================================

export default function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedDay, setSelectedDay] = useState<number | null>(null);
	
	const [activeMonth, setActiveMonth] = useState(REAL_CURRENT_MONTH);
	const [activeYear, setActiveYear] = useState(REAL_CURRENT_YEAR);
	const [transactionsData, setTransactionsData] = useState<Transaction[]>(MOCK_TRANSACTIONS);
	const [modalConfig, setModalConfig] = useState<{isOpen: boolean, type: 'in' | 'out', date: string}>({ isOpen: false, type: 'in', date: '' });

	useEffect(() => {
		if (activeMonth === REAL_CURRENT_MONTH && activeYear === REAL_CURRENT_YEAR) {
			setTransactionsData(MOCK_TRANSACTIONS);
		} else {
			setTransactionsData([]); 
		}
		setSelectedDay(null);
	}, [activeMonth, activeYear]);

	// Inteligência Financeira (Cálculos Derivados)
	const intelligence = useMemo(() => {
		let inTotal = 0, outTotal = 0, futureTotalOut = 0;
		
		transactionsData.forEach(tx => {
			if (tx.status === 'future') {
				if (tx.type === 'out') futureTotalOut += tx.amount; // Dinheiro Comprometido é saída futura
			} else {
				if (tx.type === 'in') inTotal += tx.amount;
				else outTotal += tx.amount;
			}
		});

		const net = inTotal - outTotal;
		const currentPatrimony = BASE_PATRIMONY + net;
		const available = currentPatrimony - futureTotalOut;

		// Achar maior gasto e maior receita
		let maxExpense = 0, maxIncome = 0;
		let topExpenseCategory = 'Nenhuma', topIncomeCategory = 'Nenhuma';
		let expenseMap: Record<string, number> = {};
		let incomeMap: Record<string, number> = {};

		transactionsData.filter(t => t.status === 'completed').forEach(tx => {
			if (tx.type === 'out') {
				if (tx.amount > maxExpense) maxExpense = tx.amount;
				expenseMap[tx.category] = (expenseMap[tx.category] || 0) + tx.amount;
			} else {
				if (tx.amount > maxIncome) maxIncome = tx.amount;
				incomeMap[tx.category] = (incomeMap[tx.category] || 0) + tx.amount;
			}
		});

		// Sort categories
		if (Object.keys(expenseMap).length > 0) topExpenseCategory = Object.keys(expenseMap).reduce((a, b) => expenseMap[a] > expenseMap[b] ? a : b);
		if (Object.keys(incomeMap).length > 0) topIncomeCategory = Object.keys(incomeMap).reduce((a, b) => incomeMap[a] > incomeMap[b] ? a : b);

		const futureCount = transactionsData.filter(t => t.status === 'future').length;
		const completedCount = transactionsData.filter(t => t.status === 'completed').length;
		const predictedEndBalance = currentPatrimony - futureTotalOut + transactionsData.filter(t => t.status === 'future' && t.type === 'in').reduce((acc, t) => acc + t.amount, 0);

		return {
			inTotal, outTotal, net, count: transactionsData.length,
			currentPatrimony, futureTotalOut, available,
			maxExpense, maxIncome, topExpenseCategory, topIncomeCategory,
			futureCount, completedCount, predictedEndBalance
		};
	}, [transactionsData]);

	// Acoplamento da Lógica com a Grade Pura
	const customGridGenerator = (month: number, year: number): EnrichedCalendarCell[] => {
		const rawCells = generateCalendarGrid(month, year);
		return rawCells.map(cell => {
			if (!cell.day) return { ...cell, transactions: [], inTotal: 0, outTotal: 0, futureTotal: 0, sidebarHighlightClass: '' };

			const dayTxs = transactionsData.filter(tx => tx.day === cell.day);
			let dIn = 0, dOut = 0, fTotal = 0;

			dayTxs.forEach(tx => {
				if (tx.status === 'future') fTotal += tx.amount;
				else {
					if (tx.type === 'in') dIn += tx.amount; else dOut += tx.amount;
				}
			});

			// Highlight logic removed for brevity to keep clean visual, relies on badges inside cell
			return { ...cell, transactions: dayTxs, inTotal: dIn, outTotal: dOut, futureTotal: fTotal, sidebarHighlightClass: '' };
		});
	};

	const selectedDayInfo = useMemo(() => {
		if (!selectedDay) return null;
		return customGridGenerator(activeMonth, activeYear).find(d => d.day === selectedDay);
	}, [selectedDay, activeMonth, activeYear, transactionsData]);

	const isCurrentMonthView = activeMonth === REAL_CURRENT_MONTH && activeYear === REAL_CURRENT_YEAR;

	return (
		<div className="min-h-screen flex bg-[#09090B] text-zinc-100 font-sans selection:bg-[#7C3AED]/30 overflow-x-hidden">
			<GlobalStyles />
			<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.04)_0%,_rgba(9,9,11,0)_70%)]"></div>
			</div>

			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

			<main className="flex-1 w-full min-w-0 flex flex-col relative z-10">
				<div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 flex flex-col flex-1">
					
					{/* 1. APRESENTAÇÃO */}
					<CalendarHeader month={activeMonth} year={activeYear} onPrevMonth={() => setActiveMonth(m => m === 0 ? 11 : m - 1)} onNextMonth={() => setActiveMonth(m => m === 11 ? 0 : m + 1)} />

					{/* 2. VISÃO GERAL FINANCEIRA */}
					<section className="w-full mb-12 animate-slide-up delay-100">
						<h3 className="text-lg font-medium text-white mb-5 tracking-tight">Visão Geral Financeira</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
							
							{/* Patrimônio (Hero) */}
							<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#111113] to-[#151518] border border-white/[0.06] rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
								<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Wallet className="w-16 h-16 text-[#8B5CF6]" /></div>
								<span className="text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-2">Patrimônio Atual</span>
								<span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{formatCurrency(intelligence.currentPatrimony)}</span>
								<div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
									<TrendingUp className="w-3 h-3" /> +14% vs último mês
								</div>
							</div>

							{/* Disponível */}
							<div className="col-span-2 md:col-span-3 xl:col-span-2 bg-[#111113]/80 border border-[#8B5CF6]/20 rounded-[24px] p-6 relative">
								<span className="text-[11px] uppercase tracking-widest text-[#8B5CF6] font-bold block mb-2">Disponível para gastar</span>
								<span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{formatCurrency(intelligence.available)}</span>
								<span className="block mt-4 text-xs font-medium text-zinc-500">
									Livre de {formatCurrency(intelligence.futureTotalOut)} em compromissos
								</span>
							</div>

							{/* Grid 2x2 para o resto */}
							<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
								<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Entrou</span>
								<span className="text-xl font-medium text-emerald-400 tracking-tight">+{formatCurrency(intelligence.inTotal)}</span>
							</div>
							<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
								<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Saiu</span>
								<span className="text-xl font-medium text-rose-400 tracking-tight">-{formatCurrency(intelligence.outTotal)}</span>
							</div>
							<div className="bg-[#111113]/50 border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-center">
								<span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1">Sobrou Líquido</span>
								<span className={`text-xl font-bold tracking-tight ${intelligence.net >= 0 ? 'text-[#8B5CF6]' : 'text-rose-500'}`}>
									{formatCurrency(intelligence.net)}
								</span>
							</div>
							<div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 flex flex-col justify-center">
								<span className="text-[10px] uppercase tracking-widest text-amber-500/70 font-semibold mb-1">Comprometido</span>
								<span className="text-xl font-medium text-amber-400 tracking-tight">{formatCurrency(intelligence.futureTotalOut)}</span>
							</div>

						</div>
					</section>

					{/* 3. CENTRO DE INTELIGÊNCIA (Insights + Resumo) */}
					<section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 animate-slide-up delay-200">
						
						{/* Insights Conversacionais (Left - 7 cols) */}
						<div className="lg:col-span-7 flex flex-col">
							<h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
								<Sparkles className="w-5 h-5 text-[#8B5CF6]" /> Insights Inteligentes
							</h3>
							<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-center space-y-6">
								
								<div className="flex items-start gap-4">
									<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
									<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
										Você gastou <span className="font-semibold text-emerald-400">18% menos</span> do que no mês passado. Continue nesse ritmo!
									</p>
								</div>
								
								<div className="flex items-start gap-4">
									<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
									<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
										Seu maior gasto do mês até agora foi com <span className="font-medium text-white">{intelligence.topExpenseCategory}</span>, totalizando {formatCurrency(intelligence.maxExpense)}.
									</p>
								</div>

								<div className="flex items-start gap-4">
									<div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2 shrink-0"></div>
									<p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed">
										Ainda existem <span className="font-medium text-amber-400">{intelligence.futureCount} recorrências</span> programadas. Sua próxima cobrança acontece em 3 dias.
									</p>
								</div>

							</div>
						</div>

						{/* Resumo & Mini Chart (Right - 5 cols) */}
						<div className="lg:col-span-5 flex flex-col">
							 <h3 className="text-lg font-medium text-white mb-5 tracking-tight flex items-center gap-2">
								<PieChart className="w-5 h-5 text-zinc-500" /> Resumo do Mês
							</h3>
							<div className="bg-[#111113]/40 border border-white/[0.04] rounded-[24px] p-6 sm:p-8 flex-1 flex flex-col justify-between">
								
								<div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
									<div>
										<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Gasto</span>
										<span className="text-sm font-medium text-rose-400">{formatCurrency(intelligence.maxExpense)}</span>
									</div>
									<div>
										<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Maior Receita</span>
										<span className="text-sm font-medium text-emerald-400">{formatCurrency(intelligence.maxIncome)}</span>
									</div>
									<div>
										<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Despesa</span>
										<span className="text-sm font-medium text-zinc-300">{intelligence.topExpenseCategory}</span>
									</div>
									<div>
										<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Top Receita</span>
										<span className="text-sm font-medium text-zinc-300">{intelligence.topIncomeCategory}</span>
									</div>
									<div>
										<span className="text-[10px] uppercase text-zinc-500 font-semibold block mb-1">Previsão Fim do Mês</span>
										<span className="text-sm font-bold text-[#8B5CF6]">{formatCurrency(intelligence.predictedEndBalance)}</span>
									</div>
								</div>

								{/* Minimalist Area Chart for Balance Evolution (Mocked shape) */}
								<div className="w-full h-16 relative mt-auto border-b border-white/[0.04]">
									<svg className="w-full h-full overflow-visible" viewBox="0 0 400 60" preserveAspectRatio="none">
										<defs>
											<linearGradient id="grad-line" x1="0" y1="0" x2="0" y2="1">
												<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
												<stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
											</linearGradient>
										</defs>
										<path d="M0,50 L40,45 L80,55 L120,40 L160,20 L200,25 L240,10 L280,15 L320,5 L360,20 L400,10 L400,60 L0,60 Z" fill="url(#grad-line)" />
										<polyline fill="none" stroke="#8B5CF6" strokeWidth="2" points="0,50 40,45 80,55 120,40 160,20 200,25 240,10 280,15 320,5 360,20 400,10" />
									</svg>
								</div>
							</div>
						</div>

					</section>

					{/* 4. CALENDÁRIO CORE */}
					<div className="w-full flex flex-col min-w-0 animate-slide-up delay-300 mb-6">
						<h3 className="text-lg font-medium text-white mb-5 tracking-tight">Calendário de Movimentações</h3>
						<Calendar<EnrichedCalendarCell>
							month={activeMonth}
							year={activeYear}
							onMonthChange={(m, y) => { setActiveMonth(m); setActiveYear(y); }}
							customGridGenerator={customGridGenerator}
							renderCell={(cell, index) => {
								if (cell.day === null) {
									return <div key={`empty-${index}`} className="bg-[#09090B] min-h-[90px] sm:min-h-[140px] opacity-25 border-[0.5px] border-white/[0.01]" />;
								}

								const isToday = isCurrentMonthView && cell.day === CURRENT_DAY_NUMBER;
								const isSelected = selectedDay === cell.day;
								const hasFuture = cell.futureTotal > 0;

								return (
									<div
										key={cell.day}
										onClick={() => setSelectedDay(cell.day)}
										className={`
											relative flex flex-col justify-between p-2 sm:p-4 min-h-[90px] sm:min-h-[140px] md:min-h-[160px] bg-[#09090B] 
											transition-all duration-300 cursor-pointer group hover:bg-[#111113] hover:z-10 border-[0.5px] border-white/[0.01]
											${isSelected ? 'ring-2 ring-inset ring-[#8B5CF6] z-10 bg-[#111113]' : ''}
										`}
									>
										{hasFuture && <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-500/60 z-20"></div>}
										
										<div className="flex items-start justify-between w-full relative z-10">
											<div className={`
												flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold
												${isToday ? 'bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-zinc-500 group-hover:text-zinc-200'}
											`}>
												{cell.day}
											</div>

											<div className="flex sm:hidden gap-1 items-center">
												{cell.inTotal > 0 && <div className="w-1 h-1 rounded-full bg-emerald-500"></div>}
												{cell.outTotal > 0 && <div className="w-1 h-1 rounded-full bg-rose-500"></div>}
												{hasFuture && <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>}
											</div>
										</div>

										<div className="hidden sm:flex flex-col gap-1 flex-1 w-full min-w-0 mt-3 mb-2 relative z-10">
											{cell.transactions.slice(0, 2).map(tx => (
												<div key={tx.id} className="flex items-center gap-1.5 text-[11px] text-zinc-400 truncate">
													<span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tx.status === 'future' ? 'bg-amber-500' : tx.type === 'in' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
													<span className={`truncate font-medium ${tx.status === 'future' ? 'text-amber-500/80' : 'text-zinc-300'}`}>{tx.description}</span>
												</div>
											))}
											{cell.transactions.length > 2 && <div className="text-[10px] text-[#8B5CF6] font-semibold pl-3 mt-0.5">+{cell.transactions.length - 2} mais</div>}
										</div>

										<div className="hidden sm:flex flex-col justify-end w-full pt-2 border-t border-white/[0.02] relative z-10">
											{cell.transactions.length > 0 ? (
												<div className="flex items-center justify-between gap-1 w-full text-[10px]">
													<span className="text-zinc-500 font-medium uppercase tracking-wider">Previsto</span>
													<span className="font-semibold text-zinc-300 font-mono tracking-tight">{formatCurrency(BASE_PATRIMONY + cell.inTotal - cell.outTotal)}</span>
												</div>
											) : <div className="h-[14px]"></div>}
										</div>
									</div>
								);
							}}
						/>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-zinc-500 font-medium animate-slide-up delay-200 px-4 mb-16">
						<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Receita</div>
						<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Despesa</div>
						<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Recorrência Futura</div>
						<div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>Hoje</div>
					</div>

					{/* 5. TRANSAÇÕES RECENTES */}
					<section className="w-full flex flex-col min-w-0 animate-slide-up delay-400">
						<h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-6">Lista de Transações</h3>
						<div className="flex flex-col gap-3">
							{transactionsData.map((tx) => {
								const Icon = tx.icon;
								const isFuture = tx.status === 'future';
								const isInc = tx.type === 'in';
								const isMaxExp = tx.amount === intelligence.maxExpense && !isInc && !isFuture;
								const isMaxInc = tx.amount === intelligence.maxIncome && isInc && !isFuture;
								
								return (
									<div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-[#0e0e11]/50 border border-white/[0.04] hover:bg-[#111113] hover:border-white/[0.08] transition-all rounded-[20px] group gap-4 relative overflow-hidden">
										{isMaxExp && <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-rose-500" />}
										{isMaxInc && <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-emerald-500" />}
										
										<div className="flex items-center gap-4 pl-1">
											<div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors flex-shrink-0
												${isFuture ? 'bg-amber-500/5 border-amber-500/10 text-amber-500/70 group-hover:text-amber-400 group-hover:bg-amber-500/10' : 
												'bg-white/[0.02] border-white/[0.04] text-zinc-500 group-hover:text-zinc-300'}`}
											>
												<Icon className="w-5 h-5" />
											</div>
											<div className="flex flex-col gap-1 min-w-0">
												<div className="flex items-center gap-2">
													<h4 className={`text-sm sm:text-base font-medium truncate ${isFuture ? 'text-amber-100/90' : 'text-zinc-200'}`}>
														{tx.description}
													</h4>
													{isMaxExp && <span className="hidden sm:flex text-[9px] uppercase tracking-wider text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold border border-rose-500/20"><Flame className="w-2.5 h-2.5 mr-1"/> Maior Gasto</span>}
													{isMaxInc && <span className="hidden sm:flex text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold border border-emerald-500/20"><Target className="w-2.5 h-2.5 mr-1"/> Maior Receita</span>}
												</div>
												<div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 truncate">
													<span className={`${isFuture ? 'text-amber-500/80' : 'text-[#8B5CF6]'} font-medium`}>{tx.category}</span>
													<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0"></span>
													<span>{tx.day < 10 ? `0${tx.day}` : tx.day} de {MONTHS_PT[activeMonth]}</span>
													<span className="w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 hidden sm:block"></span>
													<span className="hidden sm:block">{tx.wallet}</span>
												</div>
											</div>
										</div>
										
										<div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pl-16 sm:pl-0">
											<span className={`text-base sm:text-lg font-bold tracking-tight ${isFuture ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}>
												{isInc ? '+' : '-'}{formatCurrency(tx.amount)}
											</span>
											<div className="flex items-center gap-2">
												{isFuture ? (
													<span className="text-[10px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
														<Clock className="w-3 h-3" /> Previsto
													</span>
												) : (
													<span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${isInc ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
														{isInc ? 'Receita' : 'Despesa'}
													</span>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</section>

					{/* Renderização do Drawer Lateral / Bottom Sheet */}
					{selectedDayInfo && (
						<div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch">
							<div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-overlay" onClick={() => setSelectedDay(null)} />
							<div className="relative w-full md:max-w-[440px] bg-[#09090B] border-t md:border-t-0 md:border-l border-white/[0.06] h-[85vh] md:h-full flex flex-col z-10 shadow-2xl rounded-t-3xl md:rounded-none animate-bottom-sheet md:animate-drawer min-h-0">
								<div className="px-6 pt-6 pb-4 md:pt-8 md:pb-6 border-b border-white/[0.04] flex items-center justify-between shrink-0">
									<div>
										<span className="text-[10px] uppercase tracking-widest text-[#8B5CF6] font-bold">Inspecionar Dia</span>
										<h3 className="text-xl md:text-2xl font-semibold text-white mt-1">{1 < 10 ? `0${selectedDayInfo.day}` : selectedDayInfo.day} de {MONTHS_PT[activeMonth]}</h3>
									</div>
									<button onClick={() => setSelectedDay(null)} className="p-2 rounded-full bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 transition-colors"><X className="w-5 h-5" /></button>
								</div>
								<div className="flex-1 overflow-y-auto modal-scroll p-6 space-y-6">
									{selectedDayInfo.transactions?.length > 0 ? (
										<div className="space-y-3">
											{selectedDayInfo.transactions.map(tx => {
												const isInc = tx.type === 'in';
												return (
													<div key={tx.id} className="p-4 bg-[#111113] border border-white/[0.04] rounded-2xl flex items-center justify-between">
														<div className="flex items-center gap-3">
															<div className={`w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center ${tx.status === 'future' ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}><tx.icon className="w-4 h-4" /></div>
															<div><h4 className="text-sm font-medium text-zinc-200">{tx.description}</h4><span className="text-xs text-zinc-500">{tx.category}</span></div>
														</div>
														<span className={`font-bold tracking-tight ${tx.status === 'future' ? 'text-amber-400' : isInc ? 'text-emerald-400' : 'text-rose-400'}`}>{isInc ? '+' : '-'}{formatCurrency(tx.amount)}</span>
													</div>
												);
											})}
										</div>
									) : <div className="py-12 text-center text-zinc-600 text-sm">Nenhuma transação agendada.</div>}
								</div>
								<div className="p-4 sm:p-6 border-t border-white/[0.04] bg-[#09090B] flex gap-3 shrink-0">
									<button onClick={() => setModalConfig({ isOpen: true, type: 'in', date: `${selectedDayInfo.day}/${activeMonth+1}/${activeYear}` })} className="flex-1 py-3.5 rounded-xl bg-[#111113] hover:bg-emerald-500/10 border border-white/[0.04] hover:border-emerald-500/30 text-emerald-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"><Plus className="w-4 h-4" /> Receita</button>
									<button onClick={() => setModalConfig({ isOpen: true, type: 'out', date: `${selectedDayInfo.day}/${activeMonth+1}/${activeYear}` })} className="flex-1 py-3.5 rounded-xl bg-[#111113] hover:bg-rose-500/10 border border-white/[0.04] hover:border-rose-500/30 text-rose-400 font-medium text-sm flex items-center justify-center gap-2 transition-colors"><Minus className="w-4 h-4" /> Despesa</button>
								</div>
							</div>
						</div>
					)}

					{/* Instância do Modal Premium de Transações */}
					<TransactionModal isOpen={modalConfig.isOpen} onClose={() => setModalConfig({...modalConfig, isOpen: false})} typeStr={modalConfig.type} prefillDate={modalConfig.date} />

					<footer className="w-full border-t border-white/[0.04] text-zinc-500 text-xs sm:text-sm mt-16 pt-8 pb-4 text-center sm:text-left">
						<span className="font-light tracking-wide text-zinc-400">© 2026 Avora. Todos os direitos reservados.</span>
					</footer>
				</div>
			</main>
			<MobileNav setIsOpen={setIsSidebarOpen} />
		</div>
	);
}