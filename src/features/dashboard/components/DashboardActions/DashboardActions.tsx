import {
  ChartNoAxesCombined,
  Target,
  TrendingUp,
  WalletCards,
  PieChart,
  Repeat2,
} from "lucide-react";
import FlowCards from "../../../../components/shared/FlowCards/FlowCards";
import type { FlowOption } from "../../../financialLife/navigation";
import styles from "./DashboardActions.module.css";

const routineOptions: FlowOption[] = [
  {
    title: "Conferir meus cartões e faturas",
    description: "Veja vencimentos, parcelas e contas",
    path: "/carteiras",
    icon: WalletCards,
    tone: "blue",
  },
  {
    title: "Acompanhar minhas metas",
    description: "Confira o progresso dos seus objetivos",
    path: "/vida-financeira/metas",
    icon: Target,
    tone: "pink",
  },
  {
    title: "Revisar minhas recorrências",
    description: "Confira o que está previsto na sua rotina",
    path: "/vida-financeira/recorrencias",
    icon: Repeat2,
    tone: "violet",
  },
];
const understandingOptions: FlowOption[] = [
  {
    title: "Para onde meu dinheiro está indo?",
    description: "Conheça suas despesas por categoria",
    path: "/vida-financeira/analises?visao=categorias",
    icon: PieChart,
    tone: "orange",
  },
  {
    title: "Quais são minhas maiores receitas?",
    description: "Compare as entradas do mês",
    path: "/vida-financeira/analises?visao=receitas",
    icon: TrendingUp,
    tone: "green",
  },
  {
    title: "Como meu saldo está evoluindo?",
    description: "Acompanhe as mudanças ao longo do mês",
    path: "/vida-financeira/analises?visao=evolucao",
    icon: ChartNoAxesCombined,
    tone: "blue",
  },
];

export default function DashboardActions() {
  return (
    <div className={styles.groups}>
      <section aria-labelledby="routine-title">
        <div className={styles.heading}>
          <span>01</span>
          <h2 id="routine-title">O que merece sua atenção agora?</h2>
        </div>
        <FlowCards options={routineOptions} />
      </section>
      <section aria-labelledby="understanding-title">
        <div className={styles.heading}>
          <span>02</span>
          <h2 id="understanding-title">O que seus números estão mostrando?</h2>
        </div>
        <FlowCards options={understandingOptions} />
      </section>
    </div>
  );
}
