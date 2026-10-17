import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Compass,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirstStepsProgress from "../firstSteps/FirstStepsProgress";
import styles from "./FinancialProfileQuiz.module.css";
import {
  quizQuestions,
  type QuizDimension,
} from "./quizQuestions";

type QuizStage = "intro" | "questions" | "complete";

const dimensionMeta: Record<
  QuizDimension,
  { label: string; description: string; icon: typeof ShieldCheck }
> = {
  "Segurança financeira": {
    label: "Segurança",
    description: "Como o presente cabe no seu mês.",
    icon: ShieldCheck,
  },
  Resiliência: {
    label: "Resiliência",
    description: "Como você atravessa os imprevistos.",
    icon: WalletCards,
  },
  "Organização e controle": {
    label: "Organização",
    description: "Como você acompanha e conduz suas escolhas.",
    icon: Target,
  },
  "Regulação de impulsos": {
    label: "Decisões",
    description: "O espaço entre a vontade e a escolha.",
    icon: Compass,
  },
  "Orientação para o futuro": {
    label: "Futuro",
    description: "Como seus planos participam do presente.",
    icon: CalendarDays,
  },
  "Equilíbrio e liberdade": {
    label: "Equilíbrio",
    description: "Como dinheiro e qualidade de vida convivem.",
    icon: Scale,
  },
};

const dimensions = Object.entries(dimensionMeta) as [
  QuizDimension,
  (typeof dimensionMeta)[QuizDimension],
][];

type FinancialProfileQuizProps = {
  firstSteps?: {
    nickname: string;
    onBack: (step: number) => void;
  };
};

function FinancialProfileQuiz({ firstSteps }: FinancialProfileQuizProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const advanceTimer = useRef<number | null>(null);

  const question = quizQuestions[currentIndex];
  const currentAnswer = question ? answers[question.id] : undefined;
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const currentMeta = question ? dimensionMeta[question.dimension] : null;

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  function goBack() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);

    if (currentIndex === 0) {
      setStage("intro");
      return;
    }

    setCurrentIndex((index) => index - 1);
  }

  function goForward() {
    if (currentIndex === quizQuestions.length - 1) {
      setStage("complete");
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function selectAnswer(option: string) {
    setAnswers((current) => ({ ...current, [question.id]: option }));

    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(goForward, 360);
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setStage("questions");
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambientOne} />
      <div className={styles.ambientTwo} />

      {firstSteps && stage === "intro" && (
        <div className={styles.firstStepsProgress}>
          <FirstStepsProgress currentStep={2} onBack={firstSteps.onBack} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.section
            className={`${styles.intro} ${firstSteps ? styles.onboardingIntro : ""}`}
            key="intro"
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
              <h1>{firstSteps ? `${firstSteps.nickname}, vamos entender o seu jeito de lidar com dinheiro.` : "Vamos entender o seu jeito de lidar com dinheiro."}</h1>
              <p>
                São escolhas rápidas para o Capto começar do seu ponto de
                partida — sem julgamento, sem resposta certa.
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
                  onClick={() => setStage("questions")}
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
                    <div
                      className={styles.orbitItem}
                      data-position={index + 1}
                      key={dimension}
                    >
                      <Icon size={17} />
                      <span>{meta.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {stage === "questions" && question && currentMeta && (
          <motion.section
            className={styles.quizShell}
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <aside className={styles.contextPanel}>
              <div>
                <span className={styles.contextLabel}>Estamos conhecendo</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    className={styles.dimensionBlock}
                    key={question.dimension}
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
                {dimensions.map(([dimension, meta]) => {
                  const Icon = meta.icon;
                  const isCurrent = question.dimension === dimension;
                  const wasVisited = quizQuestions
                    .slice(0, currentIndex)
                    .some((item) => item.dimension === dimension);

                  return (
                    <span
                      className={styles.railItem}
                      data-active={isCurrent}
                      data-visited={wasVisited}
                      key={dimension}
                    >
                      {wasVisited && !isCurrent ? (
                        <Check size={14} />
                      ) : (
                        <Icon size={14} />
                      )}
                      {meta.label}
                    </span>
                  );
                })}
              </div>

              <p className={styles.contextNote}>
                Responda pelo que acontece hoje. Seu perfil pode mudar com
                você.
              </p>
            </aside>

            <section className={styles.questionPanel}>
              <div className={styles.progressHeader}>
                <button
                  className={styles.backButton}
                  type="button"
                  onClick={goBack}
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
                  <span className={styles.questionEyebrow}>
                    {question.eyebrow}
                  </span>
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
                          onClick={() => selectAnswer(option)}
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
                      <button type="button" onClick={goForward}>
                        Continuar
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </motion.section>
        )}

        {stage === "complete" && (
          <motion.section
            className={styles.complete}
            key="complete"
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
              No produto final, suas respostas vão compor um retrato com
              tendência, momento financeiro e os aspectos que mais merecem sua
              atenção — sempre sem rótulos.
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
              <button
                className={styles.primaryButton}
                type="button"
                onClick={() => navigate("/dashboard")}
              >
                Ir para o painel
                <ArrowRight size={18} />
              </button>
              <button
                className={styles.textButton}
                type="button"
                onClick={restartQuiz}
              >
                Revisar minhas respostas
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {stage !== "complete" && (
        <footer className={styles.deferFooter}>
          <button
            className={styles.laterButton}
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Respondo depois
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </footer>
      )}
    </main>
  );
}

export default FinancialProfileQuiz;
