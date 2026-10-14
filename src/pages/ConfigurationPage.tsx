import { CircleUserRound, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell/AppShell";
import { BackButton } from "../components/ui/BackButton/BackButton";
import { useAuthContext } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import styles from "../features/financialLife/FinancialLife.module.css";

export default function Settings() {
  const { fullName, username, logout } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();
  return (
    <AppShell>
      <main className={styles.content}>
        <BackButton
          label="Voltar ao início"
          onClick={() => navigate("/dashboard")}
        />
        <div className={styles.pageHeading}>
          <h1>Configurações da conta</h1>
          <p>Escolha como você quer usar o Capto.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <CircleUserRound
              size={29}
              className="mb-4 text-[var(--accent)]"
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold">{fullName || username}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">@{username}</p>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/", { replace: true });
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] px-4 py-3 text-sm font-semibold"
            >
              <LogOut size={17} aria-hidden="true" />
              Sair da conta
            </button>
          </section>
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6">
            <h2 className="text-xl font-bold">Aparência</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              A preferência fica salva neste dispositivo.
            </p>
            <div
              className="mt-6 flex flex-wrap gap-3"
              role="group"
              aria-label="Tema do aplicativo"
            >
              {[
                { id: "light" as const, label: "Claro", icon: Sun },
                { id: "dark" as const, label: "Escuro", icon: Moon },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={theme === id}
                  onClick={() => setTheme(id)}
                  className={styles.tab}
                  style={
                    theme === id
                      ? {
                          color: "var(--accent)",
                          background: "var(--accent-muted)",
                        }
                      : undefined
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
