export { formatCurrencyLabel as formatCurrency } from "../../../utils/FormatCurrency";

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};
