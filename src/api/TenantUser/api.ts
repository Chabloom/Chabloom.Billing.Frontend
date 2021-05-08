import { BaseApi, BaseApiType } from "../../common";
import { TenantUserViewModel } from "./model";

export class TenantUsersApi extends BaseApi<TenantUserViewModel> implements BaseApiType<TenantUserViewModel> {
  baseUrl = "";
  tenantId: string;

  constructor(tenantId: string) {
    super();
    const envConfig = 'env-config';
    import(envConfig)
        .then(x => this.baseUrl = `${x.config.REACT_APP_BILLING_BACKEND_ADDRESS}/api/tenantUsers`);
    this.tenantId = tenantId;
  }

  readItems(token: string): Promise<[Array<TenantUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?tenantId=${this.tenantId}`, token);
  }

  readItem(token: string, itemId: string): Promise<[TenantUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`, token);
  }

  addItem(token: string, item: TenantUserViewModel): Promise<[TenantUserViewModel | undefined, string]> {
    item.tenant = this.tenantId;
    return this._addItem(`${this.baseUrl}`, token, item);
  }

  editItem(token: string, item: TenantUserViewModel): Promise<[TenantUserViewModel | undefined, string]> {
    item.tenant = this.tenantId;
    return this._editItem(`${this.baseUrl}/${item.id}`, token, item);
  }

  deleteItem(token: string, item: TenantUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`, token);
  }
}
