import { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import type { TransactionType } from "../../../enums/TransactionType";
import { NEW_TRANSACTION_MODAL_CONFIG } from "../types/NewTransactionModalConfigs";
import Apresentation from "./Apresentation";
import Form from "./Form";
import { useAccountContext } from "../../../context/AccountContext";
import useNewTransaction from "../hooks/useNewTransaction";
import showToast from "../../../components/ui/Toast/Toast";

interface TransactionModalProps {
  open: boolean;
  type: TransactionType;
  onClose: () => void;
}

function NewTransactionModal({
  open,
  type,
  onClose,
}: TransactionModalProps) {
  const config = NEW_TRANSACTION_MODAL_CONFIG[type];

  const [shouldRender, setShouldRender] = useState(false);

  const { form, handleOnChange, setType, error, loading, registerTransaction } = useNewTransaction();

  const { account } = useAccountContext();

	useEffect(() => {
    if (error) {
      showToast({ title: 'Erro ao registrar', message: error, type: 'error' });
    }

		if (open) {
			setShouldRender(true);
		} else {
			const timer = setTimeout(() => {
				setShouldRender(false);
			}, 300);

			return () => clearTimeout(timer);
		}
	}, [open, error]);

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-[480px] bg-[#0F0F0F] border border-[#2A2A2A] rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden animate-(--animate-fade-in) max-h-[92vh] flex flex-col"
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
          }}
        />

        <Apresentation config={config} onClose={onClose} />

        <Form
          account={account}
          form={form}
          setType={setType}
          handleOnChange={handleOnChange}
          registerTransaction={registerTransaction}
          onClose={onClose}
          loading={loading}
          config={config}
          type={type}
        />
      </div>
    </div>,
    document.body
  );
}

export default NewTransactionModal;