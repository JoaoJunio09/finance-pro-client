import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";

function useAnalytics(enabled = true) {
  const { account } = useAccountContext();

  const accountService = useAccountService();

  const queryAnalytics = useQuery({
    queryKey: ["analytics", account?.id],
    queryFn: () => accountService.getAnalytics(account?.id ?? ""),
    enabled: enabled && Boolean(account?.id),
    retry: 3,
  });

  const queryFinancialHealth = useQuery({
    queryKey: ["financial-health", account?.id],
    queryFn: () => accountService.getFinancialHealth(account?.id ?? ""),
    enabled: enabled && Boolean(account?.id),
    retry: 3,
  });

  return {
    analytics: queryAnalytics.data,
    health: queryFinancialHealth.data,
    isLoading:
      enabled &&
      (!account?.id || queryAnalytics.isLoading || queryFinancialHealth.isLoading),
    isError: (enabled && queryAnalytics.isError) || queryFinancialHealth.isError,
    isFetching: queryAnalytics.isFetching || queryFinancialHealth.isFetching,
    refetch: queryAnalytics.refetch || queryFinancialHealth.refetch,
  };
}

export default useAnalytics;
