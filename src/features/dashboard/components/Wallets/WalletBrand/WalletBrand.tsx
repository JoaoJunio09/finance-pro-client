import { Wallet } from 'lucide-react';

import styles from './../Wallets.module.css';

export type WalletIconType =
  | 'Nubank'
  | 'Itau'
  | 'Bradesco'
  | 'Banco do Brasil'
  | 'Caixa Economica Federal'
  | 'Santander'
  | 'Inter'
  | 'BTG Pactual'
  | 'C6 Bank'
  | 'Banco Pan'
  | 'Banco Original'
  | 'Mercado Pago'
  | 'PicPay'
  | 'PagBank'
  | 'Neon'
  | 'Sicoob'
  | 'Sicredi'
  | 'XP Investimentos'
  | 'Manual';

interface WalletBrandMarkProps {
  // aceita os nomes conhecidos, mas não quebra se vier algo fora da lista
  icon: WalletIconType | (string & {});
}

// Wordmarks "sólidos": uma cor só, sem pill/split
const SOLID_WORDMARKS: Partial<Record<WalletIconType, { label: string; className: string }>> = {
  'Nubank': { label: 'nubank', className: styles.nubankBrand },
  'Bradesco': { label: 'Bradesco', className: styles.bradescoBrand },
  'Santander': { label: 'Santander', className: styles.santanderBrand },
  'Inter': { label: 'inter', className: styles.interBrand },
  'Banco Original': { label: 'original', className: styles.originalBrand },
  'PicPay': { label: 'picpay', className: styles.picpayBrand },
  'PagBank': { label: 'PagBank', className: styles.pagbankBrand },
  'Neon': { label: 'neon', className: styles.neonBrand },
  'Sicredi': { label: 'sicredi', className: styles.sicrediBrand },
  'Sicoob': { label: 'sicoob', className: styles.sicoobBrand },
  'BTG Pactual': { label: 'BTG Pactual', className: styles.btgBrand },
};

export function WalletBrandMark({ icon }: WalletBrandMarkProps) {
  const solid = SOLID_WORDMARKS[icon as WalletIconType];
  if (solid) {
    return (
      <span className={`font-bold tracking-tight text-lg ${solid.className}`}>
        {solid.label}
      </span>
    );
  }

  if (icon === 'Itau') {
    return (
      <span className={`font-bold tracking-tighter text-xl px-1 rounded-sm ${styles.itauBrand}`}>
        Itaú
      </span>
    );
  }

  if (icon === 'Banco do Brasil') {
    return (
      <span className={`font-extrabold tracking-tight text-lg px-1.5 py-0.5 rounded-sm ${styles.bbBrand}`}>
        BB
      </span>
    );
  }

  if (icon === 'Caixa Economica Federal') {
    return (
      <span className={`inline-flex items-center gap-1 font-extrabold tracking-tight text-lg ${styles.caixaBrand}`}>
        CAIXA
        <span className={styles.caixaDot} />
      </span>
    );
  }

  if (icon === 'Banco Pan') {
    return (
      <span className="font-bold tracking-tight text-lg">
        <span className={styles.panBanco}>banco</span>
        <span className={styles.panPan}>pan</span>
      </span>
    );
  }

  if (icon === 'Mercado Pago') {
    return (
      <span className="font-bold tracking-tight text-base leading-none">
        <span className={styles.mpMercado}>Mercado</span>
        <span className={styles.mpPago}>Pago</span>
      </span>
    );
  }

  if (icon === 'C6 Bank') {
    return (
      <span className={`font-extrabold tracking-tight text-lg px-1.5 py-0.5 rounded-sm ${styles.c6Brand}`}>
        C6
      </span>
    );
  }

  if (icon === 'XP Investimentos') {
    return (
      <span className={`font-extrabold tracking-tight text-lg px-1.5 py-0.5 rounded-sm ${styles.xpBrand}`}>
        XP
      </span>
    );
  }

  if (icon === 'Manual') {
    return (
      <div className={`flex items-center gap-1.5 ${styles.physicalWalletLabel}`}>
        <Wallet size={18} />
        <span className="font-semibold text-sm">Físico</span>
      </div>
    );
  }

  // fallback: qualquer valor não mapeado (banco novo ainda não estilizado, etc.)
  return (
    <div className={`flex items-center gap-1.5 ${styles.physicalWalletLabel}`}>
      <Wallet size={18} />
      <span className="font-semibold text-sm">{icon || 'Carteira'}</span>
    </div>
  );
}

export default WalletBrandMark;