import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { TenantViewModel } from "./model";

export class TenantsApi extends BaseApi<TenantViewModel> implements BaseApiType<TenantViewModel> {
  baseUrl: string;

  constructor(user: User | undefined = undefined) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenants`;
  }

  readItems(): Promise<[Array<TenantViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}`, false);
  }

  readItemsAuthorized(): Promise<[Array<TenantViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}/Authorized`);
  }

  readItem(itemId: string): Promise<[TenantViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(item: TenantViewModel): Promise<[TenantViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(item: TenantViewModel): Promise<[TenantViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TenantViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
