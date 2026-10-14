export interface BreadcrumbItem {
  label: string;
  path: string;
}

const HOME: BreadcrumbItem = { label: "Início", path: "/dashboard" };
const FINANCIAL_LIFE: BreadcrumbItem = {
  label: "Ver Vida Financeira",
  path: "/vida-financeira",
};

const FINANCIAL_PAGES: BreadcrumbItem[] = [
  { label: "Transações", path: "/vida-financeira/transacoes" },
  { label: "Recorrências", path: "/vida-financeira/recorrencias" },
  { label: "Análise da Vida Financeira", path: "/vida-financeira/analises" },
  { label: "Metas", path: "/vida-financeira/metas" },
  { label: "Carteiras / Cartões de Crédito", path: "/carteiras" },
];

const OTHER_PAGES: BreadcrumbItem[] = [
  { label: "Investimentos", path: "/investimentos" },
  { label: "Educação Financeira", path: "/educacao-financeira" },
  { label: "Mais opções", path: "/opcoes" },
  { label: "Configurações", path: "/configuracoes" },
];

export function getNavigationTrail(pathname: string): BreadcrumbItem[] {
  const financialPage = FINANCIAL_PAGES.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (financialPage) return [HOME, FINANCIAL_LIFE, financialPage];

  const otherPage = OTHER_PAGES.find(({ path }) => pathname === path);
  return otherPage ? [HOME, otherPage] : [];
}
