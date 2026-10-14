import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccountContext } from "../../../context/AccountContext";
import { useAuthContext } from "../../../context/AuthContext";
import GoalService from "../../../services/GoalService";

export default function useGoals() {
  const { account } = useAccountContext();
  const { auth } = useAuthContext();
  const service = useMemo(
    () => new GoalService(auth?.accessToken ?? ""),
    [auth?.accessToken]
  );

  return useQuery({
    queryKey: ["goals", account?.id],
    queryFn: () => service.getByAccount(account?.id ?? ""),
    enabled: Boolean(account?.id),
  });
}
