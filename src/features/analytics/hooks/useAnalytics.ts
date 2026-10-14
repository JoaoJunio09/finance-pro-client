import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import useAccountService from "../../../hooks/useAccountService";
import { useMemo } from "react";

function useAnalytics(enabled = true) {
  const { account } = useAccountContext();

  const accountService = useAccountService();

  const queryAnalytics = useQuery({
    queryKey: ["analytics", account?.id],
    queryFn: () => accountService.getAnalytics(account?.id ?? ""),
    enabled: enabled && Boolean(account?.id),
    retry: 3,
  });

  const analytics = useMemo(() => queryAnalytics.data, [queryAnalytics.data]);

  return {
    analytics,
    isLoading: enabled && (!account?.id || queryAnalytics.isLoading),
    isError: enabled && queryAnalytics.isError,
    isFetching: queryAnalytics.isFetching,
    refetch: queryAnalytics.refetch,
  };
}

export default useAnalytics;
