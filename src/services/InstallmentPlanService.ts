import InternalServerError from "../exceptions/InternalServerError";
import type { InstallmentPlanRequest } from "../models/installmentPlan/InstallmentPlanRequest";
import type { InstallmentPlanResponse } from "../models/installmentPlan/InstallmentPlanResponse";
import api from "./api";

class InstallmentPlanService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/installmentPlans/v1';
		this.accessToken = accessToken;
	}

	public async getAll() {
		
	}

	public async getById(id: string) {
		
	}

	public async create(installmentPlan: InstallmentPlanRequest) {
		console.log('vai adicionar parcelamento')
		console.log(installmentPlan);
		try {
			const response = await api.post<InstallmentPlanResponse>(this.BASE_URL, installmentPlan, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			console.log(err)
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao registrar Parcelamento');
			}

			throw err;
		}
	}
}

export default InstallmentPlanService;