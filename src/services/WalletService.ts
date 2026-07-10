import InternalServerError from "../exceptions/InternalServerError";
import type { ParamsWalletAPI } from "../models/wallet/ParamsWalletAPI";
import type { WalletDetailsResponse } from "../models/wallet/WalletDetails";
import type { WalletRequest } from "../models/wallet/WalletRequest";
import type { WalletResponse } from "../models/wallet/WalletResponse";
import api from "./api";

class WalletService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/wallets/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsWalletAPI) {
		try {
			const response = await api.get<WalletResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Carteiras');
			}

			throw err;
		}
	}

	public async details(accountId: string, walletId: string) {
		const URL = `${this.BASE_URL}/details/${accountId}/${walletId}`;
		try {
			const response = await api.get<WalletDetailsResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar a Carteira');
			}

			throw err;
		}
	}

	public async getById(id: string) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			const response = await api.get<WalletResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar a Carteira');
			}

			throw err;
		}
	}

	public async create(wallet: WalletRequest) {
		try {
			const response = await api.post<WalletResponse>(this.BASE_URL, wallet, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao criar uma Carteira');
			}

			throw err;
		}
	}

	public async update(wallet: WalletRequest) {
		try {
			const response = await api.put<WalletResponse>(this.BASE_URL, wallet, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao atualizar a Carteira');
			}

			throw err;
		}
	}

	public async delete(id: string) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			const response = await api.delete(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao remover Carteira');
			}

			throw err;
		}
	}
}

export default WalletService;