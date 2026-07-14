import { AlignLeft, CalendarDays, X } from "lucide-react";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import type { TransactionType } from "../../../types/TransactionType";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import type { FormData } from "../types/FormData";

interface TypeSelectionProps {
	type: TransactionType;
	setType: (type: TransactionType) => void;
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
			{/* <button
				type="button"
				onClick={() => setType('RECURRING')}
				className={`flex-1 py-3 text-sm font-semibold rounded-xl z-10 transition-all duration-300 ${type === 'RECURRING' ? 'text-[#8B5CF6] shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
			>
				Recorrência
			</button> */}
			
			<div 
				className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] rounded-xl bg-[#18181B] border border-white/[0.04] transition-transform duration-300 ease-out z-0"
				style={{ transform: `translateX(${type === 'CREDIT' ? '0%' : type === 'DEBIT' ? '100%' : '200%'})` }}
			/>
		</div>
	)
}

interface AmountProps {
	type: TransactionType;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
	inputsError: Record<string, string>;
}

const Amount = ({
	type,
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
					{type === 'DEBIT' ? '-' : type === 'CREDIT' ? '+' : ''}R$
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
	type: TransactionType;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputsError: Record<string, string>;
}

const Description = ({
	form,
	handleOnChange,
	type,
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
					placeholder={type === 'CREDIT' ? "Ex.: Salário" : "Ex.: Mercado"}
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

interface CategoriesProps {
	form: FormData;
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
						<option value={cat.id}>{cat.name}</option>
					))}
				</Select>
			</div>
			{inputsError.category && <span className="text-xs text-red-600 ml-2">{inputsError.category}</span>}
		</div>
	)
}

interface WalletsProps {
	form: FormData;
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
						<option value={wallet.id}>{wallet.name}</option>
					))}
				</Select>
			</div>
			{inputsError.wallet && <span className="text-xs text-red-600 ml-2">{inputsError.wallet}</span>}
		</div>
	)
}

interface RegisteredAtProps {
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputsError: Record<string, string>;
}

const RegisteredAt = ({
	form,
	handleOnChange,
	inputsError
}: RegisteredAtProps) => {
	return (
		<div className="pt-3">
			<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Data da Transação</label>
			<div className="relative group">
				<CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
				<Input
					id="registeredAt"
					name="registeredAt"
					type="datetime-local"
					value={form.registeredAt}
					onChange={handleOnChange}
					className={`
						w-full bg-[#111113] border rounded-2xl py-3.5 pl-12 pr-4 text-sm text-zinc-100 font-medium placeholder-zinc-600 focus:border-[#8B5CF6]/50 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none shadow-sm focus:shadow-[0_0_0_2px_rgba(139,92,246,0.1)] style-color-scheme-dark
						${inputsError.registeredAt ? 'border-red-800' : 'border-white/[0.04]'}
					`}
					style={{ colorScheme: 'dark' }}
				/>
			</div>
			{inputsError.registeredAt && <span className="text-xs text-red-600 ml-2">{inputsError.registeredAt}</span>}
		</div>
	)
}

interface FormTransactionProps {
	onClose: () => void
	setType: (type: TransactionType) => void;
	form: FormData;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
	inputRef: React.RefObject<HTMLInputElement | null>;
	themeHex: "text-rose-400" | "text-emerald-400" | "text-[#8B5CF6]";
	inputsError: Record<string, string>;
	clearErrors: () => void,
	resetForm: () => void,
	categories: CategoryResponse[];
	wallets: WalletResponse[];
}

function FormTransaction({
	onClose,
	setType,
	form,
	handleOnChange,
	inputRef,
	themeHex,
	inputsError,
	clearErrors,
	resetForm,
	categories,
	wallets
}: FormTransactionProps) {
	return (
		<div className="flex-1 flex flex-col min-h-0">  
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

			<div className="flex-1 overflow-y-auto modal-scroll px-6 sm:px-8 pb-8 space-y-8 min-h-0 relative">
				<TypeSelection
					type={form.type}
					setType={setType}
				/>

				<Amount
					form={form}
					handleOnChange={handleOnChange}
					inputRef={inputRef}
					themeHex={themeHex}
					type={form.type}
					inputsError={inputsError}
				/>

				<div className="sm:grid-cols-2 gap-5 sm:gap-6">	
					<Description
						form={form}
						handleOnChange={handleOnChange}
						type={form.type}
						inputsError={inputsError}
					/>

					<RegisteredAt
						form={form}
						handleOnChange={handleOnChange}
						inputsError={inputsError}
					/>

					<div className="w-full flex justify-between gap-2 pt-3 pb-3">
						<Categories
							form={form}
							handleOnChange={handleOnChange}
							categories={categories}
							inputsError={inputsError}
						/>

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

export default FormTransaction;