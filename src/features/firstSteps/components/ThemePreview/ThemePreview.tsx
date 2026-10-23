import {
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  Plus,
  WalletCards,
} from "lucide-react";
import type { ThemeName } from "../../../../context/ThemeContext";
import { themePreview } from "../../mocks/themePreview";
import styles from "../../FirstSteps.module.css";

export default function ThemePreview({
  name,
  theme,
}: {
  name: string;
  theme: ThemeName;
}) {
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
          <span className={styles.miniAvatar}>
            {name.slice(0, 1).toLocaleUpperCase("pt-BR")}
          </span>
        </span>
        <span className={styles.miniGreeting}>Olá, {name}.</span>
        <span className={styles.miniSubheading}>Tudo começa com o primeiro passo.</span>
        <span className={styles.miniBalance}>
          <span>Saldo disponível</span>
          <strong>{themePreview.balance}</strong>
          <span className={styles.miniBalanceFooter}>
            Seu novo começo <ArrowUpRight size={12} />
          </span>
        </span>
        <span className={styles.miniCards}>
          {themePreview.metrics.map((metric) => (
            <span key={metric.label}>
              <span className={styles.miniDot} /> {metric.label}{" "}
              <strong>{metric.value}</strong>
            </span>
          ))}
        </span>
        <span className={styles.miniAdd}>
          <Plus size={12} /> Nova transação
        </span>
      </span>
    </span>
  );
}
