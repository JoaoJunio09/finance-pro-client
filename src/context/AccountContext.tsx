import { createContext, useContext, useState, type ReactNode } from "react"
import type { AccountResponse } from "../models/account/AccountResponse"

type AccountContextType = {
	account: AccountResponse | null,
	setAccountByUser: (account: AccountResponse) => void;
}

const AccountContext = createContext<AccountContextType | null>(null);

type AccountProviderProps = {
	children: ReactNode
}

export function AccountProvider({ children }: AccountProviderProps) {
	const [account, setAccount] = useState<AccountResponse | null>(() => {
		const stored = sessionStorage.getItem('account');
		return stored ? JSON.parse(stored) : null;
	});

	function setAccountByUser(account: AccountResponse) {
		sessionStorage.setItem(
			'account',
			JSON.stringify(account)
		)
		setAccount(account);
	}

	return (
		<AccountContext.Provider
			value={{
				account,
				setAccountByUser
			}}
		>
			{children}
		</AccountContext.Provider>
	)
}

export function useAccountContext() {
	const context = useContext(AccountContext);

	if (!context) {
		throw new Error("useAccountContext deve ser usado dentro de AccountProvider");
	}

	return context;
}