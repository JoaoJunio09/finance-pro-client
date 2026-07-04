import { AlignLeft, CalendarDays, Repeat, X } from "lucide-react";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { FrequencyType } from "../../../types/FrequencyType";
import type { FormData } from "../types/FormData";
import type { TransactionModalType } from "../types/TransactionModalType";

interface TypeSelectionProps {
	type: TransactionModalType;
	setType: (type: TransactionModalType) => void;
}

const TypeSelection = ({
	type,
	setType
}: TypeSelectionProps) => {
	return (
		<div className="flex p-1.5 bg-[#111113] rounded-2xl border border-white/[0.04] relative">
			<button
				type="button"
				onClick={() => setType('CREDIT')}
				className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all duration-300 ${type === 'CREDIT' ? 'text-emerald-400 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
			>
				Receita
			</button>
			<button
				type="button"
				onClick={() => setType('DEBIT')}
				className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all duration-300 ${type === 'DEBIT' ? 'text-rose-400 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
			>
				Despesa
			</button>
			<button
				type="button"
				onClick={() => setType('RECURRING')}
				className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all duration-300 ${type === 'RECURRING' ? 'text-[#8B5CF6] shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
			>
				Recorrência
			</button>
			
			<div 
				className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] rounded-xl bg-[#18181B] border border-white/[0.04] transition-transform duration-300 ease-out z-0"
				style={{ transform: `translateX(${type === 'CREDIT' ? '0%' : type === 'DEBIT' ? '100%' : '200%'})` }}
			/>
		</div>
	)
}

interface AmountProps {
	type: TransactionModalType;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
}

const Amount = ({
	type,
	inputRef,
	form,
	handleOnChange,
	themeHex
}: AmountProps) => {
	return (
		<div className="flex flex-col items-center justify-center py-6">
			<span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">Valor</span>
			<div className="flex items-center justify-center gap-3">
				<span className={`text-4xl sm:text-5xl font-medium ${themeHex} transition-colors duration-300`}>
					{type === 'DEBIT' ? '-' : type === 'CREDIT' ? '+' : ''}R$
				</span>
				<Input
					ref={inputRef}
					id="amount"
					name="amount"
					type="text"
					placeholder="0,00"
					value={form.amount.replace('R$', '').trim()}
					onChange={handleOnChange}
					className="bg-transparent text-6xl sm:text-7xl font-bold text-white w-full max-w-[300px] sm:max-w-[400px] outline-none placeholder-zinc-800 tracking-tighter"
				/>
			</div>
		</div>
	)
}

interface DescriptionProps {
	type: TransactionModalType;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Description = ({
	form,
	handleOnChange,
	type
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
					placeholder={type === 'CREDIT' ? "Ex.: Salário" : "Ex.: Mercado"}
					className="w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium placeholder-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none shadow-sm focus:shadow-[0_0_0_2px_rgba(139,92,246,0.1)]"
				/>
			</div>
		</div>
	)
}

interface RegisteredAtProps {
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const RegisteredAt = ({
	form,
	handleOnChange
}: RegisteredAtProps) => {
	return (
		<div className="sm:col-span-2">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Data da Transação</label>
			<div className="relative group">
				<CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
				<Input
					id="registeredAt"
					name="registeredAt"
					type="datetime-local"
					value={form.registeredAt}
					onChange={handleOnChange}
					className="w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium placeholder-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none shadow-sm focus:shadow-[0_0_0_2px_rgba(139,92,246,0.1)] style-color-scheme-dark"
					style={{ colorScheme: 'dark' }}
				/>
			</div>
		</div>
	)
}

interface ConfigureRecurrenceProps {
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	setFrequency: (freq: FrequencyType) => void;
}

const ConfigureRecurrence = ({
	form,
	handleOnChange,
	setFrequency
}: ConfigureRecurrenceProps) => {
	return (
		<div className="sm:col-span-2 animate-slide-up bg-[#111113]/50 border border-[#7C3AED]/20 rounded-2xl p-5 sm:p-6 mt-2">
			<h4 className="text-sm font-semibold text-[#8B5CF6] flex items-center gap-2 mb-5">
				<Repeat className="w-4 h-4" /> Configurar Frequência
			</h4>
			
			{/* Frequência Tabs */}
			<div className="flex bg-[#09090B] p-1 rounded-xl border border-white/[0.04] mb-6">
				{(['MONTHLY', 'BIWEEKLY', 'YEARLY'] as const).map(f => (
					<button
						key={f}
						type="button"
						onClick={() => setFrequency(f)}
						className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg capitalize transition-colors ${form.frequency === f ? 'bg-[#18181B] text-white shadow-sm border border-white/[0.04]' : 'text-zinc-500 hover:text-zinc-300'}`}
					>
						{f === 'MONTHLY' ? 'Mensal' : f === 'BIWEEKLY' ? 'Semanal' : 'Anual'}
					</button>
				))}
			</div>

			<div className="grid grid-cols-2 gap-4">
				{form.frequency === 'MONTHLY' && (
					<div className="col-span-2 sm:col-span-1">
						<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Dia do Mês</label>
						<input type="number" min="1" max="31" placeholder="Ex: 5" value={form.recDayOne} onChange={handleOnChange} className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all" />
					</div>
				)}

				{form.frequency === 'BIWEEKLY' && (
					<>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Primeiro Dia</label>
							<input type="number" min="1" max="31" placeholder="Ex: 5" value={form.recDayOne} onChange={handleOnChange} className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all" />
						</div>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Segundo Dia</label>
							<input type="number" min="1" max="31" placeholder="Ex: 20" value={form.recDayTwo} onChange={handleOnChange} className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all" />
						</div>
					</>
				)}

				{form.frequency === 'YEARLY' && (
					<>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Mês</label>
							<select value={form.month} onChange={handleOnChange} className="w-full appearance-none bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all">
								<option value="">Selecione</option>
								<option value="1">Janeiro</option><option value="2">Fevereiro</option><option value="12">Dezembro</option>
							</select>
						</div>
						<div className="col-span-1">
							<label className="text-[12px] font-medium text-zinc-400 block mb-2 pl-1">Dia</label>
							<input type="number" min="1" max="31" placeholder="Ex: 10" value={form.recDayOne} onChange={handleOnChange} className="w-full bg-[#09090B] border border-white/[0.04] rounded-xl py-3 px-4 text-sm text-zinc-200 outline-none focus:border-[#8B5CF6]/50 transition-all" />
						</div>
					</>
				)}
			</div>
		</div>
	)
}

interface FormTransactionProps {
	onClose: () => void
	setType: (type: TransactionModalType) => void;
	type: TransactionModalType;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	setFrequency: (freq: FrequencyType) => void;
	isRecurring: boolean;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
	categories: CategoryResponse[];
	wallets: WalletResponse[];
}

function FormTransaction({
	onClose,
	setType,
	type,
	form,
	handleOnChange,
	setFrequency,
	isRecurring,
	inputRef,
	themeHex,
	categories,
	wallets
}: FormTransactionProps) {
	return (
		<div className="flex-1 flex flex-col min-h-0">  
				{/* Header Fixo */}
				<div className="px-6 sm:px-8 pt-8 pb-6 flex-shrink-0 flex items-start justify-between bg-[#09090B] z-10">
					<div>
						<h2 className="text-2xl font-semibold text-white tracking-tight">Adicionar Movimentação</h2>
						<p className="text-sm font-light text-zinc-500 mt-1">Registre e categorize em poucos segundos.</p>
					</div>
					<button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:text-white hover:bg-white/[0.04] transition-colors">
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Conteúdo Central Scrollável: O scroll atua exclusivamente aqui */}
				<div className="flex-1 overflow-y-auto modal-scroll px-6 sm:px-8 pb-8 space-y-8 min-h-0 relative">
					<TypeSelection
						type={type}
						setType={setType}
					/>

					<Amount
						form={form}
						handleOnChange={handleOnChange}
						inputRef={inputRef}
						themeHex={themeHex}
						type={type}
					/>

					{/* Grid de Inputs Principais */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
						
						{/* Descrição */}
						<Description
							form={form}
							handleOnChange={handleOnChange}
							type={type}
						/>

						{/* Categorias */}
						<Select
							id="categoryId"
							name="categoryId"
							className={`w-full relative z-20 bg-[#111113] rounded-2xl py-3.5 pl-2 pr-10 text-left transition-all outline-none flex items-center`}
							onChange={handleOnChange}
							value={form.categoryId}
						>
							{categories.map((cat) => (
								<option value={cat.id}>{cat.name}</option>
							))}
						</Select>

						{/* Contas */}
						<Select
							id="walletId"
							name="walletId"
							className={`w-full relative z-20 bg-[#111113] hover:border-white/[0.08]' rounded-2xl py-3.5 pl-2 pr-10 text-left transition-all outline-none flex items-center`}
							onChange={handleOnChange}
							value={form.walletId}
						>
							{wallets.map((wallet) => (
								<option value={wallet.id}>{wallet.name}</option>
							))}
						</Select>

						{/* Data (Escondida se for recorrência genérica) */}
						{!isRecurring && (
							<RegisteredAt
								form={form}
								handleOnChange={handleOnChange}
							/>
						)}

						{/* === CAMPOS DINÂMICOS DE RECORRÊNCIA === */}
						{isRecurring && (
							<ConfigureRecurrence
								form={form}
								handleOnChange={handleOnChange}
								setFrequency={setFrequency}
							/>
						)}
					</div>
				</div>
			</div>
	)
}

export default FormTransaction;