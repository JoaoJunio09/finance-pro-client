import InternalServerError from "../exceptions/InternalServerError";
import type { AccountResponse } from "../models/account/AccountResponse";
import api from "./api";

class AccountService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/accounts/v1';
		this.accessToken = accessToken;
	}

	public async getAll() {
		try {
			const response = await api.get<AccountResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as todas as Contas');
			}

			throw err;
		}
	}

	public async getByUsername(username: string) {
		const URL:string = `${this.BASE_URL}/by-username/${username}`;
		try {
			const response = await api.get<AccountResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			
			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar dados da conta');
			}

			throw err;
		}
	}
}

export default AccountService;