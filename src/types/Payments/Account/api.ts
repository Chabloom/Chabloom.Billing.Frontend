import { BaseApi, BaseApiType } from "../../apiBase";
import { AccountViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { UserService } from "../../UserService";

export class AccountsApi
  extends BaseApi<AccountViewModel>
  implements BaseApiType<AccountViewModel> {
  baseUrl: string;
  tenant: string | null;

  constructor(userService: UserService, tenant: string | null = null) {
    super(userService);
    this.baseUrl = `${ApplicationConfig.paymentsApiPublicAddress}/api/accounts`;
    this.tenant = tenant;
  }

  readItems(): Promise<[Array<AccountViewModel> | undefined, string]> {
    if (this.tenant) {
      return this._readItems(`${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(`${this.baseUrl}`);
    }
  }

  readItem(itemId: string): Promise<[AccountViewModel | undefined, string]> {
    return this._readItem(`${this.baseUrl}/${itemId}`);
  }

  addItem(
    item: AccountViewModel
  ): Promise<[AccountViewModel | undefined, string]> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._addItem(`${this.baseUrl}`, item);
  }

  editItem(
    item: AccountViewModel
  ): Promise<[AccountViewModel | undefined, string]> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._editItem(`${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(item: AccountViewModel): Promise<string | undefined> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._deleteItem(`${this.baseUrl}/${item.id}`);
  }
}
