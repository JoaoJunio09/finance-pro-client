import {
  Activity,
  BarChart3,
  CreditCard,
  FileText,
  RefreshCw,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface MoreOption {
  label: string;
  detail: string;
  path: string;
  icon: LucideIcon;
  tone: "orange" | "violet" | "green" | "blue" | "amber" | "pink" | "slate";
}

export const MORE_OPTION_GROUPS: { title: string; items: MoreOption[] }[] = [
  {
    title: "Organize sua rotina",
    items: [
      {
        label: "Transações",
        detail: "Entradas, saídas e histórico",
        path: "/vida-financeira/transacoes",
        icon: CreditCard,
        tone: "orange",
      },
      {
        label: "Recorrências",
        detail: "Despesas e receitas frequentes",
        path: "/vida-financeira/recorrencias",
        icon: RefreshCw,
        tone: "violet",
      },
      {
        label: "Carteiras",
        detail: "Contas, cartões e reservas",
        path: "/carteiras",
        icon: Wallet,
        tone: "green",
      },
    ],
  },
  {
    title: "Entenda seus números",
    items: [
      {
        label: "Análises",
        detail: "Panorama e saúde financeira",
        path: "/vida-financeira/analises",
        icon: BarChart3,
        tone: "blue",
      },
      {
        label: "Relatórios",
        detail: "Fechamentos e demonstrativos",
        path: "/vida-financeira/analises?visao=relatorios",
        icon: FileText,
        tone: "amber",
      },
      {
        label: "Atividades",
        detail: "Tudo o que aconteceu na conta",
        path: "/vida-financeira/transacoes/calendario",
        icon: Activity,
        tone: "pink",
      },
    ],
  },
  {
    title: "Sua conta",
    items: [
      {
        label: "Configurações",
        detail: "Preferências e segurança",
        path: "/configuracoes",
        icon: Settings,
        tone: "slate",
      },
    ],
  },
];
