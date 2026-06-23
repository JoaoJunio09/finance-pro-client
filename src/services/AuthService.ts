import AuthenticationError from "../exceptions/AuthenticationError";
import InternalServerError from "../exceptions/InternalServerError";
import type { AccountCredentials } from "../models/auth/AccountCredentials";
import type { Token } from "../models/auth/Token";
import api from "./api";

class AuthService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/auth';
	}

	public async signIn(credentials: AccountCredentials) {
		const URL = `${this.BASE_URL}/sign`;
		try {
			const response = await api.post<Token>(URL, credentials);
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 403) {
				throw new AuthenticationError('Não foi possível autenticar usuário');
			}

			if (err?.response?.status === 500) {
				throw new InternalServerError('Usuário ou senha inválidos');
			}

			throw err;
		}
	}
}

export default AuthService;