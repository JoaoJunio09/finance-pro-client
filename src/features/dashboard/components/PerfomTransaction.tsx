import { Minus, Plus } from "lucide-react";
import type { TransactionType } from "../../../types/TransactionType";

interface PerfomTransactionProps {
  setOpenModal: (isOpen: boolean) => void,
  setType: (type: TransactionType) => void,
}

function PerfomTransaction({
  setOpenModal,
  setType,
}: PerfomTransactionProps) {
	return (
		<div className="animate-slide-up delay-200 min-w-0">
      <h3 className="text-zinc-600 text-xs sm:text-sm lg:text-base uppercase tracking-[0.15em] font-semibold mb-5 lg:mb-8">
        O que aconteceu agora?
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full min-w-0">
        {/* Adicionar Receita */}
        <button
          onClick={() => {
            setOpenModal(true);
            setType('CREDIT');
          }}
          className="cursor-pointer flex-1 min-w-0 relative overflow-hidden border border-emerald-500/20 p-5 lg:p-7 rounded-[24px] lg:rounded-[32px] flex items-center justify-between group transition-all duration-300 bg-gradient-to-br from-emerald-500/[0.10] via-[#111113] to-[#111113] hover:border-emerald-500/40 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.25)] active:scale-[0.98]"
        >
          <span className="font-medium text-base md:text-lg lg:text-xl tracking-wide text-zinc-200 group-hover:text-white transition-colors truncate pr-3">
            Adicionar Receita
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white bg-emerald-500 shadow-[0_0_24px_-4px_rgba(16,185,129,0.55)] transition-all duration-500 group-hover:scale-110">
            <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
        </button>

        {/* Adicionar Despesa */}
        <button
          onClick={() => {
            setOpenModal(true);
            setType('DEBIT');
          }}
          className="cursor-pointer flex-1 min-w-0 relative overflow-hidden border border-rose-500/20 p-5 lg:p-7 rounded-[24px] lg:rounded-[32px] flex items-center justify-between group transition-all duration-300 bg-gradient-to-br from-rose-500/[0.10] via-[#111113] to-[#111113] hover:border-rose-500/40 hover:shadow-[0_10px_40px_-10px_rgba(244,63,94,0.25)] active:scale-[0.98]"
        >
          <span className="font-medium text-base md:text-lg lg:text-xl tracking-wide text-zinc-200 group-hover:text-white transition-colors truncate pr-3">
            Adicionar Despesa
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex-shrink-0 bg-rose-500 flex items-center justify-center text-white shadow-[0_0_24px_-4px_rgba(244,63,94,0.55)] transition-all duration-500 group-hover:rotate-90 group-hover:scale-110">
            <Minus className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
        </button>
      </div>
    </div>
	)
}

export default PerfomTransaction;