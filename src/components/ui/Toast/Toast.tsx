import { AlertTriangle, CheckCircle2, Info, TrendingUp, X, XCircle, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'finance';

interface ToastProps {
  title: string,
  message: string,
  type: ToastType,
  duration?: number
}

// Cada tipo mapeia direto para uma classe do module.css (styles.success, styles.error...)
// que define as variáveis --toast-color e --toast-bg-icon consumidas pelos filhos
const TOAST_ICON: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  finance: TrendingUp,
};

function Toast({
  t,
  title,
  message,
  type
}: {
  t: any,
  title: string,
  message: string,
  type: ToastType
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const IconComponent = TOAST_ICON[type];
  const isActive = mounted && t.visible;
  const duration = t.duration ?? 4000;

  return (
    <div
      style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
      className={`${styles.toast} ${styles[type]} ${isActive ? styles.visible : styles.hidden}`}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.iconWrap}>
            <IconComponent size={16} className={styles.icon} />
          </div>
          <div className={styles.textWrap}>
            <p className={styles.title}>{title}</p>
            <p className={styles.message}>{message}</p>
          </div>
        </div>

        <button type="button" onClick={() => toast.dismiss(t.id)} className={styles.closeBtn}>
          <X size={14} />
        </button>

        <div className={styles.sidebar} />
        <div className={`${styles.progressFill} ${isActive ? '' : styles.paused}`} />
      </div>
    </div>
  )
}

function showToast({ title, message, type, duration }: ToastProps) {
  toast.custom(
    (t) => <Toast t={t} title={title} message={message} type={type} />,
    { duration }
  );
}

export default showToast;