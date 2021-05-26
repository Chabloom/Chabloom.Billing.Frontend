import { BaseApi, BaseApiType } from "../../common";
import { TenantViewModel } from "./model";

export class TenantsApi extends BaseApi<TenantViewModel> implements BaseApiType<TenantViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenants`;

  readCurrent(): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}`);
  }

  readAll(): Promise<[Response | undefined, Array<TenantViewModel> | undefined, string]> {
    return this._getAll(`${this.baseUrl}`);
  }

  read(id: string): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`);
  }

  create(
    token: string,
    viewModel: TenantViewModel
  ): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._post(`${this.baseUrl}`, token, viewModel);
  }

  edit(
    token: string,
    viewModel: TenantViewModel
  ): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._put(`${this.baseUrl}/${viewModel.id}`, token, viewModel);
  }

  delete(token: string, viewModel: TenantViewModel): Promise<[Response | undefined, string]> {
    return this._delete(`${this.baseUrl}/${viewModel.id}`, token);
  }
}
