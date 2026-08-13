import { CalendarDays } from 'lucide-react';

import styles from './ActivitiesPresentation.module.css';

export function ActivitiesPresentation() {
  return (
    <div className="block lg:flex w-full lg:max-w-[1400px] mx-auto lg:mt-6 lg:px-8">
      <div className={`w-full lg:border rounded-b-[2rem] lg:rounded-3xl p-6 lg:p-10 shadow-md relative overflow-hidden z-20 ${styles.hero}`}>
        <div className={`absolute inset-0 opacity-20 ${styles.patternOverlay}`}></div>

        <div className="flex flex-col gap-2 relative z-10 lg:max-w-2xl text-center lg:text-left items-center lg:items-start">
          <span className={`text-xs font-semibold flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit border ${styles.badge}`}>
            <CalendarDays size={14} className="text-white" />
            Atividades
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm leading-tight">
              Vida Financeira
            </span>
          </div>
          <p className={`text-sm max-w-md font-medium leading-relaxed ${styles.caption}`}>
            Acompanhe suas transações e recorrências.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesPresentation;