import {
  CalendarDays,
  Compass,
  Scale,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";
import type { QuizDimension } from "../types/quiz";

export const dimensionMeta: Record<
  QuizDimension,
  { label: string; description: string; icon: typeof ShieldCheck }
> = {
  "Segurança financeira": {
    label: "Segurança",
    description: "Como o presente cabe no seu mês.",
    icon: ShieldCheck,
  },
  Resiliência: {
    label: "Resiliência",
    description: "Como você atravessa os imprevistos.",
    icon: WalletCards,
  },
  "Organização e controle": {
    label: "Organização",
    description: "Como você acompanha e conduz suas escolhas.",
    icon: Target,
  },
  "Regulação de impulsos": {
    label: "Decisões",
    description: "O espaço entre a vontade e a escolha.",
    icon: Compass,
  },
  "Orientação para o futuro": {
    label: "Futuro",
    description: "Como seus planos participam do presente.",
    icon: CalendarDays,
  },
  "Equilíbrio e liberdade": {
    label: "Equilíbrio",
    description: "Como dinheiro e qualidade de vida convivem.",
    icon: Scale,
  },
};

export const dimensions = Object.entries(dimensionMeta);
