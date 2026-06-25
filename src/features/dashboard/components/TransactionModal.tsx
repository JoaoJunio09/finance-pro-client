import { useEffect, useState } from "react";
import { createPortal } from 'react-dom'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Calendar,
  FileText,
  Tag,
  Wallet,
  X,
  Repeat,
  ChevronDown,
} from "lucide-react";

export type TransactionType = "income" | "expense" | "transfer";

interface TransactionModalProps {
  open: boolean;
  type: TransactionType;
  onClose: () => void;
}

const TYPE_CONFIG = {
  income: {
    label: "Nova Receita",
    subtitle: "Registre uma entrada de dinheiro",
    color: "#4ADE80",
    icon: ArrowDownLeft,
    cta: "Adicionar Receita",
  },
  expense: {
    label: "Nova Despesa",
    subtitle: "Registre uma saída de dinheiro",
    color: "#F87171",
    icon: ArrowUpRight,
    cta: "Adicionar Despesa",
  },
  transfer: {
    label: "Nova Movimentação",
    subtitle: "Transfira entre carteiras",
    color: "#A78BFA",
    icon: ArrowLeftRight,
    cta: "Confirmar Movimentação",
  },
} as const;

const MOCK_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Tecnologia",
  "Salário",
  "Investimentos",
];

const MOCK_WALLETS = ["Conta Corrente", "Reserva de Emergência", "Moto"];

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.08em] block mb-2 font-sans">
    {children}
  </label>
);

const inputCls =
  "w-full h-11 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-3.5 text-[14px] text-[#EDEDED] placeholder:text-[#52525B] font-sans outline-none transition-colors duration-150 focus:border-[#3F3F46] hover:border-[#3A3A3A]";

const selectCls = inputCls + " appearance-none pr-9 cursor-pointer";

function TransactionModal({
  open,
  type,
  onClose,
}: TransactionModalProps) {
  const cfg = TYPE_CONFIG[type];
  const Icon = cfg.icon;
  const isTransfer = type === "transfer";

  const [amount, setAmount] = useState("");

  const [shouldRender, setShouldRender] = useState(false);

	useEffect(() => {
		if (open) {
			setShouldRender(true);
		} else {
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [open]);

	if (!shouldRender) return null;

  return createPortal(
    <div
			className={`
				fixed inset-0 z-50 flex items-center justify-center
				transition-opacity duration-300 ease-out
				${open ? "opacity-100" : "opacity-0"}
			`}
    	onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-[480px] bg-[#0F0F0F] border border-[#2A2A2A] rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden animate-(--animate-fade-in) max-h-[92vh] flex flex-col"
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${cfg.color}14`,
                color: cfg.color,
                boxShadow: `inset 0 0 0 1px ${cfg.color}30`,
              }}
            >
              <Icon size={18} />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#EDEDED] tracking-tight font-sans leading-tight">
                {cfg.label}
              </h2>
              <p className="text-[12px] text-[#71717A] mt-0.5 font-sans">
                {cfg.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-colors duration-150 cursor-pointer"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-scroll px-6 py-5 overflow-y-auto flex-1 space-y-5">
          {/* Valor — destaque */}
          <div>
            <FieldLabel>Valor</FieldLabel>
            <div className="relative">
              <span
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-medium font-sans"
                style={{ color: cfg.color }}
              >
                R$
              </span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-14 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl pl-11 pr-4 text-[22px] font-semibold text-[#EDEDED] placeholder:text-[#3F3F46] font-money tabular-nums outline-none transition-colors duration-150 focus:border-[#3F3F46]"
                style={{
                  caretColor: cfg.color,
                }}
              />
            </div>
          </div>

          {!isTransfer && (
            <div>
              <FieldLabel>Descrição</FieldLabel>
              <div className="relative">
                <FileText
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Ex.: Supermercado, Salário..."
                  className={inputCls + " pl-10"}
                />
              </div>
            </div>
          )}

          {!isTransfer && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Categoria</FieldLabel>
                <div className="relative">
                  <Tag
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                  />
                  <select className={selectCls + " pl-10"} defaultValue="">
                    <option value="" disabled>
                      Selecionar
                    </option>
                    {MOCK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Data</FieldLabel>
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                  />
                  <input type="date" className={inputCls + " pl-10"} />
                </div>
              </div>
            </div>
          )}

          {!isTransfer && (
            <div>
              <FieldLabel>Carteira</FieldLabel>
              <div className="relative">
                <Wallet
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                />
                <select className={selectCls + " pl-10"} defaultValue="">
                  <option value="" disabled>
                    Selecionar carteira
                  </option>
                  {MOCK_WALLETS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                />
              </div>
            </div>
          )}

          {isTransfer && (
            <>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <FieldLabel>De (Origem)</FieldLabel>
                  <div className="relative">
                    <Wallet
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                    />
                    <select className={selectCls + " pl-10"} defaultValue="">
                      <option value="" disabled>
                        Carteira de origem
                      </option>
                      {MOCK_WALLETS.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center -my-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${cfg.color}14`,
                      color: cfg.color,
                    }}
                  >
                    <Repeat size={14} />
                  </div>
                </div>

                <div>
                  <FieldLabel>Para (Destino)</FieldLabel>
                  <div className="relative">
                    <Wallet
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                    />
                    <select className={selectCls + " pl-10"} defaultValue="">
                      <option value="" disabled>
                        Carteira de destino
                      </option>
                      {MOCK_WALLETS.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel>Data</FieldLabel>
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52525B] pointer-events-none"
                  />
                  <input type="date" className={inputCls + " pl-10"} />
                </div>
              </div>
            </>
          )}

          <div>
            <FieldLabel>Observação (opcional)</FieldLabel>
            <textarea
              placeholder="Adicione uma nota..."
              rows={2}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl px-3.5 py-2.5 text-[14px] text-[#EDEDED] placeholder:text-[#52525B] font-sans outline-none transition-colors duration-150 focus:border-[#3F3F46] hover:border-[#3A3A3A] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1F1F1F] flex items-center gap-2.5 bg-[#0C0C0C]">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-[13px] font-semibold font-sans text-[#A1A1AA] hover:text-[#EDEDED] hover:bg-[#1A1A1A] transition-colors duration-150 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold font-sans flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer border"
            style={{
              backgroundColor: `${cfg.color}18`,
              color: cfg.color,
              borderColor: `${cfg.color}40`,
            }}
          >
            <Icon size={14} />
            {cfg.cta}
          </button>
        </div>
      </div>

      <style>{`
        
      `}</style>
    </div>,
    document.body
  );
}

export default TransactionModal;