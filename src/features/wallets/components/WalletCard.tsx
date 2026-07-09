import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import type { WalletResponse } from "../../../models/wallet/WalletResponse";
import { Pencil, Trash2, Wallet } from "lucide-react";
import { formatCurrencyLabel } from "../../../utils/FormatCurrency";

const getDisplayDigits = (digits: string | null,) => {
  if (!digits || digits === null) return '•••• •••• •••• ••••';
  return `•••• •••• •••• ${digits}`;
};

interface WalletCardProps {
	wallet: WalletResponse;
	onClick?: (wallet: WalletResponse) => void;
	onEdit?: (wallet: WalletResponse) => void;
}

function WalletCard({ 
  wallet,
	onClick,
	onEdit
}: WalletCardProps) {
	const isPreview = !onEdit && !onClick;

  return (
    <div 
      onClick={() => onClick && wallet.id !== '' && onClick(wallet)}
      className={`
        relative overflow-hidden w-full rounded-[20px] aspect-[1.586] transition-all duration-200 ease-out group select-none cursor-pointer hover:-translate-y-1
      `}
      style={{ 
        background: wallet.bank && wallet.bank.gradient ? wallet.bank.gradient : '#09090B',
        boxShadow: wallet.bank && wallet.bank.shadow ? `0 8px 32px ${wallet.bank.shadow}` : 'none',
        border: (wallet.bank && wallet.bank.name === 'C6 Bank') || !wallet.bank ? '1px solid rgba(255,255,255,0.15)' : 'none'
      }}
    >
      {/* Camada 1: Geometria (Decoração) */}
      <div className="absolute top-[-30%] right-[-30%] w-[150%] aspect-square rounded-full border border-white/15 pointer-events-none" />
      <div className="absolute bottom-[-40%] left-[-20%] w-[80%] aspect-square rounded-full border border-white/15 pointer-events-none" />

      {/* Camada 2: Chip */}
      <div
				className="absolute top-[22%] left-[8%] w-[36px] h-[28px] rounded-[5px] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #E8CC8E, #C9A84C)' }}
			>
        <div className="w-full h-[1px] bg-black/20 absolute" />
        <div className="w-[1px] h-full bg-black/20 absolute" />
      </div>

      {/* Camada 3: Logo/Ícone */}
      <div className="absolute top-[14px] right-[16px] text-white/90">
        {wallet.bank ? (
          <DynamicIcon name={wallet.bank.icon as IconName} size={isPreview ? 24 : 28} strokeWidth={1.5} />
        ) : (
          <Wallet size={isPreview ? 24 : 28} strokeWidth={1.5} />
        )}
				
      </div>

      {/* Camada 4: Número do cartão */}
      <div
				className="absolute bottom-[38%] left-[8%] font-['Outfit'] font-medium tracking-[0.18em] text-white/80"
        style={{ fontSize: isPreview ? '12px' : '14px' }}
			>
        {getDisplayDigits(wallet.cardDigits)}
      </div>

      {/* Camada 5: Nome */}
      <div
				className="absolute bottom-[16%] left-[8%] font-['Inter'] font-semibold text-white truncate max-w-[50%]"
        style={{ fontSize: isPreview ? '11px' : '13px' }}
			>
        {wallet.name || 'Nova Carteira'}
      </div>

      {/* Camada 6: Saldo */}
      <div className="absolute bottom-[14%] right-[8%] text-right">
        <div className="font-['Inter'] uppercase text-white/60 tracking-wider mb-0.5" style={{ fontSize: isPreview ? '8px' : '10px' }}>
          Saldo
        </div>
        <div className="font-['Outfit'] font-bold tabular-nums text-white" style={{ fontSize: isPreview ? '14px' : '16px' }}>
          {formatCurrencyLabel(wallet.balance || 0)}
        </div>
      </div>

      {/* Camada 7: Ações (Hover) */}
      {wallet.id && (
        <div className="absolute top-[12px] left-[12px] flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button 
            // onClick={(e) => { e.stopPropagation(); onEdit(wallet); }}
            className="w-[28px] h-[28px] rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <Pencil size={12} className="text-white" />
          </button>
          <button 
            // onClick={(e) => { e.stopPropagation(); onDelete(wallet.id!); }}
            className="w-[28px] h-[28px] rounded-lg bg-[#F8717140] hover:bg-[#F8717166] flex items-center justify-center transition-colors"
          >
            <Trash2 size={12} className="text-[#F87171]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletCard;