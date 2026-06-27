import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface NEW_TRANSACTION_MODAL_CONFIG_TYPE {
  label: string,
  subtitle: string
  color: string,
  icon:  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  cta: string
}

export const NEW_TRANSACTION_MODAL_CONFIG = {
  CREDIT: {
    label: "Nova Receita",
    subtitle: "Registre uma entrada de dinheiro",
    color: "#4ADE80",
    icon: ArrowDownLeft,
    cta: "Adicionar Receita",
  },
  DEBIT: {
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