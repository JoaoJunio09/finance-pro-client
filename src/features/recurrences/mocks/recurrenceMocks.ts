import { 
  Briefcase, Utensils, HomeIcon, Car, Tv, HeartPulse, GraduationCap, 
  ShoppingBag, TrendingUp, Tag, PlayCircle, PauseCircle, StopCircle 
} from 'lucide-react';
import type { CategoryConfig, WalletConfig, Recurrence, RecurrenceFrequency, RecurrenceStatus } from '../types/recurrence';

export const CATEGORIES: Record<string, CategoryConfig> = {
  salario: { id: 'salario', name: 'Salário & Renda', icon: Briefcase, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  alimentacao: { id: 'alimentacao', name: 'Alimentação', icon: Utensils, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)' },
  moradia: { id: 'moradia', name: 'Moradia & Contas', icon: HomeIcon, color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  transporte: { id: 'transporte', name: 'Transporte', icon: Car, color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  lazer: { id: 'lazer', name: 'Lazer & Cultura', icon: Tv, color: '#EC4899', bgColor: 'rgba(236, 72, 153, 0.12)' },
  saude: { id: 'saude', name: 'Saúde & Bem-estar', icon: HeartPulse, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  educacao: { id: 'educacao', name: 'Educação', icon: GraduationCap, color: '#6366F1', bgColor: 'rgba(99, 102, 241, 0.12)' },
  compras: { id: 'compras', name: 'Compras', icon: ShoppingBag, color: '#14B8A6', bgColor: 'rgba(20, 184, 166, 0.12)' },
  investimento: { id: 'investimento', name: 'Investimentos', icon: TrendingUp, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  outros: { id: 'outros', name: 'Outros', icon: Tag, color: '#6B7280', bgColor: 'rgba(107, 114, 128, 0.12)' }
};

export const WALLETS: Record<string, WalletConfig> = {
  w1: { id: 'w1', name: 'Conta Principal', bankName: 'Nubank', bankLogoColor: '#820AD1' },
  w2: { id: 'w2', name: 'Cartão Ultra', bankName: 'Itaú Uniclass', bankLogoColor: '#EC7000' },
  w3: { id: 'w3', name: 'Conta Salário', bankName: 'Bradesco', bankLogoColor: '#CC092F' },
  w4: { id: 'w4', name: 'Reserva Digital', bankName: 'Banco Inter', bankLogoColor: '#FF7A00' },
  w5: { id: 'w5', name: 'Carteira Global', bankName: 'BTG Pactual', bankLogoColor: '#001E62' }
};

export const INITIAL_RECURRENCES: Recurrence[] = [
  { id: 'rec-1', description: 'Salário Mensal Tech Corp', amount: 11500.00, type: 'income', status: 'active', frequency: 'monthly', categoryId: 'salario', walletId: 'w3', startDate: '2024-01-05', nextDate: '2026-09-05', history: [{ id: 'h1', date: '2026-07-05', amount: 11500.00, status: 'paid' }, { id: 'h2', date: '2026-08-05', amount: 11500.00, status: 'paid' }], future: [{ id: 'f1', date: '2026-09-05', amount: 11500.00, status: 'pending' }, { id: 'f2', date: '2026-10-05', amount: 11500.00, status: 'pending' }] },
  { id: 'rec-2', description: 'Aluguel do Apartamento', amount: 3200.00, type: 'expense', status: 'active', frequency: 'monthly', categoryId: 'moradia', walletId: 'w1', startDate: '2025-02-10', nextDate: '2026-09-10', history: [{ id: 'h3', date: '2026-07-10', amount: 3200.00, status: 'paid' }, { id: 'h4', date: '2026-08-10', amount: 3200.00, status: 'paid' }], future: [{ id: 'f3', date: '2026-09-10', amount: 3200.00, status: 'pending' }, { id: 'f4', date: '2026-10-10', amount: 3200.00, status: 'pending' }] },
  { id: 'rec-3', description: 'Assinatura Netflix', amount: 39.90, type: 'expense', status: 'active', frequency: 'monthly', categoryId: 'lazer', walletId: 'w2', startDate: '2023-11-15', nextDate: '2026-09-15', history: [{ id: 'h5', date: '2026-08-15', amount: 39.90, status: 'paid' }], future: [{ id: 'f5', date: '2026-09-15', amount: 39.90, status: 'pending' }] },
  { id: 'rec-4', description: 'Consultoria Freelance Semanal', amount: 850.00, type: 'income', status: 'paused', frequency: 'weekly', categoryId: 'salario', walletId: 'w4', startDate: '2026-05-01', nextDate: null, notes: 'Projeto pausado temporariamente pelo cliente.', history: [{ id: 'h6', date: '2026-08-01', amount: 850.00, status: 'paid' }, { id: 'h7', date: '2026-08-08', amount: 850.00, status: 'paid' }], future: [] }
];

export const FREQUENCY_LABELS: Record<RecurrenceFrequency, string> = { 
  daily: 'Diariamente', weekly: 'Semanalmente', biweekly: 'Quinzenalmente', monthly: 'Mensalmente', yearly: 'Anualmente' 
};

export const STATUS_CONFIG: Record<RecurrenceStatus, { label: string; icon: React.ElementType; colorClass: string; bgClass: string }> = {
  active: { label: 'Ativa', icon: PlayCircle, colorClass: 'text-[var(--income)]', bgClass: 'bg-[var(--income-muted)]' },
  paused: { label: 'Pausada', icon: PauseCircle, colorClass: 'text-[var(--warning)]', bgClass: 'bg-[var(--warning-muted)]' },
  finished: { label: 'Finalizada', icon: StopCircle, colorClass: 'text-[var(--text-muted)]', bgClass: 'bg-[var(--border-light)]' }
};