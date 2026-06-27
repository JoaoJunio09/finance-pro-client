import { Calendar, ChevronDown, FileText, Tag, Wallet } from "lucide-react";
import { useEffect, useRef, type ChangeEvent } from "react";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import TextArea from "../../../components/ui/TextArea/TextArea";
import type { TransactionType } from "../../../enums/TransactionType";
import type { FormData } from "../types/FormData";
import { type NEW_TRANSACTION_MODAL_CONFIG_TYPE } from "../types/NewTransactionModalConfigs";
import type { AccountResponse } from "../../../models/account/AccountResponse";
import type { CategoryResponse } from "../../../models/category/CategoryResponse";

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] block mb-2 font-sans">
    {children}
  </label>
);

const inputCls =
  "w-full h-11 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-3.5 text-[14px] text-[#EDEDED] placeholder:text-[#52525B] font-sans outline-none transition-colors duration-150 focus:border-[#3F3F46] hover:border-[#3A3A3A]";

const selectCls = inputCls + " appearance-none pr-9 cursor-pointer";

interface FormProps {
  categories: CategoryResponse[],
  account: AccountResponse,
  form: FormData,
  setType: (type: TransactionType) => void,
  handleOnChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement, Element>) => void,
  registerTransaction: (e: ChangeEvent<Element, Element>) => Promise<void>,
  onClose: () => void,
  loading: boolean,
  config: NEW_TRANSACTION_MODAL_CONFIG_TYPE,
  type: TransactionType
}

function Form({
  categories,
  account,
  form,
  setType,
  handleOnChange,
  registerTransaction,
  onClose,
  loading,
  config,
  type
}: FormProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  const Icon = config.icon;

  useEffect(() => {
    if (type) {
      setType(type);
    }
  }, [type]);

  return (
    <div className="modal-scroll px-6 py-5 overflow-y-auto flex-1 space-y-5">
      <form onSubmit={registerTransaction} className="flex flex-col gap-3">
        <div>
          <FieldLabel>Valor</FieldLabel>
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-medium font-sans"
              style={{ color: config.color }}
            >
              R$
            </span>
            <Input
              id="amount"
              name="amount"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={form.amount}
              onChange={handleOnChange}
              config={config}
              className="w-full h-14 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pl-11 pr-4 text-[22px] font-semibold text-[#EDEDED] placeholder:text-[#3F3F46] font-money tabular-nums outline-none transition-colors duration-150 focus:border-[#3F3F46]"
            />
          </div>
        </div>

        <div>
          <FieldLabel>Descrição</FieldLabel>
          <div className="relative">
            <FileText
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
            />
            <Input
              id="description"
              name="description"
              value={form.description}
              onChange={handleOnChange}
              type="text"
              placeholder="Ex.: Supermercado, Salário..."
              className={inputCls + " pl-10"}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel>Categoria</FieldLabel>
            <div className="relative">
              <Tag
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
              />
              <Select
                id="categoryId"
                name="categoryId"
                value={form.categoryId}
                onChange={handleOnChange}
                className={selectCls + " pl-10"}
              >
                <option value="" disabled>
                  Selecionar
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <ChevronDown
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
              />
            </div>
          </div>
          <div>
            <FieldLabel>Data</FieldLabel>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                dateInputRef.current?.showPicker?.();
                dateInputRef.current?.focus();
              }}
            >
              <Calendar
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
              />
              <Input
                ref={dateInputRef}
                id="registeredAt"
                name="registeredAt"
                value={form.registeredAt}
                onChange={handleOnChange}
                type="datetime-local"
                className={inputCls + " pl-10"}
              />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Carteira</FieldLabel>
          <div className="relative">
            <Wallet
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
            />
            <Select
              id="walletId"
              name="walletId"
              value={form.walletId}
              onChange={handleOnChange}
              className={selectCls + " pl-10"}
            >
              <option value="" disabled>
                Selecionar carteira
              </option>
              {account.wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>
                  {wallet.name}
                </option>
              ))}
            </Select>
            <ChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
            />
          </div>
        </div>

        <div>
          <FieldLabel>Observação (opcional)</FieldLabel>
          <TextArea
            id="observation"
            name="observation"
            value={form.observation}
            onChange={handleOnChange}
            placeholder="Adicione uma nota..."
            rows={2}
            className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-[14px] text-[#EDEDED] placeholder:text-[#52525B] font-sans outline-none transition-colors duration-150 focus:border-[#3F3F46] hover:border-[#3A3A3A] resize-none"
          />
        </div>

        <div className="pt-5 border-t border-[#1F1F1F] flex items-center gap-2.5 bg-[#0C0C0C] bg-transparent">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-[13px] font-semibold font-sans text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-colors duration-150 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold font-sans flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer border"
            style={{
              backgroundColor: `${config.color}18`,
              color: config.color,
              borderColor: `${config.color}40`,
            }}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <>
                <Icon size={14} />
                {config.cta}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form;