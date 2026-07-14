import { AlignLeft, MinusCircle, PlusCircle, X, AlertTriangle, Hand, Zap } from "lucide-react";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { ExecutionType } from "../../../types/ExecutionType";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import type { RecurrenceFormData } from "../types/RecurrenceFormData";

// ---- Helper de data ----
const TODAY = new Date();
const TODAY_DAY = TODAY.getDate();
const TODAY_MONTH = TODAY.getMonth() + 1; // getMonth() é 0-indexed

/**
 * Verifica se um dia (e opcionalmente um mês) já passou em relação a hoje.
 * - Sem `month`: compara apenas o dia contra o dia atual (uso MONTHLY/BIWEEKLY).
 * - Com `month`: compara mês+dia completos (uso YEARLY).
 */
const isDateAlreadyPast = (day?: string, month?: string): boolean => {
	const d = Number(day);
	if (!day || Number.isNaN(d)) return false;

	if (month) {
		const m = Number(month);
		if (Number.isNaN(m)) return false;
		if (m < TODAY_MONTH) return true;
		if (m > TODAY_MONTH) return false;
		return d < TODAY_DAY;
	}

	return d < TODAY_DAY;
};

interface AlreadyOccurredNoticeProps {
	day?: string;
	month?: string;
	fieldName: 'dayOneAlreadyOccurred' | 'dayTwoAlreadyOccurred';
	checked: boolean;
	onToggle: (checked: boolean) => void;
}

