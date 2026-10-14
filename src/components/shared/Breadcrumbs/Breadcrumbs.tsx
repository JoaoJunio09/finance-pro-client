import { Slash } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getNavigationTrail } from "./navigationTrail";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const items = getNavigationTrail(pathname);
  if (!items.length) return null;

  return (
    <nav className={styles.trail} aria-label="Caminho de navegação">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index > 0 && (
              <Slash
                size={12}
                className={styles.separator}
                aria-hidden="true"
              />
            )}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
