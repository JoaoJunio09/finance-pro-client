import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import TransactionService from "../services/TransactionService";

function useTransactionService() {
	const { auth } = useAuthContext();

	const accountService = useMemo(
		() => new TransactionService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return accountService;
}

export default useTransactionService;