import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { dimensions, dimensionMeta } from "../../data/quizDimensions";
import { quizQuestions } from "../../data/quizQuestions";
import type { QuizDimension } from "../../types/quiz";
import styles from "../../FinancialProfileQuiz.module.css";

type QuizContextPanelProps = { dimension: QuizDimension; currentIndex: number };

export default function QuizContextPanel({
  dimension,
  currentIndex,
}: QuizContextPanelProps) {
  const currentMeta = dimensionMeta[dimension];

  return (
    <aside className={styles.contextPanel}>
      <div>
        <span className={styles.contextLabel}>Estamos conhecendo</span>
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.dimensionBlock}
            key={dimension}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <span className={styles.dimensionIcon}>
              <currentMeta.icon size={19} aria-hidden="true" />
            </span>
            <div>
              <strong>{currentMeta.label}</strong>
              <p>{currentMeta.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dimensionRail} aria-hidden="true">
        {dimensions.map(([itemDimension, meta]) => {
          const Icon = meta.icon;
          const isCurrent = dimension === itemDimension;
          const wasVisited = quizQuestions
            .slice(0, currentIndex)
            .some((item) => item.dimension === itemDimension);

          return (
            <span
              className={styles.railItem}
              data-active={isCurrent}
              data-visited={wasVisited}
              key={itemDimension}
            >
              {wasVisited && !isCurrent ? <Check size={14} /> : <Icon size={14} />}
              {meta.label}
            </span>
          );
        })}
      </div>

      <p className={styles.contextNote}>
        Responda pelo que acontece hoje. Seu perfil pode mudar com você.
      </p>
    </aside>
  );
}
