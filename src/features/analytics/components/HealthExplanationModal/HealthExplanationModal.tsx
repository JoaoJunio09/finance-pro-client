import { ShieldCheck, X } from 'lucide-react';

import styles from './HealthExplanationModal.module.css';

interface HealthPillar {
  title: string;
  desc: string;
  weight: string;
  toneVar: string;
}

interface HealthExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock dos pilares do score — fixo por enquanto, sem dependência de dados dinâmicos.
const HEALTH_PILLARS: HealthPillar[] = [
  { title: 'Saldo Líquido Positivo', desc: 'Capacidade recorrente de manter entradas maiores que saídas.', weight: '25%', toneVar: 'var(--income)' },
  { title: 'Comprometimento de Renda', desc: 'Percentual da renda alocado em despesas e parcelas fixas.', weight: '20%', toneVar: 'var(--accent)' },
  { title: 'Reserva de Emergência', desc: 'Meses de custo de vida cobertos por investimentos líquidos.', weight: '20%', toneVar: '#3B82F6' },
  { title: 'Capacidade de Poupança', desc: 'Taxa mensal poupada e investida sobre o faturamento.', weight: '20%', toneVar: 'var(--warning)' },
  { title: 'Uso Saudável do Crédito', desc: 'Baixa dependência de rotativos e alavancagem em cartão.', weight: '15%', toneVar: '#14B8A6' },
];

export function HealthExplanationModal({ isOpen, onClose }: HealthExplanationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${styles.overlay}`} onClick={onClose} />

      <div className={`relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto border ${styles.modal}`}>
        <div className={`w-12 h-1.5 rounded-full mx-auto mb-4 sm:hidden ${styles.dragHandle}`} />

        <div className={`flex items-center justify-between pb-4 border-b mb-4 ${styles.header}`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${styles.headerIcon}`}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className={`text-base font-bold ${styles.headerTitle}`}>Score de Saúde Financeira</h3>
              <p className={`text-xs ${styles.headerSubtitle}`}>Como é calculada a sua nota</p>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${styles.closeBtn}`} type="button" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${styles.intro}`}>
          O algoritmo do FinancePro avalia 5 pilares fundamentais da sua gestão pessoal para calcular um score de 0 a
          100 em tempo real:
        </p>

        <div className="flex flex-col gap-3">
          {HEALTH_PILLARS.map((item) => (
            <div key={item.title} className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${styles.pillarRow}`}>
              <div className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.toneVar }} />
                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold ${styles.pillarTitle}`}>{item.title}</h4>
                  <p className={`text-xs mt-0.5 leading-normal ${styles.pillarDesc}`}>{item.desc}</p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${styles.pillarWeight}`}>{item.weight}</span>
            </div>
          ))}
        </div>

        <button onClick={onClose} className={`mt-6 w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${styles.confirmBtn}`} type="button">
          Entendido
        </button>
      </div>
    </div>
  );
}

export default HealthExplanationModal;