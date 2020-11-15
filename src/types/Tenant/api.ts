import { BaseApi, BaseApiType } from "../apiBase";
import { TenantViewModel } from "./model";
import { ApplicationConfig } from "../settings";
import { BaseViewModel } from "../modelBase";

export class TenantsApi
  extends BaseApi<TenantViewModel>
  implements BaseApiType<TenantViewModel> {
  baseUrl: string;
  user: string | null;

  constructor(user: string | null = null) {
    super();
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/tenants`;
    this.user = user;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<TenantViewModel> | string> {
    if (this.user) {
      return this._readItems(token, `${this.baseUrl}?userId=${this.user}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<TenantViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: TenantViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: TenantViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: TenantViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
