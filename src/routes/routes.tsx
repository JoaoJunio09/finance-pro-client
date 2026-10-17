import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AccountProvider } from "../context/AccountContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { lazy, Suspense } from "react";
import DashboardPage from "../pages/DashboardPage";
import SignInPage from "../pages/SignInPage";
import ScrollToTop from "./ScrollToTop";

const Settings = lazy(() => import("../pages/ConfigurationPage"));
const RecurrencesPage = lazy(() => import("../pages/RecurrencesPage"));
const WalletsPage = lazy(() => import("../pages/WalletsPage"));
const MoreOptionsPage = lazy(() => import("../pages/MoreOptionsPage"));
const FinancialLifePage = lazy(() => import("../pages/FinancialLifePage"));
const FinancialAnalysisPage = lazy(
  () => import("../pages/FinancialAnalysisPage")
);
const FinancialTransactionsPage = lazy(
  () => import("../pages/FinancialTransactionsPage")
);
const InvestmentsPage = lazy(() => import("../pages/InvestmentsPage"));
const FinancialEducationPage = lazy(
  () => import("../pages/FinancialEducationPage")
);
const GoalsPage = lazy(() => import("../pages/GoalsPage"));
const FinancialProfileQuizPage = lazy(
  () => import("../pages/FinancialProfileQuizPage")
);
const FirstStepsPage = lazy(() => import("../pages/FirstStepsPage"));

function LegacyAnalyticsRedirect() {
  const { hash } = useLocation();
  return (
    <Navigate
      to={
        hash === "#relatorios"
          ? "/vida-financeira/analises?visao=relatorios"
          : "/vida-financeira/analises"
      }
      replace
    />
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <div className="page-fade" key={location.pathname}>
      <Suspense
        fallback={
          <div
            className="grid min-h-[70dvh] place-items-center text-sm text-[var(--text-muted)]"
            role="status"
          >
            Carregando…
          </div>
        }
      >
        <Routes location={location}>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/primeiros-passos" element={<FirstStepsPage />} />
          <Route
            path="/validacao/primeiros-passos"
            element={<Navigate to="/primeiros-passos" replace />}
          />
          <Route
            path="/validacao/perfil-financeiro"
            element={<FinancialProfileQuizPage />}
          />
          <Route path="/vida-financeira" element={<FinancialLifePage />} />
          <Route
            path="/vida-financeira/transacoes/:mode?"
            element={<FinancialTransactionsPage />}
          />
          <Route
            path="/vida-financeira/recorrencias"
            element={<RecurrencesPage />}
          />
          <Route
            path="/vida-financeira/analises/:topic?"
            element={<FinancialAnalysisPage />}
          />
          <Route path="/carteiras" element={<WalletsPage />} />
          <Route path="/investimentos" element={<InvestmentsPage />} />
          <Route
            path="/educacao-financeira"
            element={<FinancialEducationPage />}
          />
          <Route path="/vida-financeira/metas" element={<GoalsPage />} />
          <Route
            path="/metas"
            element={<Navigate to="/vida-financeira/metas" replace />}
          />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/opcoes" element={<MoreOptionsPage />} />
          <Route
            path="/transacoes"
            element={<Navigate to="/vida-financeira/transacoes" replace />}
          />
          <Route
            path="/recorrencias"
            element={<Navigate to="/vida-financeira/recorrencias" replace />}
          />
          <Route path="/analises" element={<LegacyAnalyticsRedirect />} />
          <Route
            path="/atividades"
            element={
              <Navigate to="/vida-financeira/transacoes/calendario" replace />
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccountProvider>
          <ThemeProvider>
            <ScrollToTop />
            <AppRoutes />
          </ThemeProvider>
        </AccountProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
