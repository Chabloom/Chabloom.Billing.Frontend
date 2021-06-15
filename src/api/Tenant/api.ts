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

  roles = (): Promise<boolean> => {
    return this._read(`${this._baseUrl}/roles`);
  };
}
