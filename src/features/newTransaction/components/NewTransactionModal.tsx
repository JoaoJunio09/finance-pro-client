import { useEffect } from "react";
import { useAccountContext } from "../../../context/AccountContext";
import type { TransactionType } from "../../../types/TransactionType";
import useNewTransaction from "../hooks/useNewTransaction";
import Body from "./Body";
import FooterActions from "./FooterActions";
import Header from "./Header";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
}

function TransactionModal({
  isOpen,
  onClose,
  type
}: TransactionModalProps) {
  const { account } = useAccountContext();
  const { form, handleOnChange, categories, registerTransaction, loading, setType } = useNewTransaction(onClose);

  const isIncome = type === 'CREDIT';
  const colorBase = isIncome ? 'emerald' : 'rose';

  // Reseta o estado quando o modal fecha/abre
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {}, 300); // Aguarda a animação de saída (se houvesse)
    }

    setType(isIncome ? 'CREDIT' : 'DEBIT');
  }, [isOpen, isIncome]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-overlay bg-black/70">
      
      {/* Background clicável para fechar */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Container Principal do Modal */}
      <div className="relative w-full max-w-[680px] bg-[#09090B] border border-white/[0.06] rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col animate-modal max-h-[80vh]">
        <Header
          isIncome={isIncome}
          colorBase={colorBase}
          onClose={onClose}
        />

        <Body
          form={form}
          categories={categories}
          wallets={account.wallets}
          colorBase={colorBase}
          handleOnChange={handleOnChange}
          isIncome={isIncome}
        />

        <FooterActions
          isIncome={isIncome}
          onClose={onClose}
          onSave={registerTransaction}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default TransactionModal;