import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell/AppShell";
import styles from "../features/financialLife/FinancialLife.module.css";

export default function FinancialEducationPage() {
  return (
    <AppShell>
      <main className={styles.content}>
        <section className={styles.placeholder}>
          <BookOpen size={42} aria-hidden="true" />
          <h1>Educação Financeira</h1>
          <p>
            Este espaço será implementado em breve, com conteúdos para aprender
            sobre finanças pessoais. Enquanto isso, você pode explorar os
            registros e as análises da sua vida financeira.
          </p>
          <Link to="/vida-financeira">Ver minha vida financeira</Link>
        </section>
      </main>
    </AppShell>
  );
}
