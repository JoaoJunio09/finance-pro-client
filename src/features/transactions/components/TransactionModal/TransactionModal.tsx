import { ArrowDownRight, ArrowUpRight, Calendar, Check, DollarSign, FileText, Repeat, Tag, Wallet, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { Transaction, TransactionStatus, TransactionType } from '../../types/transaction';
import { CATEGORIES, WALLETS } from '../../utils/transactionUtils';
import styles from './TransactionModal.module.css';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transactionData: Omit<Transaction, 'id'> & { id?: string }) => void;
  initialData?: Transaction | null;
}

export const TransactionModal = ({
  isOpen,
  onClose,
  onSave,
  initialData
}: TransactionModalProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>('expense');
  const [status, setStatus] = useState<TransactionStatus>('paid');
  const [categoryId, setCategoryId] = useState('alimentacao');
  const [walletId, setWalletId] = useState('w1');
  const [isRecurrent, setIsRecurrent] = useState(false);
  const [notes, setNotes] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [renderModal, setRenderModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDescription(initialData.description);
        setAmount(initialData.amount.toString());
        setDate(initialData.date);
        setType(initialData.type);
        setStatus(initialData.status);
        setCategoryId(initialData.categoryId);
        setWalletId(initialData.walletId);
        setIsRecurrent(!!initialData.isRecurrent);
        setNotes(initialData.notes || '');
      } else {
        setDescription('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0]);
        setType('expense');
        setStatus('paid');
        setCategoryId('alimentacao');
        setWalletId('w1');
        setIsRecurrent(false);
        setNotes('');
      }

      setRenderModal(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setRenderModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialData]);

  if (!renderModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    onSave({
      ...(initialData ? { id: initialData.id } : {}),
      description: description.trim(),
      amount: parseFloat(amount) || 0,
      date,
      type,
      status,
      categoryId,
      walletId,
      isRecurrent,
      notes: notes.trim() || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${styles.overlay} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className={`relative w-full max-w-[550px] max-h-[90vh] shadow-2xl flex flex-col rounded-3xl border z-10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${styles.modalPanel} ${
        isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--border-color)] shrink-0">
          <h3 className={`text-xl font-bold ${styles.textMain}`}>
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h3>
          <button onClick={onClose} className={`p-2 rounded-xl ${styles.closeBtn}`}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          
          {/* Seletor de Tipo (Receita / Despesa) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold ${
                type === 'income' ? styles.typeBtnActiveIncome : styles.typeBtn
              }`}
            >
              <ArrowUpRight size={18} />
              <span>Receita</span>
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold ${
                type === 'expense' ? styles.typeBtnActiveExpense : styles.typeBtn
              }`}
            >
              <ArrowDownRight size={18} />
              <span>Despesa</span>
            </button>
          </div>

          {/* Descrição */}
          <div>
            <label className={`text-xs font-bold block mb-2 ${styles.textMuted}`}>Descrição</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Supermercado, Salário..."
              className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none ${styles.inputField}`}
            />
          </div>

          {/* Valor e Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${styles.textMuted}`}>
                <DollarSign size={14} /> Valor (R$)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none ${styles.inputField}`}
              />
            </div>
            <div>
              <label className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${styles.textMuted}`}>
                <Calendar size={14} /> Data
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none cursor-pointer ${styles.inputField}`}
              />
            </div>
          </div>

          {/* Categoria e Carteira */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${styles.textMuted}`}>
                <Tag size={14} /> Categoria
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none cursor-pointer ${styles.inputField}`}
              >
                {Object.values(CATEGORIES).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${styles.textMuted}`}>
                <Wallet size={14} /> Carteira
              </label>
              <select
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none cursor-pointer ${styles.inputField}`}
              >
                {Object.values(WALLETS).map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status e Recorrência */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`text-xs font-bold block mb-2 ${styles.textMuted}`}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TransactionStatus)}
                className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none cursor-pointer ${styles.inputField}`}
              >
                <option value="paid">Paga / Efetivada</option>
                <option value="pending">Pendente</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-colors ${styles.inputField}`}>
                <input
                  type="checkbox"
                  checked={isRecurrent}
                  onChange={(e) => setIsRecurrent(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--accent)]"
                />
                <span className={`text-sm font-semibold flex items-center gap-1.5 ${styles.textMain}`}>
                  <Repeat size={14} /> Recorrente
                </span>
              </label>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className={`text-xs font-bold flex items-center gap-1.5 mb-2 ${styles.textMuted}`}>
              <FileText size={14} /> Observações (Opcional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detalhes adicionais sobre a transação..."
              className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none resize-none ${styles.inputField}`}
            />
          </div>

        </form>

        {/* Footer */}
        <div className={`p-6 border-t flex items-center justify-end gap-3 shrink-0 ${styles.footer}`}>
          <button 
            type="button"
            onClick={onClose}
            className={`py-3 px-5 rounded-xl border text-sm font-bold ${styles.btnSecondary}`}
          >
            Cancelar
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className={`py-3 px-6 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 ${styles.btnPrimary}`}
          >
            <Check size={18} />
            Salvar Transação
          </button>
        </div>

      </div>
    </div>
  );
};