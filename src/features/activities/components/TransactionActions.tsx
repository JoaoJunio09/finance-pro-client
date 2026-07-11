import { SquarePen, Trash2 } from "lucide-react";
import type { TransactionResponse } from "../../../models/transaction/TransactionResponse";

export interface TransactionAction {
	transaction: TransactionResponse;
	onEdit: (transaction: TransactionResponse) => void;
	onRemove: (transaction: TransactionResponse) => void;
}

function TransactionAction({
	transaction,
	onEdit,
	onRemove
}: TransactionAction) {
	return (
		<div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-1.5 opacity-100 sm:opacity-65 group-hover:opacity-100 transition-opacity duration-200">
			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onEdit(transaction);
				}}
				className="cursor-pointer w-10 h-10 sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-[10px] sm:rounded-xl bg-white/[0.02] border border-white/[0.05] text-zinc-400 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/25 hover:text-[#8B5CF6] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:scale-[1.03] active:scale-[0.96] outline-none"
				title="Editar transação"
			>
				<SquarePen className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
			</button>

			<button
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onRemove(transaction);
				}}
				className="cursor-pointer w-10 h-10 sm:w-[36px] sm:h-[36px] flex items-center justify-center rounded-[10px] sm:rounded-xl bg-white/[0.02] border border-white/[0.05] text-zinc-400 hover:bg-[#FB7185]/10 hover:border-[#FB7185]/25 hover:text-[#FB7185] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] hover:scale-[1.03] active:scale-[0.96] outline-none"
				title="Excluir transação"
			>
				<Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
			</button>
		</div>
	)
}

export default TransactionAction;