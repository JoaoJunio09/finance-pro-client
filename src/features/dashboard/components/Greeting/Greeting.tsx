import { CalendarDays, Eye, EyeOff } from "lucide-react";
import styles from "./Greeting.module.css";

interface GreetingProps {
  userName: string;
  showBalance: boolean;
  onToggleBalance: () => void;
}

function getGreeting(hour: number) {
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function Greeting({
  userName,
  showBalance,
  onToggleBalance,
}: GreetingProps) {
  const now = new Date();
  const firstName = userName.trim().split(/\s+/)[0];
  const dateLabel = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className={styles.header}>
      <div className={styles.heading}>
        <span className={styles.eyebrow}>Início</span>
        <h1>
          {getGreeting(now.getHours())}
          {firstName ? `, ${firstName}` : ""}
        </h1>
      </div>

      <div className={styles.controls}>
        <div className={styles.date}>
          <span className={styles.dateIcon}>
            <CalendarDays size={16} aria-hidden="true" />
          </span>
          <span>{dateLabel}</span>
        </div>
        <button
          className={styles.toggleBtn}
          onClick={onToggleBalance}
          title={showBalance ? "Ocultar valores" : "Mostrar valores"}
          aria-label={showBalance ? "Ocultar valores" : "Mostrar valores"}
          type="button"
        >
          {showBalance ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Greeting;
