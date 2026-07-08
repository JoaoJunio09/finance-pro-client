import InternalServerError from "../exceptions/InternalServerError";
import type { BankResponse } from "../models/bank/BankResponse";
import type { CategoryRequest } from "../models/category/CategoryRequest";
import api from "./api";

class BankService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/banks/v1';
		this.accessToken = accessToken;
	}

	public async getAll() {
		try {
			const response = await api.get<BankResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Contas bancárias');
			}

			throw err;
		}
	}

	public async getById(id: string) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			const response = await api.get<BankResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar a Conta bancária');
			}

			throw err;
		}
	}

	public async create(category: CategoryRequest) {
		try {
			const response = await api.post<BankResponse>(this.BASE_URL, category, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao registrar uma Conta');
			}

			throw err;
		}
	}
}

export default BankService;