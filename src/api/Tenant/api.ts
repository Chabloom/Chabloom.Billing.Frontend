import { BaseApi, BaseApiType } from "../../common";
import { TenantViewModel } from "./model";

export class TenantsApi extends BaseApi<TenantViewModel> implements BaseApiType<TenantViewModel> {
  baseUrl = "";

  constructor() {
    super();
    this.baseUrl = `${(window as any).REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenants`;
  }

  readItems(): Promise<[Array<TenantViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, "", false);
  }

  readItemsAuthorized(token: string): Promise<[Array<TenantViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}/Authorized`, token);
  }

  readItem(token: string, itemId: string): Promise<[TenantViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: TenantViewModel): Promise<[TenantViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: TenantViewModel): Promise<[TenantViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: TenantViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
