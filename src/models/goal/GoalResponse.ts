import type { CategoryResponse } from "../category/CategoryResponse";

export interface GoalResponse {
  id: string;
  name: string;
  description: string;
  totalAmount: number;
  currentAmount: number;
  category?: CategoryResponse;
}
