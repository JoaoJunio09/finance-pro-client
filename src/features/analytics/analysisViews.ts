import {
  ChartNoAxesCombined,
  FileText,
  HeartPulse,
  PieChart,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type AnalysisViewId =
  | "categorias"
  | "receitas"
  | "saude"
  | "evolucao"
  | "relatorios";

export interface AnalysisView {
  id: AnalysisViewId;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "orange" | "green" | "pink" | "blue" | "violet";
}

export const ANALYSIS_VIEWS: AnalysisView[] = [
  {
    id: "categorias",
    label: "Despesas por categoria",
    title: "Para onde meu dinheiro está indo?",
    description: "Veja a distribuição das despesas por categoria.",
    icon: PieChart,
    tone: "orange",
  },
  {
    id: "receitas",
    label: "Maiores receitas",
    title: "Maiores receitas",
    description: "Compare as receitas recebidas neste mês.",
    icon: TrendingUp,
    tone: "green",
  },
  {
    id: "saude",
    label: "Saúde financeira",
    title: "Saúde financeira",
    description: "Conheça o medidor e os indicadores de saúde financeira.",
    icon: HeartPulse,
    tone: "pink",
  },
  {
    id: "evolucao",
    label: "Evolução do saldo",
    title: "Evolução do saldo",
    description: "Acompanhe as mudanças do seu saldo ao longo do mês.",
    icon: ChartNoAxesCombined,
    tone: "blue",
  },
  {
    id: "relatorios",
    label: "Relatórios",
    title: "Relatórios",
    description: "Consulte e exporte os registros da sua conta.",
    icon: FileText,
    tone: "violet",
  },
];

export function analysisPath(id: AnalysisViewId) {
  return `/vida-financeira/analises?visao=${id}`;
}