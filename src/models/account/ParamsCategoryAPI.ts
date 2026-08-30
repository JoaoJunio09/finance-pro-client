import type { CategoryType } from "../../types/CategoryType";

export interface ParamsCategoryAPI {
	type?: CategoryType;
	month?: number;
	year?: number;
}