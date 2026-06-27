import { createContext, useContext, useState, type ReactNode } from "react"
import type { AccountResponse } from "../models/account/AccountResponse"

type AccountContextType = {
	account: AccountResponse,
	setAccount: (account: AccountResponse) => void;
}

const AccountContext = createContext<AccountContextType | null>(null);

type AccountProviderProps = {
	children: ReactNode
}

export function AccountProvider({ children }: AccountProviderProps) {
	const [account, setAccount] = useState<AccountResponse>({
		id: '',
		currentBalance: 0,
		income: 0,
		expenses: 0,
		netIncome: 0,
		biggestExpense: {
			value: 0,
			category: ''
		},
		wallets: []
	});

	return (
		<AccountContext.Provider
			value={{
				account: account,
				setAccount
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