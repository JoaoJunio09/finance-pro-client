import { WalletCards, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { TransactionType } from "../../../types/TransactionType";
import useDialogFocus from "../../../hooks/useDialogFocus";

interface WalletPrerequisiteProps {
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onClose: () => void;
  type: TransactionType;
}

export default function WalletPrerequisite({
  isLoading,
  isError,
  onRetry,
  onClose,
  type,
}: WalletPrerequisiteProps) {
  const dialogRef = useDialogFocus(true, onClose);
  const nextAction = type === "CREDIT" ? "receita" : "despesa";
  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-prerequisite-title"
    >
      <section className="relative w-full max-w-lg rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-7 shadow-xl animate-scale-in">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-lg p-2 text-[var(--text-muted)]"
          aria-label="Fechar registro"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="mb-6 inline-flex rounded-2xl bg-[var(--accent-muted)] p-4 text-[var(--accent)]">
          <WalletCards size={28} aria-hidden="true" />
        </span>
        <h2
          id="wallet-prerequisite-title"
          className="text-2xl font-bold tracking-tight"
        >
          {isLoading
            ? "Buscando suas carteiras…"
            : isError
            ? "Não conseguimos carregar suas carteiras"
            : "Vamos criar sua primeira carteira?"}
        </h2>
        {!isLoading && (
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
            {isError
              ? "Tente novamente para escolher onde registrar esse valor."
              : "Pode ser uma conta, cartão ou dinheiro físico. Depois de criar, você continua o registro da sua " +
                nextAction +
                "."}
          </p>
        )}
        {isLoading ? (
          <p role="status" className="mt-5 text-sm text-[var(--text-muted)]">
            Aguarde um instante.
          </p>
        ) : isError ? (
          <button
            type="button"
            className="mt-6 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white"
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        ) : (
          <Link
            to={`/carteiras?nova=1&retorno=${nextAction}`}
            onClick={onClose}
            className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white"
          >
            Criar minha carteira
          </Link>
        )}
      </section>
    </div>
  );
}
