import {
  Banknote,
  CalendarDays,
  CreditCard,
  Landmark,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import type { InvoiceResponse } from '../../../../models/invoice/InvoiceResponse';
import { getCurrentInvoice } from '../../../../utils/invoices';
import { formatActivityCurrency } from '../../../activities/utils/activityFormatters';
import WalletBrand from '../../../../components/shared/WalletBrand/WalletBrand';

import styles from './WalletVisual.module.css';

type WalletVisualSize = 'default' | 'large' | 'compact';

interface WalletVisualProps extends HTMLAttributes<HTMLDivElement> {
  wallet: WalletResponse;
  size?: WalletVisualSize;
  invoice?: InvoiceResponse;
  children?: ReactNode;
}

const walletPresentation = {
  CHECKING: { label: 'Conta', icon: Landmark, className: styles.account },
  SAVING: { label: 'Poupança', icon: PiggyBank, className: styles.savings },
  CREDIT_CARD: { label: 'Cartão de crédito', icon: CreditCard, className: styles.creditCard },
  RESERVE: { label: 'Reserva de emergência', icon: ShieldCheck, className: styles.reserve },
  INVESTMENTS: { label: 'Investimentos', icon: TrendingUp, className: styles.investments },
  PHYSICAL: { label: 'Dinheiro físico', icon: Banknote, className: styles.physical },
  OTHER: { label: 'Carteira', icon: WalletCards, className: styles.account },
} as const;

function formatCardDigits(cardDigits: string) {
  const digits = (cardDigits ?? '').replace(/\D/g, '');

  if (!digits) return '••••  ••••  ••••  ••••';

  return `••••  ••••  ••••  ${digits.slice(-4).padStart(4, '•')}`;
}

function formatCardDate(date: string | null | undefined) {
  if (!date) return '—';

  const [, month, day] = date.split('-');
  return `${day}/${month}`;
}

export function WalletVisual({ wallet, invoice, size = 'default', className, children, style, ...props }: WalletVisualProps) {
  const presentation = walletPresentation[wallet.type];
  const Icon = presentation.icon;
  const isCreditCard = wallet.type === 'CREDIT_CARD';
  const isCompact = size === 'compact';
  const selectedInvoice = invoice ?? getCurrentInvoice(wallet.invoices ?? []);
  const amount = isCreditCard ? selectedInvoice?.limit : wallet.balance;
  const amountLabel = amount == null ? '—' : formatActivityCurrency(amount);
  const usesInstitutionBrand = Boolean(wallet.bank)
    && wallet.type !== 'PHYSICAL'
    && wallet.type !== 'OTHER';
  const walletBackground = usesInstitutionBrand
    ? wallet.bank?.gradient || wallet.color
    : wallet.color;
  const walletStyle = walletBackground
    ? { ...style, background: walletBackground }
    : style;

  return (
    <div
      {...props}
      className={[styles.walletVisual, styles[size], presentation.className, className].filter(Boolean).join(' ')}
      style={walletStyle}
    >
      <div className={styles.texture} aria-hidden="true" />
      {wallet.type === 'PHYSICAL' && <div className={styles.walletFold} aria-hidden="true" />}
      {wallet.type === 'INVESTMENTS' && <div className={styles.marketLine} aria-hidden="true" />}
      {wallet.type === 'RESERVE' && <div className={styles.reserveRing} aria-hidden="true" />}

      <div className={styles.topRow}>
        <div className={styles.identity}>
          <span className={styles.iconWrap}><Icon aria-hidden="true" size={isCompact ? 16 : 19} /></span>
          <div className={styles.identityText}>
            <p>{presentation.label}</p>
            <h3>{wallet.name}</h3>
          </div>
        </div>
        {children && <div className={styles.actions}>{children}</div>}
      </div>

      {isCreditCard && !isCompact && (
        <div className={styles.cardChip} aria-hidden="true"><span /><span /><span /></div>
      )}

      {!isCompact && (
        <div className={styles.bottomRow}>
          <div>
            <p className={styles.balanceLabel}>{isCreditCard ? 'Limite da fatura' : 'Saldo disponível'}</p>
            <strong>{amountLabel}</strong>
          </div>

          {isCreditCard ? (
            <span className={styles.cardDigits}>{formatCardDigits(wallet.cardDigits)}</span>
          ) : (
            <p className={styles.institution}><WalletBrand wallet={wallet} size="sm" /></p>
          )}
        </div>
      )}

      {isCompact && <p className={styles.compactBalance}>{amountLabel}</p>}

      {isCreditCard && (
        <div className={styles.cardDates}>
          <div className={styles.cardDate}>
            <span><CalendarDays aria-hidden="true" size={13} /> Fechamento</span>
            <strong>{formatCardDate(selectedInvoice?.closingDate)}</strong>
          </div>
          <div className={styles.cardDate}>
            <span><CalendarDays aria-hidden="true" size={13} /> Vencimento</span>
            <strong>{formatCardDate(selectedInvoice?.expirationDate)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
