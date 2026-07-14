import { CheckCircle2, Wallet } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { useEffect, useRef } from "react";
import type { RecurrenceResponse } from "../../../models/recurrence/RecurrenceResponse";
import type { RecurrenceType } from "../../../types/RecurrenceType";
import { formatCurrencyInput } from "../../../utils/FormatCurrency";
import useRecurrenceModal from "../hooks/useRecurrenceModal";
import RecurrenceForm from "./RecurrenceForm";

interface RecurrenceModalProps {
	isOpen: boolean;
	onClose: () => void;
	type: RecurrenceType | null,
	recurrence: RecurrenceResponse | null;
}

function RecurrenceModal({ isOpen, onClose, type, recurrence }: RecurrenceModalProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
    form,
		saveOrUpdate,
    handleOnChange,
		setType,
		setFrequencyType,
    setExecutionType,
    setAlreadyOccurred,
    categories,
    wallets,
    inputsError,
    clearErrors,
    resetForm
  } = useRecurrenceModal(onClose, recurrence);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}

		if (type) setType(type);
	}, [isOpen, type]);

	if (!isOpen) return null;

  const themeHex = 'text-[#8B5CF6]';

  const selectedCategory = categories.find(c => c.id === form.categoryId);
  const selectedWallet = wallets.find(w => w.id === form.walletId);

	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto animate-overlay bg-black/70 px-0 sm:px-6">
      <div className="fixed inset-0 min-h-full" onClick={onClose} />
      
      <div className="flex-grow hidden sm:block pointer-events-none min-h-[2rem]" />
      <div className="flex-grow sm:hidden pointer-events-none" />
      
      <div className="relative w-full sm:max-w-5xl bg-[#09090B] sm:border border-white/[0.06] rounded-t-[32px] sm:rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row animate-bottom-sheet sm:animate-modal h-[95vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex-shrink-0 z-10 min-h-0">
        <RecurrenceForm
          form={form}
          handleOnChange={handleOnChange}
          inputRef={inputRef}
          onClose={onClose}
					setFrequency={setFrequencyType}
          setRecurrenceType={setType}
          setExecutionType={setExecutionType}
          setAlreadyOccurred={setAlreadyOccurred}
          themeHex={themeHex}
          inputsError={inputsError}
          clearErrors={clearErrors}       
          resetForm={resetForm}
          categories={categories}
          wallets={wallets}
        />

        <div className="w-full sm:w-[340px] bg-[#111113] border-t sm:border-t-0 sm:border-l border-white/[0.04] flex flex-col shrink-0 z-20 min-h-0">    
          {/* Live Preview Moderno (Scrollável separadamente se a tela do usuário for muito pequena) */}
          <div className="hidden sm:flex flex-col flex-1 p-6 sm:p-8 overflow-y-auto modal-scroll min-h-0">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B5CF6]" /> Resumo da Operação
            </h3>
            
            <div className="bg-[#09090B] border border-white/[0.04] rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.04]">
                <span className="text-sm font-medium text-zinc-400">Tipo</span>
                <span className={`text-sm font-bold uppercase tracking-wider ${themeHex}`}>
                  {form.type === 'CREDIT' ? 'Receita' : form.type === 'DEBIT' ? 'Despesa' : 'Recorrência'}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">Valor</span>
                  <span className="text-xl font-bold text-white tracking-tight">
                    {formatCurrencyInput(form.amount || '0')}
                  </span>
                </div>
                
                <div>
                  <span className="text-xs text-zinc-500 block mb-1">Descrição</span>
                  <span className={`text-sm font-medium ${form.description ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
                    {form.description || 'Não informada'}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1">Categoria</span>
                    {form.categoryId ? (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                        <div className={`w-4 h-4 rounded flex items-center justify-center text-white`}>
                          {selectedCategory ? (
                            <DynamicIcon name={selectedCategory?.icon as IconName} className="w-2.5 h-2.5" />
                          ) : (
                            <Wallet className="w-2.5 h-2.5" />
                          )}
                        </div>
                        <span className="truncate">{selectedCategory?.name}</span>
                      </div>
                    ) : <span className="text-xs text-zinc-600">-</span>}
                  </div>
                  
                  <div className="flex-1">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1">Conta</span>
                    {selectedWallet ? (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                        {selectedWallet.bank?.icon && selectedWallet.bank.color ? (
                          <DynamicIcon name={selectedWallet.bank.icon as IconName} size={16} color={selectedWallet.bank.color} />
                        ) : (
                          <Wallet size={16} color="#8B5CF6" />
                        )}
                        <span className="truncate">{selectedWallet.name}</span>
                      </div>
                    ) : <span className="text-xs text-zinc-600">-</span>}
                  </div>
                </div>
                
                
								<div className="pt-2">
									<span className="text-[10px] uppercase text-[#8B5CF6] block mb-1">Frequência Automática</span>
									<span className="text-xs font-medium text-zinc-300 capitalize">
										{form.type} • {form.type === 'CREDIT' ? 'Receita' : 'Despesa'}
									</span>
								</div>
                
              </div>
            </div>
          </div>

          {/* Footer Fixo: Ações mantidas firmes na base do Modal */}
          <div className="flex flex-col gap-3 p-6 sm:p-8 pt-6 sm:pt-0 shrink-0 bg-[#09090B] sm:bg-[#111113] border-t border-white/[0.04] sm:border-t-0">
            <button
              onClick={saveOrUpdate}
              className={`
								cursor-pointer w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-xl active:scale-[0.98]
                bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-[#8B5CF6]/20
              `}
            >
              {false ? (
                'Salvando...'
              ) : (
                `Salvar Recorrência`
              )}
              
            </button>
            <button 
              onClick={() => {
                clearErrors();
                resetForm();
                onClose();
              }}
              className="cursor-pointer w-full py-4 rounded-xl bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
		    </div>
      </div>
      
      <div className="flex-grow hidden sm:block pointer-events-none min-h-[2rem]" />
    </div>
	)
}

export default RecurrenceModal;