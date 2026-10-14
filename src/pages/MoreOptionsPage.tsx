import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AppShell from "../components/layout/AppShell/AppShell";
import { MORE_OPTION_GROUPS } from "../components/layout/Navigation/moreOptions";
import styles from "./MoreOptionsPage.module.css";

export default function MoreOptionsPage() {
  return (
    <AppShell>
      <main
        className={`${styles.page} mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10`}
      >
        <section className={styles.intro}>
          <div className={styles.introCopy}>
            <h1>
              Mais opções<span>.</span>
            </h1>
            <p>
              Encontre ferramentas para cuidar dos detalhes da sua vida
              financeira.
            </p>
          </div>
          <div className={styles.introArt} aria-hidden="true">
            <div className={styles.artOrbit}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.artCoin}>c</div>
          </div>
        </section>
        <div className={styles.groups}>
          {MORE_OPTION_GROUPS.map((group, index) => (
            <section
              key={group.title}
              className={styles.group}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className={styles.groupHeading}>
                <span className={styles.groupIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{group.title}</h2>
              </div>
              <div className={styles.optionGrid}>
                {group.items.map(
                  ({ label, detail, path, icon: Icon, tone }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`${styles.optionCard} ${styles[tone]}`}
                    >
                      <span className={styles.optionIcon}>
                        <Icon size={21} aria-hidden="true" />
                      </span>
                      <span className={styles.optionCopy}>
                        <strong>{label}</strong>
                        <small>{detail}</small>
                      </span>
                      <ArrowUpRight
                        size={17}
                        className={styles.optionArrow}
                        aria-hidden="true"
                      />
                    </Link>
                  )
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
