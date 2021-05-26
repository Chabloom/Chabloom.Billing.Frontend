import { BaseApi } from "../../common";
import { TenantViewModel } from "./model";

export class TenantsApi extends BaseApi<TenantViewModel> {
  baseUrl = `${window.__env__.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenants`;

  read(id: string): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}/${id}`);
  }

  readCurrent(): Promise<[Response | undefined, TenantViewModel | undefined, string]> {
    return this._get(`${this.baseUrl}`);
  }
}
