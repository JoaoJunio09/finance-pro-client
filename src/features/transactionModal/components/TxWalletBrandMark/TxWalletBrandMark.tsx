import { CircleDollarSign } from 'lucide-react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';

import type { BankResponse } from '../../../../models/bank/BankResponse';
import styles from './TxWalletBrandMark.module.css';

type BrandMarkSize = 'sm' | 'md';

interface TxWalletBrandMarkProps {
  bank?: BankResponse;
  wallet?: WalletResponse;
  size?: BrandMarkSize;
}

// Rótulo exibido para cada banco. Cobre os 18 bancos do sistema.
// Onde a identidade visual difere do nome salvo (case, abreviação), ajusta aqui.
const BRAND_LABEL: Record<string, string> = {
  'Nubank': 'nubank',
  'Bradesco': 'Bradesco',
  'Banco do Brasil': 'BB',
  'Caixa Economica Federal': 'CAIXA',
  'Santander': 'Santander',
  'Inter': 'inter',
  'BTG Pactual': 'BTG',
  'C6 Bank': 'C6',
  'Banco Pan': 'pan',
  'Banco Original': 'original',
  'Mercado Pago': 'Mercado Pago',
  'PicPay': 'picpay',
  'PagBank': 'PagBank',
  'Neon': 'neon',
  'Sicoob': 'sicoob',
  'Sicredi': 'sicredi',
  'XP Investimentos': 'XP',
  // 'Itau' fica de fora de propósito: tem tratamento especial abaixo (duas cores)
};

const sizeTextClass: Record<BrandMarkSize, string> = {
  sm: 'text-[11px]',
  md: 'text-base',
};

const itauSizeTextClass: Record<BrandMarkSize, string> = {
  sm: 'text-[10px]',
  md: 'text-lg',
};

function ManualWalletMark({ wallet, size }: { wallet: WalletResponse | undefined; size: BrandMarkSize }) {
  if (size === 'sm') {
    return <span className={styles.bankNameDefault}>{wallet?.name}</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <CircleDollarSign size={18} color='green' />
      <span className={`font-medium text-sm ${styles.bankNameDefault}`}>{wallet?.name}</span>
    </div>
  );
}

function BankBrandMark({ bank, wallet, size = 'md' }: TxWalletBrandMarkProps) {
  // Carteira manual: sem banco vinculado, ou banco explicitamente "Manual"
  if (!bank) {
    return <ManualWalletMark wallet={wallet} size={size} />;
  }

  // Itaú: único caso com tratamento especial (pill laranja + texto azul),
  // pois usa duas cores e não dá pra derivar isso de uma única bank.color
  if (bank.name === 'Itau') {
    return (
      <span className={`font-bold tracking-tighter px-1 rounded-sm ${itauSizeTextClass[size]} ${styles.itauBrand}`}>
        Itaú
      </span>
    );
  }

  // Qualquer outro banco vindo do backend: wordmark de uma cor só,
  // usando a cor cadastrada no próprio banco
  const label = BRAND_LABEL[bank.name] ?? bank.name;
  return (
    <span className={`font-bold tracking-tight ${sizeTextClass[size]}`} style={{ color: bank.color }}>
      {label}
    </span>
  );
}

export default BankBrandMark;