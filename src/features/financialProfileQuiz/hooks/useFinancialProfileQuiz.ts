import { useEffect, useRef, useState } from "react";
import { quizQuestions } from "../data/quizQuestions";
import type { QuizStage } from "../types/quiz";

export default function useFinancialProfileQuiz() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const advanceTimer = useRef<number | null>(null);

  const question = quizQuestions[currentIndex];
  const currentAnswer = question ? answers[question.id] : undefined;
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

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

  return {
    stage,
    question,
    currentIndex,
    currentAnswer,
    progress,
    startQuiz: () => setStage("questions"),
    goBack,
    goForward,
    selectAnswer,
    restartQuiz,
  };
}
