import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/ui/BackButton/BackButton";
import FlowCards from "../../components/shared/FlowCards/FlowCards";
import type { FlowOption } from "./navigation";
import styles from "./FinancialLife.module.css";

interface ChoiceScreenProps {
  title: string;
  backPath: string;
  backLabel: string;
  options: readonly FlowOption[];
}

export default function ChoiceScreen({
  title,
  backPath,
  backLabel,
  options,
}: ChoiceScreenProps) {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [title]);

  return (
    <main className={styles.choiceScreen}>
      <div className={styles.choiceContent}>
        <BackButton label={backLabel} onClick={() => navigate(backPath)} />
        <div className={styles.choiceHeading}>
          <span>Capto / Vida financeira</span>
          <h1 tabIndex={-1} ref={headingRef}>
            {title}
          </h1>
        </div>
        <FlowCards options={options} />
      </div>
    </main>
  );
}
