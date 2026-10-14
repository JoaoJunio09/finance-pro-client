import type { GoalResponse } from "../models/goal/GoalResponse";
import api from "./api";

export default class GoalService {
  private readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getByAccount(accountId: string) {
    const response = await api.get<GoalResponse[]>(
      `/api/goals/v1/by-account/${accountId}`,
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );
    return response.data;
  }
}
