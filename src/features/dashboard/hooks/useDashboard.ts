import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import { useAuthContext } from "../../../context/AuthContext";
import useAccountService from "../../../hooks/useAccountService";

export default function useDashboard() {
  const { fullName } = useAuthContext();
  const { account } = useAccountContext();
  
  const accountService = useAccountService();

  const query = useQuery({
    queryKey: ["dashboard", account?.id],
    queryFn: () => accountService.getSummary(account?.id ?? ""),
    enabled: Boolean(account?.id),
  });
  const activityQuery = useQuery({
    queryKey: ["dashboard", "activity", account?.id],
    queryFn: () => accountService.getDashboard(account?.id ?? ""),
    enabled: Boolean(account?.id),
  });

  return {
    dashboard: query.data ?? null,
    name: fullName,
    isLoading: !account?.id || query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    activity: activityQuery.data,
    activityLoading: activityQuery.isLoading,
    activityError: activityQuery.isError,
    refetchActivity: activityQuery.refetch,
  };
}
