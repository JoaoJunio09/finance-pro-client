import { Plus } from "lucide-react";
import styles from "./FinancePage.module.css";

export default function FinancePageAction({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.addButton} onClick={onClick}>
      <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}