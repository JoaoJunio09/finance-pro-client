import InternalServerError from "../exceptions/InternalServerError";
import type { AccountResponse } from "../models/account/AccountResponse";
import type { ActivitiesResponse } from "../models/account/ActivitiesResponse";
import type { AnalyticsResponse } from "../models/account/AnalyticsResponse";
import type { DashboardResponse } from "../models/account/DashboardResponse";
import type { FinancialSummaryResponse } from "../models/account/FinancialSummaryResponse";
import type { ParamsCategoryAPI } from "../models/account/ParamsCategoryAPI";
import api from "./api";

class AccountService {
  BASE_URL: string = "";
  private accessToken: string = "";

  constructor(accessToken: string) {
    this.BASE_URL = "/api/accounts/v1";
    this.accessToken = accessToken;
  }

  public async getAll() {
    try {
      const response = await api.get<AccountResponse[]>(this.BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err?.response?.status === 500) {
        throw new InternalServerError("Erro ao carregar as todas as Contas");
      }

      throw err;
    }
  }

  public async getSummary(id: string) {
    const response = await api.get<FinancialSummaryResponse>(
      `${this.BASE_URL}/summary/${id}`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );
    return response.data;
  }

  public async getDashboard(id: string) {
    const response = await api.get<DashboardResponse>(
      `${this.BASE_URL}/dashboard-activity/${id}`,
      { headers: { Authorization: `Bearer ${this.accessToken}` } }
    );
    return response.data;
  }

  public async getActivities(accountId: string, params: ParamsCategoryAPI) {
    const URL: string = `${this.BASE_URL}/activities/${accountId}`;
    try {
      const response = await api.get<ActivitiesResponse>(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        params,
      });

      return response.data;
    } catch (err: any) {
      if (err?.response?.status === 500) {
        throw new InternalServerError(
          "Erro ao carregar as atividades da conta"
        );
      }

      throw err;
    }
  }

  public async getAnalytics(accountId: string) {
    const URL: string = `${this.BASE_URL}/analytics/${accountId}`;
    try {
      const response = await api.get<AnalyticsResponse>(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err?.response?.status === 500) {
        throw new InternalServerError("Erro ao carregar as análises da conta");
      }

      throw err;
    }
  }

  public async getByUsername(username: string) {
    const URL: string = `${this.BASE_URL}/by-username/${username}`;
    try {
      const response = await api.get<AccountResponse>(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response.data;
    } catch (err: any) {
      if (err?.response?.status === 500) {
        throw new InternalServerError("Erro ao carregar dados da conta");
      }

      throw err;
    }
  }
}

export default AccountService;