const MONTH_NAMES = [
	'', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const AlreadyOccurredNotice = ({
	day,
	month,
	fieldName,
	checked,
	onToggle
}: AlreadyOccurredNoticeProps) => {
	if (!isDateAlreadyPast(day, month)) return null;

	const monthLabel = month ? MONTH_NAMES[Number(month)] : null;
	const isPastMonth = month ? Number(month) < TODAY_MONTH : false;

	return (
		<div className="col-span-2 -mt-1 bg-amber-500/[0.08] border border-amber-500/25 rounded-xl p-4 animate-slide-up">
			<label className="flex items-start gap-3 cursor-pointer select-none">
				<input
					type="checkbox"
					id={fieldName}
					name={fieldName}
					checked={checked}
					onChange={(e) => onToggle(e.target.checked)}
					className="mt-0.5 w-4 h-4 shrink-0 rounded border-white/[0.15] bg-[#09090B] accent-[#8B5CF6] cursor-pointer"
				/>
				<span className="text-xs text-zinc-300 leading-relaxed">
					<span className="flex items-center gap-1.5 font-medium text-amber-400 mb-1">
						<AlertTriangle className="w-3.5 h-3.5" />
						{monthLabel
							? isPastMonth
								? `${monthLabel} já passou este ano`
								: `Dia ${day} de ${monthLabel} é anterior ao de hoje`
							: fieldName === 'dayOneAlreadyOccurred'
								? 'Primeiro dia é anterior ao de hoje'
								: 'Segundo dia é anterior ao de hoje'}
					</span>
					Essa recorrência já aconteceu? Se sim, marque esta caixa — a transação referente a esta data será lançada automaticamente ao salvar. Se não, deixe desmarcada.
				</span>
			</label>
		</div>
	);
};

const TypeSelection = () => {
	return (
		<div className="flex p-1.5 bg-[#111113] rounded-2xl border border-white/[0.04] relative">
			<button
				type="button"
				className='flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all duration-300 text-[#8B5CF6] shadow-md'
			>
				Recorrência
			</button>
			
			<div 
				className="absolute top-1.5 bottom-1.5 w-[calc(99%-4px)] rounded-xl bg-[#18181B] border border-white/[0.04] transition-transform duration-300 ease-out z-0"
				style={{ transform: `translateX(0%)` }}
			/>
		</div>
	)
}

interface AmountProps {
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
	inputsError: Record<string, string>;
}

const Amount = ({
	inputRef,
	form,
	handleOnChange,
	themeHex,
	inputsError
}: AmountProps) => {
	return (
		<div className="flex flex-col items-center justify-center py-6">
			<span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Valor</span>
			<div className="flex items-center justify-center gap-3">
				<span className={`text-4xl sm:text-5xl font-medium ${themeHex} transition-colors duration-300`}>
					R$
				</span>
				<Input
					ref={inputRef}
					id="amount"
					name="amount"
					type="text"
					placeholder="0,00"
					value={formatCurrencyInput(form.amount.replace('R$', '').trim())}
					onChange={handleOnChange}
					className="bg-transparent text-6xl sm:text-7xl font-bold text-white w-full max-w-[300px] sm:max-w-[400px] outline-none placeholder-zinc-800 tracking-tighter"
				/>
			</div>
			{inputsError.amount && <span className="text-xs text-red-600 pl-2 mr-auto">{inputsError.amount}</span>}
		</div>
	)
}

interface DescriptionProps {
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputsError: Record<string, string>;
}

const Description = ({
	form,
	handleOnChange,
	inputsError
}: DescriptionProps) => {
	return (
		<div className="sm:col-span-2">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Descrição</label>
			<div className="relative group">
				<AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
				<Input
					id="description"
					name="description"
					type="text"
					value={form.description}
					onChange={handleOnChange}
					placeholder={"Ex.: Mercado"}
					className={`
						w-full bg-[#111113] border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium placeholder-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none shadow-sm focus:shadow-[0_0_0_2px_rgba(139,92,246,0.1)]
						${inputsError.description ? 'border-red-600' : 'border-white/[0.04]'}
					`}
				/>
			</div>
			{inputsError.description && <span className="text-xs text-red-600 ml-2">{inputsError.description}</span>}
		</div>
	)
}

interface ExecutionTypeSelectionProps {
	form: RecurrenceFormData;
	setExecutionType: (type: ExecutionType) => void;
	inputsError: Record<string, string>;
}

const ExecutionTypeSelection = ({
	form,
	setExecutionType,
	inputsError
}: ExecutionTypeSelectionProps) => {
	return (
		<div className="border-t border-white/[0.04] pt-6 mb-6">
			<label className="text-[13px] font-medium text-zinc-300 block mb-1">Tipo de execução</label>
			<p className="text-xs font-light text-zinc-500 mb-4">Defina se a transação será lançada sozinha na data ou se você prefere confirmar manualmente.</p>

			<div className="grid grid-cols-2 gap-3 sm:gap-4">
				<button
					type="button"
					onClick={() => setExecutionType('MANUALLY')}
					className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all duration-300 text-center sm:text-left group outline-none ${
						form.executionType === 'MANUALLY'
							? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
							: 'bg-[#09090B] border-white/[0.04] hover:border-white/[0.08]'
					}`}
				>
					<div className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
						form.executionType === 'MANUALLY' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-300'
					}`}>
						<Hand className="w-5 h-5 sm:w-4 sm:h-4" />
					</div>
					<div className="flex flex-col">
						<span className={`text-sm font-semibold transition-colors duration-300 ${form.executionType === 'MANUALLY' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>Manual</span>
						<span className="text-[10px] tracking-widest mt-0.5 text-zinc-500 normal-case">Você confirma cada lançamento</span>
					</div>
				</button>

				<button
					type="button"
					onClick={() => setExecutionType('AUTOMATIC')}
					className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all duration-300 text-center sm:text-left group outline-none ${
						form.executionType === 'AUTOMATIC'
							? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
							: 'bg-[#09090B] border-white/[0.04] hover:border-white/[0.08]'
					}`}
				>
					<div className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
						form.executionType === 'AUTOMATIC' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-300'
					}`}>
						<Zap className="w-5 h-5 sm:w-4 sm:h-4" />
					</div>
					<div className="flex flex-col">
						<span className={`text-sm font-semibold transition-colors duration-300 ${form.executionType === 'AUTOMATIC' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>Automática</span>
						<span className="text-[10px] tracking-widest mt-0.5 text-zinc-500 normal-case">Lançada sozinha na data</span>
					</div>
				</button>
			</div>
			{inputsError.executionType && <span className="text-xs text-red-600 ml-2 block mt-2">{inputsError.executionType}</span>}
		</div>
	)
}

