import { useState } from "react";
import { CalendarDays, Info, RefreshCw } from "lucide-react";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BackButton } from "../../components/ui/BackButton/BackButton";
import { ANALYSIS_VIEWS, analysisPath } from "./analysisViews";
import AnalysisNavigation from "./components/AnalysisNavigation/AnalysisNavigation";
import AnalysisSummary from "./components/AnalysisSummary/AnalysisSummary";
import CategoriesSubpage from "./components/SubPages/CategoriesSubpage/CategoriesSubpage";
import EvolutionSubpage from "./components/SubPages/EvolutionSubpage/EvolutionSubpage";
import HealthSubpage from "./components/SubPages/HealthSubpage/HealthSubpage";
import ReportsSubpage from "./components/SubPages/ReportsSubpage/ReportsSubpage";
import IncomeSubpage from "./components/SubPages/IncomeSubpage/IncomeSubpage";
import HealthExplanationModal from "./components/HealthExplanationModal/HealthExplanationModal";
import { healthPreview } from "./data/healthPreview";
import useAnalytics from "./hooks/useAnalytics";
import styles from "./Analytics.module.css";

export type * from "./types/analytics";

export default function Analytics() {
  const { topic } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [healthExplanationOpen, setHealthExplanationOpen] = useState(false);
  const { analytics, isLoading, isFetching, isError, refetch } = useAnalytics();
  const viewId = topic ?? searchParams.get("visao") ?? "categorias";
  const selected = ANALYSIS_VIEWS.find((view) => view.id === viewId);
  const period = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  if (!selected) return <Navigate to="/vida-financeira/analises" replace />;
  if (topic) return <Navigate to={analysisPath(selected.id)} replace />;

  return (
    <main className={styles.page}>
      <BackButton
        label="Voltar à vida financeira"
        onClick={() => navigate("/vida-financeira")}
      />
      <header className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Análise da Vida Financeira</span>
          <h1>O que você quer entender?</h1>
          <p>
            Escolha um tema para explorar os registros da sua vida financeira.
          </p>
        </div>
        <span className={styles.period}>
          <CalendarDays size={16} aria-hidden="true" />
          {period}
        </span>
      </header>
      <AnalysisSummary analytics={analytics} isLoading={isLoading} />
      <AnalysisNavigation selected={selected.id} />
      <section
        key={selected.id}
        className={styles.panel}
        aria-labelledby="analysis-panel-title"
      >
        <div className={styles.panelHeading}>
          <div>
            <h2 id="analysis-panel-title">{selected.title}</h2>
            <p>{selected.description}</p>
          </div>
          <button
            type="button"
            className={styles.refresh}
            disabled={isFetching}
            onClick={() => void refetch()}
            aria-label="Atualizar dados da análise"
          >
            <RefreshCw size={14} aria-hidden="true" />
            {isFetching ? "Atualizando…" : "Atualizar dados"}
          </button>
        </div>
        {isLoading && selected.id !== "saude" ? (
          <div className={styles.loading} role="status">
            Carregando suas finanças…
          </div>
        ) : isError && selected.id !== "saude" ? (
          <div className={styles.feedback} role="alert">
            <p>Não foi possível carregar suas finanças.</p>
            <button
              type="button"
              className={styles.refresh}
              onClick={() => void refetch()}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            {selected.id === "categorias" && (
              <CategoriesSubpage
                categories={analytics?.categorySpending ?? []}
              />
            )}
            {selected.id === "receitas" && (
              <IncomeSubpage transactions={analytics?.transactions ?? []} />
            )}
            {selected.id === "saude" && (
              <>
                <p className={styles.notice}>
                  <Info size={16} aria-hidden="true" />
                  <span>
                    Prévia: o score e os indicadores de saúde exibidos aqui
                    ainda são demonstrativos, não calculados a partir dos seus
                    registros.
                  </span>
                </p>
                <HealthSubpage
                  health={healthPreview}
                  onOpenHealthModal={() => setHealthExplanationOpen(true)}
                />
              </>
            )}
            {selected.id === "evolucao" && (
              <EvolutionSubpage evolution={analytics?.trajectory ?? []} />
            )}
            {selected.id === "relatorios" && (
              <ReportsSubpage analytics={analytics} />
            )}
          </>
        )}
      </section>
      <HealthExplanationModal
        isOpen={healthExplanationOpen}
        onClose={() => setHealthExplanationOpen(false)}
      />
    </main>
  );
}