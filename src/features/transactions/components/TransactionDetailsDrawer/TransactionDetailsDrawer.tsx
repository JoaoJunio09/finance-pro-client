import { ArrowUpDown, Building2, Calendar, CheckCircle2, Edit2, FileText, Repeat, Trash2, Wallet, X } from 'lucide-react';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { useEffect, useState } from 'react';
import type { TransactionResponse } from '../../../../models/transaction/TransactionResponse';
import { formatRelativeDateTime } from '../../../../utils/FormatDate';
import BankBrandMark from '../../../transactionModal/components/TxWalletBrandMark/TxWalletBrandMark';
import { formatCurrency } from '../../utils/transactionUtils';
import styles from './TransactionDetailsDrawer.module.css';

interface TransactionDetailsDrawerProps {
  transaction: TransactionResponse | null;
  onClose: () => void;
  onEdit: (tx: TransactionResponse) => void;
  onDelete: (tx: TransactionResponse) => void;
}

export const TransactionDetailsDrawer = ({
  transaction,
  onClose,
  onEdit,
  onDelete
}: TransactionDetailsDrawerProps) => {
  const [visibleTx, setVisibleTx] = useState<TransactionResponse | null>(transaction);
  const [isVisible, setIsVisible] = useState(false);

  // Gerencia o atraso para permitir a animação de saída antes de desmontar os dados
  useEffect(() => {
    if (transaction) {
      setVisibleTx(transaction);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setVisibleTx(null), 300);
      return () => clearTimeout(timer);
    }
  }, [transaction]);

  if (!visibleTx) return null;
  const isIncome = visibleTx.type === 'CREDIT';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles.overlay} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`relative w-full lg:h-full h-[92vh] overflow-auto sm:max-w-[450px] shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:border-l ${styles.drawerPanel} ${
        isVisible 
          ? 'translate-y-0 translate-x-0' 
          : 'translate-y-full translate-x-0 sm:translate-y-0 sm:translate-x-full'
      }`}>
        
        {/* Header - Apenas para fechar */}
        <div className="flex items-center justify-between p-4 md:p-6 pb-2 shrink-0 relative">
          <div className="flex-1" />
          <button 
            onClick={onClose}
            className={`p-2 rounded-xl relative z-10 ${styles.closeBtn}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content (Recibo / Detalhes) */}
        <div className="p-6 pt-2 flex-1 flex flex-col gap-6 overflow-y-auto">
          
          {/* Topo / Hero */}
          <div className="flex flex-col items-center text-center">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 mb-4 shadow-sm"
              style={{ backgroundColor: transaction?.category.color, color: '#fff' }}
            >
              <DynamicIcon name={transaction?.category.icon as IconName} size={30} strokeWidth={2.2} />
            </div>
            
            <h3 className={`text-2xl md:text-3xl font-extrabold leading-tight mb-1.5 px-4 ${styles.textMain}`}>
              {visibleTx.description}
            </h3>
            
            <span className={`text-[13px] font-semibold uppercase tracking-wide mb-5 ${styles.textMuted}`}>
              {transaction?.category.name}
            </span>
            
            <div className={`text-4xl md:text-5xl font-black tracking-tight ${isIncome ? styles.textIncome : styles.textMain}`}>
              {isIncome ? '+ ' : '- '}{formatCurrency(visibleTx.amount)}
            </div>
          </div>

          {/* Lista de Atributos Detalhados */}
          <div className={`border rounded-2xl p-5 flex flex-col gap-4 text-[14px] ${styles.bgElevated} ${styles.borderLight}`}>
            
            {/* Data */}
            <div className={`flex items-center justify-between pb-4 border-b ${styles.borderLight}`}>
              <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                <Calendar size={18} /> Data da Transação
              </span>
              <span className={`font-semibold ${styles.textMain}`}>
                {formatRelativeDateTime(visibleTx.registeredAt)}
              </span>
            </div>

            {/* Tipo */}
            <div className={`flex items-center justify-between pb-4 border-b ${styles.borderLight}`}>
              <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                <ArrowUpDown size={18} /> Tipo
              </span>
              <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider ${isIncome ? styles.badgeIncome : styles.badgeExpense}`}>
                {isIncome ? 'Receita' : 'Despesa'}
              </span>
            </div>

            {/* Status */}
            <div className={`flex items-center justify-between pb-4 border-b ${styles.borderLight}`}>
              <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                <CheckCircle2 size={18} /> Status
              </span>
              <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] uppercase tracking-wider ${visibleTx.status === 'COMPLETED' ? styles.badgeIncome : styles.badgeWarning}`}>
                {visibleTx.status === 'COMPLETED' ? 'Paga / Efetivada' : 'Pendente'}
              </span>
            </div>

            {/* Carteira */}
            <div className={`flex items-center justify-between gap-4 pb-4 border-b ${styles.borderLight}`}>
              <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                <Wallet size={18} /> Carteira
              </span>
              <span className={`font-semibold truncate ${styles.textMain}`}>
                {transaction?.wallet.bank ? (
                  <BankBrandMark bank={transaction?.wallet.bank} />
                ) : (
                  <BankBrandMark wallet={transaction?.wallet} />
                )}
              </span>
            </div>

            {/* Instituição */}
            {transaction?.recurrenceId && (
              <div className={`flex items-center justify-between pb-4 border-b ${styles.borderLight}`}>
                <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                  <Building2 size={18} /> Instituição / Banco
                </span>
                <span className={`font-semibold flex items-center gap-2 ${styles.textMain}`}>
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: transaction?.wallet.bank?.gradient }} />
                  {transaction?.wallet.bank?.name}
                </span>
              </div>
            )}

            {/* Recorrência */}
            <div className="flex items-center justify-between">
              <span className={`flex items-center gap-2.5 font-medium ${styles.textMuted}`}>
                <Repeat size={18} /> Recorrência
              </span>
              <span className={`font-semibold ${styles.textMain}`}>
                {visibleTx.recurrenceId ? 'Sim (Recorrente)' : 'Não (Pagamento Único)'}
              </span>
            </div>

          </div>

          {/* Observações */}
          {visibleTx.observation && (
            <div className={`border rounded-2xl p-5 ${styles.bgElevated} ${styles.borderLight}`}>
              <span className={`text-xs font-bold flex items-center gap-2 mb-2 uppercase tracking-wide ${styles.textMuted}`}>
                <FileText size={14} /> Observações
              </span>
              <p className={`text-sm leading-relaxed ${styles.textMain}`}>
                {visibleTx.observation}
              </p>
            </div>
          )}

        </div>

        {/* Drawer Actions Footer */}
        <div className={`p-6 border-t flex flex-col sm:flex-row items-center gap-3 shrink-0 ${styles.footer}`}>
          <button
            onClick={() => onDelete(visibleTx)}
            className={`w-full sm:w-auto flex-1 py-3.5 px-4 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 ${styles.btnDelete}`}
          >
            <Trash2 size={18} />
            <span>Excluir</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit(visibleTx);
            }}
            className={`w-full sm:w-auto flex-[1.5] py-3.5 px-4 rounded-xl border text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm ${styles.btnEdit}`}
          >
            <Edit2 size={18} />
            <span>Editar Transação</span>
          </button>
        </div>

      </div>
    </div>
  );
};