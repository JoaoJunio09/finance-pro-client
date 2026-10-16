import { ShieldCheck, X } from "lucide-react";

import styles from "./HealthExplanationModal.module.css";

interface HealthPillar {
  title: string;
  desc: string;
  weight: string;
  toneVar: string;
  rules: string[];
}

interface HealthExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Regras exibidas conforme FinancialHealthService, no backend.
const HEALTH_PILLARS: HealthPillar[] = [
  {
    title: "Equilíbrio entre receitas e despesas",
    desc: "Diferença entre as receitas confirmadas e todas as despesas registradas no mês, incluindo as pendentes. O cálculo considera a diferença em reais inteiros, descartando os centavos.",
    weight: "35 pontos",
    toneVar: "var(--income)",
    rules: [
      "R$ 801 ou mais de diferença: 35 pontos.",
      "De R$ 501 a R$ 800: 30 pontos.",
      "De R$ 301 a R$ 500: 25 pontos.",
      "De R$ 1 a R$ 300: 15 pontos.",
      "Diferença de zero ou negativa: nenhum ponto.",
    ],
  },
  {
    title: "Gastos essenciais e assinaturas",
    desc: "A renda confirmada do mês representa 100%. Os essenciais incluem as categorias Moradia, Água, Energia, Saúde e Transporte. As assinaturas são avaliadas separadamente.",
    weight: "25 pontos",
    toneVar: "var(--accent)",
    rules: [
      "Essenciais abaixo de 30% da renda: 18 pontos.",
      "Essenciais de 30% até menos de 50%: 10 pontos.",
      "Essenciais a partir de 50%: nenhum ponto.",
      "Assinaturas abaixo de 20% da renda: 7 pontos.",
      "Assinaturas de 20% até menos de 30%: 5 pontos.",
      "Assinaturas a partir de 30%: nenhum ponto.",
    ],
  },
  {
    title: "Lazer e compras",
    desc: "Soma dos gastos nas categorias Lazer e Compras em relação à renda confirmada do mês. Mercado e supermercado não entram nesse grupo.",
    weight: "20 pontos",
    toneVar: "var(--warning)",
    rules: [
      "Abaixo de 10% da renda: 20 pontos.",
      "De 10% até menos de 15%: 15 pontos.",
      "De 15% até menos de 20%: 10 pontos.",
      "A partir de 20%: nenhum ponto.",
    ],
  },
  {
    title: "Reserva de emergência",
    desc: "Verifica se existe uma carteira do tipo Reserva de emergência. Atualmente, o valor guardado e os meses de despesas cobertos não alteram a pontuação.",
    weight: "15 pontos",
    toneVar: "var(--income)",
    rules: [
      "Com uma reserva cadastrada: 15 pontos.",
      "Sem reserva cadastrada: 3 pontos.",
    ],
  },
  {
    title: "Cofrinhos e metas",
    desc: "Conta as carteiras do tipo Poupança e as que possuem uma meta vinculada. Cada carteira conta uma única vez, independentemente do saldo.",
    weight: "5 pontos",
    toneVar: "var(--accent)",
    rules: [
      "Um cofrinho ou carteira com meta: 3 pontos.",
      "Mais de um: 5 pontos.",
      "Nenhum: nenhum ponto.",
    ],
  },
];

export function HealthExplanationModal({
  isOpen,
  onClose,
}: HealthExplanationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto border ${styles.modal}`}
      >
        <div
          className={`w-12 h-1.5 rounded-full mx-auto mb-4 sm:hidden ${styles.dragHandle}`}
        />

        <div
          className={`flex items-center justify-between pb-4 border-b mb-4 ${styles.header}`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${styles.headerIcon}`}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className={`text-base font-bold ${styles.headerTitle}`}>
                Score de Saúde Financeira
              </h3>
              <p className={`text-xs ${styles.headerSubtitle}`}>
                Como é calculada a sua nota
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${styles.closeBtn}`}
            type="button"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <p
          className={`text-xs sm:text-sm leading-relaxed mb-5 ${styles.intro}`}
        >
          O Capto soma cinco critérios para formar uma nota de 0 a 100. As
          receitas e despesas consideradas são as do mês atual; as carteiras
          cadastradas completam a avaliação.
        </p>

        <div className="flex flex-col gap-3">
          {HEALTH_PILLARS.map((item) => (
            <div
              key={item.title}
              className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${styles.pillarRow}`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: item.toneVar }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-semibold ${styles.pillarTitle}`}
                    >
                      {item.title}
                    </h4>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${styles.pillarWeight}`}
                    >
                      {item.weight}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-0.5 leading-normal ${styles.pillarDesc}`}
                  >
                    {item.desc}
                  </p>
                  <details className={styles.rules}>
                    <summary>Ver pontuação</summary>
                    <ul>
                      {item.rules.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.calculationNotes}>
          <h4>Quais registros entram no cálculo?</h4>
          <p>
            Apenas receitas confirmadas compõem a renda. Os gastos por categoria
            incluem despesas registradas e recorrências de saída ativas com
            próxima execução neste mês, sem repetir a mesma ocorrência já
            registrada.
          </p>
          <p>
            Sem renda confirmada positiva, os três primeiros critérios não
            pontuam. Reserva, cofrinhos e metas continuam sendo avaliados. As
            faixas percentuais não se acumulam: vale uma faixa por grupo de
            gastos.
          </p>
          <h4>Como a nota é classificada?</h4>
          <p>
            0–40: Crítico · 41–50: Mediano · 51–70: Bom · 71–90: Muito bom ·
            91–100: Excelente.
          </p>
        </div>

        <button
          onClick={onClose}
          className={`mt-6 w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${styles.confirmBtn}`}
          type="button"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

export default HealthExplanationModal;
