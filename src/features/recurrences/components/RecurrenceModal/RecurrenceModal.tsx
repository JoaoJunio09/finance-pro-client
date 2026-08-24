import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Recurrence, RecurrenceFrequency, RecurrenceStatus, RecurrenceType } from '../../types/recurrence';

import styles from './RecurrenceModal.module.css';

interface RecurrenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  recurrence?: Recurrence | null; // Se for nulo, é criação; se tiver dados, é edição
  onSave: (data: Partial<Recurrence>) => void;
}

export function RecurrenceModal({ isOpen, onClose, recurrence, onSave }: RecurrenceModalProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<RecurrenceType>('DEBIT');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState<RecurrenceFrequency>('MONTHLY');
  const [status, setStatus] = useState<RecurrenceStatus>('ACTIVE');
  const [nextDate, setNextDate] = useState('');

  // Preenche os campos se estiver em modo de edição
  useEffect(() => {
    if (recurrence && isOpen) {
      setTitle(recurrence.title);
      setAmount(recurrence.amount.toString());
      setType(recurrence.type);
      setCategory(recurrence.category);
      setFrequency(recurrence.frequency);
      setStatus(recurrence.status);
      setNextDate(recurrence.nextDate);
    } else if (isOpen) {
      // Reseta para criação
      setTitle('');
      setAmount('');
      setType('DEBIT');
      setCategory('');
      setFrequency('MONTHLY');
      setStatus('ACTIVE');
      setNextDate('');
    }
  }, [recurrence, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: recurrence?.id || crypto.randomUUID(),
      title,
      amount: parseFloat(amount),
      type,
      category,
      frequency,
      status,
      nextDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className={`absolute inset-0 ${styles.overlay}`} onClick={onClose}></div>

      {/* Modal Container */}
      <div className={`relative w-full max-w-lg rounded-3xl overflow-hidden flex flex-col ${styles.modal}`}>
        
        {/* Cabeçalho */}
        <div className={`flex items-center justify-between px-6 py-4 ${styles.header}`}>
          <h2 className={`text-lg font-bold ${styles.title}`}>
            {recurrence ? 'Editar Recorrência' : 'Nova Recorrência'}
          </h2>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-full ${styles.closeButton}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col max-h-[80vh]">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            
            {/* Seletor de Tipo (Visual e Acessível) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('CREDIT')}
                className={`py-3 rounded-xl font-semibold text-sm ${styles.typeButton} ${type === 'CREDIT' ? styles.typeButtonIncomeActive : ''}`}
              >
                Receita (+)
              </button>
              <button
                type="button"
                onClick={() => setType('DEBIT')}
                className={`py-3 rounded-xl font-semibold text-sm ${styles.typeButton} ${type === 'DEBIT' ? styles.typeButtonExpenseActive : ''}`}
              >
                Despesa (-)
              </button>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${styles.label}`}>Nome</label>
              <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Netflix, Salário..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full text-sm outline-none ${styles.input}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${styles.label}`}>Valor (R$)</label>
                <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full text-sm outline-none ${styles.input}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${styles.label}`}>Próxima Data</label>
                <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                  <input 
                    type="text" // Em produção, pode ser 'date'
                    required
                    placeholder="Ex: 25 Ago, 2026"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    className={`w-full text-sm outline-none ${styles.input}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${styles.label}`}>Categoria</label>
                <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full text-sm outline-none ${styles.input}`}
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="Casa">Casa</option>
                    <option value="Entretenimento">Entretenimento</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-semibold ${styles.label}`}>Frequência</label>
                <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                  <select 
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as RecurrenceFrequency)}
                    className={`w-full text-sm outline-none ${styles.input}`}
                  >
                    <option value="WEEKLY">Semanal</option>
                    <option value="MONTHLY">Mensal</option>
                    <option value="YEARLY">Anual</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className={`text-sm font-semibold ${styles.label}`}>Status do Contrato</label>
              <div className={`rounded-xl px-3 py-2.5 ${styles.inputWrapper}`}>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as RecurrenceStatus)}
                  className={`w-full text-sm outline-none ${styles.input}`}
                >
                  <option value="ACTIVE">Ativo</option>
                  <option value="PAUSED">Pausado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>
            </div>

          </div>

          {/* Rodapé */}
          <div className={`px-6 py-4 flex items-center justify-end gap-3 ${styles.footer}`}>
            <button 
              type="button" 
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${styles.btnCancel}`}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 ${styles.btnSave}`}
            >
              Salvar 
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}