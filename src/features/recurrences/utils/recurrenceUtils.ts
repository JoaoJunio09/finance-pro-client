export const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'Não definida';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const getDaysUntil = (dateStr: string | null) => {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};