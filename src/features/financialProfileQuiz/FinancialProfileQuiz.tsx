import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FirstStepsProgress from "../firstSteps/components/FirstStepsProgress/FirstStepsProgress";
import QuizIntro from "./components/QuizIntro/QuizIntro";
import QuizQuestions from "./components/QuizQuestions/QuizQuestions";
import QuizComplete from "./components/QuizComplete/QuizComplete";
import useFinancialProfileQuiz from "./hooks/useFinancialProfileQuiz";
import type { FirstStepsContext } from "./types/quiz";
import styles from "./FinancialProfileQuiz.module.css";

type FinancialProfileQuizProps = { firstSteps?: FirstStepsContext };

export default function FinancialProfileQuiz({ firstSteps }: FinancialProfileQuizProps) {
  const navigate = useNavigate();
  const {
    stage,
    question,
    currentIndex,
    currentAnswer,
    progress,
    startQuiz,
    goBack,
    goForward,
    selectAnswer,
    restartQuiz,
  } = useFinancialProfileQuiz();
  const goToDashboard = () => navigate("/dashboard");

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
          <QuizIntro key="intro" firstSteps={firstSteps} onStart={startQuiz} />
        )}
        {stage === "questions" && question && (
          <QuizQuestions
            key="questions"
            question={question}
            currentIndex={currentIndex}
            currentAnswer={currentAnswer}
            progress={progress}
            onBack={goBack}
            onContinue={goForward}
            onSelectAnswer={selectAnswer}
          />
        )}
        {stage === "complete" && (
          <QuizComplete key="complete" onFinish={goToDashboard} onReview={restartQuiz} />
        )}
      </AnimatePresence>
      {stage !== "complete" && (
        <footer className={styles.deferFooter}>
          <button className={styles.laterButton} type="button" onClick={goToDashboard}>
            Respondo depois
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </footer>
      )}
    </main>
  );
}
