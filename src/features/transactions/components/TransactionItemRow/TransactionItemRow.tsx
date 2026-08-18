import { Calendar, Check, CheckCircle2, ChevronRight, Clock, Repeat, Tag } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { CATEGORIES, WALLETS, formatCurrency, formatDate } from '../../utils/transactionUtils';
import styles from './TransactionItemRow.module.css';

interface TransactionItemRowProps {
  transaction: Transaction;
  onSelect: (tx: Transaction) => void;
  onConfirm: (id: string) => void;
}

export const TransactionItemRow = ({
  transaction,
  onSelect,
  onConfirm
}: TransactionItemRowProps) => {
  const category = CATEGORIES[transaction.categoryId] || CATEGORIES.outros;
  const wallet = WALLETS[transaction.walletId] || WALLETS.w1;
  const IconComponent = category.icon;

  const isIncome = transaction.type === 'income';
  const isPending = transaction.status === 'pending';

  return (
    <>
      {/* =========================================
          DESKTOP LAYOUT
      ========================================= */}
      <div
        onClick={() => onSelect(transaction)}
        className={`group hidden md:flex items-center justify-between p-4 border rounded-2xl transition-all duration-200 cursor-pointer shadow-sm ${styles.rowContainer}`}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
            style={{ backgroundColor: category.bgColor, color: category.color }}
          >
            <IconComponent size={20} />
          </div>

          <div className="min-w-0 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className={`font-semibold text-sm truncate ${styles.textMain}`}>
                {transaction.description}
              </h4>
              {transaction.isRecurrent && (
                <span 
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${styles.badgeRecurrent}`}
                  title="Transação Recorrente"
                >
                  <Repeat size={10} />
                  <span>Recorrente</span>
                </span>
              )}
            </div>

            <div className={`flex items-center gap-2 text-xs flex-wrap ${styles.textMuted}`}>
              <span>{category.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span 
                  className="w-2 h-2 rounded-full inline-block" 
                  style={{ backgroundColor: wallet.bankLogoColor }}
                />
                {wallet.name} <span className="opacity-70">({wallet.bankName})</span>
              </span>
              <span>•</span>
              <span>{formatDate(transaction.date)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 pl-3">
          <div className="text-right">
            <div className={`font-bold text-base ${isIncome ? styles.textIncome : styles.textMain}`}>
              {isIncome ? '+ ' : '- '}{formatCurrency(transaction.amount)}
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-0.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                transaction.status === 'paid' ? styles.badgeIncome : styles.badgeWarning
              }`}>
                {transaction.status === 'paid' ? (
                  <>
                    <CheckCircle2 size={11} />
                    <span>Paga</span>
                  </>
                ) : (
                  <>
                    <Clock size={11} />
                    <span>Pendente</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isPending && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm(transaction.id);
                }}
                className={`p-1.5 rounded-lg ${styles.confirmBtn}`}
                title={isIncome ? 'Confirmar Entrada' : 'Confirmar Pagamento'}
              >
                <Check size={18} />
              </button>
            )}

            <button 
              className={`p-1.5 rounded-lg ${styles.iconButton}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(transaction);
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE LAYOUT
      ========================================= */}
      <div
        onClick={() => onSelect(transaction)}
        className={`flex md:hidden flex-col p-4 sm:p-5 border rounded-2xl shadow-sm gap-4 transition-all duration-200 ${styles.rowContainer}`}
      >
        <div className="flex items-start gap-3.5">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: category.bgColor, color: category.color }}
          >
            <IconComponent size={20} />
          </div>
          <div className="flex flex-col min-w-0 pt-0.5">
            <h4 className={`font-semibold text-[15px] leading-snug line-clamp-2 ${styles.textMain}`}>
              {transaction.description}
            </h4>
            {transaction.isRecurrent && (
              <span className={`flex items-center gap-1 text-[11px] font-medium mt-1 ${styles.textAccent}`}>
                <Repeat size={12} /> Recorrente
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <div className={`flex items-center justify-between text-xs ${styles.textMuted}`}>
            <span className="flex items-center gap-1.5 truncate pr-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: wallet.bankLogoColor }} />
              <span className="truncate">{wallet.name}</span>
            </span>
            <span className="shrink-0 flex items-center gap-1.5">
              <Calendar size={12} className="opacity-70" />
              {formatDate(transaction.date)}
            </span>
          </div>
          <div className={`flex items-center justify-between text-xs ${styles.textMuted}`}>
            <span className="flex items-center gap-1.5 truncate pr-2">
              <Tag size={12} className="shrink-0 opacity-70" />
              <span className="truncate">{category.name}</span>
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${
              transaction.status === 'paid' ? styles.badgeIncome : styles.badgeWarning
            }`}>
              {transaction.status === 'paid' ? 'Paga' : 'Pendente'}
            </span>
          </div>
        </div>

        <div className={`pt-3 border-t flex items-end justify-between mt-1 ${styles.borderLight}`}>
          <span className={`text-[11px] font-medium mb-1 ${styles.textMuted}`}>Valor</span>
          
          <div className="flex items-center gap-3">
            {isPending && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm(transaction.id);
                }}
                className={`p-1.5 rounded-full border flex-shrink-0 ${styles.confirmBtnMobile}`}
                title={isIncome ? 'Confirmar Entrada' : 'Confirmar Pagamento'}
              >
                <Check size={16} />
              </button>
            )}

            <div className={`font-extrabold text-xl ${isIncome ? styles.textIncome : styles.textMain}`}>
              {isIncome ? '+ ' : '- '}{formatCurrency(transaction.amount)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};