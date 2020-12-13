import { BaseApi, BaseApiType } from "../apiBase";
import { TenantUserViewModel } from "./model";
import { ApplicationConfig } from "../settings";
import { User } from "oidc-client";

export class TenantUsersApi
  extends BaseApi<TenantUserViewModel>
  implements BaseApiType<TenantUserViewModel> {
  baseUrl: string;
  tenant: string | null;

  constructor(user: User | undefined, tenant: string | null = null) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenantUsers`;
    this.tenant = tenant;
  }

  readItems(): Promise<[Array<TenantUserViewModel> | undefined, string]> {
    if (this.tenant) {
      return this._readItems(`${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(`${this.baseUrl}`);
    }
  }

  readItem(itemId: string): Promise<[TenantUserViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TenantUserViewModel
  ): Promise<[TenantUserViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: TenantUserViewModel
  ): Promise<[TenantUserViewModel | undefined, string]> {
    if (this.tenant) {
      item.tenant = this.tenant;
    }
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TenantUserViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
