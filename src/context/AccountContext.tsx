import { createContext, useContext, useState, type ReactNode } from "react";
import type { AccountResponse } from "../models/account/AccountResponse";
import { useAuthContext } from "./AuthContext";

type AccountContextType = {
  account: AccountResponse | null;
  setAccountByUser: (account: AccountResponse) => void;
};
const AccountContext = createContext<AccountContextType | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const { username } = useAuthContext();
  const [storedAccount, setStoredAccount] = useState<{
    owner: string | null;
    data: AccountResponse | null;
  }>(() => {
    const stored = sessionStorage.getItem("account");
    const owner = sessionStorage.getItem("accountOwner");
    try {
      return { owner, data: stored ? JSON.parse(stored) : null };
    } catch {
      return { owner: null, data: null };
    }
  });
  const account =
    username && storedAccount.owner === username ? storedAccount.data : null;

  function setAccountByUser(data: AccountResponse) {
    sessionStorage.setItem("account", JSON.stringify(data));
    if (username) sessionStorage.setItem("accountOwner", username);
    setStoredAccount({ owner: username, data });
  }

  return (
    <AccountContext.Provider value={{ account, setAccountByUser }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error(
      "useAccountContext deve ser usado dentro de AccountProvider"
    );
  return context;
}
