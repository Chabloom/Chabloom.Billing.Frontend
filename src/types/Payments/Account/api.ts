import { BaseApi, BaseApiType } from "../../apiBase";
import { AccountViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class AccountsApi
  extends BaseApi<AccountViewModel>
  implements BaseApiType<AccountViewModel> {
  baseUrl: string;
  tenant: string | null;

  constructor(tenant: string | null = null) {
    super();
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accounts`;
    this.tenant = tenant;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<AccountViewModel> | string> {
    if (this.tenant) {
      return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<AccountViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: AccountViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: AccountViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: AccountViewModel
  ): Promise<string | undefined> {
    const tenantId = window.localStorage.getItem("TenantId");
    if (tenantId) {
      item.tenant = tenantId;
    }
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
