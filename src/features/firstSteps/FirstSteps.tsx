import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  Moon,
  Plus,
  Sun,
  WalletCards,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import FinancialProfileQuiz from "../financialProfileQuiz/FinancialProfileQuiz";
import FirstStepsProgress from "./FirstStepsProgress";
import styles from "./FirstSteps.module.css";

type Theme = "dark" | "light";

function ThemePreview({ name, theme }: { name: string; theme: Theme }) {
  return (
    <span className={styles.miniApp} data-preview-theme={theme} aria-hidden="true">
      <span className={styles.miniSidebar}>
        <ChartNoAxesColumnIncreasing size={17} className={styles.miniLogo} />
        <LayoutDashboard size={13} />
        <WalletCards size={13} />
        <span className={styles.miniSidebarLine} />
      </span>
      <span className={styles.miniContent}>
        <span className={styles.miniTopline}>
          <span>Seu painel</span>
          <span className={styles.miniAvatar}>{name.slice(0, 1).toLocaleUpperCase("pt-BR")}</span>
        </span>
        <span className={styles.miniGreeting}>Olá, {name}.</span>
        <span className={styles.miniSubheading}>Tudo começa com o primeiro passo.</span>
        <span className={styles.miniBalance}>
          <span>Saldo disponível</span>
          <strong>R$ 0,00</strong>
          <span className={styles.miniBalanceFooter}>Seu novo começo <ArrowUpRight size={12} /></span>
        </span>
        <span className={styles.miniCards}>
          <span><span className={styles.miniDot} /> Entradas <strong>R$ 0,00</strong></span>
          <span><span className={styles.miniDot} /> Saídas <strong>R$ 0,00</strong></span>
        </span>
        <span className={styles.miniAdd}><Plus size={12} /> Nova transação</span>
      </span>
    </span>
  );
}

export default function FirstSteps() {
  const { theme, setTheme } = useThemeContext();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState("");
  const reducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const displayName = nickname.trim().replace(/\s+/g, " ");
  const previewName = displayName || "seu nome";

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
      <FinancialProfileQuiz
        firstSteps={{ nickname: displayName, onBack: changeStep }}
      />
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
            <motion.section
              key="nickname"
              className={styles.nameStep}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <form className={styles.nameForm} onSubmit={submitNickname}>
                <span className={styles.eyebrow}>01 / Vamos nos conhecer</span>
                <h1>Como você gosta<br />de ser chamado?</h1>
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
                    onChange={(event) => setNickname(event.target.value)}
                  />
                  <span id="nickname-hint" className={styles.fieldHint}>
                    <span>Do seu jeito. Você pode mudar depois.</span>
                    <span>{nickname.length}/32</span>
                  </span>
                </div>

                <button type="submit" className={styles.primaryButton} disabled={!displayName}>
                  Continuar <ArrowRight size={20} aria-hidden="true" />
                </button>
                <span className={styles.nextHint}>A seguir, vamos deixar o Capto com a sua cara.</span>
              </form>

              <div className={styles.nameVisual} aria-hidden="true">
                <div className={styles.nameCardBack} />
                <div className={styles.nameCard}>
                  <span className={styles.cardTopline}><span className={styles.cardDot} /> Seu espaço no Capto <ArrowUpRight size={17} /></span>
                  <div className={styles.bigGreeting}>
                    <span>Olá,</span>
                    <strong data-placeholder={!displayName}>{previewName}.</strong>
                  </div>
                  <div className={styles.cardBottomline}>
                    <span>Seu dinheiro.<br />Seu ritmo.</span>
                    <span className={styles.nameInitial}>{displayName ? displayName.slice(0, 1).toLocaleUpperCase("pt-BR") : <ChartNoAxesColumnIncreasing size={26} />}</span>
                  </div>
                </div>
                <span className={styles.visualCaption}>Um começo que já tem a sua identidade.</span>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="theme"
              className={styles.themeStep}
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -10 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => headingRef.current?.focus({ preventScroll: true })}
            >
              <div className={styles.themeHeading}>
                <span className={styles.eyebrow}>02 / Seu ambiente</span>
                <h1 ref={headingRef} tabIndex={-1}>{displayName}, qual combina com você?</h1>
                <p>Mais luz ou menos luz? Escolha como quer ver o Capto.<br className={styles.desktopBreak} /> Pode experimentar agora e trocar quando quiser.</p>
              </div>

              <fieldset className={styles.themeChoices}>
                <legend className={styles.srOnly}>Escolha o tema do aplicativo</legend>
                {(["light", "dark"] as const).map((option) => {
                  const isSelected = theme === option;
                  const Icon = option === "light" ? Sun : Moon;
                  return (
                    <label className={styles.themeChoice} data-selected={isSelected} key={option}>
                      <input
                        type="radio"
                        name="app-theme"
                        value={option}
                        checked={isSelected}
                        onChange={() => setTheme(option)}
                      />
                      <ThemePreview name={displayName} theme={option} />
                      <span className={styles.choiceFooter}>
                        <span className={styles.choiceIcon}><Icon size={22} aria-hidden="true" /></span>
                        <span><strong>{option === "light" ? "Claro" : "Escuro"}</strong><span>{option === "light" ? "Leve, aberto e cheio de luz." : "Sóbrio, tranquilo e com contraste."}</span></span>
                        <span className={styles.choiceCheck} aria-hidden="true">{isSelected && <Check size={15} />}</span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              <div className={styles.themeActions}>
                <button type="button" className={styles.backButton} onClick={() => changeStep(0)}><ArrowLeft size={18} aria-hidden="true" /> Voltar</button>
                <button type="button" className={styles.primaryButton} onClick={() => changeStep(2)}>Continuar com tema {theme === "dark" ? "escuro" : "claro"}<ArrowRight size={20} aria-hidden="true" /></button>
              </div>
              <p className={styles.themeHint}>Por último, um retrato do seu momento financeiro. Você decide se responde agora.</p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
