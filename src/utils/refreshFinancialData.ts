import type { QueryClient } from "@tanstack/react-query";

const financialQueryKeys = [
  "dashboard",
  "analytics",
  "activities",
  "transactions",
  "recurrences",
  "wallets",
  "wallet",
  "invoice",
  "installment-plans",
];

export function refreshFinancialData(queryClient: QueryClient) {
  return Promise.all(
    financialQueryKeys.map((key) =>
      queryClient.invalidateQueries({ queryKey: [key] })
    )
  );
}
