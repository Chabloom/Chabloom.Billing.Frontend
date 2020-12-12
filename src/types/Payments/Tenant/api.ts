import { BaseApi, BaseApiType } from "../../apiBase";
import { TenantViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { User } from "oidc-client";

export class TenantsApi
  extends BaseApi<TenantViewModel>
  implements BaseApiType<TenantViewModel> {
  baseUrl: string;
  userId: string | null;

  constructor(user: User | undefined, userId: string | null = null) {
    super(user);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenants`;
    this.userId = userId;
  }

  readItems(): Promise<[Array<TenantViewModel> | undefined, string]> {
    if (this.userId) {
      return this._readItems(`${this.baseUrl}?userId=${this.userId}`, false);
    } else {
      return this._readItems(`${this.baseUrl}`, false);
    }
  }

  readItem(itemId: string): Promise<[TenantViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: TenantViewModel
  ): Promise<[TenantViewModel | undefined, string]> {
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: TenantViewModel
  ): Promise<[TenantViewModel | undefined, string]> {
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: TenantViewModel): Promise<string | undefined> {
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
