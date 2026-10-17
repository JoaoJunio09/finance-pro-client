import { Check } from "lucide-react";
import styles from "./FirstSteps.module.css";

const steps = ["Seu nome", "Seu ambiente", "Seu momento"];

type FirstStepsProgressProps = {
  currentStep: number;
  onBack?: (step: number) => void;
};

export default function FirstStepsProgress({
  currentStep,
  onBack,
}: FirstStepsProgressProps) {
  return (
    <nav className={styles.progress} aria-label="Primeiros passos">
      <ol>
        {steps.map((label, index) => (
          <li key={label} data-current={index === currentStep} data-done={index < currentStep}>
            <button
              type="button"
              className={styles.stepButton}
              aria-current={index === currentStep ? "step" : undefined}
              disabled={index >= currentStep || !onBack}
              onClick={() => onBack?.(index)}
              aria-label={`${index + 1} de 3: ${label}${index < currentStep ? ", voltar" : ""}`}
            >
              <span className={styles.stepNumber} aria-hidden="true">
                {index < currentStep ? <Check size={13} /> : `0${index + 1}`}
              </span>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
