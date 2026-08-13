import { Activity, Car, CreditCard, Home, ShoppingCart, TrendingUp, Wallet, Coffee } from 'lucide-react';
import type { FinancialActivity } from '../types/FinancialActivity';

export function generateMockActivities(targetDate: Date): FinancialActivity[] {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const activities: FinancialActivity[] = [];
  const today = new Date().getDate();
  const isPastOrTodayInRealMonth = (day: number) =>
    month < new Date().getMonth() || (month === new Date().getMonth() && day <= today);

  const addActivity = (
    day: number,
    type: 'income' | 'expense',
    amount: number,
    title: string,
    isRecurrent: boolean,
    category: string,
    wallet: string,
    status: 'completed' | 'pending',
    icon: FinancialActivity['icon']
  ) => {
    activities.push({
      id: `act_${day}_${title.substring(0, 3)}`,
      title, amount, type, isRecurrent, category, wallet, status,
      date: new Date(year, month, day), icon,
    });
  };

  addActivity(5, 'income', 14850, 'Salário Mensal', true, 'Renda Fixa', 'Conta Corrente', isPastOrTodayInRealMonth(5) ? 'completed' : 'pending', Wallet);
  addActivity(5, 'expense', 1500, 'Aluguel', true, 'Moradia', 'Conta Corrente', isPastOrTodayInRealMonth(5) ? 'completed' : 'pending', Home);
  addActivity(12, 'expense', 50, 'Netflix', true, 'Assinaturas', 'Cartão Nubank', isPastOrTodayInRealMonth(12) ? 'completed' : 'pending', Activity);
  addActivity(15, 'expense', 650, 'Condomínio', true, 'Moradia', 'Conta Corrente', isPastOrTodayInRealMonth(15) ? 'completed' : 'pending', Home);
  addActivity(17, 'expense', 20, 'Spotify', true, 'Assinaturas', 'Cartão Nubank', isPastOrTodayInRealMonth(17) ? 'completed' : 'pending', Activity);
  addActivity(2, 'expense', 120, 'Uber', false, 'Transporte', 'Cartão XP', 'completed', Car);
  addActivity(2, 'expense', 350, 'Mercado', false, 'Alimentação', 'Cartão XP', 'completed', ShoppingCart);
  addActivity(8, 'expense', 85, 'Restaurante', false, 'Alimentação', 'Cartão Nubank', 'completed', Coffee);
  addActivity(14, 'income', 850, 'Rendimento CDI', false, 'Investimentos', 'XP Investimentos', 'completed', TrendingUp);
  addActivity(18, 'expense', 180, 'Farmácia', false, 'Saúde', 'Cartão XP', 'completed', Activity);
  addActivity(25, 'expense', 380, 'Seguro Auto', true, 'Transporte', 'Cartão Nubank', isPastOrTodayInRealMonth(25) ? 'completed' : 'pending', Car);
  addActivity(28, 'expense', 950, 'Fatura Cartão', false, 'Cartões', 'Conta Corrente', isPastOrTodayInRealMonth(28) ? 'completed' : 'pending', CreditCard);

  return activities.sort((a, b) => a.date.getTime() - b.date.getTime());
}