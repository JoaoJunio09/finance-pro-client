import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import QuizContextPanel from "../QuizContextPanel/QuizContextPanel";
import { quizQuestions } from "../../data/quizQuestions";
import type { QuizQuestion } from "../../types/quiz";
import styles from "../../FinancialProfileQuiz.module.css";

type QuizQuestionsProps = {
  question: QuizQuestion;
  currentIndex: number;
  currentAnswer?: string;
  progress: number;
  onBack: () => void;
  onContinue: () => void;
  onSelectAnswer: (option: string) => void;
};

export default function QuizQuestions({
  question,
  currentIndex,
  currentAnswer,
  progress,
  onBack,
  onContinue,
  onSelectAnswer,
}: QuizQuestionsProps) {
  return (
    <motion.section
      className={styles.quizShell}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <QuizContextPanel dimension={question.dimension} currentIndex={currentIndex} />

      <section className={styles.questionPanel}>
        <div className={styles.progressHeader}>
          <button
            className={styles.backButton}
            type="button"
            onClick={onBack}
            aria-label="Voltar para a pergunta anterior"
          >
            <ArrowLeft size={18} />
          </button>
          <div className={styles.progressTrack} aria-hidden="true">
            <motion.span
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
          <span className={styles.progressCount}>
            {currentIndex + 1}
            <span> / {quizQuestions.length}</span>
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className={styles.questionContent}
            key={question.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <span className={styles.questionEyebrow}>{question.eyebrow}</span>
            <h2>{question.title}</h2>
            {question.helper && (
              <p className={styles.questionHelper}>{question.helper}</p>
            )}

            <div
              className={`${styles.options} ${
                question.layout === "scale" ? styles.scaleOptions : ""
              }`}
              role="radiogroup"
              aria-label={question.title}
            >
              {question.options.map((option, index) => {
                const selected = currentAnswer === option;
                return (
                  <button
                    className={styles.option}
                    data-selected={selected}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onSelectAnswer(option)}
                    key={option}
                  >
                    <span className={styles.optionIndex}>
                      {selected ? <Check size={15} /> : index + 1}
                    </span>
                    <span>{option}</span>
                    <ArrowRight
                      className={styles.optionArrow}
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            <div className={styles.questionFooter}>
              <span>Uma escolha já leva você à próxima.</span>
              {currentAnswer && (
                <button type="button" onClick={onContinue}>
                  Continuar
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </motion.section>
  );
}
