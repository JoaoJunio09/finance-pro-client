import styles from '../components/TransactionsTimeline/TransactionsTimeline.module.css';

export function renderWalletBadge(
	gradient: string | null,
	color: string | null,
	walletName: string
) {
	return <span
		className={`${styles.walletBadge}`}
		style={{
			background: gradient !== null ? gradient : 'rgba(139, 92, 246, 0.04)',
			color: color !== null ? color : 'var(--color-foreground-muted)',
			border: color ? `1px solid ${color}` : '1px solid var(--border-subtle)'
		}}
	>
		{walletName}
	</span>;
}