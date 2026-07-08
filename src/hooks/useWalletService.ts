import { useMemo } from "react";
import { useAuthContext } from "../context/AuthContext";
import WalletService from "../services/WalletService";

function useWalletService() {
	const { auth } = useAuthContext();

	const walletService = useMemo(
		() => new WalletService(auth?.accessToken ?? ''),
		[auth?.accessToken]
	);

	return walletService;
}

export default useWalletService;