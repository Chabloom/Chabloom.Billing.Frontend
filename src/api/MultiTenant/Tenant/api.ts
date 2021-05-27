import { BaseApi, BaseApiType } from "../../../common";
import { TenantViewModel } from "./model";

export class TenantsApi extends BaseApi<TenantViewModel> implements BaseApiType<TenantViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenants`;

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

  getCurrent(): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/current`);
  }

  getRoles = async (token: string): Promise<[Response | undefined, Array<string> | undefined, string]> => {
    let response: Response | undefined;
    let data: Array<string> | undefined;
    let message = "";
    try {
      if (token) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        response = await fetch(`${this.baseUrl}/roles`, {
          method: "GET",
          referrerPolicy: "origin",
          headers: headers,
          credentials: "include",
        });
        if (response.status === 200) {
          data = await response.json();
        } else if (response.status !== 204) {
          message = response.statusText;
        }
      }
    } catch (e) {
      message = e.message;
    }
    return [response, data, message];
  };
}
