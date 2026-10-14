import FinancePageHeader from "../../../../components/shared/FinancePage/FinancePageHeader";
import FinancePageAction from "../../../../components/shared/FinancePage/FinancePageAction";
import FinancialLifeBackButton from "../../../../components/shared/FinancePage/FinancialLifeBackButton";

export function RecurrencesHeader({ onNew }: { onNew: () => void }) {
  return (
    <FinancePageHeader
      title="Recorrências"
      description="Acompanhe as receitas e despesas que fazem parte da sua rotina."
      back={<FinancialLifeBackButton />}
      action={
        <FinancePageAction label="Adicionar recorrência" onClick={onNew} />
      }
    />
  );
}
