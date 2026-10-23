import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { dimensions } from "../../data/quizDimensions";
import styles from "../../FinancialProfileQuiz.module.css";

type QuizCompleteProps = { onFinish: () => void; onReview: () => void };

export default function QuizComplete({ onFinish, onReview }: QuizCompleteProps) {
  return (
    <motion.section
      className={styles.complete}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span className={styles.completeIcon}>
        <CheckCircle2 size={30} />
      </span>
      <span className={styles.kicker}>Tudo respondido</span>
      <h1>Pronto. Já entendemos o seu ponto de partida.</h1>
      <p>
        No produto final, suas respostas vão compor um retrato com tendência, momento
        financeiro e os aspectos que mais merecem sua atenção — sempre sem rótulos.
      </p>

      <div className={styles.completeDimensions}>
        {dimensions.map(([dimension, meta]) => {
          const Icon = meta.icon;
          return (
            <span key={dimension}>
              <Icon size={15} />
              {meta.label}
            </span>
          );
        })}
      </div>

      <div className={styles.completeNote}>
        <LockKeyhole size={16} />
        Esta rota é uma validação visual. Nenhuma resposta foi salva.
      </div>

      <div className={styles.completeActions}>
        <button className={styles.primaryButton} type="button" onClick={onFinish}>
          Ir para o painel
          <ArrowRight size={18} />
        </button>
        <button className={styles.textButton} type="button" onClick={onReview}>
          Revisar minhas respostas
        </button>
      </div>
    </motion.section>
  );
}
