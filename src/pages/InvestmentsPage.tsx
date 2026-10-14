import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell/AppShell";
import styles from "../features/financialLife/FinancialLife.module.css";

export default function InvestmentsPage() {
  return (
    <AppShell>
      <main className={styles.content}>
        <section className={styles.placeholder}>
          <TrendingUp size={42} aria-hidden="true" />
          <h1>Investimentos</h1>
          <p>
            Este espaço estará disponível em breve. Por enquanto, você pode
            acompanhar suas contas e reservas em Cartões / Carteiras.
          </p>
          <Link to="/carteiras">Ver cartões e carteiras</Link>
        </section>
      </main>
    </AppShell>
  );
}
