import { Link } from "react-router-dom";
import styles from "./TransactionViewNavigation.module.css";
import { TRANSACTION_VIEWS } from "../../transactionViews";

export default function TransactionViewNavigation({
  selected,
}: {
  selected: string;
}) {
  return (
    <nav className={styles.navigation} aria-label="Visualização das transações">
      {TRANSACTION_VIEWS.map(({ id, label, icon: Icon }) => (
        <Link
          key={id}
          to={`/vida-financeira/transacoes/${id}`}
          className={styles.link}
          aria-current={selected === id ? "page" : undefined}
        >
          <Icon size={16} aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}