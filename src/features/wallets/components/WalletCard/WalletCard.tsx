import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { WalletResponse } from '../../../../models/wallet/WalletResponse';
import { WalletVisual } from '../WalletVisual/WalletVisual';

import styles from './WalletCard.module.css';

interface Props {
  wallet: WalletResponse;
  onEdit: (wallet: WalletResponse) => void;
  onDelete: (wallet: WalletResponse) => void;
  onSelect?: (wallet: WalletResponse) => void;
  isPreview: boolean;
}

export const WalletCard: React.FC<Props> = ({ wallet, onEdit, onDelete, onSelect, isPreview = false }) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const close = () => setShowMenu(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showMenu]);

  const selectWallet = () => {
    if (!isPreview) onSelect?.(wallet);
  };

  return (
    <WalletVisual
      className={styles.card}
      onClick={selectWallet}
      onKeyDown={(event) => {
        if (!isPreview && (event.key === 'Enter' || event.key === ' ')) selectWallet();
      }}
      role="button"
      tabIndex={0}
      wallet={wallet}
    >
      {!isPreview && (
        <div className={styles.menu} onClick={(event) => event.stopPropagation()}>
          <button
            aria-expanded={showMenu}
            aria-label={`Ações da carteira ${wallet.name}`}
            className={styles.menuTrigger}
            onClick={() => setShowMenu(!showMenu)}
            type="button"
          >
            <MoreVertical aria-hidden="true" size={18} />
          </button>

          {showMenu && (
            <div className={styles.menuDropdown}>
              <button onClick={() => onEdit(wallet)} type="button">
                <Edit2 aria-hidden="true" size={14} /> Editar
              </button>
              <button className={styles.deleteAction} onClick={() => onDelete(wallet)} type="button">
                <Trash2 aria-hidden="true" size={14} /> Excluir
              </button>
            </div>
          )}
        </div>
      )}
    </WalletVisual>
  );
};
