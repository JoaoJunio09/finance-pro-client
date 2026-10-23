import { ArrowRight, ArrowUpRight, ChartNoAxesColumnIncreasing } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { FormEvent } from "react";
import styles from "../../FirstSteps.module.css";

type NicknameStepProps = {
  nickname: string;
  displayName: string;
  onNicknameChange: (nickname: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function NicknameStep({
  nickname,
  displayName,
  onNicknameChange,
  onSubmit,
}: NicknameStepProps) {
  const reducedMotion = useReducedMotion();
  const previewName = displayName || "seu nome";

  return (
    <motion.section
      className={styles.nameStep}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -10 }}
      transition={{ duration: 0.2 }}
    >
      <form className={styles.nameForm} onSubmit={onSubmit}>
        <span className={styles.eyebrow}>01 / Vamos nos conhecer</span>
        <h1>
          Como você gosta
          <br />
          de ser chamado?
        </h1>
        <p>Nome, apelido, como preferir. Este espaço começa com você.</p>

        <div className={styles.nameField}>
          <label htmlFor="first-steps-nickname">Pode me chamar de</label>
          <input
            id="first-steps-nickname"
            name="nickname"
            type="text"
            value={nickname}
            maxLength={32}
            autoComplete="nickname"
            autoCapitalize="words"
            spellCheck={false}
            placeholder="Seu nome ou apelido"
            aria-describedby="nickname-hint"
            required
            onChange={(event) => onNicknameChange(event.target.value)}
          />
          <span id="nickname-hint" className={styles.fieldHint}>
            <span>Do seu jeito. Você pode mudar depois.</span>
            <span>{nickname.length}/32</span>
          </span>
        </div>

        <button type="submit" className={styles.primaryButton} disabled={!displayName}>
          Continuar <ArrowRight size={20} aria-hidden="true" />
        </button>
        <span className={styles.nextHint}>
          A seguir, vamos deixar o Capto com a sua cara.
        </span>
      </form>

      <div className={styles.nameVisual} aria-hidden="true">
        <div className={styles.nameCardBack} />
        <div className={styles.nameCard}>
          <span className={styles.cardTopline}>
            <span className={styles.cardDot} /> Seu espaço no Capto{" "}
            <ArrowUpRight size={17} />
          </span>
          <div className={styles.bigGreeting}>
            <span>Olá,</span>
            <strong data-placeholder={!displayName}>{previewName}.</strong>
          </div>
          <div className={styles.cardBottomline}>
            <span>
              Seu dinheiro.
              <br />
              Seu ritmo.
            </span>
            <span className={styles.nameInitial}>
              {displayName ? (
                displayName.slice(0, 1).toLocaleUpperCase("pt-BR")
              ) : (
                <ChartNoAxesColumnIncreasing size={26} />
              )}
            </span>
          </div>
        </div>
        <span className={styles.visualCaption}>
          Um começo que já tem a sua identidade.
        </span>
      </div>
    </motion.section>
  );
}
