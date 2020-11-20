import { BaseApi, BaseApiType } from "../../apiBase";
import { TenantViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class TenantsApi
  extends BaseApi<TenantViewModel>
  implements BaseApiType<TenantViewModel> {
  baseUrl: string;
  user: string | null;

  constructor(userService: UserService, user: string | null = null) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/tenants`;
    this.user = user;
  }

  readItems(): Promise<[Array<TenantViewModel> | undefined, string]> {
    if (this.user) {
      return this._readItems(`${this.baseUrl}?userId=${this.user}`, false);
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
