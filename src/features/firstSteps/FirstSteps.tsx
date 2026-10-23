import { AnimatePresence } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import FinancialProfileQuiz from "../financialProfileQuiz/FinancialProfileQuiz";
import FirstStepsProgress from "./components/FirstStepsProgress/FirstStepsProgress";
import NicknameStep from "./components/NicknameStep/NicknameStep";
import ThemeStep from "./components/ThemeStep/ThemeStep";
import styles from "./FirstSteps.module.css";

export default function FirstSteps() {
  const { theme, setTheme } = useThemeContext();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const displayName = nickname.trim().replace(/\s+/g, " ");

  function changeStep(nextStep: number) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function submitNickname(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!displayName) return;
    setNickname(displayName);
    changeStep(1);
  }

  if (step === 2) {
    return (
      <FinancialProfileQuiz firstSteps={{ nickname: displayName, onBack: changeStep }} />
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <FirstStepsProgress currentStep={step} onBack={changeStep} />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => headingRef.current?.focus({ preventScroll: true })}
        >
          {step === 0 ? (
            <NicknameStep
              key="nickname"
              nickname={nickname}
              displayName={displayName}
              onNicknameChange={setNickname}
              onSubmit={submitNickname}
            />
          ) : (
            <ThemeStep
              key="theme"
              displayName={displayName}
              theme={theme}
              headingRef={headingRef}
              onThemeChange={setTheme}
              onBack={() => changeStep(0)}
              onContinue={() => changeStep(2)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
