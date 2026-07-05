import InternalServerError from "../exceptions/InternalServerError";
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

	public async getAll(params: ParamsRecurrenceAPI) {
		try {
			const response = await api.get<RecurrenceResponse[]>(this.BASE_URL, {
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
				throw new InternalServerError('Erro ao carregar as Recorrências');
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
				throw new InternalServerError('Erro ao salvar recorrência');
			}

			throw err;
		}
	}
}

export default RecurrenceService;