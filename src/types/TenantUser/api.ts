import { User } from "oidc-client";
import { ApplicationConfig } from "../settings";
import { BaseApi, BaseApiType } from "../apiBase";
import { TenantUserViewModel } from "./model";

export class TenantUsersApi
  extends BaseApi<TenantUserViewModel>
  implements BaseApiType<TenantUserViewModel> {
  baseUrl: string;
  tenantId: string;

  constructor(user: User | undefined, tenantId: string) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenantUsers`;
    this.tenantId = tenantId;
  }

  readItems(): Promise<[Array<TenantUserViewModel> | undefined, string]> {
    return this._readItems(`${this.baseUrl}?tenantId=${this.tenantId}`);
  }

  readItem(itemId: string): Promise<[TenantUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TenantUserViewModel
  ): Promise<[TenantUserViewModel | undefined, string]> {
    item.tenant = this.tenantId;
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: TenantUserViewModel
  ): Promise<[TenantUserViewModel | undefined, string]> {
    item.tenant = this.tenantId;
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TenantUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
