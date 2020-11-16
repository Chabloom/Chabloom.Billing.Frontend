import { BaseApi, BaseApiType } from "../../apiBase";
import { TenantUserViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class TenantUsersApi
  extends BaseApi<TenantUserViewModel>
  implements BaseApiType<TenantUserViewModel> {
  baseUrl: string;
  tenant: string | null;

  constructor(tenant: string | null = null) {
    super();
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenantUsers`;
    this.tenant = tenant;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<TenantUserViewModel> | string> {
    if (this.tenant) {
      return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<TenantUserViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: TenantUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: TenantUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: TenantUserViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