interface ConfigureRecurrenceProps {
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	setFrequency: (freq: FrequencyType) => void;
	setRecurrenceType: (recType: RecurrenceType) => void;
	setExecutionType: (type: ExecutionType) => void;
	inputsError: Record<string, string>;
	setAlreadyOccurred: (field: 'dayOneAlreadyOccurred' | 'dayTwoAlreadyOccurred' | 'monthOfTheYearAlreadyOccurred', value: boolean) => void;
}

const ConfigureRecurrence = ({
	form,
	handleOnChange,
	setFrequency,
	setRecurrenceType,
	setExecutionType,
	inputsError,
	setAlreadyOccurred
}: ConfigureRecurrenceProps) => {
	return (
		<div className="sm:col-span-2 animate-slide-up bg-[#111113]/50 border border-[#7C3AED]/20 rounded-2xl p-5 sm:p-6 mt-2">
			
			<div className="mb-8">
				<label className="text-[13px] font-medium text-zinc-300 block mb-1">Tipo da recorrência</label>
				<p className="text-xs font-light text-zinc-500 mb-4">Informe se esta recorrência adicionará ou removerá dinheiro da conta.</p>
				
				<div className="grid grid-cols-2 gap-3 sm:gap-4">
					<button
						type="button"
						onClick={() => setRecurrenceType('CREDIT')}
						className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all duration-300 text-center sm:text-left group outline-none ${
							form.type === 'CREDIT'
								? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
								: 'bg-[#09090B] border-white/[0.04] hover:border-white/[0.08]'
						}`}
					>
						<div className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
							form.type === 'CREDIT' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-300'
						}`}>
							<PlusCircle className="w-5 h-5 sm:w-4 sm:h-4" />
						</div>
						<div className="flex flex-col">
							<span className={`text-sm font-semibold transition-colors duration-300 ${form.type === 'CREDIT' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>Receita</span>
							<span className={`text-[10px] uppercase tracking-widest mt-0.5 transition-colors duration-300 ${form.type === 'CREDIT' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Credit</span>
						</div>
					</button>

					<button
						type="button"
						onClick={() => setRecurrenceType('DEBIT')}
						className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all duration-300 text-center sm:text-left group outline-none ${
							form.type === 'DEBIT'
								? 'bg-[#7C3AED]/10 border-[#8B5CF6]/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
								: 'bg-[#09090B] border-white/[0.04] hover:border-white/[0.08]'
						}`}
					>
						<div className={`w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
							form.type === 'DEBIT' ? 'bg-[#8B5CF6] text-white shadow-sm' : 'bg-white/[0.04] text-zinc-400 group-hover:text-zinc-300'
						}`}>
							<MinusCircle className="w-5 h-5 sm:w-4 sm:h-4" />
						</div>
						<div className="flex flex-col">
							<span className={`text-sm font-semibold transition-colors duration-300 ${form.type === 'DEBIT' ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>Despesa</span>
							<span className={`text-[10px] uppercase tracking-widest mt-0.5 transition-colors duration-300 ${form.type === 'DEBIT' ? 'text-[#8B5CF6]' : 'text-zinc-500'}`}>Debit</span>
						</div>
					</button>
				</div>
				{inputsError.recurrenceType && <span className="text-xs text-red-600 ml-2">{inputsError.type}</span>}
			</div>

			<ExecutionTypeSelection
				form={form}
				setExecutionType={setExecutionType}
				inputsError={inputsError}
			/>

			<div className="border-t border-white/[0.04] pt-6 mb-5">
				<h4 className="text-[13px] font-medium text-zinc-300 flex items-center gap-2">
					Frequência da recorrência
				</h4>
			</div>

			{/* Frequência Tabs */}
			<div className="flex bg-[#09090B] p-1 rounded-xl border border-white/[0.04] mb-6">
				{(['MONTHLY', 'BIWEEKLY', 'YEARLY'] as const).map(f => (
					<button
						key={f}
						type="button"
						onClick={() => setFrequency(f)}
						className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg capitalize transition-colors ${form.frequencyType === f ? 'bg-[#18181B] text-white shadow-sm border border-white/[0.04]' : 'text-zinc-500 hover:text-zinc-300'}`}
					>
						{f === 'MONTHLY' ? 'Mensal' : f === 'BIWEEKLY' ? 'Semanal' : 'Anual'}
					</button>
				))}
			</div>

			<div className="grid grid-cols-2 gap-4">
				{form.frequencyType === 'MONTHLY' && (
					<>
						<div className="col-span-2 sm:col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Dia do Mês</label>
							<input
								id="recDayOne"
								name="recDayOne"
								type="number"
								min="1"
								max="31"
								placeholder="Ex: 5"
								value={form.recDayOne}
								onChange={handleOnChange}
								className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all"
							/>
						</div>

						<AlreadyOccurredNotice
							day={form.recDayOne}
							fieldName="dayOneAlreadyOccurred"
							checked={!!form.dayOneAlreadyOccurred}
							onToggle={(checked) => setAlreadyOccurred('dayOneAlreadyOccurred', checked)}
						/>
					</>
				)}

				{form.frequencyType === 'BIWEEKLY' && (
					<>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Primeiro Dia</label>
							<input
								id="recDayOne"
								name="recDayOne"
								type="number"
								min="1"
								max="31"
								placeholder="Ex: 5"
								value={form.recDayOne}
								onChange={handleOnChange}
								className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all"
							/>
						</div>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Segundo Dia</label>
							<input
								id="recDayTwo"
								name="recDayTwo"
								type="number"
								min="1"
								max="31"
								placeholder="Ex: 20"
								value={form.recDayTwo}
								onChange={handleOnChange}
								className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all"
							/>
						</div>

						<AlreadyOccurredNotice
							day={form.recDayOne}
							fieldName="dayOneAlreadyOccurred"
							checked={!!form.dayOneAlreadyOccurred}
							onToggle={(checked) => setAlreadyOccurred('dayOneAlreadyOccurred', checked)}
						/>
						<AlreadyOccurredNotice
							day={form.recDayTwo}
							fieldName="dayTwoAlreadyOccurred"
							checked={!!form.dayTwoAlreadyOccurred}
							onToggle={(checked) => setAlreadyOccurred('dayTwoAlreadyOccurred', checked)}
						/>
					</>
				)}

				{form.frequencyType === 'YEARLY' && (
					<>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Mês</label>
							<select
								id="month"
								name="month"
								value={form.month}
								onChange={handleOnChange}
								className="w-full appearance-none bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all">
								<option value="">Selecione</option>
								{MONTH_NAMES.slice(1).map((name, index) => (
									<option key={index + 1} value={index + 1}>{name}</option>
								))}
							</select>
						</div>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Dia</label>
							<input
								id="recDayOne"
								name="recDayOne"
								type="number"
								min="1"
								max="31"
								placeholder="Ex: 5"
								value={form.recDayOne}
								onChange={handleOnChange}
								className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all"
							/>
						</div>

						<AlreadyOccurredNotice
							day={form.recDayOne}
							month={form.month}
							fieldName="dayOneAlreadyOccurred"
							checked={!!form.dayOneAlreadyOccurred}
							onToggle={(checked) => setAlreadyOccurred('dayOneAlreadyOccurred', checked)}
						/>
					</>
				)}
			</div>

			{inputsError.frequencyType && <span className="text-xs text-red-600 ml-2">{inputsError.frequencyType}</span>}
		</div>
	)
}

interface CategoriesProps {
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	categories: CategoryResponse[];
	inputsError: Record<string, string>;
}

const Categories = ({
	form,
	handleOnChange,
	categories,
	inputsError
}: CategoriesProps) => {
	return (
		<div className="sm:col-span-2 w-full">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Categorias</label>
			<div className="relative group">
				<AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
				<Select
					id="categoryId"
					name="categoryId"
					className={`
						w-full relative z-20 bg-[#111113] rounded-2xl py-3.5 pl-2 pr-10 text-left transition-all outline-none flex items-center
						${inputsError.category && 'border border-red-600'}
					`}
					onChange={handleOnChange}
					value={form.categoryId}
				>
					<option value=''>Selecione</option>
					{categories.map((cat) => (
						<option key={cat.id} value={cat.id}>{cat.name}</option>
					))}
				</Select>
			</div>
			{inputsError.category && <span className="text-xs text-red-600 ml-2">{inputsError.category}</span>}
		</div>
	)
}

interface WalletsProps {
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	wallets: WalletResponse[];
	inputsError: Record<string, string>;
}

const Wallets = ({
	form,
	handleOnChange,
	wallets,
	inputsError
}: WalletsProps) => {
	return (
		<div className="sm:col-span-2 w-full">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Contas/Carteiras</label>
			<div className="relative group">
				<AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
				<Select
					id="walletId"
					name="walletId"
					className={`
						w-full relative z-20 bg-[#111113] hover:border-white/[0.08]' rounded-2xl py-3.5 pl-2 pr-10 text-left transition-all outline-none flex items-center
						${inputsError.wallet && 'border border-red-600'}
					`}
					onChange={handleOnChange}
					value={form.walletId}
				>
					<option value=''>Selecione</option>
					{wallets.map((wallet) => (
						<option key={wallet.id} value={wallet.id}>{wallet.name}</option>
					))}
				</Select>
			</div>
			{inputsError.wallet && <span className="text-xs text-red-600 ml-2">{inputsError.wallet}</span>}
		</div>
	)
}

interface RecurrenceFormProps {
	onClose: () => void
	form: RecurrenceFormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	setFrequency: (freq: FrequencyType) => void;
	setRecurrenceType: (recType: RecurrenceType) => void;
	setExecutionType: (type: ExecutionType) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
	inputsError: Record<string, string>;
	clearErrors: () => void,
	resetForm: () => void,
	categories: CategoryResponse[];
	wallets: WalletResponse[];
	setAlreadyOccurred: (field: 'dayOneAlreadyOccurred' | 'dayTwoAlreadyOccurred' | 'monthOfTheYearAlreadyOccurred', value: boolean) => void;
}

function RecurrenceForm({
	onClose,
	form,
	handleOnChange,
	setFrequency,
	setRecurrenceType,
	setExecutionType,
	inputRef,
	themeHex,
	inputsError,
	clearErrors,
	resetForm,
	categories,
	wallets,
	setAlreadyOccurred
}: RecurrenceFormProps) {
	return (
		<div className="flex-1 flex flex-col min-h-0">  
			{/* Header Fixo */}
			<div className="px-6 sm:px-8 pt-8 pb-6 flex-shrink-0 flex items-start justify-between bg-[#09090B] z-10">
				<div>
					<h2 className="text-2xl font-semibold text-white tracking-tight">Adicionar Movimentação</h2>
					<p className="text-sm font-light text-zinc-500 mt-1">Registre e categorize em poucos segundos.</p>
				</div>
				<button
					onClick={() => {
						clearErrors();
						resetForm();
						onClose();
					}}
					className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-colors"
				>
					<X className="w-5 h-5" />
				</button>
			</div>

			{/* Conteúdo Central Scrollável: O scroll atua exclusivamente aqui */}
			<div className="flex-1 overflow-y-auto modal-scroll px-6 sm:px-8 pb-8 space-y-8 min-h-0 relative">
				<TypeSelection
				/>

				<Amount
					form={form}
					handleOnChange={handleOnChange}
					inputRef={inputRef}
					themeHex={themeHex}
					inputsError={inputsError}
				/>

				{/* Grid de Inputs Principais */}
				<div className="sm:grid-cols-2 gap-5 sm:gap-6">
					
					{/* Descrição */}
					<Description
						form={form}
						handleOnChange={handleOnChange}
						inputsError={inputsError}
					/>

					<ConfigureRecurrence
						form={form}
						handleOnChange={handleOnChange}
						setFrequency={setFrequency}
						setRecurrenceType={setRecurrenceType}
						setExecutionType={setExecutionType}
						inputsError={inputsError}
						setAlreadyOccurred={setAlreadyOccurred}
					/>

					<div className="w-full flex justify-between gap-2 pt-3 pb-3">
						{/* Categorias */}
						<Categories
							form={form}
							handleOnChange={handleOnChange}
							categories={categories}
							inputsError={inputsError}
						/>

						{/* Contas */}
						<Wallets
							form={form}
							handleOnChange={handleOnChange}
							wallets={wallets}
							inputsError={inputsError}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RecurrenceForm;