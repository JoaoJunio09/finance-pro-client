import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import type { Token } from "../models/auth/Token";
import type { AccountCredentials } from "../models/auth/AccountCredentials";

type AuthContextType = {
	auth: Token | null;

	username: string | null;

	fullName: string | null;

	isAuthenticated: boolean;

	signIn(
		credentials: AccountCredentials
	): Promise<void>;

	logout(): void;

	hasRole(role: string): boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [auth, setAuth] = useState<Token | null>(() => {
		const stored = sessionStorage.getItem('auth');
		return stored ? JSON.parse(stored) : null;
	});
	
	const username = auth?.username ?? null;
	const fullName = auth?.fullName ?? null;

	const authService = useMemo(() => new AuthService(), []);

	const navigate = useNavigate();

	async function signIn(credentials: AccountCredentials) {
		const auth = await authService.signIn(credentials);

		sessionStorage.setItem(
			'auth',
			JSON.stringify(auth)
		)
		setAuth(auth);

		navigate('/dashboard');
	}
	
	function logout() {
		sessionStorage.removeItem('auth');
		setAuth(null);
	}

	function hasRole(role: string): boolean {
		if (!auth) {
			return false;
		}
		return auth.roles.includes(role);
	}

	return (
		<AuthContext.Provider
			value={{
				auth,
				username,
				fullName,
				isAuthenticated: auth !== null,
				signIn,
				logout,
				hasRole
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
	}

	return context;
}