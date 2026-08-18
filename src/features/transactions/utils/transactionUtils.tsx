import { Briefcase, Utensils, HomeIcon, Car, Tv, HeartPulse, GraduationCap, ShoppingBag, TrendingUp, Tag } from 'lucide-react';
import type { CategoryConfig, WalletConfig } from '../types/transaction';

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

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};