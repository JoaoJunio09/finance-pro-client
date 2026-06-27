import type { CategoryType } from "../../types/CategoryType";

export interface CategoryRequest {
	id?: string,
	name: string,
	type: CategoryType,
	system?: boolean,
	accountId: string
}