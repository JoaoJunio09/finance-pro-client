import type { BankResponse } from '../../../models/bank/BankResponse';
import styles from './BankBrand.module.css';

export type BrandSize = 'sm' | 'md';

interface BankBrandProps {
  bank: BankResponse;
  size?: BrandSize;
}

const BRAND_LABEL: Record<string, string> = {
  Nubank: 'nubank', Bradesco: 'Bradesco', 'Banco do Brasil': 'BB',
  'Caixa Economica Federal': 'CAIXA', Santander: 'Santander', Inter: 'inter',
  'BTG Pactual': 'BTG', 'C6 Bank': 'C6', 'Banco Pan': 'pan',
  'Banco Original': 'original', 'Mercado Pago': 'Mercado Pago', PicPay: 'picpay',
  PagBank: 'PagBank', Neon: 'neon', Sicoob: 'sicoob', Sicredi: 'sicredi',
  'XP Investimentos': 'XP',
};

export function BankBrand({ bank, size = 'md' }: BankBrandProps) {
  const isItau = bank.name === 'Itau';
  const label = isItau ? 'Itaú' : (BRAND_LABEL[bank.name] ?? bank.name);

  return (
    <span
      className={`font-bold tracking-tight ${size === 'sm' ? 'text-[11px]' : 'text-base'} ${isItau ? styles.itauBrand : ''}`}
      style={isItau ? undefined : { color: bank.color }}
      aria-label={bank.name}
    >
      {label}
    </span>
  );
}

export default BankBrand;
