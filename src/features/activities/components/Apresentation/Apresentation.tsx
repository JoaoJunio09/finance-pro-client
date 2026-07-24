import styles from './Apresentation.module.css';

export function Apresentation() {
  return (
    <header className={`flex flex-col md:flex-row items-center justify-between gap-8 py-6 mb-10 ${styles.headerPresentation}`}>
      
      <div className={`flex flex-col gap-2 max-w-2xl ${styles.presentationText}`}>
        <div className="flex items-center gap-2">
          <span className={styles.textTagPrimary}>FinancePro Intelligence</span>
          <span className={styles.metaSeparator}>•</span>
          <span className={styles.textTagMuted}>Atividades</span>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl tracking-tight ${styles.presentationTitle}`}>
          Atividades
        </h1>
        
        <p className={`text-sm sm:text-base ${styles.presentationSubtitle}`}>
          Acompanhe toda a sua movimentação financeira em um único lugar, de forma automatizada e com total inteligência visual.
        </p>
      </div>

      {/* Grafismo SVG Orbital Abstrato de Alta Performance */}
      <div className="flex-shrink-0 relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-success)" />
            </linearGradient>
          </defs>
          
          {/* Glow Central de Fundo */}
          <circle cx="100" cy="100" r="80" fill="url(#glow-grad)" className={styles.animatePulseSlow} />
          
          {/* Anel Orbitador 1 */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 6" className={styles.animateSpinSlow} />
          
          {/* Anel Orbitador 2 */}
          <ellipse cx="100" cy="100" rx="75" ry="30" fill="none" stroke="url(#orbit-grad-1)" strokeWidth="1.5" opacity="0.6" className={styles.animateOrbit} />
          
          {/* Nó de Informação Central */}
          <g className={styles.animateFloat}>
            <circle cx="100" cy="100" r="16" fill="var(--color-surface-elevated)" stroke="var(--color-primary)" strokeWidth="2" />
            <circle cx="100" cy="100" r="8" fill="var(--color-success)" />
          </g>
          
          {/* Partículas Orbitantes */}
          <circle cx="160" cy="100" r="4" fill="var(--color-primary)" className={styles.animatePulse} />
          <circle cx="40" cy="100" r="3.5" fill="var(--color-success)" />
          <circle cx="100" cy="40" r="5" fill="var(--color-warning)" />
        </svg>
      </div>

    </header>
  );
}

export default Apresentation;