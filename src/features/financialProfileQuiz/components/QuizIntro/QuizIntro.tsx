import { ArrowLeft, ArrowRight, ClipboardList, Clock3, LockKeyhole } from "lucide-react";
import { motion } from "framer-motion";
import { dimensions } from "../../data/quizDimensions";
import type { FirstStepsContext } from "../../types/quiz";
import styles from "../../FinancialProfileQuiz.module.css";

type QuizIntroProps = { firstSteps?: FirstStepsContext; onStart: () => void };

export default function QuizIntro({ firstSteps, onStart }: QuizIntroProps) {
  return (
    <motion.section
      className={`${styles.intro} ${firstSteps ? styles.onboardingIntro : ""}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className={styles.introCopy}>
        <span className={styles.kicker}>
          <ClipboardList size={14} aria-hidden="true" />
          {firstSteps ? "03 / Seu momento" : "Antes de começar"}
        </span>
        <h1>
          {firstSteps
            ? `${firstSteps.nickname}, vamos entender o seu jeito de lidar com dinheiro.`
            : "Vamos entender o seu jeito de lidar com dinheiro."}
        </h1>
        <p>
          São escolhas rápidas para o Capto começar do seu ponto de partida — sem
          julgamento, sem resposta certa.
        </p>

        <div className={styles.introFacts}>
          <span>
            <Clock3 size={16} aria-hidden="true" />
            Cerca de 2 minutos
          </span>
          <span>
            <ArrowLeft size={16} aria-hidden="true" />
            Você pode voltar
          </span>
          <span>
            <LockKeyhole size={16} aria-hidden="true" />
            Você está no controle
          </span>
        </div>

        <div className={styles.introActions}>
          <button
            className={`${styles.primaryButton} ${styles.startButton}`}
            type="button"
            onClick={onStart}
          >
            Iniciar questionário
            <ArrowRight size={21} aria-hidden="true" />
          </button>
          {firstSteps && (
            <button
              className={`${styles.textButton} ${styles.preferencesBack}`}
              type="button"
              onClick={() => firstSteps.onBack(1)}
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Voltar para aparência
            </button>
          )}
        </div>
      </div>

      <div className={styles.introVisual} aria-hidden="true">
        <div className={styles.orbit}>
          <div className={styles.orbitCore}>
            <span>Seu</span>
            <strong>ponto de partida</strong>
          </div>
          {dimensions.map(([dimension, meta], index) => {
            const Icon = meta.icon;
            return (
              <div className={styles.orbitItem} data-position={index + 1} key={dimension}>
                <Icon size={17} />
                <span>{meta.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
