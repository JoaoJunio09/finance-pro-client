import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import AccountService from "../services/AccountService";

function useAccountService() {
	const { auth } = useAuthContext();

	const accountService = useMemo(
		() => new AccountService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return accountService;
}

export default useAccountService;