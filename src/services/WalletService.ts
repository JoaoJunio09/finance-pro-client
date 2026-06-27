import InternalServerError from "../exceptions/InternalServerError";
import type { ParamsWalletAPI } from "../models/wallet/ParamsWalletAPI";
import type { WalletRequest } from "../models/wallet/WalletRequest";
import type { WalletResponse } from "../models/wallet/WalletResponse";
import api from "./api";

class WalletService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/transactions/v1';
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

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Carteiras');
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

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao criar uma Carteira');
			}

			throw err;
		}
	}
}

export default WalletService;