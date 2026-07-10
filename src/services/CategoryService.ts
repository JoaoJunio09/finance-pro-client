import InternalServerError from "../exceptions/InternalServerError";
import type { ParamsCategoryAPI } from "../models/account/ParamsCategoryAPI";
import type { CategoryRequest } from "../models/category/CategoryRequest";
import type { CategoryResponse } from "../models/category/CategoryResponse";
import type { TransactionResponse } from "../models/transaction/TransactionResponse";
import api from "./api";

class CategoryService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/categories/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsCategoryAPI) {
		try {
			const response = await api.get<CategoryResponse[]>(this.BASE_URL, {
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
				throw new InternalServerError('Erro ao carregar as Categorias');
			}

			throw err;
		}
	}

	public async create(category: CategoryRequest) {
		try {
			const response = await api.post<TransactionResponse>(this.BASE_URL, category, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				}
			});

			return response.data
		}
		catch (err: any) {
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro ao criar Categoria');
			}

			throw err;
		}
	}
}

export default CategoryService;