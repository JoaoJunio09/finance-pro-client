import type { FinancialHealth } from "../types/analytics";

export const healthPreview: FinancialHealth = {
  score: 82,
  status: "Muito Boa",
  trendMonth: 8,
  metrics: {
    savingsCapacity: 2400,
    committedPercentage: 28,
    savingsRate: 19,
    growth: 12,
    creditDependence: "Baixa",
    reserveMonths: 6.4,
  },
  positiveInsights: [
    {
      id: "p1",
      text: "Seu saldo líquido permanece positivo continuamente.",
      type: "positive",
    },
    {
      id: "p2",
      text: "Suas entradas superaram saídas em mais de 44%.",
      type: "positive",
    },
    {
      id: "p3",
      text: "Compromissos fixos ocupam uma faixa saudável da renda (28%).",
      type: "positive",
    },
  ],
  attentionInsights: [
    {
      id: "a1",
      text: "Gastos com alimentação tiveram oscilação recente de +12%.",
      type: "alert",
    },
    {
      id: "a2",
      text: "Reserva atual atinge 6,4 meses (meta recomendada: 6 a 12 meses).",
      type: "neutral",
    },
  ],
};
