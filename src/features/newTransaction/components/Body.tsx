import { AlignLeft, CalendarDays, ChevronDown, Tag, Wallet } from "lucide-react";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import TextArea from "../../../components/ui/TextArea/TextArea";
import type { FormData } from "../types/FormData";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";


interface BodyProps {
	form: FormData,
	categories: CategoryResponse[],
	wallets: WalletResponse[],
	isIncome: boolean,
	colorBase: "emerald" | "rose",
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

function Body({
	form,
	categories,
	wallets,
	isIncome,
	colorBase,
	handleOnChange
}: BodyProps) {
	return (
		<div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-8">    
			{/* Campo Valor (Destaque Máximo) */}
			<div className="flex flex-col items-center justify-center py-4">
				<span className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-3">
					Valor da {isIncome ? 'Receita' : 'Despesa'}
				</span>
				<div className="flex items-center justify-center gap-2 group">
					<span className={`text-3xl sm:text-4xl font-semibold text-${colorBase}-500 transition-colors`}>R$</span>
					<Input
						id="amount"
						name="amount"
						type="text"
						placeholder="0,00"
						value={form.amount}
						onChange={handleOnChange}
						className={`bg-transparent text-5xl sm:text-7xl font-bold text-white w-full max-w-[320px] text-center outline-none placeholder-zinc-800 tracking-tighter`}
					/>
				</div>
			</div>

			{/* Grid de Inputs */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				
				{/* Linha 1: Descrição (Ocupa 2 colunas) */}
				<div className="md:col-span-2">
					<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Descrição</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<AlignLeft className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
						</div>
						<Input
							id="description"
							name="description"
							type="text"
							placeholder={isIncome ? "Ex.: Salário de Junho" : "Ex.: Mercado Nacional"}
							value={form.description}
							onChange={handleOnChange}
							className={`w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-4 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:border-${colorBase}-500/40 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none`}
						/>
					</div>
				</div>

				{/* Linha 2: Categoria e Data */}
				<div>
					<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Categoria</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Tag className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
						</div>
						<Select
							id="categoryId"
							name="categoryId"
							value={form.categoryId}
							onChange={handleOnChange}
							className={`w-full appearance-none bg-[#111113] border border-white/[0.04] rounded-2xl py-4 pl-12 pr-10 text-sm text-zinc-100 outline-none hover:border-white/[0.08] focus:border-${colorBase}-500/40 focus:bg-[#151518] transition-all cursor-pointer`}
						>
							{categories.map((category) => (
								<option value={category.id}>{category.name}</option>
							))}
						</Select>
						<div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
							<ChevronDown className="h-4 w-4 text-zinc-500" />
						</div>
					</div>
				</div>

				<div>
					<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Data</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<CalendarDays className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
						</div>
						<Input
							id="registeredAt"
							name="registeredAt"
							type="datetime-local"
							placeholder={isIncome ? "Ex.: Salário de Junho" : "Ex.: Mercado Nacional"}
							value={form.registeredAt}
							onChange={handleOnChange}
							className={`w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-4 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-600 focus:border-${colorBase}-500/40 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none style-color-scheme-dark`}
							style={{ colorScheme: 'dark' }}
						/>
					</div>
				</div>

				{/* Linha 3: Conta (Ocupa 2 colunas) */}
				<div className="md:col-span-2">
					<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Conta ou Carteira</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Wallet className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
						</div>
						<Select
							id="walletId"
							name="walletId"
							value={form.walletId}
							onChange={handleOnChange}
							className={`w-full appearance-none bg-[#111113] border border-white/[0.04] rounded-2xl py-4 pl-12 pr-10 text-sm text-zinc-100 outline-none hover:border-white/[0.08] focus:border-${colorBase}-500/40 focus:bg-[#151518] transition-all cursor-pointer`}
						>
							<option value="" disabled selected>Selecione a carteira</option>
							{wallets.map((wallet) => (
								<option value={wallet.id}>{wallet.name}</option>
							))}
						</Select>
						<div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
							<ChevronDown className="h-4 w-4 text-zinc-500" />
						</div>
					</div>
				</div>

				{/* Linha 4: Observações */}
				<div className="md:col-span-2 pt-2">
					<label className="text-[13px] font-medium text-zinc-400 block mb-2 pl-1">Observações (Opcional)</label>
					<TextArea
						id="observation"
						name="observation"
						value={form.observation}
						onChange={handleOnChange}
						rows={3}
						placeholder="Adicione notas, tags ou informações complementares..."
						className={`w-full bg-[#111113] border border-white/[0.04] rounded-2xl py-4 px-5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-${colorBase}-500/40 focus:bg-[#151518] hover:border-white/[0.08] transition-all outline-none resize-none`}
					/>
				</div>
			</div>
		</div>
	)
}

export default Body;