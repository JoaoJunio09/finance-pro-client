
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Save } from 'lucide-react';

import type { Recurrence } from '../../types/recurrence';
import styles from './CreateModal.module.css';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Recurrence>) => void;
}

export const CreateModal = ({ isOpen, onClose, onSave }: CreateModalProps) => {
  // Estado básico do formulário
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'EXPENSE',
    frequency: 'MONTHLY',
    nextDate: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: Number(formData.amount),
    });
    // Limpa o form ou fecha (depende da sua lógica, o onClose geralmente cuida disso)
    onClose();
  };

  const content = (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
      
      {/* Overlay */}
      <div 
        className={`absolute inset-0 ${styles.overlay}`} 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl border p-6 flex flex-col max-h-[90vh] sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 ${styles.modal}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 shrink-0">
          <h2 className={`font-display text-xl font-bold ${styles.textMain}`}>
            Nova Recorrência
          </h2>
          <button 
            onClick={onClose} 
            className={`p-2 rounded-xl cursor-pointer ${styles.closeButton}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto">
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className={`font-body text-sm font-medium ${styles.label}`}>
              Descrição
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Assinatura Netflix"
              className={`font-body w-full px-4 py-2.5 rounded-xl border text-sm ${styles.inputField}`}
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="amount" className={`font-body text-sm font-medium ${styles.label}`}>
                Valor
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={handleChange}
                placeholder="0,00"
                className={`font-body w-full px-4 py-2.5 rounded-xl border text-sm ${styles.inputField}`}
              />
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="type" className={`font-body text-sm font-medium ${styles.label}`}>
                Tipo
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`font-body w-full px-4 py-2.5 rounded-xl border text-sm ${styles.inputField}`}
              >
                <option value="EXPENSE">Despesa</option>
                <option value="INCOME">Receita</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="frequency" className={`font-body text-sm font-medium ${styles.label}`}>
                Frequência
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className={`font-body w-full px-4 py-2.5 rounded-xl border text-sm ${styles.inputField}`}
              >
                <option value="WEEKLY">Semanal</option>
                <option value="MONTHLY">Mensal</option>
                <option value="YEARLY">Anual</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label htmlFor="nextDate" className={`font-body text-sm font-medium ${styles.label}`}>
                Data do Primeiro Vencimento
              </label>
              <input
                id="nextDate"
                name="nextDate"
                type="date"
                required
                value={formData.nextDate}
                onChange={handleChange}
                className={`font-body w-full px-4 py-2.5 rounded-xl border text-sm ${styles.inputField}`}
              />
            </div>
          </div>

          {/* Footer Ações */}
          <div className={`mt-6 pt-5 border-t flex items-center justify-end gap-3 shrink-0 ${styles.borderLight}`}>
            <button
              type="button"
              onClick={onClose}
              className={`font-body px-5 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer ${styles.btnSecondary}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`font-body px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer ${styles.btnPrimary}`}
            >
              <Save size={18} />
              Salvar
            </button>
          </div>

        </form>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};