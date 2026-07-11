import InternalServerError from "../exceptions/InternalServerError";
import type { AllTransactionResponse } from "../models/transaction/AllTransactionResponse";
import type { OverviewResponse } from "../models/transaction/OverviewResponse";
import type { ParamsTransactionAPI } from "../models/transaction/ParamsTransactionAPI";
import type { TransactionRequest } from "../models/transaction/TransactionRequest";
import type { TransactionResponse } from "../models/transaction/TransactionResponse";
import api from "./api";

class TransactionService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/transactions/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsTransactionAPI) {
		try {
			const response = await api.get<AllTransactionResponse>(this.BASE_URL, {
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
				throw new InternalServerError('Erro ao carregar as todas as Transações');
			}

			throw err;
		}
	}

	public async overview(accountId: string | undefined) {
		const URL = `${this.BASE_URL}/overview/${accountId}`;
		try {
			const response = await api.get<OverviewResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar overview das transações');
			}

			throw err;
		}
	}

	public async create(transaction: TransactionRequest) {
		try {
			const response = await api.post<TransactionResponse>(this.BASE_URL, transaction, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao criar Transação');
			}

			throw err;
		}
	}

	public async update(transaction: TransactionRequest) {
		try {
			const response = await api.put<TransactionResponse>(this.BASE_URL, transaction, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao atualizar Transação');
			}

			throw err;
		}
	}
}

export default TransactionService;