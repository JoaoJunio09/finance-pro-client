import InternalServerError from "../exceptions/InternalServerError";
import type { AllRecurrenceResponse } from "../models/recurrence/AllRecurrenceResponse";
import type { ParamsRecurrenceAPI } from "../models/recurrence/ParamsRecurrenceAPI";
import type { RecurrenceRequest } from "../models/recurrence/RecurrenceRequest";
import type { RecurrenceResponse } from "../models/recurrence/RecurrenceResponse";
import api from "./api";

class RecurrenceService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/recurrences/v1';
		this.accessToken = accessToken;
	}

	public async getAll({
		signal,
		...params
	}: ParamsRecurrenceAPI) {
		try {
			const response = await api.get<RecurrenceResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params,
				signal
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar as Recorrências');
			}

			throw err;
		}
	}

	public async getOverview(accountId: string | undefined) {
		if (!accountId) return;
		const URL = `${this.BASE_URL}/overview/${accountId}`;
		try {
			const response = await api.get<AllRecurrenceResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao carregar visão geral de Recorrências');
			}

			throw err;
		}
	}

	public async create(recurrence: RecurrenceRequest) {
		try {
			const response = await api.post<RecurrenceResponse>(this.BASE_URL, recurrence, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao salvar Recorrência');
			}

			throw err;
		}
	}

	public async update(recurrence: RecurrenceRequest) {
		try {
			const response = await api.put<RecurrenceResponse>(this.BASE_URL, recurrence, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao atualizar Recorrência');
			}

			throw err;
		}
	}

	public async delete(id: string) {
		const URL = `${this.BASE_URL}/${id}`;
		try {
			const response = await api.delete<RecurrenceResponse>(URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao deletar Recorrência');
			}

			throw err;
		}
	}
}

export default RecurrenceService;