import {
  Briefcase,
  Home,
  MonitorPlay,
  Dumbbell,
  Shield,
  Wifi,
} from 'lucide-react';
import type { Category, Wallet, Recurrence } from '../types/recurrence';

const mockCategories: Record<string, Category> = {
  salary: { id: 'c1', name: 'Salário', icon: Briefcase, color: '#10B981' },
  housing: { id: 'c2', name: 'Moradia', icon: Home, color: '#6366F1' },
  streaming: { id: 'c3', name: 'Assinaturas', icon: MonitorPlay, color: '#EC4899' },
  health: { id: 'c4', name: 'Saúde & Fitness', icon: Dumbbell, color: '#F59E0B' },
  insurance: { id: 'c5', name: 'Seguros', icon: Shield, color: '#3B82F6' },
  internet: { id: 'c6', name: 'Internet & TV', icon: Wifi, color: '#8B5CF6' },
};

const mockWallets: Record<string, Wallet> = {
  nubank: { id: 'w1', name: 'Nubank', color: '#8A05BE' },
  itau: { id: 'w2', name: 'Itaú', color: '#EC7000' },
  inter: { id: 'w3', name: 'Banco Inter', color: '#FF7A00' },
};

// Helpers apenas para gerar datas relativas — uso exclusivo dos mocks,
// não são utilitários de produção (por isso não estão em utils/).
const getTodayIso = () => new Date().toISOString();

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const getPastDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

export const mockRecurrences: Recurrence[] = [
  // --- RECORRÊNCIAS PARA HOJE ---
  {
    id: 'rec-today-1',
    code: 'REC-2001',
    description: 'SmartFit - Plano Black',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 119.90,
    frequency: 'MONTHLY',
    category: mockCategories.health,
    wallet: mockWallets.nubank,
    startDate: '2023-01-24T00:00:00Z',
    nextDate: getTodayIso(),
    lastDate: getPastDate(30),
    occurrences: 14,
    totalAmountProcessed: 1678.60,
  },
  {
    id: 'rec-today-2',
    code: 'REC-2002',
    description: 'Adobe Creative Cloud',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 224.00,
    frequency: 'MONTHLY',
    category: mockCategories.streaming,
    wallet: mockWallets.itau,
    startDate: '2022-08-24T00:00:00Z',
    nextDate: getTodayIso(),
    lastDate: getPastDate(31),
    occurrences: 24,
    totalAmountProcessed: 5376.00,
  },

  // --- RECORRÊNCIAS PENDENTES ---
  {
    id: 'rec-pending-1',
    code: 'REC-2003',
    description: 'Claro Internet Fibra 500M',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 129.90,
    frequency: 'MONTHLY',
    category: mockCategories.internet,
    wallet: mockWallets.itau,
    startDate: '2023-03-20T00:00:00Z',
    nextDate: getPastDate(4),
    lastDate: getPastDate(34),
    occurrences: 16,
    totalAmountProcessed: 2078.40,
  },
  {
    id: 'rec-pending-2',
    code: 'REC-2004',
    description: 'Seguro Residencial Porto',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 180.00,
    frequency: 'MONTHLY',
    category: mockCategories.insurance,
    wallet: mockWallets.inter,
    startDate: '2023-05-18T00:00:00Z',
    nextDate: getPastDate(6),
    lastDate: getPastDate(36),
    occurrences: 15,
    totalAmountProcessed: 2700.00,
  },

  // --- PRÓXIMAS RECORRÊNCIAS ---
  {
    id: 'rec-upcoming-1',
    code: 'REC-1092',
    description: 'Salário Mensal TechCorp',
    type: 'INCOME',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 9500.00,
    frequency: 'MONTHLY',
    category: mockCategories.salary,
    wallet: mockWallets.itau,
    startDate: '2023-01-05T00:00:00Z',
    nextDate: getFutureDate(3),
    lastDate: getPastDate(27),
    occurrences: 18,
    totalAmountProcessed: 171000.00,
  },
  {
    id: 'rec-upcoming-2',
    code: 'REC-1093',
    description: 'Aluguel Apartamento Jardins',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'MANUAL',
    amount: 2800.00,
    frequency: 'MONTHLY',
    category: mockCategories.housing,
    wallet: mockWallets.nubank,
    startDate: '2023-02-10T00:00:00Z',
    nextDate: getFutureDate(7),
    lastDate: getPastDate(23),
    occurrences: 17,
    totalAmountProcessed: 47600.00,
  },
  {
    id: 'rec-upcoming-4',
    code: 'REC-1095',
    description: 'Consultoria UI/UX Semanal',
    type: 'INCOME',
    status: 'PAUSED',
    executionType: 'MANUAL',
    amount: 1500.00,
    frequency: 'WEEKLY',
    category: mockCategories.salary,
    wallet: mockWallets.inter,
    startDate: '2023-08-01T00:00:00Z',
    nextDate: null,
    lastDate: getPastDate(45),
    occurrences: 10,
    totalAmountProcessed: 15000.00,
  },
  {
    id: 'rec-upcoming-3',
    code: 'REC-1094',
    description: 'Netflix Family Plan',
    type: 'EXPENSE',
    status: 'ACTIVE',
    executionType: 'AUTOMATIC',
    amount: 55.90,
    frequency: 'MONTHLY',
    category: mockCategories.streaming,
    wallet: mockWallets.nubank,
    startDate: '2022-05-15T00:00:00Z',
    nextDate: getFutureDate(12),
    lastDate: getPastDate(18),
    occurrences: 26,
    totalAmountProcessed: 1453.40,
  },
];