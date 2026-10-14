import {
  ArrowLeftRight,
  BarChart3,
  ChartNoAxesCombined,
  Repeat2,
  TrendingUp,
  WalletCards,
  BookOpen,
  Target,
} from "lucide-react";
import type { FlowOption } from "../../components/shared/FlowCards/types";
export type { FlowOption } from "../../components/shared/FlowCards/types";

export const PRIMARY_DESTINATIONS: FlowOption[] = [
  {
    title: "Ver Vida Financeira",
    description: "Escolha o que acompanhar hoje",
    path: "/vida-financeira",
    icon: ChartNoAxesCombined,
    tone: "violet",
  },
  {
    title: "Investimentos",
    description: "Um novo espaço para seus investimentos",
    path: "/investimentos",
    icon: TrendingUp,
    tone: "blue",
    comingSoon: true,
  },
  {
    title: "Educação Financeira",
    description: "Um espaço para aprender sobre seu dinheiro",
    path: "/educacao-financeira",
    icon: BookOpen,
    tone: "green",
    comingSoon: true,
  },
];

export const FINANCIAL_CHOICES: FlowOption[] = [
  {
    title: "Transações",
    description: "Receitas e despesas, gráfico e calendário",
    path: "/vida-financeira/transacoes",
    icon: ArrowLeftRight,
    tone: "orange",
  },
  {
    title: "Recorrências",
    description: "Acompanhe o que se repete na sua rotina",
    path: "/vida-financeira/recorrencias",
    icon: Repeat2,
    tone: "violet",
  },
  {
    title: "Carteiras / Cartões de Crédito",
    description: "Contas, cartões, faturas e reservas",
    path: "/carteiras",
    icon: WalletCards,
    tone: "blue",
  },
  {
    title: "Análise das minhas finanças",
    description: "Entenda os números e suas escolhas",
    path: "/vida-financeira/analises",
    icon: BarChart3,
    tone: "green",
  },
  {
    title: "Metas",
    description: "Veja quanto falta para seus objetivos",
    path: "/vida-financeira/metas",
    icon: Target,
    tone: "pink",
  },
];

export function isFinancialLifePath(path: string) {
  return (
    path.startsWith("/vida-financeira") ||
    [
      "/carteiras",
      "/metas",
      "/transacoes",
      "/recorrencias",
      "/analises",
      "/atividades",
    ].includes(path)
  );
}