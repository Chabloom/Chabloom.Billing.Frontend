import { BaseApi, BaseApiType } from "../../apiBase";
import { AccountUserViewModel } from "./model";
import { ApplicationConfig } from "../../settings";
import { BaseViewModel } from "../../modelBase";

export class AccountUsersApi
  extends BaseApi<AccountUserViewModel>
  implements BaseApiType<AccountUserViewModel> {
  baseUrl: string;
  account: string | null;
  tenant: string | null;

  constructor(account: string | null = null, tenant: string | null = null) {
    super();
    this.baseUrl = `${ApplicationConfig.apiPublicAddress}/api/accountUsers`;
    this.account = account;
    this.tenant = tenant;
  }

  readItems(
    token: string | undefined
  ): Promise<Array<AccountUserViewModel> | string> {
    if (this.account) {
      return this._readItems(
        token,
        `${this.baseUrl}?accountId=${this.account}`
      );
    } else if (this.tenant) {
      return this._readItems(token, `${this.baseUrl}?tenantId=${this.tenant}`);
    } else {
      return this._readItems(token, `${this.baseUrl}`);
    }
  }

  readItem(
    token: string | undefined,
    itemId: string
  ): Promise<AccountUserViewModel | string> {
    return this._readItem(token, `${this.baseUrl}/${itemId}`);
  }

  addItem(
    token: string | undefined,
    item: AccountUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._addItem(token, `${this.baseUrl}`, item);
  }

  editItem(
    token: string | undefined,
    item: AccountUserViewModel
  ): Promise<[BaseViewModel | undefined, string]> {
    if (this.account) {
      item.account = this.account;
    }
    return this._editItem(token, `${this.baseUrl}/${item.id}`, item);
  }

  deleteItem(
    token: string | undefined,
    item: AccountUserViewModel
  ): Promise<string | undefined> {
    return this._deleteItem(token, `${this.baseUrl}/${item.id}`);
  }
}
