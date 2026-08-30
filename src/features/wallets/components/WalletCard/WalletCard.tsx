import { Building2, Edit2, MoreVertical, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { formatActivityCurrency } from '../../../activities/utils/activityFormatters';

import styles from './WalletCard.module.css';

interface Props {
  wallet: WalletResponse;
  onEdit: (wallet: WalletResponse) => void;
  onDelete: (wallet: WalletResponse) => void;
  isPreview: boolean;
}

export const WalletCard: React.FC<Props> = ({ wallet, onEdit, onDelete, isPreview = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const colorStyle = wallet.bank ? wallet.bank?.gradient : wallet.color;

  useEffect(() => {
    if (showMenu) {
      const close = () => setShowMenu(false);
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [showMenu]);

  return (
    <div
      className={`
        relative rounded-2xl p-5 flex flex-col justify-between h-48 group overflow-hidden border ${styles.card}
      `}
      style={{
        background: colorStyle
      }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 ${styles.abstractBg}`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center border border-white/10">
            <Building2 size={20} color='#f2f2f2' />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base leading-tight truncate max-w-[140px] sm:max-w-[180px] text-white">{wallet.name}</h3>
            <p className="text-xs opacity-80 font-medium truncate text-white">{wallet.bank?.name}</p>
          </div>
        </div>

        {!isPreview && (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowMenu(!showMenu)} className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10">
              <MoreVertical size={18} color='#f2f2f2' />
            </button>
            
            {showMenu && (
              <div className={`absolute right-0 top-10 w-36 rounded-xl shadow-xl overflow-hidden z-20 ${styles.menuDropdown}`}>
                <button onClick={() => onEdit(wallet)} className="w-full text-left px-4 py-2.5 text-sm text-[var(--text-main)] hover:bg-[var(--bg-elevated)] flex items-center gap-2">
                  <Edit2 size={14} /> Editar
                </button>
                <button onClick={() => onDelete(wallet)} className="w-full text-left px-4 py-2.5 text-sm text-[var(--expense)] hover:bg-[var(--expense-muted)] flex items-center gap-2">
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-auto flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold opacity-75 mb-1 uppercase tracking-wider text-white">Saldo</p>
          <p className="text-2xl font-bold tracking-tight drop-shadow-md text-white">{formatActivityCurrency(wallet.balance)}</p>
        </div>
      </div>
    </div>
  );
};