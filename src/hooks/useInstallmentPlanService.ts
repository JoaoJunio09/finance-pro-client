import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import InstallmentPlanService from "../services/InstallmentPlanService";

function useInstallmentPlanService() {
	const { auth } = useAuthContext();

	const installmentPlanService = useMemo(
		() => new InstallmentPlanService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return installmentPlanService;
}

export default useInstallmentPlanService;