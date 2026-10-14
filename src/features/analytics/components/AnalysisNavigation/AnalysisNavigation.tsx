import { Link } from "react-router-dom";
import {
  ANALYSIS_VIEWS,
  analysisPath,
  type AnalysisViewId,
} from "../../analysisViews";
import styles from "./AnalysisNavigation.module.css";

export default function AnalysisNavigation({
  selected,
}: {
  selected: AnalysisViewId;
}) {
  return (
    <nav className={styles.navigation} aria-label="Temas de análise">
      {ANALYSIS_VIEWS.map(({ id, label, icon: Icon, tone }) => (
        <Link
          key={id}
          to={analysisPath(id)}
          preventScrollReset
          aria-current={selected === id ? "page" : undefined}
          className={`${styles.option} ${styles[tone]}`}
        >
          <span className={styles.icon}>
            <Icon size={21} aria-hidden="true" />
          </span>
          <span className={styles.label}>{label}</span>
          <span className={styles.selection} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
