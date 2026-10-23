import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import type { ThemeName } from "../../../../context/ThemeContext";
import { themeOptions } from "../../data/firstSteps";
import ThemePreview from "../ThemePreview/ThemePreview";
import styles from "../../FirstSteps.module.css";

type ThemeStepProps = {
  displayName: string;
  theme: ThemeName;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onThemeChange: (theme: ThemeName) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function ThemeStep({
  displayName,
  theme,
  headingRef,
  onThemeChange,
  onBack,
  onContinue,
}: ThemeStepProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      className={styles.themeStep}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -10 }}
      transition={{ duration: 0.2 }}
      onAnimationComplete={() => headingRef.current?.focus({ preventScroll: true })}
    >
      <div className={styles.themeHeading}>
        <span className={styles.eyebrow}>02 / Seu ambiente</span>
        <h1 ref={headingRef} tabIndex={-1}>
          {displayName}, qual combina com você?
        </h1>
        <p>
          Mais luz ou menos luz? Escolha como quer ver o Capto.
          <br className={styles.desktopBreak} /> Pode experimentar agora e trocar quando
          quiser.
        </p>
      </div>

      <fieldset className={styles.themeChoices}>
        <legend className={styles.srOnly}>Escolha o tema do aplicativo</legend>
        {themeOptions.map(({ value: option, label, description, icon: Icon }) => {
          const isSelected = theme === option;
          return (
            <label className={styles.themeChoice} data-selected={isSelected} key={option}>
              <input
                type="radio"
                name="app-theme"
                value={option}
                checked={isSelected}
                onChange={() => onThemeChange(option)}
              />
              <ThemePreview name={displayName} theme={option} />
              <span className={styles.choiceFooter}>
                <span className={styles.choiceIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <strong>{label}</strong>
                  <span>{description}</span>
                </span>
                <span className={styles.choiceCheck} aria-hidden="true">
                  {isSelected && <Check size={15} />}
                </span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className={styles.themeActions}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" /> Voltar
        </button>
        <button type="button" className={styles.primaryButton} onClick={onContinue}>
          Continuar com tema {theme === "dark" ? "escuro" : "claro"}
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <p className={styles.themeHint}>
        Por último, um retrato do seu momento financeiro. Você decide se responde agora.
      </p>
    </motion.section>
  );
}
