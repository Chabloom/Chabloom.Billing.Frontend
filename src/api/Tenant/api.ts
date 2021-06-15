import { FullAPI } from "../api";
import { TenantViewModel } from "./model";

export class TenantsAPI extends FullAPI<TenantViewModel> {
  constructor() {
    super(`${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenants`);
  }

  deleteViewModel(viewModel: TenantViewModel, token: string): Promise<boolean> {
    return this._delete(`${this._baseUrl}/${viewModel.id}`, token);
  }

  updateViewModel(viewModel: TenantViewModel, token: string): Promise<boolean> {
    return this._update(`${this._baseUrl}/${viewModel.id}`, viewModel, token);
  }

  current = (): Promise<boolean> => {
    return this._read(`${this._baseUrl}/current`);
  };

  roles = async (token: string): Promise<Array<string>> => {
    // Reset data and any errors
    this._data = undefined;
    this._lastError = "";

    // Setup request
    const requestInit: RequestInit = {
      method: "GET",
      referrerPolicy: "origin",
      credentials: token ? "include" : "omit",
    };

    try {
      // Make the request
      const response = await fetch(`${this._baseUrl}/roles`, requestInit);
      // Check if the request was successful
      if (response.status in [200, 201]) {
        // Set the returned data
        return await response.json();
      }
    } catch (e) {
      this.lastError = e.message;
    }
    return [];
  };
}
