import AppShell from "../components/layout/AppShell/AppShell";
import ChoiceScreen from "../features/financialLife/ChoiceScreen";
import { FINANCIAL_CHOICES } from "../features/financialLife/navigation";

export default function FinancialLifePage() {
  return (
    <AppShell>
      <ChoiceScreen
        title="O que você quer ver hoje?"
        backPath="/dashboard"
        backLabel="Voltar ao início"
        options={FINANCIAL_CHOICES}
      />
    </AppShell>
  );
}
