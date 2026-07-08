import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import BankService from "../services/BankService";

function useBankService() {
	const { auth } = useAuthContext();

	const bankService = useMemo(
		() => new BankService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return bankService;
}

export default useBankService;